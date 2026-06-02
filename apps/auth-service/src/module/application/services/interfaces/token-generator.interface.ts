/**
 * Token Generator Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/token-generator.interface
 * 
 * @description
 * Interface for JWT token generation and verification.
 * Implementation resides in infrastructure layer (JwtTokenGenerator).
 * 
 * Enterprise Rules:
 * ✅ Pure interface - No implementation
 * ✅ No business logic
 * ✅ Infrastructure-agnostic
 * ✅ Complete type safety
 * ✅ Support for token rotation and blacklisting
 */

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট
import type { 
  TokenType, 
  TokenPayload as SharedTokenPayload,
  UserTier,
  TokenVerificationResult as SharedTokenVerificationResult,
  TokenPairResponse as SharedTokenPairResponse,
  TokenIntrospectionResponse as SharedTokenIntrospectionResponse,
  TokenOptions as SharedTokenOptions
} from '@vubon/shared-types';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট
import { 
  TOKEN_CONFIG,
  USER_TIERS,
  TOKEN_TYPES,
  JWT_ALGORITHMS
} from '@vubon/shared-constants';

// ============================================================
// Token Types (Re-exported from shared-constants for convenience)
// ============================================================

/**
 * Token types - Re-exported from shared-constants
 * 
 * @example
 * const type = TokenType.ACCESS; // 'access'
 * const type = TokenType.REFRESH; // 'refresh'
 */
export { TOKEN_TYPES as TokenType };

// ============================================================
// User Tier Types (Re-exported from shared-constants)
// ============================================================

/**
 * User tier for loyalty program
 */
export { USER_TIERS as UserTier };

// ============================================================
// Token Payload Interface (Extended - using shared-types)
// ============================================================

/**
 * Token payload interface extending shared-types
 */
export interface TokenPayload extends SharedTokenPayload {
  /** User ID (standard JWT claim: subject) */
  sub: string;
  
  /** User email */
  email: string;
  
  /** User phone number (optional - for phone-based auth) */
  phone?: string;
  
  /** User role (optional - for access tokens) */
  role?: string;
  
  /** User tier (Bangladesh loyalty program) - using shared-constants */
  tier?: UserTier;
  
  /** Token type (access, refresh, reset, verification, email_change) */
  type?: TokenType;
  
  /** JWT ID for token rotation and revocation tracking */
  jti?: string;
  
  /** Session ID (for access/refresh tokens) */
  sessionId?: string;
  
  /** Device ID (for security tracking) */
  deviceId?: string;
  
  /** Token version (for rotation) */
  version?: number;
  
  /** Family ID (for refresh token families) */
  familyId?: string;
  
  /** Issued at timestamp (standard JWT claim) */
  iat?: number;
  
  /** Expiration timestamp (standard JWT claim) */
  exp?: number;
  
  /** Not before timestamp (standard JWT claim) */
  nbf?: number;
  
  /** Issuer (standard JWT claim) */
  iss?: string;
  
  /** Audience (standard JWT claim) */
  aud?: string;
  
  /** Permissions (optional - for API keys) */
  permissions?: string[];
  
  /** Additional custom claims */
  [key: string]: unknown;
}

// ============================================================
// Token Options Interface (Enhanced with shared-constants)
// ============================================================

export interface TokenOptions extends SharedTokenOptions {
  /** Token expiration (e.g., '15m', '1h', '7d') */
  expiresIn?: string;
  
  /** Token issuer (default from config) */
  issuer?: string;
  
  /** Token audience (default from config) */
  audience?: string;
  
  /** JWT ID (if not provided, auto-generated) */
  jwtId?: string;
  
  /** Session ID (for access/refresh tokens) */
  sessionId?: string;
  
  /** Device ID (for security tracking) */
  deviceId?: string;
  
  /** Token version (for rotation) */
  version?: number;
  
  /** Family ID (for refresh token families) */
  familyId?: string;
  
  /** Not before time (seconds from now) */
  notBefore?: number;
  
  /** Algorithm to use for signing (default from config) */
  algorithm?: typeof JWT_ALGORITHMS[keyof typeof JWT_ALGORITHMS];
  
  /** Additional custom claims */
  [key: string]: unknown;
}

// ============================================================
// Token Verification Result (Using shared-types)
// ============================================================

