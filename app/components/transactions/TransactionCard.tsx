'use client'

import { useState } from 'react'
import type { Transaction } from '../../types/transaction'

interface TransactionCardProps {
  transaction: Transaction
  userAddress: string
  index: number
}

export function TransactionCard({ transaction, userAddress, index }: TransactionCardProps) {
  const [expanded, setExpanded] = useState(false)
  
  const isReceived = transaction.toAddress.toLowerCase() === userAddress.toLowerCase()
  const otherAddress = isReceived ? transaction.fromAddress : transaction.toAddress

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'completed':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'pending':
        return 'bg-accent/10 text-accent border-accent/20'
      case 'failed':
        return 'bg-destructive/10 text-destructive border-destructive/20'
    }
  }

  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'completed':
        return 'icon-[mdi--check-circle]'
      case 'pending':
        return 'icon-[mdi--clock-outline]'
      case 'failed':
        return 'icon-[mdi--alert-circle]'
    }
  }

  const getExplorerUrl = (txHash: string) => {
    // Polkadot Subscan explorer
    return `https://polkadot.subscan.io/extrinsic/${txHash}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div 
      className="bg-card/50 backdrop-blur-sm rounded-xl border-2 border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Main Content */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          {/* Left: Transaction Info */}
          <div className="flex-1 min-w-0">
            {/* Type Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`icon-[mdi--${isReceived ? 'arrow-down' : 'arrow-up'}] text-lg ${isReceived ? 'text-primary' : 'text-accent'}`} />
              <span className="text-xs sm:text-sm font-bold text-foreground">
                {isReceived ? 'Received' : 'Sent'}
              </span>
              <div className={`px-2 py-0.5 rounded-lg border-2 flex items-center gap-1 ${getStatusColor()}`}>
                <span className={`${getStatusIcon()} text-xs`} />
                <span className="text-[10px] sm:text-xs font-bold capitalize">
                  {transaction.status}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="mb-2">
              <p className="text-xs text-foreground/60 mb-0.5">
                {isReceived ? 'From' : 'To'}
              </p>
              <p className="text-xs sm:text-sm font-mono text-foreground truncate">
                {otherAddress}
              </p>
            </div>

            {/* Date */}
            <p className="text-xs text-muted-foreground">
              {formatDate(transaction.timestamp)}
            </p>
          </div>

          {/* Right: Amount */}
          <div className="text-right flex-shrink-0">
            <p className={`text-lg sm:text-2xl font-bold ${isReceived ? 'text-primary' : 'text-foreground'}`}>
              {isReceived ? '+' : '-'}${transaction.amount}
            </p>
            <p className="text-xs text-muted-foreground">USDC</p>
          </div>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-3 pt-3 border-t border-border/50 flex items-center justify-center gap-1 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors duration-200"
        >
          <span>{expanded ? 'Hide' : 'Show'} Details</span>
          <span className={`icon-[mdi--chevron-${expanded ? 'up' : 'down'}] text-lg transition-transform duration-200`} />
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3 border-t border-border/50 bg-muted/20">
          <div className="pt-3 space-y-2">
            {/* Full From Address */}
            <div>
              <p className="text-xs font-bold text-foreground/70 mb-1">From Address</p>
              <div className="flex items-center gap-2">
                <p className="text-xs font-mono text-foreground break-all flex-1">
                  {transaction.fromAddress}
                </p>
                <button
                  onClick={() => copyToClipboard(transaction.fromAddress)}
                  className="p-1.5 hover:bg-muted rounded-lg transition-colors duration-200 flex-shrink-0"
                  title="Copy address"
                >
                  <span className="icon-[mdi--content-copy] text-base text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </div>

            {/* Full To Address */}
            <div>
              <p className="text-xs font-bold text-foreground/70 mb-1">To Address</p>
              <div className="flex items-center gap-2">
                <p className="text-xs font-mono text-foreground break-all flex-1">
                  {transaction.toAddress}
                </p>
                <button
                  onClick={() => copyToClipboard(transaction.toAddress)}
                  className="p-1.5 hover:bg-muted rounded-lg transition-colors duration-200 flex-shrink-0"
                  title="Copy address"
                >
                  <span className="icon-[mdi--content-copy] text-base text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </div>

            {/* Transaction Hash */}
            <div>
              <p className="text-xs font-bold text-foreground/70 mb-1">Transaction Hash</p>
              <div className="flex items-center gap-2">
                <p className="text-xs font-mono text-foreground break-all flex-1">
                  {transaction.txHash}
                </p>
                <button
                  onClick={() => copyToClipboard(transaction.txHash)}
                  className="p-1.5 hover:bg-muted rounded-lg transition-colors duration-200 flex-shrink-0"
                  title="Copy hash"
                >
                  <span className="icon-[mdi--content-copy] text-base text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </div>

            {/* Blockchain Explorer Link */}
            <a
              href={getExplorerUrl(transaction.txHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all duration-200 text-sm border-2 border-primary/20 hover:scale-[1.02]"
            >
              <span>View on Blockchain Explorer</span>
              <span className="icon-[mdi--open-in-new] text-lg" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
