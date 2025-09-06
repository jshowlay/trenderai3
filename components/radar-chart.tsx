'use client';

import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { RadarSignal } from '@/types/analysis';

interface RadarChartProps {
  data: RadarSignal[];
  height?: number;
}

export function RadarChart({ data, height = 300 }: RadarChartProps) {
  // Transform data for recharts
  const chartData = data.map(item => ({
    name: item.name,
    value: item.value,
    fullMark: 100
  }));

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar
            name="Signal Strength"
            dataKey="value"
            stroke="#e5c35a"
            fill="#e5c35a"
            fillOpacity={0.3}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}