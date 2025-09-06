'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadarChart } from '@/components/radar-chart';
import { SignalExplainer } from '@/components/signal-explainer';
import { TrendComparison } from '@/components/trend-comparison';
import { RadarIcon, TrendingUp, Users, MessageSquare, Search, BarChart3, Globe, Zap } from 'lucide-react';
import { useAnalysis } from '@/hooks/use-analysis';
import type { RadarSignal } from '@/types/analysis';

export default function AnalyzePage() {
  const [selectedTrendId, setSelectedTrendId] = useState<string>('ai-agents');
  const { analysis, loading } = useAnalysis(selectedTrendId);

  const signals: RadarSignal[] = [
    { name: 'Social Media', value: 85, icon: Users, color: '#3B82F6' },
    { name: 'Search Volume', value: 78, icon: Search, color: '#10B981' },
    { name: 'News Coverage', value: 92, icon: MessageSquare, color: '#F59E0B' },
    { name: 'Market Activity', value: 67, icon: BarChart3, color: '#EF4444' },
    { name: 'Expert Sentiment', value: 88, icon: TrendingUp, color: '#8B5CF6' },
    { name: 'Geographic Spread', value: 74, icon: Globe, color: '#06B6D4' },
    { name: 'Velocity Score', value: 95, icon: Zap, color: '#E5C35A' },
  ];

  const availableTrends = [
    { id: 'ai-agents', name: 'AI Agents', category: 'Technology' },
    { id: 'quantum-computing', name: 'Quantum Computing', category: 'Technology' },
    { id: 'climate-tech', name: 'Climate Technology', category: 'Science' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Analyze Trends
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              7-Signal radar visualization for comprehensive trend analysis
            </p>
          </div>
        </div>
      </div>

      {/* Trend Selector */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Select Trend to Analyze</CardTitle>
          <CardDescription>
            Choose a trend to view its comprehensive 7-signal analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableTrends.map((trend) => (
              <Button
                key={trend.id}
                onClick={() => setSelectedTrendId(trend.id)}
                variant={selectedTrendId === trend.id ? 'default' : 'outline'}
                className={selectedTrendId === trend.id ? 'trenderai-button-primary' : ''}
              >
                {trend.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {trend.category}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Analysis */}
      {loading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : analysis ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RadarIcon className="mr-2 h-5 w-5 text-gold-500" />
                7-Signal Analysis
              </CardTitle>
              <CardDescription>
                Comprehensive signal strength analysis for {analysis.trend.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadarChart
                data={signals}
                height={300}
              />
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-gold-600">
                  {Math.round(signals.reduce((acc, signal) => acc + signal.value, 0) / signals.length)}
                </div>
                <div className="text-sm text-gray-500">Overall Signal Score</div>
              </div>
            </CardContent>
          </Card>

          {/* Signal Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Signal Breakdown</CardTitle>
              <CardDescription>
                Detailed analysis of each signal component
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {signals.map((signal) => (
                <SignalExplainer
                  key={signal.name}
                  signal={signal}
                  explanation={`${signal.name} shows ${signal.value > 80 ? 'strong' : signal.value > 60 ? 'moderate' : 'weak'} activity for this trend.`}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Detailed Analysis Tabs */}
      <div className="mt-8">
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="comparison">Trend Comparison</TabsTrigger>
            <TabsTrigger value="timeline">Timeline Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="insights" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Velocity Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Growth Rate</span>
                      <span className="font-semibold text-green-600">+127% (7d)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Peak Velocity</span>
                      <span className="font-semibold">95/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Momentum</span>
                      <Badge className="bg-green-100 text-green-800">Accelerating</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Market Risk</span>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-300">Moderate</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sustainability</span>
                      <Badge className="bg-green-100 text-green-800">High</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Competition</span>
                      <Badge variant="outline" className="text-red-600 border-red-300">High</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="mt-6">
            <TrendComparison
              trends={availableTrends}
              selectedTrends={[selectedTrendId]}
              onSelectionChange={() => {}}
            />
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Timeline Analysis</CardTitle>
                <CardDescription>
                  Historical progression and future predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Timeline visualization will be implemented here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}