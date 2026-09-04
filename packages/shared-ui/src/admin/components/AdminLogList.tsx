/**
 * AdminLogList Component
 * অ্যাডমিন লগ লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { AdminLog } from '@vubon/shared-types';
import { ADMIN_LOG } from '@vubon/shared-constants';

export interface AdminLogListProps {
  logs: AdminLog[];
  className?: string;
  maxItems?: number;
}

export const AdminLogList: React.FC<AdminLogListProps> = ({
  logs,
  className = '',
  maxItems = 10,
}) => {
  const displayLogs = logs.slice(0, maxItems);

  if (displayLogs.length === 0) {
    return <p className="text-gray-500">No logs found.</p>;
  }

  const levelColors: Record<string, string> = {
    [ADMIN_LOG.LEVELS.DEBUG]: 'text-gray-400',
    [ADMIN_LOG.LEVELS.INFO]: 'text-blue-600',
    [ADMIN_LOG.LEVELS.WARN]: 'text-yellow-600',
    [ADMIN_LOG.LEVELS.ERROR]: 'text-red-600',
    [ADMIN_LOG.LEVELS.CRITICAL]: 'text-red-800 font-bold',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {displayLogs.map((log) => (
        <div
          key={log.id}
          className="rounded-lg border border-gray-100 p-3"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className={`font-medium ${levelColors[log.level] || 'text-gray-600'}`}>
                  [{log.level.toUpperCase()}]
                </span>
                <span className="text-sm text-gray-500">{log.category}</span>
              </div>
              <p className="mt-1 text-sm text-gray-800">{log.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
      {logs.length > maxItems && (
        <p className="text-sm text-gray-500">
          Showing {maxItems} of {logs.length} logs
        </p>
      )}
    </div>
  );
};
