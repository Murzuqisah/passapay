'use client'

import { useState, useEffect } from 'react'
import { useConnect } from '../hooks/use-connect'

interface UserProfile {
  userType: string
  name: string
  email: string
  genre?: string
  organization?: string
  country: string
  walletAddress: string
  verified: boolean
}

export default function ArtistProfile() {
  const { selectedAccount } = useConnect()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      if (!selectedAccount?.address) return
      
      try {
        const response = await fetch(`/api/users?walletAddress=${selectedAccount.address}`)
        const data = await response.json()
        
        if (data.exists && data.user) {
          setProfile(data.user)
        }
      } catch {
        // Profile fetch failed
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [selectedAccount])

  const handleSave = async () => {
    if (!profile) return
    
    setIsSaving(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })
      
      if (response.ok) {
        setMessage('Profile updated successfully!')
      } else {
        const { addToQueue } = await import('../lib/sync-queue')
        addToQueue('/api/users', 'PUT', profile)
        setMessage('Saved locally, will sync when online')
      }
    } catch {
      const { addToQueue } = await import('../lib/sync-queue')
      addToQueue('/api/users', 'PUT', profile)
      setMessage('Saved locally, will sync when online')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <span className="icon-[mdi--loading] animate-spin text-4xl text-gray-400" />
        <p className="text-gray-500 mt-4">Loading profile...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <span className="icon-[mdi--alert-circle] text-4xl text-gray-400" />
        <p className="text-gray-500 mt-4">No profile found</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-white border border-gray-200">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">
            {profile.userType === 'artist' ? 'Artist' : 'Promoter'} Profile
          </h2>
          
          {message && (
            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'} mb-4`}>
              <span>{message}</span>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>

            {profile.userType === 'artist' && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Genre</span>
                </label>
                <select 
                  className="select select-bordered"
                  value={profile.genre || ''}
                  onChange={(e) => setProfile({...profile, genre: e.target.value})}
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
            )}

            {profile.userType === 'promoter' && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Organization</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={profile.organization || ''}
                  onChange={(e) => setProfile({...profile, organization: e.target.value})}
                />
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Country</span>
              </label>
              <select 
                className="select select-bordered"
                value={profile.country}
                onChange={(e) => setProfile({...profile, country: e.target.value})}
              >
                <option value="">Select country</option>
                <option value="KE">Kenya</option>
                <option value="NG">Nigeria</option>
                <option value="GH">Ghana</option>
                <option value="ZA">South Africa</option>
                <option value="UG">Uganda</option>
                <option value="TZ">Tanzania</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Wallet Address</span>
              </label>
              <input
                type="text"
                className="input input-bordered font-mono text-sm"
                value={selectedAccount?.address || ''}
                disabled
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  This is your connected wallet address
                </span>
              </label>
            </div>

            {profile.verified && (
              <div className="alert alert-success">
                <span className="icon-[mdi--check-circle]" />
                <span>Your profile is verified</span>
              </div>
            )}
          </div>

          <div className="card-actions justify-end mt-6">
            <button 
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}