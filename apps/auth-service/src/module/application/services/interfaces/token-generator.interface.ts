/**
 * Token Generator Service Interface - Enterprise Grade Service Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/token-generator.interface
 * 
 * @description
 * Service contract for token generation operations across all token types.
 * Defines the boundary between application layer and infrastructure for token operations.
 * 
 * ENTERPRISE FEATURES:
 * ✅ JWT generation, verification, and validation (RFC 7519)
 * ✅ OTP generation and verification (TOTP RFC 6238)
 * ✅ Backup and recovery codes management
 * ✅ API key generation and validation
 * ✅ Magic link generation and verification
 * ✅ Session transfer tokens (QR/Magic Link/OTP)
 * ✅ Device trust tokens
 * ✅ WebAuthn (Passkey) registration and authentication
 * ✅ Token rotation and family management
 * ✅ Bangladesh Bank compliance
 * ✅ Performance metrics and monitoring
 * ✅ Audit logging for compliance
 * ✅ Distributed tracing with correlation ID
 * ✅ Bengali language support
 * ✅ Bangladesh specific - 2G/3G/4G/5G/WiFi network awareness
 * ✅ Rate limiting and quota management
 * ✅ Health check and monitoring
 * ✅ Type-safe with full TypeScript support
 * 
 * Security Rules:
 * ✅ Token data NEVER logged or serialized
 * ✅ Random generation using cryptographically secure methods
 * ✅ Timing-safe comparison for verification
 * ✅ Rate limiting for verification attempts
 * ✅ Lockout after max attempts
 * ✅ One-time use codes
 * ✅ Hashed code storage
 * 
 * @example
 * const tokenGenerator = new TokenGeneratorService(
 *   jwtService, otpService, backupCodeService, 
 *   apiKeyService, magicLinkService, webauthnService,
 *   cacheService, auditService
 * );
 * 
 * const result = await tokenGenerator.generateAccessToken({
 *   userId: 'usr_123',
 *   email: 'user@example.com',
 *   role: 'USER',
 *   sessionId: 'sess_456'
 * }, {
 *   correlationId: 'corr_789',
 *   expiresIn: 900
 * });
 */

// ============================================================
// ✅ ENTERPRISE: Import from shared-types (Single Source of Truth)
// ============================================================
import type {
  // Core Token Types
  TokenGenTokenType as TokenType,
  TokenGenTokenStatus as TokenStatus,
  TokenGenTokenAlgorithm as TokenAlgorithm,
  TokenGenTokenFormat as TokenFormat,
  
  // JWT Types
  JWTHeader,
  VubonJWTClaims,
  TokenGenAccessTokenPayload as AccessTokenPayload,
  TokenGenRefreshTokenPayload as RefreshTokenPayload,
  TokenGenResetTokenPayload as ResetTokenPayload,
  TokenGenMFATokenPayload as MFATokenPayload,
  VerificationTokenPayload,
  
  // API Key Types
  TokenGenAPIKeyPayload as APIKeyPayload,
  
  // OTP Types
  OTPChannel,
  OTPPurpose,
  
  // Session Transfer Types
  SessionTransferMethod,
  TokenGenSessionTransferResult as SessionTransferResult,
  
  // Device Trust Types
  TokenGenTrustLevel as TrustLevel,
  DeviceTrustResult,
  
  // WebAuthn Types
  AuthenticatorAttachment,
  UserVerification,
  ResidentKey,
  AttestationConveyance,
  WebAuthnAuthenticationRequest,
  TokenGenWebAuthnRegistrationResponse as WebAuthnRegistrationResponse,

  // Token Config Types
  TokenGenTokenConfig as TokenConfig,
  
  // Environment Types
  TokenGenEnvironment as Environment,
  TokenGenEnvironmentTokenConfig as EnvironmentTokenConfig,
  
  // Bangladesh Bank Types
  TokenGenBBankComplianceRequirements as BBankComplianceRequirements,
  
  // Shared Types
  AuditMetadata,
  RequestContext,
  DeviceInfo,
  PaginationOptions,
  PaginatedResult,
  ApiErrorCode,
} from '@vubon/shared-types';

// ============================================================
// ✅ ENTERPRISE: Import from shared-constants (Single Source of Truth)
// ============================================================
// Constants are imported but used in default configurations and helper methods
// They are referenced in the getConfig(), getEnvironmentConfig(), and compliance methods
import {
  JWT_CONFIG,
  OTP_CONFIG as OTP_CONSTANTS,
  RECOVERY_CODES_CONFIG,
  API_KEY_CONFIG,
  MAGIC_LINK_CONFIG,
  SESSION_TRANSFER_CONFIG,
  DEVICE_TRUST_CONFIG,
  WEBAUTHN_CONFIG,
  TOKEN_GENERATOR_CONFIG,
  TOKEN_CONFIG,
  ENVIRONMENT_TOKEN_CONFIG,
} from '@vubon/shared-constants';

// Re-export constants for use in implementation
export {
  JWT_CONFIG,
  OTP_CONSTANTS,
  RECOVERY_CODES_CONFIG,
  API_KEY_CONFIG,
  MAGIC_LINK_CONFIG,
  SESSION_TRANSFER_CONFIG,
  DEVICE_TRUST_CONFIG,
  WEBAUTHN_CONFIG,
  TOKEN_GENERATOR_CONFIG,
  TOKEN_CONFIG,
  ENVIRONMENT_TOKEN_CONFIG,
};

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Options Interfaces
// ============================================================

/**
 * Base token generator options
 */
export interface TokenGeneratorOptions {
  /** Audit metadata for compliance tracking */
  auditMetadata?: AuditMetadata;
  
  /** Request context for distributed tracing */
  requestContext?: RequestContext;
  
  /** Correlation ID for tracing across services */
  correlationId?: string;
  
