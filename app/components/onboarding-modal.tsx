'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useConnect } from '../hooks/use-connect'

interface OnboardingData {
  userType: 'artist' | 'promoter' | ''
  name: string
  email: string
  country: string
  genre?: string
  organization?: string
}

interface OnboardingModalProps {
  isOpen: boolean
  onComplete: () => void
}

export default function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const { selectedAccount } = useConnect()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    userType: '',
    name: '',
    email: '',
    country: '',
    genre: '',
    organization: ''
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const userData = {
        ...data,
        userType: data.userType as 'artist' | 'promoter',
        walletAddress: selectedAccount?.address || ''
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      const result = await response.json()

      if (response.ok) {
        // Save to localStorage if using fallback
        if (result.useLocalStorage) {
          const { saveUserProfile } = await import('../lib/local-storage')
          saveUserProfile(userData)
        }
        onComplete()
        // Redirect to appropriate dashboard
        router.push(data.userType === 'artist' ? '/artist' : '/promoter/dashboard')
      } else {
        // Queue for retry
        const { addToQueue } = await import('../lib/sync-queue')
        addToQueue('/api/users', 'POST', userData)
        // Still complete onboarding to not block user
        onComplete()
      }
    } catch {
      // Queue for retry on network error
      const { addToQueue } = await import('../lib/sync-queue')
      const userData = {
        ...data,
        userType: data.userType as 'artist' | 'promoter',
        walletAddress: selectedAccount?.address || ''
      }
      addToQueue('/api/users', 'POST', userData)

      // Save to localStorage as fallback
      const { saveUserProfile } = await import('../lib/local-storage')
      saveUserProfile(userData)

      onComplete()
      // Redirect to appropriate dashboard even on error
      router.push(data.userType === 'artist' ? '/artist' : '/promoter/dashboard')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedStep1 = data.userType !== ''
  const canProceedStep2 = data.userType === 'artist' ? (data.name && data.email && data.country) : (data.email && data.country)
  const canProceedStep3 = data.userType === 'artist' ? data.genre : data.organization

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onComplete}>
      <div 
        className="absolute inset-0"
        onClick={onComplete}
      />
      <div className="relative bg-card border-2 border-border rounded-xl shadow-2xl w-[95vw] sm:w-[600px] lg:w-[700px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="text-center p-8 pb-6 border-b border-border">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="icon-[mdi--account-plus] text-3xl text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground mb-2">Welcome to PassaPay</h2>
          <p className="text-muted-foreground">Complete your profile to get started</p>
        </div>

        {/* Content */}
        <div className="p-8">

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>1</div>
              <div className={`w-20 h-1 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'
                }`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>2</div>
              <div className={`w-20 h-1 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-muted'
                }`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>3</div>
            </div>
          </div>

          {/* Step 1: User Type */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-card-foreground">I am a...</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  className={`p-6 rounded-lg border-2 transition-all hover:border-primary/50 ${data.userType === 'artist'
                      ? 'border-primary bg-primary/20 shadow-lg shadow-primary/20'
                      : 'border-border bg-background hover:bg-accent/50'
                    }`}
                  onClick={() => setData({ ...data, userType: 'artist' })}
                >
                  <div className="text-center space-y-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                      data.userType === 'artist' ? 'bg-primary/30' : 'bg-primary/10'
                    }`}>
                      <span className="icon-[mdi--music] text-2xl text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">Artist</h4>
                    <p className="text-sm text-muted-foreground">Receive payments for performances</p>
                  </div>
                </button>
                <button
                  className={`p-6 rounded-lg border-2 transition-all hover:border-primary/50 ${data.userType === 'promoter'
                      ? 'border-primary bg-primary/20 shadow-lg shadow-primary/20'
                      : 'border-border bg-background hover:bg-accent/50'
                    }`}
                  onClick={() => setData({ ...data, userType: 'promoter' })}
                >
                  <div className="text-center space-y-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                      data.userType === 'promoter' ? 'bg-primary/30' : 'bg-primary/10'
                    }`}>
                      <span className="icon-[mdi--briefcase] text-2xl text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">Promoter</h4>
                    <p className="text-sm text-muted-foreground">Send payments to artists</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-card-foreground">Basic Information</h3>
              <div className="space-y-4">
                {data.userType === 'artist' && (
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">Full Name *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Country *</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [&>option]:bg-background [&>option]:text-foreground"
                    value={data.country}
                    onChange={(e) => setData({ ...data, country: e.target.value })}
                  >
                    <option value="" className="text-muted-foreground">Select country</option>
                    <option value="KE">Kenya</option>
                    <option value="NG">Nigeria</option>
                    <option value="GH">Ghana</option>
                    <option value="ZA">South Africa</option>
                    <option value="UG">Uganda</option>
                    <option value="TZ">Tanzania</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Additional Info */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-card-foreground">
                {data.userType === 'artist' ? 'Artist Details' : 'Organization Details'}
              </h3>
              <div className="space-y-4">
                {data.userType === 'artist' ? (
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">Genre *</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [&>option]:bg-background [&>option]:text-foreground"
                      value={data.genre}
                      onChange={(e) => setData({ ...data, genre: e.target.value })}
                    >
                      <option value="" className="text-muted-foreground">Select genre</option>
                      <option value="afrobeats">Afrobeats</option>
                      <option value="hip-hop">Hip Hop</option>
                      <option value="reggae">Reggae</option>
                      <option value="jazz">Jazz</option>
                      <option value="rock">Rock</option>
                      <option value="pop">Pop</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">Organization Name *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={data.organization}
                      onChange={(e) => setData({ ...data, organization: e.target.value })}
                      placeholder="Enter organization name"
                    />
                  </div>
                )}
                <div className="p-4 bg-accent/50 border border-border rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="icon-[mdi--information] text-primary mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Your wallet address will be linked to this profile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-8 pt-6 border-t border-border">
          {step > 1 ? (
            <button
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleBack}
            >
              Back
            </button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <button
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={
                (step === 1 && !canProceedStep1) ||
                (step === 2 && !canProceedStep2)
              }
            >
              Next
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={handleSubmit}
              disabled={!canProceedStep3 || isSubmitting}
            >
              {isSubmitting && <span className="icon-[mdi--loading] animate-spin" />}
              {isSubmitting ? 'Creating Profile...' : 'Complete Setup'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}