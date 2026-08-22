/**
 * Authentication Token Constants
 * Token management configuration
 */

export const AUTH_TOKEN = {
  // Token types
  TYPE: {
    ACCESS: 'access',
    REFRESH: 'refresh',
    VERIFICATION: 'verification',
    PASSWORD_RESET: 'password_reset',
    API: 'api',
    ID_TOKEN: 'id_token',
  },

  // Token status
  STATUS: {
    VALID: 'valid',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    INVALID: 'invalid',
    PENDING: 'pending',
    USED: 'used',
  },

  // Token configuration
  CONFIG: {
    ACCESS_TOKEN_EXPIRY: 900, // 15 minutes
    REFRESH_TOKEN_EXPIRY: 604800, // 7 days
    VERIFICATION_TOKEN_EXPIRY: 86400, // 24 hours
    PASSWORD_RESET_TOKEN_EXPIRY: 3600, // 1 hour
    API_TOKEN_EXPIRY: 2592000, // 30 days
    ID_TOKEN_EXPIRY: 3600, // 1 hour
  },

  // Token algorithms
  ALGORITHMS: {
    HS256: 'HS256',
    HS384: 'HS384',
    HS512: 'HS512',
    RS256: 'RS256',
    RS384: 'RS384',
    RS512: 'RS512',
    ES256: 'ES256',
    ES384: 'ES384',
    ES512: 'ES512',
    PS256: 'PS256',
    PS384: 'PS384',
    PS512: 'PS512',
  },

  // Token claims
  CLAIMS: {
    SUBJECT: 'sub',
    ISSUER: 'iss',
    AUDIENCE: 'aud',
    EXPIRES_AT: 'exp',
    ISSUED_AT: 'iat',
    NOT_BEFORE: 'nbf',
    JWT_ID: 'jti',
    USER_ID: 'uid',
    SESSION_ID: 'sid',
    ROLE: 'role',
    PERMISSIONS: 'perms',
  },

  // Token events
  EVENTS: {
    CREATED: 'token:created',
    REFRESHED: 'token:refreshed',
    REVOKED: 'token:revoked',
    EXPIRED: 'token:expired',
    VALIDATED: 'token:validated',
    INVALIDATED: 'token:invalidated',
  },
} as const;

export type AuthTokenType = (typeof AUTH_TOKEN.TYPE)[keyof typeof AUTH_TOKEN.TYPE];
export type AuthTokenStatus = (typeof AUTH_TOKEN.STATUS)[keyof typeof AUTH_TOKEN.STATUS];
export type AuthTokenAlgorithm = (typeof AUTH_TOKEN.ALGORITHMS)[keyof typeof AUTH_TOKEN.ALGORITHMS];
export type AuthTokenClaim = (typeof AUTH_TOKEN.CLAIMS)[keyof typeof AUTH_TOKEN.CLAIMS];
export type AuthTokenEvent = (typeof AUTH_TOKEN.EVENTS)[keyof typeof AUTH_TOKEN.EVENTS];

export const BEARER_TOKEN_TYPES: AuthTokenType[] = [
  AUTH_TOKEN.TYPE.ACCESS,
  AUTH_TOKEN.TYPE.REFRESH,
  AUTH_TOKEN.TYPE.ID_TOKEN,
];

export const SINGLE_USE_TOKEN_TYPES: AuthTokenType[] = [
  AUTH_TOKEN.TYPE.VERIFICATION,
  AUTH_TOKEN.TYPE.PASSWORD_RESET,
];

export const VALID_TOKEN_STATUSES: AuthTokenStatus[] = [
  AUTH_TOKEN.STATUS.VALID,
  AUTH_TOKEN.STATUS.PENDING,
];

export const INVALID_TOKEN_STATUSES: AuthTokenStatus[] = [
  AUTH_TOKEN.STATUS.EXPIRED,
  AUTH_TOKEN.STATUS.REVOKED,
  AUTH_TOKEN.STATUS.INVALID,
  AUTH_TOKEN.STATUS.USED,
];

export function isTokenValid(status: AuthTokenStatus): boolean {
  return VALID_TOKEN_STATUSES.includes(status);
}

export function isTokenInvalid(status: AuthTokenStatus): boolean {
  return INVALID_TOKEN_STATUSES.includes(status);
}

export function isBearerToken(type: AuthTokenType): boolean {
  return BEARER_TOKEN_TYPES.includes(type);
}

