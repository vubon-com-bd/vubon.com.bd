/**
 * OAuth Configuration - Enterprise Grade
 *
 * @module infrastructure/config/oauth.config
 *
 * @description
 * Centralized OAuth configuration using shared-config.
 * Provides type-safe OAuth settings for all providers with environment support.
 *
 * Enterprise Features:
 * ✅ Multi-provider support (Google, Facebook, GitHub, Apple, LinkedIn)
 * ✅ Environment-aware configuration
 * ✅ Provider-specific scopes and settings
 * ✅ PKCE support (Proof Key for Code Exchange)
 * ✅ Callback URL management
 * ✅ Provider enable/disable per environment
 * ✅ Bangladesh specific providers (WhatsApp, bKash, Nagad, Rocket)
 *
 * @example
 * import { oauthConfig } from './oauth.config';
 *
 * const googleConfig = oauthConfig.providers.google;
 */

import { env } from '@vubon/shared-config';

// ============================================================
// Types
// ============================================================

/**
 * OAuth provider type
 */
export type OAuthProvider =
  | 'google'
  | 'facebook'
  | 'github'
  | 'apple'
  | 'linkedin'
  | 'whatsapp'
  | 'bkash'
  | 'nagad'
  | 'rocket';

/**
 * OAuth provider configuration
 */
export interface OAuthProviderConfig {
  /** Provider name */
  provider: OAuthProvider;
  /** Provider display name */
  displayName: string;
  /** Provider display name in Bengali */
  displayNameBn: string;
  /** Client ID */
  clientId: string;
  /** Client secret */
  clientSecret: string;
  /** Callback URL */
  callbackUrl: string;
  /** OAuth scopes */
  scopes: string[];
  /** Authorization URL */
  authUrl: string;
  /** Token URL */
  tokenUrl: string;
  /** User info URL */
  userInfoUrl: string;
  /** Revoke URL */
  revokeUrl?: string;
  /** Enable PKCE */
  enablePKCE: boolean;
  /** Enable state parameter */
  enableState: boolean;
  /** Provider icon */
  icon: string;
  /** Provider color (hex) */
  color: string;
  /** Whether provider is enabled */
  enabled: boolean;
}

/**
 * OAuth configuration
 */
export interface OAuthConfig {
  /** Base callback URL */
  baseCallbackUrl: string;
  /** Provider configurations */
  providers: Record<OAuthProvider, OAuthProviderConfig>;
  /** Default provider for login */
  defaultProvider: OAuthProvider;
  /** PKCE configuration */
  pkce: {
    /** Enable PKCE */
    enabled: boolean;
    /** Code verifier length */
    verifierLength: number;
    /** Code challenge method */
    challengeMethod: 'S256' | 'plain';
  };
  /** State configuration */
  state: {
    /** State length */
    length: number;
    /** State expiry in seconds */
    expirySeconds: number;
  };
}

// ============================================================
// Environment Detection
// ============================================================

const isProduction = env.NODE_ENV === 'production';

// ============================================================
// Provider Configurations
// ============================================================

/**
 * Google OAuth configuration
 */
const buildGoogleConfig = (baseCallbackUrl: string): OAuthProviderConfig => ({
  provider: 'google',
  displayName: 'Google',
  displayNameBn: 'গুগল',
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackUrl: process.env.GOOGLE_CALLBACK_URL || `${baseCallbackUrl}/auth/google/callback`,
  scopes: (process.env.GOOGLE_SCOPES || 'email,profile').split(','),
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
  revokeUrl: 'https://oauth2.googleapis.com/revoke',
  enablePKCE: true,
  enableState: true,
  icon: 'google',
  color: '#4285F4',
  enabled: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
});

/**
 * Facebook OAuth configuration
 */
