import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  // Return null if no MongoDB URI is provided (fallback to localStorage)
  if (!MONGODB_URI) {
    console.warn('No MONGODB_URI provided, using localStorage fallback')
    return null
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('MongoDB connected')
      return mongoose
    }).catch((error) => {
      console.error('MongoDB error:', error.message)
      cached.promise = null
      return null // Return null instead of throwing
    })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    cached.promise = null
    console.warn('MongoDB connection failed, falling back to localStorage')
    return null
  }
}

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  userType: { type: String, enum: ['artist', 'promoter'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  genre: { type: String },
  organization: { type: String },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)

declare global {
   
  var mongoose: {
    conn: typeof import('mongoose') | null
    promise: Promise<typeof import('mongoose')> | null
  }
}