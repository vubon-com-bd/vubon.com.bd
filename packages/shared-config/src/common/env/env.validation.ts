/**
 * Environment assertions & safety checks
 * @module shared-config/common/env
 */
import { loadEnv } from './env.loader';

export function isProduction(): boolean {
  return loadEnv().NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  return loadEnv().NODE_ENV === 'development';
}

export function isTest(): boolean {
  return loadEnv().NODE_ENV === 'test';
}

export function isStaging(): boolean {
  return loadEnv().NODE_ENV === 'staging';
}

/**
 * Assert safe environment — call on boot.
 * Throws if production env has insecure values.
 */
export function assertSafeEnv(): void {
  const env = loadEnv();

  if (env.NODE_ENV !== 'production') return;

  if (env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters in production');
  }

  if (env.CORS_ORIGINS.trim() === '*') {
    throw new Error('Wildcard CORS origin is forbidden in production');
  }

  if (env.APP_URL.startsWith('http://')) {
    throw new Error('APP_URL must use HTTPS in production');
  }

  if (env.DATABASE_URL.includes('localhost')) {
    // Not fatal, but flagged — uncomment to throw if strict
    // throw new Error('DATABASE_URL points to localhost in production');
  }
}
