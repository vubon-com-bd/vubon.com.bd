/**
 * Token Utilities - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/token/index
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// JWT Utilities (jwt.util.ts)
// ============================================================
export {
  // Core JWT operations
  signToken,
  signTokenWithClaims,
  signRefreshToken,
  signAccessToken,
  signBangladeshAccessToken,

  // Verification
  verifyToken,
  verifyTokenSafe,

  // Decoding (No verification)
  decodeToken,
  decodeTokenHeader,

  // Token helpers
  getTokenExpiry,
  getTokenIssuedAt,
  isTokenExpired,
  getTokenRemainingTime,
  getTokenAge,
  getTokenSubject,
  getTokenType,
  getUserIdFromToken,
  getRoleFromToken,
  getSessionIdFromToken,
  isRefreshToken,
  isAccessToken,
} from './jwt.util';

export type {
  TokenPayload,
  TokenConfig,
  VerifiedTokenResult,
} from './jwt.util';

// ============================================================
// Refresh Token Utilities (refresh-token.util.ts)
// ============================================================
export {
  // Generation
  generateRefreshToken,
  generateUrlSafeRefreshToken,
  generateVersionedRefreshToken,
  generateFamilyRefreshToken,

  // Extraction
  extractRefreshTokenVersion,
  extractRefreshTokenValue,
  extractTokenFamilyId,
  parseRefreshToken,

  // Rotation
  rotateRefreshToken,
  rotateFamilyRefreshToken,
  createTokenFamily,

  // Validation
  isValidRefreshTokenFormat,
  isTokenVersionOlder,
  isTokenVersionNewer,

  // Bangladesh specific
  generateMobileRefreshToken,
  generateFeaturePhoneRefreshToken,
  isFeaturePhoneCompatible,

  // Constants
  DEFAULT_REFRESH_TOKEN_LENGTH,
  MIN_REFRESH_TOKEN_LENGTH,
  MAX_REFRESH_TOKEN_LENGTH,
} from './refresh-token.util';

export type {
  RefreshTokenData,
  TokenRotationResult,
  RefreshToken,
  UrlSafeRefreshToken,
  VersionedRefreshToken,
  FamilyRefreshToken,
} from './refresh-token.util';
