/**
 * Auth SessionList Component
 * প্রমীকরণ সেশন লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { useSessions } from '@vubon/shared-hooks';
import { AuthSessionEndpoints } from '@vubon/shared-api';
import { AUTH_SESSION } from '@vubon/shared-constants';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthSessionListProps {
  className?: string;
}

export const AuthSessionList: React.FC<AuthSessionListProps> = ({
  className = '',
}) => {
  const sessionEndpoints = new AuthSessionEndpoints({} as any);
  const { sessions, isLoading, refetch } = useSessions(sessionEndpoints);

  const handleTerminate = async (sessionId: string) => {
    await sessionEndpoints.terminateSession(sessionId);
    refetch();
  };

  const handleTerminateAll = async () => {
    await sessionEndpoints.terminateAllSessions();
    refetch();
  };

  // Check if session is active (টাইপ অ্যাসার্শন ব্যবহার করে)
  const isSessionActive = (status: string): boolean => {
    return status === 'active' || status === AUTH_SESSION.STATUS.ACTIVE;
  };

  if (isLoading) {
    return (
      <Card className={`w-full ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
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
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Active Sessions</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleTerminateAll}
          >
            Terminate All
          </Button>
        </div>

        {sessions && sessions.length > 0 ? (
          <div className="space-y-2">
            {sessions.map((session) => {
              const isActive = isSessionActive(session.status);
              return (
                <div
                  key={session.id}
                  className="flex items-center justify-between rounded-md bg-gray-50 p-3"
                >
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
                    </div>
                    <p className="text-xs text-gray-500">
                      Last active: {new Date(session.lastActivityAt).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTerminate(session.id)}
                    disabled={!isActive}
                  >
                    Terminate
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No active sessions found.</p>
        )}
      </div>
    </Card>
  );
};
