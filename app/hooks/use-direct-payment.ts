'use client'

import { useState } from 'react'
import { BrowserProvider, parseEther } from 'ethers'
import { PLATFORM_CONFIG } from '../utils/payment-config'

export function useDirectPayment() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState('')

  const sendPayment = async (artistAddress: string, amountInDEV: string) => {
    try {
      setIsProcessing(true)
      setResult('')

      if (!window.ethereum) throw new Error('MetaMask not installed')

      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      const { fee, netAmount } = PLATFORM_CONFIG.calculateFee(amountInDEV)

      // Send platform fee
      setResult('Sending platform fee...')
      const feeTx = await signer.sendTransaction({
        to: PLATFORM_CONFIG.platformAddress,
        value: parseEther(fee)
      })
      await feeTx.wait()

      // Send to artist
      setResult('Sending payment to artist...')
      const artistTx = await signer.sendTransaction({
        to: artistAddress,
        value: parseEther(netAmount)
      })
      await artistTx.wait()

      setResult('Payment sent successfully!')
      return { feeTx, artistTx }

    } catch (error: any) {
      setResult(`Error: ${error.message}`)
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  return {
    isProcessing,
    result,
    sendPayment,
    calculateFee: PLATFORM_CONFIG.calculateFee
  }
}
