/**
 * User Configuration
 * ইউজার কনফিগারেশন
 */

import { USER } from '@vubon/shared-constants';

export interface UserConfig {
  enabled: boolean;
  defaultRole: string;
  defaultStatus: string;
  validation: {
    nameMinLength: number;
    nameMaxLength: number;
    bioMaxLength: number;
    usernameMinLength: number;
    usernameMaxLength: number;
  };
  defaults: {
    avatar: string;
    cover: string;
    timezone: string;
    language: string;
    currency: string;
    itemsPerPage: number;
  };
}

export const createUserConfig = (): UserConfig => ({
  enabled: true,
  defaultRole: USER.ROLES.USER,
  defaultStatus: USER.STATUS.ACTIVE,
  validation: {
    nameMinLength: USER.VALIDATION.NAME_MIN_LENGTH,
    nameMaxLength: USER.VALIDATION.NAME_MAX_LENGTH,
    bioMaxLength: USER.VALIDATION.BIO_MAX_LENGTH,
    usernameMinLength: USER.VALIDATION.USERNAME_MIN_LENGTH,
    usernameMaxLength: USER.VALIDATION.USERNAME_MAX_LENGTH,
  },
  defaults: {
    avatar: USER.DEFAULTS.AVATAR,
    cover: USER.DEFAULTS.COVER,
    timezone: USER.DEFAULTS.TIMEZONE,
    language: USER.DEFAULTS.LANGUAGE,
    currency: USER.DEFAULTS.CURRENCY,
    itemsPerPage: USER.DEFAULTS.ITEMS_PER_PAGE,
  },
});
