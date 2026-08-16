/**
 * মার্কেটিং পারমিশন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * মার্কেটিং পারমিশনসমূহ
 */
export const PERMISSIONS = [
  'marketing:read',
  'marketing:write',
  'marketing:delete',
  'campaign:manage',
  'promotion:manage',
  'affiliate:manage',
  'loyalty:manage',
  'email:send',
  'sms:send',
  'social:publish',
] as const;

/**
 * পারমিশন টাইপ টাইপ
 */
export type Permission = (typeof PERMISSIONS)[number];

/**
 * প্রতিটি পারমিশনের লেবেল (বাংলা এবং ইংরেজি)
 */
export const PERMISSION_LABELS = {
  'marketing:read': {
    en: 'View Marketing Data',
    bn: 'মার্কেটিং ডেটা দেখুন',
  },
  'marketing:write': {
    en: 'Edit Marketing Data',
    bn: 'মার্কেটিং ডেটা সম্পাদনা করুন',
  },
  'marketing:delete': {
    en: 'Delete Marketing Data',
    bn: 'মার্কেটিং ডেটা মুছুন',
  },
  'campaign:manage': {
    en: 'Manage Campaigns',
    bn: 'ক্যাম্পেইন পরিচালনা করুন',
  },
  'promotion:manage': {
    en: 'Manage Promotions',
    bn: 'প্রমোশন পরিচালনা করুন',
  },
  'affiliate:manage': {
    en: 'Manage Affiliates',
    bn: 'অ্যাফিলিয়েট পরিচালনা করুন',
  },
  'loyalty:manage': {
    en: 'Manage Loyalty Program',
    bn: 'লয়্যালটি প্রোগ্রাম পরিচালনা করুন',
  },
  'email:send': {
    en: 'Send Emails',
    bn: 'ইমেইল পাঠান',
  },
  'sms:send': {
    en: 'Send SMS',
    bn: 'এসএমএস পাঠান',
  },
  'social:publish': {
    en: 'Publish Social Posts',
    bn: 'সোশ্যাল পোস্ট প্রকাশ করুন',
  },
} as const satisfies Record<Permission, { en: string; bn: string }>;

/**
 * প্রতিটি পারমিশনের ক্যাটাগরি
 */
export const PERMISSION_CATEGORIES = {
  'marketing:read': 'marketing',
  'marketing:write': 'marketing',
  'marketing:delete': 'marketing',
  'campaign:manage': 'campaign',
  'promotion:manage': 'promotion',
  'affiliate:manage': 'affiliate',
  'loyalty:manage': 'loyalty',
  'email:send': 'email',
  'sms:send': 'sms',
  'social:publish': 'social',
} as const satisfies Record<Permission, string>;

/**
 * প্রতিটি পারমিশনের অ্যাকশন টাইপ
 */
export const PERMISSION_ACTIONS = {
  'marketing:read': 'read',
  'marketing:write': 'write',
  'marketing:delete': 'delete',
  'campaign:manage': 'manage',
  'promotion:manage': 'manage',
  'affiliate:manage': 'manage',
  'loyalty:manage': 'manage',
  'email:send': 'send',
  'sms:send': 'send',
  'social:publish': 'publish',
} as const satisfies Record<Permission, string>;

/**
 * পারমিশন গ্রুপসমূহ
 */
export const PERMISSION_GROUPS = {
  marketing: ['marketing:read', 'marketing:write', 'marketing:delete'],
  campaign: ['campaign:manage'],
  promotion: ['promotion:manage'],
  affiliate: ['affiliate:manage'],
  loyalty: ['loyalty:manage'],
  email: ['email:send'],
  sms: ['sms:send'],
  social: ['social:publish'],
} as const;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট পারমিশনের লেবেল পাওয়ার ফাংশন
 */
export function getPermissionLabel(permission: Permission, lang: Language = 'en'): string {
  return PERMISSION_LABELS[permission][lang];
}

/**
 * নির্দিষ্ট পারমিশনের ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getPermissionCategory(permission: Permission): string {
  return PERMISSION_CATEGORIES[permission];
}

/**
 * নির্দিষ্ট পারমিশনের অ্যাকশন পাওয়ার ফাংশন
 */
export function getPermissionAction(permission: Permission): string {
  return PERMISSION_ACTIONS[permission];
}

/**
 * সব পারমিশনের তালিকা পাওয়ার ফাংশন
 */
export function getAllPermissions(): readonly Permission[] {
  return PERMISSIONS;
}

/**
 * পারমিশন বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPermission(permission: string): permission is Permission {
  return PERMISSIONS.includes(permission as Permission);
}

/**
 * ক্যাটাগরি অনুযায়ী পারমিশন পাওয়ার ফাংশন
 */
