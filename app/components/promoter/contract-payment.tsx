'use client'

import { useState, useEffect, useRef } from 'react'
import { useContractPayment } from '@/app/hooks/use-contract-payment'
import { useMetaMask } from '@/app/hooks/use-metamask'

interface Artist {
  _id: string
  name: string
  walletAddress: string
  email?: string
  genre?: string
}

export default function ContractPayment() {
  const { account } = useMetaMask()
  const { createPayment, calculateNetAmount, isProcessing, result, paymentId } = useContractPayment()
  
  const [artistAddress, setArtistAddress] = useState('')
  const [artistName, setArtistName] = useState('')
  const [amount, setAmount] = useState('')
  const [netAmount, setNetAmount] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [artists, setArtists] = useState<Artist[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchArtists = async () => {
      if (searchQuery.length < 2) {
        setArtists([])
        return
      }
      
      setLoading(true)
      try {
        const res = await fetch(`/api/artists?search=${encodeURIComponent(searchQuery)}`)
        if (res.ok) {
          const data = await res.json()
          setArtists(data)
          setShowDropdown(true)
        }
      } catch (error) {
        console.error('Failed to fetch artists:', error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchArtists, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const selectArtist = (artist: Artist) => {
    setArtistName(artist.name)
    setArtistAddress(artist.walletAddress)
    setSearchQuery('')
    setShowDropdown(false)
  }

  const handleCalculateFee = async () => {
    if (!amount) return
    try {
      const net = await calculateNetAmount(amount)
      setNetAmount(net)
    } catch (error) {
      // Fee calculation failed
    }
  }

  const handleCreatePayment = async () => {
    if (!artistAddress || !amount) return
    
    try {
      await createPayment(artistAddress, amount)
      setShowConfirm(false)
      setArtistAddress('')
      setArtistName('')
      setAmount('')
      setNetAmount('')
    } catch (error) {
      // Payment creation failed
    }
  }

  const handleShowConfirm = async () => {
    if (!amount || !netAmount) {
      await handleCalculateFee()
    }
    setShowConfirm(true)
  }

  if (!account) {
    return (
      <div className="glass-card p-6 rounded-xl text-center">
        <p className="text-muted-foreground">Connect MetaMask to send payments</p>
      </div>
    )
  }

  return (
    <>
      <div className="glass-card p-4 sm:p-6 rounded-xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send Payment via Smart Contract</h2>

        <div className="space-y-4">
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium mb-2 text-foreground">Search Artist by Name</label>
            <div className="relative">
              <span className="icon-[mdi--magnify] absolute left-3 top-1/2 -translate-y-1/2 text-base sm:text-lg text-muted-foreground" />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 sm:py-3 border border-border rounded-lg bg-background text-foreground text-sm sm:text-base"
                placeholder="Search artist name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {showDropdown && artists.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-card border-2 border-border rounded-lg shadow-xl max-h-60 overflow-y-auto backdrop-blur-sm">
                {artists.map((artist) => (
                  <button
                    key={artist._id}
                    type="button"
                    onClick={() => selectArtist(artist)}
                    className="w-full px-4 py-3 text-left hover:bg-primary/10 hover:border-primary/30 transition-all border-b border-border last:border-0"
                  >
                    <p className="font-semibold text-foreground">{artist.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{artist.walletAddress}</p>
                    {artist.genre && <p className="text-xs text-muted-foreground">{artist.genre}</p>}
                  </button>
                ))}
              </div>
            )}
            {loading && (
              <div className="absolute right-3 top-10 text-muted-foreground">
                <span className="icon-[mdi--loading] animate-spin text-lg" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Artist Wallet Address</label>
            <input
              type="text"
              className="w-full px-3 py-2 sm:py-3 border border-border rounded-lg bg-background text-foreground text-sm sm:text-base"
              placeholder="0x... or select artist above"
              value={artistAddress}
              onChange={(e) => {
                setArtistAddress(e.target.value)
                setArtistName('')
              }}
            />
            {artistName && (
              <p className="text-sm text-primary mt-1 font-medium">Selected: {artistName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Amount (DEV)</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 sm:py-3 border border-border rounded-lg bg-background text-foreground text-sm sm:text-base"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                setNetAmount('')
              }}
              onBlur={handleCalculateFee}
            />
            {netAmount && (
              <p className="text-sm text-muted-foreground mt-1">
                Artist receives: {netAmount} DEV (after 2.5% fee)
              </p>
            )}
          </div>

          {result && (
            <div className={`p-3 rounded-lg text-sm ${
              result.includes('Error') 
                ? 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            }`}>
              {result}
            </div>
          )}

          {paymentId && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm font-medium mb-1">Payment ID:</p>
              <p className="text-xs font-mono break-all">{paymentId}</p>
            </div>
          )}

          <button
            className="w-full px-4 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium sm:font-bold hover:bg-primary/90 disabled:opacity-50 text-sm sm:text-base"
            onClick={handleShowConfirm}
            disabled={!artistAddress || !amount || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Create Payment'}
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-background border border-border rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Payment</h3>
            <div className="space-y-3 mb-6">
              {artistName && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Artist:</span>
                  <span className="font-semibold">{artistName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">To:</span>
                <span className="font-mono text-sm">{artistAddress.slice(0, 6)}...{artistAddress.slice(-4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-semibold">{amount} DEV</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform Fee (2.5%):</span>
                <span>{(parseFloat(amount) * 0.025).toFixed(4)} DEV</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Artist Receives:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{netAmount || (parseFloat(amount) * 0.975).toFixed(4)} DEV</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                onClick={handleCreatePayment}
                disabled={isProcessing}
              >
                {isProcessing ? 'Sending...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
