/**
 * Infrastructure Interfaces - Enterprise Grade (v2.0)
 * 
 * @module application/commands/mfa/infrastructure.interface
 * 
 * @description
 * Centralized infrastructure interfaces for MFA commands.
 * These interfaces are implemented by infrastructure layer.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Single source of truth for all infrastructure contracts
 * ✅ Type-safe dependency injection tokens
 * ✅ Comprehensive audit logging capabilities
 * ✅ Event bus with correlation tracking
 * ✅ Transaction management with rollback support
 * ✅ Multi-level caching strategies
 * ✅ Token generation with rotation support
 * ✅ Password hashing with bcrypt/argon2
 * ✅ MFA verification with multiple methods
 * ✅ Bangladesh-specific fields (district, network, operator)
 * ✅ Distributed tracing with correlation ID
 * ✅ Circuit breaker ready interfaces
 * ✅ Retry mechanism support
 * 
 * @example
 * // Dependency injection with NestJS
 * @Injectable()
 * export class MyHandler {
 *   constructor(
 *     @Inject(MFA_GENERATOR_SERVICE) private readonly mfaGenerator: MfaGenerator,
 *     @Inject(EVENT_BUS_SERVICE) private readonly eventBus: EventBus,
 *   ) {}
 * }
 */

// ============================================================
// Imports from shared packages
// ============================================================

import type { 
  DeviceInfo as SharedDeviceInfo, 
  MFAType, 
  TokenType,
  AuditSeverity,
  EventMetadata,
  EventPayload,
  DomainEvent
} from '@vubon/shared-types';

// ============================================================
// Device Info (Bangladesh Enhanced)
// ============================================================

/**
 * Device information for security audit and fraud detection
 * Bangladesh-specific fields included
 */
export interface DeviceInfo extends SharedDeviceInfo {
  /** IP address of the client */
  ipAddress?: string;
  
  /** User agent string for device fingerprinting */
  userAgent?: string;
  
  /** Device identifier for tracking */
  deviceId?: string;
  
  /** Device fingerprint hash for fraud detection */
  deviceFingerprint?: string;
  
  /** District for geographic tracking (Bangladesh) */
  district?: string;
  
  /** Division for geographic tracking (Bangladesh) */
  division?: string;
  
  /** Upazila/Sub-district for detailed location (Bangladesh) */
  upazila?: string;
  
  /** Network type (2G/3G/4G/5G/WiFi) - Bangladesh specific */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  
  /** Mobile operator (Bangladesh specific) */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  
  /** Whether data saver mode is enabled */
  dataSaverEnabled?: boolean;
  
  /** Screen resolution for fingerprinting */
  screenResolution?: string;
  
  /** Timezone offset in minutes */
  timezoneOffset?: number;
  
  /** Language preference */
  language?: string;
  
  /** Correlation ID for distributed tracing */
  correlationId?: string;
  
  /** Session ID for tracking */
  sessionId?: string;
  
  /** Request ID for API tracing */
  requestId?: string;
}

// ============================================================
// MFA Generator Interface
// ============================================================

/**
 * TOTP secret generation result
 */
export interface TOTPSecretResult {
  /** The secret key */
  secret: string;
  
  /** QR code URI for authenticator app */
  qrCodeUri: string;
  
  /** Provisioning URI for manual entry */
  provisioningUri: string;
}

/**
 * TOTP verification options
 */
export interface TOTPVerificationOptions {
  /** Time window (periods before/after) */
  window?: number;
  
  /** Algorithm (SHA-1, SHA-256, SHA-512) */
  algorithm?: 'SHA-1' | 'SHA-256' | 'SHA-512';
  
  /** Number of digits (6 or 8) */
  digits?: 6 | 8;
  
  /** Period in seconds */
  period?: number;
}

/**
 * OTP generation result
 */
export interface OtpGenerationResult {
  /** Session ID for verification */
  sessionId: string;
  
  /** Masked destination (phone/email) */
  maskedDestination: string;
  
  /** Expiry time in seconds */
  expirySeconds: number;
  
  /** Resend cooldown in seconds */
  resendCooldownSeconds: number;
}

/**
 * MFA Generator Interface
 * Responsible for generating MFA secrets, QR codes, and OTPs
 */
