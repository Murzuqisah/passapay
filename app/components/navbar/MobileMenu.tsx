'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Connect from '../connect';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isCreativeToolsOpen, setIsCreativeToolsOpen] = useState(false);

  if (!isOpen) return null;

  const creativeToolsItems = [
    { href: '/music-monetization', label: 'Music Monetization' },
    { href: '/art-sales', label: 'Art Sales' },
    { href: '/live-performances', label: 'Live Performances' }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed top-0 right-0 h-full w-80 section-glass animate-slideDown overflow-y-auto">
        <div className="flex flex-col min-h-full p-6">
          <div className="flex justify-end mb-8">
            <button onClick={onClose} className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col space-y-4 mb-8">
            <Link href="/" onClick={onClose} className="text-foreground hover:text-primary transition-colors py-2">
              Home
            </Link>
            
            <div>
              <button 
                onClick={() => setIsCreativeToolsOpen(!isCreativeToolsOpen)}
                className="flex items-center justify-between w-full text-foreground hover:text-primary transition-colors py-2"
              >
                Creative Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${isCreativeToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCreativeToolsOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {creativeToolsItems.map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      onClick={onClose}
                      className="block text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="/#how-it-works" onClick={onClose} className="text-foreground hover:text-primary transition-colors py-2">
              How It Works
            </Link>
            <Link href="/support" onClick={onClose} className="text-foreground hover:text-primary transition-colors py-2">
              Support
            </Link>
          </nav>
          
          <div className="flex flex-col space-y-3 mt-auto">
            <Connect />
            <button className="px-4 py-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}