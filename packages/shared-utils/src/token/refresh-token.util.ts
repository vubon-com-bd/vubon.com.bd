/**
 * Refresh Token Utilities - Refresh token creation and rotation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-utils/token/refresh-token.util
 * 
 * RULES:
 * ✅ ONLY token generation and rotation helpers - NO business logic
 * ✅ NO database persistence, token storage, revocation logic
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import crypto from 'crypto';

// ==================== Local Fallback Constants ====================

const TOKEN_CONFIG = {
  DEFAULT_LENGTH: 32,
  MIN_LENGTH: 16,
  MAX_LENGTH: 256,
};

const REFRESH_TOKEN_CONFIG = {
  VERSION_LENGTH: 4,
  DEFAULT_VERSION: 1,
  MAX_VERSION: 9999,
  VERSION_SEPARATOR: ':',
  FAMILY_ID_LENGTH: 32,
};

// ==================== Constants ====================

export const DEFAULT_REFRESH_TOKEN_LENGTH = TOKEN_CONFIG.DEFAULT_LENGTH;
export const MIN_REFRESH_TOKEN_LENGTH = TOKEN_CONFIG.MIN_LENGTH;
export const MAX_REFRESH_TOKEN_LENGTH = TOKEN_CONFIG.MAX_LENGTH;

const REFRESH_TOKEN_VERSION_LENGTH = REFRESH_TOKEN_CONFIG.VERSION_LENGTH;
const DEFAULT_VERSION = REFRESH_TOKEN_CONFIG.DEFAULT_VERSION;
const MAX_VERSION = REFRESH_TOKEN_CONFIG.MAX_VERSION;
const TOKEN_VERSION_SEPARATOR = REFRESH_TOKEN_CONFIG.VERSION_SEPARATOR;
const FAMILY_ID_LENGTH = REFRESH_TOKEN_CONFIG.FAMILY_ID_LENGTH;

// Character sets for token generation
const BASE64_URL_SAFE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

// ==================== Private Helpers ====================

/**
 * Validate token length
 */
const validateTokenLength = (length: number): number => {
  if (length < MIN_REFRESH_TOKEN_LENGTH) {
    throw new Error(`Token length must be at least ${MIN_REFRESH_TOKEN_LENGTH}`);
  }
  if (length > MAX_REFRESH_TOKEN_LENGTH) {
    throw new Error(`Token length cannot exceed ${MAX_REFRESH_TOKEN_LENGTH}`);
  }
  return length;
};

/**
 * Validate version number
 */
const validateVersion = (version: number): number => {
  if (version < 1 || version > MAX_VERSION) {
    throw new Error(`Version must be between 1 and ${MAX_VERSION}`);
  }
  return version;
};

/**
 * Generate random hex string
 */
const generateRandomHex = (length: number): string => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Generate random base64url string (URL-safe)
 */
const generateRandomBase64Url = (length: number): string => {
  const bytes = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    if (byte !== undefined) {
      result += BASE64_URL_SAFE[byte % BASE64_URL_SAFE.length];
    }
  }
  return result;
};

// ==================== Generation ====================

/**
 * Generate a secure refresh token (hex format)
 * 
 * @param length - Token length in bytes (default from TOKEN_CONFIG.DEFAULT_LENGTH)
 * @returns Hex string refresh token
 * 
 * @example
 * generateRefreshToken() // "a1b2c3d4e5f6..."
 */
export const generateRefreshToken = (length: number = DEFAULT_REFRESH_TOKEN_LENGTH): string => {
  const validLength = validateTokenLength(length);
  return generateRandomHex(validLength);
};

/**
 * Generate a URL-safe refresh token (base64url format)
 * Suitable for use in URLs and headers
 * 
 * @param length - Token length in bytes (default from TOKEN_CONFIG.DEFAULT_LENGTH)
 * @returns Base64url encoded refresh token
 */
export const generateUrlSafeRefreshToken = (length: number = DEFAULT_REFRESH_TOKEN_LENGTH): string => {
  const validLength = validateTokenLength(length);
  return generateRandomBase64Url(validLength);
};

/**
 * Generate a versioned refresh token (with embedded version)
 * Format: {version}:{randomToken}
 * 
 * @param version - Token version (default from REFRESH_TOKEN_CONFIG.DEFAULT_VERSION)
 * @returns Versioned refresh token
 * 
 * @example
 * generateVersionedRefreshToken() // "0001:a1b2c3d4e5f6..."
 * generateVersionedRefreshToken(5) // "0005:a1b2c3d4e5f6..."
 */
