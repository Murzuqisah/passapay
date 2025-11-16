'use client'

import { useState, useEffect } from 'react'
import { useContractPayment } from '@/app/hooks/use-contract-payment'
import { useMetaMask } from '@/app/hooks/use-metamask'

interface PendingPayment {
  paymentId: string
  from: string
  amount: string
  createdAt: number
  status: number
}

export default function ClaimPayments() {
  const { account } = useMetaMask()
  const { completePayment, isProcessing, result } = useContractPayment()
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPendingPayments()
  }, [account])

  const fetchPendingPayments = async () => {
    if (!account?.address) return
    
    setLoading(true)
    try {
      const res = await fetch(`/api/payments/pending?artistAddress=${account.address}`)
      if (res.ok) {
        const data = await res.json()
        setPendingPayments(data)
      }
    } catch (error) {
      console.error('Failed to fetch pending payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClaimPayment = async (paymentId: string) => {
    try {
      await completePayment(paymentId)
      setTimeout(fetchPendingPayments, 2000)
    } catch (error) {
      console.error('Failed to claim payment:', error)
    }
  }

  if (!account) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <p className="text-muted-foreground text-center">Connect MetaMask to view pending payments</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-xl">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <span className="icon-[mdi--cash-clock] w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Pending Payments</h2>
              <p className="text-sm text-muted-foreground">Claim your escrowed payments</p>
            </div>
          </div>
          <button
            onClick={fetchPendingPayments}
            disabled={loading}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <span className={`icon-[mdi--refresh] w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-6">
        {result && (
          <div className={`p-3 rounded-lg text-sm mb-4 ${
            result.includes('Error') 
              ? 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400'
          }`}>
            {result}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <span className="icon-[mdi--loading] animate-spin text-3xl text-primary" />
          </div>
        ) : pendingPayments.length > 0 ? (
          <div className="space-y-3">
            {pendingPayments.map((payment) => (
              <div key={payment.paymentId} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-foreground">{payment.amount} DEV</span>
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs rounded-full">
                        Pending
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      From: <span className="font-mono">{payment.from.slice(0, 6)}...{payment.from.slice(-4)}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(payment.createdAt * 1000).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleClaimPayment(payment.paymentId)}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
                  >
                    {isProcessing ? 'Claiming...' : 'Claim'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="icon-[mdi--cash-check] w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No pending payments</h3>
            <p className="text-muted-foreground">All payments have been claimed</p>
          </div>
        )}
      </div>
    </div>
  )
}
