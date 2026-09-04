/**
 * UserItem Component
 * ইউজার আইটেম কম্পোনেন্ট
 */

import React from 'react';
import { User } from '@vubon/shared-types';
import { UserAvatar } from './UserAvatar';
import { UserStatusBadge } from './UserStatusBadge';
import { UserRoleBadge } from './UserRoleBadge';

export interface UserItemProps {
  user: User;
  onSelect?: (user: User) => void;
  className?: string;
  compact?: boolean;
}

export const UserItem: React.FC<UserItemProps> = ({
  user,
  onSelect,
  className = '',
  compact = false,
}) => {
  if (compact) {
    return (
      <div
        className={`flex cursor-pointer items-center rounded-lg px-3 py-2 hover:bg-gray-50 ${className}`}
        onClick={() => onSelect?.(user)}
      >
        <UserAvatar name={user.name} avatar={user.avatar} size="sm" />
        <div className="ml-3 min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
          <p className="truncate text-sm text-gray-500">{user.email}</p>
        </div>
        <UserStatusBadge status={user.status} showLabel={false} />
      </div>
    );
  }

  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 ${className}`}
      onClick={() => onSelect?.(user)}
    >
      <div className="flex items-center space-x-4">
        <UserAvatar name={user.name} avatar={user.avatar} size="md" />
        <div>
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
          {user.phone && <p className="text-sm text-gray-500">{user.phone}</p>}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <UserStatusBadge status={user.status} />
        <UserRoleBadge role={user.role} />
        <span className="text-sm text-gray-400">
          {new Date(user.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
