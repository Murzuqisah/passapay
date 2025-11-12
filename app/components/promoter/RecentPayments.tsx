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
    <div className="section-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-border/50 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl opacity-50 hidden sm:block" />
      
      <div className="flex items-center justify-between mb-4 sm:mb-6 relative z-10">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            Recent Payments
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
            Your latest transactions
          </p>
        </div>
        <button 
          onClick={onViewAll}
          className="text-primary hover:text-primary/80 font-bold text-xs sm:text-sm flex items-center gap-1 transition-colors duration-200 flex-shrink-0 whitespace-nowrap"
        >
          <span>View All</span>
          <span className="icon-[mdi--arrow-right] text-base sm:text-lg" />
        </button>
      </div>

      <div className="space-y-2 sm:space-y-3 relative z-10">
        {payments.map((payment, index) => (
          <div 
            key={payment.id}
            className="bg-card/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              {/* Left: Recipient Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm sm:text-base truncate">
                  {payment.recipient}
                </p>
                <p className="text-xs text-muted-foreground font-mono truncate">
                  {payment.walletAddress.slice(0, 6)}...{payment.walletAddress.slice(-4)}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`${getStatusIcon(payment.status)} text-xs ${getStatusColor(payment.status)}`} />
                  <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(payment.timestamp)}
                  </span>
                </div>
              </div>

              {/* Right: Amount */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-foreground text-base sm:text-lg whitespace-nowrap">
                  ${payment.amount}
                </p>
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