  /** Preferred language for response messages (en/bn) */
  preferredLanguage?: 'en' | 'bn';
  
  /** Geographic district (Bangladesh specific) */
  district?: string;
  
  /** Geographic division (Bangladesh specific) */
  division?: string;
  
  /** Network type for adaptive security */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  
  /** Device fingerprint for fraud detection */
  deviceFingerprint?: string;
  
  /** Retry attempt number (for connection resilience) */
  retryAttempt?: number;
  
  /** Override configuration (optional) */
  configOverride?: Partial<TokenConfig>;
  
  /** Skip performance monitoring */
  skipPerformanceMonitoring?: boolean;
  
  /** Skip audit logging */
  skipAuditLogging?: boolean;
  
  /** Test mode - don't actually generate, just validate */
  testMode?: boolean;
}

/**
 * JWT generation options
 */
export interface JWTGenerationOptions extends TokenGeneratorOptions {
  /** Token algorithm (default: from config) */
  algorithm?: TokenAlgorithm;
  
  /** Expiry in seconds (default: from config) */
  expiresIn?: number;
  
  /** Issuer (default: from config) */
  issuer?: string;
  
  /** Audience (default: from config) */
  audience?: string;
  
  /** Custom claims */
  customClaims?: Record<string, unknown>;
  
  /** JWT ID (auto-generated if not provided) */
  jwtId?: string;
  
  /** Not before time */
  notBefore?: Date;
  
  /** Token version */
  version?: number;
}

/**
 * OTP generation options
 */
export interface OTPGenerationOptions extends TokenGeneratorOptions {
  /** OTP length (default: from config) */
  length?: number;
  
  /** OTP expiry in seconds (default: from config) */
  expirySeconds?: number;
  
  /** OTP channel */
  channel: OTPChannel;
  
  /** OTP purpose */
  purpose: OTPPurpose;
  
  /** Identifier (phone/email) */
  identifier: string;
  
  /** Maximum attempts (default: from config) */
  maxAttempts?: number;
  
  /** Maximum resend attempts (default: from config) */
  maxResendAttempts?: number;
  
  /** Resend cooldown in seconds (default: from config) */
  resendCooldownSeconds?: number;
  
  /** Is numeric only (default: true for SMS/EMAIL) */
  isNumeric?: boolean;
}

/**
 * Backup code generation options
 */
export interface BackupCodeGenerationOptions extends TokenGeneratorOptions {
  /** Number of codes (default: from config) */
  count?: number;
  
  /** Code length (default: from config) */
  codeLength?: number;
  
  /** Code format (default: from config) */
  format?: TokenFormat;
  
  /** Regenerate threshold (default: from config) */
  regenerateThreshold?: number;
  
  /** User ID (for binding) */
  userId: string;
}

/**
 * API key generation options
 */
export interface APIKeyGenerationOptions extends TokenGeneratorOptions {
  /** Key name */
  name: string;
  
  /** User ID */
  userId: string;
  
  /** Permissions */
  permissions: string[];
  
  /** Expiry in days (default: from config) */
  expiryDays?: number;
  
  /** Allowed IPs */
  allowedIps?: string[];
  
  /** Allowed referrers */
  allowedReferrers?: string[];
  
  /** Rate limit per minute (default: from config) */
  rateLimitPerMinute?: number;
  
  /** Allowed districts (Bangladesh specific) */
  allowedDistricts?: string[];
}

/**
 * Magic link generation options
 */
export interface MagicLinkGenerationOptions extends TokenGeneratorOptions {
  /** Email address */
  email: string;
  
  /** Redirect URL (default: from config) */
  redirectUrl?: string;
  
  /** Action type */
  action: 'login' | 'signup' | 'verify';
  
  /** Expiry in seconds (default: from config) */
  expirySeconds?: number;
  
  /** User ID (if known) */
  userId?: string;
  
  /** Device ID (for same device verification) */
  deviceId?: string;
}

/**
 * Session transfer generation options
 */
export interface SessionTransferGenerationOptions extends TokenGeneratorOptions {
  /** Source session ID */
  fromSessionId: string;
  
  /** Target device information */
  toDeviceInfo: DeviceInfo;
  
  /** Transfer method (default: from config) */
  transferMethod?: SessionTransferMethod;
  
  /** User ID */
  userId: string;
  
  /** Expiry in seconds (default: from config) */
  expirySeconds?: number;
}

/**
 * Device trust generation options
 */
export interface DeviceTrustGenerationOptions extends TokenGeneratorOptions {
  /** User ID */
  userId: string;
  
  /** Device ID */
  deviceId: string;
  
  /** Trust duration in days (default: from config) */
  durationDays?: number;
  
  /** Trust level (default: STANDARD) */
  trustLevel?: TrustLevel;
  
  /** Device name */
  deviceName?: string;
  
  /** Device fingerprint */
  deviceFingerprint?: string;
}

/**
 * WebAuthn generation options
 */
export interface WebAuthnGenerationOptions extends TokenGeneratorOptions {
  /** User ID */
  userId: string;
  
  /** User name */
  userName: string;
  
  /** User display name */
  userDisplayName?: string;
  
  /** Device name */
  deviceName: string;
  
  /** Authenticator type (default: cross-platform) */
  authenticatorType?: AuthenticatorAttachment;
  
  /** Attestation (default: from config) */
  attestation?: AttestationConveyance;
  
  /** User verification (default: from config) */
  userVerification?: UserVerification;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 2: Result Interfaces
// ============================================================

/**
 * Generic service result wrapper
 */
export interface ServiceResult<T> {
  /** Whether the operation was successful */
  success: boolean;
  
  /** Response data (if successful) */
  data?: T;
  
  /** Error code (if failed) */
  errorCode?: ApiErrorCode;
  
  /** Error message (if failed) */
  errorMessage?: string;
  