export interface TokenVerificationResult extends SharedTokenVerificationResult {
  /** Whether the token is valid */
  isValid: boolean;
  
  /** Decoded payload (if valid) */
  payload?: TokenPayload;
  
  /** Error message (if invalid) */
  error?: string;
  
  /** Error code for programmatic handling */
  errorCode?: 'EXPIRED' | 'INVALID_SIGNATURE' | 'MALFORMED' | 'ISSUER_MISMATCH' | 'AUDIENCE_MISMATCH' | 'REVOKED' | 'BLACKLISTED';
  
  /** Whether token needs refresh (if expiring soon) */
  needsRefresh?: boolean;
  
  /** Remaining time in seconds */
  remainingSeconds?: number;
}

// ============================================================
// Token Pair Response (Using shared-types)
// ============================================================

export interface TokenPairResponse extends SharedTokenPairResponse {
  /** Access token (short-lived) */
  accessToken: string;
  
  /** Refresh token (long-lived, optional) */
  refreshToken?: string;
  
  /** Access token expiry in seconds */
  expiresIn: number;
  
  /** Refresh token expiry in seconds (if provided) */
  refreshExpiresIn?: number;
  
  /** Token type (always 'Bearer') */
  tokenType: 'Bearer';
}

// ============================================================
// Token Introspection Response (OAuth2 compliant - using shared-types)
// ============================================================

export interface TokenIntrospectionResponse extends SharedTokenIntrospectionResponse {
  /** Whether token is active */
  active: boolean;
  
  /** Token scope */
  scope?: string;
  
  /** Client ID */
  clientId?: string;
  
  /** Username (user ID) */
  username?: string;
  
  /** Token type */
  tokenType?: string;
  
  /** Expiration timestamp */
  exp?: number;
  
  /** Issued at timestamp */
  iat?: number;
  
  /** Not before timestamp */
  nbf?: number;
  
  /** Subject (user ID) */
  sub?: string;
  
  /** Audience */
  aud?: string;
  
  /** Issuer */
  iss?: string;
  
  /** JWT ID */
  jti?: string;
}

// ============================================================
// Token Generator Interface
// ============================================================

export interface TokenGenerator {
  // ============================================================
  // Token Generation
  // ============================================================
  
  /**
   * Generate access token (short-lived)
   * 
   * @param userId - User ID
   * @param email - User email
   * @param role - User role (optional)
   * @param options - Additional token options (optional)
   * @returns JWT access token
   * 
   * @example
   * const token = await tokenGenerator.generateAccessToken('usr_123', 'user@example.com', 'ADMIN');
   * // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   */
  generateAccessToken(
    userId: string,
    email: string,
    role?: string,
    options?: TokenOptions,
  ): Promise<string>;
  
  /**
   * Generate refresh token (long-lived)
   * 
   * @param userId - User ID
   * @param options - Additional token options (optional)
   * @returns JWT refresh token with type: 'refresh'
   * 
   * @example
   * const token = await tokenGenerator.generateRefreshToken('usr_123');
   * // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   */
  generateRefreshToken(
    userId: string,
    options?: TokenOptions,
  ): Promise<string>;
  
  /**
   * Generate token pair (access + refresh)
   * 
   * @param userId - User ID
   * @param email - User email
   * @param role - User role (optional)
   * @param options - Additional token options (optional)
   * @returns Token pair response
   */
  generateTokenPair(
    userId: string,
    email: string,
    role?: string,
    options?: TokenOptions,
  ): Promise<TokenPairResponse>;
  
  /**
   * Generate password reset token
   * 
   * @param userId - User ID
   * @param options - Additional token options (optional)
   * @returns JWT reset token with type: 'reset'
   * 
   * @example
   * const token = await tokenGenerator.generatePasswordResetToken('usr_123');
   * // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   */
  generatePasswordResetToken(
    userId: string,
    options?: TokenOptions,
  ): Promise<string>;
  
  /**
   * Generate email verification token
   * 
   * @param userId - User ID
   * @param email - User email
   * @param options - Additional token options (optional)
   * @returns JWT verification token with type: 'verification'
   * 
   * @example
   * const token = await tokenGenerator.generateEmailVerificationToken('usr_123', 'user@example.com');
   * // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   */
  generateEmailVerificationToken(
    userId: string,
    email: string,
    options?: TokenOptions,
  ): Promise<string>;
  
