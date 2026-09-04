/**
 * UserTable Component
 * ইউজার টেবিল কম্পোনেন্ট
 */

import React from 'react';
import { User } from '@vubon/shared-types';
import { Table, Column } from '../../common/components/Table';
import { UserStatusBadge } from './UserStatusBadge';
import { UserRoleBadge } from './UserRoleBadge';
import { UserAvatar } from './UserAvatar';

export interface UserTableProps {
  users: User[];
  onRowClick?: (user: User, index: number) => void;
  className?: string;
  showActions?: boolean;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  isLoading?: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onRowClick,
  className = '',
  showActions = false,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  // Table component expects Record<string, unknown>, so we convert
  const tableData = users.map((user) => ({
    ...user,
    // Ensure all fields are present for Record<string, unknown>
  })) as Record<string, unknown>[];

  const columns: Column<Record<string, unknown>>[] = [
    {
      key: 'user',
      header: 'User',
      render: (item: Record<string, unknown>) => {
        const user = item as unknown as User;
        return (
          <div className="flex items-center space-x-3">
            <UserAvatar name={user.name} avatar={user.avatar} size="sm" />
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: 'role',
      header: 'Role',
      render: (item: Record<string, unknown>) => {
        const user = item as unknown as User;
        return <UserRoleBadge role={user.role} />;
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Record<string, unknown>) => {
        const user = item as unknown as User;
        return <UserStatusBadge status={user.status} />;
      },
    },
    {
      key: 'verified',
      header: 'Verified',
      render: (item: Record<string, unknown>) => {
        const user = item as unknown as User;
        return (
          <span className={user.isVerified ? 'text-green-600' : 'text-gray-400'}>
            {user.isVerified ? '✓' : '✗'}
          </span>
        );
      },
    },
    {
      key: 'joined',
      header: 'Joined',
      render: (item: Record<string, unknown>) => {
        const user = item as unknown as User;
        return new Date(user.createdAt).toLocaleDateString();
      },
    },
  ];

  if (showActions) {
    columns.push({
      key: 'actions',
      header: 'Actions',
      render: (item: Record<string, unknown>) => {
        const user = item as unknown as User;
        return (
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(user);
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
                  onDelete(user);
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

  const handleRowClick = onRowClick
    ? (item: Record<string, unknown>, index: number) => {
        const user = item as unknown as User;
        onRowClick(user, index);
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
