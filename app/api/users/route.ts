import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByWallet } from '@/app/lib/services/user.service'

export async function POST(request: NextRequest) {
  try {
    const { email, walletAddress, role } = await request.json()
    
    const existing = await getUserByWallet(walletAddress)
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }
    
    const user = await createUser(email, walletAddress, role)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.nextUrl.searchParams.get('walletAddress')
    
    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address required' }, { status: 400 })
    }
    
    const user = await getUserByWallet(walletAddress)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
