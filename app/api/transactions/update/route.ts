import { NextRequest, NextResponse } from 'next/server'
import { connectDB, Transaction } from '@/app/lib/db'

export async function PUT(request: NextRequest) {
  try {
    const { paymentId, status } = await request.json()

    const dbConnection = await connectDB()
    
    if (dbConnection) {
      await Transaction.findOneAndUpdate(
        { paymentId },
        { status },
        { new: true }
      )
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false }, { status: 500 })
  } catch (error) {
    console.error('Error updating transaction:', error)
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 })
  }
}
