/**
 * UserStatusBadge Component
 * ইউজার স্ট্যাটাস ব্যাজ কম্পোনেন্ট
 */

import React from 'react';
import { Badge } from '../../common/components/Badge';
import { USER_STATUS } from '@vubon/shared-constants';

export interface UserStatusBadgeProps {
  status: string;
  showLabel?: boolean;
  className?: string;
}

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({
  status,
  showLabel = true,
  className = '',
}) => {
  const statusColors: Record<string, string> = {
    [USER_STATUS.ACTIVE]: 'bg-green-100 text-green-800',
    [USER_STATUS.INACTIVE]: 'bg-gray-100 text-gray-600',
    [USER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
    [USER_STATUS.DELETED]: 'bg-red-100 text-red-800',
    [USER_STATUS.SUSPENDED]: 'bg-orange-100 text-orange-800',
    [USER_STATUS.BANNED]: 'bg-red-200 text-red-900',
    [USER_STATUS.VERIFIED]: 'bg-blue-100 text-blue-800',
    [USER_STATUS.UNVERIFIED]: 'bg-gray-100 text-gray-500',
    [USER_STATUS.LOCKED]: 'bg-red-100 text-red-800',
    [USER_STATUS.RESTRICTED]: 'bg-purple-100 text-purple-800',
  };

  const statusLabels: Record<string, string> = {
    [USER_STATUS.ACTIVE]: 'Active',
    [USER_STATUS.INACTIVE]: 'Inactive',
    [USER_STATUS.PENDING]: 'Pending',
    [USER_STATUS.DELETED]: 'Deleted',
    [USER_STATUS.SUSPENDED]: 'Suspended',
    [USER_STATUS.BANNED]: 'Banned',
    [USER_STATUS.VERIFIED]: 'Verified',
    [USER_STATUS.UNVERIFIED]: 'Unverified',
    [USER_STATUS.LOCKED]: 'Locked',
    [USER_STATUS.RESTRICTED]: 'Restricted',
  };

  return (
    <Badge className={`${statusColors[status] || 'bg-gray-100 text-gray-600'} ${className}`}>
      {showLabel ? statusLabels[status] || status : status}
    </Badge>
  );
};
