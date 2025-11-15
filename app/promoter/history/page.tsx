'use client'

import { useState, useEffect } from 'react'
import { useConnect } from '../../hooks/use-connect'
import { useMetaMask } from '../../hooks/use-metamask'
import DashboardSidebar from '../../components/DashboardSidebar'
import { PaymentHistory } from '../../components/promoter'

export default function HistoryPage() {
  const { selectedAccount } = useConnect()
  const metamask = useMetaMask()
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      const address = metamask.account?.address || selectedAccount?.address
      if (!address) return
      
      setLoading(true)
      try {
        const res = await fetch(`/api/transactions?address=${address}`)
        if (res.ok) {
          const data = await res.json()
          const formatted = (Array.isArray(data) ? data : []).map((tx: any) => ({
            id: tx._id || tx.txHash,
            recipient: tx.toAddress,
            walletAddress: tx.toAddress,
            amount: tx.amount,
            currency: 'DEV',
            timestamp: new Date(tx.timestamp || tx.createdAt),
            status: tx.status,
            txHash: tx.txHash
          }))
          setPayments(formatted)
        }
      } catch (error) {
        console.error('Failed to fetch payments:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPayments()
  }, [selectedAccount, metamask.account])

  return (
    <DashboardSidebar userType="promoter">
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Payment History</h1>
          <p className="text-muted-foreground">Complete record of all payments sent</p>
        </div>
        {loading ? (
          <div className="glass-card p-12 rounded-xl text-center">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <PaymentHistory payments={payments} />
        )}
      </div>
    </DashboardSidebar>
  )
}