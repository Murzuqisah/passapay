'use client'

import { useState } from 'react'
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
  onComplete: (data: OnboardingData) => void
}

export default function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const { selectedAccount } = useConnect()
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
        walletAddress: selectedAccount?.address
      }
      
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      
      if (response.ok) {
        onComplete(data)
      } else {
        // Queue for retry
        const { addToQueue } = await import('../lib/sync-queue')
        addToQueue('/api/users', 'POST', userData)
        onComplete(data)
      }
    } catch {
      // Queue for retry on network error
      const { addToQueue } = await import('../lib/sync-queue')
      addToQueue('/api/users', 'POST', {
        ...data,
        walletAddress: selectedAccount?.address
      })
      onComplete(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedStep1 = data.userType !== ''
  const canProceedStep2 = data.name && data.email && data.country
  const canProceedStep3 = data.userType === 'artist' ? data.genre : data.organization

  if (!isOpen) return null

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-2">Welcome to PassaPay</h3>
        <p className="text-gray-600 mb-6">Complete your profile to get started</p>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
          </div>
        </div>

        {/* Step 1: User Type */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">I am a...</h4>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`card border-2 cursor-pointer hover:border-primary transition-all ${data.userType === 'artist' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                onClick={() => setData({ ...data, userType: 'artist' })}
              >
                <div className="card-body items-center text-center">
                  <span className="icon-[mdi--music] text-4xl text-primary" />
                  <h5 className="font-semibold">Artist</h5>
                  <p className="text-sm text-gray-600">Receive payments for performances</p>
                </div>
              </div>
              <div
                className={`card border-2 cursor-pointer hover:border-primary transition-all ${data.userType === 'promoter' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                onClick={() => setData({ ...data, userType: 'promoter' })}
              >
                <div className="card-body items-center text-center">
                  <span className="icon-[mdi--briefcase] text-4xl text-primary" />
                  <h5 className="font-semibold">Promoter</h5>
                  <p className="text-sm text-gray-600">Send payments to artists</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Basic Info */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Basic Information</h4>
            <div className="form-control">
              <label className="label"><span className="label-text">Full Name *</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Email *</span></label>
              <input
                type="email"
                className="input input-bordered"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Country *</span></label>
              <select
                className="select select-bordered"
                value={data.country}
                onChange={(e) => setData({ ...data, country: e.target.value })}
              >
                <option value="">Select country</option>
                <option value="KE">Kenya</option>
                <option value="NG">Nigeria</option>
                <option value="GH">Ghana</option>
                <option value="ZA">South Africa</option>
                <option value="UG">Uganda</option>
                <option value="TZ">Tanzania</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Additional Info */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">
              {data.userType === 'artist' ? 'Artist Details' : 'Organization Details'}
            </h4>
            {data.userType === 'artist' ? (
              <div className="form-control">
                <label className="label"><span className="label-text">Genre *</span></label>
                <select
                  className="select select-bordered"
                  value={data.genre}
                  onChange={(e) => setData({ ...data, genre: e.target.value })}
                >
                  <option value="">Select genre</option>
                  <option value="afrobeats">Afrobeats</option>
                  <option value="hip-hop">Hip Hop</option>
                  <option value="reggae">Reggae</option>
                  <option value="jazz">Jazz</option>
                  <option value="rock">Rock</option>
                  <option value="pop">Pop</option>
                </select>
              </div>
            ) : (
              <div className="form-control">
                <label className="label"><span className="label-text">Organization Name *</span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={data.organization}
                  onChange={(e) => setData({ ...data, organization: e.target.value })}
                  placeholder="Enter organization name"
                />
              </div>
            )}
            <div className="alert alert-info">
              <span className="icon-[mdi--information]" />
              <span>Your wallet address will be linked to this profile</span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="modal-action">
          {step > 1 && (
            <button className="btn btn-ghost" onClick={handleBack}>
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              className="btn btn-primary"
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
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!canProceedStep3 || isSubmitting}
            >
              {isSubmitting ? 'Creating Profile...' : 'Complete Setup'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}