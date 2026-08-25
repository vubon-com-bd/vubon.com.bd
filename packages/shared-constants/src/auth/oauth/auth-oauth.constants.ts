/**
 * Authentication OAuth Constants
 * OAuth authentication configuration
 */

import { AUTH_OAUTH_PROVIDER } from './auth-oauth-provider.constants';
import { AUTH_OAUTH_STATUS } from './auth-oauth-status.constants';

export const OAUTH_PROVIDER_CONFIGS = {
  GOOGLE: {
    clientId: 'google_client_id',
    clientSecret: 'google_client_secret',
    redirectUri: '/oauth/google/callback',
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    userInfoEndpoint: 'https://www.googleapis.com/oauth2/v2/userinfo',
    scope: ['openid', 'profile', 'email'],
    responseType: 'code',
    grantType: 'authorization_code',
    pkce: true,
  },
  FACEBOOK: {
    clientId: 'facebook_client_id',
    clientSecret: 'facebook_client_secret',
    redirectUri: '/oauth/facebook/callback',
    authorizationEndpoint: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenEndpoint: 'https://graph.facebook.com/v18.0/oauth/access_token',
    userInfoEndpoint: 'https://graph.facebook.com/me',
    scope: ['public_profile', 'email'],
    responseType: 'code',
    grantType: 'authorization_code',
    pkce: false,
  },
  GITHUB: {
    clientId: 'github_client_id',
    clientSecret: 'github_client_secret',
    redirectUri: '/oauth/github/callback',
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    userInfoEndpoint: 'https://api.github.com/user',
    scope: ['user:email', 'read:user'],
    responseType: 'code',
    grantType: 'authorization_code',
    pkce: false,
  },
  MICROSOFT: {
    clientId: 'microsoft_client_id',
    clientSecret: 'microsoft_client_secret',
    redirectUri: '/oauth/microsoft/callback',
    authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    userInfoEndpoint: 'https://graph.microsoft.com/v1.0/me',
    scope: ['openid', 'profile', 'email', 'User.Read'],
    responseType: 'code',
    grantType: 'authorization_code',
    pkce: true,
  },
  LINKEDIN: {
    clientId: 'linkedin_client_id',
    clientSecret: 'linkedin_client_secret',
    redirectUri: '/oauth/linkedin/callback',
    authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenEndpoint: 'https://www.linkedin.com/oauth/v2/accessToken',
    userInfoEndpoint: 'https://api.linkedin.com/v2/userinfo',
    scope: ['profile', 'email', 'openid'],
    responseType: 'code',
    grantType: 'authorization_code',
    pkce: true,
  },
  APPLE: {
    clientId: 'apple_client_id',
    clientSecret: 'apple_client_secret',
    redirectUri: '/oauth/apple/callback',
    authorizationEndpoint: 'https://appleid.apple.com/auth/authorize',
    tokenEndpoint: 'https://appleid.apple.com/auth/token',
    userInfoEndpoint: 'https://appleid.apple.com/auth/userinfo',
    scope: ['name', 'email'],
    responseType: 'code',
    grantType: 'authorization_code',
    pkce: true,
  },
} as const;

export const OAUTH_GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
  REFRESH_TOKEN: 'refresh_token',
  CLIENT_CREDENTIALS: 'client_credentials',
  PASSWORD: 'password',
  IMPLICIT: 'implicit',
  PKCE: 'pkce',
} as const;

export const OAUTH_RESPONSE_TYPES = {
  CODE: 'code',
  TOKEN: 'token',
  ID_TOKEN: 'id_token',
  CODE_ID_TOKEN: 'code id_token',
  CODE_TOKEN: 'code token',
  CODE_TOKEN_ID_TOKEN: 'code token id_token',
} as const;

export const OAUTH_TOKEN_TYPES = {
  BEARER: 'Bearer',
  MAC: 'MAC',
  JWT: 'JWT',
} as const;

export const OAUTH_SCOPES = {
  OPENID: 'openid',
  PROFILE: 'profile',
  EMAIL: 'email',
  PHONE: 'phone',
  ADDRESS: 'address',
  PUBLIC_PROFILE: 'public_profile',
  USER_FRIENDS: 'user_friends',
  USER_POSTS: 'user_posts',
  USER_PHOTOS: 'user_photos',
  REPO: 'repo',
  GIST: 'gist',
  WORKFLOW: 'workflow',
  USER_READ: 'User.Read',
  MAIL_READ: 'Mail.Read',
  CALENDARS_READ: 'Calendars.Read',
} as const;

export const OAUTH_ENDPOINTS = {
  AUTHORIZATION: '/oauth/authorize',
  TOKEN: '/oauth/token',
  USERINFO: '/oauth/userinfo',
  REVOKE: '/oauth/revoke',
  INTROSPECT: '/oauth/introspect',
} as const;

export const OAUTH_SECURITY = {
  STATE_EXPIRY: 300,
  CODE_EXPIRY: 600,
  ACCESS_TOKEN_EXPIRY: 3600,
  REFRESH_TOKEN_EXPIRY: 86400,
  ID_TOKEN_EXPIRY: 3600,
  ENFORCE_HTTPS: true,
  PKCE_REQUIRED: true,
  SIGNATURE_ALGORITHM: 'RS256',
} as const;

