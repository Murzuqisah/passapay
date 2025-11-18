'use client'

import { useState, useEffect } from 'react'
import { useConnect } from '../../hooks/use-connect'
import { useMetaMask } from '../../hooks/use-metamask'
import DashboardSidebar from '../../components/DashboardSidebar'

interface Transaction {
  _id: string
  txHash: string
  fromAddress: string
  toAddress: string
  amount: string
  currency: string
  status: 'pending' | 'completed' | 'failed'
  timestamp: string
  createdAt: string
  senderName?: string
}

export default function ArtistTransactionsPage() {
  const { selectedAccount } = useConnect()
  const metamask = useMetaMask()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')

  useEffect(() => {
    const fetchTransactions = async () => {
      const address = metamask.account?.address || selectedAccount?.address
      if (!address) return
      
      setLoading(true)
      try {
        const res = await fetch(`/api/transactions?address=${address}`)
        if (res.ok) {
          const data = await res.json()
          const txArray = Array.isArray(data) ? data : []
          
          // Fetch user names for senders
          const formatted = await Promise.all(txArray.map(async (tx: any) => {
            const fromAddr = tx.fromAddress || ''
            let senderName = fromAddr.slice(0, 6) + '...' + fromAddr.slice(-4)
            
            try {
              // Normalize address to lowercase for consistent lookup
              const normalizedAddr = fromAddr.toLowerCase()
              const userRes = await fetch(`/api/users?walletAddress=${normalizedAddr}`)
              
              if (userRes.ok) {
                const userData = await userRes.json()
                if (userData.exists && userData.user?.name) {
                  senderName = userData.user.name
                }
              }
            } catch {
              // Use shortened address if name fetch fails
            }
            
            return {
              ...tx,
              senderName
            }
          }))
          setTransactions(formatted)
        }
      } catch {
        // Failed to fetch transactions
      } finally {
        setLoading(false)
      }
    }
    
    fetchTransactions()
  }, [selectedAccount, metamask.account])

  const filteredTransactions = transactions.filter(tx => 
    filter === 'all' || tx.status === filter
  )

  const stats = {
    total: transactions.length,
    completed: transactions.filter(tx => tx.status === 'completed').length,
    pending: transactions.filter(tx => tx.status === 'pending').length,
    failed: transactions.filter(tx => tx.status === 'failed').length,
    totalAmount: transactions
      .filter(tx => tx.status === 'completed')
      .reduce((sum, tx) => sum + parseFloat(tx.amount || '0'), 0)
      .toFixed(2)
  }

  const getStatusBadge = (status: Transaction['status']) => {
    const styles = {
      completed: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
      pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      failed: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
    }
    return styles[status]
  }

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'icon-[mdi--check-circle]'
      case 'pending':
        return 'icon-[mdi--clock-outline]'
      case 'failed':
        return 'icon-[mdi--alert-circle]'
    }
  }

  return (
    <DashboardSidebar userType="artist">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Transaction History</h1>
          <p className="text-muted-foreground">View all your payment transactions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-xl border-2 border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Total</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="glass-card p-4 rounded-xl border-2 border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
          </div>
          <div className="glass-card p-4 rounded-xl border-2 border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
          </div>
          <div className="glass-card p-4 rounded-xl border-2 border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
            <p className="text-2xl font-bold gradient-text">{stats.totalAmount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
                filter === status
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'bg-card text-foreground hover:bg-muted border-2 border-border'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        {loading ? (
          <div className="glass-card p-12 rounded-xl text-center">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground mt-4">Loading transactions...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="glass-card p-12 rounded-xl text-center">
            <span className="icon-[mdi--receipt-text-outline] text-6xl text-muted-foreground/30 mb-4 inline-block" />
            <p className="text-muted-foreground text-lg font-medium">No transactions found</p>
            <p className="text-sm text-muted-foreground mt-2">
              {filter !== 'all' ? 'Try adjusting your filters' : 'Your transactions will appear here'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <div 
                key={tx._id}
                className="glass-card p-4 sm:p-6 rounded-xl border-2 border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Transaction Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        tx.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' :
                        tx.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                        'bg-red-100 dark:bg-red-900/30'
                      }`}>
                        <span className={`${getStatusIcon(tx.status)} w-5 h-5 ${
                          tx.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                          tx.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-red-600 dark:text-red-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground mb-1">
                          From: {tx.senderName || 'Unknown Sender'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(tx.timestamp || tx.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono ml-13">
                      <span className="icon-[mdi--link-variant] flex-shrink-0" />
                      <span className="truncate">{tx.txHash}</span>
                    </div>
                  </div>

                  {/* Right: Amount and Status */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-2">
                    <p className="text-2xl font-bold text-foreground">{tx.amount} {tx.currency}</p>
                    <div className={`px-3 py-1 rounded-lg border-2 flex items-center gap-1 ${getStatusBadge(tx.status)}`}>
                      <span className={`${getStatusIcon(tx.status)} text-sm`} />
                      <span className="text-xs font-bold capitalize">{tx.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardSidebar>
  )
}
