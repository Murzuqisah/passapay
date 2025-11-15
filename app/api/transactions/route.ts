import { NextRequest, NextResponse } from 'next/server'
import { createTransaction, getTransactionsByAddress } from '@/app/lib/services/transaction.service'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const transaction = await createTransaction(data)
    return NextResponse.json(transaction)
  } catch {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get('address')
    if (!address) {
      return NextResponse.json({ error: 'Address required' }, { status: 400 })
    }
    
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database timeout')), 5000)
    )
    
    try {
      const transactions = await Promise.race([
        getTransactionsByAddress(address),
        timeoutPromise
      ])
      return NextResponse.json(transactions)
    } catch (dbError) {
      // Return empty array if DB fails
      console.error('DB error, returning empty array:', dbError)
      return NextResponse.json([])
    }
  } catch (error) {
    console.error('Transaction API error:', error)
    return NextResponse.json([])
  }
}
