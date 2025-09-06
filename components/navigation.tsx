'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TrendingUp, RadarIcon, Bell, Menu, X, Zap } from 'lucide-react';

const navigation = [
  { name: 'Discover', href: '/discover', icon: TrendingUp },
  { name: 'Analyze', href: '/analyze', icon: RadarIcon },
  { name: 'Act', href: '/act', icon: Bell },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Zap className="h-8 w-8 text-gold-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  TrenderAI
                </span>
                <Badge variant="outline" className="ml-2 text-xs">
                  Beta
                </Badge>
              </Link>
            </div>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors',
                      isActive
                        ? 'border-b-2 border-gold-500 text-gray-900'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:ml-4 lg:flex lg:items-center lg:space-x-6">
            <Button variant="outline" size="sm">
              Feedback
            </Button>
            <Button className="trenderai-button-primary" size="sm">
              Get Started
            </Button>
          </div>

          <div className="flex items-center lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-2 text-base font-medium transition-colors',
                    isActive
                      ? 'bg-gold-50 text-gold-700 border-r-4 border-gold-500'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
            <div className="px-4 py-2 space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Feedback
              </Button>
              <Button className="trenderai-button-primary w-full" size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}