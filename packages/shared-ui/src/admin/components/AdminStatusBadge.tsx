/**
 * AdminStatusBadge Component
 * অ্যাডমিন স্ট্যাটাস ব্যাজ কম্পোনেন্ট
 */

import React from 'react';
import { Badge } from '../../common/components/Badge';
import { ADMIN_STATUS } from '@vubon/shared-constants';

export interface AdminStatusBadgeProps {
  status: string;
  showLabel?: boolean;
  className?: string;
}

export const AdminStatusBadge: React.FC<AdminStatusBadgeProps> = ({
  status,
  showLabel = true,
  className = '',
}) => {
  const statusColors: Record<string, string> = {
    [ADMIN_STATUS.ACTIVE]: 'bg-green-100 text-green-800',
    [ADMIN_STATUS.INACTIVE]: 'bg-gray-100 text-gray-600',
    [ADMIN_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
    [ADMIN_STATUS.DELETED]: 'bg-red-100 text-red-800',
    [ADMIN_STATUS.SUSPENDED]: 'bg-orange-100 text-orange-800',
    [ADMIN_STATUS.BANNED]: 'bg-red-200 text-red-900',
    [ADMIN_STATUS.VERIFIED]: 'bg-blue-100 text-blue-800',
    [ADMIN_STATUS.UNVERIFIED]: 'bg-gray-100 text-gray-500',
    [ADMIN_STATUS.LOCKED]: 'bg-red-100 text-red-800',
    [ADMIN_STATUS.RESTRICTED]: 'bg-purple-100 text-purple-800',
  };

  const statusLabels: Record<string, string> = {
    [ADMIN_STATUS.ACTIVE]: 'Active',
    [ADMIN_STATUS.INACTIVE]: 'Inactive',
    [ADMIN_STATUS.PENDING]: 'Pending',
    [ADMIN_STATUS.DELETED]: 'Deleted',
    [ADMIN_STATUS.SUSPENDED]: 'Suspended',
    [ADMIN_STATUS.BANNED]: 'Banned',
    [ADMIN_STATUS.VERIFIED]: 'Verified',
    [ADMIN_STATUS.UNVERIFIED]: 'Unverified',
    [ADMIN_STATUS.LOCKED]: 'Locked',
    [ADMIN_STATUS.RESTRICTED]: 'Restricted',
  };

  return (
    <Badge className={`${statusColors[status] || 'bg-gray-100 text-gray-600'} ${className}`}>
      {showLabel ? statusLabels[status] || status : status}
    </Badge>
  );
};
