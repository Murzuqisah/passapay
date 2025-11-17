'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useConnect } from '../../hooks/use-connect'
import { useMetaMask } from '../../hooks/use-metamask'
import { useToast } from '../../hooks/use-toast'
import { BrowserProvider, formatEther } from 'ethers'
import DashboardSidebar from '../../components/DashboardSidebar'
import ContractPayment from '../../components/promoter/contract-payment'
import {
  BalanceOverview,
  RecentPayments,
  PaymentHistory,
  SendPaymentModal
} from '../../components/promoter'

interface Payment {
  id: string
  recipient: string
  walletAddress: string
  amount: string
  currency: string
  timestamp: Date
  status: 'completed' | 'pending' | 'failed'
  txHash: string
}

export default function PromoterDashboard() {
  const router = useRouter()
  const { selectedAccount } = useConnect()
  const metamask = useMetaMask()
  const { showError } = useToast()
  const [showSendModal, setShowSendModal] = useState(false)
  const [activeView, setActiveView] = useState<'overview' | 'history'>('overview')
  const [balance, setBalance] = useState({ usdc: '0.00', dev: '0.00', usdValue: '0.00' })
  const [recentPayments, setRecentPayments] = useState<Payment[]>([])
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([])
  const [stats, setStats] = useState({ totalPayments: 0, totalSent: '0', artistsPaid: 0 })

  useEffect(() => {
    // Check if user exists in database
    const checkUserAccess = async () => {
      const walletAddress = metamask.account?.address || selectedAccount?.address
      if (!walletAddress) {
        showError('Please connect your wallet to access the promoter dashboard')
        setTimeout(() => router.push('/'), 2000)
        return
      }

      try {
        const response = await fetch(`/api/users?walletAddress=${walletAddress}`)
        const data = await response.json()

        if (!data.exists) {
          showError('Please complete your profile to access the promoter dashboard')
          setTimeout(() => router.push('/'), 2000)
          return
        }

        // Verify user is a promoter
        if (data.user?.userType !== 'promoter') {
          showError('This dashboard is only for promoters')
          setTimeout(() => router.push('/'), 2000)
        }
      } catch (error) {
        showError('Unable to verify your access')
        setTimeout(() => router.push('/'), 2000)
      }
    }

    if (metamask.account?.address || selectedAccount?.address) {
      checkUserAccess()
    }
  }, [metamask.account, selectedAccount, showError, router])

  useEffect(() => {
    const fetchBalance = async () => {
      if (!metamask.account ) return
      
      try {
        if (window.ethereum) {
          const provider = new BrowserProvider(window.ethereum)
          const address = metamask.account?.address
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
        // Failed to fetch balance
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
          const formatted = txArray.map((tx: Record<string, unknown>) => ({
            id: String(tx._id || tx.txHash || ''),
            recipient: String(tx.toAddress || ''),
            walletAddress: String(tx.toAddress || ''),
            amount: String(tx.amount || '0'),
            currency: 'DEV',
            timestamp: new Date(String(tx.timestamp || tx.createdAt || Date.now())),
            status: (tx.status as 'completed' | 'pending' | 'failed') || 'pending',
            txHash: String(tx.txHash || '')
          }))
          setRecentPayments(formatted.slice(0, 3))
          setPaymentHistory(formatted)
          
          // Calculate stats
          const completedPayments = formatted.filter((tx: Payment) => tx.status === 'completed')
          const totalAmount = completedPayments.reduce((sum: number, tx: Payment) => {
            return sum + parseFloat(tx.amount || '0')
          }, 0)
          const uniqueArtists = new Set(completedPayments.map((tx: Payment) => tx.walletAddress))
          
          setStats({
            totalPayments: completedPayments.length,
            totalSent: totalAmount >= 1000 
              ? `$${(totalAmount / 1000).toFixed(1)}K` 
              : `$${totalAmount.toFixed(2)}`,
            artistsPaid: uniqueArtists.size
          })
        }
      } catch (error) {
        setRecentPayments([])
        setPaymentHistory([])
        setStats({ totalPayments: 0, totalSent: '$0', artistsPaid: 0 })
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
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 gradient-text">
            Promoter Dashboard
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage payments and track your transactions
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 sm:mb-8 w-full overflow-x-auto">
          <button
            onClick={() => setActiveView('overview')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${activeView === 'overview'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
              : 'bg-card text-foreground hover:bg-muted border-2 border-border hover:border-primary/50'
              }`}
          >
            <span className="icon-[mdi--view-dashboard] inline-block mr-1 sm:mr-2 text-base sm:text-lg" />
            Overview
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${activeView === 'history'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
              : 'bg-card text-foreground hover:bg-muted border-2 border-border hover:border-primary/50'
              }`}
          >
            <span className="icon-[mdi--history] inline-block mr-1 sm:mr-2 text-base sm:text-lg" />
            History
          </button>
        </div>

        {/* Overview View */}
        {activeView === 'overview' && (
          <div className="space-y-4 sm:space-y-6 animate-in">
            {/* Balance and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2">
                <BalanceOverview balance={balance} stats={stats} />
              </div>
              <div className="lg:col-span-1">
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

      {/* Send Payment Modal */}
      <SendPaymentModal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
      />
    </DashboardSidebar>
  )
}
