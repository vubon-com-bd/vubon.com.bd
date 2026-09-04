/**
 * UserList Component
 * ইউজার লিস্ট কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { User } from '@vubon/shared-types';
import { UserItem } from './UserItem';
import { Pagination } from '../../common/components/Pagination';
import { Loading } from '../../common/components/Loading';

export interface UserListProps {
  users: User[];
  total: number;
  page: number;
  limit: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onUserSelect?: (user: User) => void;
  className?: string;
  compact?: boolean;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  total,
  page,
  limit,
  isLoading = false,
  onPageChange,
  onUserSelect,
  className = '',
  compact = false,
}) => {
  const totalPages = Math.ceil(total / limit);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loading />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No users found.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-2">
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onSelect={onUserSelect}
            compact={compact}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
