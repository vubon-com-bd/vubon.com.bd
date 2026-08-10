// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Maximum activity history entries per user
 */
export const USER_ACTIVITY_MAX_HISTORY = 100;

/**
 * Activity retention period in days (90 days)
 */
export const USER_ACTIVITY_RETENTION_DAYS = 90;

/**
 * Batch size for processing activities (how many to save at once)
 */
export const USER_ACTIVITY_BATCH_SIZE = 50;

/**
 * Whether to save activities asynchronously
 */
export const USER_ACTIVITY_ASYNC_SAVE = true;

/**
 * Activity types
 */
export const USER_ACTIVITY_TYPES = [
  'login',
  'logout',
  'profile_update',
  'password_change',
  'email_verification',
  'phone_verification',
  'two_fa_enabled',
  'two_fa_disabled',
  'device_added',
  'device_removed',
  'address_added',
  'address_updated',
  'address_removed',
  'contact_added',
  'contact_updated',
  'contact_removed',
  'settings_updated',
  'preferences_updated',
  'kyc_submitted',
  'kyc_verified',
  'kyc_rejected',
  'order_placed',
  'order_cancelled',
  'payment_made',
  'refund_requested',
  'support_ticket_created',
] as const;

/**
 * User activity configuration
 */
export const USER_ACTIVITY_CONFIG = {
  MAX_HISTORY: USER_ACTIVITY_MAX_HISTORY,
  RETENTION_DAYS: USER_ACTIVITY_RETENTION_DAYS,
  BATCH_SIZE: USER_ACTIVITY_BATCH_SIZE,
  ASYNC_SAVE: USER_ACTIVITY_ASYNC_SAVE,
  TYPES: USER_ACTIVITY_TYPES,
} as const;

/**
 * Type for activity type
 */
export type UserActivityType = (typeof USER_ACTIVITY_TYPES)[number];

/**
 * Type for user activity configuration
 */
export type UserActivityConfig = typeof USER_ACTIVITY_CONFIG;
