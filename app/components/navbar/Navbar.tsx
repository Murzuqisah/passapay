'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import NavLink from './NavLink';

import MobileMenu from './MobileMenu';
import { ThemeToggle } from '../ThemeToggle';
import Connect from '../connect';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center">
        <div className={`transition-all duration-500 ease-out ${
          isScrolled 
            ? 'w-full mt-0 rounded-none backdrop-blur-md bg-background/80 border-b border-border/50 shadow-lg' 
            : 'mt-3 sm:mt-6 rounded-full section-glass mx-0.5 sm:mx-0'
        }`}>
          <div className={`flex items-center transition-all duration-300 ${
            isScrolled 
              ? 'h-16 sm:h-16 px-4 sm:px-6 justify-between max-w-7xl mx-auto' 
              : 'h-16 sm:h-14 px-6 sm:px-6 justify-between sm:justify-center gap-4 sm:gap-8 sm:w-fit'
          }`}>
            <Logo />
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/promoter/dashboard">Dashboard</NavLink>
              <NavLink href="/transactions">Transactions</NavLink>
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
              <NavLink href="/support">Support</NavLink>
            </div>
            
            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <ThemeToggle />
              <Connect />
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-1 sm:space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 sm:p-2 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}