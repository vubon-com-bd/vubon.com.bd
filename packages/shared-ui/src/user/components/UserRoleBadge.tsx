/**
 * UserRoleBadge Component
 * ইউজার রোল ব্যাজ কম্পোনেন্ট
 */

import React from 'react';
import { Badge } from '../../common/components/Badge';
import { USER_ROLES } from '@vubon/shared-constants';

export interface UserRoleBadgeProps {
  role: string;
  showLabel?: boolean;
  className?: string;
}

export const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({
  role,
  showLabel = true,
  className = '',
}) => {
  const roleColors: Record<string, string> = {
    [USER_ROLES.SUPER_ADMIN]: 'bg-purple-100 text-purple-800',
    [USER_ROLES.ADMIN]: 'bg-blue-100 text-blue-800',
    [USER_ROLES.MODERATOR]: 'bg-cyan-100 text-cyan-800',
    [USER_ROLES.USER]: 'bg-gray-100 text-gray-700',
    [USER_ROLES.VENDOR]: 'bg-green-100 text-green-800',
    [USER_ROLES.GUEST]: 'bg-gray-100 text-gray-500',
    [USER_ROLES.MANAGER]: 'bg-indigo-100 text-indigo-800',
    [USER_ROLES.SUPPORT]: 'bg-yellow-100 text-yellow-800',
    [USER_ROLES.DELIVERY_AGENT]: 'bg-orange-100 text-orange-800',
    [USER_ROLES.CONTRIBUTOR]: 'bg-teal-100 text-teal-800',
    [USER_ROLES.REVIEWER]: 'bg-rose-100 text-rose-800',
    [USER_ROLES.EDITOR]: 'bg-fuchsia-100 text-fuchsia-800',
    [USER_ROLES.AUTHOR]: 'bg-emerald-100 text-emerald-800',
    [USER_ROLES.SUBSCRIBER]: 'bg-gray-100 text-gray-600',
  };

  const roleLabels: Record<string, string> = {
    [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
    [USER_ROLES.ADMIN]: 'Admin',
    [USER_ROLES.MODERATOR]: 'Moderator',
    [USER_ROLES.USER]: 'User',
    [USER_ROLES.VENDOR]: 'Vendor',
    [USER_ROLES.GUEST]: 'Guest',
    [USER_ROLES.MANAGER]: 'Manager',
    [USER_ROLES.SUPPORT]: 'Support',
    [USER_ROLES.DELIVERY_AGENT]: 'Delivery Agent',
    [USER_ROLES.CONTRIBUTOR]: 'Contributor',
    [USER_ROLES.REVIEWER]: 'Reviewer',
    [USER_ROLES.EDITOR]: 'Editor',
    [USER_ROLES.AUTHOR]: 'Author',
    [USER_ROLES.SUBSCRIBER]: 'Subscriber',
  };

  return (
    <Badge className={`${roleColors[role] || 'bg-gray-100 text-gray-600'} ${className}`}>
      {showLabel ? roleLabels[role] || role : role}
    </Badge>
  );
};
