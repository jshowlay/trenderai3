import type { LucideIcon } from 'lucide-react';

export interface RadarSignal {
  name: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export interface Analysis {
  id: string;
  trend: {
    id: string;
    name: string;
    category: string;
  };
  signals: RadarSignal[];
  overallScore: number;
  insights: Insight[];
  predictions: Prediction[];
  riskAssessment: RiskAssessment;
  recommendations: string[];
  lastUpdated: string;
}

export interface Insight {
  type: 'velocity' | 'market' | 'competition' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
}

export interface Prediction {
  timeframe: '1w' | '1m' | '3m' | '6m';
  metric: string;
  value: number;
  confidence: number;
  direction: 'up' | 'down' | 'stable';
}

export interface RiskAssessment {
  overall: 'low' | 'medium' | 'high';
  factors: RiskFactor[];
}

export interface RiskFactor {
  name: string;
  level: 'low' | 'medium' | 'high';
  description: string;
}