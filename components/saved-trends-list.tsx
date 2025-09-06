'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookmarkIcon, Trash2, Edit, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import type { SavedTrend } from '@/types/actions';

interface SavedTrendsListProps {
  trends: SavedTrend[];
  onRemove: (id: string) => void;
  onSelect: (trend: SavedTrend) => void;
}

export function SavedTrendsList({ trends, onRemove, onSelect }: SavedTrendsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');

  const handleEditStart = (trend: SavedTrend) => {
    setEditingId(trend.id);
    setEditNotes(trend.notes || '');
  };

  const handleEditSave = (trend: SavedTrend) => {
    // In a real app, this would update the trend notes
    setEditingId(null);
  };

  const getVelocityColor = (velocity: number) => {
    if (velocity >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (velocity >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (trends.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <BookmarkIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No saved trends</h3>
          <p className="mt-2 text-gray-500">
            Save trends from the Discover page to track them here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {trends.map((trend) => (
        <Card key={trend.id} className="trenderai-card">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-gold-500" />
                  {trend.name}
                </CardTitle>
                <CardDescription className="mt-1">
                  {trend.description}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Badge className={`border ${getVelocityColor(trend.velocity)}`}>
                  Velocity: {trend.velocity}
                </Badge>
                <Badge variant="outline">
                  {trend.category}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {trend.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Notes Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Notes</label>
                {editingId !== trend.id && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditStart(trend)}
                    className="h-8 px-2"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              {editingId === trend.id ? (
                <div className="space-y-2">
                  <Textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Add notes about this trend..."
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleEditSave(trend)}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md min-h-[60px]">
                  {trend.notes || 'No notes added yet.'}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="text-xs text-gray-500">
                Saved on {new Date(trend.savedAt).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSelect(trend)}
                  className="hover:bg-gold-50 hover:border-gold-300"
                >
                  Create Alert
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRemove(trend.id)}
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