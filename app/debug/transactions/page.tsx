'use client'

import { useState, useEffect } from 'react'
import { useMetaMask } from '@/app/hooks/use-metamask'
import { useConnect } from '@/app/hooks/use-connect'

export default function DebugTransactionsPage() {
  const metamask = useMetaMask()
  const { selectedAccount } = useConnect()
  const [debugData, setDebugData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [customAddress, setCustomAddress] = useState('')

  const currentAddress = metamask.account?.address || selectedAccount?.address

  const fetchDebugData = async (address?: string) => {
    setLoading(true)
    try {
      const url = address 
        ? `/api/debug/transactions?address=${address}`
        : '/api/debug/transactions'
      
      const response = await fetch(url)
      const data = await response.json()
      setDebugData(data)
    } catch (error) {
      console.error('Debug fetch error:', error)
      setDebugData({ error: String(error) })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDebugData()
  }, [])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Transaction Debug Page</h1>

        {/* Current Address */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-xl font-bold mb-4">Current Connected Address</h2>
          <p className="font-mono text-sm bg-background p-3 rounded-lg border border-border">
            {currentAddress || 'No address connected'}
          </p>
        </div>

        {/* Custom Address Query */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-xl font-bold mb-4">Query Specific Address</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              placeholder="Enter wallet address..."
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg"
            />
            <button
              onClick={() => fetchDebugData(customAddress)}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Query
            </button>
            <button
              onClick={() => fetchDebugData()}
              className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90"
            >
              All
            </button>
          </div>
        </div>

        {/* Debug Results */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Debug Results</h2>
            <button
              onClick={() => fetchDebugData(customAddress || undefined)}
              disabled={loading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : debugData ? (
            <div className="space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Total Count</p>
                  <p className="text-2xl font-bold">{debugData.count || 0}</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Returned</p>
                  <p className="text-2xl font-bold">{debugData.allTransactions?.length || 0}</p>
                </div>
              </div>

              {/* Sample Transaction */}
              {debugData.sample && (
                <div>
                  <h3 className="font-bold mb-2">Sample Transaction</h3>
                  <pre className="bg-background p-4 rounded-lg border border-border overflow-x-auto text-xs">
                    {JSON.stringify(debugData.sample, null, 2)}
                  </pre>
                </div>
              )}

              {/* All Transactions */}
              {debugData.allTransactions && debugData.allTransactions.length > 0 && (
                <div>
                  <h3 className="font-bold mb-2">All Transactions</h3>
                  <div className="space-y-2">
                    {debugData.allTransactions.map((tx: any, idx: number) => (
                      <div key={idx} className="bg-background p-4 rounded-lg border border-border">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">From:</span>
                            <p className="font-mono text-xs">{tx.fromAddress}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">To:</span>
                            <p className="font-mono text-xs">{tx.toAddress}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Amount:</span>
                            <p className="font-bold">{tx.amount} {tx.currency}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status:</span>
                            <p className="font-bold">{tx.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error */}
              {debugData.error && (
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-red-800 dark:text-red-400 font-mono text-sm">
                    {debugData.error}
                  </p>
                </div>
              )}

              {/* Raw Data */}
              <details>
                <summary className="cursor-pointer font-bold mb-2">Raw Debug Data</summary>
                <pre className="bg-background p-4 rounded-lg border border-border overflow-x-auto text-xs">
                  {JSON.stringify(debugData, null, 2)}
                </pre>
              </details>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-12">
              Click refresh to load debug data
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
