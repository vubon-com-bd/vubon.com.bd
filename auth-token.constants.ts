/**
 * Auth Token Constants
 * @module shared-constants/auth/auth-token
 *
 * Note: `API_KEY: 'api_key'` intentionally matches AUTH_TYPES.API_KEY —
 * the token type and auth type are conceptually linked (different domains,
 * same literal). Keep in sync if changed.
 */

export const AUTH_TOKEN = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET: 'reset',
  VERIFICATION: 'verification',
  API_KEY: 'api_key',
} as const;

export type AuthTokenType = (typeof AUTH_TOKEN)[keyof typeof AUTH_TOKEN];
