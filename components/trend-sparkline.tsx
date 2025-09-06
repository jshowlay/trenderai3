'use client';

import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { SparklineDataPoint } from '@/types/trends';

interface TrendSparklineProps {
  data: SparklineDataPoint[];
  height?: number;
  color?: string;
}

export function TrendSparkline({ 
  data, 
  height = 80, 
  color = '#e5c35a' 
}: TrendSparklineProps) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="velocity"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}