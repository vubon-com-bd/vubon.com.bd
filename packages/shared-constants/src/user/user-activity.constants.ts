/**
 * User Activity Constants
 * @module shared-constants/user/user-activity
 *
 * Note: Does NOT spread COMMON_TYPES — enum should contain only activity
 * names, not primitive type identifiers.
 */

export const USER_ACTIVITY = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTER: 'register',
  PURCHASE: 'purchase',
  VIEW: 'view',
  SEARCH: 'search',
  UPDATE_PROFILE: 'update_profile',
  PASSWORD_CHANGE: 'password_change',
  EMAIL_VERIFY: 'email_verify',
  PHONE_VERIFY: 'phone_verify',
} as const;

export type UserActivityType = (typeof USER_ACTIVITY)[keyof typeof USER_ACTIVITY];