export function getPermissionsByCategory(category: string): Permission[] {
  return Object.entries(PERMISSION_CATEGORIES)
    .filter(([_, cat]) => cat === category)
    .map(([perm]) => perm as Permission);
}

/**
 * পারমিশন রিড কিনা চেক করার ফাংশন
 */
export function isReadPermission(permission: Permission): boolean {
  return permission === 'marketing:read';
}

/**
 * পারমিশন রাইট কিনা চেক করার ফাংশন
 */
export function isWritePermission(permission: Permission): boolean {
  return permission === 'marketing:write';
}

/**
 * পারমিশন ডিলিট কিনা চেক করার ফাংশন
 */
export function isDeletePermission(permission: Permission): boolean {
  return permission === 'marketing:delete';
}

/**
 * পারমিশন ম্যানেজ কিনা চেক করার ফাংশন
 */
export function isManagePermission(permission: Permission): boolean {
  return permission.includes(':manage');
}

/**
 * পারমিশন সেন্ড কিনা চেক করার ফাংশন
 */
export function isSendPermission(permission: Permission): boolean {
  return permission === 'email:send' || permission === 'sms:send';
}

/**
 * পারমিশন পাবলিশ কিনা চেক করার ফাংশন
 */
export function isPublishPermission(permission: Permission): boolean {
  return permission === 'social:publish';
}

/**
 * পারমিশন মার্কেটিং কিনা চেক করার ফাংশন
 */
export function isMarketingPermission(permission: Permission): boolean {
  return permission.startsWith('marketing:');
}

/**
 * পারমিশনের আইকন পাওয়ার ফাংশন
 */
export function getPermissionIcon(permission: Permission): string {
  const icons: Record<Permission, string> = {
    'marketing:read': '👁️',
    'marketing:write': '✏️',
    'marketing:delete': '🗑️',
    'campaign:manage': '📢',
    'promotion:manage': '🎯',
    'affiliate:manage': '🤝',
    'loyalty:manage': '⭐',
    'email:send': '📧',
    'sms:send': '💬',
    'social:publish': '📱',
  };
  return icons[permission];
}

/**
 * পারমিশনের বিবরণ পাওয়ার ফাংশন
 */
export function getPermissionDescription(permission: Permission, lang: Language = 'en'): string {
  const descriptions: Record<Permission, { en: string; bn: string }> = {
    'marketing:read': {
      en: 'Allows viewing marketing data and analytics',
      bn: 'মার্কেটিং ডেটা এবং অ্যানালিটিক্স দেখার অনুমতি দেয়',
    },
    'marketing:write': {
      en: 'Allows creating and editing marketing content',
      bn: 'মার্কেটিং কন্টেন্ট তৈরি এবং সম্পাদনার অনুমতি দেয়',
    },
    'marketing:delete': {
      en: 'Allows deleting marketing content and data',
      bn: 'মার্কেটিং কন্টেন্ট এবং ডেটা মুছার অনুমতি দেয়',
    },
    'campaign:manage': {
      en: 'Allows managing all marketing campaigns',
      bn: 'সব মার্কেটিং ক্যাম্পেইন পরিচালনার অনুমতি দেয়',
    },
    'promotion:manage': {
      en: 'Allows managing promotions and offers',
      bn: 'প্রমোশন এবং অফার পরিচালনার অনুমতি দেয়',
    },
    'affiliate:manage': {
      en: 'Allows managing affiliate programs and partners',
      bn: 'অ্যাফিলিয়েট প্রোগ্রাম এবং পার্টনার পরিচালনার অনুমতি দেয়',
    },
    'loyalty:manage': {
      en: 'Allows managing loyalty programs and points',
      bn: 'লয়্যালটি প্রোগ্রাম এবং পয়েন্ট পরিচালনার অনুমতি দেয়',
    },
    'email:send': {
      en: 'Allows sending marketing emails',
      bn: 'মার্কেটিং ইমেইল পাঠানোর অনুমতি দেয়',
    },
    'sms:send': {
      en: 'Allows sending marketing SMS',
      bn: 'মার্কেটিং এসএমএস পাঠানোর অনুমতি দেয়',
    },
    'social:publish': {
      en: 'Allows publishing posts on social media',
      bn: 'সোশ্যাল মিডিয়ায় পোস্ট প্রকাশের অনুমতি দেয়',
    },
  };
  return descriptions[permission][lang];
}

/**
 * ডিফল্ট পারমিশন গ্রুপ পাওয়ার ফাংশন
 */
export function getDefaultPermissionGroup(): string[] {
  return ['marketing:read'];
}

/**
 * সব পারমিশন গ্রুপের তালিকা পাওয়ার ফাংশন
 */
export function getAllPermissionGroups(): string[] {
  return Object.keys(PERMISSION_GROUPS);
}
