/**
 * JWT Utilities - Token signing and verification
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce 
 * 
 * @module shared-utils/token/jwt.util
 * 
 * RULES:
 * ✅ ONLY token signing and verification - NO business logic
 * ✅ NO database operations, session creation, token storage
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls (except jose)
 */

import { SignJWT, jwtVerify, decodeJwt, type JWTPayload } from 'jose';
// ✅ FIXED: Correct package name
import { JWT_CONFIG } from '@vubon/shared-constants';

// ==================== Types ====================

export interface TokenPayload extends JWTPayload {
  sub: string;           // Subject (user ID)
  iat?: number;          // Issued at
  exp?: number;          // Expiration time
  iss?: string;          // Issuer
  aud?: string;          // Audience
  jti?: string;          // JWT ID
  type?: string;         // Token type (access, refresh, etc.)
  email?: string;        // User email
  role?: string;         // User role
  sessionId?: string;    // Session ID
  deviceId?: string;     // Device ID
  // Bangladesh specific
  district?: string;     // User district
  networkType?: string;  // Network type (2G/3G/4G/5G/WiFi)
  isNightTime?: boolean; // Night time flag (10 PM - 6 AM)
}

export interface TokenConfig {
  secret: string;
  issuer: string;
  audience: string;
  expiresIn: string | number;
}

export interface VerifiedTokenResult<T extends TokenPayload = TokenPayload> {
  valid: boolean;
  payload: T | null;
  error?: string;
  errorCode?: 'EXPIRED' | 'INVALID_SIGNATURE' | 'MALFORMED' | 'ISSUER_MISMATCH' | 'AUDIENCE_MISMATCH';
}

// ==================== Constants (from shared-constants) ====================

// HS256 configuration (symmetric - for internal/legacy use)
const DEFAULT_ALGORITHM = JWT_CONFIG.HS256_CONFIG?.ALGORITHM || 'HS256';
const DEFAULT_TOKEN_TYPE = JWT_CONFIG.HS256_CONFIG?.TOKEN_TYPE || 'JWT';
const MIN_SECRET_LENGTH = JWT_CONFIG.HS256_CONFIG?.MIN_SECRET_LENGTH || 32;

// Default issuer and audience (can be overridden by function parameters)
const DEFAULT_ISSUER = JWT_CONFIG.ISSUER || 'vubon.com.bd';
const DEFAULT_AUDIENCE = JWT_CONFIG.AUDIENCE || 'vubon-api';

// Token expiry defaults (from constants with fallbacks)
const DEFAULT_ACCESS_TOKEN_EXPIRY = JWT_CONFIG.ACCESS_TOKEN_EXPIRY || '15m';
const DEFAULT_REFRESH_TOKEN_EXPIRY = JWT_CONFIG.REFRESH_TOKEN_EXPIRY || '7d';

// ==================== Private Helpers ====================

/**
 * Validate required parameters
 */
const validateTokenParams = (
  secret: string,
  issuer: string,
  audience: string,
  isStrict: boolean = true
): void => {
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`Secret must be at least ${MIN_SECRET_LENGTH} characters for HS256`);
  }
  if (isStrict) {
    if (!issuer) {
      throw new Error('Issuer is required');
    }
    if (!audience) {
      throw new Error('Audience is required');
    }
  }
};

/**
 * Encode secret to Uint8Array
 */
const encodeSecret = (secret: string): Uint8Array => {
  return new TextEncoder().encode(secret);
};

/**
 * Safe buffer conversion helper
 */
const safeBuffer = (value: string | undefined, encoding: BufferEncoding = 'utf8'): Buffer => {
  if (!value) {
    return Buffer.from('');
  }
  return Buffer.from(value, encoding);
};

// ==================== Signing ====================

/**
 * Create a JWT token with HS256 algorithm
 * 
 * @param payload - Token payload (without iat, exp)
 * @param secret - Secret key (min 32 chars for HS256)
 * @param expiresIn - Expiration time (e.g., '15m', '1h', '7d')
 * @param issuer - Token issuer (defaults to JWT_CONFIG.ISSUER)
 * @param audience - Token audience (defaults to JWT_CONFIG.AUDIENCE)
 * @returns Signed JWT token
 * 
 * @example
 * const token = await signToken(
 *   { sub: 'user-123', email: 'user@example.com' },
 *   'my-secret-key-min-32-chars-long!!!',
 *   '1h'
 * );
 */
export const signToken = async <T extends TokenPayload>(
  payload: Omit<T, 'iat' | 'exp'>,
  secret: string,
  expiresIn: string | number,
  issuer: string = DEFAULT_ISSUER,
  audience: string = DEFAULT_AUDIENCE
): Promise<string> => {
  validateTokenParams(secret, issuer, audience);
  
  const secretKey = encodeSecret(secret);
  
  const jwt = await new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: DEFAULT_ALGORITHM, typ: DEFAULT_TOKEN_TYPE })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expiresIn)
    .sign(secretKey);
  
  return jwt;
};