export const OAUTH_RATE_LIMIT = {
  MAX_ATTEMPTS: 5,
  WINDOW_MS: 900000,
  BLOCK_DURATION: 3600000,
} as const;

export const OAUTH_DEFAULTS = {
  STATUS: AUTH_OAUTH_STATUS.PENDING,
  PROVIDER: AUTH_OAUTH_PROVIDER.GOOGLE,
  GRANT_TYPE: OAUTH_GRANT_TYPES.AUTHORIZATION_CODE,
  RESPONSE_TYPE: OAUTH_RESPONSE_TYPES.CODE,
  TOKEN_TYPE: OAUTH_TOKEN_TYPES.BEARER,
  PKCE_ENABLED: true,
} as const;

export const OAUTH_CONFIG = {
  GRANT_TYPES: OAUTH_GRANT_TYPES,
  RESPONSE_TYPES: OAUTH_RESPONSE_TYPES,
  TOKEN_TYPES: OAUTH_TOKEN_TYPES,
  SCOPES: OAUTH_SCOPES,
  ENDPOINTS: OAUTH_ENDPOINTS,
  SECURITY: OAUTH_SECURITY,
  RATE_LIMIT: OAUTH_RATE_LIMIT,
  DEFAULTS: OAUTH_DEFAULTS,
} as const;

export const OAUTH_EVENTS = {
  AUTH_STARTED: 'oauth:auth_started',
  AUTH_SUCCESS: 'oauth:auth_success',
  AUTH_FAILED: 'oauth:auth_failed',
  AUTH_CANCELLED: 'oauth:auth_cancelled',
  TOKEN_ISSUED: 'oauth:token_issued',
  TOKEN_REFRESHED: 'oauth:token_refreshed',
  TOKEN_REVOKED: 'oauth:token_revoked',
  TOKEN_EXPIRED: 'oauth:token_expired',
  CODE_ISSUED: 'oauth:code_issued',
  CODE_EXPIRED: 'oauth:code_expired',
  USERINFO_FETCHED: 'oauth:userinfo_fetched',
  USERINFO_FAILED: 'oauth:userinfo_failed',
} as const;

export const AUTH_OAUTH = {
  CONFIG: OAUTH_CONFIG,
  PROVIDERS: AUTH_OAUTH_PROVIDER,
  PROVIDER_CONFIGS: OAUTH_PROVIDER_CONFIGS,
  EVENTS: OAUTH_EVENTS,
  DEFAULTS: OAUTH_DEFAULTS,
} as const;

export type AuthOAuthConfig = typeof OAUTH_CONFIG;
export type AuthOAuthEvent = (typeof OAUTH_EVENTS)[keyof typeof OAUTH_EVENTS];
export type AuthOAuthDefaults = typeof OAUTH_DEFAULTS;
export type OAuthProviderConfig =
  (typeof OAUTH_PROVIDER_CONFIGS)[keyof typeof OAUTH_PROVIDER_CONFIGS];

export function getOauthProviderConfig(
  provider: (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER]
): OAuthProviderConfig {
  const config = OAUTH_PROVIDER_CONFIGS[provider as keyof typeof OAUTH_PROVIDER_CONFIGS];
  if (!config) {
    throw new Error(`OAuth provider configuration not found for: ${provider}`);
  }
  return config;
}

export function getOauthScopes(
  provider: (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER]
): string[] {
  const config = getOauthProviderConfig(provider);
  return [...config.scope];
}

export function getOauthRedirectUri(
  provider: (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER]
): string {
  const config = getOauthProviderConfig(provider);
  return config.redirectUri;
}

export function getOauthAuthorizationUrl(
  provider: (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER],
  state: string
): string {
  const config = getOauthProviderConfig(provider);
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: config.responseType,
    scope: config.scope.join(' '),
    state: state,
  });

  if (config.pkce) {
    params.append('code_challenge_method', 'S256');
  }

  return `${config.authorizationEndpoint}?${params.toString()}`;
}

export function getOauthTokenUrl(
  provider: (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER]
): string {
  const config = getOauthProviderConfig(provider);
  return config.tokenEndpoint;
}

export function getOauthUserInfoUrl(
  provider: (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER]
): string {
  const config = getOauthProviderConfig(provider);
  return config.userInfoEndpoint;
}

export function isOauthProviderSupported(provider: string): boolean {
  return Object.keys(OAUTH_PROVIDER_CONFIGS).includes(provider);
}

export function getOauthSupportedProviders(): (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER][] {
  return Object.keys(
    OAUTH_PROVIDER_CONFIGS
  ) as (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER][];
}

