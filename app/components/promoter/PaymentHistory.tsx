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
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <span className="icon-[mdi--magnify] absolute left-3 top-1/2 -translate-y-1/2 text-xl text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by recipient or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="glass-card rounded-xl p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-foreground">{filteredPayments.length}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Total Sent</p>
          <p className="text-2xl font-bold gradient-text">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Pending Payments</p>
          <p className="text-2xl font-bold text-accent">
            {payments.filter(p => p.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Payment List */}
      <div className="space-y-3">
        {filteredPayments.map((payment, index) => (
          <div 
            key={payment.id}
            className="glass-card rounded-xl p-4 md:p-5 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left: Recipient Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="icon-[mdi--account-music] text-2xl text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground mb-1">
                    {payment.recipient}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {payment.walletAddress}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(payment.timestamp)}
                  </p>
                </div>
              </div>

              {/* Right: Amount, Status, and Actions */}
              <div className="flex items-center gap-4 md:gap-6">
                {/* Amount */}
                <div className="text-right">
                  <p className="font-bold text-foreground text-xl">
                    ${payment.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.currency}
                  </p>
                </div>

                {/* Status */}
                <div className={`px-3 py-1.5 rounded-lg border-2 flex items-center gap-1.5 ${getStatusBadge(payment.status)}`}>
                  <span className={`${getStatusIcon(payment.status)} text-sm`} />
                  <span className="text-xs font-bold capitalize">
                    {payment.status}
                  </span>
                </div>

                {/* Actions */}
                <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 flex-shrink-0">
                  <span className="icon-[mdi--dots-vertical] text-xl text-muted-foreground" />
                </button>
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
