/**
 * Auth Social Constants
 * প্রমাণীকরণ সোশ্যাল মিডিয়া সম্পর্কিত কনস্ট্যান্টস
 */

import { AUTH_PROVIDER } from './auth-provider.constants';

export const AUTH_SOCIAL = {
  // Social providers
  PROVIDERS: {
    GOOGLE: AUTH_PROVIDER.GOOGLE,
    FACEBOOK: AUTH_PROVIDER.FACEBOOK,
    GITHUB: AUTH_PROVIDER.GITHUB,
    LINKEDIN: AUTH_PROVIDER.LINKEDIN,
    TWITTER: AUTH_PROVIDER.TWITTER,
    MICROSOFT: AUTH_PROVIDER.MICROSOFT,
    APPLE: AUTH_PROVIDER.APPLE,
  },

  // Social scopes
  SCOPES: {
    GOOGLE: ['email', 'profile', 'openid'],
    FACEBOOK: ['email', 'public_profile', 'user_birthday'],
    GITHUB: ['user:email', 'read:user'],
    LINKEDIN: ['r_emailaddress', 'r_liteprofile'],
    TWITTER: ['users.read', 'tweet.read'],
    MICROSOFT: ['User.Read', 'email', 'openid', 'profile'],
    APPLE: ['email', 'name'],
  },

  // Social fields
  FIELDS: {
    GOOGLE: ['id', 'email', 'name', 'picture', 'locale'],
    FACEBOOK: ['id', 'email', 'name', 'picture', 'birthday', 'gender'],
    GITHUB: ['id', 'email', 'name', 'avatar_url', 'bio'],
    LINKEDIN: ['id', 'email', 'firstName', 'lastName', 'profilePicture'],
    TWITTER: ['id', 'name', 'username', 'profile_image_url'],
    MICROSOFT: ['id', 'email', 'displayName', 'givenName', 'surname'],
    APPLE: ['id', 'email', 'name'],
  },

  // Default values
  DEFAULTS: {
    AUTO_LINK: true,
    CREATE_ACCOUNT: true,
    SEND_WELCOME_EMAIL: true,
    REQUEST_EMAIL: true,
    REQUEST_PROFILE: true,
  },
} as const;

export type AuthSocialProvider = keyof typeof AUTH_SOCIAL.PROVIDERS;
