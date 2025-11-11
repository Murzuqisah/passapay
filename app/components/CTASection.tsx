'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Music, Palette, Mic, DollarSign, Globe, Zap, TrendingUp, Users, Clock, ArrowRight, Sparkles } from "lucide-react";

const earnings = [
  { amount: "$2,847", name: "Sarah M.", role: "Indie Musician", stat: "+127% vs last month", icon: Music },
  { amount: "$15,632", name: "Marcus K.", role: "Digital Artist", stat: "89 countries", icon: Palette },
  { amount: "$8,291", name: "Luna R.", role: "Performer", stat: "Instant settlement", icon: Mic }
];

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="eyebrow mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Join 47,000+ Artists Earning Daily
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Turn Your Passion Into <span className="section-header">Profit</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Real artists. Real earnings. Real freedom. Start receiving instant payments from fans worldwide using blockchain technology.
          </p>
        </div>

        {/* Live Earnings Demo */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {earnings.map((earning, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="section-glass relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <earning.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{earning.name}</p>
                      <p className="text-sm text-muted-foreground">{earning.role}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">{earning.amount}</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {index === 0 ? "Earned this month" : index === 1 ? "Total earnings" : "Last show payout"}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {index === 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : 
                     index === 1 ? <Globe className="w-3 h-3 mr-1" /> : 
                     <Clock className="w-3 h-3 mr-1" />}
                    {earning.stat}
                  </Badge>
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <Card className="section-glass relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-[url('/assets/mural.webp')] opacity-20 bg-cover bg-center"></div>
              <div className="relative z-10">
                <div className="flex justify-center gap-6 mb-8 flex-wrap">
                  <Badge variant="outline" className="px-4 py-2">
                    <Zap className="w-4 h-4 mr-2" />
                    Instant Payouts
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Zero Platform Fees
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <Globe className="w-4 h-4 mr-2" />
                    Global Reach
                  </Badge>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-bold mb-6">
                  <span className="section-header">Ready to Get Paid for Your Art?</span>
                </h3>
                
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Join the revolution. Connect your wallet, share your art, and start earning in minutes. 
                  Your fans are waiting to support you directly.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/auth">
                    <Button size="lg" className="group px-8 py-4 text-lg">
                      Launch Your Artist Profile
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>47,000+ artists already earning</span>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center items-center gap-8 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>No setup fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Withdraw anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Bank-level security</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}