/**
 * Auth SessionItem Component
 * প্রমীকরণ সেশন আইটেম কম্পোনেন্ট
 */

import React from 'react';
import { AuthSession } from '@vubon/shared-types';
import { AUTH_SESSION } from '@vubon/shared-constants';
import { Button } from '../common/components/Button';

export interface AuthSessionItemProps {
  session: AuthSession;
  onTerminate?: () => void;
}

export const AuthSessionItem: React.FC<AuthSessionItemProps> = ({
  session,
  onTerminate,
}) => {
  // টাইপ অ্যাসার্শন ব্যবহার করে তুলনা করা
  const sessionStatus = session.status as string;
  const isActive = sessionStatus === 'active' || sessionStatus === AUTH_SESSION.STATUS.ACTIVE;

  return (
    <div className="flex items-center justify-between rounded-md bg-gray-50 p-3">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isActive ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
          <span className="text-sm font-medium text-gray-900">
            {session.deviceId || 'Unknown Device'}
          </span>
          {session.ipAddress && (
            <span className="text-xs text-gray-500">({session.ipAddress})</span>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Last active: {new Date(session.lastActivityAt).toLocaleString()}
        </p>
        {session.location && (
          <p className="text-xs text-gray-400">{session.location}</p>
        )}
      </div>
      {isActive && onTerminate && (
        <Button
          variant="outline"
          size="sm"
          onClick={onTerminate}
        >
          Terminate
        </Button>
      )}
    </div>
  );
};
