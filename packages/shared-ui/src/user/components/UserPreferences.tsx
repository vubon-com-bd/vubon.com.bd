/**
 * UserPreferences Component
 * ইউজার প্রেফারেন্স কম্পোনেন্ট
 */

import React from 'react';
import { Card } from '../../common/components/Card';

export interface UserPreferencesProps {
  preferences: any;
  onUpdate: (preferences: any) => void;
  className?: string;
}

export const UserPreferences: React.FC<UserPreferencesProps> = ({
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
              value={preferences?.ui?.theme || 'light'}
              onChange={(e) => {
                onUpdate({
                  ...preferences,
                  ui: { ...preferences?.ui, theme: e.target.value },
                });
              }}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Language</span>
            <select
              value={preferences?.content?.language || 'bn'}
              onChange={(e) => {
                onUpdate({
                  ...preferences,
                  content: { ...preferences?.content, language: e.target.value },
                });
              }}
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
              checked={preferences?.ui?.compact}
              onChange={(e) => {
                onUpdate({
                  ...preferences,
                  ui: { ...preferences?.ui, compact: e.target.checked },
                });
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Font Size</span>
            <select
              value={preferences?.accessibility?.fontSize || 'medium'}
              onChange={(e) => {
                onUpdate({
                  ...preferences,
                  accessibility: { ...preferences?.accessibility, fontSize: e.target.value },
                });
              }}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="x-large">Extra Large</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">High Contrast</span>
            <input
              type="checkbox"
              checked={preferences?.accessibility?.highContrast}
              onChange={(e) => {
                onUpdate({
                  ...preferences,
                  accessibility: { ...preferences?.accessibility, highContrast: e.target.checked },
                });
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Reduced Motion</span>
            <input
              type="checkbox"
              checked={preferences?.accessibility?.reducedMotion}
              onChange={(e) => {
                onUpdate({
                  ...preferences,
                  accessibility: { ...preferences?.accessibility, reducedMotion: e.target.checked },
                });
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
