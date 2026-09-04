/**
 * UserDetail Component
 * ইউজার ডিটেইল কম্পোনেন্ট
 */

import React from 'react';
import { User } from '@vubon/shared-types';
import { Card } from '../../common/components/Card';
import { UserAvatar } from './UserAvatar';
import { UserStatusBadge } from './UserStatusBadge';
import { UserRoleBadge } from './UserRoleBadge';

export interface UserDetailProps {
  user: User;
  onEdit?: () => void;
  className?: string;
}

export const UserDetail: React.FC<UserDetailProps> = ({
  user,
  onEdit,
  className = '',
}) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-6">
          <UserAvatar name={user.name} avatar={user.avatar} size="xl" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            {user.phone && <p className="text-gray-500">{user.phone}</p>}
            <div className="mt-2 flex flex-wrap gap-2">
              <UserStatusBadge status={user.status} />
              <UserRoleBadge role={user.role} />
              {user.isVerified && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  Verified
                </span>
              )}
              {user.isLocked && (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                  Locked
                </span>
              )}
            </div>
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

      {user.bio && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-700">About</h3>
          <p className="mt-1 text-sm text-gray-600">{user.bio}</p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Timezone</h3>
          <p className="mt-1 text-sm text-gray-600">{user.timezone || 'Asia/Dhaka'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Language</h3>
          <p className="mt-1 text-sm text-gray-600">{user.language || 'Bangla'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Last Login</h3>
          <p className="mt-1 text-sm text-gray-600">
            {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Joined</h3>
          <p className="mt-1 text-sm text-gray-600">
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};
