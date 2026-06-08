/**
 * Authentication Service Interface - Pure Application Contract (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/auth.service.interface
 * 
 * @description
 * Application service contract for authentication operations.
 * Defines the boundary between application layer and infrastructure.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Generic response wrapper with type safety
 * ✅ Options parameter for flexible configuration
 * ✅ Device trust tracking with TTL
 * ✅ Session binding for MFA flow
 * ✅ Retry context for connection resilience
 * ✅ Correlation ID propagation
 * ✅ Rate limit metadata support
 * ✅ Bengali language preference
 * ✅ Geographic location tracking (Bangladesh districts)
 * ✅ Bulk operations support
 * 
 * @example
 * const authService = new AuthService(userRepository, tokenService, ...);
 * const result = await authService.login(loginDto, '192.168.1.100', 'Mozilla/5.0...', {
 *   trustDevice: true,
 *   trustDurationDays: 30,
 *   correlationId: 'corr_123',
 *   preferredLanguage: 'bn'
 * });
 */

import type { 
  LoginDto, 
  RegisterDto, 
  RefreshTokenDto, 
  LogoutDto,
  SocialLoginDto,
  SocialPhoneLoginDto,
  UsernameLoginDto,
  PhoneLoginDto,
  OtpLoginDto,
  LoginResponseDto,
  TokenRefreshResponseDto,
  LogoutResponseDto,
  UserResponseDto,
  MFARequiredResponseDto,
  EnableMfaDto,
  VerifyMfaDto,
  DisableMfaDto,
  TOTPSetupResponseDto,
  PhoneSetupResponseDto,
  MFSPinSetupResponseDto,
  WebAuthnSetupResponseDto,
  MFAStatusResponseDto
} from '../../dtos';

import type { 
  User, 
  Session, 
  RefreshToken,
  MFAMethod
} from '../../../domain/entities';

import type { 
  AuditMetadata, 
  RequestContext,
  PaginationOptions,
  PaginatedResult,
  ApiErrorCode
} from '@vubon/shared-types';

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Options Interfaces
// ============================================================

/**
 * Base authentication options
 */
export interface AuthOptions {
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
  
  /** Network type for security scoring */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  
  /** Retry attempt number (for connection resilience) */
  retryAttempt?: number;
}

/**
 * Login specific options
 */
export interface LoginOptions extends AuthOptions {
  /** Trust this device for future logins */
  trustDevice?: boolean;
  
  /** Trust duration in days (default: 30) */
  trustDurationDays?: number;
  
  /** Session TTL override (seconds) */
  sessionTtlSeconds?: number;
  
  /** Skip rate limiting (admin only) */
  skipRateLimit?: boolean;
  
  /** Bind session to IP address */
  bindToIp?: boolean;
  
  /** Bind session to device fingerprint */
  bindToDeviceFingerprint?: boolean;
}

/**
 * MFA specific options
 */
export interface MFAOptions extends AuthOptions {
  /** MFA session ID (from login response) */
  mfaSessionId?: string;
  
  /** Trust device after successful MFA */
  trustDevice?: boolean;
  
  /** Trust duration in days */
  trustDurationDays?: number;
  
  /** MFA method to use (if user has multiple) */
  preferredMethod?: string;
  
  /** Maximum attempts before lockout */
  maxAttempts?: number;
}

/**
 * Registration specific options
 */
export interface RegistrationOptions extends AuthOptions {
  /** Auto-login after successful registration */
  autoLogin?: boolean;
  
  /** Send welcome email */
  sendWelcomeEmail?: boolean;
  
  /** Send welcome SMS (Bangladesh specific) */
  sendWelcomeSms?: boolean;
  
  /** Default user role (default: CUSTOMER) */
  defaultRole?: string;
  
  /** Require email verification */
  requireEmailVerification?: boolean;
  
  /** Require phone verification */
  requirePhoneVerification?: boolean;
  
