'use client'

import { useState, useEffect } from 'react'
import { useConnect } from '../../hooks/use-connect'
import { useMetaMask } from '../../hooks/use-metamask'
import DashboardSidebar from '../../components/DashboardSidebar'

export default function ProfilePage() {
  const { selectedAccount } = useConnect()
  const metamask = useMetaMask()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({ name: '', genre: '', country: '' })

  const userId = metamask.account?.address || selectedAccount?.address

  useEffect(() => {
    if (!userId) return
    
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/profiles?userId=${userId}`)
        if (res.ok) {
          const data = await res.json()
          setProfile({ name: data.name || '', genre: data.genre || '', country: data.country || '' })
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProfile()
  }, [userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return
    
    setSaving(true)
    try {
      const res = await fetch('/api/profiles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...profile })
      })
      
      if (res.ok) {
        alert('Profile updated successfully!')
      } else {
        alert('Failed to update profile')
      }
    } catch (error) {
      console.error('Failed to save profile:', error)
      alert('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <DashboardSidebar userType="promoter">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your promoter profile information</p>
        </div>

        <div className="glass-card p-6 rounded-xl">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Genre/Type</label>
                <input
                  type="text"
                  value={profile.genre}
                  onChange={(e) => setProfile({ ...profile, genre: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="e.g., Music Promoter, Event Organizer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Country</label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Enter your country"
                />
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
          )}
        </div>

        <div className="glass-card p-6 rounded-xl mt-6">
          <h2 className="text-lg font-bold mb-4">Wallet Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Connected Wallet</label>
              <p className="font-mono text-sm bg-background px-4 py-2 rounded-lg border border-border">
                {userId || 'Not connected'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardSidebar>
  )
}