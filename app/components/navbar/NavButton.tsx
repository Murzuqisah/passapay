'use client';

import Link from 'next/link';

interface NavButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
}

export default function NavButton({ children, variant = 'primary', onClick, href }: NavButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:scale-105",
    secondary: "section-glass text-foreground hover:bg-muted/50 hover:scale-105"
  };

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variants[variant]}`}>
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
    </button>
  );
}