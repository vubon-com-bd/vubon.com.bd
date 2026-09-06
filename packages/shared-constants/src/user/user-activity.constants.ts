/**
 * User Activity Constants (EXTENDS common/types)
 * @module shared-constants/user/user-activity.constants
 */

import { TYPES } from '../common/types.constants';

export const USER_ACTIVITY = {
  // Base types from common
  ...TYPES,

  // Activity types
  TYPES: {
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    UPDATE_PROFILE: 'update_profile',
    CHANGE_PASSWORD: 'change_password',
    RESET_PASSWORD: 'reset_password',
    VERIFY_EMAIL: 'verify_email',
    VERIFY_PHONE: 'verify_phone',
    UPDATE_SETTINGS: 'update_settings',
    UPDATE_PREFERENCES: 'update_preferences',
    VIEW_PAGE: 'view_page',
    SEARCH: 'search',
    ADD_TO_CART: 'add_to_cart',
    REMOVE_FROM_CART: 'remove_from_cart',
    CHECKOUT: 'checkout',
    PLACE_ORDER: 'place_order',
    CANCEL_ORDER: 'cancel_order',
    RETURN_ORDER: 'return_order',
    ADD_REVIEW: 'add_review',
    UPDATE_REVIEW: 'update_review',
    DELETE_REVIEW: 'delete_review',
    ADD_WISHLIST: 'add_wishlist',
    REMOVE_WISHLIST: 'remove_wishlist',
    FOLLOW: 'follow',
    UNFOLLOW: 'unfollow',
    LIKE: 'like',
    UNLIKE: 'unlike',
    COMMENT: 'comment',
    DELETE_COMMENT: 'delete_comment',
    SHARE: 'share',
    DOWNLOAD: 'download',
    UPLOAD: 'upload',
    EXPORT: 'export',
    IMPORT: 'import',
    BULK_ACTION: 'bulk_action',
    API_ACCESS: 'api_access',
    WEBHOOK: 'webhook',
    PAYMENT: 'payment',
    WITHDRAW: 'withdraw',
    DEPOSIT: 'deposit',
    TRANSFER: 'transfer',
    REFERRAL: 'referral',
    ACHIEVEMENT: 'achievement',
    MESSAGE: 'message',
    NOTIFICATION: 'notification',
  } as const,

  // Activity status
  STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    BLOCKED: 'blocked',
    SUSPICIOUS: 'suspicious',
    ANOMALOUS: 'anomalous',
  } as const,

  // Activity importance
  IMPORTANCE: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Activity frequency
  FREQUENCY: {
    ONCE: 'once',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
    ALWAYS: 'always',
  } as const,

  // Activity categories
  CATEGORIES: {
    AUTH: 'auth',
    PROFILE: 'profile',
    SHOPPING: 'shopping',
    ORDER: 'order',
    PAYMENT: 'payment',
    SOCIAL: 'social',
    CONTENT: 'content',
    SYSTEM: 'system',
    SECURITY: 'security',
    ADMIN: 'admin',
    ANALYTICS: 'analytics',
    INTEGRATION: 'integration',
  } as const,

  // Activity tracking
  TRACKING: {
    TRACK_IP: true,
    TRACK_DEVICE: true,
    TRACK_LOCATION: true,
    TRACK_USER_AGENT: true,
    TRACK_REFERRER: true,
    TRACK_SESSION: true,
    TRACK_DURATION: true,
    TRACK_ACTIONS: true,
    MAX_HISTORY: 1000,
    RETENTION_DAYS: 90,
  },

  // Activity limits
  LIMITS: {
    MAX_ACTIVITIES_PER_DAY: 1000,
    MAX_ACTIVITIES_PER_SESSION: 100,
    MAX_UNIQUE_ACTIVITIES: 50,
    MAX_LOGIN_ATTEMPTS: 5,
    MAX_FAILED_ATTEMPTS: 3,
  },

  // Default values
  DEFAULTS: {
    STATUS: 'success',
    IMPORTANCE: 'medium',
    FREQUENCY: 'once',
    CATEGORY: 'system',
  },
} as const;

export type UserActivityType = (typeof USER_ACTIVITY.TYPES)[keyof typeof USER_ACTIVITY.TYPES];
export type UserActivityStatus = (typeof USER_ACTIVITY.STATUS)[keyof typeof USER_ACTIVITY.STATUS];
export type UserActivityImportance =
  (typeof USER_ACTIVITY.IMPORTANCE)[keyof typeof USER_ACTIVITY.IMPORTANCE];
export type UserActivityFrequency =
  (typeof USER_ACTIVITY.FREQUENCY)[keyof typeof USER_ACTIVITY.FREQUENCY];
export type UserActivityCategory =
  (typeof USER_ACTIVITY.CATEGORIES)[keyof typeof USER_ACTIVITY.CATEGORIES];
