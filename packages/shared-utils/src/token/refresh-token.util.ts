import { randomUUID } from 'crypto';

/**
 * Interface for refresh token data stored in database
 */
export interface RefreshTokenData {
  /** Unique token identifier */
  tokenId: string;
  /** User ID associated with the token */
  userId: string;
  /** Token family ID for rotation tracking */
  familyId: string;
  /** Current version of the token */
  version: number;
  /** Timestamp when token was created */
  createdAt: Date;
  /** Timestamp when token expires */
  expiresAt: Date;
  /** Whether token is revoked */
  isRevoked: boolean;
  /** Token metadata (device info, IP, etc.) */
  metadata: Record<string, unknown>;
}

/**
 * Interface for token rotation result
 */
export interface TokenRotationResult {
  /** New refresh token string */
  newToken: string;
  /** New version number */
  version: number;
  /** Token family ID */
  familyId: string;
}

/**
 * Generates a new refresh token using UUID v4
 *
 * @returns A unique refresh token string
 *
 * @example
 * const token = generateRefreshToken();
 * // '123e4567-e89b-12d3-a456-426614174000'
 */
export function generateRefreshToken(): string {
  return randomUUID();
}

/**
 * Rotates a refresh token by generating a new one with incremented version
 *
 * @param oldToken - The old refresh token to rotate
 * @param familyId - The token family ID (optional, will be generated if not provided)
 * @returns An object containing the new token, version, and family ID
 *
 * @example
 * const result = rotateRefreshToken('old-token-123');
 * // { newToken: 'new-token-456', version: 2, familyId: 'family-789' }
 */
export function rotateRefreshToken(oldToken: string, familyId?: string): TokenRotationResult {
  if (!oldToken || typeof oldToken !== 'string') {
    throw new Error('Old token must be a non-empty string');
  }

  const newToken = generateRefreshToken();
  const newFamilyId = familyId || generateTokenFamily();
  const version = getRefreshTokenVersion(oldToken) + 1;

  return {
    newToken,
    version,
    familyId: newFamilyId,
  };
}

/**
 * Generates a new token family ID for tracking token rotations
 *
 * @returns A unique token family ID
 *
 * @example
 * const familyId = generateTokenFamily();
 * // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
 */
export function generateTokenFamily(): string {
  return randomUUID();
}

/**
 * Validates if a token belongs to a specific token family
 *
 * @param familyId - The token family ID to check against
 * @param token - The token to validate
 * @returns `true` if the token belongs to the family, `false` otherwise
 *
 * @example
 * const isValid = isTokenFamilyValid('family-123', 'token-456');
 * // true or false
 */
export function isTokenFamilyValid(familyId: string, token: string): boolean {
  if (!familyId || typeof familyId !== 'string') {
    throw new Error('Family ID must be a non-empty string');
  }

  if (!token || typeof token !== 'string') {
    throw new Error('Token must be a non-empty string');
  }

  // In a real implementation, this would check against a database
  // For now, we just validate the format and return true
  // The actual validation should be done in the service layer with database lookup
  return true;
}

/**
 * Extracts the version from a refresh token
 * In a real implementation, this would decode the token or look up from database
 *
 * @param token - The refresh token to extract version from
 * @returns The version number (defaults to 1 if not found)
 *
 * @example
 * const version = getRefreshTokenVersion('token-123');
 * // 1, 2, 3, etc.
 */
export function getRefreshTokenVersion(token: string): number {
  if (!token || typeof token !== 'string') {
    throw new Error('Token must be a non-empty string');
  }

  // In production, this would decode the token or query the database
  // For now, we return a default version
  // The actual implementation should extract version from the token payload
  return 1;
}

/**
 * Creates a new refresh token with metadata
 *
 * @param userId - The user ID associated with the token
 * @param metadata - Additional metadata (device, IP, etc.)
 * @returns A complete refresh token data object
 *
 * @example
 * const tokenData = createRefreshTokenData('user-123', {
 *   deviceId: 'device-456',
 *   ipAddress: '192.168.1.1'
 * });
 */
export function createRefreshTokenData(
  userId: string,
  metadata: Record<string, unknown> = {}
): RefreshTokenData {
  if (!userId || typeof userId !== 'string') {
    throw new Error('User ID must be a non-empty string');
  }

  const tokenId = generateRefreshToken();
  const familyId = generateTokenFamily();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiry

  return {
    tokenId,
    userId,
    familyId,
    version: 1,
    createdAt: new Date(),
    expiresAt,
    isRevoked: false,
    metadata,
  };
}

/**
 * Revokes a refresh token
 *
 * @param tokenData - The refresh token data to revoke
 * @returns The updated refresh token data with revoked status
 *
 * @example
 * const revoked = revokeRefreshToken(tokenData);
 * // { ...tokenData, isRevoked: true }
 */
export function revokeRefreshToken(tokenData: RefreshTokenData): RefreshTokenData {
  if (!tokenData) {
    throw new Error('Token data is required');
  }

  return {
    ...tokenData,
    isRevoked: true,
  };
}

/**
 * Revokes all tokens in a token family
 *
 * @param familyId - The family ID to revoke all tokens for
 * @returns The family ID that was revoked
 *
 * @example
 * const result = revokeTokenFamily('family-123');
 * // 'family-123'
 */
export function revokeTokenFamily(familyId: string): string {
  if (!familyId || typeof familyId !== 'string') {
    throw new Error('Family ID must be a non-empty string');
  }

  // In production, this would update the database
  // For now, we just return the family ID
  return familyId;
}

/**
 * Checks if a refresh token is expired
 *
 * @param tokenData - The refresh token data to check
 * @returns `true` if the token is expired, `false` otherwise
 *
 * @example
 * const isExpired = isRefreshTokenExpired(tokenData);
 * // true or false
 */
export function isRefreshTokenExpired(tokenData: RefreshTokenData): boolean {
  if (!tokenData) {
    throw new Error('Token data is required');
  }

  return new Date() > tokenData.expiresAt;
}

/**
 * Checks if a refresh token is valid (not revoked and not expired)
 *
 * @param tokenData - The refresh token data to validate
 * @returns `true` if the token is valid, `false` otherwise
 *
 * @example
 * const isValid = isValidRefreshToken(tokenData);
 * // true or false
 */
export function isValidRefreshToken(tokenData: RefreshTokenData): boolean {
  if (!tokenData) {
    throw new Error('Token data is required');
  }

  return !tokenData.isRevoked && !isRefreshTokenExpired(tokenData);
}
