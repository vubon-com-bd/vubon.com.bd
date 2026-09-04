/**
 * Admin Type Constants
 * অ্যাডমিন টাইপ সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../common';

export const ADMIN_TYPES = {
  // Admin specific types (শুধু admin-related)
  SYSTEM: 'system',
  SUPER: 'super',
  REGULAR: 'regular',
  SUPPORT: 'support',
  MANAGER: 'manager',
  CONTENT: 'content',
  FINANCE: 'finance',
  USER: 'user',
  REPORT: 'report',
  SETTINGS: 'settings',
} as const;

export type AdminTypeValue = (typeof ADMIN_TYPES)[keyof typeof ADMIN_TYPES];

// Admin type metadata
export const ADMIN_TYPE_METADATA: Record<
  AdminTypeValue,
  {
    name: string;
    nameBangla: string;
    level: number;
    description: string;
  }
> = {
  system: {
    name: 'System Admin',
    nameBangla: 'সিস্টেম অ্যাডমিন',
    level: 5,
    description: 'Full system access',
  },
  super: {
    name: 'Super Admin',
    nameBangla: 'সুপার অ্যাডমিন',
    level: 4,
    description: 'All admin access',
  },
  regular: {
    name: 'Regular Admin',
    nameBangla: 'নিয়মিত অ্যাডমিন',
    level: 3,
    description: 'Standard admin access',
  },
  support: {
    name: 'Support Admin',
    nameBangla: 'সাপোর্ট অ্যাডমিন',
    level: 2,
    description: 'Support access only',
  },
  manager: {
    name: 'Manager',
    nameBangla: 'ম্যানেজার',
    level: 3,
    description: 'Management access',
  },
  content: {
    name: 'Content Admin',
    nameBangla: 'কন্টেন্ট অ্যাডমিন',
    level: 3,
    description: 'Content management access',
  },
  finance: {
    name: 'Finance Admin',
    nameBangla: 'ফাইন্যান্স অ্যাডমিন',
    level: 3,
    description: 'Finance management access',
  },
  user: {
    name: 'User Admin',
    nameBangla: 'ইউজার অ্যাডমিন',
    level: 3,
    description: 'User management access',
  },
  report: {
    name: 'Report Admin',
    nameBangla: 'রিপোর্ট অ্যাডমিন',
    level: 2,
    description: 'Report access only',
  },
  settings: {
    name: 'Settings Admin',
    nameBangla: 'সেটিংস অ্যাডমিন',
    level: 3,
    description: 'Settings management access',
  },
};

// TYPES থেকে value ব্যবহার করে টাইপ চেক করা
export const isValidAdminType = (type: string): boolean => {
  return Object.values(ADMIN_TYPES).includes(type as AdminTypeValue);
};

// TYPES থেকে value ব্যবহার করে admin type পাওয়া
export const getAdminTypeFromCommon = (commonType: string): AdminTypeValue | null => {
  const mapping: Record<string, AdminTypeValue> = {
    [TYPES.ADMIN]: 'regular',
    [TYPES.MODERATOR]: 'support',
    [TYPES.MANAGER]: 'manager',
    [TYPES.SUPPORT]: 'support',
  };
  return mapping[commonType] || null;
};
