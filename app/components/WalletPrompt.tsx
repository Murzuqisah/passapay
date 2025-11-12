'use client';

import { Wallet } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function WalletPrompt() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-muted-foreground">
              Connect your wallet to start sending and receiving payments securely on the blockchain
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}