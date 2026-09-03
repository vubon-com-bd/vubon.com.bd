/**
 * Contact Configuration
 * ইউজার কন্টাক্ট কনফিগারেশন
 */

import { USER_CONTACT } from '@vubon/shared-constants';

export interface ContactConfig {
  enabled: boolean;
  types: string[];
  socialPlatforms: string[];
  visibility: string[];
  validation: {
    phoneRegex: RegExp;
    emailRegex: RegExp;
    urlRegex: RegExp;
  };
  defaults: {
    isPrimary: boolean;
    isVerified: boolean;
    visibility: string;
  };
  maxContactsPerUser: number;
}

export const createContactConfig = (): ContactConfig => ({
  enabled: true,
  types: Object.values(USER_CONTACT.TYPES),
  socialPlatforms: Object.values(USER_CONTACT.SOCIAL_PLATFORMS),
  visibility: Object.values(USER_CONTACT.VISIBILITY),
  validation: {
    phoneRegex: USER_CONTACT.VALIDATION.PHONE_REGEX,
    emailRegex: USER_CONTACT.VALIDATION.EMAIL_REGEX,
    urlRegex: USER_CONTACT.VALIDATION.URL_REGEX,
  },
  defaults: {
    isPrimary: USER_CONTACT.DEFAULTS.IS_PRIMARY,
    isVerified: USER_CONTACT.DEFAULTS.IS_VERIFIED,
    visibility: USER_CONTACT.DEFAULTS.VISIBILITY,
  },
  maxContactsPerUser: 10,
});
