/**
 * User Constants - Base
 * ইউজার সম্পর্কিত মূল কনস্ট্যান্টস
 */

export const USER = {
  TYPES: {
    REGULAR: 'regular',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    VIP: 'vip',
    GUEST: 'guest',
    FREE: 'free',
    TRIAL: 'trial',
    PRO: 'pro',
    BUSINESS: 'business',
    AGENCY: 'agency',
  },

  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DELETED: 'deleted',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    LOCKED: 'locked',
    RESTRICTED: 'restricted',
  },

  ROLES: {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    USER: 'user',
    VENDOR: 'vendor',
    GUEST: 'guest',
    MANAGER: 'manager',
    SUPPORT: 'support',
    DELIVERY_AGENT: 'delivery_agent',
  },

  DEFAULTS: {
    AVATAR: 'default-avatar.png',
    COVER: 'default-cover.jpg',
    TIMEZONE: 'Asia/Dhaka',
    LANGUAGE: 'bn',
    CURRENCY: 'BDT',
    ITEMS_PER_PAGE: 10,
  },

  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    BIO_MAX_LENGTH: 500,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 30,
    PASSWORD_MIN_LENGTH: 8,
  },
} as const;