/**
 * Create a JWT token with custom claims and optional headers
 * 
 * @param payload - Complete payload including custom claims
 * @param secret - Secret key
 * @param expiresIn - Expiration time
 * @param issuer - Token issuer (defaults to JWT_CONFIG.ISSUER)
 * @param audience - Token audience (defaults to JWT_CONFIG.AUDIENCE)
 * @param customHeaders - Optional custom headers
 * @returns Signed JWT token
 */
export const signTokenWithClaims = async <T extends Record<string, unknown>>(
  payload: T,
  secret: string,
  expiresIn: string | number,
  issuer: string = DEFAULT_ISSUER,
  audience: string = DEFAULT_AUDIENCE,
  customHeaders?: Record<string, unknown>
): Promise<string> => {
  validateTokenParams(secret, issuer, audience);
  
  const secretKey = encodeSecret(secret);
  
  let jwt = new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: DEFAULT_ALGORITHM, typ: DEFAULT_TOKEN_TYPE, ...customHeaders })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expiresIn);
  
  return jwt.sign(secretKey);
};

/**
 * Create a refresh token (longer expiry)
 * 
 * @param payload - Token payload
 * @param secret - Secret key
 * @param issuer - Token issuer (defaults to JWT_CONFIG.ISSUER)
 * @param audience - Token audience (defaults to JWT_CONFIG.AUDIENCE)
 * @returns Signed refresh token
 */
export const signRefreshToken = async <T extends TokenPayload>(
  payload: Omit<T, 'iat' | 'exp'>,
  secret: string,
  issuer: string = DEFAULT_ISSUER,
  audience: string = DEFAULT_AUDIENCE
): Promise<string> => {
  return signToken(payload, secret, DEFAULT_REFRESH_TOKEN_EXPIRY, issuer, audience);
};

/**
 * Create an access token (short expiry)
 * 
 * @param payload - Token payload
 * @param secret - Secret key
 * @param issuer - Token issuer (defaults to JWT_CONFIG.ISSUER)
 * @param audience - Token audience (defaults to JWT_CONFIG.AUDIENCE)
 * @returns Signed access token
 */
export const signAccessToken = async <T extends TokenPayload>(
  payload: Omit<T, 'iat' | 'exp'>,
  secret: string,
  issuer: string = DEFAULT_ISSUER,
  audience: string = DEFAULT_AUDIENCE
): Promise<string> => {
  return signToken(payload, secret, DEFAULT_ACCESS_TOKEN_EXPIRY, issuer, audience);
};

/**
 * Create a token with Bangladesh specific claims
 * 
 * @param userId - User ID
 * @param email - User email
 * @param role - User role
 * @param secret - Secret key
 * @param district - User district (Bangladesh)
 * @param networkType - Network type (2G/3G/4G/5G/WiFi)
 * @returns Signed access token with BD claims
 */
export const signBangladeshAccessToken = async (
  userId: string,
  email: string,
  role: string,
  secret: string,
  district?: string,
  networkType?: string
): Promise<string> => {
  const isNightTime = () => {
    const hour = new Date().getHours();
    return hour >= 22 || hour < 6; // 10 PM - 6 AM
  };

  const payload = {
    sub: userId,
    email,
    role,
    type: 'access',
    district,
    networkType,
    isNightTime: isNightTime(),
  };

  return signAccessToken(payload, secret);
};

// ==================== Verification ====================

/**
 * Verify a JWT token and return payload
 * 
 * @param token - JWT token to verify
 * @param secret - Secret key used for signing
 * @param issuer - Expected issuer (defaults to JWT_CONFIG.ISSUER)
 * @param audience - Expected audience (defaults to JWT_CONFIG.AUDIENCE)
 * @returns Verified token payload
 * @throws Error if verification fails
 */
export const verifyToken = async <T extends TokenPayload = TokenPayload>(
  token: string,
  secret: string,
  issuer: string = DEFAULT_ISSUER,
  audience: string = DEFAULT_AUDIENCE
): Promise<T> => {
  if (!token) {
    throw new Error('Token is required');
  }
  
  validateTokenParams(secret, issuer, audience);
  
  const secretKey = encodeSecret(secret);
  
  const { payload } = await jwtVerify(token, secretKey, {
    issuer,
    audience,
  });
  
  return payload as T;
};

/**
 * Verify a JWT token with detailed result (no throw)
 * 
 * @param token - JWT token to verify
 * @param secret - Secret key
 * @param issuer - Expected issuer (defaults to JWT_CONFIG.ISSUER)
 * @param audience - Expected audience (defaults to JWT_CONFIG.AUDIENCE)
 * @returns Verification result with payload or error
 */
