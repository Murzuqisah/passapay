import { connectDB } from '../db'
import mongoose from 'mongoose'
import { ArtistProfile, ProfileResponse } from '../types'

const userSchema = new mongoose.Schema({
  email: String,
  walletAddress: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const UserModel = mongoose.models.User || mongoose.model('User', userSchema)

export async function createUser(email: string, walletAddress: string, role: 'artist' | 'promoter') {
  await connectDB()
  return UserModel.create({ email, walletAddress, role })
}

export async function getUserByWallet(walletAddress: string) {
  await connectDB()
  return UserModel.findOne({ walletAddress })
}

const artistProfileSchema = new mongoose.Schema({
  userId: String,
  name: String,
  genre: String,
  country: String,
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const ArtistProfileModel = mongoose.models.ArtistProfile || mongoose.model('ArtistProfile', artistProfileSchema)

export async function createArtistProfile(userId: string, data: Omit<ArtistProfile, '_id' | 'userId' | 'createdAt' | 'updatedAt' | 'verified'>) {
  await connectDB()
  return ArtistProfileModel.create({ userId, ...data, verified: false })
}

export async function getArtistProfile(userId: string) {
  await connectDB()
  return ArtistProfileModel.findOne({ userId })
}

export async function updateArtistProfile(userId: string, data: Partial<Omit<ArtistProfile, '_id' | 'userId' | 'createdAt'>>) {
  await connectDB()
  return ArtistProfileModel.updateOne(
    { userId },
    { $set: { ...data, updatedAt: new Date() } }
  )
}

export async function getUserProfile(walletAddress: string): Promise<ProfileResponse | null> {
  await connectDB()
  const user = await UserModel.findOne({ walletAddress })
  
  if (!user) {
    return null
  }

  const userObj = user.toObject()

  // If artist, also fetch artist profile
  if (user.role === 'artist') {
    const artistProfile = await ArtistProfileModel.findOne({ userId: user._id })
    return {
      ...userObj,
      role: 'artist',
      artistProfile: artistProfile ? artistProfile.toObject() : null
    } as ProfileResponse
  }

  return {
    ...userObj,
    role: 'promoter'
  } as ProfileResponse
}