export interface MfaGenerator {
  /**
   * Generate TOTP secret for MFA setup
   * @param email - User email for QR code
   * @param deviceName - Optional device name
   * @returns TOTP secret with QR code URI
   */
  generateTOTPSecret(email: string, deviceName?: string): Promise<TOTPSecretResult>;
  
  /**
   * Verify TOTP code
   * @param secret - TOTP secret key
   * @param code - 6-8 digit code from authenticator app
   * @param options - Verification options
   * @returns True if code is valid
   */
  verifyTOTPCode(secret: string, code: string, options?: TOTPVerificationOptions): Promise<boolean>;
  
  /**
   * Generate QR code as data URL (PNG format)
   * @param secret - TOTP secret key
   * @param email - User email
   * @param issuer - Issuer name (default: Vubon)
   * @returns QR code as data URL (base64 PNG)
   */
  generateQrCode(secret: string, email: string, issuer?: string): Promise<string>;
  
  /**
   * Get provisioning URI for TOTP setup
   * @param secret - TOTP secret key
   * @param email - User email
   * @param issuer - Issuer name
   * @returns Provisioning URI (otpauth://totp/...)
   */
  getProvisioningUri(secret: string, email: string, issuer?: string): string;
  
  /**
   * Generate SMS OTP
   * @param phoneNumber - Phone number in E.164 format
   * @param language - Language for OTP message (en/bn)
   * @returns OTP generation result with session ID
   */
  generateSmsOtp(phoneNumber: string, language?: 'en' | 'bn'): Promise<OtpGenerationResult>;
  
  /**
   * Generate WhatsApp OTP (Bangladesh specific)
   * @param phoneNumber - Phone number in E.164 format
   * @param language - Language for OTP message (en/bn)
   * @returns OTP generation result with session ID
   */
  generateWhatsAppOtp(phoneNumber: string, language?: 'en' | 'bn'): Promise<OtpGenerationResult>;
  
  /**
   * Generate Imo OTP (Bangladesh specific)
   * @param phoneNumber - Phone number in E.164 format
   * @param language - Language for OTP message
   * @returns OTP generation result with session ID
   */
  generateImoOtp(phoneNumber: string, language?: 'en' | 'bn'): Promise<OtpGenerationResult>;
  
  /**
   * Generate Voice Call OTP (for feature phones)
   * @param phoneNumber - Phone number in E.164 format
   * @param language - Language for voice message (en/bn)
   * @returns OTP generation result with session ID
   */
  generateVoiceOtp(phoneNumber: string, language?: 'en' | 'bn'): Promise<OtpGenerationResult>;
  
  /**
   * Generate Email OTP
   * @param email - Email address
   * @param language - Language for email (en/bn)
   * @returns OTP generation result with session ID
   */
  generateEmailOtp(email: string, language?: 'en' | 'bn'): Promise<OtpGenerationResult>;
  
  /**
   * Generate backup codes (cryptographically secure)
   * @param count - Number of backup codes (default: 10)
   * @param length - Length of each code (default: 8)
   * @param withHyphen - Whether to add hyphen for readability
   * @returns Array of backup codes
   */
  generateBackupCodes(count?: number, length?: number, withHyphen?: boolean): Promise<string[]>;
  
  /**
   * Get WebAuthn registration options
   * @param userId - User ID
   * @param email - User email
   * @param displayName - User display name
   * @param options - Registration options
   * @returns WebAuthn registration options
   */
  getWebAuthnRegistrationOptions(
    userId: string,
    email: string,
    displayName: string,
    options?: { deviceName?: string; attestation?: string; authenticatorAttachment?: string }
  ): Promise<Record<string, unknown>>;
  
  /**
   * Verify WebAuthn registration response
   * @param credential - WebAuthn credential
   * @param challenge - Original challenge
   * @returns True if registration is valid
   */
  verifyWebAuthnRegistration(credential: unknown, challenge: string): Promise<boolean>;
  
  /**
   * Get WebAuthn authentication options
   * @param credentialIds - Array of credential IDs
   * @returns WebAuthn authentication options
   */
  getWebAuthnAuthenticationOptions(credentialIds: string[]): Promise<Record<string, unknown>>;
  
  /**
   * Verify WebAuthn authentication response
   * @param credential - WebAuthn credential
   * @param challenge - Original challenge
   * @returns True if authentication is valid
   */
  verifyWebAuthnAuthentication(credential: unknown, challenge: string): Promise<boolean>;
}

