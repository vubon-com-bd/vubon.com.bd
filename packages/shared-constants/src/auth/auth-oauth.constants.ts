/**
 * Auth OAuth Constants (EXTENDS common/types)
 * @module shared-constants/auth/auth-oauth.constants
 */

import { TYPES } from '../common/types.constants';

export const AUTH_OAUTH = {
  // Base types
  ...TYPES,

  // OAuth versions
  VERSIONS: {
    OAUTH1: 'oauth1',
    OAUTH2: 'oauth2',
    OAUTH2_0: 'oauth2.0',
  } as const,

  // OAuth grant types
  GRANT_TYPES: {
    AUTHORIZATION_CODE: 'authorization_code',
    PASSWORD: 'password',
    CLIENT_CREDENTIALS: 'client_credentials',
    REFRESH_TOKEN: 'refresh_token',
    IMPLICIT: 'implicit',
    DEVICE_CODE: 'device_code',
    JWT_BEARER: 'jwt_bearer',
  } as const,

  // OAuth response types
  RESPONSE_TYPES: {
    CODE: 'code',
    TOKEN: 'token',
    ID_TOKEN: 'id_token',
    CODE_ID_TOKEN: 'code id_token',
    CODE_TOKEN: 'code token',
    CODE_TOKEN_ID_TOKEN: 'code token id_token',
  } as const,

  // OAuth scopes
  SCOPES: {
    OPENID: 'openid',
    EMAIL: 'email',
    PROFILE: 'profile',
    PHONE: 'phone',
    ADDRESS: 'address',
    OFFLINE_ACCESS: 'offline_access',
  } as const,

  // OAuth token types
  TOKEN_TYPES: {
    BEARER: 'bearer',
    MAC: 'mac',
    JWT: 'jwt',
  } as const,

  // OAuth settings
  SETTINGS: {
    DEFAULT_GRANT_TYPE: 'authorization_code',
    DEFAULT_RESPONSE_TYPE: 'code',
    DEFAULT_SCOPE: 'openid email profile',
    ACCESS_TOKEN_EXPIRY: 3600,
    REFRESH_TOKEN_EXPIRY: 86400,
    AUTHORIZATION_CODE_EXPIRY: 600,
    MAX_CLIENTS_PER_USER: 10,
  },

  // OAuth endpoints
  ENDPOINTS: {
    AUTHORIZE: '/oauth/authorize',
    TOKEN: '/oauth/token',
    REVOKE: '/oauth/revoke',
    USERINFO: '/oauth/userinfo',
    INTROSPECT: '/oauth/introspect',
    JWKS: '/oauth/jwks',
  } as const,
} as const;

export type OAuthVersion = (typeof AUTH_OAUTH.VERSIONS)[keyof typeof AUTH_OAUTH.VERSIONS];
export type OAuthGrantType = (typeof AUTH_OAUTH.GRANT_TYPES)[keyof typeof AUTH_OAUTH.GRANT_TYPES];
export type OAuthResponseType =
  (typeof AUTH_OAUTH.RESPONSE_TYPES)[keyof typeof AUTH_OAUTH.RESPONSE_TYPES];
export type OAuthScope = (typeof AUTH_OAUTH.SCOPES)[keyof typeof AUTH_OAUTH.SCOPES];
export type OAuthTokenType = (typeof AUTH_OAUTH.TOKEN_TYPES)[keyof typeof AUTH_OAUTH.TOKEN_TYPES];
