/**
 * Token Generator Interface - Enterprise Enhanced v4.0
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/token-generator.interface
 * 
 * @description
 * Interface for JWT token generation and verification with enterprise features.
 * Implementation resides in infrastructure layer (JwtTokenGenerator).
 * 
 * ENTERPRISE ENHANCEMENTS (v4.0):
 * ✅ Token versioning for migration support
 * ✅ Token usage analytics and tracking
 * ✅ Batch token operations (generate, revoke)
 * ✅ Token health scoring and monitoring
 * ✅ Rate limiting for token generation
 * ✅ Geo-location binding for Bangladesh districts
 * ✅ Device fingerprint binding for security
 * ✅ Token usage pattern anomaly detection
 * ✅ Token expiry notification hooks
 * ✅ Token rotation with family tracking
 * 
 * @example
 * const tokenGenerator = new JwtTokenGenerator(jwtService, config);
 * const tokens = await tokenGenerator.generateTokenPair(userId, email);
 * const isValid = await tokenGenerator.verifyToken(tokens.accessToken);
 */

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট
import type { 
  TokenType, 
  TokenPayload as SharedTokenPayload,
  UserTier,
  TokenVerificationResult as SharedTokenVerificationResult,
  TokenPairResponse as SharedTokenPairResponse,
  TokenIntrospectionResponse as SharedTokenIntrospectionResponse,
  TokenOptions as SharedTokenOptions,
  BulkOperationProgress
} from '@vubon/shared-types';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট
import { 
  TOKEN_CONFIG,
  USER_TIERS,
  TOKEN_TYPES,
  JWT_ALGORITHMS,
  BANGLADESH_DISTRICTS
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
// ✅ ENTERPRISE ENHANCEMENT 1: Extended Token Options
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
  
  /** Token version (for rotation) - ✅ ENTERPRISE */
  version?: number;
  
  /** Family ID (for refresh token families) - ✅ ENTERPRISE */
  familyId?: string;
  
  /** Not before time (seconds from now) */
  notBefore?: number;
  
  /** Algorithm to use for signing (default from config) */
  algorithm?: typeof JWT_ALGORITHMS[keyof typeof JWT_ALGORITHMS];
  
  /** ✅ ENTERPRISE: Bind token to specific district (Bangladesh) */
  district?: typeof BANGLADESH_DISTRICTS[number];
  
  /** ✅ ENTERPRISE: Bind token to device fingerprint */
  deviceFingerprint?: string;
  
  /** ✅ ENTERPRISE: Bind token to IP range */
  ipRange?: string;
  
  /** ✅ ENTERPRISE: Rate limit key for generation */
  rateLimitKey?: string;
  
  /** ✅ ENTERPRISE: Skip rate limiting (admin override) */
  skipRateLimit?: boolean;
  
  /** ✅ ENTERPRISE: Correlation ID for distributed tracing */
  correlationId?: string;
  
  /** Additional custom claims */
  [key: string]: unknown;
}

// ============================================================
// Token Payload Interface (Extended with enterprise fields)
// ============================================================

export interface TokenPayload extends SharedTokenPayload {
  /** User ID (standard JWT claim: subject) */
  sub: string;
  
  /** User email */
  email: string;
  
  /** User phone number (optional - for phone-based auth) */
  phone?: string;
  
  /** User role (optional - for access tokens) */
  role?: string;
  
  /** User tier (Bangladesh loyalty program) */
  tier?: UserTier;
  
  /** Token type (access, refresh, reset, verification, email_change) */
  type?: TokenType;
  
  /** JWT ID for token rotation and revocation tracking */
  jti?: string;
  
  /** Session ID (for access/refresh tokens) */
  sessionId?: string;
  
  /** Device ID (for security tracking) */
  deviceId?: string;
  
  /** Token version (for rotation) - ✅ ENTERPRISE */
  version?: number;
  
  /** Family ID (for refresh token families) - ✅ ENTERPRISE */
  familyId?: string;
  
  /** ✅ ENTERPRISE: District where token was issued (Bangladesh) */
  district?: string;
  
  /** ✅ ENTERPRISE: Device fingerprint hash */
  deviceFingerprintHash?: string;
  
  /** ✅ ENTERPRISE: Token health score (0-100) */
  healthScore?: number;
  
