'use client'

import { useState } from 'react'

interface BalanceOverviewProps {
  balance: {
    usdc: string
    dot: string
    usdValue: string
  }
}

export function BalanceOverview({ balance }: BalanceOverviewProps) {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="section-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden border-2 border-border/50">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-50 hidden sm:block" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            Balance Overview
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="px-3 py-1.5 hover:bg-primary/10 rounded-lg transition-all duration-200 border-2 border-border hover:border-primary/50 text-xs sm:text-sm font-bold text-foreground hover:text-primary"
              title={showBalance ? 'Hide balance' : 'Show balance'}
            >
              {showBalance ? 'Hide' : 'Show'}
            </button>
            <span className="icon-[mdi--wallet] text-2xl sm:text-3xl text-primary" />
          </div>
        </div>

        {/* Main Balance */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Total Balance (USD)</p>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">
              {showBalance ? `$${balance.usdValue}` : '••••••'}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">USD</span>
          </div>
        </div>

        {/* Token Balances */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {/* USDC Balance */}
          <div className="glass-card rounded-lg sm:rounded-xl py-2 px-2 sm:py-3 sm:px-3 border border-border/50 text-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1">
              <span className="icon-[token-branded--usdc] text-base sm:text-xl text-primary" />
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">USDC</p>
            <p className="text-sm sm:text-lg font-bold text-foreground">
              {showBalance ? balance.usdc : '••••••'}
            </p>
            <p className="text-[10px] sm:text-xs text-foreground/60">Available</p>
          </div>

          {/* DOT Balance */}
          <div className="glass-card rounded-lg sm:rounded-xl py-2 px-2 sm:py-3 sm:px-3 border border-border/50 text-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-1">
              <span className="icon-[token-branded--dot] text-base sm:text-xl text-accent" />
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">DOT</p>
            <p className="text-sm sm:text-lg font-bold text-foreground">
              {showBalance ? balance.dot : '••••••'}
            </p>
            <p className="text-[10px] sm:text-xs text-foreground/60">For fees</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/50">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-primary">24</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Total Payments</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-accent">$45.2K</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Total Sent</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">12</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Artists Paid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
