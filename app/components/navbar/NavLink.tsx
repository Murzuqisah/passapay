'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  hasDropdown?: boolean;
  dropdownItems?: { href: string; label: string }[];
}

export default function NavLink({ href, children, hasDropdown, dropdownItems }: NavLinkProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (hasDropdown && dropdownItems) {
    return (
      <div 
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button className="flex items-center space-x-1 px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200 group">
          <span>{children}</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 section-glass rounded-lg shadow-lg animate-slideDown z-50">
            <div className="py-2">
              {dropdownItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link 
      href={href}
      className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
    </Link>
  );
}