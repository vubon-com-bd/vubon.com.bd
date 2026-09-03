/**
 * User Activity Constants
 * ইউজার অ্যাক্টিভিটি সম্পর্কিত কনস্ট্যান্টস
 */

export const USER_ACTIVITY = {
  // Activity types
  TYPES: {
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    PROFILE_UPDATE: 'profile_update',
    PASSWORD_CHANGE: 'password_change',
    EMAIL_CHANGE: 'email_change',
    PHONE_CHANGE: 'phone_change',
    ADDRESS_CHANGE: 'address_change',
    SETTINGS_CHANGE: 'settings_change',
    PREFERENCE_CHANGE: 'preference_change',
    VERIFICATION: 'verification',
    KYC_SUBMIT: 'kyc_submit',
    KYC_VERIFY: 'kyc_verify',
    PAYMENT: 'payment',
    ORDER: 'order',
    REVIEW: 'review',
    COMMENT: 'comment',
    SHARE: 'share',
    LIKE: 'like',
    FOLLOW: 'follow',
    UNFOLLOW: 'unfollow',
    BLOCK: 'block',
    UNBLOCK: 'unblock',
    REPORT: 'report',
    EXPORT: 'export',
    IMPORT: 'import',
  },

  // Activity status
  STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    CANCELLED: 'cancelled',
  },

  // Activity importance
  IMPORTANCE: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Default values
  DEFAULTS: {
    MAX_RECORDS: 100,
    RETENTION_DAYS: 90,
    BATCH_SIZE: 50,
  },
} as const;

export type UserActivityType = (typeof USER_ACTIVITY.TYPES)[keyof typeof USER_ACTIVITY.TYPES];
export type UserActivityStatus = (typeof USER_ACTIVITY.STATUS)[keyof typeof USER_ACTIVITY.STATUS];
export type UserActivityImportance =
  (typeof USER_ACTIVITY.IMPORTANCE)[keyof typeof USER_ACTIVITY.IMPORTANCE];
