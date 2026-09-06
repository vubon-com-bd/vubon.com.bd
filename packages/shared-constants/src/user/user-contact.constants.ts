/**
 * User Contact Constants (EXTENDS common/types)
 * @module shared-constants/user/user-contact.constants
 */

import { TYPES } from '../common/types.constants';

export const USER_CONTACT = {
  // Base types from common
  ...TYPES,

  // Contact types
  TYPES: {
    EMAIL: 'email',
    PHONE: 'phone',
    MOBILE: 'mobile',
    HOME: 'home',
    WORK: 'work',
    FAX: 'fax',
    SKYPE: 'skype',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    VIBER: 'viber',
    IMESSAGE: 'imessage',
    SIGNAL: 'signal',
    DISCORD: 'discord',
    SLACK: 'slack',
    TEAMS: 'teams',
    ZOOM: 'zoom',
    MEET: 'meet',
    OTHER: 'other',
  } as const,

  // Contact status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DEFAULT: 'default',
  } as const,

  // Contact fields
  FIELDS: {
    EMAIL: 'email',
    PHONE: 'phone',
    COUNTRY_CODE: 'countryCode',
    EXTENSION: 'extension',
    LABEL: 'label',
    IS_PRIMARY: 'isPrimary',
    IS_VERIFIED: 'isVerified',
    VERIFIED_AT: 'verifiedAt',
    PREFERRED: 'preferred',
    NOTES: 'notes',
  } as const,

  // Contact validation
  VALIDATION: {
    MAX_EMAILS_PER_USER: 5,
    MAX_PHONES_PER_USER: 5,
    MAX_CONTACTS_PER_USER: 20,
    MIN_EMAIL_LENGTH: 5,
    MAX_EMAIL_LENGTH: 254,
    MIN_PHONE_LENGTH: 10,
    MAX_PHONE_LENGTH: 15,
    BD_PHONE_FORMAT: /^(?:\+880|0|88)?(1[3-9]\d{8})$/,
    EMAIL_FORMAT: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },

  // Contact preferences
  PREFERENCES: {
    COMMUNICATION_CHANNELS: {
      PRIMARY: 'email',
      SECONDARY: 'phone',
      EMERGENCY: 'phone',
      MARKETING: 'email',
      TRANSACTIONAL: 'email',
      SUPPORT: 'phone',
    },
    PREFERRED_LANGUAGE: 'bn',
    PREFERRED_TIMEZONE: 'Asia/Dhaka',
  },

  // Default values
  DEFAULTS: {
    TYPE: 'email',
    STATUS: 'pending',
    IS_PRIMARY: false,
    IS_VERIFIED: false,
    PREFERRED: false,
  },
} as const;

export type UserContactType = (typeof USER_CONTACT.TYPES)[keyof typeof USER_CONTACT.TYPES];
export type UserContactStatus = (typeof USER_CONTACT.STATUS)[keyof typeof USER_CONTACT.STATUS];
export type UserContactField = (typeof USER_CONTACT.FIELDS)[keyof typeof USER_CONTACT.FIELDS];