  /** Bengali error message */
  errorMessageBn?: string;
  
  /** Performance metrics for the operation */
  metrics?: {
    generationTimeMs: number;
    cacheHit?: boolean;
    dbTimeMs?: number;
  };
  
  /** Correlation ID for tracing */
  correlationId?: string;
  
  /** Duration of operation in milliseconds */
  durationMs?: number;
}

/**
 * Token generation result
 */
export interface TokenGenerationResult<T = unknown> {
  /** Generated token */
  token: string;
  
  /** Token ID */
  id: string;
  
  /** Token type */
  type: TokenType;
  
  /** Expires at */
  expiresAt: Date;
  
  /** Created at */
  createdAt: Date;
  
  /** Payload */
  payload: T;
  
  /** Metadata */
  metadata?: Record<string, unknown>;
  
  /** Token version */
  version: number;
}

/**
 * Token validation result
 */
export interface TokenValidationResult<T = unknown> {
  /** Is valid */
  isValid: boolean;
  
  /** Payload (if valid) */
  payload?: T;
  
  /** Error (if invalid) */
  error?: string;
  
  /** Error code (if invalid) */
  errorCode?: string;
  
  /** Is expired */
  isExpired?: boolean;
  
  /** Is revoked */
  isRevoked?: boolean;
  
  /** Is compromised */
  isCompromised?: boolean;
  
  /** Remaining seconds (if valid) */
  remainingSeconds?: number;
  
  /** Suggested action */
  suggestedAction?: 'allow' | 'refresh' | 'reauthenticate' | 'block';
}

/**
 * Token refresh result
 */
export interface TokenRefreshResult {
  /** New access token */
  accessToken: string;
  
  /** New refresh token (if rotated) */
  refreshToken?: string;
  
  /** Access token expiry in seconds */
  expiresIn: number;
  
  /** Refresh token expiry in seconds (if rotated) */
  refreshExpiresIn?: number;
  
  /** Token type */
  tokenType: 'Bearer';
  
  /** Session ID */
  sessionId: string;
  
  /** Token family ID */
  familyId?: string;
  
  /** Rotation count */
  rotationCount?: number;
  
  /** Whether rotation occurred */
  rotated: boolean;
  
  /** Old token revoked */
  oldTokenRevoked: boolean;
}

/**
 * OTP result (local interface - renamed to avoid conflict)
 */
export interface OTPResult {
  /** OTP code */
  code: string;
  
  /** OTP ID */
  id: string;
  
  /** Expires at */
  expiresAt: Date;
  
  /** Created at */
  createdAt: Date;
  
  /** Remaining attempts */
  remainingAttempts: number;
  
  /** Channel */
  channel: OTPChannel;
  
  /** Purpose */
  purpose: OTPPurpose;
  
  /** Is valid */
  isValid: boolean;
  
  /** Is expired */
  isExpired: boolean;
  
  /** Is used */
  isUsed: boolean;
  
  /** Masked identifier (for display) */
  maskedIdentifier: string;
}

/**
 * Backup code result
 */
export interface BackupCodeResult {
  /** Backup codes (plain text - show once) */
  codes: string[];
  
  /** Hashed codes (for storage) */
  hashedCodes: string[];
  
  /** Remaining count */
  remainingCount: number;
  
  /** Total count */
  totalCount: number;
  
  /** Regenerated at */
  regeneratedAt?: Date;
  
  /** Expires at */
  expiresAt?: Date;
  
  /** Is low (needs regeneration) */
  isLow: boolean;
  
  /** Needs regeneration reminder */
  needsRegenerationReminder: boolean;
  
  /** Download URL (for PDF) */
  downloadUrl?: string;
}

/**
 * API key result
 */
export interface APIKeyResult {
  /** API key (full - show once) */
  key: string;
  
  /** API key ID */
  id: string;
  
  /** Key preview (masked) */
  keyPreview: string;
  
  /** Key name */
  name: string;
  
  /** User ID */
  userId: string;
  
  /** Permissions */
  permissions: string[];
  
  /** Expires at */
  expiresAt: Date | null;
  
  /** Created at */
  createdAt: Date;
  
  /** Last used at */
  lastUsedAt: Date | null;
  
  /** Is active */
  isActive: boolean;
  
  /** Allowed IPs */
  allowedIps?: string[];
  
  /** Allowed referrers */
  allowedReferrers?: string[];
  
  /** Rate limit per minute */
  rateLimitPerMinute?: number;
  
  /** Allowed districts */
  allowedDistricts?: string[];
}

/**
 * Magic link result
 */
export interface MagicLinkResult {
  /** Magic link URL */
  url: string;
  
  /** Token */
  token: string;
  
  /** Expires at */
  expiresAt: Date;
  
  /** Created at */
  createdAt: Date;
  
  /** Is valid */
  isValid: boolean;
  
  /** Is expired */
  isExpired: boolean;
  
  /** Is used */
  isUsed: boolean;
  
  /** Action type */
  action: 'login' | 'signup' | 'verify';
  
  /** Email (masked) */
  maskedEmail: string;
}

/**
 * WebAuthn registration result
 */
export interface WebAuthnRegistrationResult {
  /** Challenge */
  challenge: string;
  
  /** Registration ID */
  registrationId: string;
  
  /** Relying Party ID */
  rpId: string;
  
  /** Relying Party Name */
  rpName: string;
  
  /** User ID */
  userId: string;
  
  /** User name */
  userName: string;
  
  /** User display name */
  userDisplayName: string;
  
  /** Timeout in milliseconds */
  timeout: number;
  
  /** Attestation */
  attestation: AttestationConveyance;
  
  /** Authenticator selection */
  authenticatorSelection?: {
    authenticatorAttachment?: AuthenticatorAttachment;
    residentKey?: ResidentKey;
    userVerification?: UserVerification;
  };
  
