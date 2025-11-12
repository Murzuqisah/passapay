'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <Image src="/logo.png" alt="PassaPay" width={32} height={32} className="w-8 h-8" />
      <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
        PassaPay
      </span>
    </Link>
  );
}