'use client'

import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

interface DashboardNavbarProps {
  userType: 'artist' | 'promoter'
  onToggleSidebar: () => void
}

export default function DashboardNavbar({ userType, onToggleSidebar }: DashboardNavbarProps) {
  const pathname = usePathname()
  
  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean)
    const lastSegment = segments[segments.length - 1]
    
    if (lastSegment === userType) return 'Dashboard'
    return lastSegment?.charAt(0).toUpperCase() + lastSegment?.slice(1) || 'Dashboard'
  }

  return (
    <header className="sticky top-0 z-30 glass border-b border-sidebar-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-sidebar-accent/50 rounded-xl transition-all duration-200"
          >
            <span className="icon-[mdi--menu] w-5 h-5" />
          </button>
          
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">{getPageTitle()}</h1>
            <p className="text-sm text-muted-foreground capitalize">{userType} Portal</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}