/**
 * AdminPreferences Component
 * অ্যাডমিন প্রেফারেন্স কম্পোনেন্ট
 */

import React from 'react';
import { Card } from '../../common/components/Card';
import { ADMIN_PREFERENCES } from '@vubon/shared-constants';

export interface AdminPreferencesProps {
  preferences: any;
  onUpdate: (preferences: any) => void;
  className?: string;
}

export const AdminPreferences: React.FC<AdminPreferencesProps> = ({
  preferences,
  onUpdate,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">Display Preferences</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Theme</span>
            <select
              value={preferences?.theme || 'light'}
              onChange={(e) => onUpdate({ ...preferences, theme: e.target.value })}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Layout</span>
            <select
              value={preferences?.layout || 'sidebar'}
              onChange={(e) => onUpdate({ ...preferences, layout: e.target.value })}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sidebar">Sidebar</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="compact">Compact</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Language</span>
            <select
              value={preferences?.language || 'bn'}
              onChange={(e) => onUpdate({ ...preferences, language: e.target.value })}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bn">Bangla</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Compact Mode</span>
            <input
              type="checkbox"
              checked={preferences?.compactMode}
              onChange={(e) => onUpdate({ ...preferences, compactMode: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Reduced Motion</span>
            <input
              type="checkbox"
              checked={preferences?.reducedMotion}
              onChange={(e) => onUpdate({ ...preferences, reducedMotion: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">High Contrast</span>
            <input
              type="checkbox"
              checked={preferences?.highContrast}
              onChange={(e) => onUpdate({ ...preferences, highContrast: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
