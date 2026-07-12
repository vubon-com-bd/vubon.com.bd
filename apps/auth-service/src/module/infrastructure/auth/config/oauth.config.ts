/**
 * OAuth Configuration - Enterprise Grade (Production Ready)
 *
 * @module infrastructure/config/oauth.config
 *
 * @description
 * Centralized OAuth configuration using shared-config.
 * Provides type-safe OAuth settings for all providers with environment support.
 *
 * ✅ Environment-aware URLs (Sandbox/Production)
 * ✅ Client Secret security (Backend only)
 * ✅ Multi-provider support (Google, Facebook, GitHub, Apple, LinkedIn, WhatsApp, bKash, Nagad, Rocket)
 * ✅ PKCE support
 * ✅ Provider enable/disable per environment
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

export interface OAuthProviderConfig {
  readonly provider: OAuthProvider;
  readonly displayName: string;
  readonly displayNameBn: string;
  readonly clientId: string;
  readonly clientSecret: string; // ⚠️ শুধুমাত্র ব্যাকএন্ডে ব্যবহারের জন্য
  readonly callbackUrl: string;
  readonly scopes: string[];
  readonly authUrl: string;
  readonly tokenUrl: string;
  readonly userInfoUrl: string;
  readonly revokeUrl?: string;
  readonly enablePKCE: boolean;
  readonly enableState: boolean;
  readonly icon: string;
  readonly color: string;
  readonly enabled: boolean;
}

export interface OAuthConfig {
  readonly baseCallbackUrl: string;
  readonly providers: Record<OAuthProvider, OAuthProviderConfig>;
  readonly defaultProvider: OAuthProvider;
  readonly pkce: {
    readonly enabled: boolean;
    readonly verifierLength: number;
    readonly challengeMethod: 'S256' | 'plain';
  };
  readonly state: {
    readonly length: number;
    readonly expirySeconds: number;
  };
}

// ============================================================
// Environment Detection
// ============================================================

const isProduction = env.NODE_ENV === 'production';

// ============================================================
// URL Builder (এনভায়রনমেন্ট-অ্যাওয়্যার)
// ============================================================

/**
 * প্রোভাইডার-নির্দিষ্ট URL তৈরি করে, যা উৎপাদন ও স্যান্ডবক্স পরিবেশের জন্য আলাদা।
 * `process.env` থেকে ওভাররাইড করা সম্ভব।
 */
const buildProviderUrls = (provider: OAuthProvider) => {
  const isProd = isProduction;
  const envPrefix = provider.toUpperCase();

  // ডিফল্ট URL (স্যান্ডবক্স/উৎপাদন)
  const defaults: Record<OAuthProvider, { auth: string; token: string; userInfo: string; revoke?: string }> = {
    google: {
      auth: 'https://accounts.google.com/o/oauth2/v2/auth',
      token: 'https://oauth2.googleapis.com/token',
      userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
      revoke: 'https://oauth2.googleapis.com/revoke',
    },
    facebook: {
      auth: `https://www.facebook.com/${process.env.FACEBOOK_API_VERSION || 'v18.0'}/dialog/oauth`,
      token: `https://graph.facebook.com/${process.env.FACEBOOK_API_VERSION || 'v18.0'}/oauth/access_token`,
      userInfo: `https://graph.facebook.com/${process.env.FACEBOOK_API_VERSION || 'v18.0'}/me`,
      revoke: `https://graph.facebook.com/${process.env.FACEBOOK_API_VERSION || 'v18.0'}/me/permissions`,
    },
    github: {
      auth: 'https://github.com/login/oauth/authorize',
      token: 'https://github.com/login/oauth/access_token',
      userInfo: 'https://api.github.com/user',
      revoke: 'https://api.github.com/applications/{client_id}/grant',
    },
    apple: {
      auth: 'https://appleid.apple.com/auth/authorize',
      token: 'https://appleid.apple.com/auth/token',
      userInfo: 'https://appleid.apple.com/auth/userinfo',
      revoke: 'https://appleid.apple.com/auth/revoke',
    },
    linkedin: {
      auth: 'https://www.linkedin.com/oauth/v2/authorization',
      token: 'https://www.linkedin.com/oauth/v2/accessToken',
      userInfo: 'https://api.linkedin.com/v2/userinfo',
      revoke: 'https://www.linkedin.com/oauth/v2/revoke',
    },
    whatsapp: {
      auth: 'https://graph.facebook.com/v17.0/oauth/access_token',
      token: 'https://graph.facebook.com/v17.0/oauth/access_token',
      userInfo: `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_BUSINESS_PHONE_ID}`,
    },
    bkash: {
      // উৎপাদন ও স্যান্ডবক্স আলাদা URL
      auth: isProd
        ? 'https://tokenized.bka.sh/v1.2.0-beta/tokenized/checkout/oauth/token'
        : 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/oauth/token',
      token: isProd
        ? 'https://tokenized.bka.sh/v1.2.0-beta/tokenized/checkout/oauth/token'
        : 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/oauth/token',
      userInfo: isProd
        ? 'https://tokenized.bka.sh/v1.2.0-beta/tokenized/checkout/user/info'
        : 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/user/info',
    },
    nagad: {
      auth: isProd
        ? 'https://api.mynagad.com/api/dfs/oauth/token'
        : 'https://sandbox.mynagad.com/api/dfs/oauth/token',
      token: isProd
        ? 'https://api.mynagad.com/api/dfs/oauth/token'
        : 'https://sandbox.mynagad.com/api/dfs/oauth/token',
      userInfo: isProd
        ? 'https://api.mynagad.com/api/dfs/user/info'
        : 'https://sandbox.mynagad.com/api/dfs/user/info',
    },
    rocket: {
      auth: isProd
        ? 'https://api.rocket.com.bd/v1/oauth/token'
        : 'https://api.rocket.com.bd/sandbox/v1/oauth/token',
      token: isProd
        ? 'https://api.rocket.com.bd/v1/oauth/token'
        : 'https://api.rocket.com.bd/sandbox/v1/oauth/token',
      userInfo: isProd
        ? 'https://api.rocket.com.bd/v1/user/info'
        : 'https://api.rocket.com.bd/sandbox/v1/user/info',
    },
  };

  const urls = defaults[provider];
  const prefix = envPrefix;

  // process.env থেকে ওভাররাইড করার সুযোগ (ডিপ্লয়মেন্টের সময় নমনীয়তা)
  return {
    authUrl: process.env[`${prefix}_AUTH_URL`] || urls.auth,
    tokenUrl: process.env[`${prefix}_TOKEN_URL`] || urls.token,
    userInfoUrl: process.env[`${prefix}_USER_INFO_URL`] || urls.userInfo,
    revokeUrl: process.env[`${prefix}_REVOKE_URL`] || urls.revoke,
  };
};

