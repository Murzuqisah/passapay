'use client'

import { useState, useEffect } from 'react'
import { useConnect } from '../hooks/use-connect'

interface Transaction {
  id: string
  type: 'sent' | 'received'
  amount: string
  address: string
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
  txHash?: string
}

export default function PaymentHistory() {
  const { selectedAccount } = useConnect()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Mock transaction data - in real app, fetch from blockchain
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'received',
        amount: '5000.00',
        address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        timestamp: '2024-01-15T10:30:00Z',
        status: 'completed',
        txHash: '0x1234567890abcdef'
      },
      {
        id: '2',
        type: 'sent',
        amount: '1500.00',
        address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        timestamp: '2024-01-14T15:45:00Z',
        status: 'completed',
        txHash: '0xabcdef1234567890'
      },
      {
        id: '3',
        type: 'received',
        amount: '2500.00',
        address: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
        timestamp: '2024-01-13T09:15:00Z',
        status: 'completed',
        txHash: '0x567890abcdef1234'
      }
    ]
    setTransactions(mockTransactions)
  }, [selectedAccount])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-white border border-gray-200">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Payment History</h2>
          
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <span className="icon-[mdi--history] text-6xl text-gray-400 mb-4 block" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No transactions yet</h3>
              <p className="text-gray-500">Your payment history will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          {tx.type === 'received' ? (
                            <>
                              <span className="icon-[mdi--arrow-down] text-green-600" />
                              <span className="text-green-600 font-medium">Received</span>
                            </>
                          ) : (
                            <>
                              <span className="icon-[mdi--arrow-up] text-red-600" />
                              <span className="text-red-600 font-medium">Sent</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="font-mono font-semibold">
                          {tx.type === 'received' ? '+' : '-'}{tx.amount} USDC
                        </div>
                      </td>
                      <td>
                        <div className="font-mono text-sm">
                          {formatAddress(tx.address)}
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">
                          {formatDate(tx.timestamp)}
                        </div>
                      </td>
                      <td>
                        <div className={`badge ${
                          tx.status === 'completed' ? 'badge-success' :
                          tx.status === 'pending' ? 'badge-warning' :
                          'badge-error'
                        }`}>
                          {tx.status}
                        </div>
                      </td>
                      <td>
                        {tx.txHash && (
                          <button className="btn btn-ghost btn-xs">
                            <span className="icon-[mdi--open-in-new]" />
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}