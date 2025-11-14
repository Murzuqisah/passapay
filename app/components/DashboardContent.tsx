'use client';

import AccountCard from './account-card';
import SendPayment from './send-payment';
import PaymentHistory from './payment-history';
import { unifyAddress } from '../utils/formatters';
import { chainKeys } from '../utils/sdk';

interface DashboardContentProps {
  activeTab: 'dashboard' | 'send' | 'history';
  selectedAccount: { address: string };
}

export function DashboardContent({ activeTab, selectedAccount }: DashboardContentProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {chainKeys.map(chainKey => (
              <AccountCard
                key={chainKey}
                chainKey={chainKey}
                address={unifyAddress(selectedAccount.address)}
              />
            ))}
          </div>
        )}

        {activeTab === 'send' && <SendPayment />}
        {activeTab === 'history' && <PaymentHistory />}
      </div>
    </section>
  );
}