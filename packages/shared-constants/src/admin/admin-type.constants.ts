/**
 * অ্যাডমিনের টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// অ্যাডমিন টাইপ
export const ADMIN_TYPES = {
  SUPER_ADMIN: 'super_admin',
  SYSTEM_ADMIN: 'system_admin',
  CONTENT_ADMIN: 'content_admin',
  SUPPORT_ADMIN: 'support_admin',
  SALES_ADMIN: 'sales_admin',
  MARKETING_ADMIN: 'marketing_admin',
} as const;

// টাইপের ডেসক্রিপশন
export const ADMIN_TYPE_DESCRIPTIONS = {
  SUPER_ADMIN: 'Full system access and control over all features',
  SYSTEM_ADMIN: 'Manage system settings and technical configurations',
  CONTENT_ADMIN: 'Manage content, media, and publications',
  SUPPORT_ADMIN: 'Handle support tickets and customer queries',
  SALES_ADMIN: 'Manage sales, orders, and payment systems',
  MARKETING_ADMIN: 'Manage marketing campaigns and promotions',
} as const;

// টাইপের আইকন
export const ADMIN_TYPE_ICONS = {
  SUPER_ADMIN: '👑',
  SYSTEM_ADMIN: '⚙️',
  CONTENT_ADMIN: '📝',
  SUPPORT_ADMIN: '🎧',
  SALES_ADMIN: '💰',
  MARKETING_ADMIN: '📢',
} as const;

// টাইপের কালার কোড
export const ADMIN_TYPE_COLORS = {
  SUPER_ADMIN: '#DC2626', // লাল
  SYSTEM_ADMIN: '#2563EB', // নীল
  CONTENT_ADMIN: '#16A34A', // সবুজ
  SUPPORT_ADMIN: '#F59E0B', // কমলা
  SALES_ADMIN: '#8B5CF6', // বেগুনি
  MARKETING_ADMIN: '#EC4899', // গোলাপি
} as const;

// ডিফল্ট টাইপ
export const DEFAULT_ADMIN_TYPE = 'content_admin';

// টাইপের পারমিশন সেট
export const ADMIN_TYPE_PERMISSIONS = {
  SUPER_ADMIN: ['*'], // সর্বোচ্চ পারমিশন
  SYSTEM_ADMIN: [
    'system_settings.*',
    'user_management.view',
    'role_management.view',
    'analytics.view',
    'audit_logs.view',
  ],
  CONTENT_ADMIN: ['content_management.*', 'media_management.*', 'analytics.view', 'dashboard.view'],
  SUPPORT_ADMIN: ['support.*', 'user_management.view', 'ticket_management.*', 'analytics.view'],
  SALES_ADMIN: ['sales.*', 'payment_management.view', 'order_management.*', 'analytics.view'],
  MARKETING_ADMIN: ['marketing.*', 'campaign_management.*', 'analytics.view', 'dashboard.view'],
} as const;

// টাইপের প্রায়োরিটি লেভেল (১ = সর্বোচ্চ)
export const ADMIN_TYPE_PRIORITY = {
  SUPER_ADMIN: 1,
  SYSTEM_ADMIN: 2,
  CONTENT_ADMIN: 3,
  SUPPORT_ADMIN: 4,
  SALES_ADMIN: 5,
  MARKETING_ADMIN: 6,
} as const;

// টাইপের সেশান টাইমআউট (মিনিটে)
export const ADMIN_TYPE_SESSION_TIMEOUT = {
  SUPER_ADMIN: 120, // ২ ঘন্টা
  SYSTEM_ADMIN: 90, // ১.৫ ঘন্টা
  CONTENT_ADMIN: 60, // ১ ঘন্টা
  SUPPORT_ADMIN: 60, // ১ ঘন্টা
  SALES_ADMIN: 45, // ৪৫ মিনিট
  MARKETING_ADMIN: 45, // ৪৫ মিনিট
} as const;

// টাইপের লেবেল (বাংলা)
export const ADMIN_TYPE_LABELS_BN = {
  SUPER_ADMIN: 'সুপার অ্যাডমিন',
  SYSTEM_ADMIN: 'সিস্টেম অ্যাডমিন',
  CONTENT_ADMIN: 'কন্টেন্ট অ্যাডমিন',
  SUPPORT_ADMIN: 'সাপোর্ট অ্যাডমিন',
  SALES_ADMIN: 'সেলস অ্যাডমিন',
  MARKETING_ADMIN: 'মার্কেটিং অ্যাডমিন',
} as const;

// টাইপের লেবেল (ইংরেজি)
export const ADMIN_TYPE_LABELS_EN = {
  SUPER_ADMIN: 'Super Admin',
  SYSTEM_ADMIN: 'System Admin',
  CONTENT_ADMIN: 'Content Admin',
  SUPPORT_ADMIN: 'Support Admin',
  SALES_ADMIN: 'Sales Admin',
  MARKETING_ADMIN: 'Marketing Admin',
} as const;

// টাইপের CSS ক্লাস
export const ADMIN_TYPE_CSS_CLASSES = {
  SUPER_ADMIN: 'badge-danger',
  SYSTEM_ADMIN: 'badge-primary',
  CONTENT_ADMIN: 'badge-success',
  SUPPORT_ADMIN: 'badge-warning',
  SALES_ADMIN: 'badge-purple',
  MARKETING_ADMIN: 'badge-pink',
} as const;

// টাইপ গ্রুপ
export const ADMIN_TYPE_GROUPS = {
  SYSTEM_ADMINS: ['super_admin', 'system_admin'],
  OPERATIONAL_ADMINS: ['content_admin', 'support_admin'],
  BUSINESS_ADMINS: ['sales_admin', 'marketing_admin'],
} as const;

// টাইপ ভ্যালিডেশন রুলস
export const ADMIN_TYPE_VALIDATION = {
  SUPER_ADMIN: {
    canCreateAdmin: true,
    canDeleteAdmin: true,
    canModifySystem: true,
    canAccessAll: true,
    maxAdmins: 2,
  },
  SYSTEM_ADMIN: {
    canCreateAdmin: false,
    canDeleteAdmin: false,
    canModifySystem: true,
    canAccessAll: false,
    maxAdmins: 5,
  },
  CONTENT_ADMIN: {
    canCreateAdmin: false,
    canDeleteAdmin: false,
    canModifySystem: false,
    canAccessAll: false,
    maxAdmins: 10,
  },
  SUPPORT_ADMIN: {
    canCreateAdmin: false,
    canDeleteAdmin: false,
    canModifySystem: false,
    canAccessAll: false,
    maxAdmins: 10,
  },
  SALES_ADMIN: {
    canCreateAdmin: false,
    canDeleteAdmin: false,
    canModifySystem: false,
    canAccessAll: false,
    maxAdmins: 8,
  },
  MARKETING_ADMIN: {
    canCreateAdmin: false,
    canDeleteAdmin: false,
    canModifySystem: false,
    canAccessAll: false,
    maxAdmins: 8,
  },
} as const;

// টাইপের জন্য ইমোজি
export const ADMIN_TYPE_EMOJIS = {
  SUPER_ADMIN: '⭐',
  SYSTEM_ADMIN: '🔧',
  CONTENT_ADMIN: '📄',
  SUPPORT_ADMIN: '💬',
  SALES_ADMIN: '💎',
  MARKETING_ADMIN: '📊',
} as const;

// টাইপ অনুযায়ী ডিফল্ট রোল
export const ADMIN_TYPE_DEFAULT_ROLES = {
  SUPER_ADMIN: 'super_admin',
  SYSTEM_ADMIN: 'system_admin',
  CONTENT_ADMIN: 'editor',
  SUPPORT_ADMIN: 'support',
  SALES_ADMIN: 'sales',
  MARKETING_ADMIN: 'marketing',
} as const;
