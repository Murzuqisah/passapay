import { connectDB } from '../db'
import { Transaction } from '../types'
import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  txHash: String,
  fromAddress: String,
  toAddress: String,
  amount: String,
  status: String,
  timestamp: Date,
  createdAt: { type: Date, default: Date.now }
})

const TransactionModel = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)

export async function createTransaction(data: Omit<Transaction, '_id' | 'createdAt'>) {
  await connectDB()
  return TransactionModel.create(data)
}

export async function getTransactionsByAddress(address: string) {
  await connectDB()
  return TransactionModel.find({
    $or: [{ fromAddress: address }, { toAddress: address }]
  }).sort({ timestamp: -1 })
}

export async function updateTransactionStatus(txHash: string, status: Transaction['status']) {
  await connectDB()
  return TransactionModel.updateOne(
    { txHash },
    { $set: { status } }
  )
}