// ============================================================
// Event Bus Interface
// ============================================================

/**
 * Domain event interface
 */
export interface IDomainEvent extends DomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly aggregateId: string;
  readonly aggregateVersion: number;
  readonly occurredAt: Date;
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly metadata?: EventMetadata;
  readonly payload?: EventPayload;
}

/**
 * Event handler type
 */
export type EventHandler<T extends IDomainEvent = IDomainEvent> = (event: T) => Promise<void>;

/**
 * Event Bus Interface
 * Responsible for publishing and subscribing to domain events
 */
export interface EventBus {
  /**
   * Publish a single event
   * @param event - Domain event to publish
   */
  publish(event: IDomainEvent): Promise<void>;
  
  /**
   * Publish multiple events
   * @param events - Array of domain events
   */
  publishAll(events: IDomainEvent[]): Promise<void>;
  
  /**
   * Subscribe to events
   * @param eventName - Name of the event to subscribe to
   * @param handler - Event handler function
   * @returns Unsubscribe function
   */
  subscribe(eventName: string, handler: EventHandler): () => void;
  
  /**
   * Check if event has subscribers
   * @param eventName - Event name to check
   * @returns True if there are subscribers
   */
  hasSubscribers(eventName: string): Promise<boolean>;
}

// ============================================================
// Audit Service Interface
// ============================================================

/**
 * Audit log entry
 */
export interface AuditLogEntry {
  /** Audit action */
  action: string;
  
  /** User ID */
  userId?: string;
  
  /** User email (masked) */
  userEmail?: string;
  
  /** Additional details */
  details?: Record<string, unknown>;
  
  /** IP address */
  ipAddress?: string;
  
  /** Device ID */
  deviceId?: string;
  
  /** User agent */
  userAgent?: string;
  
  /** Device fingerprint */
  deviceFingerprint?: string;
  
  /** District (Bangladesh) */
  district?: string;
  
  /** Network type */
  networkType?: string;
  
  /** Mobile operator */
  mobileOperator?: string;
  
  /** Correlation ID */
  correlationId?: string;
  
  /** Timestamp */
  timestamp?: string;
  
  /** Duration in milliseconds */
  durationMs?: number;
  
  /** Severity level */
  severity?: AuditSeverity;
  
  /** Error message (if any) */
  error?: string;
}

/**
 * Audit Service Interface
 * Responsible for logging audit events
 */
export interface AuditService {
  /**
   * Log an audit entry
   * @param entry - Audit log entry
   */
  log(entry: AuditLogEntry): Promise<void>;
  
  /**
   * Log info level audit
   * @param action - Audit action
   * @param userId - User ID
   * @param details - Additional details
   * @param context - Context data
   */
  info(action: string, userId?: string, details?: Record<string, unknown>, context?: Record<string, unknown>): Promise<void>;
  
  /**
   * Log warning level audit
   * @param action - Audit action
   * @param userId - User ID
   * @param details - Additional details
   * @param context - Context data
   */
  warn(action: string, userId?: string, details?: Record<string, unknown>, context?: Record<string, unknown>): Promise<void>;
  
  /**
   * Log error level audit
   * @param action - Audit action
   * @param userId - User ID
   * @param details - Additional details
   * @param context - Context data
   */
  error(action: string, userId?: string, details?: Record<string, unknown>, context?: Record<string, unknown>): Promise<void>;
  
  /**
   * Log critical level audit
   * @param action - Audit action
   * @param userId - User ID
   * @param details - Additional details
   * @param context - Context data
   */
  critical(action: string, userId?: string, details?: Record<string, unknown>, context?: Record<string, unknown>): Promise<void>;
  
  /**
   * Log user action with full context
   * @param userId - User ID
   * @param action - Audit action
   * @param details - Additional details
   * @param deviceInfo - Device context
   */
  logUserAction(userId: string, action: string, details?: Record<string, unknown>, deviceInfo?: DeviceInfo): Promise<void>;
}

// ============================================================
// Transaction Manager Interface
// ============================================================

/**
 * Transaction Manager Interface
 * Responsible for managing database transactions
 */
export interface TransactionManager {
  /**
   * Execute callback within a transaction
   * @param callback - Function to execute within transaction
   * @returns Result of callback
   */
  runInTransaction<T>(callback: () => Promise<T>): Promise<T>;
  
