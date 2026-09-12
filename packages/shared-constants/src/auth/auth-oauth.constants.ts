/**
 * Auth OAuth Constants
 * @module shared-constants/auth/auth-oauth
 */

export const AUTH_OAUTH = {
  AUTHORIZATION_CODE: 'authorization_code',
  CLIENT_CREDENTIALS: 'client_credentials',
  PASSWORD: 'password',
  REFRESH_TOKEN: 'refresh_token',
  IMPLICIT: 'implicit',
} as const;

export type OAuthGrantType = (typeof AUTH_OAUTH)[keyof typeof AUTH_OAUTH];
