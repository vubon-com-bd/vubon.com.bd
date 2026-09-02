/**
 * Auth OAuth Configuration
 * প্রমীকরণ OAuth কনফিগারেশন
 */

import { AUTH_OAUTH } from '@vubon/shared-constants';

export interface AuthOAuthConfig {
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
  defaultScopes: string[];
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
  stateExpiry: number;
}

export const createAuthOAuthConfig = (options: {
  google?: { clientId: string; clientSecret: string; redirectUri: string };
  facebook?: { clientId: string; clientSecret: string; redirectUri: string };
  github?: { clientId: string; clientSecret: string; redirectUri: string };
}): AuthOAuthConfig => ({
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
  defaultScopes: ['email', 'profile'],
  accessTokenExpiry: AUTH_OAUTH.DEFAULTS.ACCESS_TOKEN_EXPIRY,
  refreshTokenExpiry: AUTH_OAUTH.DEFAULTS.REFRESH_TOKEN_EXPIRY,
  stateExpiry: AUTH_OAUTH.DEFAULTS.STATE_EXPIRY,
});