export const generateVersionedRefreshToken = (version: number = DEFAULT_VERSION): string => {
  const validVersion = validateVersion(version);
  const randomToken = generateRandomHex(DEFAULT_REFRESH_TOKEN_LENGTH);
  const versionStr = validVersion.toString().padStart(REFRESH_TOKEN_VERSION_LENGTH, '0');
  return `${versionStr}${TOKEN_VERSION_SEPARATOR}${randomToken}`;
};

/**
 * Generate a family-aware refresh token (for token rotation)
 * Contains version and family ID for better security
 * 
 * @param familyId - Token family identifier (for device families)
 * @param version - Token version (default from REFRESH_TOKEN_CONFIG.DEFAULT_VERSION)
 * @returns Family-aware refresh token
 */
export const generateFamilyRefreshToken = (
  familyId: string,
  version: number = DEFAULT_VERSION
): string => {
  const validVersion = validateVersion(version);
  const randomToken = generateRandomHex(DEFAULT_REFRESH_TOKEN_LENGTH);
  const versionStr = validVersion.toString().padStart(REFRESH_TOKEN_VERSION_LENGTH, '0');
  return `${familyId}${TOKEN_VERSION_SEPARATOR}${versionStr}${TOKEN_VERSION_SEPARATOR}${randomToken}`;
};

// ==================== Extraction ====================

/**
 * Extract version from versioned refresh token
 * 
 * @param token - Versioned refresh token
 * @returns Version number or null if invalid
 */
export const extractRefreshTokenVersion = (token: string): number | null => {
  if (!token || typeof token !== 'string') return null;
  
  const parts = token.split(TOKEN_VERSION_SEPARATOR);
  
  // Standard versioned token: version:token
  if (parts.length === 2) {
    const version = parseInt(parts[0]!, 10);
    return isNaN(version) ? null : version;
  }
  
  // Family token: familyId:version:token
  if (parts.length === 3) {
    const version = parseInt(parts[1]!, 10);
    return isNaN(version) ? null : version;
  }
  
  return null;
};

/**
 * Extract token value (random part) from versioned refresh token
 * 
 * @param token - Versioned refresh token
 * @returns Token value or null
 */
export const extractRefreshTokenValue = (token: string): string | null => {
  if (!token || typeof token !== 'string') return null;
  
  const parts = token.split(TOKEN_VERSION_SEPARATOR);
  
  // Standard versioned token: version:token
  if (parts.length === 2) {
    return parts[1]!;
  }
  
  // Family token: familyId:version:token
  if (parts.length === 3) {
    return parts[2]!;
  }
  
  return null;
};

/**
 * Extract family ID from family refresh token
 * 
 * @param token - Family refresh token
 * @returns Family ID or null
 */
export const extractTokenFamilyId = (token: string): string | null => {
  if (!token || typeof token !== 'string') return null;
  
  const parts = token.split(TOKEN_VERSION_SEPARATOR);
  
  // Family token: familyId:version:token
  if (parts.length === 3) {
    return parts[0]!;
  }
  
  return null;
};

/**
 * Parse refresh token into structured data
 * 
 * @param token - Refresh token
 * @returns Parsed token data or null
 */
export const parseRefreshToken = (token: string): RefreshTokenData | null => {
  if (!token || typeof token !== 'string') return null;
  
  const version = extractRefreshTokenVersion(token);
  const value = extractRefreshTokenValue(token);
  
  if (version === null || value === null) return null;
  
  const familyId = extractTokenFamilyId(token);
  
  return {
    token,
    version,
    value,
    // ✅ FIXED: familyId is optional, so we can leave it undefined
    ...(familyId && { familyId }),
  };
};

// ==================== Rotation ====================

/**
 * Generate a new refresh token for rotation (increment version)
 * 
 * @param oldToken - Old refresh token (versioned)
 * @returns New token with incremented version
 * 
 * @example
 * const { newToken, newVersion } = rotateRefreshToken(oldToken);
 */
export const rotateRefreshToken = (oldToken: string): { newToken: string; newVersion: number } => {
  const oldVersion = extractRefreshTokenVersion(oldToken);
  const newVersion = (oldVersion ?? 0) + 1;
  const newToken = generateVersionedRefreshToken(newVersion);
  return { newToken, newVersion };
};

/**
 * Rotate a family refresh token (preserve family ID)
 * 
 * @param oldToken - Old family refresh token
 * @returns New family token with incremented version
 */
