/**
 * Profile Configuration
 * ইউজার প্রোফাইল কনফিগারেশন
 */

import { USER_PROFILE } from '@vubon/shared-constants';

export interface ProfileConfig {
  enabled: boolean;
  visibility: {
    default: string;
    options: string[];
  };
  gender: {
    options: string[];
    default: string;
  };
  validation: {
    bioMaxLength: number;
    locationMaxLength: number;
    websiteMaxLength: number;
    companyMaxLength: number;
    positionMaxLength: number;
  };
  defaults: {
    bio: string;
    avatar: string;
    cover: string;
  };
}

export const createProfileConfig = (): ProfileConfig => ({
  enabled: true,
  visibility: {
    default: USER_PROFILE.DEFAULTS.VISIBILITY,
    options: Object.values(USER_PROFILE.VISIBILITY),
  },
  gender: {
    options: Object.values(USER_PROFILE.GENDER),
    default: USER_PROFILE.DEFAULTS.GENDER,
  },
  validation: {
    bioMaxLength: USER_PROFILE.VALIDATION.BIO_MAX_LENGTH,
    locationMaxLength: USER_PROFILE.VALIDATION.LOCATION_MAX_LENGTH,
    websiteMaxLength: USER_PROFILE.VALIDATION.WEBSITE_MAX_LENGTH,
    companyMaxLength: USER_PROFILE.VALIDATION.COMPANY_MAX_LENGTH,
    positionMaxLength: USER_PROFILE.VALIDATION.POSITION_MAX_LENGTH,
  },
  defaults: {
    bio: USER_PROFILE.DEFAULTS.BIO,
    avatar: USER_PROFILE.DEFAULTS.AVATAR,
    cover: USER_PROFILE.DEFAULTS.COVER,
  },
});
