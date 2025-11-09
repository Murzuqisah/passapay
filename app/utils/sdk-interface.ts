import type { PolkadotSigner } from 'polkadot-api'
import type { Prefix } from '../utils/sdk'
import { Binary } from 'polkadot-api'
import { connectInjectedExtension } from 'polkadot-api/pjs-signer'
import { connectedWallet, selectedAccount } from '../hooks/use-connect'
import sdk from '../utils/sdk'
import { name } from '../../package.json'
import { formatValue } from '@polkadot-api/react-components'

export const DAPP_NAME = name

export async function polkadotSigner() {
  const selectedExtension = await connectInjectedExtension(
    connectedWallet.get()?.extensionName || '',
  )
  const account = selectedExtension.getAccounts().find(account => account.address === selectedAccount.get()?.address)

  return account?.polkadotSigner
}

export async function subscribeToBlocks(
  networkKey: Prefix,
  onBlock: (data: { blockHeight: number, chainName: string }) => void,
) {
  const { client } = sdk(networkKey)
  const chainName = await client.getChainSpecData().then(data => data.name)

  return client.blocks$.subscribe(async (block) => {
    onBlock({ blockHeight: block.number, chainName })
  })
}

export async function getBalance(chainPrefix: Prefix, address: string) {
  const { api, client } = sdk(chainPrefix)

  const [balance, chainSpec] = await Promise.all([
    api.query.System.Account.getValue(address),
    client.getChainSpecData(),
  ])
  const tokenDecimals = chainSpec.properties.tokenDecimals
  const tokenSymbol = chainSpec.properties.tokenSymbol
  const freeBalance = formatValue(balance.data.free, tokenDecimals)

  return {
    balance: freeBalance,
    symbol: tokenSymbol,
    chainName: chainSpec.name,
  }
}

export function createRemarkTransaction(
  chainPrefix: Prefix,
  message: string,
  address = '',
  signer: PolkadotSigner,
  callbacks: {
    onTxHash: (hash: string) => void
    onFinalized: () => void
    onError: (error: string) => void
  },
) {
  const { api } = sdk(chainPrefix)

  const remark = Binary.fromText(message)
  const tx = api.tx.System.remark({ remark })

  const unsub = tx.signSubmitAndWatch(signer).subscribe({
    next: (event) => {
      if (event.type === 'txBestBlocksState' && event.found) {
        callbacks.onTxHash(event.txHash)
      }

      if (event.type === 'finalized') {
        callbacks.onFinalized()
        unsub.unsubscribe()
      }
    },
    error: (err) => {
      unsub.unsubscribe()
      console.error(err, address)
      callbacks.onError(err.message || 'Unknown error')
    },
  })
}

export function createUSDCTransfer(
  recipient: string,
  amount: string,
  signer: PolkadotSigner,
  callbacks: {
    onTxHash: (hash: string) => void
    onFinalized: () => void
    onError: (error: string) => void
  },
) {
  const { api } = sdk('dot_asset_hub')
  
  // USDC asset ID on Polkadot Asset Hub (this would be the actual USDC asset ID)
  const USDC_ASSET_ID = 1337 // Placeholder - use real USDC asset ID
  const amountInSmallestUnit = BigInt(parseFloat(amount) * 1_000_000) // USDC has 6 decimals

  const tx = api.tx.Assets.transfer({
    id: USDC_ASSET_ID,
    target: recipient,
    amount: amountInSmallestUnit,
  })

  const unsub = tx.signSubmitAndWatch(signer).subscribe({
    next: (event) => {
      if (event.type === 'txBestBlocksState' && event.found) {
        callbacks.onTxHash(event.txHash)
      }

      if (event.type === 'finalized') {
        callbacks.onFinalized()
        unsub.unsubscribe()
      }
    },
    error: (err) => {
      unsub.unsubscribe()
      console.error(err)
      callbacks.onError(err.message || 'Unknown error')
    },
  })
}

export async function getUSDCBalance(address: string) {
  const { api } = sdk('dot_asset_hub')
  const USDC_ASSET_ID = 1337 // Placeholder
  
  try {
    const balance = await api.query.Assets.Account.getValue(USDC_ASSET_ID, address)
    if (balance) {
      const usdcBalance = Number(balance.balance) / 1_000_000 // Convert from smallest unit
      return usdcBalance.toFixed(2)
    }
    return '0.00'
  } catch {
    return '0.00'
  }
}