export const rotateFamilyRefreshToken = (oldToken: string): { newToken: string; newVersion: number } => {
  const familyId = extractTokenFamilyId(oldToken);
  const oldVersion = extractRefreshTokenVersion(oldToken);
  
  if (!familyId) {
    throw new Error('Invalid family token format');
  }
  
  const newVersion = (oldVersion ?? 0) + 1;
  const newToken = generateFamilyRefreshToken(familyId, newVersion);
  return { newToken, newVersion };
};

/**
 * Generate a new token family (for new device trust)
 * 
 * @returns New family ID and initial token
 */
export const createTokenFamily = (): { familyId: string; token: string } => {
  const familyId = generateRandomHex(FAMILY_ID_LENGTH);
  const token = generateFamilyRefreshToken(familyId, DEFAULT_VERSION);
  return { familyId, token };
};

// ==================== Validation ====================

/**
 * Validate refresh token format
 * 
 * @param token - Refresh token to validate
 * @returns True if token has valid format
 */
export const isValidRefreshTokenFormat = (token: string): boolean => {
  if (!token || typeof token !== 'string') return false;
  
  // Check for versioned token format (version:token)
  if (token.includes(TOKEN_VERSION_SEPARATOR)) {
    const parts = token.split(TOKEN_VERSION_SEPARATOR);
    
    // Standard versioned token
    if (parts.length === 2) {
      const version = parseInt(parts[0]!, 10);
      if (isNaN(version) || version < 1 || version > MAX_VERSION) return false;
      if (parts[1]!.length !== DEFAULT_REFRESH_TOKEN_LENGTH * 2) return false;
      return true;
    }
    
    // Family token (familyId:version:token)
    if (parts.length === 3) {
      const version = parseInt(parts[1]!, 10);
      if (isNaN(version) || version < 1 || version > MAX_VERSION) return false;
      if (parts[2]!.length !== DEFAULT_REFRESH_TOKEN_LENGTH * 2) return false;
      if (parts[0]!.length !== FAMILY_ID_LENGTH * 2) return false;
      return true;
    }
    
    return false;
  }
  
  // Check for unversioned token format (hex only)
  if (token.length === DEFAULT_REFRESH_TOKEN_LENGTH * 2) {
    return /^[a-f0-9]+$/i.test(token);
  }
  
  return false;
};

/**
 * Check if token version is older than expected
 * 
 * @param token - Refresh token
 * @param expectedVersion - Expected version
 * @returns True if token version is older
 */
export const isTokenVersionOlder = (token: string, expectedVersion: number): boolean => {
  const version = extractRefreshTokenVersion(token);
  if (version === null) return true;
  return version < expectedVersion;
};

/**
 * Check if token version is newer than expected
 * 
 * @param token - Refresh token
 * @param expectedVersion - Expected version
 * @returns True if token version is newer
 */
export const isTokenVersionNewer = (token: string, expectedVersion: number): boolean => {
  const version = extractRefreshTokenVersion(token);
  if (version === null) return false;
  return version > expectedVersion;
};

// ==================== Bangladesh Specific Helpers ====================

/**
 * Generate refresh token for Bangladesh mobile users
 * Optimized for mobile network conditions
 * 
 * @returns Mobile-optimized refresh token
 */
export const generateMobileRefreshToken = (): string => {
  return generateUrlSafeRefreshToken(24); // 24 bytes = 32 chars base64url
};

/**
 * Generate refresh token for feature phone users (Bangladesh)
 * Even shorter for limited storage
 * 
 * @returns Feature phone optimized refresh token
 */
export const generateFeaturePhoneRefreshToken = (): string => {
  return generateUrlSafeRefreshToken(16); // 16 bytes = 22 chars base64url
};

/**
 * Check if refresh token is compatible with feature phone storage
 * 
 * @param token - Refresh token
 * @returns True if token length is suitable for feature phones
 */
export const isFeaturePhoneCompatible = (token: string): boolean => {
  return token.length <= 64; // Feature phones have limited storage
};

// ==================== Type Exports ====================

export interface RefreshTokenData {
  token: string;
  version: number;
  value: string;
  familyId?: string;  // ✅ FIXED: Made optional to match return type
}

export interface TokenRotationResult {
  oldToken: RefreshTokenData;
  newToken: RefreshTokenData;
}

// ==================== Type Exports ====================

export type RefreshToken = ReturnType<typeof generateRefreshToken>;
export type UrlSafeRefreshToken = ReturnType<typeof generateUrlSafeRefreshToken>;
export type VersionedRefreshToken = ReturnType<typeof generateVersionedRefreshToken>;
export type FamilyRefreshToken = ReturnType<typeof generateFamilyRefreshToken>;