// ============================================================
// Provider Configurations
// ============================================================

const createProviderConfig = (
  provider: OAuthProvider,
  baseCallbackUrl: string,
  overrides: Partial<OAuthProviderConfig> = {}
): OAuthProviderConfig => {
  const urls = buildProviderUrls(provider);
  const envPrefix = provider.toUpperCase();

  // প্রতিটি প্রোভাইডারের জন্য বেস কনফিগ
  const baseConfig: Omit<OAuthProviderConfig, 'authUrl' | 'tokenUrl' | 'userInfoUrl' | 'revokeUrl'> = {
    provider,
    displayName: overrides.displayName || provider.charAt(0).toUpperCase() + provider.slice(1),
    displayNameBn: overrides.displayNameBn || provider.charAt(0).toUpperCase() + provider.slice(1),
    clientId: process.env[`${envPrefix}_CLIENT_ID`] || '',
    clientSecret: process.env[`${envPrefix}_CLIENT_SECRET`] || '',
    callbackUrl: process.env[`${envPrefix}_CALLBACK_URL`] || `${baseCallbackUrl}/auth/${provider}/callback`,
    scopes: (process.env[`${envPrefix}_SCOPES`] || overrides.scopes?.join(',') || '').split(',').filter(Boolean),
    enablePKCE: overrides.enablePKCE ?? false,
    enableState: overrides.enableState ?? true,
    icon: overrides.icon || provider,
    color: overrides.color || '#000000',
    enabled: overrides.enabled ?? !!(process.env[`${envPrefix}_CLIENT_ID`] && process.env[`${envPrefix}_CLIENT_SECRET`]),
  };

  // URL গুলো মিশিয়ে সম্পূর্ণ কনফিগ তৈরি
  return {
    ...baseConfig,
    ...urls,
  };
};

// ============================================================
// Configuration Builder
// ============================================================