  /** Expires at */
  expiresAt: Date;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 3: Main Service Interface
// ============================================================

/**
 * Token Generator Service Interface
 * 
 * Enterprise-grade service contract for token generation operations
 */
export interface ITokenGeneratorService {
  // ============================================================
  // JWT Operations
  // ============================================================

  /**
   * Generate access token
   * 
   * @param payload - Access token payload
   * @param options - JWT generation options
   * @returns Generated token
   * 
   * @example
   * const result = await tokenGenerator.generateAccessToken({
   *   userId: 'usr_123',
   *   email: 'user@example.com',
   *   role: 'USER',
   *   sessionId: 'sess_456'
   * }, { expiresIn: 900 });
   */
  generateAccessToken(
    payload: Omit<AccessTokenPayload, 'iat' | 'exp' | 'jti'>,
    options?: JWTGenerationOptions
  ): Promise<ServiceResult<TokenGenerationResult<AccessTokenPayload>>>;

  /**
   * Generate refresh token
   * 
   * @param payload - Refresh token payload
   * @param options - JWT generation options
   * @returns Generated token
   */
  generateRefreshToken(
    payload: Omit<RefreshTokenPayload, 'iat' | 'exp' | 'jti'>,
    options?: JWTGenerationOptions
  ): Promise<ServiceResult<TokenGenerationResult<RefreshTokenPayload>>>;

  /**
   * Generate reset token (password/email/phone reset)
   * 
   * @param payload - Reset token payload
   * @param options - JWT generation options
   * @returns Generated token
   */
  generateResetToken(
    payload: Omit<ResetTokenPayload, 'iat' | 'exp' | 'jti'>,
    options?: JWTGenerationOptions
  ): Promise<ServiceResult<TokenGenerationResult<ResetTokenPayload>>>;

  /**
   * Generate verification token (email/phone verification)
   * 
   * @param payload - Verification token payload
   * @param options - JWT generation options
   * @returns Generated token
   */
  generateVerificationToken(
    payload: Omit<VerificationTokenPayload, 'iat' | 'exp' | 'jti'>,
    options?: JWTGenerationOptions
  ): Promise<ServiceResult<TokenGenerationResult<VerificationTokenPayload>>>;

  /**
   * Generate MFA token
   * 
   * @param payload - MFA token payload
   * @param options - JWT generation options
   * @returns Generated token
   */
  generateMFAToken(
    payload: Omit<MFATokenPayload, 'iat' | 'exp' | 'jti'>,
    options?: JWTGenerationOptions
  ): Promise<ServiceResult<TokenGenerationResult<MFATokenPayload>>>;

  /**
   * Verify JWT token
   * 
   * @param token - JWT token to verify
   * @param options - Verification options
   * @returns Validation result
   */
  verifyToken(
    token: string,
    options?: {
      expectedType?: TokenType;
      expectedIssuer?: string;
      expectedAudience?: string;
      checkRevocation?: boolean;
      checkCompromise?: boolean;
    }
  ): Promise<TokenValidationResult>;

  /**
   * Decode JWT token without verification (for debugging only)
   * 
   * @param token - JWT token to decode
   * @returns Decoded payload
   */
  decodeToken(token: string): Promise<{
    header: JWTHeader;
    payload: VubonJWTClaims;
    signature: string;
  } | null>;

  /**
   * Check if token needs refresh
   * 
   * @param token - JWT token
   * @param refreshThreshold - Threshold in seconds (default: 120)
   * @returns Whether token needs refresh
   */
  needsRefresh(token: string, refreshThreshold?: number): Promise<boolean>;

  /**
   * Get token remaining time
   * 
   * @param token - JWT token
   * @returns Remaining time in seconds
   */
  getTokenRemainingTime(token: string): Promise<number>;

  /**
   * Refresh token
   * 
   * @param refreshToken - Refresh token
   * @param options - Refresh options
   * @returns New token pair
   */
  refreshToken(
    refreshToken: string,
    options?: {
      rotateToken?: boolean;
      extendSession?: boolean;
      deviceInfo?: DeviceInfo;
    }
  ): Promise<ServiceResult<TokenRefreshResult>>;

  /**
   * Revoke token
   * 
   * @param tokenId - Token ID (jti)
   * @param userId - User ID
   * @param reason - Revocation reason
   * @param options - Revocation options
   * @returns Revocation result
   */
  revokeToken(
    tokenId: string,
    userId: string,
    reason: string,
    options?: {
      revokeFamily?: boolean;
      notifyUser?: boolean;
    }
  ): Promise<ServiceResult<{ revoked: boolean; familyRevoked?: boolean }>>;

  /**
   * Revoke all tokens for user
   * 
   * @param userId - User ID
   * @param reason - Revocation reason
   * @param options - Revocation options
   * @returns Number of tokens revoked
   */
  revokeAllTokens(
    userId: string,
    reason: string,
    options?: {
      excludeCurrentSession?: boolean;
      sessionId?: string;
      notifyUser?: boolean;
    }
  ): Promise<ServiceResult<{ revokedCount: number }>>;

  // ============================================================
  // OTP Operations
  // ============================================================

  /**
   * Generate OTP
   * 
   * @param options - OTP generation options
   * @returns Generated OTP
   * 
   * @example
   * const result = await tokenGenerator.generateOTP({
   *   channel: 'SMS',
   *   purpose: 'LOGIN',
   *   identifier: '+8801712345678'
   * });
   */
  generateOTP(
    options: OTPGenerationOptions
  ): Promise<ServiceResult<OTPResult>>;

