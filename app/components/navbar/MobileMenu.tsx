'use client';

import NavLink from './NavLink';
import NavButton from './NavButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed top-0 right-0 h-full w-80 section-glass animate-slideDown">
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-8">
            <button onClick={onClose} className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col space-y-4 mb-8">
            <NavLink href="/">Home</NavLink>
            <NavLink 
              href="/creative-tools" 
              hasDropdown 
              dropdownItems={[
                { href: '/music-monetization', label: 'Music Monetization' },
                { href: '/art-sales', label: 'Art Sales' },
                { href: '/live-performances', label: 'Live Performances' }
              ]}
            >
              Creative Tools
            </NavLink>
            <NavLink href="/how-it-works">How It Works</NavLink>
            <NavLink href="/support">Support</NavLink>
          </nav>
          
          <div className="flex flex-col space-y-3 mt-auto">
            <NavButton variant="secondary">Sign In</NavButton>
            <NavButton variant="primary">Get Started</NavButton>
          </div>
        </div>
      </div>
    </div>
  );
}