  /**
   * Check if a transaction is currently active
   * @returns True if transaction is active
   */
  isActive(): Promise<boolean>;
  
  /**
   * Start a new transaction
   * @returns Transaction ID
   */
  startTransaction(): Promise<string>;
  
  /**
   * Commit the current transaction
   * @param transactionId - Transaction ID
   */
  commit(transactionId: string): Promise<void>;
  
  /**
   * Rollback the current transaction
   * @param transactionId - Transaction ID
   */
  rollback(transactionId: string): Promise<void>;
}

// ============================================================
// Cache Service Interface
// ============================================================

/**
 * Cache Service Interface
 * Responsible for caching operations
 */
export interface CacheService {
  /**
   * Get value by key
   * @param key - Cache key
   * @returns Value or null
   */
  get<T = unknown>(key: string): Promise<T | null>;
  
  /**
   * Set value with optional TTL
   * @param key - Cache key
   * @param value - Value to store
   * @param ttlSeconds - Time to live in seconds
   */
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  
  /**
   * Delete key
   * @param key - Cache key
   * @returns True if deleted
   */
  del(key: string): Promise<boolean>;
  
  /**
   * Increment value (for counters)
   * @param key - Cache key
   * @param increment - Amount to increment
   * @returns New value
   */
  incr(key: string, increment?: number): Promise<number>;
  
  /**
   * Set expiration on existing key
   * @param key - Cache key
   * @param ttlSeconds - Time to live in seconds
   * @returns True if expiration was set
   */
  expire(key: string, ttlSeconds: number): Promise<boolean>;
  
  /**
   * Get remaining time to live
   * @param key - Cache key
   * @returns TTL in seconds (-2 if key doesn't exist, -1 if no expiry)
   */
  ttl(key: string): Promise<number>;
  
  /**
   * Delete keys by pattern
   * @param pattern - Pattern to match keys
   * @returns Number of keys deleted
   */
  delPattern(pattern: string): Promise<number>;
  
  /**
   * Check if key exists
   * @param key - Cache key
   * @returns True if key exists
   */
  exists(key: string): Promise<boolean>;
  
  /**
   * Ping cache server
   * @returns Response time in milliseconds
   */
  ping(): Promise<number>;
}

// ============================================================
// Token Generator Interface
// ============================================================

/**
 * Token options for generation
 */
export interface TokenOptions {
  /** Session ID */
  sessionId?: string;
  
  /** Device ID */
  deviceId?: string;
  
  /** District for binding (Bangladesh) */
  district?: string;
  
  /** Device fingerprint for binding */
  deviceFingerprint?: string;
  
  /** Token version for rotation */
  version?: number;
  
  /** Family ID for token families */
  familyId?: string;
  
  /** Correlation ID for tracing */
  correlationId?: string;
}

/**
 * Token pair response
 */
export interface TokenPairResponse {
  /** Access token */
  accessToken: string;
  
  /** Refresh token */
  refreshToken: string;
  
  /** Access token expiry in seconds */
  expiresIn: number;
  
  /** Refresh token expiry in seconds */
  refreshExpiresIn: number;
  
  /** Token type (always Bearer) */
  tokenType: 'Bearer';
  
  /** Token family ID */
  familyId?: string;
  
  /** Token version */
  version?: number;
  
  /** Session ID */
  sessionId?: string;
}

/**
 * Token verification result
 */
export interface TokenVerificationResult {
  /** Whether token is valid */
  isValid: boolean;
  
  /** Decoded payload (if valid) */
  payload?: Record<string, unknown>;
  
  /** Error message (if invalid) */
  error?: string;
  
  /** Error code */
  errorCode?: string;
  
  /** Remaining time in seconds */
  remainingSeconds?: number;
}

/**
 * Token Generator Interface
 * Responsible for JWT token generation and verification
 */
export interface TokenGenerator {
  /**
   * Generate access token
   * @param userId - User ID
   * @param email - User email
   * @param role - User role
   * @param options - Token options
   * @returns JWT access token
   */
  generateAccessToken(userId: string, email: string, role?: string, options?: TokenOptions): Promise<string>;
  
  /**
   * Generate refresh token
   * @param userId - User ID
   * @param options - Token options
   * @returns JWT refresh token
   */
  generateRefreshToken(userId: string, options?: TokenOptions): Promise<string>;
  
