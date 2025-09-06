export interface Trend {
  id: string;
  name: string;
  description: string;
  category: string;
  velocity: number;
  velocityChange: number;
  signals: TrendSignal[];
  tags: string[];
  discoveredAt: string;
  lastUpdated: string;
  confidence: number;
  riskScore: number;
  timeWindow: TimeWindow;
  sparklineData: SparklineDataPoint[];
}

export interface TrendSignal {
  type: 'social' | 'search' | 'news' | 'market' | 'expert' | 'geographic' | 'velocity';
  strength: number;
  change: number;
  source: string;
  timestamp: string;
}

export interface SparklineDataPoint {
  timestamp: number;
  velocity: number;
}

export type TimeWindow = '1d' | '7d' | '30d' | '90d';
export type VelocityThreshold = 'all' | 'low' | 'medium' | 'high';

export interface TrendFilters {
  search?: string;
  timeWindow: TimeWindow;
  velocityThreshold: VelocityThreshold;
  category?: string;
  tags?: string[];
}