/**
 * Auth PermissionItem Component
 * প্রমীকরণ পারমিশন আইটেম কম্পোনেন্ট
 */

import React from 'react';

export interface AuthPermissionItemProps {
  permission: string;
  description?: string;
  resource?: string;
  action?: string;
}

export const AuthPermissionItem: React.FC<AuthPermissionItemProps> = ({
  permission,
  description,
  resource,
  action,
}) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-50 p-3">
      <div className="space-y-1">
        <span className="text-sm font-medium text-gray-900">{permission}</span>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
      <div className="flex space-x-2">
        {resource && (
          <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {resource}
          </span>
        )}
        {action && (
          <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
            {action}
          </span>
        )}
      </div>
    </div>
  );
};
