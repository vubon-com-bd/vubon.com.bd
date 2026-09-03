/**
 * Auth PermissionList Component
 * প্রমীকরণ পারমিশন লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { usePermissions } from '@vubon/shared-hooks';
import { AuthPermissionEndpoints } from '@vubon/shared-api';
import { Card } from '../common/components/Card';

export interface AuthPermissionListProps {
  className?: string;
}

export const AuthPermissionList: React.FC<AuthPermissionListProps> = ({
  className = '',
}) => {
  const permissionEndpoints = new AuthPermissionEndpoints({} as any);
  const { permissions, isLoading } = usePermissions(permissionEndpoints);

  if (isLoading) {
    return (
      <Card className={`w-full ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 rounded bg-gray-100" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Your Permissions</h3>

        {permissions && permissions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {permissions.map((permission) => (
              <span
                key={permission}
                className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
              >
                {permission}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No permissions found.</p>
        )}
      </div>
    </Card>
  );
};
