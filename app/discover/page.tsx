'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { TrendCard } from '@/components/trend-card';
import { VelocityFilter } from '@/components/velocity-filter';
import { TrendingUp, Search, Filter, RefreshCw } from 'lucide-react';
import { useTrends } from '@/hooks/use-trends';
import type { TimeWindow, VelocityThreshold } from '@/types/trends';

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('7d');
  const [velocityThreshold, setVelocityThreshold] = useState<VelocityThreshold>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { trends, loading, refetch } = useTrends({
    search: searchTerm,
    timeWindow,
    velocityThreshold,
    category: selectedCategory === 'all' ? undefined : selectedCategory,
  });

  const categories = ['Technology', 'Business', 'Science', 'Culture', 'Health', 'Finance'];

  const handleSaveTrend = (trend: any) => {
    console.log('Saving trend:', trend.name);
    // This would integrate with the saved trends system
  };

  const handleAnalyzeTrend = (trend: any) => {
    console.log('Analyzing trend:', trend.name);
    // This would navigate to the analyze page
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Discover Trends
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Velocity-first trend discovery with real-time signal analysis
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="inline-flex items-center"
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>
            Refine your trend discovery with advanced filtering options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search trends..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Time Window */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Window</label>
              <Select value={timeWindow} onValueChange={(value: TimeWindow) => setTimeWindow(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Velocity Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Velocity Threshold</label>
              <VelocityFilter
                value={velocityThreshold}
                onChange={setVelocityThreshold}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-gold-500" />
          <span className="text-lg font-semibold">
            {trends.length} trends discovered
          </span>
          {velocityThreshold !== 'all' && (
            <Badge variant="outline" className="capitalize">
              {velocityThreshold} velocity
            </Badge>
          )}
        </div>
      </div>

      {/* Trends Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-24 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : trends.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trends.map((trend) => (
            <TrendCard 
              key={trend.id} 
              trend={trend} 
              onSave={handleSaveTrend}
              onAnalyze={handleAnalyzeTrend}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No trends found</h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your filters or search terms to discover new trends.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setVelocityThreshold('all');
                setSelectedCategory('all');
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}