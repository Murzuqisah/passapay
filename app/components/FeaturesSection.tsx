'use client';

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Globe, Zap, Shield, DollarSign, Wallet, Clock } from "lucide-react";

const features = [
  { icon: Globe, title: "Global Fan Base", description: "Connect with supporters worldwide and accept payments in any currency." },
  { icon: Zap, title: "Instant Payouts", description: "Get paid immediately after each sale or donation - no waiting periods." },
  { icon: Shield, title: "Artist Protection", description: "Your earnings are secured with bank-level encryption and fraud protection." },
  { icon: DollarSign, title: "Keep Everything", description: "100% of fan contributions go directly to you - zero platform fees." },
  { icon: Wallet, title: "Flexible Earnings", description: "Receive payments in crypto, fiat, or both - whatever works for you." },
  { icon: Clock, title: "Always Available", description: "Access your earnings 24/7 and withdraw funds whenever you need them." },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative" id="features">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="eyebrow mb-6">
            For Creators, By Creators
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Designed for <span className="section-header">Creative Minds</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From musicians to visual artists, discover why creators worldwide choose PassaPay to monetize their passion and build sustainable careers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}