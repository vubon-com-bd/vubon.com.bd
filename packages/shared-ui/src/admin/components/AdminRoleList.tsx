/**
 * AdminRoleList Component
 * অ্যাডমিন রোল লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { AdminRole } from '@vubon/shared-types';
import { Card } from '../../common/components/Card';
import { AdminRoleBadge } from './AdminRoleBadge';

export interface AdminRoleListProps {
  roles: AdminRole[];
  onEdit?: (role: AdminRole) => void;
  onDelete?: (roleId: string) => void;
  className?: string;
}

export const AdminRoleList: React.FC<AdminRoleListProps> = ({
  roles,
  onEdit,
  onDelete,
  className = '',
}) => {
  if (roles.length === 0) {
    return <p className="text-gray-500">No roles found.</p>;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {roles.map((role) => (
        <Card key={role.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <AdminRoleBadge role={role.name} />
                {role.isSystem && (
                  <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    System
                  </span>
                )}
                {role.isDefault && (
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                    Default
                  </span>
                )}
              </div>
              {role.description && (
                <p className="mt-1 text-sm text-gray-600">{role.description}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Hierarchy: {role.hierarchy} • {role.permissions.length} permissions
              </p>
            </div>
            <div className="flex space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(role)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
              )}
              {onDelete && !role.isSystem && (
                <button
                  onClick={() => onDelete(role.id)}
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