  /**
   * Verify OTP
   * 
   * @param otpId - OTP ID
   * @param code - OTP code
   * @param identifier - Identifier (phone/email)
   * @param options - Verification options
   * @returns Verification result
   */
  verifyOTP(
    otpId: string,
    code: string,
    identifier: string,
    options?: {
      purpose?: OTPPurpose;
      channel?: OTPChannel;
      consumeOnSuccess?: boolean;
    }
  ): Promise<ServiceResult<{
    verified: boolean;
    remainingAttempts: number;
    isLocked: boolean;
    lockExpiresAt?: Date;
    purpose: OTPPurpose;
    channel: OTPChannel;
  }>>;

  /**
   * Resend OTP
   * 
   * @param otpId - OTP ID
   * @param options - Resend options
   * @returns New OTP result
   */
  resendOTP(
    otpId: string,
    options?: {
      newIdentifier?: string;
      channel?: OTPChannel;
      purpose?: OTPPurpose;
    }
  ): Promise<ServiceResult<OTPResult>>;

  /**
   * Get OTP status
   * 
   * @param otpId - OTP ID
   * @returns OTP status
   */
  getOTPStatus(otpId: string): Promise<ServiceResult<{
    exists: boolean;
    isExpired: boolean;
    isUsed: boolean;
    remainingAttempts: number;
    expiresAt: Date;
    createdAt: Date;
    channel: OTPChannel;
    purpose: OTPPurpose;
  }>>;

  // ============================================================
  // Backup Code Operations
  // ============================================================

  /**
   * Generate backup codes
   * 
   * @param options - Backup code generation options
   * @returns Generated backup codes
   * 
   * @example
   * const result = await tokenGenerator.generateBackupCodes({
   *   userId: 'usr_123',
   *   count: 10
   * });
   */
  generateBackupCodes(
    options: BackupCodeGenerationOptions
  ): Promise<ServiceResult<BackupCodeResult>>;

  /**
   * Verify backup code
   * 
   * @param userId - User ID
   * @param code - Backup code
   * @param options - Verification options
   * @returns Verification result
   */
  verifyBackupCode(
    userId: string,
    code: string,
    options?: {
      consumeOnSuccess?: boolean;
      regenerateIfLow?: boolean;
    }
  ): Promise<ServiceResult<{
    verified: boolean;
    remainingCount: number;
    isLow: boolean;
    needsRegeneration: boolean;
  }>>;

  /**
   * Get remaining backup codes count
   * 
   * @param userId - User ID
   * @returns Remaining count
   */
  getRemainingBackupCodes(userId: string): Promise<ServiceResult<{
    remaining: number;
    total: number;
    isLow: boolean;
  }>>;

  /**
   * Regenerate backup codes
   * 
   * @param userId - User ID
   * @param options - Regeneration options
   * @returns New backup codes
   */
  regenerateBackupCodes(
    userId: string,
    options?: {
      count?: number;
      invalidateOld?: boolean;
    }
  ): Promise<ServiceResult<BackupCodeResult>>;

  // ============================================================
  // API Key Operations
  // ============================================================

  /**
   * Generate API key
   * 
   * @param options - API key generation options
   * @returns Generated API key
   * 
   * @example
   * const result = await tokenGenerator.generateAPIKey({
   *   name: 'Mobile App',
   *   userId: 'usr_123',
   *   permissions: ['read', 'write']
   * });
   */
  generateAPIKey(
    options: APIKeyGenerationOptions
  ): Promise<ServiceResult<APIKeyResult>>;

  /**
   * Validate API key
   * 
   * @param apiKey - API key
   * @param requiredPermission - Required permission
   * @param context - Request context (IP, referrer, district)
   * @returns Validation result
   */
  validateAPIKey(
    apiKey: string,
    requiredPermission?: string,
    context?: {
      ipAddress?: string;
      referrer?: string;
      district?: string;
    }
  ): Promise<ServiceResult<{
    valid: boolean;
    keyData?: APIKeyPayload;
    error?: string;
    permissionGranted?: boolean;
  }>>;

  /**
   * Revoke API key
   * 
   * @param keyId - API key ID
   * @param userId - User ID
   * @param reason - Revocation reason
   * @returns Revocation result
   */
  revokeAPIKey(
    keyId: string,
    userId: string,
    reason: string
  ): Promise<ServiceResult<{ revoked: boolean }>>;

  /**
   * List API keys for user
   * 
   * @param userId - User ID
   * @param options - Pagination options
   * @returns List of API keys
   */
  listAPIKeys(
    userId: string,
    options?: PaginationOptions
  ): Promise<PaginatedResult<APIKeyResult>>;

  // ============================================================
  // Magic Link Operations
  // ============================================================

  /**
   * Generate magic link
   * 
   * @param options - Magic link generation options
   * @returns Generated magic link
   * 
   * @example
   * const result = await tokenGenerator.generateMagicLink({
   *   email: 'user@example.com',
   *   action: 'login',
   *   redirectUrl: 'https://vubon.com.bd/dashboard'
   * });
   */
  generateMagicLink(
    options: MagicLinkGenerationOptions
  ): Promise<ServiceResult<MagicLinkResult>>;

  /**
   * Verify magic link
   * 
   * @param token - Magic link token
   * @param options - Verification options
   * @returns Verification result
   */
  verifyMagicLink(
    token: string,
    options?: {
      deviceId?: string;
      ipAddress?: string;
      consumeOnSuccess?: boolean;
    }
  ): Promise<ServiceResult<{
    verified: boolean;
    email: string;
    userId?: string;
    action: 'login' | 'signup' | 'verify';
    redirectUrl?: string;
    isUsed: boolean;
    isExpired: boolean;
  }>>;

  /**
   * Resend magic link
   * 
   * @param email - Email address
   * @param options - Resend options
   * @returns New magic link
   */
  resendMagicLink(
    email: string,
    options?: {
      action?: 'login' | 'signup' | 'verify';
      redirectUrl?: string;
    }
  ): Promise<ServiceResult<MagicLinkResult>>;

  // ============================================================
  // Session Transfer Operations
  // ============================================================

