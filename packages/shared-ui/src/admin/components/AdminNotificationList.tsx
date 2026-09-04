/**
 * AdminNotificationList Component
 * অ্যাডমিন নোটিফিকেশন লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { AdminNotification } from '@vubon/shared-types';
import { ADMIN_NOTIFICATION } from '@vubon/shared-constants';
import { Card } from '../../common/components/Card';

export interface AdminNotificationListProps {
  notifications: AdminNotification[];
  onMarkAsRead?: (notificationId: string) => void;
  onDelete?: (notificationId: string) => void;
  className?: string;
  maxItems?: number;
}

export const AdminNotificationList: React.FC<AdminNotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onDelete,
  className = '',
  maxItems = 10,
}) => {
  const displayNotifications = notifications.slice(0, maxItems);

  if (displayNotifications.length === 0) {
    return <p className="text-gray-500">No notifications found.</p>;
  }

  const priorityColors: Record<string, string> = {
    [ADMIN_NOTIFICATION.PRIORITIES.LOW]: 'border-gray-200',
    [ADMIN_NOTIFICATION.PRIORITIES.MEDIUM]: 'border-blue-200 bg-blue-50',
    [ADMIN_NOTIFICATION.PRIORITIES.HIGH]: 'border-yellow-200 bg-yellow-50',
    [ADMIN_NOTIFICATION.PRIORITIES.URGENT]: 'border-orange-200 bg-orange-50',
    [ADMIN_NOTIFICATION.PRIORITIES.CRITICAL]: 'border-red-200 bg-red-50',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {displayNotifications.map((notification) => (
        <Card
          key={notification.id}
          className={`border-l-4 p-3 ${priorityColors[notification.priority] || 'border-gray-200'}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                {notification.status !== ADMIN_NOTIFICATION.STATUS.READ && (
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                )}
              </div>
              <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-2">
              {notification.status !== ADMIN_NOTIFICATION.STATUS.READ && onMarkAsRead && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Mark as read
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(notification.id)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </Card>
      ))}
      {notifications.length > maxItems && (
        <p className="text-sm text-gray-500">
          Showing {maxItems} of {notifications.length} notifications
        </p>
      )}
    </div>
  );
};
