/**
 * JWT Configuration - Enterprise Grade
 * 
 * @module infrastructure/config/jwt.config
 * 
 * @description
 * Centralized JWT configuration using shared-config.
 * Provides type-safe JWT settings with environment support.
 * 
 * Enterprise Features:
 * ✅ Environment-aware configuration
 * ✅ RS256/HS256 support (RS256 for production)
 * ✅ Token expiry management
 * ✅ Clock tolerance for sync issues
 * ✅ Key rotation support
 * ✅ Issuer/Audience validation
 * 
 * @example
 * import { jwtConfig } from './jwt.config';
 * 
 * const secret = jwtConfig.secret;
 * const expiresIn = jwtConfig.accessTokenExpiry;
 */

import { env } from '@vubon/shared-config';

// ============================================================
// Types
// ============================================================

/**
 * JWT algorithm types
 */
export type JWTAlgorithm = 'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384' | 'ES512';

/**
 * JWT configuration interface
 * ✅ FIXED: Using explicit `| undefined` instead of optional `?:` for `exactOptionalPropertyTypes`
 */
export interface JWTConfig {
  /** JWT secret (for HS algorithms) */
  secret: string;
  /** Public key (for RS/ES algorithms) */
  publicKey: string | undefined;
  /** Private key (for RS/ES algorithms) */
  privateKey: string | undefined;
  /** Algorithm to use */
  algorithm: JWTAlgorithm;
  /** Access token expiry (e.g., '15m', '1h', '7d') */
  accessTokenExpiry: string;
  /** Refresh token expiry */
  refreshTokenExpiry: string;
  /** Reset token expiry */
  resetTokenExpiry: string;
  /** Email verification token expiry */
  verificationTokenExpiry: string;
  /** MFA token expiry */
  mfaTokenExpiry: string;
  /** Magic link expiry */
  magicLinkExpiry: string;
  /** Issuer claim */
  issuer: string;
  /** Audience claim */
  audience: string;
  /** Clock tolerance in seconds */
  clockTolerance: number;
  /** Token version */
  version: number;
}

// ============================================================
// Environment Detection
// ============================================================

const isProduction = env.NODE_ENV === 'production';

// ============================================================
// Configuration Builder
// ============================================================

/**
 * Build JWT configuration from environment
 */
const buildJWTConfig = (): JWTConfig => {
  // Determine algorithm (RS256 for production, HS256 for development)
  const algorithm = (process.env.JWT_ALGORITHM as JWTAlgorithm) || (isProduction ? 'RS256' : 'HS256');

  // Get secret (required for HS algorithms)
  const secret = process.env.JWT_SECRET || '';

  // Get public/private keys for RS/ES algorithms (explicitly undefined if not set)
  const publicKey: string | undefined = process.env.JWT_PUBLIC_KEY;
  const privateKey: string | undefined = process.env.JWT_PRIVATE_KEY;

  // Validate secret for HS algorithms
  const isHS = algorithm.startsWith('HS');
  if (isHS && (!secret || secret.length < 32)) {
    throw new Error(
      `JWT_SECRET must be at least 32 characters for ${algorithm} algorithm. ` +
      `Current length: ${secret?.length || 0}`
    );
  }

  // Validate keys for RS/ES algorithms
  const isRS = algorithm.startsWith('RS') || algorithm.startsWith('ES');
  if (isRS && (!publicKey || !privateKey)) {
    throw new Error(
      `JWT_PUBLIC_KEY and JWT_PRIVATE_KEY are required for ${algorithm} algorithm`
    );
  }

  // Token expiry values
  const accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY || '15m';
  const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY || '7d';
  const resetTokenExpiry = process.env.JWT_RESET_EXPIRY || '1h';
  const verificationTokenExpiry = process.env.JWT_VERIFICATION_EXPIRY || '24h';
  const mfaTokenExpiry = process.env.JWT_MFA_EXPIRY || '5m';
  const magicLinkExpiry = process.env.JWT_MAGIC_LINK_EXPIRY || '5m';

  // Issuer and audience
  const issuer = process.env.JWT_ISSUER || 'vubon.com.bd';
  const audience = process.env.JWT_AUDIENCE || 'vubon-api';

  // Clock tolerance (for clock skew)
  const clockTolerance = parseInt(process.env.JWT_CLOCK_TOLERANCE || '30', 10);

  // Token version
  const version = parseInt(process.env.JWT_VERSION || '1', 10);

  return {
    secret,
    publicKey,
    privateKey,
    algorithm,
    accessTokenExpiry,
    refreshTokenExpiry,
    resetTokenExpiry,
    verificationTokenExpiry,
    mfaTokenExpiry,
    magicLinkExpiry,
    issuer,
    audience,
    clockTolerance,
    version,
  };
};

// ============================================================
// Export Configuration
// ============================================================

/**
 * JWT configuration instance
 */
export const jwtConfig: JWTConfig = buildJWTConfig();

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get JWT configuration for a specific environment
 */
export const getJWTConfig = (): JWTConfig => {
  return jwtConfig;
};

/**
 * Check if JWT uses asymmetric algorithm (RS/ES)
 */
export const isAsymmetricJWT = (): boolean => {
  return jwtConfig.algorithm.startsWith('RS') || jwtConfig.algorithm.startsWith('ES');
};

/**
 * Get token expiry in seconds
 * @param expiry - Expiry string (e.g., '15m', '1h', '7d')
 * @returns Expiry in seconds
 */
export const getExpiryInSeconds = (expiry: string): number => {
  const unit = expiry.slice(-1);
  const value = parseInt(expiry.slice(0, -1), 10);

  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 60 * 60;
    case 'd': return value * 60 * 60 * 24;
    case 'w': return value * 60 * 60 * 24 * 7;
    default: return parseInt(expiry, 10);
  }
};

/**
 * Get all token expiry values in seconds
 */
export const getTokenExpiriesInSeconds = () => {
  return {
    access: getExpiryInSeconds(jwtConfig.accessTokenExpiry),
    refresh: getExpiryInSeconds(jwtConfig.refreshTokenExpiry),
    reset: getExpiryInSeconds(jwtConfig.resetTokenExpiry),
    verification: getExpiryInSeconds(jwtConfig.verificationTokenExpiry),
    mfa: getExpiryInSeconds(jwtConfig.mfaTokenExpiry),
    magicLink: getExpiryInSeconds(jwtConfig.magicLinkExpiry),
  };
};

// ============================================================
// Type Exports
// ============================================================

export type { JWTConfig as JWTConfiguration };
