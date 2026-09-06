/**
 * Auth Social Constants (EXTENDS common/types)
 * @module shared-constants/auth/auth-social.constants
 */

import { TYPES } from '../common/types.constants';

export const AUTH_SOCIAL = {
  // Base types
  ...TYPES,

  // Social providers
  PROVIDERS: {
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    APPLE: 'apple',
    MICROSOFT: 'microsoft',
    GITHUB: 'github',
    TWITTER: 'twitter',
    LINKEDIN: 'linkedin',
    INSTAGRAM: 'instagram',
    SAMSUNG: 'samsung',
    YAHOO: 'yahoo',
    AMAZON: 'amazon',
    DISCORD: 'discord',
    SPOTIFY: 'spotify',
    TIKTOK: 'tiktok',
    TELEGRAM: 'telegram',
    WHATSAPP: 'whatsapp',
  } as const,

  // Social status
  STATUS: {
    LINKED: 'linked',
    UNLINKED: 'unlinked',
    PENDING: 'pending',
    VERIFIED: 'verified',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
  } as const,

  // Social scopes
  SCOPES: {
    EMAIL: 'email',
    PROFILE: 'profile',
    PHONE: 'phone',
    ADDRESS: 'address',
    BIRTHDAY: 'birthday',
    PICTURE: 'picture',
    FRIENDS: 'friends',
    POSTS: 'posts',
    READ: 'read',
    WRITE: 'write',
    ADMIN: 'admin',
  } as const,

  // Social settings
  SETTINGS: {
    ALLOW_EMAIL_ACCESS: true,
    ALLOW_PROFILE_ACCESS: true,
    ALLOW_PHONE_ACCESS: false,
    ALLOW_ADDRESS_ACCESS: false,
    ALLOW_BIRTHDAY_ACCESS: false,
    ALLOW_FRIENDS_ACCESS: false,
    ALLOW_POSTS_ACCESS: false,
    MAX_LINKED_ACCOUNTS: 5,
  },
} as const;

export type SocialProvider = (typeof AUTH_SOCIAL.PROVIDERS)[keyof typeof AUTH_SOCIAL.PROVIDERS];
export type SocialStatus = (typeof AUTH_SOCIAL.STATUS)[keyof typeof AUTH_SOCIAL.STATUS];
export type SocialScope = (typeof AUTH_SOCIAL.SCOPES)[keyof typeof AUTH_SOCIAL.SCOPES];
