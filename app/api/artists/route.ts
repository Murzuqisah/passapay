import { NextRequest, NextResponse } from 'next/server'
import { connectDB, User } from '@/app/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const dbConnection = await connectDB()
    
    if (dbConnection) {
      const query: Record<string, unknown> = { userType: 'artist' }
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }

      const artists = await User.find(query)
        .select('name walletAddress email genre country')
        .limit(50)

      return NextResponse.json(artists, { status: 200 })
    } else {
      return NextResponse.json([], { status: 200 })
    }
  } catch (error) {
    console.error('Error fetching artists:', error)
    return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 })
  }
}
