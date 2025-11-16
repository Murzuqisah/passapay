'use client'

import { useState, useEffect } from 'react'
import { useConnect } from '../hooks/use-connect'
import { useMetaMask } from '../hooks/use-metamask'
import { useRouter } from 'next/navigation'
import { BrowserProvider, formatEther } from 'ethers'
import DashboardSidebar from '../components/DashboardSidebar'
import ClaimPayments from '../components/artist/claim-payments'

interface UserProfile {
  userType: 'artist' | 'promoter'
  name: string
  email: string
  genre?: string
  organization?: string
  country: string
  walletAddress: string
  verified: boolean
  createdAt?: string
}

export default function ArtistDashboard() {
  const { selectedAccount } = useConnect()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  const metamask = useMetaMask()
  const [balance, setBalance] = useState('0.00')
  const [transactions, setTransactions] = useState<any[]>([])
  const [stats, setStats] = useState({ pending: 0, completed: 0, total: '0.00' })

  useEffect(() => {
    const address = metamask.account?.address 
    console.log(address)
    // if (!address) {
    //   router.push('/')
    //   return
    // }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users?walletAddress=${address}`)
        const data = await response.json()

        if (data.exists && data.user) {
          // Merge user data with artistProfile if exists
          const profileData = {
            ...data.user,
            genre: data.artistProfile?.genre || data.user.genre,
            verified: data.artistProfile?.verified || false
          }
          setProfile(profileData)
        } else if (data.useLocalStorage) {
          
          const { getUserProfile } = await import('../lib/local-storage')
          const localProfile = getUserProfile(address)
          if (localProfile) {
            setProfile(localProfile)
          }
        }
      } catch {
        // Profile fetch failed
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [metamask.account, selectedAccount, router])

  useEffect(() => {
    const fetchBalance = async () => {
      if (!metamask.account) return
      
      try {
        if (window.ethereum) {
          const provider = new BrowserProvider(window.ethereum)
          const address = metamask.account?.address || selectedAccount?.address
          if (address) {
            const bal = await provider.getBalance(address)
            setBalance(parseFloat(formatEther(bal)).toFixed(4))
          }
        }
      } catch (error) {
        console.error('Failed to fetch balance:', error)
      }
    }

    const fetchTransactions = async () => {
      const address = metamask.account?.address || selectedAccount?.address
      if (!address) return
      
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)
        
        const response = await fetch(
          `/api/transactions?address=${address}`,
          { signal: controller.signal }
        )
        clearTimeout(timeoutId)
        
        if (response.ok) {
          const data = await response.json()
          const txArray = Array.isArray(data) ? data : []
          setTransactions(txArray.slice(0, 5))
          
          const pending = txArray.filter((tx: any) => tx.status === 'pending').length
          const completed = txArray.filter((tx: any) => tx.status === 'completed').length
          const total = txArray
            .filter((tx: any) => tx.status === 'completed')
            .reduce((sum: number, tx: any) => sum + parseFloat(tx.amount || 0), 0)
          
          setStats({ pending, completed, total: total.toFixed(2) })
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error)
        setTransactions([])
        setStats({ pending: 0, completed: 0, total: '0.00' })
      }
    }

    fetchBalance()
    fetchTransactions()
    
    const interval = setInterval(() => {
      fetchBalance()
      fetchTransactions()
    }, 30000)

    return () => clearInterval(interval)
  }, [selectedAccount, metamask.account])

  const handleSaveProfile = async () => {
    const address = metamask.account?.address || selectedAccount?.address
    if (!profile || !address) return

    setIsSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          name: profile.name,
          email: profile.email,
          genre: profile.genre,
          country: profile.country,
          userType: profile.userType
        })
      })

      if (response.ok) {
        setMessage('Profile updated successfully!')
        setIsEditing(false)
      } else {
        const { addToQueue } = await import('../lib/sync-queue')
        addToQueue('/api/users', 'PUT', profile)
        setMessage('Saved locally, will sync when online')
        setIsEditing(false)
      }
    } catch {
      const { addToQueue } = await import('../lib/sync-queue')
      addToQueue('/api/users', 'PUT', profile)

      const { saveUserProfile } = await import('../lib/local-storage')
      saveUserProfile(profile)

      setMessage('Saved locally, will sync when online')
      setIsEditing(false)
    } finally {
      setIsSaving(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  if (!metamask.account && !selectedAccount) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="icon-[mdi--loading] animate-spin text-4xl text-primary mb-4 block" />
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="icon-[mdi--loading] animate-spin text-4xl text-primary mb-4 block" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardSidebar userType="artist">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <span className="icon-[mdi--plus] w-4 h-4" />
          Payment Request
        </button>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border bg-card text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors">
          <span className="icon-[mdi--download] w-4 h-4" />
          Export Earnings
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Completed Gigs</h3>
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <span className="icon-[mdi--check-circle] w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{stats.completed}</div>
          <p className="text-xs text-muted-foreground">Performances paid</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Pending Bookings</h3>
            <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <span className="icon-[mdi--clock] w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{stats.pending}</div>
          <p className="text-xs text-muted-foreground">Awaiting payment</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Cancelled Shows</h3>
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <span className="icon-[mdi--close-circle] w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">0</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Earnings</h3>
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <span className="icon-[mdi--currency-usd] w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{balance} DEV</div>
          <p className="text-xs text-muted-foreground">Available balance</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Venue Alerts</h3>
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <span className="icon-[mdi--alert-circle] w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">0</div>
          <p className="text-xs text-muted-foreground">Payment issues</p>
        </div>
      </div>

      {/* Claim Payments Section */}
      <ClaimPayments />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-card border border-border rounded-xl">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="icon-[mdi--history] w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Payment History</h2>
                  <p className="text-sm text-muted-foreground">Recent earnings and transactions</p>
                </div>
              </div>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                View All Transactions
              </button>
            </div>
          </div>
          <div className="p-6">
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx._id || tx.txHash} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.status === "completed"
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-yellow-100 dark:bg-yellow-900/30'
                        }`}>
                        {tx.status === "completed" ? (
                          <span className="icon-[mdi--check-circle] w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <span className="icon-[mdi--clock] w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {tx.fromAddress?.slice(0, 6)}...{tx.fromAddress?.slice(-4)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(tx.timestamp || tx.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{tx.amount} DEV</p>
                      <p className={`text-xs capitalize ${tx.status === "completed"
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-yellow-600 dark:text-yellow-400'
                        }`}>{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="icon-[mdi--currency-usd] w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No recent transactions</h3>
                <p className="text-muted-foreground">All transactions have been processed</p>
              </div>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-card border border-border rounded-xl">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="icon-[mdi--account-star] w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Artist Profile</h2>
                  <p className="text-sm text-muted-foreground">Manage your professional information</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
          <div className="p-6">
            {message && (
              <div className={`p-4 rounded-lg mb-6 text-sm ${message.includes('success')
                ? 'bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400'
                : 'bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400'
                }`}>
                {message}
              </div>
            )}

            {profile && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  ) : (
                    <p className="text-foreground">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  ) : (
                    <p className="text-foreground">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Genre</label>
                  {isEditing ? (
                    <select
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={profile.genre || ''}
                      onChange={(e) => setProfile({ ...profile, genre: e.target.value })}
                    >
                      <option value="">Select genre</option>
                      <option value="afrobeats">Afrobeats</option>
                      <option value="hip-hop">Hip Hop</option>
                      <option value="reggae">Reggae</option>
                      <option value="jazz">Jazz</option>
                      <option value="rock">Rock</option>
                      <option value="pop">Pop</option>
                    </select>
                  ) : (
                    <p className="text-foreground capitalize">{profile.genre || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  {isEditing ? (
                    <select
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={profile.country}
                      onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                    >
                      <option value="">Select country</option>
                      <option value="KE">Kenya</option>
                      <option value="NG">Nigeria</option>
                      <option value="GH">Ghana</option>
                      <option value="ZA">South Africa</option>
                      <option value="UG">Uganda</option>
                      <option value="TZ">Tanzania</option>
                    </select>
                  ) : (
                    <p className="text-foreground">{profile.country}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Wallet Address</label>
                  <p className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                    {selectedAccount?.address}
                  </p>
                </div>

                {profile.verified && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                    <span className="icon-[mdi--check-circle] w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800 dark:text-green-400">Verified Profile</span>
                  </div>
                )}

                {isEditing && (
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardSidebar>
  )
}