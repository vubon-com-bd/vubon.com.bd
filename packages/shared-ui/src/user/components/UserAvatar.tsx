/**
 * UserAvatar Component
 * ইউজার অ্যাভাটার কম্পোনেন্ট
 */

import React from 'react';
import { Avatar } from '../../common/components/Avatar';

export interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showName?: boolean;
  namePosition?: 'bottom' | 'right' | 'left';
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  avatar,
  size = 'md',
  className = '',
  showName = false,
  namePosition = 'bottom',
}) => {
  const getInitials = (fullName: string): string => {
    if (!fullName) return 'U';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(name);

  const containerClass = {
    bottom: 'flex flex-col items-center',
    right: 'flex items-center space-x-3',
    left: 'flex items-center space-x-3 flex-row-reverse',
  };

  return (
    <div className={`${containerClass[namePosition]} ${className}`}>
      <Avatar src={avatar} alt={name} size={size} fallback={initials} />
      {showName && (
        <span className={`text-sm font-medium text-gray-700 ${namePosition === 'bottom' ? 'mt-1' : ''}`}>
          {name}
        </span>
      )}
    </div>
  );
};
