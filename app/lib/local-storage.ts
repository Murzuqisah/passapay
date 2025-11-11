export interface UserProfile {
  walletAddress: string
  userType: 'artist' | 'promoter'
  name: string
  email: string
  country: string
  genre?: string
  organization?: string
  verified: boolean
  createdAt: string
}

const USERS_KEY = 'passapay_users'

export function saveUserProfile(profile: Omit<UserProfile, 'verified' | 'createdAt'>): UserProfile {
  const users = getAllUsers()
  
  const newUser: UserProfile = {
    ...profile,
    verified: false,
    createdAt: new Date().toISOString()
  }
  
  users[profile.walletAddress] = newUser
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  
  return newUser
}

export function getUserProfile(walletAddress: string): UserProfile | null {
  const users = getAllUsers()
  return users[walletAddress] || null
}

export function getAllUsers(): Record<string, UserProfile> {
  if (typeof window === 'undefined') return {}
  
  const stored = localStorage.getItem(USERS_KEY)
  return stored ? JSON.parse(stored) : {}
}

export function userExists(walletAddress: string): boolean {
  return getUserProfile(walletAddress) !== null
}