/**
 * User Profile Constants (EXTENDS common/types)
 * @module shared-constants/user/user-profile.constants
 */

import { TYPES } from '../common/types.constants';

export const USER_PROFILE = {
  // Base types from common
  ...TYPES,

  // Profile fields
  FIELDS: {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    FULL_NAME: 'fullName',
    DISPLAY_NAME: 'displayName',
    USERNAME: 'username',
    EMAIL: 'email',
    PHONE: 'phone',
    DATE_OF_BIRTH: 'dateOfBirth',
    GENDER: 'gender',
    NATIONALITY: 'nationality',
    NID: 'nid',
    TIN: 'tin',
    BIN: 'bin',
    PASSPORT: 'passport',
    DRIVING_LICENSE: 'drivingLicense',
    BIRTH_CERTIFICATE: 'birthCertificate',
    ADDRESS: 'address',
    CITY: 'city',
    STATE: 'state',
    COUNTRY: 'country',
    POSTAL_CODE: 'postalCode',
    PROFILE_PICTURE: 'profilePicture',
    COVER_PICTURE: 'coverPicture',
    BIO: 'bio',
    WEBSITE: 'website',
    SOCIAL_LINKS: 'socialLinks',
    PREFERENCES: 'preferences',
    SETTINGS: 'settings',
    METADATA: 'metadata',
    TAGS: 'tags',
    CATEGORIES: 'categories',
  } as const,

  // Profile visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    CONTACTS: 'contacts',
    FRIENDS: 'friends',
    FOLLOWERS: 'followers',
    ONLY_ME: 'only_me',
    CUSTOM: 'custom',
  } as const,

  // Profile status
  STATUS: {
    COMPLETE: 'complete',
    INCOMPLETE: 'incomplete',
    PENDING: 'pending',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    LOCKED: 'locked',
    HIDDEN: 'hidden',
  } as const,

  // Profile sections
  SECTIONS: {
    BASIC: 'basic',
    CONTACT: 'contact',
    ADDRESS: 'address',
    SOCIAL: 'social',
    PROFESSIONAL: 'professional',
    EDUCATIONAL: 'educational',
    PERSONAL: 'personal',
    DOCUMENTS: 'documents',
    PREFERENCES: 'preferences',
    SETTINGS: 'settings',
  } as const,

  // Profile validation
  VALIDATION: {
    MAX_BIO_LENGTH: 500,
    MAX_WEBSITE_LENGTH: 255,
    MAX_SOCIAL_LINKS: 10,
    MAX_TAGS: 20,
    MAX_CATEGORIES: 10,
    MIN_AGE: 13,
    MAX_AGE: 120,
    ALLOWED_GENDERS: ['male', 'female', 'other', 'prefer_not_to_say'],
  },

  // Profile defaults
  DEFAULTS: {
    VISIBILITY: 'public',
    STATUS: 'incomplete',
    LANGUAGE: 'bn',
    TIMEZONE: 'Asia/Dhaka',
    CURRENCY: 'BDT',
  },
} as const;

export type ProfileField = (typeof USER_PROFILE.FIELDS)[keyof typeof USER_PROFILE.FIELDS];
export type ProfileVisibility =
  (typeof USER_PROFILE.VISIBILITY)[keyof typeof USER_PROFILE.VISIBILITY];
export type ProfileStatus = (typeof USER_PROFILE.STATUS)[keyof typeof USER_PROFILE.STATUS];
export type ProfileSection = (typeof USER_PROFILE.SECTIONS)[keyof typeof USER_PROFILE.SECTIONS];
