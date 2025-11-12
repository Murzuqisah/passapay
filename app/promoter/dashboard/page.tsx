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
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
                Promoter Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage payments and track your transactions
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-8 flex-wrap">
              <button
                onClick={() => setActiveView('overview')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeView === 'overview'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-card text-card-foreground hover:bg-muted'
                  }`}
              >
                <span className="icon-[mdi--view-dashboard] inline-block mr-2 text-xl" />
                Overview
              </button>
              <button
                onClick={() => setActiveView('history')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeView === 'history'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-card text-card-foreground hover:bg-muted'
                  }`}
              >
                <span className="icon-[mdi--history] inline-block mr-2 text-xl" />
                Payment History
              </button>
            </div>

            {/* Overview View */}
            {activeView === 'overview' && (
              <div className="space-y-8 animate-in">
                {/* Balance and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
