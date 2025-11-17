import type { PolkadotClient, TypedApi } from 'polkadot-api'
import { createAtom } from '@xstate/store'
import { createClient } from 'polkadot-api'
import { withPolkadotSdkCompat } from 'polkadot-api/polkadot-sdk-compat'
import { getWsProvider } from 'polkadot-api/ws-provider'
import { dot, dot_asset_hub, pas, pas_asset_hub } from '../descriptors'

const config = {
  dot: {
    descriptor: dot,
    providers: [
      'wss://rpc.polkadot.io',
      'wss://polkadot-rpc.dwellir.com',
      'wss://dot-rpc.stakeworld.io'
    ],
  },
  dot_asset_hub: {
    descriptor: dot_asset_hub,
    providers: [
      'wss://polkadot-asset-hub-rpc.polkadot.io',
      'wss://dot-rpc.stakeworld.io/assethub'
    ],
  },
  pas: {
    descriptor: pas,
    providers: [
      'wss://rpc.ibp.network/paseo',
      'wss://pas-rpc.stakeworld.io'
    ],
  },
  pas_asset_hub: {
    descriptor: pas_asset_hub,
    providers: [
      'wss://paseo-asset-hub-rpc.polkadot.io',
      'wss://pas-rpc.stakeworld.io/assethub'
    ],
  },
} as const

export type Prefix = keyof typeof config
export const chainKeys = Object.keys(config) as Prefix[]

const clientStore = createAtom<Partial<Record<Prefix, PolkadotClient>>>({})

export default function sdk<T extends Prefix>(chain: T) {
  const clients = clientStore.get()

  if (!clients[chain]) {
    const providers = config[chain].providers.map(url => getWsProvider(url))
    clients[chain] = createClient(
      withPolkadotSdkCompat(providers[0]),
    )
  }

  return {
    api: clients[chain]!.getTypedApi(config[chain].descriptor) as TypedApi<typeof config[T]['descriptor']>,
    client: clients[chain]!,
  }
}
