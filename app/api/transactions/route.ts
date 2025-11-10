import { NextRequest, NextResponse } from 'next/server'
import { createTransaction, getTransactionsByAddress } from '@/app/lib/services/transaction.service'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const transaction = await createTransaction(data)
    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get('address')
    if (!address) {
      return NextResponse.json({ error: 'Address required' }, { status: 400 })
    }
    
    const transactions = await getTransactionsByAddress(address)
    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}