const buildOAuthConfig = (): OAuthConfig => {
  const baseCallbackUrl = process.env.OAUTH_BASE_CALLBACK_URL || env.APP_URL || 'http://localhost:3000';

  // প্রোভাইডার-নির্দিষ্ট ওভাররাইড (যদি প্রয়োজন হয়)
  const providerOverrides: Partial<Record<OAuthProvider, Partial<OAuthProviderConfig>>> = {
    google: {
      displayName: 'Google',
      displayNameBn: 'গুগল',
      icon: 'google',
      color: '#4285F4',
      enablePKCE: true,
      scopes: ['email', 'profile'],
    },
    facebook: {
      displayName: 'Facebook',
      displayNameBn: 'ফেসবুক',
      icon: 'facebook',
      color: '#1877F2',
      scopes: ['email', 'public_profile'],
    },
    github: {
      displayName: 'GitHub',
      displayNameBn: 'গিটহাব',
      icon: 'github',
      color: '#333333',
      scopes: ['read:user', 'user:email'],
    },
    apple: {
      displayName: 'Apple',
      displayNameBn: 'অ্যাপল',
      icon: 'apple',
      color: '#000000',
      enablePKCE: true,
      scopes: ['name', 'email'],
    },
    linkedin: {
      displayName: 'LinkedIn',
      displayNameBn: 'লিংকডইন',
      icon: 'linkedin',
      color: '#0077B5',
      enablePKCE: true,
      scopes: ['openid', 'profile', 'email'],
    },
    whatsapp: {
      displayName: 'WhatsApp',
      displayNameBn: 'হোয়াটসঅ্যাপ',
      icon: 'whatsapp',
      color: '#25D366',
      scopes: ['whatsapp_business_messaging'],
    },
    bkash: {
      displayName: 'bKash',
      displayNameBn: 'বিকাশ',
      icon: 'bkash',
      color: '#E2136E',
      scopes: ['payment'],
    },
    nagad: {
      displayName: 'Nagad',
      displayNameBn: 'নগদ',
      icon: 'nagad',
      color: '#F26B21',
      scopes: ['payment'],
    },
    rocket: {
      displayName: 'Rocket',
      displayNameBn: 'রকেট',
      icon: 'rocket',
      color: '#1E88E5',
      scopes: ['payment'],
    },
  };

  const providers = {} as Record<OAuthProvider, OAuthProviderConfig>;
  for (const provider of Object.keys(providerOverrides) as OAuthProvider[]) {
    providers[provider] = createProviderConfig(
      provider,
      baseCallbackUrl,
      providerOverrides[provider]
    );
  }

  return {
    baseCallbackUrl,
    providers,
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

export const oauthConfig: OAuthConfig = buildOAuthConfig();

// ============================================================
// Helper Functions (শুধুমাত্র ব্যাকএন্ডের জন্য)
// ============================================================

export const getOAuthProviderConfig = (provider: OAuthProvider): OAuthProviderConfig | undefined => {
  return oauthConfig.providers[provider];
};

export const getEnabledOAuthProviders = (): OAuthProvider[] => {
  return Object.entries(oauthConfig.providers)
    .filter(([, config]) => config.enabled)
    .map(([provider]) => provider as OAuthProvider);
};

export const isOAuthProviderEnabled = (provider: OAuthProvider): boolean => {
  return oauthConfig.providers[provider]?.enabled ?? false;
};

/**
 * OAuth লগইন URL তৈরি করে (PKCE ও State সহ)
 */
export const getOAuthLoginUrl = (provider: OAuthProvider, state: string, codeVerifier?: string): string | null => {
  const config = oauthConfig.providers[provider];
  if (!config || !config.enabled) return null;

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.callbackUrl,
    response_type: 'code',
    scope: config.scopes.join(' '),
    state,
  });

  if (config.enablePKCE && codeVerifier) {
    params.set('code_challenge', generateCodeChallenge(codeVerifier));
    params.set('code_challenge_method', oauthConfig.pkce.challengeMethod);
  }

  return `${config.authUrl}?${params.toString()}`;
};

/**
 * PKCE চ্যালেঞ্জ জেনারেট করে (SHA-256)
 */
const generateCodeChallenge = (verifier: string): string => {
  // ব্যাকএন্ডে Node.js ক্রিপ্টো লাইব্রেরি ব্যবহার করুন
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256').update(verifier).digest('base64');
  return hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/**
 * ক্লায়েন্ট-সাইডের জন্য নিরাপদ OAuth কনফিগ (সিক্রেট বাদে)
 */
export const getPublicOAuthConfig = (): Omit<OAuthConfig, 'providers'> & {
  providers: Record<OAuthProvider, Omit<OAuthProviderConfig, 'clientSecret'> & { hasSecret: boolean }>;
} => {
  const providers = {} as any;
  for (const [key, config] of Object.entries(oauthConfig.providers)) {
    const { clientSecret, ...safeConfig } = config;
    providers[key as OAuthProvider] = {
      ...safeConfig,
      hasSecret: !!clientSecret,
    };
  }

  return {
    baseCallbackUrl: oauthConfig.baseCallbackUrl,
    providers,
    defaultProvider: oauthConfig.defaultProvider,
    pkce: oauthConfig.pkce,
    state: oauthConfig.state,
  };
};

// ============================================================
// Type Exports
// ============================================================

export type { OAuthConfig as OAuthConfiguration, OAuthProviderConfig as OAuthProviderConfiguration };
