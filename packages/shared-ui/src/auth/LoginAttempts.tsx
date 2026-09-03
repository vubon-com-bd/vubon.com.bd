/**
 * Auth LoginAttempts Component
 * প্রমীকরণ লগইন Attempts কম্পোনেন্ট
 */

import React from 'react';
import { useLoginAttempts } from '@vubon/shared-hooks';
import { AuthLoginAttemptEndpoints } from '@vubon/shared-api';
import { Card } from '../common/components/Card';

export interface AuthLoginAttemptsProps {
  className?: string;
}

export const AuthLoginAttempts: React.FC<AuthLoginAttemptsProps> = ({
  className = '',
}) => {
  const attemptEndpoints = new AuthLoginAttemptEndpoints({} as any);
  const { stats, history, isLoading } = useLoginAttempts(attemptEndpoints);

  if (isLoading) {
    return (
      <Card className={`w-full ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-1/2 rounded bg-gray-200" />
          <div className="h-20 rounded bg-gray-200" />
        </div>
      </Card>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Login Attempts</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-md bg-gray-50 p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{stats?.failedAttempts || 0}</p>
            <p className="text-xs text-gray-500">Failed Attempts</p>
          </div>
          <div className="rounded-md bg-gray-50 p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{stats?.remainingAttempts || 0}</p>
            <p className="text-xs text-gray-500">Remaining Attempts</p>
          </div>
        </div>

        {history && history.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700">Recent History</h4>
            <div className="mt-2 space-y-1">
              {history.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm"
                >
                  <span className="text-gray-600">
                    {new Date(item.attemptedAt).toLocaleString()}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      item.success ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.success ? 'Success' : 'Failed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
