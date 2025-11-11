import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'

export async function GET() {
  try {
    await connectDB()
    return NextResponse.json({ status: 'connected', database: 'passapay' })
  } catch (error) {
    return NextResponse.json({ status: 'disconnected', error: String(error) }, { status: 500 })
  }
}
