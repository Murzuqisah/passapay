import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'

export async function GET() {
  try {
    await connectDB()
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connected successfully' 
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: 'Check MongoDB Atlas IP whitelist and connection string'
    }, { status: 500 })
  }
}