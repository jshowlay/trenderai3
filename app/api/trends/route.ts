import { NextRequest, NextResponse } from 'next/server';
import { generateMockTrends } from '@/lib/mock-data';
import type { TrendFilters } from '@/types/trends';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const filters: TrendFilters = {
    search: searchParams.get('search') || undefined,
    timeWindow: (searchParams.get('timeWindow') as any) || '7d',
    velocityThreshold: (searchParams.get('velocityThreshold') as any) || 'all',
    category: searchParams.get('category') || undefined,
  };

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const trends = generateMockTrends();
    
    // Apply filters (same logic as in useTrends hook)
    let filteredTrends = trends;
    
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

    return NextResponse.json({
      trends: filteredTrends,
      total: filteredTrends.length,
      filters
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trends' },
      { status: 500 }
    );
  }
}