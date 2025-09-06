'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

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

        {/* Comparison Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="aiAgents" fill="#e5c35a" name="AI Agents" />
              <Bar dataKey="quantum" fill="#3b82f6" name="Quantum Computing" />
              <Bar dataKey="climate" fill="#10b981" name="Climate Tech" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}