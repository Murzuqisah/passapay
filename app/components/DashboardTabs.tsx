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
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Card className="w-fit mx-auto">
          <CardContent className="p-2">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center gap-2"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}