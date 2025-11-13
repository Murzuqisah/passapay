'use client'

import { useState } from 'react'
import { Navbar } from '@/app/components'
import {
  BalanceOverview,
  QuickSendButton,
  RecentPayments,
  PaymentHistory,
  SendPaymentModal
} from '@/app/components/promoter'

// Dummy data
const dummyBalance = {
  usdc: '12,450.00',
  dot: '245.50',
  usdValue: '14,892.75'
}

const dummyRecentPayments = [
  {
    id: '1',
    recipient: 'Bien-Aimé Baraza',
    walletAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    amount: '5,000.00',
    currency: 'USDC',
    timestamp: new Date('2024-11-10T14:30:00'),
    status: 'completed' as const,
    txHash: '0x1234...5678'
  },
  {
    id: '2',
    recipient: 'Sauti Sol',
    walletAddress: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    amount: '3,200.00',
    currency: 'USDC',
    timestamp: new Date('2024-11-09T18:45:00'),
    status: 'completed' as const,
    txHash: '0xabcd...efgh'
  },
  {
    id: '3',
    recipient: 'Nyashinski',
    walletAddress: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
    amount: '2,500.00',
    currency: 'USDC',
    timestamp: new Date('2024-11-08T20:15:00'),
    status: 'completed' as const,
    txHash: '0x9876...4321'
  }
]

const dummyPaymentHistory = [
  ...dummyRecentPayments,
  {
    id: '4',
    recipient: 'Khaligraph Jones',
    walletAddress: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
    amount: '1,800.00',
    currency: 'USDC',
    timestamp: new Date('2024-11-07T16:20:00'),
    status: 'completed' as const,
    txHash: '0xdef1...2345'
  },
  {
    id: '5',
    recipient: 'Otile Brown',
    walletAddress: '5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL',
    amount: '4,500.00',
    currency: 'USDC',
    timestamp: new Date('2024-11-06T12:00:00'),
    status: 'completed' as const,
    txHash: '0x5678...9abc'
  },
  {
    id: '6',
    recipient: 'Nadia Mukami',
    walletAddress: '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y',
    amount: '2,100.00',
    currency: 'USDC',
    timestamp: new Date('2024-11-05T09:30:00'),
    status: 'pending' as const,
    txHash: '0xpend...ing1'
  }
]

export default function PromoterDashboard() {
  const [showSendModal, setShowSendModal] = useState(false)
  const [activeView, setActiveView] = useState<'overview' | 'history'>('overview')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Glass Effect */}
      <section className="relative pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

        {/* Decorative gradient orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-30 animate-float hidden sm:block" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl opacity-30 animate-float hidden sm:block" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 gradient-text">
                Promoter Dashboard
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg">
                Manage payments and track your transactions
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-6 sm:mb-8 w-full">
              <button
                onClick={() => setActiveView('overview')}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${activeView === 'overview'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                  : 'bg-card text-foreground hover:bg-muted border-2 border-border hover:border-primary/50'
                  }`}
              >
                <span className="icon-[mdi--view-dashboard] inline-block mr-1 sm:mr-2 text-lg sm:text-xl" />
                Overview
              </button>
              <button
                onClick={() => setActiveView('history')}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${activeView === 'history'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                  : 'bg-card text-foreground hover:bg-muted border-2 border-border hover:border-primary/50'
                  }`}
              >
                <span className="icon-[mdi--history] inline-block mr-1 sm:mr-2 text-lg sm:text-xl" />
                History
              </button>
            </div>

            {/* Overview View */}
            {activeView === 'overview' && (
              <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-in">
                {/* Balance and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="lg:col-span-2">
                    <BalanceOverview balance={dummyBalance} />
                  </div>
                  <div>
                    <QuickSendButton onClick={() => setShowSendModal(true)} />
                  </div>
                </div>

                {/* Recent Payments */}
                <RecentPayments
                  payments={dummyRecentPayments}
                  onViewAll={() => setActiveView('history')}
                />
              </div>
            )}

            {/* History View */}
            {activeView === 'history' && (
              <div className="animate-in">
                <PaymentHistory payments={dummyPaymentHistory} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Send Payment Modal */}
      <SendPaymentModal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
      />
    </div>
  )
}
