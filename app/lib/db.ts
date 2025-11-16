import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  // Return null if no MongoDB URI is provided (fallback to localStorage)
  if (!MONGODB_URI) {
    return null
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose
    }).catch(() => {
      cached.promise = null
      return null // Return null instead of throwing
    })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch {
    cached.promise = null
    return null
  }
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  userType: { type: String, enum: ['artist', 'promoter'], required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const artistProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  genre: { type: String, required: true },
  country: { type: String, required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const transactionSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true },
  txHash: { type: String, required: true },
  fromAddress: { type: String, required: true },
  toAddress: { type: String, required: true },
  amount: { type: String, required: true },
  currency: { type: String, default: 'DEV' },
  type: { type: String, enum: ['sent', 'received'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  chainId: { type: String },
  blockNumber: { type: Number },
  timestamp: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
})

// Delete cached models to ensure schema updates are applied
if (mongoose.models.User) {
  delete mongoose.models.User
}
if (mongoose.models.ArtistProfile) {
  delete mongoose.models.ArtistProfile
}
if (mongoose.models.Transaction) {
  delete mongoose.models.Transaction
}

export const User = mongoose.model('User', userSchema)
export const ArtistProfile = mongoose.model('ArtistProfile', artistProfileSchema)
export const Transaction = mongoose.model('Transaction', transactionSchema)

declare global {
   
  var mongoose: {
    conn: typeof import('mongoose') | null
    promise: Promise<typeof import('mongoose') | null> | null
  }
}