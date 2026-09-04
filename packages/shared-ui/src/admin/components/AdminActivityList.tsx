/**
 * AdminActivityList Component
 * অ্যাডমিন অ্যাক্টিভিটি লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { AdminActivity } from '@vubon/shared-types';
import { ADMIN_ACTIVITY } from '@vubon/shared-constants';

export interface AdminActivityListProps {
  activities: AdminActivity[];
  className?: string;
  maxItems?: number;
}

export const AdminActivityList: React.FC<AdminActivityListProps> = ({
  activities,
  className = '',
  maxItems = 10,
}) => {
  const displayActivities = activities.slice(0, maxItems);

  if (displayActivities.length === 0) {
    return <p className="text-gray-500">No activities found.</p>;
  }

  const statusColors: Record<string, string> = {
    [ADMIN_ACTIVITY.STATUS.SUCCESS]: 'text-green-600',
    [ADMIN_ACTIVITY.STATUS.FAILED]: 'text-red-600',
    [ADMIN_ACTIVITY.STATUS.PENDING]: 'text-yellow-600',
    [ADMIN_ACTIVITY.STATUS.IN_PROGRESS]: 'text-blue-600',
    [ADMIN_ACTIVITY.STATUS.CANCELLED]: 'text-gray-400',
  };

  const importanceColors: Record<string, string> = {
    [ADMIN_ACTIVITY.IMPORTANCE.LOW]: 'bg-gray-100 text-gray-600',
    [ADMIN_ACTIVITY.IMPORTANCE.MEDIUM]: 'bg-blue-100 text-blue-600',
    [ADMIN_ACTIVITY.IMPORTANCE.HIGH]: 'bg-yellow-100 text-yellow-700',
    [ADMIN_ACTIVITY.IMPORTANCE.CRITICAL]: 'bg-red-100 text-red-700',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {displayActivities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
        >
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </span>
              <span className={`text-xs font-medium ${statusColors[activity.status] || 'text-gray-500'}`}>
                {activity.status.toUpperCase()}
              </span>
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs ${importanceColors[activity.importance] || 'bg-gray-100 text-gray-600'}`}
              >
                {activity.importance}
              </span>
            </div>
            {activity.description && (
              <p className="text-sm text-gray-600">{activity.description}</p>
            )}
            <p className="text-xs text-gray-400">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
      {activities.length > maxItems && (
        <p className="text-sm text-gray-500">
          Showing {maxItems} of {activities.length} activities
        </p>
      )}
    </div>
  );
};
