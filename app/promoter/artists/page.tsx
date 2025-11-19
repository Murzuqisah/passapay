'use client'

import { useState, useEffect } from 'react'
import DashboardSidebar from '../../components/DashboardSidebar'

interface Artist {
  _id: string
  name: string
  email: string
  walletAddress: string
  country: string
  userType: string
  createdAt: string
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/artists')
        if (res.ok) {
          const data = await res.json()
          setArtists(data)
        }
      } catch {
        // Failed to fetch artists
      } finally {
        setLoading(false)
      }
    }
    
    fetchArtists()
  }, [])

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artist.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artist.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardSidebar userType="promoter">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Artists Directory</h1>
          <p className="text-muted-foreground">Browse and manage registered artists</p>
        </div>

        {/* Search Bar */}
        <div className="glass-card p-4 rounded-xl mb-6">
          <div className="relative">
            <span className="icon-[mdi--magnify] absolute left-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, or wallet address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Artists List */}
        {loading ? (
          <div className="glass-card p-12 rounded-xl text-center">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground mt-4">Loading artists...</p>
          </div>
        ) : filteredArtists.length === 0 ? (
          <div className="glass-card p-12 rounded-xl text-center">
            <span className="icon-[mdi--account-group-outline] text-6xl text-muted-foreground/30 mb-4 inline-block" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No artists found matching your search' : 'No artists registered yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArtists.map((artist) => (
              <div key={artist._id} className="glass-card p-6 rounded-xl hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="icon-[mdi--account-music] text-2xl text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground mb-1">{artist.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="icon-[mdi--email] text-base" />
                        <span className="truncate">{artist.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="icon-[mdi--map-marker] text-base" />
                        <span>{artist.country}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <span className="icon-[mdi--wallet] text-base" />
                        <span className="truncate">{artist.walletAddress}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <button className="w-full px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2">
                        <span className="icon-[mdi--send] text-lg" />
                        Send Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {!loading && artists.length > 0 && (
          <div className="glass-card p-4 rounded-xl mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing {filteredArtists.length} of {artists.length} artists
              </span>
              <span className="text-muted-foreground">
                Total registered: {artists.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </DashboardSidebar>
  )
}