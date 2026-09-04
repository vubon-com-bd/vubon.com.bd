/**
 * AdminDeviceList Component
 * অ্যাডমিন ডিভাইস লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { AdminDevice } from '@vubon/shared-types';
import { ADMIN_DEVICE } from '@vubon/shared-constants';
import { Button } from '../../common/components/Button';
import { Card } from '../../common/components/Card';

export interface AdminDeviceListProps {
  devices: AdminDevice[];
  onTrust?: (deviceId: string) => void;
  onRemove?: (deviceId: string) => void;
  className?: string;
}

export const AdminDeviceList: React.FC<AdminDeviceListProps> = ({
  devices,
  onTrust,
  onRemove,
  className = '',
}) => {
  if (devices.length === 0) {
    return <p className="text-gray-500">No devices found.</p>;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {devices.map((device) => (
        <Card key={device.id} className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  {device.name || 'Unknown Device'}
                </span>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    device.status === ADMIN_DEVICE.STATUS.TRUSTED
                      ? 'bg-green-100 text-green-800'
                      : device.status === ADMIN_DEVICE.STATUS.BLOCKED
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {device.status}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Type: {device.type} • Last active: {new Date(device.lastActiveAt).toLocaleString()}
              </p>
              {device.ipAddress && (
                <p className="text-xs text-gray-400">IP: {device.ipAddress}</p>
              )}
            </div>
            <div className="flex space-x-2">
              {device.status !== ADMIN_DEVICE.STATUS.TRUSTED && onTrust && (
                <Button variant="outline" size="sm" onClick={() => onTrust(device.id)}>
                  Trust
                </Button>
              )}
              {onRemove && (
                <Button variant="outline" size="sm" onClick={() => onRemove(device.id)}>
                  Remove
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
