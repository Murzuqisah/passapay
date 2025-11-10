import clientPromise from '../db'
import { User, ArtistProfile } from '../types'

export async function createUser(email: string, walletAddress: string, role: 'artist' | 'promoter') {
  const client = await clientPromise
  const db = client.db('passapay')
  
  const user: Omit<User, '_id'> = {
    email,
    walletAddress,
    role,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  const result = await db.collection('users').insertOne(user)
  return { _id: result.insertedId.toString(), ...user }
}

export async function getUserByWallet(walletAddress: string) {
  const client = await clientPromise
  const db = client.db('passapay')
  return db.collection<User>('users').findOne({ walletAddress })
}

export async function createArtistProfile(userId: string, data: Omit<ArtistProfile, '_id' | 'userId' | 'createdAt' | 'updatedAt' | 'verified'>) {
  const client = await clientPromise
  const db = client.db('passapay')
  
  const profile: Omit<ArtistProfile, '_id'> = {
    userId,
    ...data,
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  const result = await db.collection('artist_profiles').insertOne(profile)
  return { _id: result.insertedId.toString(), ...profile }
}

export async function getArtistProfile(userId: string) {
  const client = await clientPromise
  const db = client.db('passapay')
  return db.collection<ArtistProfile>('artist_profiles').findOne({ userId })
}

export async function updateArtistProfile(userId: string, data: Partial<Omit<ArtistProfile, '_id' | 'userId' | 'createdAt'>>) {
  const client = await clientPromise
  const db = client.db('passapay')
  
  return db.collection('artist_profiles').updateOne(
    { userId },
    { $set: { ...data, updatedAt: new Date() } }
  )
}
