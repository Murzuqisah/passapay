'use client';

import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { User, Globe, Wallet } from "lucide-react";
import Connect from "./connect";

const steps = [
  { num: "01", title: "Connect Your Wallet", desc: "Connect your digital wallet to get started. This is your secure gateway to receiving payments.", icon: User },
  { num: "02", title: "Share Your Art", desc: "Get your personalized link to share across social media, concerts, and exhibitions.", icon: Globe },
  { num: "03", title: "Earn & Create", desc: "Receive instant support from fans and reinvest in your artistic journey.", icon: Wallet }
];

export function HowItWorksSection() {
  return (
    <section className="py-24 relative" id="how-it-works">
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
            How It Works
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Start Your <span className="section-header">Creative Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground">From setup to earnings in three simple steps</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <Card className="glass-card text-center group hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col justify-between h-full min-h-[240px]">
                  <div className="flex-1 flex flex-col">
                    <div className="relative inline-block mb-4">
                      <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mx-auto">
                        <step.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{step.num}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground flex-1">{step.desc}</p>
                  </div>
                  {index === 0 && (
                    <div className="mt-4">
                      <Connect showText={false} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}