  /**
   * Generate token pair (access + refresh)
   * @param userId - User ID
   * @param email - User email
   * @param role - User role
   * @param options - Token options
   * @returns Token pair response
   */
  generateTokenPair(userId: string, email: string, role?: string, options?: TokenOptions): Promise<TokenPairResponse>;
  
  /**
   * Verify token
   * @param token - JWT token string
   * @returns Verification result
   */
  verifyToken(token: string): Promise<TokenVerificationResult>;
  
  /**
   * Verify token with specific type
   * @param token - JWT token string
   * @param expectedType - Expected token type
   * @returns Verification result
   */
  verifyTokenByType(token: string, expectedType: TokenType): Promise<TokenVerificationResult>;
  
  /**
   * Decode token without verification (for debugging only)
   * @param token - JWT token string
   * @returns Decoded payload or null
   */
  decodeToken(token: string): Record<string, unknown> | null;
  
  /**
   * Rotate refresh token
   * @param oldRefreshToken - Old refresh token
   * @param options - Token options
   * @returns New token pair
   */
  rotateRefreshToken(oldRefreshToken: string, options?: TokenOptions): Promise<TokenPairResponse>;
  
  /**
   * Revoke token (add to blacklist)
   * @param token - JWT token string
   * @param reason - Revocation reason
   */
  revokeToken(token: string, reason?: string): Promise<void>;
  
  /**
   * Check if token is revoked
   * @param token - JWT token string
   * @returns True if token is revoked
   */
  isTokenRevoked(token: string): Promise<boolean>;
}

// ============================================================
// Password Hasher Interface
// ============================================================

/**
 * Password strength result
 */
export interface PasswordStrengthResult {
  /** Whether password is valid */
  isValid: boolean;
  
  /** Strength score (0-100) */
  score: number;
  
  /** Strength level */
  level: 'very_weak' | 'weak' | 'medium' | 'strong' | 'very_strong';
  
  /** Error messages */
  errors: string[];
  
  /** Bengali error messages */
  errorsBn?: string[];
  
  /** Suggestions for improvement */
  suggestions: string[];
  
  /** Character types present */
  characterTypes: {
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecial: boolean;
  };
  
  /** Whether password has been breached */
  isBreached?: boolean;
}

/**
 * Password Hasher Interface
 * Responsible for password hashing and verification
 */
export interface PasswordHasher {
  /**
   * Hash a password
   * @param password - Plain text password
   * @param saltRounds - Salt rounds for bcrypt (default: 12)
   * @returns Hashed password
   */
  hash(password: string, saltRounds?: number): Promise<string>;
  
  /**
   * Compare password with hash
   * @param plain - Plain text password
   * @param hashed - Hashed password
   * @returns True if passwords match
   */
  compare(plain: string, hashed: string): Promise<boolean>;
  
  /**
   * Validate password strength
   * @param password - Password to validate
   * @param userInfo - User information for personal data check
   * @returns Password strength result
   */
  validateStrength(password: string, userInfo?: { email?: string; name?: string; phone?: string }): Promise<PasswordStrengthResult>;
  
  /**
   * Check if password has been breached (HaveIBeenPwned)
   * @param password - Password to check
   * @returns True if password is compromised
   */
  checkBreach(password: string): Promise<{ isCompromised: boolean; breachCount: number }>;
  
  /**
   * Check if password can be used (not in history)
   * @param password - Password to check
   * @param historyHashes - Array of previous password hashes
   * @returns Check result
   */
  checkHistory(password: string, historyHashes: string[]): Promise<{ isNew: boolean; reuseCount: number }>;
  
  /**
   * Generate secure random password
   * @param length - Password length (default: 16)
   * @param options - Options for character sets
   * @returns Random secure password
   */
  generateRandomPassword(length?: number, options?: { includeUppercase?: boolean; includeLowercase?: boolean; includeNumbers?: boolean; includeSpecial?: boolean }): Promise<string>;
}

// ============================================================
// MFA Verification Service Interface
// ============================================================

/**
 * MFA Verification Service Interface
 * Responsible for verifying various MFA codes
 */
export interface MfaVerificationService {
  /**
   * Verify OTP code (SMS/Email/WhatsApp/Imo/Voice)
   * @param userId - User ID
   * @param code - OTP code
   * @param destination - Destination (phone number or email)
   * @param type - MFA type
   * @returns True if code is valid
   */
  verifyOtpCode(userId: string, code: string, destination: string, type: string): Promise<boolean>;
  
