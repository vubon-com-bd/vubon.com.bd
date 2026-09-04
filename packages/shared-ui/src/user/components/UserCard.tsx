/**
 * UserCard Component
 * ইউজার কার্ড কম্পোনেন্ট
 */

import React from 'react';
import { Card } from '../../common/components/Card';
import { User } from '@vubon/shared-types';
import { UserAvatar } from './UserAvatar';
import { UserStatusBadge } from './UserStatusBadge';
import { UserRoleBadge } from './UserRoleBadge';

export interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  className?: string;
  showActions?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  className = '',
  showActions = false,
}) => {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <UserAvatar name={user.name} avatar={user.avatar} size="lg" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            {user.phone && <p className="text-sm text-gray-500">{user.phone}</p>}
            <div className="mt-2 flex flex-wrap gap-2">
              <UserStatusBadge status={user.status} />
              <UserRoleBadge role={user.role} />
              {user.isVerified && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
        {showActions && (
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(user)}
                className="rounded-md bg-blue-50 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-100"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(user)}
                className="rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