export const verifyTokenSafe = async <T extends TokenPayload = TokenPayload>(
  token: string,
  secret: string,
  issuer: string = DEFAULT_ISSUER,
  audience: string = DEFAULT_AUDIENCE
): Promise<VerifiedTokenResult<T>> => {
  try {
    const payload = await verifyToken<T>(token, secret, issuer, audience);
    return {
      valid: true,
      payload,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    let errorCode: VerifiedTokenResult['errorCode'] = 'INVALID_SIGNATURE';
    
    if (errorMessage.includes('expired')) {
      errorCode = 'EXPIRED';
    } else if (errorMessage.includes('signature')) {
      errorCode = 'INVALID_SIGNATURE';
    } else if (errorMessage.includes('malformed')) {
      errorCode = 'MALFORMED';
    } else if (errorMessage.includes('issuer')) {
      errorCode = 'ISSUER_MISMATCH';
    } else if (errorMessage.includes('audience')) {
      errorCode = 'AUDIENCE_MISMATCH';
    }
    
    return {
      valid: false,
      payload: null,
      error: errorMessage,
      errorCode,
    };
  }
};

// ==================== Decoding (No Verification) ====================

/**
 * Decode JWT without verification
 * WARNING: Use only for extracting non-secure claims!
 * Always verify tokens in production
 * 
 * @param token - JWT token to decode
 * @returns Decoded payload or null
 */
export const decodeToken = <T extends TokenPayload = TokenPayload>(
  token: string
): T | null => {
  if (!token) return null;
  
  try {
    return decodeJwt(token) as T;
  } catch {
    return null;
  }
};

/**
 * Decode JWT header (no verification)
 * 
 * @param token - JWT token
 * @returns Decoded header or null
 */
export const decodeTokenHeader = (token: string): Record<string, unknown> | null => {
  if (!token) return null;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    // ✅ FIXED: Safe buffer conversion
    const headerJson = safeBuffer(parts[0], 'base64').toString();
    const header = JSON.parse(headerJson);
    return header;
  } catch {
    return null;
  }
};

// ==================== Token Helpers ====================

/**
 * Extract expiration time from token (Unix timestamp in seconds)
 * 
 * @param token - JWT token
 * @returns Expiration timestamp or null
 */
export const getTokenExpiry = (token: string): number | null => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return null;
  return decoded.exp;
};

/**
 * Extract issued at time from token (Unix timestamp in seconds)
 * 
 * @param token - JWT token
 * @returns Issued at timestamp or null
 */
export const getTokenIssuedAt = (token: string): number | null => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.iat) return null;
  return decoded.iat;
};

/**
 * Check if token is expired
 * 
 * @param token - JWT token
 * @returns True if expired
 */
export const isTokenExpired = (token: string): boolean => {
  const expiry = getTokenExpiry(token);
  if (!expiry) return true;
  return Date.now() >= expiry * 1000;
};

/**
 * Get remaining time on token (seconds)
 * 
 * @param token - JWT token
 * @returns Remaining seconds (0 if expired)
 */
export const getTokenRemainingTime = (token: string): number => {
  const expiry = getTokenExpiry(token);
  if (!expiry) return 0;
  const remaining = expiry - Math.floor(Date.now() / 1000);
  return Math.max(0, remaining);
};

/**
 * Get token age (seconds since issued)
 * 
 * @param token - JWT token
 * @returns Age in seconds, 0 if not available
 */
export const getTokenAge = (token: string): number => {
  const issuedAt = getTokenIssuedAt(token);
  if (!issuedAt) return 0;
  return Math.floor(Date.now() / 1000) - issuedAt;
};

/**
 * Extract subject (user ID) from token without verification
 * WARNING: Use only for non-secure operations
 * 
 * @param token - JWT token
 * @returns Subject or null
 */
export const getTokenSubject = (token: string): string | null => {
  const decoded = decodeToken(token);
  return decoded?.sub || null;
};

/**
 * Extract token type from payload
 * 
 * @param token - JWT token
 * @returns Token type or null
 */
export const getTokenType = (token: string): string | null => {
  const decoded = decodeToken(token);
  return decoded?.type || null;
};

/**
 * Extract user ID from token (alias for getTokenSubject)
 * 
 * @param token - JWT token
 * @returns User ID or null
 */
export const getUserIdFromToken = (token: string): string | null => {
  return getTokenSubject(token);
};

/**
 * Extract role from token
 * 
 * @param token - JWT token
 * @returns Role or null
 */
export const getRoleFromToken = (token: string): string | null => {
  const decoded = decodeToken(token);
  return decoded?.role || null;
};

/**
 * Extract session ID from token
 * 
 * @param token - JWT token
 * @returns Session ID or null
 */
export const getSessionIdFromToken = (token: string): string | null => {
  const decoded = decodeToken(token);
  return decoded?.sessionId || null;
};

/**
 * Check if token is a refresh token
 * 
 * @param token - JWT token
 * @returns True if refresh token
 */
export const isRefreshToken = (token: string): boolean => {
  const type = getTokenType(token);
  return type === 'refresh';
};

/**
 * Check if token is an access token
 * 
 * @param token - JWT token
 * @returns True if access token
 */
export const isAccessToken = (token: string): boolean => {
  const type = getTokenType(token);
  return type === 'access';
};

// ==================== Type Export ====================

// ✅ FIXED: Removed duplicate export - already exported above
// export type { VerifiedTokenResult };
