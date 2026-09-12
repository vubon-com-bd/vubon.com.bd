/**
 * User Contact Constants
 * @module shared-constants/user/user-contact
 */

export const USER_CONTACT = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  EMERGENCY: 'emergency',
  WORK: 'work',
  PERSONAL: 'personal',
} as const;

export type UserContactType = (typeof USER_CONTACT)[keyof typeof USER_CONTACT];
