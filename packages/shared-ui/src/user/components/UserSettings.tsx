/**
 * UserSettings Component
 * ইউজার সেটিংস কম্পোনেন্ট
 */

import React from 'react';
import { Card } from '../../common/components/Card';

export interface UserSettingsProps {
  settings: any;
  onUpdate: (settings: any) => void;
  className?: string;
}

export const UserSettings: React.FC<UserSettingsProps> = ({
  settings,
  onUpdate,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Email Notifications</span>
            <input
              type="checkbox"
              checked={settings?.notifications?.email?.enabled}
              onChange={(e) => {
                onUpdate({
                  ...settings,
                  notifications: {
                    ...settings?.notifications,
                    email: { ...settings?.notifications?.email, enabled: e.target.checked },
                  },
                });
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">SMS Notifications</span>
            <input
              type="checkbox"
              checked={settings?.notifications?.sms?.enabled}
              onChange={(e) => {
                onUpdate({
                  ...settings,
                  notifications: {
                    ...settings?.notifications,
                    sms: { ...settings?.notifications?.sms, enabled: e.target.checked },
                  },
                });
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Push Notifications</span>
            <input
              type="checkbox"
              checked={settings?.notifications?.push?.enabled}
              onChange={(e) => {
                onUpdate({
                  ...settings,
                  notifications: {
                    ...settings?.notifications,
                    push: { ...settings?.notifications?.push, enabled: e.target.checked },
                  },
                });
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Profile Visibility</span>
            <select
              value={settings?.privacy?.profileVisibility || 'public'}
              onChange={(e) => {
                onUpdate({
                  ...settings,
                  privacy: { ...settings?.privacy, profileVisibility: e.target.value },
                });
              }}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="contacts">Contacts</option>
              <option value="friends">Friends</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Share Analytics</span>
            <input
              type="checkbox"
              checked={settings?.privacy?.shareAnalytics}
              onChange={(e) => {
                onUpdate({
                  ...settings,
                  privacy: { ...settings?.privacy, shareAnalytics: e.target.checked },
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
