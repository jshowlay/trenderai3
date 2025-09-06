'use client';

import { useState } from 'react';
import type { Alert } from '@/types/actions';

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (alert: Alert) => {
    setAlerts(prev => [...prev, alert]);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const updateAlert = (id: string, updates: Partial<Alert>) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, ...updates } : alert
    ));
  };

  return {
    alerts,
    addAlert,
    removeAlert,
    updateAlert
  };
}