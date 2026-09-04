/**
 * AdminSessionList Component
 * অ্যাডমিন সেশন লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { AdminSession } from '@vubon/shared-types';
import { ADMIN_SESSION } from '@vubon/shared-constants';
import { Button } from '../../common/components/Button';
import { Card } from '../../common/components/Card';

export interface AdminSessionListProps {
  sessions: AdminSession[];
  onTerminate?: (sessionId: string) => void;
  onTerminateAll?: () => void;
  className?: string;
}

export const AdminSessionList: React.FC<AdminSessionListProps> = ({
  sessions,
  onTerminate,
  onTerminateAll,
  className = '',
}) => {
  if (sessions.length === 0) {
    return <p className="text-gray-500">No active sessions found.</p>;
  }

  const isSessionActive = (status: string): boolean => {
    return status === 'active' || status === ADMIN_SESSION.STATUS.ACTIVE;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Active Sessions</h3>
        {onTerminateAll && (
          <Button variant="outline" size="sm" onClick={onTerminateAll}>
            Terminate All
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {sessions.map((session) => {
          const isActive = isSessionActive(session.status);
          return (
            <Card key={session.id} className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        isActive ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {session.deviceId || 'Unknown Device'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Last active: {new Date(session.lastActivityAt).toLocaleString()}
                  </p>
                  {session.ipAddress && (
                    <p className="text-xs text-gray-400">IP: {session.ipAddress}</p>
                  )}
                </div>
                {isActive && onTerminate && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTerminate(session.id)}
                  >
                    Terminate
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
