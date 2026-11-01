export const AUTH_OAUTH = {
  GRANT_TYPE_AUTHORIZATION_CODE: 'authorization_code',
  GRANT_TYPE_CLIENT_CREDENTIALS: 'client_credentials',
  GRANT_TYPE_REFRESH_TOKEN: 'refresh_token',
  GRANT_TYPE_PASSWORD: 'password',
  RESPONSE_TYPE_CODE: 'code',
  RESPONSE_TYPE_TOKEN: 'token',
  PKCE_METHOD_S256: 'S256',
  PKCE_METHOD_PLAIN: 'plain',
  STATE_LENGTH: 32,
  CODE_VERIFIER_LENGTH: 64,
} as const;

export const AUTH_OAUTH_ENDPOINT = {
  AUTHORIZE: '/oauth/authorize',
  TOKEN: '/oauth/token',
  REVOKE: '/oauth/revoke',
  INTROSPECT: '/oauth/introspect',
  USERINFO: '/oauth/userinfo',
} as const;

export type AuthOauthGrantTypeType = (typeof AUTH_OAUTH)[keyof typeof AUTH_OAUTH];
