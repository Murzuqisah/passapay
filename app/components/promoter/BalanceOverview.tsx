'use client'

interface BalanceOverviewProps {
  balance: {
    usdc: string
    dot: string
    usdValue: string
  }
}

export function BalanceOverview({ balance }: BalanceOverviewProps) {
  return (
    <div className="section-glass rounded-2xl p-6 md:p-8 relative overflow-hidden border-2 border-border/50">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-50" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Balance Overview
          </h2>
          <span className="icon-[mdi--wallet] text-3xl text-primary" />
        </div>

        {/* Main Balance */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-2">Total Balance (USD)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-bold gradient-text">
              ${balance.usdValue}
            </span>
            <span className="text-sm text-muted-foreground">USD</span>
          </div>
        </div>

        {/* Token Balances */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* USDC Balance */}
          <div className="glass-card rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="icon-[token-branded--usdc] text-2xl text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">USDC</p>
                <p className="text-lg font-bold text-foreground">{balance.usdc}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="icon-[mdi--trending-up] text-sm text-primary" />
              <span>Available for payments</span>
            </div>
          </div>

          {/* DOT Balance */}
          <div className="glass-card rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="icon-[token-branded--dot] text-2xl text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">DOT</p>
                <p className="text-lg font-bold text-foreground">{balance.dot}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="icon-[mdi--gas-station] text-sm text-accent" />
              <span>For transaction fees</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">24</p>
              <p className="text-xs text-muted-foreground mt-1">Total Payments</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">$45.2K</p>
              <p className="text-xs text-muted-foreground mt-1">Total Sent</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground mt-1">Artists Paid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
