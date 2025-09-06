'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { RadarSignal } from '@/types/analysis';

interface SignalExplainerProps {
  signal: RadarSignal;
  explanation: string;
}

export function SignalExplainer({ signal, explanation }: SignalExplainerProps) {
  const getSignalStrength = (value: number) => {
    if (value >= 80) return { text: 'Strong', color: 'text-green-600' };
    if (value >= 60) return { text: 'Moderate', color: 'text-yellow-600' };
    return { text: 'Weak', color: 'text-gray-600' };
  };

  const strength = getSignalStrength(signal.value);

  return (
    <Card className="border-l-4" style={{ borderLeftColor: signal.color }}>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <signal.icon className="h-4 w-4" style={{ color: signal.color }} />
              <span className="font-medium text-sm">{signal.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${strength.color}`}>
                {strength.text}
              </span>
              <span className="text-sm text-gray-500">{signal.value}/100</span>
            </div>
          </div>
          
          <Progress 
            value={signal.value} 
            className="h-2"
            style={{ 
              // @ts-ignore
              '--progress-foreground': signal.color 
            }}
          />
          
          <p className="text-xs text-gray-600">{explanation}</p>
        </div>
      </CardContent>
    </Card>
  );
}