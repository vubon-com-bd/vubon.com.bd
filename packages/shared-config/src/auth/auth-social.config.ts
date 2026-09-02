/**
 * Auth Social Configuration
 * প্রমীকরণ সোশ্যাল কনফিগারেশন
 */

import { AUTH_SOCIAL } from '@vubon/shared-constants';

export interface AuthSocialConfig {
  enabled: boolean;
  providers: {
    google?: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      scopes: string[];
    };
    facebook?: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      scopes: string[];
    };
    github?: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      scopes: string[];
    };
    linkedin?: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      scopes: string[];
    };
    twitter?: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      scopes: string[];
    };
    microsoft?: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      scopes: string[];
    };
    apple?: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      scopes: string[];
    };
  };
  autoLink: boolean;
  createAccount: boolean;
  sendWelcomeEmail: boolean;
  requestEmail: boolean;
  requestProfile: boolean;
}

export const createAuthSocialConfig = (options: {
  google?: { clientId: string; clientSecret: string; redirectUri: string };
  facebook?: { clientId: string; clientSecret: string; redirectUri: string };
  github?: { clientId: string; clientSecret: string; redirectUri: string };
}): AuthSocialConfig => ({
  enabled: true,
  providers: {
    google: options.google
      ? {
          ...options.google,
          scopes: ['email', 'profile', 'openid'],
        }
      : undefined,
    facebook: options.facebook
      ? {
          ...options.facebook,
          scopes: ['email', 'public_profile'],
        }
      : undefined,
    github: options.github
      ? {
          ...options.github,
          scopes: ['user:email', 'read:user'],
        }
      : undefined,
  },
  autoLink: AUTH_SOCIAL.DEFAULTS.AUTO_LINK,
  createAccount: AUTH_SOCIAL.DEFAULTS.CREATE_ACCOUNT,
  sendWelcomeEmail: AUTH_SOCIAL.DEFAULTS.SEND_WELCOME_EMAIL,
  requestEmail: AUTH_SOCIAL.DEFAULTS.REQUEST_EMAIL,
  requestProfile: AUTH_SOCIAL.DEFAULTS.REQUEST_PROFILE,
});