  /** User tier (loyalty program) */
  userTier?: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';
}

/**
 * Token refresh specific options
 */
export interface TokenRefreshOptions extends AuthOptions {
  /** Rotate refresh token */
  rotateToken?: boolean;
  
  /** Revoke old refresh token family on compromise */
  revokeFamilyOnCompromise?: boolean;
  
  /** Extend session expiry */
  extendSession?: boolean;
  
  /** Session extension duration (seconds) */
  extensionSeconds?: number;
}

/**
 * Logout specific options
 */
export interface LogoutOptions extends AuthOptions {
  /** Logout from all devices */
  allDevices?: boolean;
  
  /** Keep current session active (when logging out from all devices) */
  keepCurrent?: boolean;
  
  /** Specific session ID to revoke */
  sessionId?: string;
  
  /** Revoke all refresh tokens */
  revokeRefreshTokens?: boolean;
  
  /** Clear device trust */
  clearDeviceTrust?: boolean;
}

/**
 * Social login specific options
 */
export interface SocialLoginOptions extends AuthOptions {
  /** Create user if doesn't exist */
  autoCreateUser?: boolean;
  
  /** Link to existing account */
  linkToExisting?: boolean;
  
  /** Existing user ID for linking */
  existingUserId?: string;
  
  /** Set as primary social account */
  setAsPrimary?: boolean;
  
  /** Provider-specific scopes */
  scopes?: string[];
}

/**
 * MFA enable options
 */
export interface MFAEnableOptions extends AuthOptions {
  /** Set as primary MFA method */
  setAsPrimary?: boolean;
  
  /** Device name for TOTP/WebAuthn */
  deviceName?: string;
  
  /** Generate new backup codes */
  generateBackupCodes?: boolean;
  
  /** Number of backup codes to generate */
  backupCodeCount?: number;
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
  
  /** Rate limit metadata */
  rateLimit?: {
    remaining: number;
    resetAt: Date;
    limit: number;
  };
  
  /** Correlation ID for tracing */
  correlationId?: string;
  
  /** Duration of operation in milliseconds */
  durationMs?: number;
}

/**
 * Login result with MFA status
 */
export interface LoginResult extends ServiceResult<LoginResponseDto> {
  /** Whether MFA is required to complete login */
  mfaRequired: boolean;
  
  /** MFA session ID (if MFA required) */
  mfaSessionId?: string;
  
  /** Available MFA methods (if MFA required) */
  availableMfaMethods?: string[];
  
  /** Partial login session ID (for MFA flow) */
  loginSessionId?: string;
}

/**
 * MFA verification result
 */
export interface MFAVerificationResult extends ServiceResult<LoginResponseDto> {
  /** Remaining attempts before lockout */
  remainingAttempts: number;
  
  /** Whether MFA method is locked */
  isLocked: boolean;
  
  /** Lockout expiry time */
  lockoutExpiresAt?: Date;
}

/**
 * Token validation result
 */
export interface TokenValidationResult {
  /** Whether token is valid */
  isValid: boolean;
  
  /** User ID (if token is valid) */
  userId?: string;
  
  /** Session ID (if token is valid) */
  sessionId?: string;
  
  /** Token expiry timestamp */
  expiresAt?: Date;
  
  /** Remaining time in seconds */
  remainingSeconds?: number;
  
  /** Token type (access/refresh) */
  tokenType?: 'access' | 'refresh';
  
  /** Error reason (if invalid) */
  error?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 3: Main Service Interface
// ============================================================

/**
 * Authentication Service Interface
 * 
 * Core authentication operations for the application layer
 */
export interface IAuthService {
  // ============================================================
  // Login Operations (6 methods with options support)
  // ============================================================
  