const buildFacebookConfig = (baseCallbackUrl: string): OAuthProviderConfig => ({
  provider: 'facebook',
  displayName: 'Facebook',
  displayNameBn: 'ফেসবুক',
  clientId: process.env.FACEBOOK_CLIENT_ID || '',
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
  callbackUrl: process.env.FACEBOOK_CALLBACK_URL || `${baseCallbackUrl}/auth/facebook/callback`,
  scopes: (process.env.FACEBOOK_SCOPES || 'email,public_profile').split(','),
  authUrl: `https://www.facebook.com/${process.env.FACEBOOK_API_VERSION || 'v18.0'}/dialog/oauth`,
  tokenUrl: `https://graph.facebook.com/${process.env.FACEBOOK_API_VERSION || 'v18.0'}/oauth/access_token`,
  userInfoUrl: `https://graph.facebook.com/${process.env.FACEBOOK_API_VERSION || 'v18.0'}/me`,
  revokeUrl: `https://graph.facebook.com/${process.env.FACEBOOK_API_VERSION || 'v18.0'}/me/permissions`,
  enablePKCE: false,
  enableState: true,
  icon: 'facebook',
  color: '#1877F2',
  enabled: !!(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET),
});

/**
 * GitHub OAuth configuration
 */
const buildGitHubConfig = (baseCallbackUrl: string): OAuthProviderConfig => ({
  provider: 'github',
  displayName: 'GitHub',
  displayNameBn: 'গিটহাব',
  clientId: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  callbackUrl: process.env.GITHUB_CALLBACK_URL || `${baseCallbackUrl}/auth/github/callback`,
  scopes: (process.env.GITHUB_SCOPES || 'read:user,user:email').split(','),
  authUrl: 'https://github.com/login/oauth/authorize',
  tokenUrl: 'https://github.com/login/oauth/access_token',
  userInfoUrl: 'https://api.github.com/user',
  revokeUrl: 'https://api.github.com/applications/{client_id}/grant',
  enablePKCE: false,
  enableState: true,
  icon: 'github',
  color: '#333333',
  enabled: !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
});

/**
 * Apple OAuth configuration
 */
const buildAppleConfig = (baseCallbackUrl: string): OAuthProviderConfig => ({
  provider: 'apple',
  displayName: 'Apple',
  displayNameBn: 'অ্যাপল',
  clientId: process.env.APPLE_CLIENT_ID || '',
  clientSecret: process.env.APPLE_CLIENT_SECRET || '',
  callbackUrl: process.env.APPLE_CALLBACK_URL || `${baseCallbackUrl}/auth/apple/callback`,
  scopes: (process.env.APPLE_SCOPES || 'name,email').split(','),
  authUrl: 'https://appleid.apple.com/auth/authorize',
  tokenUrl: 'https://appleid.apple.com/auth/token',
  userInfoUrl: 'https://appleid.apple.com/auth/userinfo',
  revokeUrl: 'https://appleid.apple.com/auth/revoke',
  enablePKCE: true,
  enableState: true,
  icon: 'apple',
  color: '#000000',
  enabled: !!(process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET),
});

/**
 * LinkedIn OAuth configuration
 */
const buildLinkedInConfig = (baseCallbackUrl: string): OAuthProviderConfig => ({
  provider: 'linkedin',
  displayName: 'LinkedIn',
  displayNameBn: 'লিংকডইন',
  clientId: process.env.LINKEDIN_CLIENT_ID || '',
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
  callbackUrl: process.env.LINKEDIN_CALLBACK_URL || `${baseCallbackUrl}/auth/linkedin/callback`,
  scopes: (process.env.LINKEDIN_SCOPES || 'openid,profile,email').split(','),
  authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
  tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
  userInfoUrl: 'https://api.linkedin.com/v2/userinfo',
  revokeUrl: 'https://www.linkedin.com/oauth/v2/revoke',
  enablePKCE: true,
  enableState: true,
  icon: 'linkedin',
  color: '#0077B5',
  enabled: !!(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET),
});

/**
 * WhatsApp OAuth configuration (Bangladesh specific)
 */
