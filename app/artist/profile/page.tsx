'use client'

import { useState, useEffect } from 'react'
import { useConnect } from '../../hooks/use-connect'
import { useMetaMask } from '../../hooks/use-metamask'
import DashboardSidebar from '../../components/DashboardSidebar'

interface UserProfile {
  userType: 'artist' | 'promoter'
  name: string
  email: string
  genre?: string
  country: string
  walletAddress: string
  verified: boolean
}

export default function ArtistProfilePage() {
  const { selectedAccount } = useConnect()
  const metamask = useMetaMask()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [profile, setProfile] = useState<UserProfile | null>(null)

  const userId = metamask.account?.address || selectedAccount?.address

  useEffect(() => {
    if (!userId) return
    
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/users?walletAddress=${userId}`)
        if (res.ok) {
          const data = await res.json()
          if (data.exists && data.user) {
            setProfile({
              ...data.user,
              genre: data.artistProfile?.genre || data.user.genre,
              verified: data.artistProfile?.verified || false
            })
          }
        }
      } catch {
        // Failed to fetch profile
      } finally {
        setLoading(false)
      }
    }
    
    fetchProfile()
  }, [userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId || !profile) return
    
    setSaving(true)
    setMessage('')
    
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: userId,
          name: profile.name,
          email: profile.email,
          genre: profile.genre,
          country: profile.country,
          userType: profile.userType
        })
      })
      
      if (res.ok) {
        setMessage('Profile updated successfully!')
      } else {
        setMessage('Failed to update profile')
      }
    } catch {
      setMessage('Failed to update profile')
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <DashboardSidebar userType="artist">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your artist profile information</p>
        </div>

        {loading ? (
          <div className="glass-card p-12 rounded-xl text-center">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground mt-4">Loading profile...</p>
          </div>
        ) : profile ? (
          <>
            {/* Profile Form */}
            <div className="glass-card p-6 rounded-xl border-2 border-border/50">
              <h2 className="text-xl font-bold mb-6 text-foreground">Personal Information</h2>
              
              {message && (
                <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${
                  message.includes('success')
                    ? 'bg-green-50 border-2 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400'
                    : 'bg-red-50 border-2 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400'
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Genre</label>
                  <select
                    value={profile.genre || ''}
                    onChange={(e) => setProfile({ ...profile, genre: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all [&>option]:bg-background [&>option]:text-foreground"
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

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Country</label>
                  <select
                    value={profile.country}
                    onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all [&>option]:bg-background [&>option]:text-foreground"
                    required
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

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </form>
            </div>

            {/* Wallet Information */}
            <div className="glass-card p-6 rounded-xl border-2 border-border/50">
              <h2 className="text-xl font-bold mb-6 text-foreground">Wallet Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Connected Wallet</label>
                  <p className="font-mono text-sm bg-background px-4 py-3 rounded-lg border border-border text-foreground break-all">
                    {userId || 'Not connected'}
                  </p>
                </div>
                
                {profile.verified && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-lg">
                    <span className="icon-[mdi--check-circle] w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-400">Verified Profile</span>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="glass-card p-12 rounded-xl text-center">
            <span className="icon-[mdi--account-alert] text-6xl text-muted-foreground/30 mb-4 inline-block" />
            <p className="text-muted-foreground">Profile not found</p>
          </div>
        )}
      </div>
    </DashboardSidebar>
  )
}
