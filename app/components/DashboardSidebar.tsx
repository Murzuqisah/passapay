'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useConnect } from '../hooks/use-connect'
import { useMetaMask } from '../hooks/use-metamask'
import DashboardNavbar from './DashboardNavbar'

interface SidebarProps {
  userType: 'artist' | 'promoter'
  children: React.ReactNode
}

interface NavItem {
  href: string
  label: string
  icon: string
  badge?: string
  isNew?: boolean
}

interface NavSection {
  title: string
  items: NavItem[]
}

export default function DashboardSidebar({ userType, children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { disconnect, selectedAccount } = useConnect()
  const metamask = useMetaMask()

  const handleLogout = () => {
    disconnect()
    metamask.disconnect()
    router.push('/')
  }

  const artistSections: NavSection[] = [
    {
      title: 'Overview',
      items: [
        { href: '/artist', label: 'Dashboard', icon: 'icon-[mdi--view-dashboard]' },
        { href: '/', label: 'Homepage', icon: 'icon-[mdi--home]' },
      ]
    },
    {
      title: 'Payments',
      items: [
        { href: '/artist/transactions', label: 'Transactions', icon: 'icon-[mdi--swap-horizontal]' },
      ]
    }
  ]

  const promoterSections: NavSection[] = [
    {
      title: 'Overview',
      items: [
        { href: '/promoter/dashboard', label: 'Dashboard', icon: 'icon-[mdi--view-dashboard]' },
        { href: '/', label: 'Homepage', icon: 'icon-[mdi--home]' },
      ]
    },
    {
      title: 'Payments',
      items: [
        { href: '/promoter/payments', label: 'Send Payments', icon: 'icon-[mdi--send]' },
        { href: '/promoter/history', label: 'Transactions', icon: 'icon-[mdi--history]' },
      ]
    },
    {
      title: 'Management',
      items: [
        { href: '/promoter/artists', label: 'Artists', icon: 'icon-[mdi--account-group]' },
      ]
    }
  ]

  const sections = userType === 'artist' ? artistSections : promoterSections

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full glass border-r border-sidebar-border z-50 transform transition-all duration-300 ease-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}>

        {/* Header */}
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border/50">
          {!isCollapsed ? (
            <div className="flex items-center gap-3 flex-1">
              <Image src="/logo.png" alt="PassaPay" width={40} height={40} className="w-10 h-10 rounded-xl" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">PassaPay</h2>
                <p className="text-xs text-sidebar-foreground/60 capitalize font-medium">{userType}</p>
              </div>
              <button
                onClick={() => setIsCollapsed(true)}
                className="hidden lg:flex p-2 hover:bg-sidebar-accent/50 rounded-lg transition-colors duration-200"
              >
                <span className="icon-[mdi--chevron-left] w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 w-full">
              <Image src="/logo.png" alt="PassaPay" width={40} height={40} className="w-10 h-10 rounded-xl" />
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-2 hover:bg-sidebar-accent/50 rounded-lg transition-colors duration-200"
              >
                <span className="icon-[mdi--chevron-right] w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* User Info */}
        {selectedAccount && !isCollapsed && (
          <div className="p-4 border-b border-sidebar-border/50">
            <div className="glass-card p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="icon-[mdi--account] w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-sidebar-foreground truncate">
                    {selectedAccount.name || 'User'}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    {selectedAccount.address?.slice(0, 8)}...{selectedAccount.address?.slice(-6)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide py-4">
          {sections.map((section, sectionIndex) => (
            <div key={section.title} className={`px-4 ${sectionIndex > 0 ? 'mt-6' : ''}`}>
              {!isCollapsed && (
                <h3 className="text-xs font-bold text-sidebar-foreground/50 uppercase tracking-wider mb-3 px-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                        ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-lg shadow-primary/20 border border-primary/20'
                        : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                        } ${isCollapsed ? 'justify-center px-2' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={`relative p-2 rounded-lg transition-all duration-300 ${isActive
                        ? 'bg-primary/10 text-primary'
                        : 'bg-sidebar-accent/30 text-sidebar-foreground/60 group-hover:bg-sidebar-accent/50 group-hover:text-sidebar-foreground'
                        }`}>
                        <span className={`${item.icon} w-4 h-4 text-current`} />
                        {item.isNew && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                        )}
                      </div>

                      {!isCollapsed && (
                        <>
                          <div className="flex-1 flex items-center justify-between">
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <span className="px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                                {item.badge}
                              </span>
                            )}
                            {item.isNew && (
                              <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-primary to-accent text-white rounded-full animate-pulse">
                                New
                              </span>
                            )}
                          </div>

                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-r-full" />
                          )}
                        </>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border/50">
          <div className="space-y-1">
            <Link
              href={`/${userType}/profile`}
              className={`flex items-center gap-3 w-full px-3 py-3 text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-xl transition-all duration-200 ${isCollapsed ? 'justify-center px-2' : ''
                }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="p-2 rounded-lg bg-sidebar-accent/30 hover:bg-sidebar-accent/50 transition-colors duration-200">
                <span className="icon-[mdi--account] w-4 h-4" />
              </div>
              {!isCollapsed && <span>Profile</span>}
            </Link>

            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 w-full px-3 py-3 text-sm font-medium text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-200 ${isCollapsed ? 'justify-center px-2' : ''
                }`}
            >
              <div className="p-2 rounded-lg bg-sidebar-accent/30 hover:bg-destructive/20 transition-colors duration-200">
                <span className="icon-[mdi--logout] w-4 h-4" />
              </div>
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'} min-w-0`}>
        <DashboardNavbar userType={userType} onToggleSidebar={() => setIsOpen(!isOpen)} />

        <main className="flex-1 p-4 lg:p-6 xl:p-8 pt-4 overflow-x-hidden">
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}