export function isSingleUseToken(type: AuthTokenType): boolean {
  return SINGLE_USE_TOKEN_TYPES.includes(type);
}

export function getTokenExpiry(type: AuthTokenType): number {
  const expiryMap: Record<AuthTokenType, number> = {
    [AUTH_TOKEN.TYPE.ACCESS]: AUTH_TOKEN.CONFIG.ACCESS_TOKEN_EXPIRY,
    [AUTH_TOKEN.TYPE.REFRESH]: AUTH_TOKEN.CONFIG.REFRESH_TOKEN_EXPIRY,
    [AUTH_TOKEN.TYPE.VERIFICATION]: AUTH_TOKEN.CONFIG.VERIFICATION_TOKEN_EXPIRY,
    [AUTH_TOKEN.TYPE.PASSWORD_RESET]: AUTH_TOKEN.CONFIG.PASSWORD_RESET_TOKEN_EXPIRY,
    [AUTH_TOKEN.TYPE.API]: AUTH_TOKEN.CONFIG.API_TOKEN_EXPIRY,
    [AUTH_TOKEN.TYPE.ID_TOKEN]: AUTH_TOKEN.CONFIG.ID_TOKEN_EXPIRY,
  };

  return expiryMap[type] || AUTH_TOKEN.CONFIG.ACCESS_TOKEN_EXPIRY;
}

export function getTokenTypeLabel(type: AuthTokenType): string {
  const labels: Record<AuthTokenType, string> = {
    [AUTH_TOKEN.TYPE.ACCESS]: 'Access Token',
    [AUTH_TOKEN.TYPE.REFRESH]: 'Refresh Token',
    [AUTH_TOKEN.TYPE.VERIFICATION]: 'Verification Token',
    [AUTH_TOKEN.TYPE.PASSWORD_RESET]: 'Password Reset Token',
    [AUTH_TOKEN.TYPE.API]: 'API Token',
    [AUTH_TOKEN.TYPE.ID_TOKEN]: 'ID Token',
  };

  return labels[type] || 'Unknown Token';
}

export function getTokenStatusLabel(status: AuthTokenStatus): string {
  const labels: Record<AuthTokenStatus, string> = {
    [AUTH_TOKEN.STATUS.VALID]: 'Valid',
    [AUTH_TOKEN.STATUS.EXPIRED]: 'Expired',
    [AUTH_TOKEN.STATUS.REVOKED]: 'Revoked',
    [AUTH_TOKEN.STATUS.INVALID]: 'Invalid',
    [AUTH_TOKEN.STATUS.PENDING]: 'Pending',
    [AUTH_TOKEN.STATUS.USED]: 'Used',
  };

  return labels[status] || 'Unknown Status';
}

export function getAlgorithmLabel(algorithm: AuthTokenAlgorithm): string {
  const labels: Record<AuthTokenAlgorithm, string> = {
    [AUTH_TOKEN.ALGORITHMS.HS256]: 'HS256',
    [AUTH_TOKEN.ALGORITHMS.HS384]: 'HS384',
    [AUTH_TOKEN.ALGORITHMS.HS512]: 'HS512',
    [AUTH_TOKEN.ALGORITHMS.RS256]: 'RS256',
    [AUTH_TOKEN.ALGORITHMS.RS384]: 'RS384',
    [AUTH_TOKEN.ALGORITHMS.RS512]: 'RS512',
    [AUTH_TOKEN.ALGORITHMS.ES256]: 'ES256',
    [AUTH_TOKEN.ALGORITHMS.ES384]: 'ES384',
    [AUTH_TOKEN.ALGORITHMS.ES512]: 'ES512',
    [AUTH_TOKEN.ALGORITHMS.PS256]: 'PS256',
    [AUTH_TOKEN.ALGORITHMS.PS384]: 'PS384',
    [AUTH_TOKEN.ALGORITHMS.PS512]: 'PS512',
  };

  return labels[algorithm] || 'Unknown Algorithm';
}

export function getDefaultAlgorithm(): AuthTokenAlgorithm {
  return AUTH_TOKEN.ALGORITHMS.HS256;
}

export function isTokenExpired(expiresAt: Date): boolean {
  return Date.now() >= expiresAt.getTime();
}

export function getTokenRemainingTime(expiresAt: Date): number {
  const remaining = (expiresAt.getTime() - Date.now()) / 1000;
  return Math.max(0, remaining);
}
