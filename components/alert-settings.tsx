'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Trash2, Settings, Mail, Globe } from 'lucide-react';
import type { Alert } from '@/types/actions';

interface AlertSettingsProps {
  alerts: Alert[];
  onUpdate: (id: string, updates: Partial<Alert>) => void;
  onDelete: (id: string) => void;
}

export function AlertSettings({ alerts, onUpdate, onDelete }: AlertSettingsProps) {
  if (alerts.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Bell className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No alerts configured</h3>
          <p className="mt-2 text-gray-500">
            Create your first alert to start monitoring trends automatically.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className="trenderai-card">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-blue-500" />
                  {alert.name}
                </CardTitle>
                <CardDescription className="mt-1">
                  {alert.description || `Alert for ${alert.trendName}`}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Switch
                  checked={alert.isActive}
                  onCheckedChange={(checked) => onUpdate(alert.id, { isActive: checked })}
                />
                <Badge variant={alert.isActive ? 'default' : 'secondary'}>
                  {alert.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Alert Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Monitoring:</span>
                <div className="text-gray-600">{alert.trendName}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Velocity Threshold:</span>
                <div className="text-gray-600">{alert.velocityThreshold}/100</div>
              </div>
            </div>

            {/* Notification Methods */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700">Notification Methods</div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Email</span>
                  <Switch
                    checked={alert.emailEnabled}
                    onCheckedChange={(checked) => onUpdate(alert.id, { emailEnabled: checked })}
                    size="sm"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Webhook</span>
                  <Switch
                    checked={alert.webhookEnabled}
                    onCheckedChange={(checked) => onUpdate(alert.id, { webhookEnabled: checked })}
                    size="sm"
                  />
                </div>
              </div>
              
              {alert.webhookEnabled && alert.webhookUrl && (
                <div className="text-xs text-gray-500 pl-6">
                  Webhook URL: {alert.webhookUrl}
                </div>
              )}
            </div>

            {/* Last Triggered */}
            {alert.lastTriggered && (
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Last triggered: {new Date(alert.lastTriggered).toLocaleString()}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="text-xs text-gray-500">
                Created {new Date(alert.createdAt).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-gray-50"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(alert.id)}
                  className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}