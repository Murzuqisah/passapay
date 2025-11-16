import { NextRequest, NextResponse } from 'next/server'
import { connectDB, User, ArtistProfile } from '@/app/lib/db'

const USE_MONGODB = true

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, userType, name, email, country, genre, organization } = body

    if (!walletAddress || !userType || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const dbConnection = await connectDB()
    
    if (USE_MONGODB && dbConnection) {
      const existingUser = await User.findOne({ walletAddress })
      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })
      }

      const userName = userType === 'promoter' ? organization : name
      if (!userName) {
        return NextResponse.json({ error: 'Name or organization required' }, { status: 400 })
      }

      if (!country) {
        return NextResponse.json({ error: 'Country is required' }, { status: 400 })
      }

      const user = await User.create({
        email,
        name: userName,
        walletAddress,
        userType,
        country,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      // If artist, create separate artist profile
      if (userType === 'artist') {
        if (!genre) {
          return NextResponse.json({ error: 'Genre required for artists' }, { status: 400 })
        }
        await ArtistProfile.create({
          userId: user._id,
          name,
          genre,
          country,
          verified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }

      return NextResponse.json({ success: true, user }, { status: 201 })
    } else {
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

      // If artist, fetch artist profile too
      let artistProfile = null
      if (user.userType === 'artist') {
        artistProfile = await ArtistProfile.findOne({ userId: user._id })
      }

      return NextResponse.json({ 
        exists: true, 
        user,
        artistProfile 
      }, { status: 200 })
    } else {
      // When no database connection, always indicate localStorage usage
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
    const { walletAddress, name, email, country, genre } = body

    const dbConnection = await connectDB()
    
    if (USE_MONGODB && dbConnection) {
      const user = await User.findOne({ walletAddress })

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      // Update user data
      const updatedUser = await User.findOneAndUpdate(
        { walletAddress },
        { name, email, country, updatedAt: new Date() },
        { new: true }
      )

      // If artist, update artist profile
      if (user.userType === 'artist') {
        await ArtistProfile.findOneAndUpdate(
          { userId: user._id },
          { name, genre, country, updatedAt: new Date() },
          { new: true }
        )
      }

      return NextResponse.json({ success: true, user: updatedUser }, { status: 200 })
    } else {
      return NextResponse.json({ success: true, useLocalStorage: true }, { status: 200 })
    }
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}