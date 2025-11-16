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

      // Extract paymentId from event logs
      // PaymentCreated event signature: 0xcc23fcd8942b36b52cc0aa3d8c37f0e8518bb0659c4d12741568ea9e4629eed5
      let paymentIdValue = ''
      const paymentCreatedSignature = '0xcc23fcd8942b36b52cc0aa3d8c37f0e8518bb0659c4d12741568ea9e4629eed5'
      
      for (const log of receipt.logs) {
        if (log.topics[0] === paymentCreatedSignature) {
          // PaymentId is topics[1]
          paymentIdValue = log.topics[1]
          setPaymentId(paymentIdValue)
          console.log('PaymentId extracted:', paymentIdValue)
          break
        }
      }
      // Save to database
      if (paymentIdValue) {
        try {
          const response = await fetch('/api/transactions', {
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
          })
          if (response.ok) {
            console.log('Transaction saved to database')
          } else {
            console.error('Failed to save transaction:', await response.text())
          }
        } catch (dbError) {
          console.error('Failed to save to database:', dbError)
        }
      } else {
        console.warn('No paymentId found in transaction logs')
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
      
      // Update database status
      try {
        await fetch('/api/transactions/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId,
            status: 'completed'
          })
        })
      } catch (dbError) {
        console.error('Failed to update database:', dbError)
      }
      
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

      const feePercentage = await contract.platformFeePercentage()
      const grossAmountWei = parseEther(grossAmount)
      const fee = (grossAmountWei * feePercentage) / BigInt(10000)
      const netAmount = grossAmountWei - fee
      
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
