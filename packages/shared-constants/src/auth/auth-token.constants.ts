export const AUTH_TOKEN = {
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
  ID_TOKEN_EXPIRY: '1h',
  RESET_TOKEN_EXPIRY: '1h',
  VERIFY_TOKEN_EXPIRY: '24h',
  INVITE_TOKEN_EXPIRY: '7d',
  API_KEY_EXPIRY: '365d',
  ALGORITHM: 'HS256',
  ISSUER: 'shared-constants',
  AUDIENCE: 'shared-api',
} as const;

export const AUTH_TOKEN_TYPE = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  ID: 'id',
  RESET: 'reset',
  VERIFY: 'verify',
  INVITE: 'invite',
  API: 'api',
} as const;

export const AUTH_TOKEN_HEADER = {
  AUTHORIZATION: 'authorization',
  BEARER_PREFIX: 'Bearer ',
  X_API_KEY: 'x-api-key',
  X_REFRESH_TOKEN: 'x-refresh-token',
} as const;

export type AuthTokenTypeType = (typeof AUTH_TOKEN_TYPE)[keyof typeof AUTH_TOKEN_TYPE];
