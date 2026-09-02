/**
 * Auth JWT Configuration
 * প্রমীকরণ JWT কনফিগারেশন
 */

import { AUTH_TOKEN } from '@vubon/shared-constants';

export interface AuthJwtConfig {
  secret: string;
  refreshSecret: string;
  accessExpiry: number;
  refreshExpiry: number;
  issuer: string;
  audience: string;
  algorithm: string;
}

export const createAuthJwtConfig = (options: {
  secret: string;
  refreshSecret: string;
  issuer?: string;
  audience?: string;
}): AuthJwtConfig => ({
  secret: options.secret,
  refreshSecret: options.refreshSecret,
  accessExpiry: AUTH_TOKEN.EXPIRY.ACCESS,
  refreshExpiry: AUTH_TOKEN.EXPIRY.REFRESH,
  issuer: options.issuer || 'vubon-platform',
  audience: options.audience || 'vubon-users',
  algorithm: 'HS256',
});