  /**
   * Generate session transfer token
   * 
   * @param options - Session transfer generation options
   * @returns Session transfer result
   * 
   * @example
   * const result = await tokenGenerator.generateSessionTransfer({
   *   fromSessionId: 'sess_123',
   *   toDeviceInfo: { deviceId: 'dev_456', deviceType: 'MOBILE' },
   *   userId: 'usr_123',
   *   transferMethod: 'QR_CODE'
   * });
   */
  generateSessionTransfer(
    options: SessionTransferGenerationOptions
  ): Promise<ServiceResult<SessionTransferResult>>;

  /**
   * Complete session transfer
   * 
   * @param transferId - Transfer ID
   * @param verificationCode - Verification code (if OTP method)
   * @param userId - User ID
   * @param options - Completion options
   * @returns Completion result
   */
  completeSessionTransfer(
    transferId: string,
    verificationCode: string | undefined,
    userId: string,
    options?: {
      deviceInfo?: DeviceInfo;
      createNewSession?: boolean;
    }
  ): Promise<ServiceResult<{
    success: boolean;
    newSessionId?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    error?: string;
  }>>;

  // ============================================================
  // Device Trust Operations
  // ============================================================

  /**
   * Generate device trust token
   * 
   * @param options - Device trust generation options
   * @returns Device trust result
   * 
   * @example
   * const result = await tokenGenerator.generateDeviceTrust({
   *   userId: 'usr_123',
   *   deviceId: 'dev_456',
   *   durationDays: 30
   * });
   */
  generateDeviceTrust(
    options: DeviceTrustGenerationOptions
  ): Promise<ServiceResult<DeviceTrustResult>>;

  /**
   * Verify device trust
   * 
   * @param userId - User ID
   * @param deviceId - Device ID
   * @param options - Verification options
   * @returns Verification result
   */
  verifyDeviceTrust(
    userId: string,
    deviceId: string,
    options?: {
      trustLevel?: TrustLevel;
      checkExpiry?: boolean;
    }
  ): Promise<ServiceResult<{
    trusted: boolean;
    trustLevel: TrustLevel;
    expiresAt: Date | null;
    remainingDays: number;
    isExpired: boolean;
  }>>;

  /**
   * Revoke device trust
   * 
   * @param userId - User ID
   * @param deviceId - Device ID
   * @param reason - Revocation reason
   * @returns Revocation result
   */
  revokeDeviceTrust(
    userId: string,
    deviceId: string,
    reason: string
  ): Promise<ServiceResult<{ revoked: boolean }>>;

  // ============================================================
  // WebAuthn (Passkey) Operations
  // ============================================================

  /**
   * Generate WebAuthn registration challenge
   * 
   * @param options - WebAuthn generation options
   * @returns Registration challenge
   * 
   * @example
   * const result = await tokenGenerator.generateWebAuthnRegistration({
   *   userId: 'usr_123',
   *   userName: 'user@example.com',
   *   deviceName: 'iPhone 15'
   * });
   */
  generateWebAuthnRegistration(
    options: WebAuthnGenerationOptions
  ): Promise<ServiceResult<WebAuthnRegistrationResult>>;

  /**
   * Verify WebAuthn registration
   * 
   * @param registrationId - Registration ID
   * @param response - Registration response from client
   * @param userId - User ID
   * @returns Verification result
   */
  verifyWebAuthnRegistration(
    registrationId: string,
    response: WebAuthnRegistrationResponse,
    userId: string
  ): Promise<ServiceResult<{
    verified: boolean;
    credentialId: string;
    publicKey: string;
    signCount: number;
    deviceName: string;
  }>>;

  /**
   * Generate WebAuthn authentication challenge
   * 
   * @param userId - User ID
   * @param credentialIds - Allowed credential IDs (optional)
   * @param options - Authentication options
   * @returns Authentication challenge
   */
  generateWebAuthnAuthentication(
    userId: string,
    credentialIds?: string[],
    options?: {
      userVerification?: UserVerification;
      timeoutMs?: number;
    }
  ): Promise<ServiceResult<WebAuthnAuthenticationRequest>>;

  /**
   * Verify WebAuthn authentication
   * 
   * @param challengeId - Challenge ID
   * @param response - Authentication response from client
   * @param userId - User ID
   * @returns Verification result
   */
  verifyWebAuthnAuthentication(
    challengeId: string,
    response: {
      id: string;
      rawId: string;
      response: {
        authenticatorData: string;
        clientDataJSON: string;
        signature: string;
        userHandle?: string;
      };
    },
    userId: string
  ): Promise<ServiceResult<{
    verified: boolean;
    credentialId: string;
    signCount: number;
    userId: string;
  }>>;

  // ============================================================
  // Token Management Operations
  // ============================================================

  /**
   * Get token status
   * 
   * @param tokenId - Token ID
   * @param tokenType - Token type
   * @returns Token status
   */
  getTokenStatus(
    tokenId: string,
    tokenType: TokenType
  ): Promise<ServiceResult<{
    exists: boolean;
    status: TokenStatus;
    expiresAt?: Date;
    createdAt?: Date;
    userId?: string;
    isExpired: boolean;
    isRevoked: boolean;
  }>>;

  /**
   * Blacklist token
   * 
   * @param tokenId - Token ID
   * @param reason - Blacklist reason
   * @param options - Blacklist options
   * @returns Blacklist result
   */
  blacklistToken(
    tokenId: string,
    reason: string,
    options?: {
      userId?: string;
      expiresIn?: number;
      notifyUser?: boolean;
    }
  ): Promise<ServiceResult<{ blacklisted: boolean }>>;

  /**
   * Check if token is blacklisted
   * 
   * @param tokenId - Token ID
   * @returns Whether token is blacklisted
   */
  isTokenBlacklisted(tokenId: string): Promise<boolean>;

