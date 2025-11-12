'use client';

import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { LayoutDashboard, Send, History, User } from 'lucide-react';

interface DashboardTabsProps {
  activeTab: 'dashboard' | 'send' | 'history' | 'profile';
  onTabChange: (tab: 'dashboard' | 'send' | 'history' | 'profile') => void;
}

const tabs = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'send' as const, label: 'Send Payment', icon: Send },
  { id: 'history' as const, label: 'History', icon: History },
  { id: 'profile' as const, label: 'Profile', icon: User },
];

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <section className="py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Card className="w-full sm:w-fit mx-auto max-w-2xl">
          <CardContent className="p-2">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center gap-1 sm:gap-2 whitespace-nowrap flex-shrink-0 px-2 sm:px-3"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden xs:inline sm:inline text-xs sm:text-sm">{tab.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}