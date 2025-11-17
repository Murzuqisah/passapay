import { NextRequest, NextResponse } from 'next/server'
import { connectDB, User } from '@/app/lib/db'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    
    let query: Record<string, unknown> = { userType: 'artist' }
    
    if (search) {
      query = {
        userType: 'artist',
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { walletAddress: { $regex: search, $options: 'i' } }
        ]
      }
    }
    
    const artists = await User.find(query)
      .select('name email walletAddress country userType createdAt')
      .sort({ createdAt: -1 })
      .limit(100)
    
    return NextResponse.json(artists)
  } catch (error) {
    console.error('Error fetching artists:', error)
    return NextResponse.json(
      { error: 'Failed to fetch artists' },
      { status: 500 }
    )
  }
}
