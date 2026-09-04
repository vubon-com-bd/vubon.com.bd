/**
 * AdminDetail Component
 * অ্যাডমিন ডিটেইল কম্পোনেন্ট
 */

import React from 'react';
import { Admin } from '@vubon/shared-types';
import { Card } from '../../common/components/Card';
import { AdminStatusBadge } from './AdminStatusBadge';
import { AdminRoleBadge } from './AdminRoleBadge';

export interface AdminDetailProps {
  admin: Admin;
  onEdit?: () => void;
  className?: string;
}

export const AdminDetail: React.FC<AdminDetailProps> = ({
  admin,
  onEdit,
  className = '',
}) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{admin.name}</h2>
          <p className="text-gray-500">{admin.email}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <AdminStatusBadge status={admin.status} />
            <AdminRoleBadge role={admin.role} />
            {admin.isSuperAdmin && (
              <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                Super Admin
              </span>
            )}
            {admin.isVerified && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                Verified
              </span>
            )}
            {admin.isLocked && (
              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                Locked
              </span>
            )}
          </div>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Level</h3>
          <p className="mt-1 text-sm text-gray-600">{admin.level || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Department</h3>
          <p className="mt-1 text-sm text-gray-600">{admin.department || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Last Login</h3>
          <p className="mt-1 text-sm text-gray-600">
            {admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleString() : 'Never'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Joined</h3>
          <p className="mt-1 text-sm text-gray-600">
            {new Date(admin.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};
