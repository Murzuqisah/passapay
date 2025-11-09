'use client'

import type { Prefix } from '../utils/sdk'
import { useEffect, useState } from 'react'
import { getBalance, getUSDCBalance } from '../utils/sdk-interface'

interface BalanceProps {
  address?: string
  chainKey: Prefix
}

export default function Balance({ address, chainKey }: BalanceProps) {
  const [balance, setBalance] = useState('')
  const [symbol, setSymbol] = useState('')
  const [usdcBalance, setUsdcBalance] = useState('0.00')

  useEffect(() => {
    if (!address) {
      return
    }

    let ignore = false

    const fetchBalance = async () => {
      const { balance, symbol } = await getBalance(chainKey, address)
      if (!ignore) {
        setBalance(balance)
        setSymbol(symbol)
      }
      
      // Fetch USDC balance for Asset Hub chains
      if (chainKey.includes('asset_hub')) {
        const usdc = await getUSDCBalance(address)
        if (!ignore) {
          setUsdcBalance(usdc)
        }
      }
    }

    fetchBalance()

    return () => {
      ignore = true
    }
  }, [address, chainKey])

  return (
    <div>
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
        Balance
      </div>
      <div className="flex items-baseline space-x-2 font-mono">
        <div className="font-light text-black text-2xl">
          {balance || '---'}
        </div>
        <div className="text-xs text-gray-500 uppercase tracking-wider">
          {symbol}
        </div>
      </div>
      {chainKey.includes('asset_hub') && (
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
          <div className="text-xs text-blue-600 font-medium mb-1">USDC Balance</div>
          <div className="font-mono text-blue-800">{usdcBalance} USDC</div>
        </div>
      )}
    </div>
  )
}