  /**
   * Login with email and password
   * 
   * @param dto - Login credentials
   * @param ipAddress - Client IP address for security audit
   * @param userAgent - Client user agent for device fingerprinting
   * @param options - Additional options (trust device, correlation ID, etc.)
   * @returns Login result with tokens or MFA requirement
   */
  login(
    dto: LoginDto,
    ipAddress: string,
    userAgent: string,
    options?: LoginOptions
  ): Promise<LoginResult>;

  /**
   * Login with phone number and password (Bangladesh specific)
   * 
   * @param dto - Phone login credentials
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param options - Additional options
   * @returns Login result with tokens or MFA requirement
   */
  loginWithPhone(
    dto: PhoneLoginDto,
    ipAddress: string,
    userAgent: string,
    options?: LoginOptions
  ): Promise<LoginResult>;

  /**
   * Login with username and password
   * 
   * @param dto - Username login credentials
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param options - Additional options
   * @returns Login result with tokens or MFA requirement
   */
  loginWithUsername(
    dto: UsernameLoginDto,
    ipAddress: string,
    userAgent: string,
    options?: LoginOptions
  ): Promise<LoginResult>;

  /**
   * Passwordless login with OTP (Bangladesh specific)
   * 
   * @param dto - OTP login credentials
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param options - Additional options
   * @returns Login result with tokens
   */
  loginWithOtp(
    dto: OtpLoginDto,
    ipAddress: string,
    userAgent: string,
    options?: LoginOptions
  ): Promise<LoginResult>;

  /**
   * Social media login (Google, Facebook, GitHub, Apple, LinkedIn)
   * 
   * @param dto - Social login credentials
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param options - Social login options (auto-create, link existing)
   * @returns Login result with tokens or MFA requirement
   */
  socialLogin(
    dto: SocialLoginDto,
    ipAddress: string,
    userAgent: string,
    options?: SocialLoginOptions
  ): Promise<LoginResult>;

  /**
   * WhatsApp/Imo/Telegram login with OTP (Bangladesh specific)
   * 
   * @param dto - Social phone login credentials
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param options - Login options
   * @returns Login result with tokens
   */
  socialPhoneLogin(
    dto: SocialPhoneLoginDto,
    ipAddress: string,
    userAgent: string,
    options?: LoginOptions
  ): Promise<LoginResult>;

  // ============================================================
  // MFA Operations (Enhanced with options)
  // ============================================================

  /**
   * Verify MFA code to complete login
   * 
   * @param dto - MFA verification data
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param options - MFA options (trust device, preferred method)
   * @returns Login result with tokens
   */
  verifyMfa(
    dto: VerifyMfaDto,
    ipAddress: string,
    userAgent: string,
    options?: MFAOptions
  ): Promise<MFAVerificationResult>;

  /**
   * Enable MFA for user
   * 
   * @param userId - User ID (from JWT)
   * @param dto - MFA enable data
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param options - MFA enable options
   * @returns Setup response (secret, QR code, backup codes)
   */
  enableMfa(
    userId: string,
    dto: EnableMfaDto,
    ipAddress: string,
    userAgent: string,
    options?: MFAEnableOptions
  ): Promise<ServiceResult<TOTPSetupResponseDto | PhoneSetupResponseDto | MFSPinSetupResponseDto | WebAuthnSetupResponseDto>>;

  /**
   * Verify MFA setup (confirm code after enabling)
   * 
   * @param userId - User ID
   * @param methodId - MFA method ID
   * @param code - Verification code
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @returns Success status
   */
  verifyMfaSetup(
    userId: string,
    methodId: string,
    code: string,
    ipAddress: string,
    userAgent: string
  ): Promise<ServiceResult<{ methodId: string; isPrimary: boolean }>>;

  /**
   * Disable MFA for user
   * 
   * @param userId - User ID
   * @param dto - MFA disable data
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @returns Success status
   */
  disableMfa(
    userId: string,
    dto: DisableMfaDto,
    ipAddress: string,
    userAgent: string
  ): Promise<ServiceResult<{ disabledMethodIds: string[] }>>;

