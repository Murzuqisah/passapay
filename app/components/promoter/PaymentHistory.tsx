'use client'

import { useState } from 'react'

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

interface PaymentHistoryProps {
  payments: Payment[]
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPayments = payments.filter(payment => {
    const matchesFilter = filter === 'all' || payment.status === filter
    const matchesSearch = payment.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusBadge = (status: Payment['status']) => {
    const styles = {
      completed: 'bg-primary/10 text-primary border-primary/20',
      pending: 'bg-accent/10 text-accent border-accent/20',
      failed: 'bg-destructive/10 text-destructive border-destructive/20'
    }
    return styles[status]
  }

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'icon-[mdi--check-circle]'
      case 'pending':
        return 'icon-[mdi--clock-outline]'
      case 'failed':
        return 'icon-[mdi--alert-circle]'
    }
  }

  const totalAmount = filteredPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace(/,/g, '')), 0)

  return (
    <div className="section-glass rounded-2xl p-6 md:p-8 border-2 border-border/50 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl opacity-50" />
      
      {/* Header */}
      <div className="mb-6 relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          Payment History
        </h2>
        <p className="text-sm text-muted-foreground">
          Complete record of all your transactions
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6 relative z-10">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <span className="icon-[mdi--magnify] absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-lg sm:text-xl text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by recipient or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-card border border-border rounded-lg sm:rounded-xl text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide">
          {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                filter === status
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                  : 'bg-card text-foreground hover:bg-muted border-2 border-border hover:border-primary/50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 relative z-10">
        <div className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-foreground">{filteredPayments.length}</p>
        </div>
        <div className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Total Sent</p>
          <p className="text-2xl font-bold gradient-text">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-4 border border-border/50 col-span-2 sm:col-span-1">
          <p className="text-xs text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-bold text-accent">
            {payments.filter(p => p.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Payment List */}
      <div className="space-y-3 relative z-10">
        {filteredPayments.map((payment, index) => (
          <div 
            key={payment.id}
            className="bg-card/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start sm:items-center gap-2 sm:gap-3">
              {/* Left: Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="icon-[mdi--account-music] text-xl sm:text-2xl text-primary" />
              </div>
              
              {/* Middle: Recipient Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm sm:text-base mb-0.5">
                  {payment.recipient}
                </p>
                <p className="text-xs text-muted-foreground font-mono truncate">
                  {payment.walletAddress}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(payment.timestamp)}
                </p>
              </div>

              {/* Right: Amount and Status */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <p className="font-bold text-foreground text-base sm:text-xl whitespace-nowrap">
                  ${payment.amount}
                </p>
                <div className={`px-2 sm:px-3 py-1 rounded-lg border-2 flex items-center gap-1 ${getStatusBadge(payment.status)}`}>
                  <span className={`${getStatusIcon(payment.status)} text-xs sm:text-sm`} />
                  <span className="text-[10px] sm:text-xs font-bold capitalize">
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Transaction Hash */}
            <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="icon-[mdi--link-variant] text-sm" />
                <span className="font-mono">{payment.txHash}</span>
              </div>
              <button className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors duration-200">
                <span>View on Explorer</span>
                <span className="icon-[mdi--open-in-new] text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPayments.length === 0 && (
        <div className="text-center py-16">
          <span className="icon-[mdi--file-document-outline] text-6xl text-muted-foreground/30 mb-4 block" />
          <p className="text-muted-foreground text-lg font-medium">No payments found</p>
          <p className="text-sm text-muted-foreground mt-2">
            {searchQuery 
              ? 'Try adjusting your search or filters'
              : 'Your payment history will appear here'}
          </p>
        </div>
      )}
    </div>
  )
}