  /**
   * Generate phone verification token (Bangladesh specific)
   * 
   * @param userId - User ID
   * @param phone - User phone number
   * @param options - Additional token options (optional)
   * @returns JWT verification token with type: 'verification'
   */
  generatePhoneVerificationToken(
    userId: string,
    phone: string,
    options?: TokenOptions,
  ): Promise<string>;
  
  /**
   * Generate email change token
   * 
   * @param userId - User ID
   * @param newEmail - New email address
   * @param options - Additional token options (optional)
   * @returns JWT email change token with type: 'email_change'
   * 
   * @example
   * const token = await tokenGenerator.generateEmailChangeToken('usr_123', 'new@example.com');
   * // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   */
  generateEmailChangeToken(
    userId: string,
    newEmail: string,
    options?: TokenOptions,
  ): Promise<string>;
  
  /**
   * Generate phone change token (Bangladesh specific)
   * 
   * @param userId - User ID
   * @param newPhone - New phone number
   * @param options - Additional token options (optional)
   * @returns JWT phone change token with type: 'phone_change'
   */
  generatePhoneChangeToken(
    userId: string,
    newPhone: string,
    options?: TokenOptions,
  ): Promise<string>;
  
  /**
   * Generate magic link token (passwordless login)
   * 
   * @param userId - User ID
   * @param email - User email
   * @param options - Additional token options (optional)
   * @returns JWT magic link token with type: 'magic_link'
   * 
   * @example
   * const token = await tokenGenerator.generateMagicLinkToken('usr_123', 'user@example.com');
   * // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   */
  generateMagicLinkToken(
    userId: string,
    email: string,
    options?: TokenOptions,
  ): Promise<string>;
  
  /**
   * Generate MFA token (short-lived for MFA verification)
   * 
   * @param userId - User ID
   * @param sessionId - MFA session ID
   * @param options - Additional token options (optional)
   * @returns JWT MFA token with type: 'mfa'
   * 
   * @example
   * const token = await tokenGenerator.generateMfaToken('usr_123', 'mfa_sess_456');
   * // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   */
  generateMfaToken(
    userId: string,
    sessionId: string,
    options?: TokenOptions,
  ): Promise<string>;
  
  /**
   * Generate API key token (for service accounts)
   * 
   * @param userId - User ID
   * @param name - API key name
   * @param permissions - Permissions
   * @param options - Additional token options (optional)
   * @returns JWT API key token with type: 'api_key'
   */
  generateApiKeyToken(
    userId: string,
    name: string,
    permissions: string[],
    options?: TokenOptions,
  ): Promise<string>;
  
  // ============================================================
  // Token Verification
  // ============================================================
  
  /**
   * Verify and decode a JWT token
   * 
   * @param token - JWT token string
   * @returns Decoded token payload
   * @throws {UnauthorizedException} If token is invalid
   * @throws {UnauthorizedException} If token has expired
   * @throws {UnauthorizedException} If token signature is invalid
   * 
   * @example
   * try {
   *   const payload = await tokenGenerator.verifyToken(token);
   *   console.log(payload.sub); // User ID
   * } catch (error) {
   *   // Handle invalid/expired token
   * }
   */
  verifyToken(token: string): Promise<TokenPayload>;
  
  /**
   * Verify token without throwing exception
   * 
   * @param token - JWT token string
   * @returns Verification result with payload
   * 
   * @example
   * const result = await tokenGenerator.verifyTokenSafe(token);
   * if (result.isValid) {
   *   console.log(result.payload?.sub);
   * } else {
   *   console.log(result.error);
   * }
   */
  verifyTokenSafe(token: string): Promise<TokenVerificationResult>;
  
  /**
   * Verify token with specific type
   * 
   * @param token - JWT token string
   * @param expectedType - Expected token type
   * @returns Verification result
   */
  verifyTokenByType(
    token: string,
    expectedType: TokenType
  ): Promise<TokenVerificationResult>;
  
  // ============================================================
  // Token Decoding (No verification)
  // ============================================================
  
