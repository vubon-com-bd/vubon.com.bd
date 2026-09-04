/**
 * AdminProfile Component
 * অ্যাডমিন প্রোফাইল কম্পোনেন্ট
 */

import React from 'react';
import { AdminProfile as AdminProfileType } from '@vubon/shared-types';
import { Card } from '../../common/components/Card';

export interface AdminProfileProps {
  profile: AdminProfileType;
  onEdit?: () => void;
  className?: string;
}

export const AdminProfile: React.FC<AdminProfileProps> = ({
  profile,
  onEdit,
  className = '',
}) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {profile.displayName || profile.fullName || 'Admin'}
          </h2>
          {profile.fullName && profile.fullName !== profile.displayName && (
            <p className="text-gray-500">{profile.fullName}</p>
          )}
          {profile.location && <p className="text-gray-500">{profile.location}</p>}
          {profile.company && profile.position && (
            <p className="text-gray-500">
              {profile.position} at {profile.company}
            </p>
          )}
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

      {profile.bio && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-700">About</h3>
          <p className="mt-1 text-sm text-gray-600">{profile.bio}</p>
        </div>
      )}

      {profile.website && (
        <div className="mt-2">
          <h3 className="text-sm font-medium text-gray-700">Website</h3>
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            {profile.website}
          </a>
        </div>
      )}
    </Card>
  );
};
