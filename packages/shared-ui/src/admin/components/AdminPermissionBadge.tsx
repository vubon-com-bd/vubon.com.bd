/**
 * AdminPermissionBadge Component
 * অ্যাডমিন পারমিশন ব্যাজ কম্পোনেন্ট
 */

import React from 'react';
import { Badge } from '../../common/components/Badge';
import { ADMIN_PERMISSIONS } from '@vubon/shared-constants';

export interface AdminPermissionBadgeProps {
  permission: string;
  showLabel?: boolean;
  className?: string;
}

export const AdminPermissionBadge: React.FC<AdminPermissionBadgeProps> = ({
  permission,
  showLabel = true,
  className = '',
}) => {
  const getAction = (perm: string): string => {
    const parts = perm.split('_');
    if (parts.length >= 2) {
      return parts[parts.length - 1].toLowerCase();
    }
    return 'manage';
  };

  const getPermissionColor = (perm: string): string => {
    const action = getAction(perm);
    const colors: Record<string, string> = {
      create: 'bg-green-100 text-green-800',
      read: 'bg-blue-100 text-blue-800',
      update: 'bg-yellow-100 text-yellow-800',
      delete: 'bg-red-100 text-red-800',
      manage: 'bg-purple-100 text-purple-800',
      execute: 'bg-indigo-100 text-indigo-800',
    };
    return colors[action] || 'bg-gray-100 text-gray-600';
  };

  const isValid = permission in ADMIN_PERMISSIONS;

  if (!isValid) {
    return (
      <Badge className={`bg-gray-100 text-gray-500 ${className}`}>
        {showLabel ? permission : 'Unknown'}
      </Badge>
    );
  }

  return (
    <Badge className={`${getPermissionColor(permission)} ${className}`}>
      {showLabel ? permission : permission}
    </Badge>
  );
};
