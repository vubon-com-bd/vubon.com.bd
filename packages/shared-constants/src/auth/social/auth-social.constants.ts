/**
 * Authentication Social Constants
 * Social authentication configuration
 */

import { AUTH_SOCIAL_PROVIDER } from './auth-social-provider.constants';
import { AUTH_SOCIAL_STATUS } from './auth-social-status.constants';

// Define PROVIDER_CONFIGS first
export const SOCIAL_PROVIDER_CONFIGS = {
  google: {
    clientId: 'google_client_id',
    clientSecret: 'google_client_secret',
    redirectUri: '/auth/google/callback',
    scope: ['profile', 'email'] as readonly string[],
    responseType: 'code',
    grantType: 'authorization_code',
  },
  facebook: {
    clientId: 'facebook_client_id',
    clientSecret: 'facebook_client_secret',
    redirectUri: '/auth/facebook/callback',
    scope: ['public_profile', 'email'] as readonly string[],
    responseType: 'code',
    grantType: 'authorization_code',
  },
  twitter: {
    clientId: 'twitter_client_id',
    clientSecret: 'twitter_client_secret',
    redirectUri: '/auth/twitter/callback',
    scope: ['tweet.read', 'users.read', 'offline.access'] as readonly string[],
    responseType: 'code',
    grantType: 'authorization_code',
  },
  linkedin: {
    clientId: 'linkedin_client_id',
    clientSecret: 'linkedin_client_secret',
    redirectUri: '/auth/linkedin/callback',
    scope: ['profile', 'email', 'openid'] as readonly string[],
    responseType: 'code',
    grantType: 'authorization_code',
  },
  github: {
    clientId: 'github_client_id',
    clientSecret: 'github_client_secret',
    redirectUri: '/auth/github/callback',
    scope: ['user:email', 'read:user'] as readonly string[],
    responseType: 'code',
    grantType: 'authorization_code',
  },
  apple: {
    clientId: 'apple_client_id',
    clientSecret: 'apple_client_secret',
    redirectUri: '/auth/apple/callback',
    scope: ['name', 'email'] as readonly string[],
    responseType: 'code',
    grantType: 'authorization_code',
  },
  microsoft: {
    clientId: 'microsoft_client_id',
    clientSecret: 'microsoft_client_secret',
    redirectUri: '/auth/microsoft/callback',
    scope: ['user.read', 'offline_access'] as readonly string[],
    responseType: 'code',
    grantType: 'authorization_code',
  },
} as const;

// Define SOCIAL_CONFIG
export const SOCIAL_CONFIG = {
  // Default scopes
  SCOPES: {
    BASIC: ['profile', 'email'],
    FULL: ['profile', 'email', 'phone', 'address'],
  },

  // OAuth2 configuration
  OAUTH2: {
    RESPONSE_TYPE: 'code',
    GRANT_TYPE: 'authorization_code',
    TOKEN_ENDPOINT: '/oauth/token',
    USER_INFO_ENDPOINT: '/oauth/userinfo',
    AUTHORIZATION_ENDPOINT: '/oauth/authorize',
  },

  // Session configuration
  SESSION: {
    MAX_AGE: 3600,
    EXTEND_ON_ACTIVITY: true,
  },

  // Rate limiting
  RATE_LIMIT: {
    MAX_ATTEMPTS: 5,
    WINDOW_MS: 900000,
    BLOCK_DURATION: 3600000,
  },

  // Security
  SECURITY: {
    STATE_EXPIRY: 300,
    CODE_EXPIRY: 600,
    TOKEN_EXPIRY: 3600,
    REFRESH_TOKEN_EXPIRY: 86400,
    ENFORCE_HTTPS: true,
    VERIFY_EMAIL: true,
    REQUIRE_VERIFICATION: true,
  },

  // Account linking
  ACCOUNT_LINKING: {
    AUTO_LINK: true,
    REQUIRE_CONFIRMATION: false,
    MAX_LINKED_ACCOUNTS: 5,
  },

  // Default values
  DEFAULTS: {
    STATUS: AUTH_SOCIAL_STATUS.PENDING,
    PROVIDER: AUTH_SOCIAL_PROVIDER.GOOGLE,
    LINKED: false,
    VERIFIED: false,
  },
} as const;

// Define SOCIAL_EVENTS
export const SOCIAL_EVENTS = {
  AUTH_STARTED: 'social:auth_started',
  AUTH_SUCCESS: 'social:auth_success',
  AUTH_FAILED: 'social:auth_failed',
  AUTH_CANCELLED: 'social:auth_cancelled',
  TOKEN_REFRESHED: 'social:token_refreshed',
  TOKEN_EXPIRED: 'social:token_expired',
  ACCOUNT_LINKED: 'social:account_linked',
  ACCOUNT_UNLINKED: 'social:account_unlinked',
  VERIFIED: 'social:verified',
  UNVERIFIED: 'social:unverified',
  PROFILE_UPDATED: 'social:profile_updated',
} as const;

