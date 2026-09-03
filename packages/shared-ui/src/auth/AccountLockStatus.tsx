/**
 * Auth AccountLockStatus Component
 * প্রমীকরণ অ্যাকাউন্ট লক স্ট্যাটাস কম্পোনেন্ট
 */

import React from 'react';
import { useAccountLockStatus } from '@vubon/shared-hooks';
import { AuthAccountLockEndpoints } from '@vubon/shared-api';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthAccountLockStatusProps {
  className?: string;
}

export const AuthAccountLockStatus: React.FC<AuthAccountLockStatusProps> = ({
  className = '',
}) => {
  const lockEndpoints = new AuthAccountLockEndpoints({} as any);
  const { status, refetch, isLocked, remainingAttempts, unlockAt } = useAccountLockStatus(lockEndpoints);

  if (!status) return null;

  return (
    <Card className={`w-full ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Account Status</h3>
            <p className="text-sm text-gray-500">
              {isLocked ? 'Your account is currently locked' : 'Your account is active'}
            </p>
          </div>
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
              isLocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {isLocked ? 'Locked' : 'Active'}
          </span>
        </div>

        {!isLocked && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Remaining Attempts</span>
            <span className="text-sm font-medium text-gray-900">{remainingAttempts}</span>
          </div>
        )}

        {isLocked && unlockAt && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Unlock Time</span>
            <span className="text-sm font-medium text-gray-900">
              {new Date(unlockAt).toLocaleString()}
            </span>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
        >
          Refresh Status
        </Button>
      </div>
    </Card>
  );
};
