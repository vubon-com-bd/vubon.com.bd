/**
 * AdminRoleBadge Component
 * অ্যাডমিন রোল ব্যাজ কম্পোনেন্ট
 */

import React from 'react';
import { Badge } from '../../common/components/Badge';
import { ADMIN_ROLES } from '@vubon/shared-constants';

export interface AdminRoleBadgeProps {
  role: string;
  showLabel?: boolean;
  className?: string;
}

export const AdminRoleBadge: React.FC<AdminRoleBadgeProps> = ({
  role,
  showLabel = true,
  className = '',
}) => {
  const roleColors: Record<string, string> = {
    [ADMIN_ROLES.SUPER_ADMIN]: 'bg-purple-100 text-purple-800',
    [ADMIN_ROLES.SYSTEM_ADMIN]: 'bg-indigo-100 text-indigo-800',
    [ADMIN_ROLES.ADMIN]: 'bg-blue-100 text-blue-800',
    [ADMIN_ROLES.AUTH_ADMIN]: 'bg-cyan-100 text-cyan-800',
    [ADMIN_ROLES.FINANCE_ADMIN]: 'bg-emerald-100 text-emerald-800',
    [ADMIN_ROLES.MANAGER]: 'bg-slate-100 text-slate-800',
    [ADMIN_ROLES.AUTH_SERVICE]: 'bg-teal-100 text-teal-800',
    [ADMIN_ROLES.AUTH_MANAGER]: 'bg-sky-100 text-sky-800',
    [ADMIN_ROLES.CONTENT_ADMIN]: 'bg-amber-100 text-amber-800',
    [ADMIN_ROLES.USER_ADMIN]: 'bg-lime-100 text-lime-800',
    [ADMIN_ROLES.REPORT_ADMIN]: 'bg-rose-100 text-rose-800',
    [ADMIN_ROLES.SETTINGS_ADMIN]: 'bg-fuchsia-100 text-fuchsia-800',
    [ADMIN_ROLES.MODERATOR]: 'bg-gray-100 text-gray-700',
    [ADMIN_ROLES.SUPPORT]: 'bg-yellow-100 text-yellow-800',
    [ADMIN_ROLES.AUTH_SUPPORT]: 'bg-orange-100 text-orange-800',
  };

  const roleLabels: Record<string, string> = {
    [ADMIN_ROLES.SUPER_ADMIN]: 'Super Admin',
    [ADMIN_ROLES.SYSTEM_ADMIN]: 'System Admin',
    [ADMIN_ROLES.ADMIN]: 'Admin',
    [ADMIN_ROLES.AUTH_ADMIN]: 'Auth Admin',
    [ADMIN_ROLES.FINANCE_ADMIN]: 'Finance Admin',
    [ADMIN_ROLES.MANAGER]: 'Manager',
    [ADMIN_ROLES.AUTH_SERVICE]: 'Auth Service',
    [ADMIN_ROLES.AUTH_MANAGER]: 'Auth Manager',
    [ADMIN_ROLES.CONTENT_ADMIN]: 'Content Admin',
    [ADMIN_ROLES.USER_ADMIN]: 'User Admin',
    [ADMIN_ROLES.REPORT_ADMIN]: 'Report Admin',
    [ADMIN_ROLES.SETTINGS_ADMIN]: 'Settings Admin',
    [ADMIN_ROLES.MODERATOR]: 'Moderator',
    [ADMIN_ROLES.SUPPORT]: 'Support',
    [ADMIN_ROLES.AUTH_SUPPORT]: 'Auth Support',
  };

  return (
    <Badge className={`${roleColors[role] || 'bg-gray-100 text-gray-600'} ${className}`}>
      {showLabel ? roleLabels[role] || role : role}
    </Badge>
  );
};