const buildWhatsAppConfig = (baseCallbackUrl: string): OAuthProviderConfig => ({
  provider: 'whatsapp',
  displayName: 'WhatsApp',
  displayNameBn: 'হোয়াটসঅ্যাপ',
  clientId: process.env.WHATSAPP_BUSINESS_PHONE_ID || '',
  clientSecret: process.env.WHATSAPP_ACCESS_TOKEN || '',
  callbackUrl: process.env.WHATSAPP_CALLBACK_URL || `${baseCallbackUrl}/auth/whatsapp/callback`,
  scopes: (process.env.WHATSAPP_SCOPES || 'whatsapp_business_messaging').split(','),
  authUrl: 'https://graph.facebook.com/v17.0/oauth/access_token',
  tokenUrl: 'https://graph.facebook.com/v17.0/oauth/access_token',
  userInfoUrl: `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_BUSINESS_PHONE_ID}`,
  enablePKCE: false,
  enableState: true,
  icon: 'whatsapp',
  color: '#25D366',
  enabled: !!(process.env.WHATSAPP_BUSINESS_PHONE_ID && process.env.WHATSAPP_ACCESS_TOKEN),
});

/**
 * bKash OAuth configuration (Bangladesh specific)
 */
const buildBkashConfig = (baseCallbackUrl: string): OAuthProviderConfig => ({
  provider: 'bkash',
  displayName: 'bKash',
  displayNameBn: 'বিকাশ',
  clientId: process.env.BKASH_APP_KEY || '',
  clientSecret: process.env.BKASH_APP_SECRET || '',
  callbackUrl: process.env.BKASH_CALLBACK_URL || `${baseCallbackUrl}/auth/bkash/callback`,
  scopes: (process.env.BKASH_SCOPES || 'payment').split(','),
  authUrl: process.env.BKASH_AUTH_URL || 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/oauth/token',
  tokenUrl: process.env.BKASH_TOKEN_URL || 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/oauth/token',
  userInfoUrl: process.env.BKASH_USER_INFO_URL || 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/user/info',
  enablePKCE: false,
  enableState: true,
  icon: 'bkash',
  color: '#E2136E',
  enabled: !!(process.env.BKASH_APP_KEY && process.env.BKASH_APP_SECRET),
});

/**
 * Nagad OAuth configuration (Bangladesh specific)
 */
const buildNagadConfig = (baseCallbackUrl: string): OAuthProviderConfig => ({
  provider: 'nagad',
  displayName: 'Nagad',
  displayNameBn: 'নগদ',
  clientId: process.env.NAGAD_MERCHANT_ID || '',
  clientSecret: process.env.NAGAD_PUBLIC_KEY || '',
  callbackUrl: process.env.NAGAD_CALLBACK_URL || `${baseCallbackUrl}/auth/nagad/callback`,
  scopes: (process.env.NAGAD_SCOPES || 'payment').split(','),
  authUrl: process.env.NAGAD_AUTH_URL || 'https://sandbox.mynagad.com/api/dfs/oauth/token',
  tokenUrl: process.env.NAGAD_TOKEN_URL || 'https://sandbox.mynagad.com/api/dfs/oauth/token',
  userInfoUrl: process.env.NAGAD_USER_INFO_URL || 'https://sandbox.mynagad.com/api/dfs/user/info',
  enablePKCE: false,
  enableState: true,
  icon: 'nagad',
  color: '#F26B21',
  enabled: !!(process.env.NAGAD_MERCHANT_ID && process.env.NAGAD_PUBLIC_KEY),
});

/**
 * Rocket OAuth configuration (Bangladesh specific)
 */
const buildRocketConfig = (baseCallbackUrl: string): OAuthProviderConfig => ({
  provider: 'rocket',
  displayName: 'Rocket',
  displayNameBn: 'রকেট',
  clientId: process.env.ROCKET_MERCHANT_ID || '',
  clientSecret: process.env.ROCKET_PUBLIC_KEY || '',
  callbackUrl: process.env.ROCKET_CALLBACK_URL || `${baseCallbackUrl}/auth/rocket/callback`,
  scopes: (process.env.ROCKET_SCOPES || 'payment').split(','),
  authUrl: process.env.ROCKET_AUTH_URL || 'https://api.rocket.com.bd/v1/oauth/token',
  tokenUrl: process.env.ROCKET_TOKEN_URL || 'https://api.rocket.com.bd/v1/oauth/token',
  userInfoUrl: process.env.ROCKET_USER_INFO_URL || 'https://api.rocket.com.bd/v1/user/info',
  enablePKCE: false,
  enableState: true,
  icon: 'rocket',
  color: '#1E88E5',
  enabled: !!(process.env.ROCKET_MERCHANT_ID && process.env.ROCKET_PUBLIC_KEY),
});

