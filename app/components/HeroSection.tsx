'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Check,
  Star,
  Music,
  Globe,
  Zap,
  DollarSign,
  Clock,
  Users,
  ShieldCheck
} from 'lucide-react';

const currencies = [
  { symbol: '$', amount: '47,230', code: 'USD' },
  { symbol: '€', amount: '43,890', code: 'EUR' },
  { symbol: '£', amount: '37,650', code: 'GBP' },
  { symbol: '¥', amount: '6,890,000', code: 'JPY' },
  { symbol: '₦', amount: '21,450,000', code: 'NGN' }
];

function useCurrencyRotation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currencies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return { formattedAmount: `${currencies[currentIndex].symbol}${currencies[currentIndex].amount}` };
}

export function HeroSection() {
  const { formattedAmount } = useCurrencyRotation();
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 sm:pt-20">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/assets/mural.webp" 
          alt="Artist mural showcasing creative community" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-in slide-in-from-left duration-800">
            <div className="mb-6">
              <div className="eyebrow mb-6">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trusted by 10,000+ Creators Worldwide
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
              <span className="section-header">Create. Share. Earn Globally.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl">
              Turn your passion into profit. Connect with fans worldwide, receive instant support, and focus on what you do best - creating amazing art.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/auth" className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base">
                <span className="hidden sm:inline">Launch Your Artist Profile</span>
                <span className="sm:hidden">Get Started</span>
              </Link>
              <button className="inline-flex items-center justify-center px-4 sm:px-6 py-3 border border-input bg-background rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors text-sm sm:text-base">
                <Music className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                See Demo
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-muted-foreground">Free for all artists</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-muted-foreground">Bank-level security</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-primary" />
                <span className="text-muted-foreground">4.9★ rating</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 animate-in slide-in-from-right duration-800 delay-200 mt-8 lg:mt-0">
            <div className="section-glass rounded-lg border">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Earnings</p>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold transition-all duration-500">
                      {formattedAmount}
                    </h3>
                  </div>
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs sm:text-sm">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    +31%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glass-card rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Global Reach</span>
                    </div>
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-xs text-muted-foreground">Countries</p>
                  </div>
                  <div className="glass-card rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Instant</span>
                    </div>
                    <p className="text-2xl font-bold">2.3s</p>
                    <p className="text-xs text-muted-foreground">Avg Settlement</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="glass-card rounded-lg border">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Payment received</p>
                          <p className="text-xs text-muted-foreground">From fan in Germany</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">2m ago</span>
                    </div>
                  </div>
                  <div className="glass-card rounded-lg border">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Music className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">New subscriber</p>
                          <p className="text-xs text-muted-foreground">Monthly supporter</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">8m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-3 -right-3 inline-flex items-center px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
              <Clock className="w-4 h-4 mr-1" />
              24/7 Access
            </div>

            <div className="absolute -bottom-3 -left-3 inline-flex items-center px-2 py-1 rounded-full border bg-background text-sm">
              <Users className="w-4 h-4 mr-1" />
              1,247 Active
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}