  /**
   * Decode token without verification (for debugging only)
   * 
   * @param token - JWT token string
   * @returns Decoded payload (unverified)
   * 
   * @example
   * const payload = tokenGenerator.decodeToken(token);
   * console.log(payload.exp); // Expiration time
   */
  decodeToken(token: string): TokenPayload | null;
  
  /**
   * Decode token header
   * 
   * @param token - JWT token string
   * @returns Decoded header (algorithm, type)
   */
  decodeTokenHeader(token: string): { alg: string; typ: string } | null;
  
  // ============================================================
  // Token Introspection (OAuth2)
  // ============================================================
  
  /**
   * Introspect token (OAuth2 compliant)
   * 
   * @param token - JWT token string
   * @returns Token introspection response
   */
  introspectToken(token: string): Promise<TokenIntrospectionResponse>;
  
  // ============================================================
  // Token Utilities
  // ============================================================
  
  /**
   * Check if token is expired
   * 
   * @param token - JWT token string
   * @returns True if token is expired
   * 
   * @example
   * const isExpired = await tokenGenerator.isTokenExpired(token);
   * if (isExpired) {
   *   // Refresh token
   * }
   */
  isTokenExpired(token: string): Promise<boolean>;
  
  /**
   * Get remaining time of token in seconds
   * 
   * @param token - JWT token string
   * @returns Remaining seconds (0 if expired)
   * 
   * @example
   * const remaining = await tokenGenerator.getTokenRemainingTime(token);
   * console.log(`Token expires in ${remaining} seconds`);
   */
  getTokenRemainingTime(token: string): Promise<number>;
  
  /**
   * Get token age in seconds
   * 
   * @param token - JWT token string
   * @returns Age in seconds
   */
  getTokenAge(token: string): Promise<number>;
  
  /**
   * Extract token type from payload
   * 
   * @param token - JWT token string
   * @returns Token type or null
   */
  getTokenType(token: string): Promise<TokenType | null>;
  
  /**
   * Extract user ID from token (without full verification)
   * 
   * @param token - JWT token string
   * @returns User ID or null
   */
  getUserIdFromToken(token: string): string | null;
  
  /**
   * Rotate refresh token (generate new token, revoke old)
   * 
   * @param oldRefreshToken - Old refresh token
   * @param options - Token options
   * @returns New token pair
   */
  rotateRefreshToken(
    oldRefreshToken: string,
    options?: TokenOptions,
  ): Promise<TokenPairResponse>;
  
  /**
   * Revoke token (add to blacklist)
   * 
   * @param token - JWT token string
   * @param reason - Revocation reason
   */
  revokeToken(token: string, reason?: string): Promise<void>;
  
  /**
   * Check if token is revoked (blacklisted)
   * 
   * @param token - JWT token string
   * @returns True if token is revoked
   */
  isTokenRevoked(token: string): Promise<boolean>;
  
  /**
   * Get token blacklist status
   * 
   * @param token - JWT token string
   * @returns Blacklist status
   */
  getTokenBlacklistStatus(token: string): Promise<{ isBlacklisted: boolean; blacklistedAt?: Date; reason?: string }>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  TokenOptions as TokenOptionsType,
  TokenVerificationResult as TokenVerificationResultType,
  TokenPairResponse as TokenPairResponseType,
  TokenIntrospectionResponse as TokenIntrospectionResponseType
};

// ============================================================
// Helper Constants (From shared-config)
// ============================================================

/**
 * Default token expiry values (from shared-config)
 * These should be imported from shared-config at runtime
 */
export const DEFAULT_TOKEN_EXPIRY = {
  ACCESS_TOKEN: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN: TOKEN_CONFIG.REFRESH_TOKEN_EXPIRY,
  RESET_TOKEN: TOKEN_CONFIG.RESET_TOKEN_EXPIRY,
  VERIFICATION_TOKEN: TOKEN_CONFIG.VERIFICATION_TOKEN_EXPIRY,
  MAGIC_LINK_TOKEN: TOKEN_CONFIG.MAGIC_LINK_TOKEN_EXPIRY,
  MFA_TOKEN: TOKEN_CONFIG.MFA_TOKEN_EXPIRY,
  API_KEY_TOKEN: TOKEN_CONFIG.API_KEY_TOKEN_EXPIRY,
} as const;