  /**
   * Cleanup expired tokens
   * 
   * @param olderThanDays - Cleanup tokens older than N days
   * @param tokenType - Token type (optional)
   * @returns Cleanup result
   */
  cleanupExpiredTokens(
    olderThanDays: number,
    tokenType?: TokenType
  ): Promise<ServiceResult<{
    deletedCount: number;
    archivedCount: number;
    failedCount: number;
    durationMs: number;
  }>>;

  // ============================================================
  // Configuration Operations
  // ============================================================

  /**
   * Get token configuration
   * 
   * @param environment - Environment (auto-detected if not provided)
   * @returns Token configuration
   */
  getConfig(environment?: Environment): Promise<TokenConfig>;

  /**
   * Get environment-specific configuration
   * 
   * @param environment - Environment name
   * @returns Environment configuration
   */
  getEnvironmentConfig(environment: Environment): Promise<EnvironmentTokenConfig>;

  /**
   * Update token configuration
   * 
   * @param config - Updated configuration
   * @param updatedBy - User ID performing update
   * @param reason - Update reason
   * @returns Updated configuration
   */
  updateConfig(
    config: Partial<TokenConfig>,
    updatedBy: string,
    reason?: string
  ): Promise<TokenConfig>;

  /**
   * Reset configuration to defaults
   * 
   * @param environment - Environment to reset
   * @param resetBy - User ID performing reset
   * @returns Reset configuration
   */
  resetConfig(
    environment?: Environment,
    resetBy?: string
  ): Promise<TokenConfig>;

  // ============================================================
  // Bangladesh Bank Compliance Operations
  // ============================================================

  /**
   * Get compliance status (Bangladesh Bank)
   * 
   * @param checkAll - Perform full compliance check
   * @returns Compliance status
   */
  getComplianceStatus(
    checkAll?: boolean
  ): Promise<{
    compliant: boolean;
    issues: string[];
    recommendations: string[];
    lastCheck: Date;
    nextCheck: Date;
    metrics: {
      tokenExpiryCompliance: number;
      algorithmCompliance: number;
      rotationCompliance: number;
    };
  }>;

  /**
   * Get compliance requirements
   * 
   * @returns Bangladesh Bank compliance requirements
   */
  getComplianceRequirements(): Promise<BBankComplianceRequirements>;

  /**
   * Run compliance check
   * 
   * @param fixIssues - Attempt to fix compliance issues
   * @param fixedBy - User ID performing fixes
   * @returns Compliance check result
   */
  runComplianceCheck(
    fixIssues?: boolean,
    fixedBy?: string
  ): Promise<{
    compliant: boolean;
    issues: string[];
    fixes: string[];
    recommendations: string[];
    checkCompletedAt: Date;
  }>;

  /**
   * Generate compliance report
   * 
   * @param fromDate - Start date
   * @param toDate - End date
   * @param format - Export format (json, csv, pdf)
   * @returns Compliance report
   */
  generateComplianceReport(
    fromDate: Date,
    toDate: Date,
    format?: 'json' | 'csv' | 'pdf'
  ): Promise<{
    reportId: string;
    generatedAt: Date;
    summary: {
      totalTokensGenerated: number;
      totalTokensVerified: number;
      successRate: number;
      averageGenerationTimeMs: number;
      averageVerificationTimeMs: number;
      tokenTypeDistribution: Record<string, number>;
    };
    issues: Array<{
      severity: 'low' | 'medium' | 'high' | 'critical';
      description: string;
      count: number;
      recommendation: string;
    }>;
    recommendations: string[];
    exportUrl: string;
    expiresAt: Date;
  }>;

  // ============================================================
  // Performance & Monitoring Operations
  // ============================================================

  /**
   * Get performance metrics
   * 
   * @param reset - Whether to reset metrics after retrieval
   * @param fromDate - Start date for metrics
   * @param toDate - End date for metrics
   * @returns Performance metrics
   */
  getPerformanceMetrics(
    reset?: boolean,
    fromDate?: Date,
    toDate?: Date
  ): Promise<{
    averageGenerationTimeMs: number;
    p95GenerationTimeMs: number;
    p99GenerationTimeMs: number;
    averageVerificationTimeMs: number;
    p95VerificationTimeMs: number;
    p99VerificationTimeMs: number;
    successRate: number;
    failureRate: number;
    totalOperations: number;
    byTokenType: Record<string, number>;
    byAlgorithm: Record<string, number>;
    byEnvironment: Record<string, number>;
  }>;

  /**
   * Get aggregated statistics
   * 
   * @param timeWindowHours - Time window for aggregation
   * @returns Aggregated statistics
   */
  getAggregatedStats(
    timeWindowHours?: number
  ): Promise<{
    totalTokens: number;
    activeTokens: number;
    expiredTokens: number;
    revokedTokens: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    averageTokenAge: number;
  }>;

  /**
   * Reset performance metrics
   * 
   * @param resetBy - User ID performing reset
   * @param reason - Reset reason
   * @returns Reset result
   */
  resetPerformanceMetrics(
    resetBy?: string,
    reason?: string
  ): Promise<{ reset: boolean; resetAt: Date }>;

  // ============================================================
  // Audit Operations
  // ============================================================

