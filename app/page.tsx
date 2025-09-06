import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, RadarIcon, Bell, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { TrendSparkline } from '@/components/trend-sparkline';

export default function HomePage() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Discover Trends',
      description: 'Velocity-first trend discovery with real-time signal analysis',
      href: '/discover',
      color: 'text-blue-600',
    },
    {
      icon: RadarIcon,
      title: 'Analyze Signals',
      description: '7-Signal radar visualization for comprehensive trend analysis',
      href: '/analyze',
      color: 'text-green-600',
    },
    {
      icon: Bell,
      title: 'Act on Insights',
      description: 'Save trends and set up intelligent alerts for emerging opportunities',
      href: '/act',
      color: 'text-gold-600',
    },
  ];

  const mockTrendData = [
    { timestamp: 1, velocity: 20 },
    { timestamp: 2, velocity: 45 },
    { timestamp: 3, velocity: 78 },
    { timestamp: 4, velocity: 65 },
    { timestamp: 5, velocity: 92 },
    { timestamp: 6, velocity: 85 },
    { timestamp: 7, velocity: 95 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Velocity-First
                <span className="text-gold-500"> Trend Discovery</span>
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Discover emerging trends before they peak. Our AI-powered platform analyzes velocity patterns to identify opportunities in real-time.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg bg-gradient-to-br from-gold-100 to-gold-200 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Zap className="h-6 w-6 text-gold-600" />
                            <span className="text-sm font-medium text-gold-800">High Velocity</span>
                          </div>
                          <TrendSparkline data={mockTrendData} height={120} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/discover">
                  <Button size="lg" className="trenderai-button-primary group">
                    Start Discovering
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Complete Trend Intelligence Platform
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From discovery to action, TrenderAI provides everything you need to stay ahead of emerging trends.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.title} className="relative group">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm border border-gray-200 group-hover:shadow-md transition-shadow">
                      <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                    </div>
                    <span className="ml-16">{feature.title}</span>
                  </dt>
                  <dd className="mt-2 ml-16 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                  <div className="mt-4 ml-16">
                    <Link href={feature.href}>
                      <Button variant="outline" size="sm" className="group-hover:border-gold-300 group-hover:text-gold-600 transition-colors">
                        Learn More
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Trusted by forward-thinking teams
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Our velocity-first approach helps teams identify trends 3x faster than traditional methods.
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: 'Trends Analyzed', value: '10,000+', description: 'Real-time trend signals' },
                { name: 'Velocity Score', value: '95%', description: 'Prediction accuracy' },
                { name: 'Time Saved', value: '3x', description: 'Faster trend identification' },
                { name: 'Active Alerts', value: '500+', description: 'Monitoring emerging trends' },
              ].map((stat) => (
                <div key={stat.name} className="flex flex-col bg-gray-50 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                  <dd className="text-sm text-gray-500">{stat.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}