export function getOauthProviderLabel(
  provider: (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER]
): string {
  const labels: Record<string, string> = {
    [AUTH_OAUTH_PROVIDER.GOOGLE]: 'Google',
    [AUTH_OAUTH_PROVIDER.FACEBOOK]: 'Facebook',
    [AUTH_OAUTH_PROVIDER.GITHUB]: 'GitHub',
    [AUTH_OAUTH_PROVIDER.MICROSOFT]: 'Microsoft',
    [AUTH_OAUTH_PROVIDER.LINKEDIN]: 'LinkedIn',
    [AUTH_OAUTH_PROVIDER.APPLE]: 'Apple',
  };

  return labels[provider] || 'Unknown Provider';
}

export function getOauthProviderIcon(
  provider: (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER]
): string {
  const icons: Record<string, string> = {
    [AUTH_OAUTH_PROVIDER.GOOGLE]: '🅶',
    [AUTH_OAUTH_PROVIDER.FACEBOOK]: '📘',
    [AUTH_OAUTH_PROVIDER.GITHUB]: '🐙',
    [AUTH_OAUTH_PROVIDER.MICROSOFT]: '💻',
    [AUTH_OAUTH_PROVIDER.LINKEDIN]: '💼',
    [AUTH_OAUTH_PROVIDER.APPLE]: '🍎',
  };

  return icons[provider] || '🔑';
}

export function getOauthProviderColor(
  provider: (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER]
): string {
  const colors: Record<string, string> = {
    [AUTH_OAUTH_PROVIDER.GOOGLE]: '#4285F4',
    [AUTH_OAUTH_PROVIDER.FACEBOOK]: '#1877F2',
    [AUTH_OAUTH_PROVIDER.GITHUB]: '#181717',
    [AUTH_OAUTH_PROVIDER.MICROSOFT]: '#00A4EF',
    [AUTH_OAUTH_PROVIDER.LINKEDIN]: '#0A66C2',
    [AUTH_OAUTH_PROVIDER.APPLE]: '#000000',
  };

  return colors[provider] || '#6B7280';
}

export function getOauthStateExpiry(): number {
  return OAUTH_SECURITY.STATE_EXPIRY;
}

export function getOauthCodeExpiry(): number {
  return OAUTH_SECURITY.CODE_EXPIRY;
}

export function getOauthAccessTokenExpiry(): number {
  return OAUTH_SECURITY.ACCESS_TOKEN_EXPIRY;
}

export function getOauthRefreshTokenExpiry(): number {
  return OAUTH_SECURITY.REFRESH_TOKEN_EXPIRY;
}

export function getOauthIdTokenExpiry(): number {
  return OAUTH_SECURITY.ID_TOKEN_EXPIRY;
}

export function isOauthStateValid(createdAt: Date): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age <= OAUTH_SECURITY.STATE_EXPIRY;
}

export function isOauthCodeValid(createdAt: Date): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age <= OAUTH_SECURITY.CODE_EXPIRY;
}

export function isOauthAccessTokenValid(createdAt: Date): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age <= OAUTH_SECURITY.ACCESS_TOKEN_EXPIRY;
}

export function shouldOauthRefreshAccessToken(createdAt: Date): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  const threshold = OAUTH_SECURITY.ACCESS_TOKEN_EXPIRY * 0.8;
  return age >= threshold;
}

export function getOauthGrantTypeLabel(grantType: string): string {
  const labels: Record<string, string> = {
    [OAUTH_GRANT_TYPES.AUTHORIZATION_CODE]: 'Authorization Code',
    [OAUTH_GRANT_TYPES.REFRESH_TOKEN]: 'Refresh Token',
    [OAUTH_GRANT_TYPES.CLIENT_CREDENTIALS]: 'Client Credentials',
    [OAUTH_GRANT_TYPES.PASSWORD]: 'Password',
    [OAUTH_GRANT_TYPES.IMPLICIT]: 'Implicit',
    [OAUTH_GRANT_TYPES.PKCE]: 'PKCE',
  };

  return labels[grantType] || 'Unknown Grant Type';
}

export function getOauthResponseTypeLabel(responseType: string): string {
  const labels: Record<string, string> = {
    [OAUTH_RESPONSE_TYPES.CODE]: 'Authorization Code',
    [OAUTH_RESPONSE_TYPES.TOKEN]: 'Access Token',
    [OAUTH_RESPONSE_TYPES.ID_TOKEN]: 'ID Token',
    [OAUTH_RESPONSE_TYPES.CODE_ID_TOKEN]: 'Code + ID Token',
    [OAUTH_RESPONSE_TYPES.CODE_TOKEN]: 'Code + Token',
    [OAUTH_RESPONSE_TYPES.CODE_TOKEN_ID_TOKEN]: 'Code + Token + ID Token',
  };

  return labels[responseType] || 'Unknown Response Type';
}

export function getOauthTokenTypeLabel(tokenType: string): string {
  const labels: Record<string, string> = {
    [OAUTH_TOKEN_TYPES.BEARER]: 'Bearer Token',
    [OAUTH_TOKEN_TYPES.MAC]: 'MAC Token',
    [OAUTH_TOKEN_TYPES.JWT]: 'JWT Token',
  };

  return labels[tokenType] || 'Unknown Token Type';
}
