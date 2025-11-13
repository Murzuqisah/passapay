'use client'

import DashboardSidebar from '../../components/DashboardSidebar'

export default function ArtistTransactions() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar userType="artist" />
      
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <span className="icon-[mdi--swap-horizontal] w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Transactions</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">View all payment transactions</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Transaction History</h2>
            <p className="text-gray-600 dark:text-gray-400">Your transaction history is under development.</p>
          </div>
        </div>
      </main>
    </div>
  )
}