'use client'

import { useState } from 'react'
import AccountCard from './components/account-card'
import Footer from './components/footer'
import Header from './components/header'
import SendPayment from './components/send-payment'
import PaymentHistory from './components/payment-history'
import ArtistProfile from './components/artist-profile'
import { useConnect } from './hooks/use-connect'
import { unifyAddress } from './utils/formatters'
import { chainKeys } from './utils/sdk'

export default function Home() {
  const { selectedAccount } = useConnect()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'send' | 'history' | 'profile'>('dashboard')

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            PassaPay
          </h1>
          <p className="text-lg text-gray-600">
            Cross-border payments for artists — simplified
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      {selectedAccount && (
        <div className="container mx-auto px-4">
          <div className="tabs tabs-boxed bg-gray-100 w-fit mx-auto">
            <button 
              className={`tab ${activeTab === 'dashboard' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`tab ${activeTab === 'send' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('send')}
            >
              Send Payment
            </button>
            <button 
              className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
            <button 
              className={`tab ${activeTab === 'profile' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto py-8 flex-1">
        {!selectedAccount ? (
          <div className="text-center py-16">
            <span className="icon-[mdi--wallet] text-6xl text-gray-400 mb-4 block" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Connect Your Wallet</h2>
            <p className="text-gray-500">Connect your wallet to start sending and receiving payments</p>
          </div>
        ) : (
          <div className="space-y-8">
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {chainKeys.map(chainKey => (
                  <AccountCard
                    key={chainKey}
                    chainKey={chainKey}
                    address={unifyAddress(selectedAccount.address)}
                  />
                ))}
              </div>
            )}
            
            {activeTab === 'send' && <SendPayment />}
            
            {activeTab === 'history' && <PaymentHistory />}
            
            {activeTab === 'profile' && <ArtistProfile />}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
