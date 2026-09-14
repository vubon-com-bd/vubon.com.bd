/**
 * Auth OAuth Constants
 * @module shared-constants/auth/auth-oauth
 *
 * Note: `PASSWORD: 'password'` and `REFRESH_TOKEN: 'refresh_token'` overlap
 * with AUTH_TYPES.PASSWORD and AUTH_TOKEN.REFRESH by intent — OAuth grant
 * types are a distinct domain. Kept separate; documented for clarity.
 */

export const AUTH_OAUTH = {
  AUTHORIZATION_CODE: 'authorization_code',
  CLIENT_CREDENTIALS: 'client_credentials',
  PASSWORD: 'password',
  REFRESH_TOKEN: 'refresh_token',
  IMPLICIT: 'implicit',
} as const;

export type OAuthGrantType = (typeof AUTH_OAUTH)[keyof typeof AUTH_OAUTH];
