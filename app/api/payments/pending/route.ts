import { NextRequest, NextResponse } from 'next/server'
import { connectDB, Transaction } from '@/app/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const artistAddress = searchParams.get('artistAddress')

    if (!artistAddress) {
      return NextResponse.json({ error: 'Artist address required' }, { status: 400 })
    }

    const dbConnection = await connectDB()
    
    if (dbConnection) {
      // Query database for pending payments to this artist (case-insensitive)
      const pendingPayments = await Transaction.find({
        toAddress: { $regex: new RegExp(`^${artistAddress}$`, 'i') },
        status: 'pending'
      }).sort({ createdAt: -1 }).lean()

      // Transform to match expected format
      const formatted = pendingPayments.map(tx => ({
        paymentId: tx.paymentId,
        from: tx.fromAddress,
        amount: tx.amount,
        createdAt: Math.floor(new Date(tx.timestamp || tx.createdAt).getTime() / 1000),
        status: 0 // Pending status
      }))

      return NextResponse.json(formatted)
    } else {
      return NextResponse.json([])
    }

  } catch (error) {
    console.error('Error fetching pending payments:', error)
    return NextResponse.json({ error: 'Failed to fetch pending payments' }, { status: 500 })
  }
}
