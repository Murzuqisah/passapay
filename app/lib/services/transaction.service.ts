import clientPromise from '../db'
import { Transaction } from '../types'

export async function createTransaction(data: Omit<Transaction, '_id' | 'createdAt'>) {
  const client = await clientPromise
  const db = client.db('passapay')
  
  const transaction: Omit<Transaction, '_id'> = {
    ...data,
    createdAt: new Date()
  }
  
  const result = await db.collection('transactions').insertOne(transaction)
  return { _id: result.insertedId.toString(), ...transaction }
}

export async function getTransactionsByAddress(address: string) {
  const client = await clientPromise
  const db = client.db('passapay')
  
  return db.collection<Transaction>('transactions')
    .find({
      $or: [{ fromAddress: address }, { toAddress: address }]
    })
    .sort({ timestamp: -1 })
    .toArray()
}

export async function updateTransactionStatus(txHash: string, status: Transaction['status']) {
  const client = await clientPromise
  const db = client.db('passapay')
  
  return db.collection('transactions').updateOne(
    { txHash },
    { $set: { status } }
  )
}
