export interface Transaction {
  _id?: string
  txHash: string
  fromAddress: string
  toAddress: string
  amount: string
  currency?: string
  status: 'pending' | 'completed' | 'failed'
  timestamp: Date
  createdAt?: string
}
