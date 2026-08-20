/**
 * অ্যাডমিন সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

// অ্যাডমিন মডিউলের নাম
export const ADMIN_MODULE_NAME = 'admin';

// ডিফল্ট পেজিনেশন সাইজ
export const DEFAULT_PAGINATION_SIZE = 10;

// ডিফল্ট সর্টিং ফিল্ড
export const DEFAULT_SORTING_FIELD = 'createdAt';

// অ্যাডমিন আইডি প্রিফিক্স
export const ADMIN_ID_PREFIX = 'ADM';

// অ্যাডমিন ইমেইল ডোমেইন
export const ADMIN_EMAIL_DOMAIN = '@vubon.com';

// অ্যাডমিন পাসওয়ার্ড মিনিমাম লেন্থ
export const ADMIN_PASSWORD_MIN_LENGTH = 8;

// অ্যাডমিন প্রোফাইল ইমেজের সাইজ লিমিট (৫ এমবি)
export const ADMIN_PROFILE_IMAGE_SIZE_LIMIT = 5 * 1024 * 1024;

// অ্যাডমিন প্রোফাইল ইমেজের অনুমোদিত ফরম্যাটসমূহ
export const ADMIN_ALLOWED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp'];

// অ্যাডমিন সেশন টাইমআউট (১ ঘন্টা)
export const ADMIN_SESSION_TIMEOUT = 60 * 60 * 1000;

// অ্যাডমিন রিফ্রেশ টোকেন টাইমআউট (৭ দিন)
export const ADMIN_REFRESH_TOKEN_TIMEOUT = 7 * 24 * 60 * 60 * 1000;

// অ্যাডমিন লগিন চেষ্টার সর্বোচ্চ সংখ্যা
export const ADMIN_MAX_LOGIN_ATTEMPTS = 5;

// অ্যাডমিন লকআউট সময় (১৫ মিনিট)
export const ADMIN_LOCKOUT_TIME = 15 * 60 * 1000;

// অ্যাডমিন নামের মিনিমাম লেন্থ
export const ADMIN_NAME_MIN_LENGTH = 2;

// অ্যাডমিন নামের ম্যাক্সিমাম লেন্থ
export const ADMIN_NAME_MAX_LENGTH = 50;

// অ্যাডমিন ফোন নম্বর ফরম্যাট
export const ADMIN_PHONE_FORMAT = /^\+?[1-9]\d{1,14}$/;

// অ্যাডমিন ইমেইল ফরম্যাট
export const ADMIN_EMAIL_FORMAT = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// অ্যাডমিন স্ট্যাটাস
export const ADMIN_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  DELETED: 'deleted',
} as const;

// অ্যাডমিন টাইপ
export const ADMIN_TYPE = {
  SUPER_ADMIN: 'super_admin',
  SYSTEM_ADMIN: 'system_admin',
  SUPPORT_ADMIN: 'support_admin',
  CONTENT_ADMIN: 'content_admin',
} as const;

// অ্যাডমিন অ্যাকশন টাইপ
export const ADMIN_ACTION = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  VIEW: 'view',
  MANAGE: 'manage',
} as const;
