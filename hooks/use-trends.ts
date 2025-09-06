'use client';

import { useState, useEffect } from 'react';
import type { Trend, TrendFilters } from '@/types/trends';

// Mock data generation function
function generateMockTrends(): Trend[] {
  const trendTemplates = [
    {
      name: 'AI Agents',
      description: 'Autonomous AI systems that can perform complex tasks without human intervention',
      category: 'Technology',
      tags: ['AI', 'Automation', 'Machine Learning', 'Productivity'],
    },
    {
      name: 'Quantum Computing',
      description: 'Revolutionary computing technology using quantum mechanical phenomena',
      category: 'Technology', 
      tags: ['Quantum', 'Computing', 'Research', 'IBM', 'Google'],
    },
    {
      name: 'Climate Technology',
      description: 'Innovative solutions addressing climate change and environmental challenges',
      category: 'Science',
      tags: ['Climate', 'Environment', 'Green Tech', 'Sustainability'],
    },
    {
      name: 'Decentralized Identity',
      description: 'Self-sovereign identity systems built on blockchain technology',
      category: 'Technology',
      tags: ['Blockchain', 'Identity', 'Privacy', 'Security', 'Web3'],
    },
    {
      name: 'Synthetic Biology',
      description: 'Engineering biological systems for manufacturing, medicine, and agriculture',
      category: 'Science',
      tags: ['Biology', 'Engineering', 'Medicine', 'Manufacturing'],
    },
    {
      name: 'Edge Computing',
      description: 'Distributed computing paradigm bringing computation closer to data sources',
      category: 'Technology',
      tags: ['Computing', 'Infrastructure', '5G', 'IoT', 'Latency'],
    },
  ];

  return trendTemplates.map((template, index) => {
    const velocity = Math.floor(Math.random() * 40) + 60; // 60-100
    const velocityChange = Math.floor(Math.random() * 20) - 5; // -5 to +15
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100
    const riskScore = Math.floor(Math.random() * 60) + 20; // 20-80
    
    // Generate sparkline data
    const sparklineData = [];
    for (let i = 1; i <= 7; i++) {
      sparklineData.push({
        timestamp: i,
        velocity: Math.floor(Math.random() * 30) + velocity - 15
      });
    }
    
    return {
      id: `trend-${index + 1}`,
      name: template.name,
      description: template.description,
      category: template.category,
      velocity,
      velocityChange,
      signals: [],
      tags: template.tags,
      discoveredAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      lastUpdated: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      confidence,
      riskScore,
      timeWindow: '7d' as const,
      sparklineData,
    };
  });
}

export function useTrends(filters: TrendFilters) {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrends = async () => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockTrends = generateMockTrends();
    
    // Apply filters
    let filteredTrends = mockTrends;
    
    if (filters.search) {
      filteredTrends = filteredTrends.filter(trend =>
        trend.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        trend.description.toLowerCase().includes(filters.search!.toLowerCase()) ||
        trend.tags.some(tag => tag.toLowerCase().includes(filters.search!.toLowerCase()))
      );
    }
    
    if (filters.category) {
      filteredTrends = filteredTrends.filter(trend =>
        trend.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }
    
    if (filters.velocityThreshold !== 'all') {
      filteredTrends = filteredTrends.filter(trend => {
        switch (filters.velocityThreshold) {
          case 'high': return trend.velocity >= 80;
          case 'medium': return trend.velocity >= 60 && trend.velocity < 80;
          case 'low': return trend.velocity < 60;
          default: return true;
        }
      });
    }
    
    setTrends(filteredTrends);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrends();
  }, [filters.search, filters.timeWindow, filters.velocityThreshold, filters.category]);

  return {
    trends,
    loading,
    refetch: fetchTrends
  };
}