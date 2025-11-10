import { NextResponse } from 'next/server'
import clientPromise from '@/app/lib/db'

export async function GET() {
  try {
    const client = await clientPromise
    await client.db('passapay').command({ ping: 1 })
    return NextResponse.json({ status: 'connected', database: 'passapay' })
  } catch (error) {
    return NextResponse.json({ status: 'disconnected', error: String(error) }, { status: 500 })
  }
}
