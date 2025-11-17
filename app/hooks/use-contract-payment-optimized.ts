'use client'

import { useState, useCallback, useMemo } from 'react'
import { BrowserProvider, Contract, parseEther, formatEther, JsonRpcProvider } from 'ethers'
import PassaPaymentABI from '../contracts/PassaPayment.json'
import { ACTIVE_NETWORK, getAllRpcUrls } from '../utils/contract-config'

interface PaymentDetails {
  from: string
  to: string
  amount: string
  createdAt: number
  deadline: number
  status: number
}

export function useContractPayment() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState('')
  const [paymentId, setPaymentId] = useState('')

  const contractConfig = useMemo(() => ({
    address: ACTIVE_NETWORK.contractAddress,
    abi: PassaPaymentABI.abi
  }), [])

  const createPayment = useCallback(async (artistAddress: string, amountInDEV: string) => {
    try {
      setIsProcessing(true)
      setResult('')
      setPaymentId('')

      if (!window.ethereum) throw new Error('MetaMask not installed')

      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      const contract = new Contract(contractConfig.address, contractConfig.abi, signer)
      const tx = await contract.createPayment(artistAddress, { value: parseEther(amountInDEV) })

      setResult('Transaction submitted...')
      const receipt = await tx.wait()

      let paymentIdValue = ''
      const paymentCreatedSignature = '0xcc23fcd8942b36b52cc0aa3d8c37f0e8518bb0659c4d12741568ea9e4629eed5'
      
      for (const log of receipt.logs) {
        if (log.topics[0] === paymentCreatedSignature) {
          paymentIdValue = log.topics[1]
          setPaymentId(paymentIdValue)
          break
        }
      }

      if (paymentIdValue) {
        fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId: paymentIdValue,
            txHash: receipt.hash,
            fromAddress: await signer.getAddress(),
            toAddress: artistAddress,
            amount: amountInDEV,
            currency: 'DEV',
            type: 'sent',
            status: 'pending',
            chainId: String(receipt.chainId),
            blockNumber: receipt.blockNumber
          })
        }).catch(console.error)
      }
      
      setResult('Payment created successfully!')
      return receipt

    } catch (error: unknown) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      throw error
    } finally {
      setIsProcessing(false)
    }
  }, [contractConfig])

  const calculateNetAmount = useCallback(async (grossAmount: string) => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not installed')

      const provider = new BrowserProvider(window.ethereum)
      let contract: Contract

      try {
        await provider.getNetwork()
        contract = new Contract(contractConfig.address, contractConfig.abi, provider)
      } catch {
        const rpcUrls = getAllRpcUrls('moonbaseAlpha')
        let fallbackContract: Contract | null = null
        
        for (const rpcUrl of rpcUrls) {
          try {
            const fallbackProvider = new JsonRpcProvider(rpcUrl)
            await fallbackProvider.getNetwork()
            fallbackContract = new Contract(contractConfig.address, contractConfig.abi, fallbackProvider)
            break
          } catch {
            continue
          }
        }
        
        if (!fallbackContract) throw new Error('All RPC endpoints failed')
        contract = fallbackContract
      }

      const feePercentage = await contract.platformFeePercentage()
      const grossAmountWei = parseEther(grossAmount)
      const fee = (grossAmountWei * feePercentage) / BigInt(10000)
      const netAmount = grossAmountWei - fee
      
      return formatEther(netAmount)

    } catch (error: unknown) {
      console.error('Error calculating net amount:', error)
      throw error
    }
  }, [contractConfig])

  return {
    isProcessing,
    result,
    paymentId,
    createPayment,
    calculateNetAmount
  }
}