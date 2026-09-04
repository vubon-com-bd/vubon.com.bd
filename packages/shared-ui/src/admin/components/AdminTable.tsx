/**
 * AdminTable Component
 * অ্যাডমিন টেবিল কম্পোনেন্ট
 */

import React from 'react';
import { Admin } from '@vubon/shared-types';
import { Table, Column } from '../../common/components/Table';
import { AdminStatusBadge } from './AdminStatusBadge';
import { AdminRoleBadge } from './AdminRoleBadge';

export interface AdminTableProps {
  admins: Admin[];
  onRowClick?: (admin: Admin, index: number) => void;
  className?: string;
  showActions?: boolean;
  onEdit?: (admin: Admin) => void;
  onDelete?: (admin: Admin) => void;
  isLoading?: boolean;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  admins,
  onRowClick,
  className = '',
  showActions = false,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const columns: Column<Record<string, unknown>>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (item) => {
        const admin = item as unknown as Admin;
        return (
          <div>
            <p className="font-medium text-gray-900">{admin.name}</p>
            <p className="text-sm text-gray-500">{admin.email}</p>
          </div>
        );
      },
    },
    {
      key: 'role',
      header: 'Role',
      render: (item) => {
        const admin = item as unknown as Admin;
        return <AdminRoleBadge role={admin.role} />;
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => {
        const admin = item as unknown as Admin;
        return <AdminStatusBadge status={admin.status} />;
      },
    },
    {
      key: 'level',
      header: 'Level',
      render: (item) => {
        const admin = item as unknown as Admin;
        return <span className="text-sm text-gray-600">{admin.level || 'N/A'}</span>;
      },
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      render: (item) => {
        const admin = item as unknown as Admin;
        return admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleString() : 'Never';
      },
    },
  ];

  if (showActions) {
    columns.push({
      key: 'actions',
      header: 'Actions',
      render: (item) => {
        const admin = item as unknown as Admin;
        return (
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(admin);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(admin);
                }}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            )}
          </div>
        );
      },
    });
  }

  const tableData = admins.map((admin) => ({ ...admin })) as Record<string, unknown>[];

  const handleRowClick = onRowClick
    ? (item: Record<string, unknown>, index: number) => {
        const admin = item as unknown as Admin;
        onRowClick(admin, index);
      }
    : undefined;

  return (
    <Table
      columns={columns}
      data={tableData}
      loading={isLoading}
      onRowClick={handleRowClick}
      className={className}
    />
  );
};
