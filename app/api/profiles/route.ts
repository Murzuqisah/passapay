import { NextRequest, NextResponse } from 'next/server'
import { createArtistProfile, getArtistProfile, updateArtistProfile } from '@/app/lib/services/user.service'

export async function POST(request: NextRequest) {
  try {
    const { userId, name, genre, country } = await request.json()
    const profile = await createArtistProfile(userId, { name, genre, country })
    return NextResponse.json(profile)
  } catch {
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }
    
    const profile = await getArtistProfile(userId)
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }
    
    return NextResponse.json(profile)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, ...data } = await request.json()
    await updateArtistProfile(userId, data)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
