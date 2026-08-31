/**
 * Authentication Core Types
 * Core authentication process types (not user domain types)
 */

import type { AuthType, AuthProvider, AuthMethod, AuthScope } from '@vubon/shared-constants';
import { AUTH_TYPES, AUTH_PROVIDERS, AUTH_METHODS, AUTH_SCOPES } from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';

// ============================================================
// AUTHENTICATION CREDENTIALS
// ============================================================

/**
 * Authentication credentials
 */
export interface AuthCredentials {
  /** Email or username */
  identifier: string;
  /** Password */
  password: string;
  /** Authentication type */
  type?: AuthType;
  /** Remember me flag */
  remember?: boolean;
}

/**
 * OAuth credentials
 */
export interface AuthOAuthCredentials {
  /** OAuth provider */
  provider: AuthProvider;
  /** Authorization code */
  code: string;
  /** Redirect URI */
  redirectUri?: string;
  /** State parameter */
  state?: string;
}

/**
 * SSO credentials
 */
export interface AuthSsoCredentials {
  /** SSO provider */
  provider: string;
  /** SSO token */
  token: string;
  /** Relay state */
  relayState?: string;
}

// ============================================================
// AUTHENTICATION CONTEXT
// ============================================================

/**
 * Authentication context (without user domain data)
 */
export interface AuthContext {
  /** Authentication type used */
  authType: AuthType;
  /** Session ID */
  sessionId?: ID;
  /** Device ID */
  deviceId?: ID;
  /** IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
  /** Granted scopes */
  scopes?: AuthScope[];
  /** When authentication occurred */
  authenticatedAt: Timestamp;
}

// ============================================================
// AUTHENTICATION CONFIG
// ============================================================

/**
 * Authentication configuration
 */
export interface AuthConfig {
  /** JWT expiry (e.g., '7d') */
  jwtExpiry: string;
  /** Refresh token expiry (e.g., '30d') */
  refreshTokenExpiry: string;
  /** Session expiry in milliseconds */
  sessionExpiry: number;
  /** Maximum login attempts */
  maxLoginAttempts: number;
  /** Lockout duration in milliseconds */
  lockoutDuration: number;
  /** Minimum password length */
  passwordMinLength: number;
  /** Maximum password length */
  passwordMaxLength: number;
  /** Token algorithm */
  tokenAlgorithm:
    'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384' | 'ES512';
  /** Token issuer */
  tokenIssuer: string;
  /** Token audience */
  tokenAudience: string;
  /** Verification token expiry in milliseconds */
  verificationTokenExpiry: number;
  /** Reset token expiry in milliseconds */
  resetTokenExpiry: number;
  /** 2FA code length */
  twoFaCodeLength: number;
  /** 2FA code expiry in milliseconds */
  twoFaCodeExpiry: number;
  /** Session check interval in milliseconds */
  sessionCheckInterval: number;
}

// ============================================================
// AUTHENTICATION TOKEN
// ============================================================

/**
 * Authentication token (auth process result)
 */
export interface AuthToken {
  /** Access token */
  accessToken: string;
  /** Refresh token */
  refreshToken?: string;
  /** Token type */
  tokenType: string;
  /** Token expiry in seconds */
  expiresIn: number;
  /** Refresh token expiry in seconds */
  refreshExpiresIn?: number;
  /** Granted scopes */
  scope?: string;
  /** ID token (for OIDC) */
  idToken?: string;
}

// ============================================================
// AUTHENTICATION HEADER
// ============================================================

/**
 * Authentication header (HTTP transport)
 */
export interface AuthHeader {
  /** Authorization header */
  authorization?: string;
  /** API key header */
  xApiKey?: string;
  /** Session ID header */
  xSessionId?: string;
  /** Device ID header */
  xDeviceId?: string;
  /** User agent header */
  userAgent?: string;
  /** Forwarded for header */
  xForwardedFor?: string;
}

// ============================================================
// AUTHENTICATION COOKIE
// ============================================================

/**
 * Authentication cookie (HTTP transport)
 */
export interface AuthCookie {
  /** Access token cookie */
  accessToken?: string;
  /** Refresh token cookie */
  refreshToken?: string;
  /** Session ID cookie */
  sessionId?: string;
  /** Device ID cookie */
  deviceId?: string;
  /** 2FA code cookie */
  twoFaCode?: string;
}

// ============================================================
// AUTHENTICATION METHOD INFO
// ============================================================

/**
 * Authentication method information
 */
export interface AuthMethodInfo {
  /** Method name */
  name: AuthMethod;
  /** Display name */
  displayName: string;
  /** HTTP method */
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** Whether method requires authentication */
  requiresAuth: boolean;
  /** Whether method is public */
  isPublic: boolean;
}

// ============================================================
// AUTHENTICATION PROVIDER INFO
// ============================================================

/**
 * Authentication provider information
 */
