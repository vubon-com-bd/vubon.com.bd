/**
 * User Preferences Constants
 * @module shared-constants/user/user-preferences
 */

export const USER_PREFERENCES = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  IN_APP: 'in_app',
  NEWSLETTER: 'newsletter',
  PROMOTIONS: 'promotions',
  ORDER_UPDATES: 'order_updates',
} as const;

export type UserPreferenceType = (typeof USER_PREFERENCES)[keyof typeof USER_PREFERENCES];
