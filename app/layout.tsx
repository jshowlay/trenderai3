import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TrenderAI - Velocity-First Trend Discovery',
  description: 'Discover, analyze, and act on emerging trends with AI-powered velocity analysis.',
  keywords: ['trends', 'AI', 'analytics', 'velocity', 'discovery'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full bg-gray-50">
          <Navigation />
          <main className="pb-10">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}