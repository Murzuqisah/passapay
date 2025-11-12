'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Mail, FileText, HelpCircle, DollarSign, Shield, ChevronRight } from "lucide-react";
import Navbar from "../components/navbar/Navbar";
import { Footer } from "../components/Footer";

export default function Support() {
  const [selectedCategory, setSelectedCategory] = useState("getting-started");

  const categories = [
    { id: "getting-started", label: "Getting Started", icon: HelpCircle },
    { id: "payments", label: "Earnings & Payouts", icon: DollarSign },
    { id: "security", label: "Artist Protection", icon: Shield },
    { id: "troubleshooting", label: "Creative Support", icon: FileText },
  ];

  const faqsByCategory = {
    "getting-started": [
      {
        question: "How do I start earning from my art?",
        answer: "Create your artist profile on PassaPay, complete the verification process, and you'll receive a personalized payment link. Share this link with your fans and supporters globally - they can send you payments instantly to support your creative work."
      },
      {
        question: "What verification is required?",
        answer: "To comply with international regulations, we require identity verification for all artists. You'll need to provide a government-issued ID and proof of address. The verification process typically takes 24-48 hours."
      }
    ],
    "payments": [
      {
        question: "What currencies can I accept?",
        answer: "PassaPay supports payments in both cryptocurrency and traditional fiat currencies. You can accept payments from over 150 countries and choose to receive your funds in your preferred currency."
      },
      {
        question: "How long does it take to receive payments?",
        answer: "Payments are processed instantly using blockchain technology. Once a fan sends you a payment, it typically appears in your account within 2-5 seconds."
      }
    ],
    "security": [
      {
        question: "Is my account secure?",
        answer: "Yes! We use bank-level encryption and blockchain technology to secure your account and transactions. All payments are cryptographically verified, and we employ multi-factor authentication."
      }
    ],
    "troubleshooting": [
      {
        question: "My payment link isn't working, what should I do?",
        answer: "First, ensure your account is fully verified and active. Check that you're sharing the correct payment link from your dashboard. If the issue persists, contact support."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="eyebrow mb-6">
              <HelpCircle className="w-4 h-4 mr-2" />
              Artist Support Hub
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="section-header">Creative Support</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              We&apos;re here to support your artistic journey. Find answers to common questions, get help from our team, and access comprehensive resources designed specifically for creators.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Card className="border-0 bg-primary/5 hover:bg-primary/10 transition-colors">
                <CardHeader>
                  <Mail className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Artist Support</CardTitle>
                  <CardDescription>
                    Get help from our creative team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a href="mailto:support@passa.com" className="text-primary hover:underline text-sm">
                    support@passa.com
                  </a>
                </CardContent>
              </Card>

              <Card className="border-0 bg-primary/5 hover:bg-primary/10 transition-colors">
                <CardHeader>
                  <FileText className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Creator Guides</CardTitle>
                  <CardDescription>
                    Browse artist resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" variant="outline">View Docs</Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6 rounded-2xl">
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "hover:bg-muted"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{category.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedCategory === category.id ? "rotate-90" : ""
                      }`} />
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-8">
                {categories.find(cat => cat.id === selectedCategory)?.label} FAQ
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {faqsByCategory[selectedCategory as keyof typeof faqsByCategory]?.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <AccordionItem value={`item-${index}`} className="border-0 bg-muted/10 rounded-xl overflow-hidden hover:bg-muted/20 transition-colors">
                      <AccordionTrigger className="text-left hover:no-underline p-6 group">
                        <span className="font-medium group-hover:text-primary transition-colors">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground px-6 pb-6 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}