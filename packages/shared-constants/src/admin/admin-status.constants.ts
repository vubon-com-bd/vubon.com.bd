/**
 * অ্যাডমিনের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// অ্যাডমিনের স্ট্যাটাস
export const ADMIN_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  LOCKED: 'locked',
  DELETED: 'deleted',
} as const;

// স্ট্যাটাসের কালার কোড
export const ADMIN_STATUS_COLORS = {
  ACTIVE: '#22C55E', // সবুজ
  INACTIVE: '#94A3B8', // ধূসর
  SUSPENDED: '#F59E0B', // কমলা
  PENDING: '#3B82F6', // নীল
  LOCKED: '#EF4444', // লাল
  DELETED: '#6B7280', // গাঢ় ধূসর
} as const;

// স্ট্যাটাসের আইকন
export const ADMIN_STATUS_ICONS = {
  ACTIVE: '✅',
  INACTIVE: '⭕',
  SUSPENDED: '⚠️',
  PENDING: '⏳',
  LOCKED: '🔒',
  DELETED: '🗑️',
} as const;

// স্ট্যাটাস পরিবর্তনের অনুমতি
export const ADMIN_STATUS_TRANSITIONS = {
  ACTIVE: ['inactive', 'suspended', 'deleted'],
  INACTIVE: ['active', 'deleted'],
  SUSPENDED: ['active', 'inactive', 'deleted'],
  PENDING: ['active', 'inactive', 'deleted'],
  LOCKED: ['active', 'inactive', 'deleted'],
  DELETED: [],
} as const;

// ডিফল্ট স্ট্যাটাস
export const DEFAULT_ADMIN_STATUS = 'pending';

// স্ট্যাটাসের প্রায়োরিটি লেভেল (১ = সর্বোচ্চ)
export const ADMIN_STATUS_PRIORITY = {
  ACTIVE: 1,
  PENDING: 2,
  SUSPENDED: 3,
  LOCKED: 4,
  INACTIVE: 5,
  DELETED: 6,
} as const;

// স্ট্যাটাসের টাইমআউট (সাসপেন্ডের জন্য) - ৩০ দিন
export const ADMIN_SUSPEND_TIMEOUT = 30 * 24 * 60 * 60 * 1000;

// স্ট্যাটাসের টাইমআউট (লকের জন্য) - ১৫ মিনিট
export const ADMIN_LOCK_TIMEOUT = 15 * 60 * 1000;

// স্ট্যাটাসের টাইমআউট (পেন্ডিংয়ের জন্য) - ৭ দিন
export const ADMIN_PENDING_TIMEOUT = 7 * 24 * 60 * 60 * 1000;

// স্ট্যাটাস লেবেল (বাংলা)
export const ADMIN_STATUS_LABELS_BN = {
  ACTIVE: 'সক্রিয়',
  INACTIVE: 'নিষ্ক্রিয়',
  SUSPENDED: 'স্থগিত',
  PENDING: 'মুলতুবি',
  LOCKED: 'লককৃত',
  DELETED: 'মুছে ফেলা',
} as const;

// স্ট্যাটাস লেবেল (ইংরেজি)
export const ADMIN_STATUS_LABELS_EN = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  SUSPENDED: 'Suspended',
  PENDING: 'Pending',
  LOCKED: 'Locked',
  DELETED: 'Deleted',
} as const;

// স্ট্যাটাসের জন্য CSS ক্লাস
export const ADMIN_STATUS_CSS_CLASSES = {
  ACTIVE: 'badge-success',
  INACTIVE: 'badge-secondary',
  SUSPENDED: 'badge-warning',
  PENDING: 'badge-info',
  LOCKED: 'badge-danger',
  DELETED: 'badge-dark',
} as const;

// স্ট্যাটাস অনুযায়ী অ্যাকশন
export const ADMIN_STATUS_ACTIONS = {
  ACTIVE: ['deactivate', 'suspend', 'delete'],
  INACTIVE: ['activate', 'delete'],
  SUSPENDED: ['activate', 'deactivate', 'delete'],
  PENDING: ['activate', 'deactivate', 'delete'],
  LOCKED: ['activate', 'deactivate', 'delete'],
  DELETED: [],
} as const;

// স্ট্যাটাস ভ্যালিডেশন রুলস
export const ADMIN_STATUS_VALIDATION = {
  ACTIVE: {
    canLogin: true,
    canAccess: true,
    canModify: true,
    canDelete: true,
  },
  INACTIVE: {
    canLogin: false,
    canAccess: false,
    canModify: true,
    canDelete: true,
  },
  SUSPENDED: {
    canLogin: false,
    canAccess: false,
    canModify: true,
    canDelete: true,
  },
  PENDING: {
    canLogin: false,
    canAccess: false,
    canModify: true,
    canDelete: true,
  },
  LOCKED: {
    canLogin: false,
    canAccess: false,
    canModify: true,
    canDelete: true,
  },
  DELETED: {
    canLogin: false,
    canAccess: false,
    canModify: false,
    canDelete: false,
  },
} as const;

// স্ট্যাটাস গ্রুপ
export const ADMIN_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'pending'],
  INACTIVE_STATUSES: ['inactive', 'suspended', 'locked'],
  DELETED_STATUSES: ['deleted'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const ADMIN_STATUS_EMOJIS = {
  ACTIVE: '🟢',
  INACTIVE: '⚪',
  SUSPENDED: '🟡',
  PENDING: '🔵',
  LOCKED: '🔴',
  DELETED: '⚫',
} as const;