// Main AUTH_SOCIAL object
export const AUTH_SOCIAL = {
  CONFIG: SOCIAL_CONFIG,
  PROVIDERS: AUTH_SOCIAL_PROVIDER,
  PROVIDER_CONFIGS: SOCIAL_PROVIDER_CONFIGS,
  EVENTS: SOCIAL_EVENTS,
  DEFAULTS: SOCIAL_CONFIG.DEFAULTS,
} as const;

export type AuthSocialConfig = typeof SOCIAL_CONFIG;
export type AuthSocialEvent = (typeof SOCIAL_EVENTS)[keyof typeof SOCIAL_EVENTS];
export type AuthSocialDefaults = typeof SOCIAL_CONFIG.DEFAULTS;
export type SocialProviderConfig =
  (typeof SOCIAL_PROVIDER_CONFIGS)[keyof typeof SOCIAL_PROVIDER_CONFIGS];

export function getProviderConfig(
  provider: keyof typeof SOCIAL_PROVIDER_CONFIGS
): SocialProviderConfig {
  const config = SOCIAL_PROVIDER_CONFIGS[provider];
  if (!config) {
    throw new Error(`Provider configuration not found for: ${String(provider)}`);
  }
  return config;
}

export function getProviderScopes(
  provider: keyof typeof SOCIAL_PROVIDER_CONFIGS
): readonly string[] {
  const config = getProviderConfig(provider);
  return config.scope;
}

export function getProviderRedirectUri(provider: keyof typeof SOCIAL_PROVIDER_CONFIGS): string {
  const config = getProviderConfig(provider);
  return config.redirectUri;
}

export function getProviderClientId(provider: keyof typeof SOCIAL_PROVIDER_CONFIGS): string {
  const config = getProviderConfig(provider);
  return config.clientId;
}

export function getSocialAuthUrl(
  provider: keyof typeof SOCIAL_PROVIDER_CONFIGS,
  state: string
): string {
  const config = getProviderConfig(provider);
  const baseUrl = `https://${String(provider)}.com`;
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: config.responseType,
    scope: config.scope.join(' '),
    state: state,
  });

  return `${baseUrl}/oauth/authorize?${params.toString()}`;
}

export function isSocialProviderSupported(provider: string): boolean {
  return Object.keys(SOCIAL_PROVIDER_CONFIGS).includes(provider);
}

export function getSupportedProviders(): (keyof typeof SOCIAL_PROVIDER_CONFIGS)[] {
  return Object.keys(SOCIAL_PROVIDER_CONFIGS) as (keyof typeof SOCIAL_PROVIDER_CONFIGS)[];
}

export function getSocialProviderLabel(provider: keyof typeof SOCIAL_PROVIDER_CONFIGS): string {
  const labels: Record<string, string> = {
    google: 'Google',
    facebook: 'Facebook',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    apple: 'Apple',
    microsoft: 'Microsoft',
  };

  return labels[String(provider)] || 'Unknown Provider';
}

export function getSocialProviderIcon(provider: keyof typeof SOCIAL_PROVIDER_CONFIGS): string {
  const icons: Record<string, string> = {
    google: '🅶',
    facebook: '📘',
    twitter: '🐦',
    linkedin: '💼',
    github: '🐙',
    apple: '🍎',
    microsoft: '💻',
  };

  return icons[String(provider)] || '🔑';
}

export function getSocialProviderColor(provider: keyof typeof SOCIAL_PROVIDER_CONFIGS): string {
  const colors: Record<string, string> = {
    google: '#4285F4',
    facebook: '#1877F2',
    twitter: '#1DA1F2',
    linkedin: '#0A66C2',
    github: '#181717',
    apple: '#000000',
    microsoft: '#00A4EF',
  };

  return colors[String(provider)] || '#6B7280';
}

export function getSocialAuthStateExpiry(): number {
  return SOCIAL_CONFIG.SECURITY.STATE_EXPIRY;
}

export function getSocialCodeExpiry(): number {
  return SOCIAL_CONFIG.SECURITY.CODE_EXPIRY;
}

export function getSocialTokenExpiry(): number {
  return SOCIAL_CONFIG.SECURITY.TOKEN_EXPIRY;
}

export function getSocialRefreshTokenExpiry(): number {
  return SOCIAL_CONFIG.SECURITY.REFRESH_TOKEN_EXPIRY;
}

export function isSocialStateValid(createdAt: Date): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age <= SOCIAL_CONFIG.SECURITY.STATE_EXPIRY;
}

export function isSocialCodeValid(createdAt: Date): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age <= SOCIAL_CONFIG.SECURITY.CODE_EXPIRY;
}

export function isSocialTokenValid(createdAt: Date): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age <= SOCIAL_CONFIG.SECURITY.TOKEN_EXPIRY;
}

export function shouldRefreshToken(createdAt: Date): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  const threshold = SOCIAL_CONFIG.SECURITY.TOKEN_EXPIRY * 0.8; // 80% of expiry
  return age >= threshold;
}
