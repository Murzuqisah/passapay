'use client'

import { useState, useEffect } from 'react'
import { useConnect } from '../../hooks/use-connect'
import { useMetaMask } from '../../hooks/use-metamask'
import { BrowserProvider, formatEther } from 'ethers'
import DashboardSidebar from '../../components/DashboardSidebar'
import ContractPayment from '../../components/promoter/contract-payment'
import {
  BalanceOverview,
  QuickSendButton,
  RecentPayments,
  PaymentHistory,
  SendPaymentModal
} from '../../components/promoter'



export default function PromoterDashboard() {
  const { selectedAccount } = useConnect()
  const metamask = useMetaMask()
  const [showSendModal, setShowSendModal] = useState(false)
  const [activeView, setActiveView] = useState<'overview' | 'history'>('overview')
  const [balance, setBalance] = useState({ usdc: '0.00', dev: '0.00', usdValue: '0.00' })
  const [recentPayments, setRecentPayments] = useState<any[]>([])
  const [paymentHistory, setPaymentHistory] = useState<any[]>([])

  useEffect(() => {
    const fetchBalance = async () => {
      if (!metamask.account && !selectedAccount) return
      
      try {
        if (window.ethereum) {
          const provider = new BrowserProvider(window.ethereum)
          const address = metamask.account?.address || selectedAccount?.address
          if (address) {
            const bal = await provider.getBalance(address)
            const devBalance = parseFloat(formatEther(bal)).toFixed(2)
            setBalance({
              usdc: '0.00',
              dev: devBalance,
              usdValue: (parseFloat(devBalance) * 0.5).toFixed(2)
            })
          }
        }
      } catch (error) {
        console.error('Failed to fetch balance:', error)
      }
    }

    const fetchTransactions = async () => {
      if (!selectedAccount && !metamask.account) return
      
      try {
        const address = metamask.account?.address || selectedAccount?.address
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)
        
        const response = await fetch(
          `/api/transactions?address=${address}`,
          { signal: controller.signal }
        )
        clearTimeout(timeoutId)
        
        if (response.ok) {
          const data = await response.json()
          const txArray = Array.isArray(data) ? data : []
          const formatted = txArray.map((tx: any) => ({
            id: tx._id || tx.txHash,
            recipient: tx.toAddress,
            walletAddress: tx.toAddress,
            amount: tx.amount,
            currency: 'DEV',
            timestamp: new Date(tx.timestamp || tx.createdAt),
            status: tx.status,
            txHash: tx.txHash
          }))
          setRecentPayments(formatted.slice(0, 3))
          setPaymentHistory(formatted)
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error)
        setRecentPayments([])
        setPaymentHistory([])
      }
    }

    fetchBalance()
    fetchTransactions()
    
    const interval = setInterval(() => {
      fetchBalance()
      fetchTransactions()
    }, 30000)

    return () => clearInterval(interval)
  }, [selectedAccount, metamask.account])

  return (
    <DashboardSidebar userType="promoter">
      <div className="min-h-screen bg-background">

      {/* Hero Section with Glass Effect */}
      <section className="relative pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

        {/* Decorative gradient orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-30 animate-float hidden sm:block" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl opacity-30 animate-float hidden sm:block" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 gradient-text">
                Promoter Dashboard
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg">
                Manage payments and track your transactions
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-6 sm:mb-8 w-full">
              <button
                onClick={() => setActiveView('overview')}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${activeView === 'overview'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                  : 'bg-card text-foreground hover:bg-muted border-2 border-border hover:border-primary/50'
                  }`}
              >
                <span className="icon-[mdi--view-dashboard] inline-block mr-1 sm:mr-2 text-lg sm:text-xl" />
                Overview
              </button>
              <button
                onClick={() => setActiveView('history')}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${activeView === 'history'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                  : 'bg-card text-foreground hover:bg-muted border-2 border-border hover:border-primary/50'
                  }`}
              >
                <span className="icon-[mdi--history] inline-block mr-1 sm:mr-2 text-lg sm:text-xl" />
                History
              </button>
            </div>

            {/* Overview View */}
            {activeView === 'overview' && (
              <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-in">
                {/* Balance and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="lg:col-span-2">
                    <BalanceOverview balance={balance} />
                  </div>
                  <div>
                    <ContractPayment />
                  </div>
                </div>

                {/* Recent Payments */}
                <RecentPayments
                  payments={recentPayments}
                  onViewAll={() => setActiveView('history')}
                />
              </div>
            )}

            {/* History View */}
            {activeView === 'history' && (
              <div className="animate-in">
                <PaymentHistory payments={paymentHistory} />
              </div>
            )}
          </div>
        </div>
      </section>

        {/* Send Payment Modal */}
        <SendPaymentModal
          isOpen={showSendModal}
          onClose={() => setShowSendModal(false)}
        />
      </div>
    </DashboardSidebar>
  )
}
