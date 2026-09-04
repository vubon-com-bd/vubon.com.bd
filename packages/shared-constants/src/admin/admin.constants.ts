/**
 * Admin Constants - Base
 * অ্যাডমিন সম্পর্কিত মূল কনস্ট্যান্টস
 */

import { STATUS, ROLES, TYPES } from '../common';

export const ADMIN = {
  // Admin types (TYPES থেকে এক্সটেন্ডেড)
  TYPES: {
    SYSTEM: 'system',
    SUPER: 'super',
    REGULAR: 'regular',
    SUPPORT: 'support',
    MANAGER: 'manager',
    // TYPES থেকে value ব্যবহার
    ADMIN: TYPES.ADMIN,
    MODERATOR: TYPES.MODERATOR,
    GUEST: TYPES.GUEST,
    VENDOR: TYPES.VENDOR,
  },

  // Admin status (STATUS থেকে এক্সটেন্ডেড)
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    PENDING: STATUS.PENDING,
    DELETED: STATUS.DELETED,
    SUSPENDED: STATUS.SUSPENDED,
    BANNED: STATUS.BANNED,
    VERIFIED: STATUS.VERIFIED,
    UNVERIFIED: STATUS.UNVERIFIED,
    LOCKED: 'locked',
    RESTRICTED: 'restricted',
  },

  // Admin roles (ROLES থেকে এক্সটেন্ডেড)
  ROLES: {
    SUPER_ADMIN: ROLES.SUPER_ADMIN,
    ADMIN: ROLES.ADMIN,
    MODERATOR: ROLES.MODERATOR,
    MANAGER: ROLES.MANAGER,
    SUPPORT: ROLES.SUPPORT,
  },

  // Admin levels
  LEVELS: {
    LEVEL_1: 'level_1',
    LEVEL_2: 'level_2',
    LEVEL_3: 'level_3',
    LEVEL_4: 'level_4',
    LEVEL_5: 'level_5',
  },

  // Default values
  DEFAULTS: {
    AVATAR: 'default-admin-avatar.png',
    TIMEZONE: 'Asia/Dhaka',
    LANGUAGE: 'bn',
    ITEMS_PER_PAGE: 25,
  },
} as const;

export type AdminType = (typeof ADMIN.TYPES)[keyof typeof ADMIN.TYPES];
export type AdminStatus = (typeof ADMIN.STATUS)[keyof typeof ADMIN.STATUS];
export type AdminRole = (typeof ADMIN.ROLES)[keyof typeof ADMIN.ROLES];
export type AdminLevel = (typeof ADMIN.LEVELS)[keyof typeof ADMIN.LEVELS];

// TYPES ব্যবহার করে চেক ফাংশন
export const isAdminType = (type: string): boolean => {
  return Object.values(ADMIN.TYPES).includes(type as AdminType);
};

// TYPES থেকে ম্যাপিং
export const getAdminTypeFromCommonType = (commonType: string): AdminType | null => {
  const mapping: Record<string, AdminType> = {
    [TYPES.ADMIN]: 'regular',
    [TYPES.MODERATOR]: 'support',
    [TYPES.MANAGER]: 'manager',
    [TYPES.SUPPORT]: 'support',
    [TYPES.VENDOR]: 'regular',
    [TYPES.GUEST]: 'regular',
  };
  return mapping[commonType] || null;
};