  /**
   * Verify MFS PIN (bKash/Nagad/Rocket)
   * @param userId - User ID
   * @param accountNumber - MFS account number
   * @param pin - 4-digit PIN
   * @param provider - MFS provider
   * @returns True if PIN is valid
   */
  verifyMFSPin(userId: string, accountNumber: string, pin: string, provider: string): Promise<boolean>;
  
  /**
   * Verify phone-based OTP (WhatsApp/Imo/Voice)
   * @param userId - User ID
   * @param code - OTP code
   * @param phoneNumber - Phone number
   * @param method - Verification method
   * @returns True if code is valid
   */
  verifyPhoneOtp(userId: string, code: string, phoneNumber?: string, method?: string): Promise<boolean>;
  
  /**
   * Verify backup code
   * @param userId - User ID
   * @param backupCode - Backup code
   * @returns Verification result with remaining codes
   */
  verifyBackupCode(userId: string, backupCode: string): Promise<{ isValid: boolean; remainingCodes: number }>;
}

// ============================================================
// Notification Service Interface
// ============================================================

/**
 * Notification Service Interface
 * Responsible for sending notifications
 */
export interface NotificationService {
  /**
   * Send MFA disabled notification
   * @param userId - User ID
   * @param email - User email
   * @param mfaType - MFA type that was disabled
   * @param isAdminOverride - Whether disabled by admin
   * @param adminId - Admin ID (if admin override)
   */
  sendMFADisabledNotification(userId: string, email: string, mfaType: string, isAdminOverride: boolean, adminId?: string): Promise<void>;
  
  /**
   * Send WhatsApp notification (Bangladesh specific)
   * @param phoneNumber - Phone number
   * @param message - Message content
   */
  sendWhatsAppNotification(phoneNumber: string, message: string): Promise<void>;
  
  /**
   * Send email notification
   * @param to - Recipient email
   * @param subject - Email subject
   * @param body - Email body
   */
  sendEmail(to: string, subject: string, body: string): Promise<void>;
  
  /**
   * Send SMS notification
   * @param phoneNumber - Phone number
   * @param message - SMS message
   */
  sendSms(phoneNumber: string, message: string): Promise<void>;
}

// ============================================================
// Id Generator Interface
// ============================================================

/**
 * ID Generator Interface
 * Responsible for generating unique identifiers
 */
export interface IdGenerator {
  /**
   * Generate a unique ID
   * @returns UUID v4 string
   */
  generate(): string;
  
  /**
   * Generate a ULID (sortable unique identifier)
   * @returns ULID string
   */
  generateUlid(): string;
  
  /**
   * Generate a Snowflake ID
   * @returns Snowflake ID as string
   */
  generateSnowflake(): string;
  
  /**
   * Generate ID of specific type
   * @param type - ID type
   * @returns Generated ID
   */
  generateOfType(type: 'uuid' | 'ulid' | 'snowflake'): string;
}

// ============================================================
// Dependency Injection Tokens
// ============================================================

export const MFA_GENERATOR_SERVICE = 'MFA_GENERATOR_SERVICE';
export const EVENT_BUS_SERVICE = 'EVENT_BUS_SERVICE';
export const AUDIT_SERVICE = 'AUDIT_SERVICE';
export const TRANSACTION_MANAGER = 'TRANSACTION_MANAGER';
export const CACHE_SERVICE = 'CACHE_SERVICE';
export const TOKEN_GENERATOR = 'TOKEN_GENERATOR';
export const PASSWORD_HASHER = 'PASSWORD_HASHER';
export const MFA_VERIFICATION_SERVICE = 'MFA_VERIFICATION_SERVICE';
export const NOTIFICATION_SERVICE = 'NOTIFICATION_SERVICE';
export const ID_GENERATOR = 'ID_GENERATOR';

// ============================================================
// Type Exports
// ============================================================

export type {
  TOTPSecretResult as TOTPSecretResultType,
  TOTPVerificationOptions as TOTPVerificationOptionsType,
  OtpGenerationResult as OtpGenerationResultType,
  AuditLogEntry as AuditLogEntryType,
  TokenOptions as TokenOptionsType,
  TokenPairResponse as TokenPairResponseType,
  TokenVerificationResult as TokenVerificationResultType,
  PasswordStrengthResult as PasswordStrengthResultType
};
