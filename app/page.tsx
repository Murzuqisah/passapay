'use client'

import { useState, useEffect } from 'react'
import OnboardingModal from './components/onboarding-modal'
import { useConnect } from './hooks/use-connect'
import {
  Footer,
  Navbar,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  CTASection
} from './components'

export default function Home() {
  const { selectedAccount } = useConnect()

  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isCheckingUser, setIsCheckingUser] = useState(false)

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!selectedAccount?.address) return

      setIsCheckingUser(true)
      
      // Try to sync queued requests
      const { syncQueue } = await import('./lib/sync-queue')
      await syncQueue()
      
      try {
        const response = await fetch(`/api/users?walletAddress=${selectedAccount.address}`)
        const data = await response.json()
        
        if (data.useLocalStorage) {
          const { userExists } = await import('./lib/local-storage')
          if (!userExists(selectedAccount.address)) {
            setShowOnboarding(true)
          }
        } else if (!data.exists) {
          setShowOnboarding(true)
        }
      } catch (error) {
        console.error('Error checking user profile:', error)
      } finally {
        setIsCheckingUser(false)
      }
    }

    checkUserProfile()
  }, [selectedAccount])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />



      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showOnboarding} onComplete={handleOnboardingComplete} />

      {/* Main Content */}
      <main className="container mx-auto py-8 flex-1">
        {isCheckingUser ? (
          <div className="text-center py-16">
            <span className="icon-[mdi--loading] animate-spin text-6xl text-gray-400 mb-4 block" />
            <p className="text-gray-500">Loading profile...</p>
          </div>
        ) : !selectedAccount ? (
          <div className="text-center py-16">
            <span className="icon-[mdi--wallet] text-6xl text-gray-400 mb-4 block" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Connect Your Wallet</h2>
            <p className="text-gray-500">Connect your wallet to start sending and receiving payments</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="icon-[mdi--check-circle] text-6xl text-green-400 mb-4 block" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Wallet Connected</h2>
            <p className="text-gray-500">Welcome to PassaPay! Your dashboard features are coming soon.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
