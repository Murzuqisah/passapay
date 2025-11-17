'use client'

import { useState, useEffect } from 'react'
import { BrowserProvider } from 'ethers'

const MOONBEAM_CHAIN_ID = '0x504' // 1284 in hex
const MOONBEAM_PARAMS = {
  chainId: MOONBEAM_CHAIN_ID,
  chainName: 'Moonbeam',
  nativeCurrency: { name: 'GLMR', symbol: 'GLMR', decimals: 18 },
  rpcUrls: ['https://rpc.api.moonbeam.network'],
  blockExplorerUrls: ['https://moonscan.io/']
}

export interface MetaMaskAccount {
  address: string
  name: string
  balance?: string
}

export function useMetaMask() {
  const [account, setAccount] = useState<MetaMaskAccount | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    setIsInstalled(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
    
    // Load from storage
    const stored = localStorage.getItem('metamask:account')
    if (stored) setAccount(JSON.parse(stored))

    // Listen for account changes
    if (window.ethereum) {
      const handler = (...args: unknown[]) => handleAccountsChanged(args[0] as string[])
      window.ethereum.on('accountsChanged', handler)
      window.ethereum.on('chainChanged', () => window.location.reload())
    }

    return () => {
      if (window.ethereum) {
        const handler = (...args: unknown[]) => handleAccountsChanged(args[0] as string[])
        window.ethereum.removeListener('accountsChanged', handler)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      disconnect()
    } else {
      const acc = { address: accounts[0], name: `MetaMask (${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)})` }
      setAccount(acc)
      localStorage.setItem('metamask:account', JSON.stringify(acc))
    }
  }

  async function connect() {
    if (!window.ethereum) return

    setIsConnecting(true)
    try {
      // Request accounts first
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[]
      
      // Try to switch to Moonbeam, add if not exists
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: MOONBEAM_CHAIN_ID }]
        })
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [MOONBEAM_PARAMS]
          })
        } else {
          throw error
        }
      }

      // Get balance after network switch
      const provider = new BrowserProvider(window.ethereum)
      const balance = await provider.getBalance(accounts[0])
      const balanceInGLMR = (Number(balance) / 1e18).toFixed(4)

      const acc = {
        address: accounts[0],
        name: `MetaMask (${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)})`,
        balance: balanceInGLMR
      }

      setAccount(acc)
      localStorage.setItem('metamask:account', JSON.stringify(acc))
    } catch (error) {
      // MetaMask connection error
    } finally {
      setIsConnecting(false)
    }
  }

  function disconnect() {
    setAccount(null)
    localStorage.removeItem('metamask:account')
  }

  return {
    account,
    isConnecting,
    isInstalled,
    connect,
    disconnect
  }
}
