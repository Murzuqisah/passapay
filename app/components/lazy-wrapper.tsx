'use client'

import { Suspense, lazy } from 'react'

const LazyWrapper = ({ children, fallback = <div className="loading loading-spinner"></div> }: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
)

export default LazyWrapper