  /** ✅ ENTERPRISE: Last rotation timestamp */
  lastRotatedAt?: number;
  
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
// ✅ ENTERPRISE ENHANCEMENT 2: Enhanced Verification Result
// ============================================================

export interface TokenVerificationResult extends SharedTokenVerificationResult {
  /** Whether the token is valid */
  isValid: boolean;
  
  /** Decoded payload (if valid) */
  payload?: TokenPayload;
  
  /** Error message (if invalid) */
  error?: string;
  
  /** Error code for programmatic handling */
  errorCode?: 'EXPIRED' | 'INVALID_SIGNATURE' | 'MALFORMED' | 'ISSUER_MISMATCH' | 'AUDIENCE_MISMATCH' | 'REVOKED' | 'BLACKLISTED' | 'DISTRICT_MISMATCH' | 'DEVICE_MISMATCH' | 'VERSION_MISMATCH';
  
  /** Whether token needs refresh (if expiring soon) */
  needsRefresh?: boolean;
  
  /** Remaining time in seconds */
  remainingSeconds?: number;
  
  /** ✅ ENTERPRISE: Token health score */
  healthScore?: number;
  
  /** ✅ ENTERPRISE: Whether token health is critical */
  isHealthCritical?: boolean;
  
  /** ✅ ENTERPRISE: Recommended action */
  recommendedAction?: 'allow' | 'refresh' | 'reauthenticate' | 'block';
  
  /** ✅ ENTERPRISE: Anomaly detected */
  anomalyDetected?: boolean;
  
  /** ✅ ENTERPRISE: Anomaly reason */
  anomalyReason?: string;
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
  
  /** ✅ ENTERPRISE: Token family ID */
  familyId?: string;
  
  /** ✅ ENTERPRISE: Token version */
  version?: number;
  
  /** ✅ ENTERPRISE: Session ID */
  sessionId?: string;
}

// ============================================================
// Token Introspection Response (OAuth2 compliant)
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
  
  /** ✅ ENTERPRISE: Token version */
  version?: number;
  
  /** ✅ ENTERPRISE: Token health score */
  healthScore?: number;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 3: Token Health Score
// ============================================================

export interface TokenHealthScore {
  /** Token ID */
  tokenId: string;
  
  /** Health score (0-100) */
  score: number;
  
  /** Health status */
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  
  /** Factors contributing to score */
  factors: {
    age: { score: number; weight: number; description: string };
    rotationCount: { score: number; weight: number; description: string };
    usageFrequency: { score: number; weight: number; description: string };
    locationStability: { score: number; weight: number; description: string };
    deviceConsistency: { score: number; weight: number; description: string };
  };
  
  /** Recommendations for improvement */
  recommendations: string[];
  
  /** Requires user action */
  requiresAction: boolean;
  
  /** Suggested action */
  suggestedAction?: 'rotate' | 'reauthenticate' | 'revoke' | 'none';
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 4: Token Usage Stats
// ============================================================

export interface TokenUsageStats {
  /** Token ID */
  tokenId: string;
  
  /** Total usage count */
  usageCount: number;
  
  /** Last used timestamp */
  lastUsedAt?: Date;
  
  /** First used timestamp */
  firstUsedAt: Date;
  
  /** Usage by hour distribution */
  usageByHour: Record<number, number>;
  
  /** Usage by day of week */
  usageByDayOfWeek: Record<number, number>;
  
  /** Unique IP addresses used */
  uniqueIPs: string[];
  
  /** Unique devices used */
  uniqueDevices: string[];
  
  /** Anomaly detection score (0-100) */
  anomalyScore: number;
  
  /** Is usage pattern suspicious */
  isSuspicious: boolean;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 5: Batch Token Operation Result
// ============================================================

export interface BatchTokenResult {
  /** Total tokens requested */
  total: number;
  
  /** Successful operations */
  successful: number;
  
  /** Failed operations */
  failed: number;
  
  /** Results for each token */
  results: Array<{
    tokenId?: string;
    success: boolean;
    error?: string;
  }>;
  
  /** Duration in milliseconds */
  durationMs: number;
  
  /** Correlation ID for tracing */
  correlationId?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 6: Token Rotation History
// ============================================================

export interface TokenRotationHistory {
  /** Family ID */
  familyId: string;
  
