'use client'

import { TransactionCard } from './TransactionCard'

interface Transaction {
  txHash: string
  fromAddress: string
  toAddress: string
  amount: string
  status: 'pending' | 'completed' | 'failed'
  timestamp: Date
}

interface TransactionListProps {
  transactions: Transaction[]
  loading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  userAddress: string
}

export function TransactionList({
  transactions,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  userAddress
}: TransactionListProps) {
  if (loading) {
    return (
      <div className="section-glass rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border-2 border-border/50">
        <span className="icon-[mdi--loading] animate-spin text-6xl text-primary mb-4 block" />
        <p className="text-muted-foreground">Loading transactions...</p>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="section-glass rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border-2 border-border/50">
        <span className="icon-[mdi--file-document-outline] text-6xl text-muted-foreground/30 mb-4 block" />
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          No Transactions Found
        </h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Transaction Cards */}
      <div className="space-y-3 sm:space-y-4 mb-6">
        {transactions.map((transaction, index) => (
          <TransactionCard
            key={transaction.txHash}
            transaction={transaction}
            userAddress={userAddress}
            index={index}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="section-glass rounded-xl p-4 border-2 border-border/50">
          <div className="flex items-center justify-between gap-4">
            {/* Previous Button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg font-bold text-sm bg-card text-foreground hover:bg-muted border-2 border-border disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1"
            >
              <span className="icon-[mdi--chevron-left] text-lg" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first, last, current, and adjacent pages
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => onPageChange(page)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                          : 'bg-card text-foreground hover:bg-muted border-2 border-border'
                      }`}
                    >
                      {page}
                    </button>
                  )
                }
                // Show ellipsis
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="text-muted-foreground px-1">
                      ...
                    </span>
                  )
                }
                return null
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg font-bold text-sm bg-card text-foreground hover:bg-muted border-2 border-border disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="icon-[mdi--chevron-right] text-lg" />
            </button>
          </div>

          {/* Page Info */}
          <div className="text-center mt-3 text-xs sm:text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  )
}