export interface AuthProviderInfo {
  /** Provider name */
  name: AuthProvider;
  /** Display name */
  displayName: string;
  /** Whether provider is enabled */
  isEnabled: boolean;
  /** Whether provider is configured */
  isConfigured: boolean;
}

// ============================================================
// HELPER FUNCTIONS (অথেন্টিকেশন প্রক্রিয়া সম্পর্কিত)
// ============================================================

/**
 * Check if authentication type is valid
 */
export function isValidAuthType(type: string): type is AuthType {
  return Object.values(AUTH_TYPES).includes(type as AuthType);
}

/**
 * Check if authentication provider is valid
 */
export function isValidAuthProvider(provider: string): provider is AuthProvider {
  return Object.values(AUTH_PROVIDERS).includes(provider as AuthProvider);
}

/**
 * Check if authentication method is valid
 */
export function isValidAuthMethod(method: string): method is AuthMethod {
  return Object.values(AUTH_METHODS).includes(method as AuthMethod);
}

/**
 * Check if authentication scope is valid
 */
export function isValidAuthScope(scope: string): scope is AuthScope {
  return Object.values(AUTH_SCOPES).includes(scope as AuthScope);
}

/**
 * Get default auth config
 */
export function getDefaultAuthConfig(): AuthConfig {
  return {
    jwtExpiry: '7d',
    refreshTokenExpiry: '30d',
    sessionExpiry: 86400000,
    maxLoginAttempts: 5,
    lockoutDuration: 900000,
    passwordMinLength: 8,
    passwordMaxLength: 100,
    tokenAlgorithm: 'HS256',
    tokenIssuer: 'vubon.com.bd',
    tokenAudience: 'vubon-platform',
    verificationTokenExpiry: 3600000,
    resetTokenExpiry: 3600000,
    twoFaCodeLength: 6,
    twoFaCodeExpiry: 300000,
    sessionCheckInterval: 60000,
  };
}

/**
 * Create auth header
 */
export function createAuthHeader(token: string, type: string = 'Bearer'): AuthHeader {
  return {
    authorization: `${type} ${token}`,
  };
}

/**
 * Get all authentication methods info
 */
export function getAuthMethodsInfo(): AuthMethodInfo[] {
  const methodMap: Record<
    AuthMethod,
    {
      httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      requiresAuth: boolean;
      isPublic: boolean;
    }
  > = {
    login: { httpMethod: 'POST', requiresAuth: false, isPublic: true },
    register: { httpMethod: 'POST', requiresAuth: false, isPublic: true },
    logout: { httpMethod: 'POST', requiresAuth: true, isPublic: false },
    refresh: { httpMethod: 'POST', requiresAuth: false, isPublic: false },
    verify: { httpMethod: 'POST', requiresAuth: true, isPublic: false },
    'reset-password': { httpMethod: 'POST', requiresAuth: false, isPublic: true },
    'forgot-password': { httpMethod: 'POST', requiresAuth: false, isPublic: true },
    'change-password': { httpMethod: 'PUT', requiresAuth: true, isPublic: false },
    'enable-2fa': { httpMethod: 'POST', requiresAuth: true, isPublic: false },
    'disable-2fa': { httpMethod: 'POST', requiresAuth: true, isPublic: false },
    'verify-2fa': { httpMethod: 'POST', requiresAuth: true, isPublic: false },
  };

  const displayNames: Record<AuthMethod, string> = {
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    refresh: 'Refresh Token',
    verify: 'Verify Identity',
    'reset-password': 'Reset Password',
    'forgot-password': 'Forgot Password',
    'change-password': 'Change Password',
    'enable-2fa': 'Enable 2FA',
    'disable-2fa': 'Disable 2FA',
    'verify-2fa': 'Verify 2FA',
  };

  return Object.keys(AUTH_METHODS).map((key) => {
    const method = AUTH_METHODS[key as keyof typeof AUTH_METHODS];
    return {
      name: method,
      displayName: displayNames[method] || method,
      httpMethod: methodMap[method]?.httpMethod || 'POST',
      requiresAuth: methodMap[method]?.requiresAuth || false,
      isPublic: methodMap[method]?.isPublic || false,
    };
  });
}

/**
 * Get all authentication providers info
 */
export function getAuthProvidersInfo(): AuthProviderInfo[] {
  const displayNames: Record<AuthProvider, string> = {
    google: 'Google',
    facebook: 'Facebook',
    github: 'GitHub',
    apple: 'Apple',
    microsoft: 'Microsoft',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
  };

  return Object.keys(AUTH_PROVIDERS).map((key) => {
    const provider = AUTH_PROVIDERS[key as keyof typeof AUTH_PROVIDERS];
    return {
      name: provider,
      displayName: displayNames[provider] || provider,
      isEnabled: true,
      isConfigured: false,
    };
  });
}
