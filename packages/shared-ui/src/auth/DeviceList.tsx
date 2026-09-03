/**
 * Auth DeviceList Component
 * প্রমীকরণ ডিভাইস লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { useDevices } from '@vubon/shared-hooks';
import { AuthDeviceEndpoints } from '@vubon/shared-api';
import { AUTH_DEVICE } from '@vubon/shared-constants';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthDeviceListProps {
  className?: string;
}

export const AuthDeviceList: React.FC<AuthDeviceListProps> = ({
  className = '',
}) => {
  const deviceEndpoints = new AuthDeviceEndpoints({} as any);
  const { devices, isLoading, refetch } = useDevices(deviceEndpoints);

  const handleDelete = async (deviceId: string) => {
    await deviceEndpoints.deleteDevice(deviceId);
    refetch();
  };

  const handleTrust = async (deviceId: string) => {
    await deviceEndpoints.trustDevice(deviceId);
    refetch();
  };

  if (isLoading) {
    return (
      <Card className={`w-full ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-16 rounded bg-gray-100" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Trusted Devices</h3>

        {devices && devices.length > 0 ? (
          <div className="space-y-2">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between rounded-md bg-gray-50 p-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {device.name || 'Unknown Device'}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        device.status === AUTH_DEVICE.STATUS.TRUSTED
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {device.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Last active: {new Date(device.lastActiveAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {device.status !== AUTH_DEVICE.STATUS.TRUSTED && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTrust(device.id)}
                    >
                      Trust
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(device.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No devices found.</p>
        )}
      </div>
    </Card>
  );
};
