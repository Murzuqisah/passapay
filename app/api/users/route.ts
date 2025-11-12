import { NextRequest, NextResponse } from 'next/server'
import { connectDB, User } from '@/app/lib/db'

const USE_MONGODB = true

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, userType, name, email, country, genre, organization } = body

    const dbConnection = await connectDB()
    
    if (USE_MONGODB && dbConnection) {
      const existingUser = await User.findOne({ walletAddress })
      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })
      }

      const user = await User.create({
        walletAddress,
        userType,
        name,
        email,
        country,
        genre: userType === 'artist' ? genre : undefined,
        organization: userType === 'promoter' ? organization : undefined,
        createdAt: new Date()
      })

      return NextResponse.json({ success: true, user }, { status: 201 })
    } else {
      // Client-side storage fallback
      return NextResponse.json({ 
        success: true, 
        user: { walletAddress, userType, name, email, country, genre, organization },
        useLocalStorage: true 
      }, { status: 201 })
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address required' }, { status: 400 })
    }

    const dbConnection = await connectDB()
    
    if (USE_MONGODB && dbConnection) {
      const user = await User.findOne({ walletAddress })

      if (!user) {
        return NextResponse.json({ exists: false }, { status: 200 })
      }

      return NextResponse.json({ exists: true, user }, { status: 200 })
    } else {
      return NextResponse.json({ exists: false, useLocalStorage: true }, { status: 200 })
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, name, email, country, genre, organization } = body

    const dbConnection = await connectDB()
    
    if (USE_MONGODB && dbConnection) {
      const user = await User.findOneAndUpdate(
        { walletAddress },
        { name, email, country, genre, organization },
        { new: true }
      )

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      return NextResponse.json({ success: true, user }, { status: 200 })
    } else {
      return NextResponse.json({ success: true, useLocalStorage: true }, { status: 200 })
    }
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}