/**
 * AdminSettings Component
 * অ্যাডমিন সেটিংস কম্পোনেন্ট
 */

import React from 'react';
import { Card } from '../../common/components/Card';

export interface AdminSettingsProps {
  settings: any[];
  onUpdate: (settings: any[]) => void;
  className?: string;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  settings,
  onUpdate,
  className = '',
}) => {
  const handleChange = (index: number, value: any) => {
    const newSettings = [...settings];
    newSettings[index] = { ...newSettings[index], value };
    onUpdate(newSettings);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {settings.map((setting, index) => (
        <Card key={setting.id || index} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{setting.key}</h3>
              <p className="text-sm text-gray-500">{setting.description}</p>
            </div>
            <div>
              {setting.type === 'boolean' ? (
                <input
                  type="checkbox"
                  checked={setting.value}
                  onChange={(e) => handleChange(index, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              ) : setting.type === 'number' ? (
                <input
                  type="number"
                  value={setting.value}
                  onChange={(e) => handleChange(index, Number(e.target.value))}
                  className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type="text"
                  value={setting.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
