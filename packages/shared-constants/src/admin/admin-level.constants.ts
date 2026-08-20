/**
 * অ্যাডমিনের লেভেল সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// অ্যাডমিন লেভেল
export const ADMIN_LEVELS = {
  LEVEL_1: 'level_1',
  LEVEL_2: 'level_2',
  LEVEL_3: 'level_3',
  LEVEL_4: 'level_4',
  LEVEL_5: 'level_5',
} as const;

// লেভেলের নাম
export const ADMIN_LEVEL_NAMES = {
  LEVEL_1: 'Entry Level',
  LEVEL_2: 'Junior Level',
  LEVEL_3: 'Mid Level',
  LEVEL_4: 'Senior Level',
  LEVEL_5: 'Executive Level',
} as const;

// লেভেলের কর্তৃত্ব সীমা
export const ADMIN_LEVEL_AUTHORITY_LIMITS = {
  LEVEL_1: {
    maxUsers: 10,
    maxRoles: 1,
    maxPermissions: 5,
    canCreateContent: false,
    canModifySettings: false,
  },
  LEVEL_2: {
    maxUsers: 50,
    maxRoles: 3,
    maxPermissions: 15,
    canCreateContent: true,
    canModifySettings: false,
  },
  LEVEL_3: {
    maxUsers: 200,
    maxRoles: 5,
    maxPermissions: 30,
    canCreateContent: true,
    canModifySettings: true,
  },
  LEVEL_4: {
    maxUsers: 500,
    maxRoles: 10,
    maxPermissions: 50,
    canCreateContent: true,
    canModifySettings: true,
  },
  LEVEL_5: {
    maxUsers: 1000,
    maxRoles: 20,
    maxPermissions: 100,
    canCreateContent: true,
    canModifySettings: true,
  },
} as const;

// লেভেলের পারমিশন স্কোপ
export const ADMIN_LEVEL_PERMISSION_SCOPES = {
  LEVEL_1: ['basic', 'read'],
  LEVEL_2: ['basic', 'read', 'write'],
  LEVEL_3: ['basic', 'read', 'write', 'modify'],
  LEVEL_4: ['basic', 'read', 'write', 'modify', 'manage'],
  LEVEL_5: ['basic', 'read', 'write', 'modify', 'manage', 'admin'],
} as const;

// লেভেলের প্রায়োরিটি (১ = সর্বোচ্চ)
export const ADMIN_LEVEL_PRIORITY = {
  LEVEL_1: 5,
  LEVEL_2: 4,
  LEVEL_3: 3,
  LEVEL_4: 2,
  LEVEL_5: 1,
} as const;

// ডিফল্ট লেভেল
export const DEFAULT_ADMIN_LEVEL = 'level_1';

// লেভেল আপগ্রেডের শর্তাবলী
export const ADMIN_LEVEL_UPGRADE_CONDITIONS = {
  LEVEL_1_TO_LEVEL_2: {
    minExperience: 6, // মাস
    minRating: 3.5,
    requiredTraining: ['basic_training'],
    requiredProjects: 2,
  },
  LEVEL_2_TO_LEVEL_3: {
    minExperience: 12,
    minRating: 4.0,
    requiredTraining: ['basic_training', 'advanced_training'],
    requiredProjects: 5,
  },
  LEVEL_3_TO_LEVEL_4: {
    minExperience: 24,
    minRating: 4.5,
    requiredTraining: ['basic_training', 'advanced_training', 'leadership_training'],
    requiredProjects: 10,
  },
  LEVEL_4_TO_LEVEL_5: {
    minExperience: 48,
    minRating: 4.8,
    requiredTraining: [
      'basic_training',
      'advanced_training',
      'leadership_training',
      'executive_training',
    ],
    requiredProjects: 20,
  },
} as const;

// লেভেলের অনুমোদিত অ্যাকশন লিস্ট
export const ADMIN_LEVEL_ALLOWED_ACTIONS = {
  LEVEL_1: ['view_dashboard', 'view_profile', 'edit_profile', 'view_content'],
  LEVEL_2: [
    'view_dashboard',
    'view_profile',
    'edit_profile',
    'view_content',
    'create_content',
    'edit_content',
  ],
  LEVEL_3: [
    'view_dashboard',
    'view_profile',
    'edit_profile',
    'view_content',
    'create_content',
    'edit_content',
    'delete_content',
    'modify_settings',
  ],
  LEVEL_4: [
    'view_dashboard',
    'view_profile',
    'edit_profile',
    'view_content',
    'create_content',
    'edit_content',
    'delete_content',
    'modify_settings',
    'manage_users',
    'manage_roles',
  ],
  LEVEL_5: [
    'view_dashboard',
    'view_profile',
    'edit_profile',
    'view_content',
    'create_content',
    'edit_content',
    'delete_content',
    'modify_settings',
    'manage_users',
    'manage_roles',
    'manage_permissions',
    'system_admin',
  ],
} as const;

// লেভেলের কালার কোড
export const ADMIN_LEVEL_COLORS = {
  LEVEL_1: '#94A3B8', // ধূসর
  LEVEL_2: '#3B82F6', // নীল
  LEVEL_3: '#22C55E', // সবুজ
  LEVEL_4: '#F59E0B', // কমলা
  LEVEL_5: '#DC2626', // লাল
} as const;

// লেভেলের আইকন
export const ADMIN_LEVEL_ICONS = {
  LEVEL_1: '⭐',
  LEVEL_2: '🌟🌟',
  LEVEL_3: '🌟🌟🌟',
  LEVEL_4: '🌟🌟🌟🌟',
  LEVEL_5: '🌟🌟🌟🌟🌟',
} as const;

// লেভেলের লেবেল (বাংলা)
export const ADMIN_LEVEL_LABELS_BN = {
  LEVEL_1: 'প্রবেশ স্তর',
  LEVEL_2: 'জুনিয়র স্তর',
  LEVEL_3: 'মিড স্তর',
  LEVEL_4: 'সিনিয়র স্তর',
  LEVEL_5: 'এক্সিকিউটিভ স্তর',
} as const;

// লেভেলের CSS ক্লাস
export const ADMIN_LEVEL_CSS_CLASSES = {
  LEVEL_1: 'level-basic',
  LEVEL_2: 'level-junior',
  LEVEL_3: 'level-mid',
  LEVEL_4: 'level-senior',
  LEVEL_5: 'level-executive',
} as const;

// লেভেল গ্রুপ
export const ADMIN_LEVEL_GROUPS = {
  BASIC_LEVELS: ['level_1', 'level_2'],
  MID_LEVELS: ['level_3'],
  SENIOR_LEVELS: ['level_4', 'level_5'],
} as const;

// লেভেলের জন্য ইমোজি
export const ADMIN_LEVEL_EMOJIS = {
  LEVEL_1: '🌱',
  LEVEL_2: '🌿',
  LEVEL_3: '🌳',
  LEVEL_4: '🏆',
  LEVEL_5: '👑',
} as const;
