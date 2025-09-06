import { NextRequest, NextResponse } from 'next/server';
import type { Analysis, RadarSignal } from '@/types/analysis';
import { Users, Search, MessageSquare, BarChart3, TrendingUp, Globe, Zap } from 'lucide-react';

export async function GET(
  request: NextRequest,
  { params }: { params: { trendId: string } }
) {
  const { trendId } = params;

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Generate mock radar signals
    const signals: RadarSignal[] = [
      { name: 'Social Media', value: Math.floor(Math.random() * 40) + 60, icon: Users, color: '#3B82F6' },
      { name: 'Search Volume', value: Math.floor(Math.random() * 40) + 60, icon: Search, color: '#10B981' },
      { name: 'News Coverage', value: Math.floor(Math.random() * 40) + 60, icon: MessageSquare, color: '#F59E0B' },
      { name: 'Market Activity', value: Math.floor(Math.random() * 40) + 60, icon: BarChart3, color: '#EF4444' },
      { name: 'Expert Sentiment', value: Math.floor(Math.random() * 40) + 60, icon: TrendingUp, color: '#8B5CF6' },
      { name: 'Geographic Spread', value: Math.floor(Math.random() * 40) + 60, icon: Globe, color: '#06B6D4' },
      { name: 'Velocity Score', value: Math.floor(Math.random() * 30) + 70, icon: Zap, color: '#E5C35A' },
    ];
    
    const trendNames: Record<string, string> = {
      'ai-agents': 'AI Agents',
      'quantum-computing': 'Quantum Computing',
      'climate-tech': 'Climate Technology',
    };
    
    const analysis: Analysis = {
      id: `analysis-${trendId}`,
      trend: {
        id: trendId,
        name: trendNames[trendId] || 'Unknown Trend',
        category: 'Technology',
      },
      signals,
      overallScore: Math.round(signals.reduce((acc, signal) => acc + signal.value, 0) / signals.length),
      insights: [
        {
          type: 'velocity',
          title: 'High Velocity Growth',
          description: 'This trend is experiencing rapid acceleration across multiple signals',
          confidence: 92,
          impact: 'high',
        },
        {
          type: 'market',
          title: 'Strong Market Interest',
          description: 'Significant investment and commercial activity detected',
          confidence: 88,
          impact: 'high',
        },
      ],
      predictions: [
        {
          timeframe: '1w',
          metric: 'Velocity Score',
          value: 95,
          confidence: 85,
          direction: 'up',
        },
        {
          timeframe: '1m',
          metric: 'Market Activity',
          value: 78,
          confidence: 72,
          direction: 'up',
        },
      ],
      riskAssessment: {
        overall: 'medium',
        factors: [
          {
            name: 'Market Volatility',
            level: 'medium',
            description: 'Moderate risk due to market fluctuations',
          },
          {
            name: 'Competition',
            level: 'high',
            description: 'High competitive pressure in this space',
          },
        ],
      },
      recommendations: [
        'Monitor social media signals closely for early indicators',
        'Consider strategic partnerships in this emerging space',
        'Track competitor movements and market positioning',
        'Evaluate investment opportunities in related technologies',
      ],
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(analysis);
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analysis' },
      { status: 500 }
    );
  }
}