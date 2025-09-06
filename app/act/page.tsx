'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { SavedTrendsList } from '@/components/saved-trends-list';
import { AlertSettings } from '@/components/alert-settings';
import { BookmarkIcon, Bell, Settings, Plus, Trash2, Edit } from 'lucide-react';
import { useSavedTrends } from '@/hooks/use-saved-trends';
import { useAlerts } from '@/hooks/use-alerts';
import { toast } from 'sonner';
import type { SavedTrend, Alert } from '@/types/actions';

export default function ActPage() {
  const [selectedTrend, setSelectedTrend] = useState<SavedTrend | null>(null);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [alertForm, setAlertForm] = useState({
    name: '',
    description: '',
    velocityThreshold: 80,
    emailEnabled: true,
    webhookEnabled: false,
    webhookUrl: '',
  });

  const { savedTrends, addTrend, removeTrend } = useSavedTrends();
  const { alerts, addAlert, removeAlert } = useAlerts();

  const handleCreateAlert = () => {
    if (!alertForm.name.trim()) {
      toast.error('Please provide an alert name');
      return;
    }

    const newAlert: Alert = {
      id: Date.now().toString(),
      name: alertForm.name,
      description: alertForm.description,
      trendId: selectedTrend?.id || '',
      trendName: selectedTrend?.name || '',
      velocityThreshold: alertForm.velocityThreshold,
      emailEnabled: alertForm.emailEnabled,
      webhookEnabled: alertForm.webhookEnabled,
      webhookUrl: alertForm.webhookUrl,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    addAlert(newAlert);
    setIsCreateAlertOpen(false);
    setAlertForm({
      name: '',
      description: '',
      velocityThreshold: 80,
      emailEnabled: true,
      webhookEnabled: false,
      webhookUrl: '',
    });
    toast.success('Alert created successfully');
  };

  const mockTrends: SavedTrend[] = [
    {
      id: 'ai-agents',
      name: 'AI Agents',
      description: 'Autonomous AI systems performing complex tasks',
      category: 'Technology',
      velocity: 95,
      savedAt: '2024-01-15T10:30:00Z',
      tags: ['AI', 'Automation', 'Technology'],
      notes: 'High-potential trend with strong market signals',
    },
    {
      id: 'quantum-computing',
      name: 'Quantum Computing',
      description: 'Next-generation computing using quantum mechanics',
      category: 'Technology', 
      velocity: 72,
      savedAt: '2024-01-14T15:45:00Z',
      tags: ['Quantum', 'Computing', 'Research'],
      notes: 'Long-term trend with breakthrough potential',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Act on Insights
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Save trends and set up intelligent alerts for emerging opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="saved" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="saved" className="flex items-center">
            <BookmarkIcon className="mr-2 h-4 w-4" />
            Saved Trends
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Alerts & Monitoring
          </TabsTrigger>
        </TabsList>

        {/* Saved Trends Tab */}
        <TabsContent value="saved" className="mt-6">
          <div className="grid gap-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BookmarkIcon className="h-8 w-8 text-gold-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Saved Trends
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {savedTrends.length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Bell className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Active Alerts
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {alerts.filter(alert => alert.isActive).length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Settings className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Avg. Velocity
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {Math.round(savedTrends.reduce((acc, trend) => acc + trend.velocity, 0) / Math.max(savedTrends.length, 1))}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Saved Trends List */}
            <SavedTrendsList
              trends={mockTrends}
              onRemove={removeTrend}
              onSelect={setSelectedTrend}
            />
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="mt-6">
          <div className="space-y-6">
            {/* Alert Creation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Alert Management</CardTitle>
                    <CardDescription>
                      Create and manage alerts for trend monitoring
                    </CardDescription>
                  </div>
                  <Dialog open={isCreateAlertOpen} onOpenChange={setIsCreateAlertOpen}>
                    <DialogTrigger asChild>
                      <Button className="trenderai-button-primary">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Alert
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Create New Alert</DialogTitle>
                        <DialogDescription>
                          Set up monitoring for trends that match your criteria
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="alert-name">Alert Name</Label>
                          <Input
                            id="alert-name"
                            placeholder="e.g., High Velocity AI Trends"
                            value={alertForm.name}
                            onChange={(e) => setAlertForm({ ...alertForm, name: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="alert-description">Description</Label>
                          <Textarea
                            id="alert-description"
                            placeholder="Describe what this alert monitors..."
                            value={alertForm.description}
                            onChange={(e) => setAlertForm({ ...alertForm, description: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="velocity-threshold">Velocity Threshold</Label>
                          <Input
                            id="velocity-threshold"
                            type="number"
                            min="1"
                            max="100"
                            value={alertForm.velocityThreshold}
                            onChange={(e) => setAlertForm({ ...alertForm, velocityThreshold: parseInt(e.target.value) })}
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="email-alerts"
                              checked={alertForm.emailEnabled}
                              onCheckedChange={(checked) => setAlertForm({ ...alertForm, emailEnabled: checked })}
                            />
                            <Label htmlFor="email-alerts">Email notifications</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="webhook-alerts"
                              checked={alertForm.webhookEnabled}
                              onCheckedChange={(checked) => setAlertForm({ ...alertForm, webhookEnabled: checked })}
                            />
                            <Label htmlFor="webhook-alerts">Webhook notifications</Label>
                          </div>
                          {alertForm.webhookEnabled && (
                            <div className="grid gap-2">
                              <Label htmlFor="webhook-url">Webhook URL</Label>
                              <Input
                                id="webhook-url"
                                placeholder="https://your-webhook.com/endpoint"
                                value={alertForm.webhookUrl}
                                onChange={(e) => setAlertForm({ ...alertForm, webhookUrl: e.target.value })}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsCreateAlertOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="button" onClick={handleCreateAlert}>
                          Create Alert
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
            </Card>

            {/* Active Alerts */}
            <AlertSettings
              alerts={alerts}
              onUpdate={() => {}}
              onDelete={removeAlert}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}