// ============================================================
// Configuration Builder
// ============================================================

/**
 * Build OAuth configuration from environment
 */
const buildOAuthConfig = (): OAuthConfig => {
  const baseCallbackUrl = process.env.OAUTH_BASE_CALLBACK_URL || env.APP_URL || 'http://localhost:3000';

  return {
    baseCallbackUrl,
    providers: {
      google: buildGoogleConfig(baseCallbackUrl),
      facebook: buildFacebookConfig(baseCallbackUrl),
      github: buildGitHubConfig(baseCallbackUrl),
      apple: buildAppleConfig(baseCallbackUrl),
      linkedin: buildLinkedInConfig(baseCallbackUrl),
      whatsapp: buildWhatsAppConfig(baseCallbackUrl),
      bkash: buildBkashConfig(baseCallbackUrl),
      nagad: buildNagadConfig(baseCallbackUrl),
      rocket: buildRocketConfig(baseCallbackUrl),
    },
    defaultProvider: (process.env.OAUTH_DEFAULT_PROVIDER as OAuthProvider) || 'google',
    pkce: {
      enabled: process.env.OAUTH_PKCE_ENABLED !== 'false',
      verifierLength: parseInt(process.env.OAUTH_PKCE_VERIFIER_LENGTH || '64', 10),
      challengeMethod: (process.env.OAUTH_PKCE_CHALLENGE_METHOD as 'S256' | 'plain') || 'S256',
    },
    state: {
      length: parseInt(process.env.OAUTH_STATE_LENGTH || '32', 10),
      expirySeconds: parseInt(process.env.OAUTH_STATE_EXPIRY_SECONDS || '300', 10),
    },
  };
};

// ============================================================
// Export Configuration
// ============================================================

/**
 * OAuth configuration instance
 */
export const oauthConfig: OAuthConfig = buildOAuthConfig();

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get OAuth configuration for a specific provider
 */
export const getOAuthProviderConfig = (provider: OAuthProvider): OAuthProviderConfig | undefined => {
  return oauthConfig.providers[provider];
};

/**
 * Get all enabled OAuth providers
 */
export const getEnabledOAuthProviders = (): OAuthProvider[] => {
  return Object.entries(oauthConfig.providers)
    .filter(([, config]) => config.enabled)
    .map(([provider]) => provider as OAuthProvider);
};

/**
 * Check if a specific OAuth provider is enabled
 */
export const isOAuthProviderEnabled = (provider: OAuthProvider): boolean => {
  return oauthConfig.providers[provider]?.enabled ?? false;
};

/**
 * Get OAuth login URL for a specific provider
 */
export const getOAuthLoginUrl = (provider: OAuthProvider, state: string): string | null => {
  const config = oauthConfig.providers[provider];
  if (!config || !config.enabled) return null;

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.callbackUrl,
    response_type: 'code',
    scope: config.scopes.join(' '),
    state,
  });

  if (config.enablePKCE) {
    params.set('code_challenge_method', oauthConfig.pkce.challengeMethod);
  }

  return `${config.authUrl}?${params.toString()}`;
};

/**
 * Get OAuth provider display name
 */
export const getOAuthProviderDisplayName = (
  provider: OAuthProvider,
  locale: 'en' | 'bn' = 'en'
): string => {
  const config = oauthConfig.providers[provider];
  if (!config) return provider;
  return locale === 'bn' ? config.displayNameBn : config.displayName;
};

// ============================================================
// Type Exports
// ============================================================

export type { OAuthConfig as OAuthConfiguration, OAuthProviderConfig as OAuthProviderConfiguration };