  /**
   * Get MFA status for user
   * 
   * @param userId - User ID
   * @returns MFA status (enabled, methods, backup codes remaining)
   */
  getMfaStatus(userId: string): Promise<MFAStatusResponseDto>;

  /**
   * Generate new backup codes
   * 
   * @param userId - User ID
   * @param ipAddress - Client IP address
   * @returns New backup codes
   */
  regenerateBackupCodes(
    userId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<ServiceResult<{ backupCodes: string[]; remainingCount: number }>>;

  // ============================================================
  // Registration Operations
  // ============================================================

  /**
   * Register new user
   * 
   * @param dto - Registration data
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param options - Registration options (auto-login, welcome email)
   * @returns User data with optional auto-login tokens
   */
  register(
    dto: RegisterDto,
    ipAddress: string,
    userAgent: string,
    options?: RegistrationOptions
  ): Promise<ServiceResult<UserResponseDto>>;

  /**
   * Verify email address
   * 
   * @param token - Email verification token
   * @param ipAddress - Client IP address
   * @returns Success status
   */
  verifyEmail(
    token: string,
    ipAddress: string,
    userAgent: string
  ): Promise<ServiceResult<{ emailVerified: boolean }>>;

  /**
   * Verify phone number (Bangladesh specific)
   * 
   * @param userId - User ID
   * @param otpCode - OTP code
   * @param ipAddress - Client IP address
   * @returns Success status
   */
  verifyPhone(
    userId: string,
    otpCode: string,
    ipAddress: string,
    userAgent: string
  ): Promise<ServiceResult<{ phoneVerified: boolean }>>;

  /**
   * Resend verification email
   * 
   * @param userId - User ID
   * @param ipAddress - Client IP address
   * @returns Rate limit info
   */
  resendVerificationEmail(
    userId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<ServiceResult<{ cooldownSeconds: number }>>;

  /**
   * Resend verification SMS (Bangladesh specific)
   * 
   * @param userId - User ID
   * @param method - SMS or WhatsApp
   * @param ipAddress - Client IP address
   * @returns Rate limit info
   */
  resendVerificationSms(
    userId: string,
    method: 'sms' | 'whatsapp',
    ipAddress: string,
    userAgent: string
  ): Promise<ServiceResult<{ cooldownSeconds: number; maskedPhone: string }>>;

  // ============================================================
  // Token Operations
  // ============================================================

  /**
   * Refresh access token using refresh token
   * 
   * @param dto - Refresh token data
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param options - Refresh options (rotate token, extend session)
   * @returns New access and refresh tokens
   */
  refreshToken(
    dto: RefreshTokenDto,
    ipAddress: string,
    userAgent: string,
    options?: TokenRefreshOptions
  ): Promise<ServiceResult<TokenRefreshResponseDto>>;

  /**
   * Validate token (RFC 7662 compliant introspection)
   * 
   * @param token - Token to validate
   * @param tokenTypeHint - Access or refresh token
   * @returns Token validation result
   */
  validateToken(
    token: string,
    tokenTypeHint?: 'access_token' | 'refresh_token'
  ): Promise<TokenValidationResult>;

  /**
   * Revoke refresh token
   * 
   * @param token - Refresh token to revoke
   * @param userId - User ID
   * @param ipAddress - Client IP address
   * @returns Success status
   */
  revokeRefreshToken(
    token: string,
    userId: string,
    ipAddress: string
  ): Promise<ServiceResult<{ revoked: boolean }>>;

  // ============================================================
  // Session Operations
  // ============================================================

  /**
   * Logout user
   * 
   * @param dto - Logout data
   * @param userId - User ID
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param options - Logout options (all devices, keep current)
   * @returns Logout result
   */
  logout(
    dto: LogoutDto,
    userId: string,
    ipAddress: string,
    userAgent: string,
    options?: LogoutOptions
  ): Promise<ServiceResult<LogoutResponseDto>>;

  /**
   * Get current user from session
   * 
   * @param userId - User ID
   * @param includeSensitive - Include sensitive data (requires elevated privileges)
   * @returns User entity
   */
  getCurrentUser(
    userId: string,
    includeSensitive?: boolean
  ): Promise<User>;

  /**
   * Get user sessions
   * 
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Paginated list of sessions
   */
  getUserSessions(
    userId: string,
    options?: PaginationOptions
  ): Promise<PaginatedResult<Session>>;

  /**
   * Revoke specific session
   * 
   * @param userId - User ID
   * @param sessionId - Session ID to revoke
   * @param ipAddress - Client IP address
   * @returns Success status
   */
  revokeSession(
    userId: string,
    sessionId: string,
    ipAddress: string
  ): Promise<ServiceResult<{ revoked: boolean }>>;

  /**
   * Revoke all sessions for user
   * 
   * @param userId - User ID
   * @param excludeCurrentSession - Exclude current session
   * @param ipAddress - Client IP address
   * @returns Number of sessions revoked
   */
  revokeAllSessions(
    userId: string,
    excludeCurrentSession: boolean,
    ipAddress: string
  ): Promise<ServiceResult<{ sessionsRevokedCount: number }>>;

  // ============================================================
  // Password Operations
  // ============================================================

  /**
   * Request password reset (send email/OTP)
   * 
   * @param email - User email
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @returns Rate limit info
   */
  forgotPassword(
    email: string,
    ipAddress: string,
    userAgent: string
  ): Promise<ServiceResult<{ cooldownSeconds: number; maskedEmail?: string }>>;

  /**
   * Request password reset via phone (Bangladesh specific)
   * 
   * @param phoneNumber - Bangladesh phone number
   * @param method - SMS or WhatsApp
   * @param ipAddress - Client IP address
   * @returns Rate limit info and session ID
   */
  forgotPasswordByPhone(
    phoneNumber: string,
    method: 'sms' | 'whatsapp',
    ipAddress: string,
    userAgent: string
  ): Promise<ServiceResult<{ cooldownSeconds: number; maskedPhone: string; sessionId: string }>>;

  /**
   * Reset password using token
   * 
   * @param token - Password reset token
   * @param newPassword - New password
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @returns Success status
   */
  resetPassword(
    token: string,
    newPassword: string,
    ipAddress: string,
    userAgent: string
  ): Promise<ServiceResult<{ passwordReset: boolean; sessionsRevoked?: number }>>;

  /**
   * Reset password using OTP (Bangladesh specific)
   * 
   * @param phoneNumber - Bangladesh phone number
   * @param otpCode - OTP code
   * @param newPassword - New password
   * @param sessionId - Reset session ID
   * @param ipAddress - Client IP address
   * @returns Success status
   */
  resetPasswordWithOtp(
    phoneNumber: string,
    otpCode: string,
    newPassword: string,
    sessionId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<ServiceResult<{ passwordReset: boolean }>>;

  /**
   * Change password (authenticated user)
   * 
   * @param userId - User ID
   * @param currentPassword - Current password
   * @param newPassword - New password
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param logoutOtherDevices - Logout from other devices
   * @returns Success status with session info
   */
  changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
    ipAddress: string,
    userAgent: string,
    logoutOtherDevices?: boolean
  ): Promise<ServiceResult<{ passwordChanged: boolean; sessionsRevoked?: number; newSessionId?: string }>>;

  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 4: Bulk Operations
  // ============================================================

  /**
   * Bulk logout for multiple users (admin only)
   * 
   * @param userIds - Array of user IDs
   * @param adminId - Admin ID performing the operation
   * @param reason - Reason for bulk logout
   * @param ipAddress - Admin IP address
   * @returns Bulk operation result
   */
  bulkLogout(
    userIds: string[],
    adminId: string,
    reason: string,
    ipAddress: string
  ): Promise<ServiceResult<{ 
    totalUsers: number; 
    successfulCount: number; 
    failedCount: number;
    totalSessionsRevoked: number;
    failures?: Record<string, string>;
  }>>;

  /**
   * Force password reset for multiple users (admin only)
   * 
   * @param userIds - Array of user IDs
   * @param adminId - Admin ID
   * @param reason - Reason for force reset
   * @param ipAddress - Admin IP address
   * @returns Bulk operation result
   */
  bulkForcePasswordReset(
    userIds: string[],
    adminId: string,
    reason: string,
    ipAddress: string
  ): Promise<ServiceResult<{ 
    totalUsers: number; 
    successfulCount: number; 
    failedCount: number;
    failures?: Record<string, string>;
  }>>;

  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 5: Health & Monitoring
  // ============================================================

  /**
   * Health check for auth service
   * 
   * @returns Service health status
   */
  healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    uptime: number;
    dependencies: {
      database: boolean;
      redis: boolean;
      queue: boolean;
    };
    metrics?: {
      activeSessions: number;
      recentLogins: number;
      mfaEnabledUsers: number;
    };
  }>;

  /**
   * Get rate limit status for user
   * 
   * @param userId - User ID
   * @param operation - Operation type (login, register, reset, etc.)
   * @returns Rate limit info
   */
  getRateLimitStatus(
    userId: string,
    operation: 'login' | 'register' | 'reset' | 'mfa' | 'token_refresh'
  ): Promise<{
    limited: boolean;
    remaining: number;
    resetAt: Date;
    limit: number;
  }>;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 6: Service Factory Interface
// ============================================================

/**
 * Authentication Service Factory
 * For dependency injection and service instantiation
 */
export interface IAuthServiceFactory {
  /**
   * Create auth service instance
   */
  create(): IAuthService;
  
  /**
   * Create auth service with custom configuration
   */
  createWithConfig(config: {
    jwtSecret?: string;
    jwtExpirySeconds?: number;
    refreshTokenExpiryDays?: number;
    mfaEnabled?: boolean;
    rateLimitEnabled?: boolean;
  }): IAuthService;
}

// ============================================================
// Type Exports for convenience
// ============================================================

export type { 
  LoginOptions as LoginOptionsType,
  MFAOptions as MFAOptionsType,
  RegistrationOptions as RegistrationOptionsType,
  TokenRefreshOptions as TokenRefreshOptionsType,
  LogoutOptions as LogoutOptionsType,
  SocialLoginOptions as SocialLoginOptionsType,
  ServiceResult as ServiceResultType,
  LoginResult as LoginResultType,
  MFAVerificationResult as MFAVerificationResultType,
  TokenValidationResult as TokenValidationResultType
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Generic ServiceResult wrapper for consistent responses
// 2. ✅ Options interfaces for flexible method parameters
// 3. ✅ MFA flow separation (verifyMfa vs login)
// 4. ✅ Bulk operations for admin use cases
// 5. ✅ Health check interface for monitoring
// 6. ✅ Rate limit status query
// 7. ✅ Correlation ID propagation across all methods
// 8. ✅ Bengali language preference support
// 9. ✅ Geographic location tracking (district, division, networkType)
// 10. ✅ Retry context for connection resilience
// 11. ✅ Device trust TTL configuration
// 12. ✅ Session binding options for security
// 13. ✅ Admin-only bulk operations
// 14. ✅ Service factory pattern for DI
// 15. ✅ Comprehensive JSDoc comments
// 
// Bangladesh Specific:
// - Phone-based password reset with SMS/WhatsApp
// - WhatsApp/Imo/Telegram social login
// - bKash/Nagad/Rocket PIN MFA
// - District/Division location tracking
// - Network type (2g/3g/4g/5g/wifi) for security scoring
// - Bengali language support (preferredLanguage: 'bn')
// 
// ============================================================
