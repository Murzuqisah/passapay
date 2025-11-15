'use client'

import { useState } from 'react'
import { BrowserProvider, Contract, parseEther, formatEther } from 'ethers'
import PassaPaymentABI from '../contracts/PassaPayment.json'
import { ACTIVE_NETWORK } from '../utils/contract-config'

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

  const createPayment = async (artistAddress: string, amountInDEV: string) => {
    try {
      setIsProcessing(true)
      setResult('')
      setPaymentId('')

      if (!window.ethereum) throw new Error('MetaMask not installed')

      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      const contract = new Contract(
        ACTIVE_NETWORK.contractAddress,
        PassaPaymentABI.abi,
        signer
      )

      const tx = await contract.createPayment(artistAddress, {
        value: parseEther(amountInDEV)
      })

      setResult('Transaction submitted...')
      const receipt = await tx.wait()

      const event = receipt.logs.find((log: any) => {
        try {
          const parsed = contract.interface.parseLog(log)
          return parsed?.name === 'PaymentCreated'
        } catch {
          return false
        }
      })

      if (event) {
        const parsed = contract.interface.parseLog(event)
        setPaymentId(parsed?.args[0])
      }

      setResult('Payment created successfully!')
      return receipt

    } catch (error: any) {
      setResult(`Error: ${error.message}`)
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const completePayment = async (paymentId: string) => {
    try {
      setIsProcessing(true)
      setResult('')

      if (!window.ethereum) throw new Error('MetaMask not installed')

      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      const contract = new Contract(
        ACTIVE_NETWORK.contractAddress,
        PassaPaymentABI.abi,
        signer
      )

      const tx = await contract.completePayment(paymentId)
      setResult('Completing payment...')
      
      await tx.wait()
      setResult('Payment completed!')

    } catch (error: any) {
      setResult(`Error: ${error.message}`)
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const disputePayment = async (paymentId: string) => {
    try {
      setIsProcessing(true)
      setResult('')

      if (!window.ethereum) throw new Error('MetaMask not installed')

      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      const contract = new Contract(
        ACTIVE_NETWORK.contractAddress,
        PassaPaymentABI.abi,
        signer
      )

      const tx = await contract.disputePayment(paymentId)
      setResult('Disputing payment...')
      
      await tx.wait()
      setResult('Payment disputed!')

    } catch (error: any) {
      setResult(`Error: ${error.message}`)
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const getPayment = async (paymentId: string): Promise<PaymentDetails> => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not installed')

      const provider = new BrowserProvider(window.ethereum)
      const contract = new Contract(
        ACTIVE_NETWORK.contractAddress,
        PassaPaymentABI.abi,
        provider
      )

      const payment = await contract.getPayment(paymentId)
      return {
        from: payment.from,
        to: payment.to,
        amount: formatEther(payment.amount),
        createdAt: Number(payment.createdAt),
        deadline: Number(payment.deadline),
        status: Number(payment.status)
      }

    } catch (error: any) {
      console.error('Error fetching payment:', error)
      throw error
    }
  }

  const calculateNetAmount = async (grossAmount: string) => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not installed')

      const provider = new BrowserProvider(window.ethereum)
      const contract = new Contract(
        ACTIVE_NETWORK.contractAddress,
        PassaPaymentABI.abi,
        provider
      )

      const netAmount = await contract.calculateNetAmount(parseEther(grossAmount))
      return formatEther(netAmount)

    } catch (error: any) {
      console.error('Error calculating net amount:', error)
      throw error
    }
  }

  return {
    isProcessing,
    result,
    paymentId,
    createPayment,
    completePayment,
    disputePayment,
    getPayment,
    calculateNetAmount
  }
}
