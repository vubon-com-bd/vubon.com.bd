/**
 * Auth DeviceItem Component
 * প্রমীকরণ ডিভাইস আইটেম কম্পোনেন্ট
 */

import React from 'react';
import { AuthDevice } from '@vubon/shared-types';
import { AUTH_DEVICE } from '@vubon/shared-constants';
import { Button } from '../common/components/Button';

export interface AuthDeviceItemProps {
  device: AuthDevice;
  onTrust?: () => void;
  onRemove?: () => void;
}

export const AuthDeviceItem: React.FC<AuthDeviceItemProps> = ({
  device,
  onTrust,
  onRemove,
}) => {
  const isTrusted = device.status === AUTH_DEVICE.STATUS.TRUSTED;

  return (
    <div className="flex items-center justify-between rounded-md bg-gray-50 p-3">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">
            {device.name || 'Unknown Device'}
          </span>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
              isTrusted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {device.status}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Type: {device.type} • Platform: {device.platform}
        </p>
        <p className="text-xs text-gray-500">
          Last active: {new Date(device.lastActiveAt).toLocaleString()}
        </p>
        {device.location && (
          <p className="text-xs text-gray-400">{device.location}</p>
        )}
      </div>
      <div className="flex space-x-2">
        {!isTrusted && onTrust && (
          <Button variant="outline" size="sm" onClick={onTrust}>
            Trust
          </Button>
        )}
        {onRemove && (
          <Button variant="outline" size="sm" onClick={onRemove}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};
