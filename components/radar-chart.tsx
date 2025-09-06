'use client';

import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { RadarSignal } from '@/types/analysis';

interface RadarChartProps {
  data: RadarSignal[];
  height?: number;
}

export function RadarChart({ data, height = 300 }: RadarChartProps) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <PolarRadiusAxis 
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
          />
          <Radar
            name="Signal Strength"
            dataKey="value"
            stroke="#e5c35a"
            fill="#e5c35a"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}