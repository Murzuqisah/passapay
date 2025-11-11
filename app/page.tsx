'use client'

import { useState } from 'react'
import { useConnect } from './hooks/use-connect'
import {
  Footer,
  Navbar,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  CTASection,
  WalletPrompt,
  DashboardTabs,
  DashboardContent
} from './components'

export default function Home() {
  const { selectedAccount } = useConnect()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'send' | 'history' | 'profile'>('dashboard')

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />

      {selectedAccount ? (
        <>
          <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <DashboardContent activeTab={activeTab} selectedAccount={selectedAccount} />
        </>
      ) : (
        <WalletPrompt />
      )}

      <Footer />
    </div>
  )
}
