'use client'

import { useState } from 'react'
import { useConnect } from '../hooks/use-connect'

interface ArtistProfile {
  name: string
  genre: string
  country: string
  walletAddress: string
  verified: boolean
}

export default function ArtistProfile() {
  const { selectedAccount } = useConnect()
  const [profile, setProfile] = useState<ArtistProfile>({
    name: '',
    genre: '',
    country: '',
    walletAddress: selectedAccount?.address || '',
    verified: false
  })

  const handleSave = () => {
    // In real app, save to backend/blockchain
    console.log('Saving profile:', profile)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-white border border-gray-200">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Artist Profile</h2>
          
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Artist Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your stage name"
                className="input input-bordered"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Genre</span>
              </label>
              <select 
                className="select select-bordered"
                value={profile.genre}
                onChange={(e) => setProfile({...profile, genre: e.target.value})}
              >
                <option value="">Select genre</option>
                <option value="afrobeats">Afrobeats</option>
                <option value="hip-hop">Hip Hop</option>
                <option value="reggae">Reggae</option>
                <option value="jazz">Jazz</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="other">Other</option>
              </select>
            </div>

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
              disabled={!profile.name || !profile.genre || !profile.country}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}