  /** User ID */
  userId: string;
  
  /** Rotation chain */
  rotations: Array<{
    fromTokenId: string;
    toTokenId: string;
    rotatedAt: Date;
    reason: string;
    ipAddress?: string;
    deviceId?: string;
  }>;
  
  /** Total rotation count */
  totalRotations: number;
  
  /** Current active token ID */
  currentTokenId: string;
}

// ============================================================
// Token Generator Interface (Enterprise Enhanced v4.0)
// ============================================================

export interface TokenGenerator {
  // ============================================================
  // Token Generation (11 methods)
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
  // ✅ ENTERPRISE ENHANCEMENT 7: Batch Token Operations
  // ============================================================
  
  /**
   * Generate multiple token pairs in batch
   * 
   * @param requests - Array of token generation requests
   * @param onProgress - Progress callback
   * @returns Batch token result
   */
  batchGenerateTokenPairs(
    requests: Array<{ userId: string; email: string; role?: string; options?: TokenOptions }>,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BatchTokenResult>;
  
  /**
   * Batch revoke tokens
   * 
   * @param tokens - Array of token strings to revoke
   * @param reason - Revocation reason
   * @param onProgress - Progress callback
   * @returns Batch token result
   */
  batchRevokeTokens(
    tokens: string[],
    reason?: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BatchTokenResult>;
  
  // ============================================================
  // Token Verification
  // ============================================================
  
  /**
   * Verify and decode a JWT token
   * 
   * @param token - JWT token string
   * @returns Decoded token payload
   * @throws {UnauthorizedException} If token is invalid
   */
  verifyToken(token: string): Promise<TokenPayload>;
  
  /**
   * Verify token without throwing exception
   * 
   * @param token - JWT token string
   * @returns Verification result with payload
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
  
  /**
   * Verify token with district binding (Bangladesh)
   * 
   * @param token - JWT token string
   * @param currentDistrict - Current district of the request
   * @returns Verification result
   */
  verifyTokenWithDistrict(
    token: string,
    currentDistrict: string
  ): Promise<TokenVerificationResult>;
  
  /**
   * Verify token with device fingerprint binding
   * 
   * @param token - JWT token string
   * @param deviceFingerprint - Current device fingerprint
   * @returns Verification result
   */
  verifyTokenWithDevice(
    token: string,
    deviceFingerprint: string
  ): Promise<TokenVerificationResult>;
  
  // ============================================================
  // Token Decoding (No verification)
  // ============================================================
  
  /**
   * Decode token without verification (for debugging only)
   * 
   * @param token - JWT token string
   * @returns Decoded payload (unverified)
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
  // ✅ ENTERPRISE ENHANCEMENT 8: Token Health & Monitoring
  // ============================================================
  
  /**
   * Get token health score
   * 
   * @param token - JWT token string
   * @returns Token health score
   */
  getTokenHealth(token: string): Promise<TokenHealthScore>;
  
  /**
   * Get token usage statistics
   * 
   * @param token - JWT token string
   * @returns Token usage statistics
   */
  getTokenUsageStats(token: string): Promise<TokenUsageStats>;
  
  /**
   * Detect token usage anomaly
   * 
   * @param token - JWT token string
   * @param context - Request context (ip, device, location)
   * @returns Anomaly detection result
   */
  detectTokenAnomaly(
    token: string,
    context: { ipAddress: string; deviceId: string; userAgent: string; district?: string }
  ): Promise<{ isAnomaly: boolean; score: number; reason?: string }>;
  
  // ============================================================
  // Token Utilities
  // ============================================================
  
  /**
   * Check if token is expired
   * 
   * @param token - JWT token string
   * @returns True if token is expired
   */
  isTokenExpired(token: string): Promise<boolean>;
  
  /**
   * Get remaining time of token in seconds
   * 
   * @param token - JWT token string
   * @returns Remaining seconds (0 if expired)
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
   * Get token rotation history
   * 
   * @param familyId - Token family ID
   * @returns Rotation history
   */
  getRotationHistory(familyId: string): Promise<TokenRotationHistory>;
  
  /**
   * Revoke token (add to blacklist)
   * 
   * @param token - JWT token string
   * @param reason - Revocation reason
   */
  revokeToken(token: string, reason?: string): Promise<void>;
  
  /**
   * Revoke entire token family
   * 
   * @param familyId - Token family ID
   * @param reason - Revocation reason
   * @returns Number of tokens revoked
   */
  revokeTokenFamily(familyId: string, reason?: string): Promise<number>;
  
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
  
  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 9: Rate Limiting
  // ============================================================
  
  /**
   * Check rate limit for token generation
   * 
   * @param userId - User ID
   * @param tokenType - Type of token being generated
   * @returns Rate limit status
   */
  checkRateLimit(
    userId: string,
    tokenType: TokenType
  ): Promise<{ allowed: boolean; remaining: number; resetAt: Date }>;
  
  /**
   * Get rate limit configuration
   * 
   * @returns Rate limit configuration
   */
  getRateLimitConfig(): Promise<{
    [key in TokenType]?: { maxPerHour: number; windowSeconds: number };
  }>;
  
  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 10: Health Check
  // ============================================================
  
  /**
   * Health check for token generator service
   * 
   * @returns Health status
   */
  healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptime: number;
    version: string;
    metrics: {
      tokensGeneratedLastHour: number;
      tokensVerifiedLastHour: number;
      tokensRevokedLastHour: number;
      averageVerificationTimeMs: number;
      blacklistSize: number;
    };
  }>;
  
  /**
   * Get token generator metrics
   * 
   * @returns Performance metrics
   */
  getMetrics(): Promise<{
    totalTokensGenerated: number;
    totalTokensVerified: number;
    totalTokensRevoked: number;
    averageGenerationTimeMs: number;
    p95GenerationTimeMs: number;
    p99GenerationTimeMs: number;
    errorRate: number;
  }>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  TokenOptions as TokenOptionsType,
  TokenVerificationResult as TokenVerificationResultType,
  TokenPairResponse as TokenPairResponseType,
  TokenIntrospectionResponse as TokenIntrospectionResponseType,
  TokenHealthScore as TokenHealthScoreType,
  TokenUsageStats as TokenUsageStatsType,
  BatchTokenResult as BatchTokenResultType,
  TokenRotationHistory as TokenRotationHistoryType
};

// ============================================================
// Helper Constants (From shared-config)
// ============================================================

/**
 * Default token expiry values (from shared-config)
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

/**
 * Token health thresholds
 */
export const TOKEN_HEALTH_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  FAIR: 40,
  POOR: 20,
  CRITICAL: 0,
} as const;

/**
 * Rate limit defaults
 */
export const TOKEN_RATE_LIMITS = {
  ACCESS_TOKEN: { maxPerHour: 100, windowSeconds: 3600 },
  REFRESH_TOKEN: { maxPerHour: 50, windowSeconds: 3600 },
  RESET_TOKEN: { maxPerHour: 10, windowSeconds: 3600 },
  VERIFICATION_TOKEN: { maxPerHour: 20, windowSeconds: 3600 },
  MFA_TOKEN: { maxPerHour: 30, windowSeconds: 3600 },
} as const;

// ============================================================
// ENTERPRISE SUMMARY v4.0
// ============================================================
// 
// Enterprise Enhancements Applied in v4.0:
// 1. ✅ Token versioning for migration support
// 2. ✅ Token usage analytics and tracking
// 3. ✅ Batch token operations (generate, revoke)
// 4. ✅ Token health scoring and monitoring
// 5. ✅ Rate limiting for token generation
// 6. ✅ Geo-location binding for Bangladesh districts
// 7. ✅ Device fingerprint binding for security
// 8. ✅ Token usage pattern anomaly detection
// 9. ✅ Token expiry notification hooks
// 10. ✅ Token rotation with family tracking
// 11. ✅ Token revocation reason tracking
// 12. ✅ Token blacklist with expiry
// 13. ✅ Performance metrics and monitoring
// 14. ✅ Health check endpoint
// 15. ✅ Distributed tracing support (correlationId)
// 
// Bangladesh Specific:
// - District binding for geo-location security
// - Phone-based token generation
// - Local timezone awareness
// - Bengali error message support ready
// 
// Security Features:
// - Device fingerprint binding prevents token theft
// - District binding prevents token replay from different locations
// - Rate limiting prevents token generation abuse
// - Token health scoring identifies compromised tokens
// - Anomaly detection for unusual usage patterns
// 
// ============================================================
