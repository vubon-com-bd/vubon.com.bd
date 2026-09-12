/**
 * Auth Session Constants
 * @module shared-constants/auth/auth-session
 *
 * Note: Does NOT spread COMMON_SESSION — nested objects (EXPIRY, COOKIE, etc.)
 * would leak into the enum. We expose only the auth-session states here.
 */

export const AUTH_SESSION = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  INVALID: 'invalid',
  SUSPENDED: 'suspended',
} as const;

export type AuthSessionStatus = (typeof AUTH_SESSION)[keyof typeof AUTH_SESSION];
