'use client'

import DashboardSidebar from '../../components/DashboardSidebar'

export default function ArtistProfile() {
  return (
    <DashboardSidebar userType="artist">
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
            <span className="icon-[mdi--account] w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Profile</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Manage your artist profile</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Profile Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Your profile management page is under development.</p>
      </div>
    </DashboardSidebar>
  )
}