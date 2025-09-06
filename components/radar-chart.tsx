'use client';

import type { RadarSignal } from '@/types/analysis';

interface RadarChartProps {
  data: RadarSignal[];
  height?: number;
}

export function RadarChart({ data, height = 300 }: RadarChartProps) {
  const maxValue = 100;
  const centerX = 150;
  const centerY = 150;
  const radius = 120;

  // Calculate points for the radar chart
  const points = data.map((item, index) => {
    const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
    const value = (item.value / maxValue) * radius;
    const x = centerX + value * Math.cos(angle);
    const y = centerY + value * Math.sin(angle);
    return { x, y, name: item.name, value: item.value };
  });

  // Create path for the radar area
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  // Create grid circles
  const gridCircles = [0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
    <circle
      key={index}
      cx={centerX}
      cy={centerY}
      r={radius * scale}
      fill="none"
      stroke="#e5e7eb"
      strokeWidth="1"
      opacity={0.3}
    />
  ));

  // Create grid lines
  const gridLines = data.map((_, index) => {
    const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return (
      <line
        key={index}
        x1={centerX}
        y1={centerY}
        x2={x}
        y2={y}
        stroke="#e5e7eb"
        strokeWidth="1"
        opacity={0.3}
      />
    );
  });

  return (
    <div className="w-full flex justify-center" style={{ height }}>
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Grid circles */}
        {gridCircles}
        
        {/* Grid lines */}
        {gridLines}
        
        {/* Radar area */}
        <path
          d={pathData}
          fill="#e5c35a"
          fillOpacity={0.3}
          stroke="#e5c35a"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#e5c35a"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}
        
        {/* Labels */}
        {points.map((point, index) => {
          const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
          const labelRadius = radius + 20;
          const labelX = centerX + labelRadius * Math.cos(angle);
          const labelY = centerY + labelRadius * Math.sin(angle);
          
          return (
            <text
              key={index}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="#6b7280"
              className="font-medium"
            >
              {point.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}