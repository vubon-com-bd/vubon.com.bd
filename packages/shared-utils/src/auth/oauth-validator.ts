/**
 * Auth OAuth Validator
 * প্রমীকরণ OAuth ভ্যালিডেটর
 */

import { AUTH_OAUTH } from '@vubon/shared-constants';

type OAuthProvider = (typeof AUTH_OAUTH.PROVIDERS)[keyof typeof AUTH_OAUTH.PROVIDERS];
type OAuthGrantType = (typeof AUTH_OAUTH.GRANT_TYPES)[keyof typeof AUTH_OAUTH.GRANT_TYPES];
type OAuthResponseType = (typeof AUTH_OAUTH.RESPONSE_TYPES)[keyof typeof AUTH_OAUTH.RESPONSE_TYPES];

interface OAuthProviderConfig {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  userInfoEndpoint: string;
  scopes: string[];
}

export const AuthOAuthValidator = {
  /**
   * Validate OAuth provider
   * OAuth প্রোভাইডার ভ্যালিডেট করা
   */
  validateProvider: (provider: string): provider is OAuthProvider => {
    const validProviders = Object.values(AUTH_OAUTH.PROVIDERS);
    return validProviders.includes(provider as OAuthProvider);
  },

  /**
   * Validate OAuth grant type
   * OAuth গ্রান্ট টাইপ ভ্যালিডেট করা
   */
  validateGrantType: (grantType: string): grantType is OAuthGrantType => {
    const validGrantTypes = Object.values(AUTH_OAUTH.GRANT_TYPES);
    return validGrantTypes.includes(grantType as OAuthGrantType);
  },

  /**
   * Validate OAuth response type
   * OAuth রেসপন্স টাইপ ভ্যালিডেট করা
   */
  validateResponseType: (responseType: string): responseType is OAuthResponseType => {
    const validResponseTypes = Object.values(AUTH_OAUTH.RESPONSE_TYPES);
    return validResponseTypes.includes(responseType as OAuthResponseType);
  },

  /**
   * Validate OAuth state
   * OAuth স্টেট ভ্যালিডেট করা
   */
  validateState: (state: string, storedState: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!state) {
      errors.push('State parameter is required');
    }

    if (!storedState) {
      errors.push('Stored state not found');
    }

    if (state && storedState && state !== storedState) {
      errors.push('State mismatch - possible CSRF attack');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate OAuth redirect URI
   * OAuth রিডাইরেক্ট ইউআরআই ভ্যালিডেট করা
   */
  validateRedirectUri: (
    redirectUri: string,
    allowedUris: string[]
  ): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!redirectUri) {
      errors.push('Redirect URI is required');
      return { valid: false, errors };
    }

    try {
      const uri = new URL(redirectUri);
      if (!['http:', 'https:'].includes(uri.protocol)) {
        errors.push('Invalid protocol - only HTTP/HTTPS allowed');
      }
    } catch (error) {
      errors.push(
        `Invalid URL format: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }

    if (allowedUris && allowedUris.length > 0) {
      const isAllowed = allowedUris.some((allowed) => {
        try {
          const allowedUrl = new URL(allowed);
          const uri = new URL(redirectUri);
          return allowedUrl.origin === uri.origin && allowedUrl.pathname === uri.pathname;
        } catch {
          return false;
        }
      });

      if (!isAllowed) {
        errors.push('Redirect URI is not allowed');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate OAuth token
   * OAuth টোকেন ভ্যালিডেট করা
   */
  validateToken: (token: {
    accessToken: string;
    expiresIn?: number;
    tokenType?: string;
  }): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!token.accessToken || token.accessToken.length === 0) {
      errors.push('Access token is required');
    }

    if (token.expiresIn !== undefined && token.expiresIn <= 0) {
      errors.push('Expires in must be positive');
    }

    if (token.tokenType && !['Bearer', 'Mac', 'OAuth'].includes(token.tokenType)) {
      errors.push(`Invalid token type: ${token.tokenType}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Get OAuth provider configuration
   * OAuth প্রোভাইডার কনফিগারেশন পাওয়া
   */
  getProviderConfig: (provider: string): OAuthProviderConfig | null => {
    const configs: Record<string, OAuthProviderConfig> = {
      google: {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        userInfoEndpoint: 'https://www.googleapis.com/oauth2/v2/userinfo',
        scopes: ['email', 'profile', 'openid'],
      },
      facebook: {
        authorizationEndpoint: 'https://www.facebook.com/v18.0/dialog/oauth',
        tokenEndpoint: 'https://graph.facebook.com/v18.0/oauth/access_token',
        userInfoEndpoint: 'https://graph.facebook.com/v18.0/me',
        scopes: ['email', 'public_profile'],
      },
      github: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        userInfoEndpoint: 'https://api.github.com/user',
        scopes: ['user:email', 'read:user'],
      },
      linkedin: {
        authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
        tokenEndpoint: 'https://www.linkedin.com/oauth/v2/accessToken',
        userInfoEndpoint: 'https://api.linkedin.com/v2/userinfo',
        scopes: ['email', 'profile'],
      },
      twitter: {
        authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
        tokenEndpoint: 'https://api.twitter.com/2/oauth2/token',
        userInfoEndpoint: 'https://api.twitter.com/2/users/me',
        scopes: ['users.read', 'tweet.read'],
      },
      microsoft: {
        authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        userInfoEndpoint: 'https://graph.microsoft.com/v1.0/me',
        scopes: ['User.Read', 'email', 'openid', 'profile'],
      },
      apple: {
        authorizationEndpoint: 'https://appleid.apple.com/auth/authorize',
        tokenEndpoint: 'https://appleid.apple.com/auth/token',
        userInfoEndpoint: 'https://appleid.apple.com/auth/userinfo',
        scopes: ['email', 'name'],
      },
    };

    return configs[provider.toLowerCase()] || null;
  },
};
