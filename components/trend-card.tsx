'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendSparkline } from '@/components/trend-sparkline';
import { TrendingUp, BookmarkIcon, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Trend } from '@/types/trends';

interface TrendCardProps {
  trend: Trend;
  onSave?: (trend: Trend) => void;
  onAnalyze?: (trend: Trend) => void;
}

export function TrendCard({ trend, onSave, onAnalyze }: TrendCardProps) {
  const getVelocityColor = (velocity: number) => {
    if (velocity >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (velocity >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getVelocityText = (velocity: number) => {
    if (velocity >= 80) return 'High';
    if (velocity >= 60) return 'Medium';
    return 'Low';
  };

  return (
    <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-gold-600 transition-colors">
              {trend.name}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-gray-500 line-clamp-2">
              {trend.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {trend.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Velocity Score */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Velocity Score</span>
          <div className="flex items-center space-x-2">
            <Badge className={cn('px-2 py-1 border', getVelocityColor(trend.velocity))}>
              {getVelocityText(trend.velocity)} ({trend.velocity})
            </Badge>
            <div className="flex items-center text-xs">
              {trend.velocityChange > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500" />
              )}
              <span className={cn(
                'ml-1 font-medium',
                trend.velocityChange > 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {Math.abs(trend.velocityChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Sparkline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">7-day trend</span>
            <span className="text-xs text-gray-400">
              Confidence: {trend.confidence}%
            </span>
          </div>
          <TrendSparkline data={trend.sparklineData} height={60} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {trend.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
          {trend.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              +{trend.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-gray-400">
            Updated {new Date(trend.lastUpdated).toLocaleDateString()}
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSave?.(trend)}
              className="hover:bg-gold-50 hover:border-gold-300"
            >
              <BookmarkIcon className="h-3 w-3 mr-1" />
              Save
            </Button>
            <Button
              size="sm"
              className="bg-gold-500 hover:bg-gold-600 text-white"
              onClick={() => onAnalyze?.(trend)}
            >
              <BarChart3 className="h-3 w-3 mr-1" />
              Analyze
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}