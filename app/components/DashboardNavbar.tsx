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
    <header className="sticky top-0 z-30 glass border-b border-sidebar-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-sidebar-accent/50 rounded-xl transition-all duration-200 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <span className="icon-[mdi--menu] w-6 h-6 text-foreground" />
          </button>
          
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">{getPageTitle()}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground capitalize hidden sm:block">{userType} Portal</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}