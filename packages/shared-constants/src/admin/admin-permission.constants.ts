/**
 * অ্যাডমিন পারমিশন সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// পারমিশন আইডি প্রিফিক্স
export const PERMISSION_ID_PREFIX = 'PRM';

// ডিফল্ট পারমিশন গ্রুপ
export const DEFAULT_PERMISSION_GROUPS = {
  USER_MANAGEMENT: 'user_management',
  ROLE_MANAGEMENT: 'role_management',
  SYSTEM_SETTINGS: 'system_settings',
  ANALYTICS: 'analytics',
  AUDIT_LOGS: 'audit_logs',
  CONTENT_MANAGEMENT: 'content_management',
  SUPPORT: 'support',
  NOTIFICATION: 'notification',
  DASHBOARD: 'dashboard',
} as const;

// পারমিশন অ্যাকশন টাইপ
export const PERMISSION_ACTION_TYPES = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  MANAGE: 'manage',
  VIEW: 'view',
  EXPORT: 'export',
  IMPORT: 'import',
} as const;

// পারমিশনের সর্বোচ্চ সংখ্যা
export const MAX_PERMISSIONS_PER_ROLE = 100;

// পারমিশন নামের ফরম্যাট
export const PERMISSION_NAME_FORMAT = /^[a-z0-9_.]+$/;

// পারমিশন ডেসক্রিপশনের ম্যাক্স লেন্থ
export const PERMISSION_DESCRIPTION_MAX_LENGTH = 500;

// পারমিশন নামের মিনিমাম লেন্থ
export const PERMISSION_NAME_MIN_LENGTH = 3;

// পারমিশন নামের ম্যাক্সিমাম লেন্থ
export const PERMISSION_NAME_MAX_LENGTH = 100;

// ডিফল্ট পারমিশন লেভেল
export const PERMISSION_LEVEL = {
  USER: 1,
  MANAGER: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
} as const;

// পারমিশন ক্যাটাগরি
export const PERMISSION_CATEGORIES = {
  SYSTEM: 'system',
  USER: 'user',
  CONTENT: 'content',
  SETTINGS: 'settings',
  ANALYTICS: 'analytics',
} as const;

// প্রি-ডিফাইন্ড পারমিশন টেমপ্লেট
export const PERMISSION_TEMPLATES = {
  FULL_ACCESS: {
    name: 'full_access',
    description: 'Complete access to all features',
    level: 4,
  },
  READ_ONLY: {
    name: 'read_only',
    description: 'Read-only access to all features',
    level: 1,
  },
  CUSTOM: {
    name: 'custom',
    description: 'Custom permission set',
    level: 2,
  },
} as const;

// পারমিশন গ্রুপ ডেসক্রিপশন
export const PERMISSION_GROUP_DESCRIPTIONS = {
  USER_MANAGEMENT: 'Manage users and their profiles',
  ROLE_MANAGEMENT: 'Manage roles and permissions',
  SYSTEM_SETTINGS: 'Configure system settings',
  ANALYTICS: 'View analytics and reports',
  AUDIT_LOGS: 'View audit logs and security events',
  CONTENT_MANAGEMENT: 'Manage content and media',
  SUPPORT: 'Manage support tickets',
  NOTIFICATION: 'Manage notifications',
  DASHBOARD: 'View dashboard',
} as const;
