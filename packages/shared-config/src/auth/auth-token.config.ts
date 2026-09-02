/**
 * Auth Token Configuration
 * প্রমীকরণ টোকেন কনফিগারেশন
 */

import { AUTH_TOKEN } from '@vubon/shared-constants';

export interface AuthTokenConfig {
  access: {
    expiresIn: number;
    algorithm: string;
  };
  refresh: {
    expiresIn: number;
    algorithm: string;
  };
  verification: {
    expiresIn: number;
    algorithm: string;
  };
  passwordReset: {
    expiresIn: number;
    algorithm: string;
  };
  magicLink: {
    expiresIn: number;
    algorithm: string;
  };
  mfa: {
    expiresIn: number;
    algorithm: string;
  };
  apiKey: {
    expiresIn: number;
    algorithm: string;
  };
}

export const createAuthTokenConfig = (): AuthTokenConfig => ({
  access: {
    expiresIn: AUTH_TOKEN.EXPIRY.ACCESS,
    algorithm: 'HS256',
  },
  refresh: {
    expiresIn: AUTH_TOKEN.EXPIRY.REFRESH,
    algorithm: 'HS256',
  },
  verification: {
    expiresIn: AUTH_TOKEN.EXPIRY.VERIFICATION,
    algorithm: 'HS256',
  },
  passwordReset: {
    expiresIn: AUTH_TOKEN.EXPIRY.PASSWORD_RESET,
    algorithm: 'HS256',
  },
  magicLink: {
    expiresIn: AUTH_TOKEN.EXPIRY.MAGIC_LINK,
    algorithm: 'HS256',
  },
  mfa: {
    expiresIn: AUTH_TOKEN.EXPIRY.MFA,
    algorithm: 'HS256',
  },
  apiKey: {
    expiresIn: AUTH_TOKEN.EXPIRY.API_KEY,
    algorithm: 'HS256',
  },
});
