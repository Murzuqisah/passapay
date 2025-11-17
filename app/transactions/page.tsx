'use client'

import { useState, useEffect } from 'react'
import { Navbar, Footer } from '../components'
import { TransactionList } from '../components/transactions/TransactionList'
import { TransactionFilters } from '../components/transactions/TransactionFilters'
import { useConnect } from '../hooks/use-connect'

export default function TransactionsPage() {
  const { selectedAccount } = useConnect()
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!selectedAccount?.address) return

      setLoading(true)
      try {
        const response = await fetch(`/api/transactions?address=${selectedAccount.address}`)
        const data = await response.json()
        setTransactions(data)
        setFilteredTransactions(data)
        setTotalPages(Math.ceil(data.length / itemsPerPage))
      } catch (error) {
        console.error('Error fetching transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [selectedAccount])

  const handleFilter = (filtered: any[]) => {
    setFilteredTransactions(filtered)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    setCurrentPage(1)
  }

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-3 sm:px-4 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 gradient-text">
              Transaction History
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              View and search all your payment transactions
            </p>
          </div>

          {!selectedAccount ? (
            <div className="section-glass rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border-2 border-border/50">
              <span className="icon-[mdi--wallet-outline] text-6xl text-muted-foreground/30 mb-4 block" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Connect Your Wallet
              </h2>
              <p className="text-muted-foreground">
                Please connect your wallet to view transaction history
              </p>
            </div>
          ) : (
            <>
              {/* Filters */}
              <TransactionFilters
                transactions={transactions}
                onFilter={handleFilter}
                loading={loading}
              />

              {/* Transaction List */}
              <TransactionList
                transactions={paginatedTransactions}
                loading={loading}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                userAddress={selectedAccount.address}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
