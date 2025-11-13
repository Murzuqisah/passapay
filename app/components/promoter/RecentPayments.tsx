'use client'

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

interface RecentPaymentsProps {
  payments: Payment[]
  onViewAll: () => void
}

export function RecentPayments({ payments, onViewAll }: RecentPaymentsProps) {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return 'Just now'
  }

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'text-primary'
      case 'pending':
        return 'text-accent'
      case 'failed':
        return 'text-destructive'
    }
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

  return (
    <div className="section-glass rounded-2xl p-6 md:p-8 border-2 border-border/50 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl opacity-50" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Recent Payments
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your latest transactions
          </p>
        </div>
        <button 
          onClick={onViewAll}
          className="text-primary hover:text-primary/80 font-bold text-sm flex items-center gap-1 transition-colors duration-200"
        >
          <span>View All</span>
          <span className="icon-[mdi--arrow-right] text-lg" />
        </button>
      </div>

      <div className="space-y-3">
        {payments.map((payment, index) => (
          <div 
            key={payment.id}
            className="glass-card rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Left: Recipient Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="icon-[mdi--account-music] text-2xl text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {payment.recipient}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {payment.walletAddress.slice(0, 8)}...{payment.walletAddress.slice(-6)}
                  </p>
                </div>
              </div>

              {/* Right: Amount and Status */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-foreground text-lg">
                  ${payment.amount}
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className={`${getStatusIcon(payment.status)} text-sm ${getStatusColor(payment.status)}`} />
                  <span className="text-xs text-muted-foreground">
                    {formatDate(payment.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {payments.length === 0 && (
        <div className="text-center py-12">
          <span className="icon-[mdi--cash-remove] text-6xl text-muted-foreground/30 mb-4 block" />
          <p className="text-muted-foreground">No recent payments</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your payment history will appear here
          </p>
        </div>
      )}
    </div>
  )
}
