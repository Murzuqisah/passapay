'use client'

import DashboardSidebar from '../../components/DashboardSidebar'

export default function ArtistHomepage() {
  return (
    <DashboardSidebar userType="artist">
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <span className="icon-[mdi--home] w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Homepage</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Your artist homepage</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Coming Soon</h2>
        <p className="text-gray-600 dark:text-gray-400">Your artist homepage is under development.</p>
      </div>
    </DashboardSidebar>
  )
}