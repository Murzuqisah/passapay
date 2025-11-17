import { connectDB, Transaction as TransactionModel } from '../db'
import { Transaction } from '../types'

export async function createTransaction(data: Omit<Transaction, '_id' | 'createdAt'>) {
  await connectDB()
  return TransactionModel.create(data)
}

export async function getTransactionsByAddress(address: string) {
  try {
    const db = await connectDB()
    if (!db) {
      console.log('No DB connection available')
      return [] // Return empty if no DB connection
    }
    
    // Normalize address to lowercase for case-insensitive matching
    const normalizedAddress = address.toLowerCase()
    console.log('Querying transactions for address:', normalizedAddress)
    
    const transactions = await TransactionModel.find({
      $or: [
        { fromAddress: { $regex: new RegExp(`^${normalizedAddress}$`, 'i') } },
        { toAddress: { $regex: new RegExp(`^${normalizedAddress}$`, 'i') } }
      ]
    })
    .sort({ timestamp: -1 })
    .limit(50)
    .maxTimeMS(3000) // 3 second query timeout
    .lean()
    
    console.log(`Found ${transactions.length} transactions for ${normalizedAddress}`)
    return transactions
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
}

export async function updateTransactionStatus(txHash: string, status: Transaction['status']) {
  await connectDB()
  return TransactionModel.updateOne(
    { txHash },
    { $set: { status } }
  )
}
