/**
 * SSO Configuration
 * এসএসও কনফিগারেশন
 */
export interface SSOConfig {
  enabled: boolean;
  providers: {
    google: boolean;
    facebook: boolean;
    github: boolean;
    microsoft: boolean;
    custom: boolean;
  };
  google: {
    clientId: string;
    clientSecret: string;
    callbackURL: string;
    scope: string[];
  };
  facebook: {
    clientId: string;
    clientSecret: string;
    callbackURL: string;
    scope: string[];
  };
  github: {
    clientId: string;
    clientSecret: string;
    callbackURL: string;
    scope: string[];
  };
  microsoft: {
    clientId: string;
    clientSecret: string;
    callbackURL: string;
    tenant: string;
    scope: string[];
  };
  session: {
    autoLogin: boolean;
    syncProfile: boolean;
    syncEmail: boolean;
  };
}

export const createSSOConfig = (): SSOConfig => ({
  enabled: true,
  providers: {
    google: true,
    facebook: false,
    github: false,
    microsoft: false,
    custom: false,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
    scope: ['profile', 'email'],
  },
  facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    callbackURL:
      process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/auth/facebook/callback',
    scope: ['email', 'public_profile'],
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',
    scope: ['user:email'],
  },
  microsoft: {
    clientId: process.env.MICROSOFT_CLIENT_ID || '',
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
    callbackURL:
      process.env.MICROSOFT_CALLBACK_URL || 'http://localhost:3000/auth/microsoft/callback',
    tenant: 'common',
    scope: ['openid', 'profile', 'email'],
  },
  session: {
    autoLogin: true,
    syncProfile: true,
    syncEmail: true,
  },
});
