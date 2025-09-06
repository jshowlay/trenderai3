'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TrendComparisonProps {
  trends: Array<{ id: string; name: string; category: string; }>;
  selectedTrends: string[];
  onSelectionChange: (trends: string[]) => void;
}

export function TrendComparison({ trends, selectedTrends, onSelectionChange }: TrendComparisonProps) {
  const comparisonData = [
    { name: 'Velocity', aiAgents: 95, quantum: 72, climate: 68 },
    { name: 'Social', aiAgents: 85, quantum: 45, climate: 78 },
    { name: 'Search', aiAgents: 78, quantum: 82, climate: 65 },
    { name: 'News', aiAgents: 92, quantum: 67, climate: 88 },
    { name: 'Market', aiAgents: 67, quantum: 74, climate: 56 },
    { name: 'Expert', aiAgents: 88, quantum: 91, climate: 72 },
    { name: 'Geographic', aiAgents: 74, quantum: 58, climate: 85 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend Comparison</CardTitle>
        <CardDescription>
          Compare signal strengths across different trends
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Trend Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select trends to compare</label>
          <div className="flex flex-wrap gap-2">
            {trends.map((trend) => (
              <Button
                key={trend.id}
                variant={selectedTrends.includes(trend.id) ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  const newSelection = selectedTrends.includes(trend.id)
                    ? selectedTrends.filter(id => id !== trend.id)
                    : [...selectedTrends, trend.id];
                  onSelectionChange(newSelection);
                }}
              >
                {trend.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {trend.category}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600">
            <div>Signal</div>
            <div className="text-center">AI Agents</div>
            <div className="text-center">Quantum</div>
            <div className="text-center">Climate</div>
          </div>
          {comparisonData.map((item) => (
            <div key={item.name} className="grid grid-cols-4 gap-4 items-center">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${item.aiAgents}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{item.aiAgents}</span>
              </div>
              <div className="text-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${item.quantum}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{item.quantum}</span>
              </div>
              <div className="text-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${item.climate}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{item.climate}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}