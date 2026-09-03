/**
 * Auth RoleList Component
 * প্রমীকরণ রোল লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { useAuth } from '@vubon/shared-hooks';
import { AuthEndpoints } from '@vubon/shared-api';
import { AUTH_ROLE } from '@vubon/shared-constants';
import { Card } from '../common/components/Card';

export interface AuthRoleListProps {
  className?: string;
}

export const AuthRoleList: React.FC<AuthRoleListProps> = ({
  className = '',
}) => {
  const authEndpoints = new AuthEndpoints({} as any);
  const { user, isLoading } = useAuth(authEndpoints);

  if (isLoading) {
    return (
      <Card className={`w-full ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-8 rounded bg-gray-100" />
        </div>
      </Card>
    );
  }

  const role = user?.role || 'guest';
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <Card className={`w-full ${className}`}>
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Your Role</h3>

        <div className="flex items-center space-x-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
              role === AUTH_ROLE.SUPER_ADMIN || role === AUTH_ROLE.ADMIN
                ? 'bg-purple-100 text-purple-800'
                : role === AUTH_ROLE.MODERATOR || role === AUTH_ROLE.MANAGER
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {roleLabel}
          </span>
          <span className="text-sm text-gray-500">
            {user?.isVerified ? '✓ Verified' : 'Not Verified'}
          </span>
        </div>

        {user?.isLocked && (
          <div className="rounded-md bg-red-50 p-2 text-sm text-red-600">
            Your account is locked. Please contact support.
          </div>
        )}
      </div>
    </Card>
  );
};
