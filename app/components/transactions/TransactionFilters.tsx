'use client'

import { useState, useEffect } from 'react'

interface Transaction {
  txHash: string
  fromAddress: string
  toAddress: string
  amount: string
  status: 'pending' | 'completed' | 'failed'
  timestamp: Date
}

interface TransactionFiltersProps {
  transactions: Transaction[]
  onFilter: (filtered: Transaction[]) => void
  loading: boolean
}

export function TransactionFilters({ transactions, onFilter, loading }: TransactionFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')
  const [dateFilter, setDateFilter] = useState<'all' | '7days' | '30days' | '90days'>('all')
  const [amountFilter, setAmountFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')

  useEffect(() => {
    if (loading) return

    let filtered = [...transactions]

    // Search filter (by amount, recipient address, or tx hash)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(tx => 
        tx.amount.includes(query) ||
        tx.toAddress.toLowerCase().includes(query) ||
        tx.fromAddress.toLowerCase().includes(query) ||
        tx.txHash.toLowerCase().includes(query)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tx => tx.status === statusFilter)
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date()
      const days = dateFilter === '7days' ? 7 : dateFilter === '30days' ? 30 : 90
      const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(tx => new Date(tx.timestamp) >= cutoffDate)
    }

    // Amount filter
    if (amountFilter !== 'all') {
      filtered = filtered.filter(tx => {
        const amount = parseFloat(tx.amount.replace(/,/g, ''))
        if (amountFilter === 'low') return amount < 1000
        if (amountFilter === 'medium') return amount >= 1000 && amount < 5000
        return amount >= 5000
      })
    }

    onFilter(filtered)
  }, [searchQuery, statusFilter, dateFilter, amountFilter, transactions, loading, onFilter])

  const handleReset = () => {
    setSearchQuery('')
    setStatusFilter('all')
    setDateFilter('all')
    setAmountFilter('all')
  }

  return (
    <div className="section-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-border/50">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <span className="icon-[mdi--magnify] absolute left-3 top-1/2 -translate-y-1/2 text-lg sm:text-xl text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by amount, address, or transaction hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-card border-2 border-border rounded-lg sm:rounded-xl text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
            disabled={loading}
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Status Filter */}
        <div className="flex-1">
          <label className="text-xs font-bold text-foreground/70 mb-1.5 block">Status</label>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                disabled={loading}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap transition-all duration-200 ${
                  statusFilter === status
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-card text-foreground hover:bg-muted border-2 border-border'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex-1">
          <label className="text-xs font-bold text-foreground/70 mb-1.5 block">Date Range</label>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {([
              { value: 'all', label: 'All Time' },
              { value: '7days', label: '7 Days' },
              { value: '30days', label: '30 Days' },
              { value: '90days', label: '90 Days' }
            ] as const).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setDateFilter(value)}
                disabled={loading}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap transition-all duration-200 ${
                  dateFilter === value
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-card text-foreground hover:bg-muted border-2 border-border'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Amount Filter */}
        <div className="flex-1">
          <label className="text-xs font-bold text-foreground/70 mb-1.5 block">Amount</label>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {([
              { value: 'all', label: 'All' },
              { value: 'low', label: '<$1K' },
              { value: 'medium', label: '$1K-$5K' },
              { value: 'high', label: '>$5K' }
            ] as const).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setAmountFilter(value)}
                disabled={loading}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap transition-all duration-200 ${
                  amountFilter === value
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-card text-foreground hover:bg-muted border-2 border-border'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {(searchQuery || statusFilter !== 'all' || dateFilter !== 'all' || amountFilter !== 'all') && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleReset}
            disabled={loading}
            className="px-4 py-2 text-sm font-bold text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1"
          >
            <span className="icon-[mdi--refresh] text-lg" />
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
