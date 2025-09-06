export interface SavedTrend {
  id: string;
  name: string;
  description: string;
  category: string;
  velocity: number;
  savedAt: string;
  tags: string[];
  notes?: string;
}

export interface Alert {
  id: string;
  name: string;
  description?: string;
  trendId: string;
  trendName: string;
  velocityThreshold: number;
  emailEnabled: boolean;
  webhookEnabled: boolean;
  webhookUrl?: string;
  isActive: boolean;
  createdAt: string;
  lastTriggered?: string;
}

export interface AlertTrigger {
  id: string;
  alertId: string;
  trendId: string;
  trendName: string;
  currentVelocity: number;
  threshold: number;
  triggeredAt: string;
  message: string;
}