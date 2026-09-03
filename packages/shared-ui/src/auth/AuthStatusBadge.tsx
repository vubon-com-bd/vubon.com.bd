/**
 * Auth AuthStatusBadge Component
 * প্রমীকরণ অথ স্ট্যাটাস ব্যাজ কম্পোনেন্ট
 */

import React from 'react';
import { useAuth } from '@vubon/shared-hooks';
import { AuthEndpoints } from '@vubon/shared-api';
import { STATUS } from '@vubon/shared-constants';

export interface AuthAuthStatusBadgeProps {
  showLabel?: boolean;
  className?: string;
}

export const AuthAuthStatusBadge: React.FC<AuthAuthStatusBadgeProps> = ({
  showLabel = true,
  className = '',
}) => {
  const authEndpoints = new AuthEndpoints({} as any);
  const { user, isAuthenticated, isLoading } = useAuth(authEndpoints);

  if (isLoading) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
        {showLabel && <span className="ml-2 text-sm text-gray-500">Loading...</span>}
      </span>
    );
  }

  if (!isAuthenticated) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <span className="h-2 w-2 rounded-full bg-gray-400" />
        {showLabel && <span className="ml-2 text-sm text-gray-500">Not Authenticated</span>}
      </span>
    );
  }

  const status = user?.status || STATUS.ACTIVE;
  const statusColors: Record<string, string> = {
    [STATUS.ACTIVE]: 'bg-green-500',
    [STATUS.INACTIVE]: 'bg-gray-400',
    [STATUS.PENDING]: 'bg-yellow-500',
    [STATUS.SUSPENDED]: 'bg-orange-500',
    [STATUS.BANNED]: 'bg-red-500',
    [STATUS.DELETED]: 'bg-gray-400',
    [STATUS.VERIFIED]: 'bg-green-600',
    [STATUS.UNVERIFIED]: 'bg-yellow-400',
  };

  const statusLabels: Record<string, string> = {
    [STATUS.ACTIVE]: 'Active',
    [STATUS.INACTIVE]: 'Inactive',
    [STATUS.PENDING]: 'Pending',
    [STATUS.SUSPENDED]: 'Suspended',
    [STATUS.BANNED]: 'Banned',
    [STATUS.DELETED]: 'Deleted',
    [STATUS.VERIFIED]: 'Verified',
    [STATUS.UNVERIFIED]: 'Unverified',
  };

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span
        className={`h-2 w-2 rounded-full ${statusColors[status] || 'bg-gray-400'}`}
      />
      {showLabel && (
        <span className="ml-2 text-sm text-gray-700">
          {statusLabels[status] || status}
        </span>
      )}
    </span>
  );
};
