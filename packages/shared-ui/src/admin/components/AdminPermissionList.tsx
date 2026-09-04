/**
 * AdminPermissionList Component
 * অ্যাডমিন পারমিশন লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { AdminPermission } from '@vubon/shared-types';
import { Card } from '../../common/components/Card';
import { AdminPermissionBadge } from './AdminPermissionBadge';

export interface AdminPermissionListProps {
  permissions: AdminPermission[];
  onEdit?: (permission: AdminPermission) => void;
  onDelete?: (permissionId: string) => void;
  className?: string;
}

export const AdminPermissionList: React.FC<AdminPermissionListProps> = ({
  permissions,
  onEdit,
  onDelete,
  className = '',
}) => {
  if (permissions.length === 0) {
    return <p className="text-gray-500">No permissions found.</p>;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {permissions.map((permission) => (
        <Card key={permission.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <AdminPermissionBadge permission={permission.name} />
              <p className="mt-1 text-sm text-gray-600">
                Resource: {permission.resource} • Action: {permission.action}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {permission.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(permission)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(permission.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
