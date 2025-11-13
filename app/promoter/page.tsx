'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PromoterPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/promoter/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="icon-[mdi--loading] animate-spin text-4xl text-primary mb-4 block" />
        <p className="text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}