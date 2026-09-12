/**
 * Auth Token Constants
 * @module shared-constants/auth/auth-token
 */

export const AUTH_TOKEN = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET: 'reset',
  VERIFICATION: 'verification',
  API_KEY: 'api_key',
} as const;

export type AuthTokenType = (typeof AUTH_TOKEN)[keyof typeof AUTH_TOKEN];
