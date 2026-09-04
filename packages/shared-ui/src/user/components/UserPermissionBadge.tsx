/**
 * UserPermissionBadge Component
 * ইউজার পারমিশন ব্যাজ কম্পোনেন্ট
 */

import React from 'react';
import { Badge } from '../../common/components/Badge';
import { USER_PERMISSIONS } from '@vubon/shared-constants';

export interface UserPermissionBadgeProps {
  permission: string;
  showLabel?: boolean;
  className?: string;
}

export const UserPermissionBadge: React.FC<UserPermissionBadgeProps> = ({
  permission,
  showLabel = true,
  className = '',
}) => {
  // Extract resource and action from permission
  const getResource = (perm: string): string => {
    const parts = perm.split('_');
    if (parts.length >= 2) {
      return parts.slice(0, -1).join('_').toLowerCase();
    }
    return perm.toLowerCase();
  };

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

  // Check if permission exists in constants
  const isValidPermission = permission in USER_PERMISSIONS;

  if (!isValidPermission) {
    return (
      <Badge className={`bg-gray-100 text-gray-500 ${className}`}>
        {showLabel ? permission : 'Unknown'}
      </Badge>
    );
  }

  const resource = getResource(permission);
  const action = getAction(permission);
  const colorClass = getPermissionColor(permission);

  const displayLabel = showLabel
    ? `${resource.charAt(0).toUpperCase() + resource.slice(1)} ${action.charAt(0).toUpperCase() + action.slice(1)}`
    : permission;

  return (
    <Badge className={`${colorClass} ${className}`}>
      {displayLabel}
    </Badge>
  );
};
