'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { VelocityThreshold } from '@/types/trends';

interface VelocityFilterProps {
  value: VelocityThreshold;
  onChange: (value: VelocityThreshold) => void;
}

export function VelocityFilter({ value, onChange }: VelocityFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Velocities</SelectItem>
        <SelectItem value="high">High Velocity (80+)</SelectItem>
        <SelectItem value="medium">Medium Velocity (60-79)</SelectItem>
        <SelectItem value="low">Low Velocity (&lt;60)</SelectItem>
      </SelectContent>
    </Select>
  );
}