/**
 * User Contact Constants
 * ইউজার কন্টাক্ট সম্পর্কিত কনস্ট্যান্টস
 */

export const USER_CONTACT = {
  // Contact types
  TYPES: {
    EMAIL: 'email',
    PHONE: 'phone',
    MOBILE: 'mobile',
    WHATSAPP: 'whatsapp',
    VIBER: 'viber',
    TELEGRAM: 'telegram',
    MESSENGER: 'messenger',
    SOCIAL: 'social',
    WEBSITE: 'website',
    OTHER: 'other',
  },

  // Social platforms
  SOCIAL_PLATFORMS: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    LINKEDIN: 'linkedin',
    GITHUB: 'github',
    YOUTUBE: 'youtube',
    TIKTOK: 'tiktok',
    SNAPCHAT: 'snapchat',
    PINTEREST: 'pinterest',
    REDDIT: 'reddit',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    VIBER: 'viber',
    IMO: 'imo',
    MESSENGER: 'messenger',
  },

  // Contact visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    CONTACTS: 'contacts',
    FRIENDS: 'friends',
  },

  // Default values
  DEFAULTS: {
    IS_PRIMARY: false,
    IS_VERIFIED: false,
    VISIBILITY: 'private',
  },

  // Validation rules
  VALIDATION: {
    PHONE_REGEX: /^(?:\+880|880|0)(?:1[3-9]\d{8})$/,
    EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    URL_REGEX: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  },
} as const;

export type UserContactType = (typeof USER_CONTACT.TYPES)[keyof typeof USER_CONTACT.TYPES];
export type UserContactSocialPlatform =
  (typeof USER_CONTACT.SOCIAL_PLATFORMS)[keyof typeof USER_CONTACT.SOCIAL_PLATFORMS];
export type UserContactVisibility =
  (typeof USER_CONTACT.VISIBILITY)[keyof typeof USER_CONTACT.VISIBILITY];
