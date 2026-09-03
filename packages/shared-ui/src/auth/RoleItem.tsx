/**
 * Auth RoleItem Component
 * প্রমীকরণ রোল আইটেম কম্পোনেন্ট
 */

import React from 'react';

export interface AuthRoleItemProps {
  name: string;
  description?: string;
  isActive?: boolean;
  permissions?: string[];
}

export const AuthRoleItem: React.FC<AuthRoleItemProps> = ({
  name,
  description,
  isActive = true,
  permissions = [],
}) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-50 p-3">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">{name}</span>
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isActive ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
        </div>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
        {permissions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {permissions.slice(0, 3).map((perm) => (
              <span
                key={perm}
                className="inline-flex rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600"
              >
                {perm}
              </span>
            ))}
            {permissions.length > 3 && (
              <span className="text-xs text-gray-400">
                +{permissions.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
