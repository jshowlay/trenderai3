'use client';

import { useState } from 'react';
import type { SavedTrend } from '@/types/actions';

export function useSavedTrends() {
  const [savedTrends, setSavedTrends] = useState<SavedTrend[]>([]);

  const addTrend = (trend: SavedTrend) => {
    setSavedTrends(prev => [...prev, trend]);
  };

  const removeTrend = (id: string) => {
    setSavedTrends(prev => prev.filter(trend => trend.id !== id));
  };

  const updateTrend = (id: string, updates: Partial<SavedTrend>) => {
    setSavedTrends(prev => prev.map(trend => 
      trend.id === id ? { ...trend, ...updates } : trend
    ));
  };

  return {
    savedTrends,
    addTrend,
    removeTrend,
    updateTrend
  };
}