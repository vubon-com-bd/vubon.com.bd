/**
 * অ্যাডমিন রোল সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট রোল
export const DEFAULT_ROLES = {
  SUPER_ADMIN: 'super_admin',
  MANAGER: 'manager',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

// রোল আইডি প্রিফিক্স
export const ROLE_ID_PREFIX = 'ROL';

// ডিফল্ট রোল পারমিশন
export const DEFAULT_ROLE_PERMISSIONS = {
  SUPER_ADMIN: ['*'], // সর্বোচ্চ পারমিশন
  MANAGER: ['user_management.*', 'role_management.view', 'system_settings.view', 'analytics.view'],
  EDITOR: ['content_management.*', 'analytics.view'],
  VIEWER: ['dashboard.view', 'analytics.view'],
} as const;

// রোলের সর্বোচ্চ সংখ্যা
export const MAX_ROLES_PER_ADMIN = 5;

// রোল নামের ফরম্যাট (শুধুমাত্র ছোট হাতের অক্ষর, সংখ্যা ও আন্ডারস্কোর)
export const ROLE_NAME_FORMAT = /^[a-z0-9_]+$/;

// রোল ডেসক্রিপশনের ম্যাক্স লেন্থ
export const ROLE_DESCRIPTION_MAX_LENGTH = 500;

// রোল নামের মিনিমাম লেন্থ
export const ROLE_NAME_MIN_LENGTH = 3;

// রোল নামের ম্যাক্সিমাম লেন্থ
export const ROLE_NAME_MAX_LENGTH = 50;

// রোল স্ট্যাটাস
export const ROLE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
} as const;

// রোল লেভেল
export const ROLE_LEVEL = {
  SUPER_ADMIN: 1,
  MANAGER: 2,
  EDITOR: 3,
  VIEWER: 4,
  CUSTOM: 5,
} as const;

// ডিফল্ট রোল কালার
export const ROLE_COLORS = {
  SUPER_ADMIN: '#FF0000',
  MANAGER: '#FF8C00',
  EDITOR: '#008000',
  VIEWER: '#0000FF',
} as const;

// রোলের জন্য অনুমোদিত মডিউলসমূহ
export const ALLOWED_ROLE_MODULES = [
  'dashboard',
  'user_management',
  'role_management',
  'content_management',
  'system_settings',
  'analytics',
  'audit_logs',
  'support',
  'notification',
] as const;

// ডিফল্ট রোল ডেসক্রিপশন
export const DEFAULT_ROLE_DESCRIPTIONS = {
  SUPER_ADMIN: 'Full system access and control',
  MANAGER: 'Manage users and system settings',
  EDITOR: 'Manage content and view analytics',
  VIEWER: 'View only access',
} as const;
