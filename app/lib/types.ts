export interface User {
  _id: string
  email: string
  walletAddress: string
  role: 'artist' | 'promoter'
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
  txHash: string
  fromAddress: string
  toAddress: string
  amount: string
  currency: string
  type: 'sent' | 'received'
  status: 'completed' | 'pending' | 'failed'
  chainId: string
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