  /**
   * Get audit trail for token operations
   * 
   * @param userId - User ID (optional)
   * @param fromDate - Start date
   * @param toDate - End date
   * @param limit - Maximum number of entries
   * @param offset - Pagination offset
   * @returns Audit trail entries
   */
  getAuditTrail(
    userId?: string,
    fromDate?: Date,
    toDate?: Date,
    limit?: number,
    offset?: number
  ): Promise<{
    items: Array<{
      id: string;
      action: 'generated' | 'verified' | 'revoked' | 'refreshed' | 'blacklisted' | 'expired' | 'compromised';
      tokenType: TokenType;
      tokenId: string;
      userId: string;
      timestamp: Date;
      ipAddress?: string;
      userAgent?: string;
      deviceId?: string;
      correlationId?: string;
      details?: string;
      success: boolean;
      error?: string;
    }>;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;

  /**
   * Export audit trail for compliance
   * 
   * @param userId - User ID (optional)
   * @param fromDate - Start date
   * @param toDate - End date
   * @param format - Export format (json, csv)
   * @returns Export result
   */
  exportAuditTrail(
    userId?: string,
    fromDate?: Date,
    toDate?: Date,
    format?: 'json' | 'csv'
  ): Promise<{
    downloadUrl: string;
    expiresAt: Date;
    fileSize: number;
    recordCount: number;
    format: string;
  }>;

  // ============================================================
  // Health & Monitoring Operations
  // ============================================================

  /**
   * Health check for token generator service
   * 
   * @param includeDependencies - Include dependency health
   * @param includePerformance - Include performance metrics
   * @returns Health status
   */
  healthCheck(
    includeDependencies?: boolean,
    includePerformance?: boolean
  ): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    uptime: number;
    environment: string;
    complianceStatus: 'compliant' | 'non_compliant' | 'unknown';
    dependencies: {
      randomGenerator: boolean;
      jwt: boolean;
      otp: boolean;
      webauthn: boolean;
      cache: boolean;
      database: boolean;
    };
    performance: {
      averageGenerationTimeMs: number;
      averageVerificationTimeMs: number;
      successRate: number;
      errorRate: number;
      p95GenerationTimeMs: number;
      p99GenerationTimeMs: number;
    };
    metrics: {
      totalTokens: number;
      activeTokens: number;
      revokedTokens: number;
      expiredTokens: number;
    };
    lastError?: {
      message: string;
      timestamp: Date;
    };
    lastComplianceCheck?: {
      passed: boolean;
      timestamp: Date;
    };
  }>;

  /**
   * Get service metrics
   * 
   * @param period - Time period for metrics (1h, 24h, 7d, 30d)
   * @returns Service metrics
   */
  getMetrics(
    period?: '1h' | '24h' | '7d' | '30d'
  ): Promise<{
    operations: {
      total: number;
      jwt: number;
      otp: number;
      backupCode: number;
      apiKey: number;
      magicLink: number;
      sessionTransfer: number;
      deviceTrust: number;
      webauthn: number;
    };
    successRate: number;
    averageLatencyMs: number;
    p95LatencyMs: number;
    p99LatencyMs: number;
    errorDistribution: Record<string, number>;
    tokenTypeUsage: Record<string, number>;
    complianceScore: number;
  }>;

  /**
   * Clear all metrics
   * 
   * @param clearedBy - User ID performing clear
   * @param reason - Clear reason
   * @returns Clear result
   */
  clearMetrics(
    clearedBy?: string,
    reason?: string
  ): Promise<{ cleared: boolean; clearedAt: Date }>;
}

// ============================================================
// Type Exports
// ============================================================

export type {
  TokenGeneratorOptions as TokenGeneratorOptionsType,
  JWTGenerationOptions as JWTGenerationOptionsType,
  OTPGenerationOptions as OTPGenerationOptionsType,
  BackupCodeGenerationOptions as BackupCodeGenerationOptionsType,
  APIKeyGenerationOptions as APIKeyGenerationOptionsType,
  MagicLinkGenerationOptions as MagicLinkGenerationOptionsType,
  SessionTransferGenerationOptions as SessionTransferGenerationOptionsType,
  DeviceTrustGenerationOptions as DeviceTrustGenerationOptionsType,
  WebAuthnGenerationOptions as WebAuthnGenerationOptionsType,
  ServiceResult as ServiceResultType,
  TokenGenerationResult as TokenGenerationResultType,
  TokenValidationResult as TokenValidationResultType,
  TokenRefreshResult as TokenRefreshResultType,
  OTPResult as OTPResultType,
  BackupCodeResult as BackupCodeResultType,
  APIKeyResult as APIKeyResultType,
  MagicLinkResult as MagicLinkResultType,
  WebAuthnRegistrationResult as WebAuthnRegistrationResultType,
};

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features Applied:
// 1. ✅ JWT generation, verification, and validation (RFC 7519)
// 2. ✅ OTP generation and verification (TOTP RFC 6238)
// 3. ✅ Backup and recovery codes management
// 4. ✅ API key generation and validation
// 5. ✅ Magic link generation and verification
// 6. ✅ Session transfer tokens (QR/Magic Link/OTP)
// 7. ✅ Device trust tokens
// 8. ✅ WebAuthn (Passkey) registration and authentication
// 9. ✅ Token rotation and family management
// 10. ✅ Bangladesh Bank compliance
// 11. ✅ Performance metrics and monitoring
// 12. ✅ Audit logging for compliance
// 13. ✅ Distributed tracing with correlation ID
// 14. ✅ Bengali language support
// 15. ✅ Bangladesh specific - 2G/3G/4G/5G/WiFi network awareness
// 16. ✅ Rate limiting and quota management
// 17. ✅ Health check and monitoring
// 18. ✅ Type-safe with full TypeScript support
// 
// Bangladesh Specific:
// - Bangladesh Bank compliance
// - District/Division tracking
// - Network type (2G/3G/4G/5G/WiFi) awareness
// - Mobile operator tracking
// - Bengali language support
// - Local timezone-aware timestamps
// - Compliance reporting ready
// 
// Security Features:
// - Token data NEVER logged or serialized
// - Random generation using cryptographically secure methods
// - Timing-safe comparison for verification
// - Rate limiting for verification attempts
// - Lockout after max attempts
// - One-time use codes
// - Hashed code storage
// - Token versioning
// - Trust level system
// - MFA verification tracking
// - Device fingerprint tracking
// - IP whitelist support
// 
// ============================================================
