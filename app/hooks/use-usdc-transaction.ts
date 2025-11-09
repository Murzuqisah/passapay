'use client'

import { useState } from 'react'
import { polkadotSigner, createUSDCTransfer } from '../utils/sdk-interface'

export function useUSDCTransaction() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState('')
  const [txHash, setTxHash] = useState('')

  const sendUSDC = async (recipient: string, amount: string) => {
    try {
      setIsProcessing(true)
      setResult('')
      setTxHash('')

      const signer = await polkadotSigner()
      if (!signer) {
        throw new Error('No signer available')
      }

      createUSDCTransfer(recipient, amount, signer, {
        onTxHash: (hash) => {
          setTxHash(hash)
          setResult('Transaction submitted')
        },
        onFinalized: () => {
          setResult('Payment sent successfully!')
          setIsProcessing(false)
        },
        onError: (error) => {
          setResult(`Error: ${error}`)
          setIsProcessing(false)
        },
      })
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsProcessing(false)
    }
  }

  return {
    isProcessing,
    result,
    txHash,
    sendUSDC,
  }
}