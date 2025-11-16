export interface User {
  _id: string
  email: string
  name: string
  walletAddress: string
  userType: 'artist' | 'promoter'
  country: string
  createdAt: Date
  updatedAt: Date
}

export interface ArtistProfile {
  _id: string
  userId: string
  name: string
  genre: string
  country: string
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  _id: string
  paymentId: string
  txHash: string
  fromAddress: string
  toAddress: string
  amount: string
  currency: string
  type: 'sent' | 'received'
  status: 'completed' | 'pending' | 'failed'
  chainId?: string
  blockNumber?: number
  timestamp: Date
  createdAt: Date
}

export interface Notification {
  _id: string
  userId: string
  walletAddress: string
  type: 'payment_received' | 'payment_sent' | 'info'
  title: string
  message: string
  read: boolean
  relatedTxId?: string
  timestamp: Date
  createdAt: Date
}

export interface ArtistProfileResponse {
  _id: string
  email: string
  walletAddress: string
  userType: 'artist'
  createdAt: Date
  updatedAt: Date
  artistProfile: ArtistProfile | null
}

export interface PromoterProfileResponse {
  _id: string
  email: string
  walletAddress: string
  userType: 'promoter'
  createdAt: Date
  updatedAt: Date
}

export type ProfileResponse = ArtistProfileResponse | PromoterProfileResponse
