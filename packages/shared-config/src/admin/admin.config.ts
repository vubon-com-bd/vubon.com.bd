/**
 * Admin Configuration
 * অ্যাডমিন কনফিগারেশন
 */

import { ADMIN } from '@vubon/shared-constants';

export interface AdminConfig {
  enabled: boolean;
  defaultRole: string;
  defaultStatus: string;
  defaultLevel: string;
  maxAdmins: number;
  sessionTimeout: number;
  refreshTokenExpiry: number;
  verificationExpiry: number;
  mfaCodeExpiry: number;
  loginAttemptLimit: number;
  lockoutDuration: number;
  maxSessions: number;
  validation: {
    nameMinLength: number;
    nameMaxLength: number;
    bioMaxLength: number;
    usernameMinLength: number;
    usernameMaxLength: number;
  };
  defaults: {
    avatar: string;
    timezone: string;
    language: string;
    itemsPerPage: number;
  };
}

export const createAdminConfig = (): AdminConfig => ({
  enabled: true,
  defaultRole: ADMIN.ROLES.ADMIN,
  defaultStatus: ADMIN.STATUS.ACTIVE,
  defaultLevel: ADMIN.LEVELS.LEVEL_1,
  maxAdmins: 100,
  sessionTimeout: 3600,
  refreshTokenExpiry: 604800,
  verificationExpiry: 86400,
  mfaCodeExpiry: 300,
  loginAttemptLimit: 5,
  lockoutDuration: 900,
  maxSessions: 10,
  validation: {
    nameMinLength: 2,
    nameMaxLength: 100,
    bioMaxLength: 500,
    usernameMinLength: 3,
    usernameMaxLength: 30,
  },
  defaults: {
    avatar: ADMIN.DEFAULTS.AVATAR,
    timezone: ADMIN.DEFAULTS.TIMEZONE,
    language: ADMIN.DEFAULTS.LANGUAGE,
    itemsPerPage: ADMIN.DEFAULTS.ITEMS_PER_PAGE,
  },
});
