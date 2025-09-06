'use client';

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
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center text-gray-400" style={{ height }}>
        No data available
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.velocity));
  const minValue = Math.min(...data.map(d => d.velocity));
  const range = maxValue - minValue || 1;

  // Create SVG path for the sparkline
  const pathData = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((point.velocity - minValue) / range) * 100;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="w-full" style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Data points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((point.velocity - minValue) / range) * 100;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1"
              fill={color}
            />
          );
        })}
      </svg>
    </div>
  );
}