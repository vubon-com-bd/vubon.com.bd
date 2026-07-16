/**
 * Token Generator Port - Domain Layer Interface (Enterprise Grade - Fixed)
 *
 * @module domain/ports/token-generator.port
 *
 * @description
 * Port (interface) for token generation and management.
 * Defines the contract that infrastructure adapters (JWT, OTP, etc.) must implement.
 * This keeps the domain layer clean and infrastructure-agnostic.
 *
 * Enterprise Rules:
 * ✅ Domain layer defines the interface (Port)
 * ✅ Infrastructure layer implements the interface (Adapter)
 * ✅ No external dependencies in domain layer
 * ✅ Follows Dependency Inversion Principle (DIP)
 * ✅ Easy to mock for unit testing
 * ✅ Supports multiple token types (Access, Refresh, OTP, MFA, etc.)
 * ✅ exactOptionalPropertyTypes compliant
 */

// ============================================================
// Types (Domain-Specific)
// ============================================================

/**
 * Token types supported by the system
 */
export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
  OTP = 'otp',
  MFA = 'mfa',
  MAGIC_LINK = 'magic_link',
  EMAIL_VERIFICATION = 'email_verification',
  PHONE_VERIFICATION = 'phone_verification',
  PASSWORD_RESET = 'password_reset',
  SESSION_TRANSFER = 'session_transfer',
  DEVICE_TRUST = 'device_trust',
  API_KEY = 'api_key',
  BACKUP_CODE = 'backup_code',
}

/**
 * Token algorithms supported
 */
export enum TokenAlgorithm {
  HS256 = 'HS256',
  HS384 = 'HS384',
  HS512 = 'HS512',
  RS256 = 'RS256',
  RS384 = 'RS384',
  RS512 = 'RS512',
  ES256 = 'ES256',
  ES384 = 'ES384',
  ES512 = 'ES512',
}

/**
 * OTP channels supported (Bangladesh specific)
 */
export enum OTPChannel {
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  IMO = 'imo',
  VOICE = 'voice',
  EMAIL = 'email',
  TOTP = 'totp',
  BACKUP_CODE = 'backup_code',
}

/**
 * OTP purposes
 */
export enum OTPPurpose {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  PASSWORD_RESET = 'password_reset',
  MFA_VERIFICATION = 'mfa_verification',
  PHONE_VERIFICATION = 'phone_verification',
  EMAIL_VERIFICATION = 'email_verification',
  PAYMENT_CONFIRMATION = 'payment_confirmation',
  TRANSACTION_VERIFICATION = 'transaction_verification',
  DEVICE_PAIRING = 'device_pairing',
  SOCIAL_LINKING = 'social_linking',
}

// ============================================================
// Payload Types
// ============================================================

/**
 * Base token payload with common fields
 */
export interface BaseTokenPayload {
  /** Unique token ID */
  tokenId?: string | undefined;
  /** User ID (if authenticated) */
  userId?: string | undefined;
  /** Session ID (if session exists) */
  sessionId?: string | undefined;
  /** Token type */
  type: TokenType;
  /** Issued at timestamp */
  iat?: number | undefined;
  /** Expiration timestamp */
  exp?: number | undefined;
  /** Issuer */
  iss?: string | undefined;
  /** Audience */
  aud?: string | undefined;
  /** JWT ID (unique identifier) */
  jti?: string | undefined;
  /** Token version for rotation */
  version?: number | undefined;
  /** Correlation ID for distributed tracing */
  correlationId?: string | undefined;
}

/**
 * Access token payload
 */
export interface AccessTokenPayload extends BaseTokenPayload {
  type: TokenType.ACCESS;
  /** User ID (required) */
  userId: string;
  /** User role */
  role: string;
  /** User tier (BRONZE, SILVER, GOLD, etc.) */
  tier: string;
  /** Session ID */
  sessionId: string;
  /** Device ID (for device-specific tokens) */
  deviceId?: string | undefined;
  /** Permissions (optional, for fine-grained access control) */
  permissions?: string[] | undefined;
  /** User status (ACTIVE, SUSPENDED, etc.) */
  status?: string | undefined;
  /** MFA status (enabled/disabled) */
  mfaEnabled?: boolean | undefined;
  /** IP address (for IP binding) */
  ipAddress?: string | undefined;
  /** User agent (for device fingerprinting) */
  userAgent?: string | undefined;
  /** District (Bangladesh specific) */
  district?: string | undefined;
  /** Upazila (Bangladesh specific) */
  upazila?: string | undefined;
  /** Mobile operator (Bangladesh specific) */
  operator?: string | undefined;
  /** Network type (Bangladesh specific) */
  networkType?: string | undefined;
}

/**
 * Refresh token payload
 */
export interface RefreshTokenPayload extends BaseTokenPayload {
  type: TokenType.REFRESH;
  /** User ID (required) */
  userId: string;
  /** Session ID */
  sessionId: string;
  /** Token family ID (for rotation) */
  familyId?: string | undefined;
  /** Rotation count */
  rotationCount?: number | undefined;
  /** Previous token ID (for rotation tracking) */
  previousTokenId?: string | undefined;
}

/**
 * OTP token payload
 */
export interface OTPPayload extends BaseTokenPayload {
  type: TokenType.OTP;
  /** OTP code (plain text) */
  code: string;
  /** OTP purpose */
  purpose: OTPPurpose;
  /** OTP channel (SMS, WhatsApp, etc.) */
  channel: OTPChannel;
  /** User ID (if known) */
  userId?: string | undefined;
  /** Phone number (for SMS/WhatsApp) */
  phoneNumber?: string | undefined;
  /** Email address (for email OTP) */
  email?: string | undefined;
  /** Attempt count */
  attempts?: number | undefined;
  /** Max attempts allowed */
  maxAttempts?: number | undefined;
  /** Is OTP used */
  isUsed?: boolean | undefined;
  /** Used at timestamp */
  usedAt?: Date | undefined;
}

/**
 * MFA token payload (for MFA verification)
 */
export interface MFATokenPayload extends BaseTokenPayload {
  type: TokenType.MFA;
  /** User ID */
  userId: string;
  /** MFA method (TOTP, SMS, WHATSAPP, etc.) */
  method: string;
  /** MFA session ID */
  mfaSessionId: string;
  /** MFA challenge */
  challenge?: string | undefined;
  /** Is MFA verified */
  isVerified?: boolean | undefined;
  /** Verified at timestamp */
  verifiedAt?: Date | undefined;
}

/**
 * Magic link token payload
 */
export interface MagicLinkTokenPayload extends BaseTokenPayload {
  type: TokenType.MAGIC_LINK;
  /** User ID or email */
  userId?: string | undefined;
  /** Email address */
  email: string;
  /** Purpose (login, registration, etc.) */
  purpose: 'login' | 'registration' | 'password_reset';
  /** Redirect URL after verification */
  redirectUrl?: string | undefined;
  /** Is link used */
  isUsed?: boolean | undefined;
  /** Used at timestamp */
  usedAt?: Date | undefined;
}

/**
 * Email verification token payload
 */
export interface EmailVerificationTokenPayload extends BaseTokenPayload {
  type: TokenType.EMAIL_VERIFICATION;
  /** User ID */
  userId: string;
  /** Email address to verify */
  email: string;
  /** Is email verified */
  isVerified?: boolean | undefined;
  /** Verified at timestamp */
  verifiedAt?: Date | undefined;
  /** Resend count */
  resendCount?: number | undefined;
}

/**
 * Phone verification token payload
 */
export interface PhoneVerificationTokenPayload extends BaseTokenPayload {
  type: TokenType.PHONE_VERIFICATION;
  /** User ID */
  userId: string;
  /** Phone number to verify */
  phoneNumber: string;
  /** Is phone verified */
  isVerified?: boolean | undefined;
  /** Verified at timestamp */
  verifiedAt?: Date | undefined;
  /** Resend count */
  resendCount?: number | undefined;
}

/**
 * Password reset token payload
 */
export interface PasswordResetTokenPayload extends BaseTokenPayload {
  type: TokenType.PASSWORD_RESET;
  /** User ID */
  userId: string;
  /** Email or phone for reset */
  identifier: string;
  /** Is token used */
  isUsed?: boolean | undefined;
  /** Used at timestamp */
  usedAt?: Date | undefined;
  /** IP address of requester */
  ipAddress?: string | undefined;
  /** User agent of requester */
  userAgent?: string | undefined;
}

/**
 * Session transfer token payload
 */
export interface SessionTransferTokenPayload extends BaseTokenPayload {
  type: TokenType.SESSION_TRANSFER;
  /** Source session ID */
  sourceSessionId: string;
  /** Target device ID */
  targetDeviceId: string;
  /** User ID */
  userId: string;
  /** Is transfer completed */
  isCompleted?: boolean | undefined;
  /** Completed at timestamp */
  completedAt?: Date | undefined;
}

/**
 * Device trust token payload
 */
export interface DeviceTrustTokenPayload extends BaseTokenPayload {
  type: TokenType.DEVICE_TRUST;
  /** User ID */
  userId: string;
  /** Device ID */
  deviceId: string;
  /** Device name */
  deviceName?: string | undefined;
  /** Trust level (TRUSTED, UNTRUSTED, etc.) */
  trustLevel: string;
  /** Is device trusted */
  isTrusted: boolean;
  /** Trusted at timestamp */
  trustedAt?: Date | undefined;
}

/**
 * API key token payload
 */
export interface APIKeyTokenPayload extends BaseTokenPayload {
  type: TokenType.API_KEY;
  /** API key ID */
  keyId: string;
  /** User ID */
  userId: string;
  /** Key name */
  name: string;
  /** Permissions */
  permissions: string[];
  /** Last used at */
  lastUsedAt?: Date | undefined;
  /** Is key active */
  isActive: boolean;
  /** Revoked at */
  revokedAt?: Date | undefined;
}

/**
 * Backup code payload
 */
export interface BackupCodePayload extends BaseTokenPayload {
  type: TokenType.BACKUP_CODE;
  /** User ID */
  userId: string;
  /** Backup code (hashed) */
  codeHash: string;
  /** Is code used */
  isUsed: boolean;
  /** Used at timestamp */
  usedAt?: Date | undefined;
}

// ============================================================
// Options Types
// ============================================================

/**
 * Token generation options
 */
export interface TokenGenerationOptions {
  /** Token expiry in seconds (override default) */
  expiresInSeconds?: number | undefined;
  /** Token issuer (override default) */
  issuer?: string | undefined;
  /** Token audience (override default) */
  audience?: string | undefined;
  /** Additional claims */
  additionalClaims?: Record<string, unknown> | undefined;
  /** Correlation ID for tracing */
  correlationId?: string | undefined;
  /** Token version */
  version?: number | undefined;
  /** IP address for binding */
  ipAddress?: string | undefined;
  /** User agent for binding */
  userAgent?: string | undefined;
}

/**
 * OTP generation options
 * ✅ FIXED: Added phoneNumber and email as optional properties
 */
export interface OTPGenerationOptions extends TokenGenerationOptions {
  /** OTP length (default: 6) */
  length?: number | undefined;
  /** OTP expiry in seconds (default: 300) */
  expiresInSeconds?: number | undefined;
  /** OTP channel */
  channel: OTPChannel;
  /** OTP purpose */
  purpose: OTPPurpose;
  /** Max attempts allowed (default: 3) */
  maxAttempts?: number | undefined;
  /** Cooldown between attempts in seconds (default: 30) */
  cooldownSeconds?: number | undefined;
  /** Resend cooldown in seconds (default: 60) */
  resendCooldownSeconds?: number | undefined;
  /** Use alphanumeric OTP (default: false) */
  alphanumeric?: boolean | undefined;
  /** Phone number (for SMS/WhatsApp/Imo/Voice) */
  phoneNumber?: string | undefined;
  /** Email address (for email OTP) */
  email?: string | undefined;
}

/**
 * Token validation options
 */
export interface TokenValidationOptions {
  /** Ignore expiration check (default: false) */
  ignoreExpiration?: boolean | undefined;
  /** Check issuer (default: true) */
  checkIssuer?: boolean | undefined;
  /** Check audience (default: true) */
  checkAudience?: boolean | undefined;
  /** Clock tolerance in seconds (default: 30) */
  clockToleranceSeconds?: number | undefined;
  /** Expected issuer */
  expectedIssuer?: string | undefined;
  /** Expected audience */
  expectedAudience?: string | undefined;
}

/**
 * Token refresh options
 */
export interface TokenRefreshOptions {
  /** Rotate refresh token (default: true) */
  rotateToken?: boolean | undefined;
  /** Revoke old token family on compromise (default: false) */
  revokeFamilyOnCompromise?: boolean | undefined;
  /** Extend session expiry (default: false) */
  extendSession?: boolean | undefined;
  /** Session extension duration in seconds */
  extensionSeconds?: number | undefined;
  /** Refresh token expiry in seconds (default: 7 days) */
  refreshTokenExpirySeconds?: number | undefined;
}

// ============================================================
// Result Types
// ============================================================

/**
 * Token validation result
 */
export interface TokenValidationResult<T extends BaseTokenPayload = BaseTokenPayload> {
  /** Whether token is valid */
  isValid: boolean;
  /** Decoded payload (if valid) */
  payload?: T | undefined;
  /** Token type */
  tokenType?: TokenType | undefined;
  /** User ID (if available) */
  userId?: string | undefined;
  /** Session ID (if available) */
  sessionId?: string | undefined;
  /** Error message (if invalid) */
  error?: string | undefined;
  /** Error code (if invalid) */
  errorCode?: string | undefined;
  /** Expiration timestamp */
  expiresAt?: Date | undefined;
  /** Remaining time in seconds */
  remainingSeconds?: number | undefined;
  /** Token version */
  version?: number | undefined;
}

/**
 * Token generation result
 */
export interface TokenGenerationResult<T = string> {
  /** Generated token */
  token: T;
  /** Token type */
  type: TokenType;
  /** Expiration timestamp */
  expiresAt: Date;
  /** Token ID (unique identifier) */
  tokenId: string;
  /** Token version */
  version: number;
  /** Additional metadata */
  metadata?: Record<string, unknown> | undefined;
}

/**
 * OTP generation result
 */
export interface OTPGenerationResult extends TokenGenerationResult<string> {
  /** OTP code (plain text) */
  code: string;
  /** OTP channel */
  channel: OTPChannel;
  /** OTP purpose */
  purpose: OTPPurpose;
  /** Expiry in seconds */
  expirySeconds: number;
  /** Masked phone/email (for logging) */
  maskedIdentifier?: string | undefined;
}

/**
 * Token refresh result
 */
export interface TokenRefreshResult {
  /** New access token */
  accessToken: string;
  /** New refresh token (if rotated) */
  refreshToken?: string | undefined;
  /** Old refresh token ID (if revoked) */
  revokedTokenId?: string | undefined;
  /** New refresh token ID */
  newTokenId?: string | undefined;
  /** Token family ID */
  familyId?: string | undefined;
  /** Rotation count */
  rotationCount: number;
}

// ============================================================
// Main Port Interface
// ============================================================

/**
 * Token Generator Port Interface
 */
export interface ITokenGenerator {
  // ============================================================
  // Access Token Operations
  // ============================================================

  generateAccessToken(
    payload: Omit<AccessTokenPayload, 'type' | 'iat' | 'exp'>,
    options?: TokenGenerationOptions,
  ): Promise<string>;

  // ============================================================
  // Refresh Token Operations
  // ============================================================

  generateRefreshToken(
    payload: Omit<RefreshTokenPayload, 'type' | 'iat' | 'exp'>,
    options?: TokenGenerationOptions,
  ): Promise<string>;

  rotateRefreshToken(
    oldToken: string,
    payload: Omit<RefreshTokenPayload, 'type' | 'iat' | 'exp'>,
    options?: TokenRefreshOptions,
  ): Promise<TokenRefreshResult>;

  // ============================================================
  // OTP Operations (Bangladesh Specific)
  // ============================================================

  generateOTP(options: OTPGenerationOptions): Promise<OTPGenerationResult>;

  verifyOTP(
    code: string,
    identifier: string,
    purpose: OTPPurpose,
    options?: TokenValidationOptions,
  ): Promise<boolean>;

  resendOTP(
    identifier: string,
    purpose: OTPPurpose,
    options?: { cooldownSeconds?: number | undefined },
  ): Promise<{
    canResend: boolean;
    cooldownSeconds: number;
    newOTP?: OTPGenerationResult | undefined;
  }>;

  // ============================================================
  // Backup Code Operations
  // ============================================================

  generateBackupCodes(
    userId: string,
    count?: number,
    options?: TokenGenerationOptions,
  ): Promise<string[]>;

  verifyBackupCode(userId: string, code: string): Promise<boolean>;

  // ============================================================
  // Magic Link Operations
  // ============================================================

  generateMagicLink(
    email: string,
    purpose: 'login' | 'registration' | 'password_reset',
    options?: { redirectUrl?: string | undefined; expiresInSeconds?: number | undefined },
  ): Promise<string>;

  verifyMagicLink(
    token: string,
    options?: TokenValidationOptions,
  ): Promise<{
    isValid: boolean;
    email?: string | undefined;
    purpose?: string | undefined;
    redirectUrl?: string | undefined;
    error?: string | undefined;
  }>;

  // ============================================================
  // Token Validation Operations
  // ============================================================

  validateToken<T extends BaseTokenPayload = BaseTokenPayload>(
    token: string,
    options?: TokenValidationOptions,
  ): Promise<TokenValidationResult<T>>;

  validateAccessToken(
    token: string,
    options?: TokenValidationOptions,
  ): Promise<TokenValidationResult<AccessTokenPayload>>;

  validateRefreshToken(
    token: string,
    options?: TokenValidationOptions,
  ): Promise<TokenValidationResult<RefreshTokenPayload>>;

  introspectToken(
    token: string,
    options?: TokenValidationOptions,
  ): Promise<{
    active: boolean;
    scope?: string | undefined;
    clientId?: string | undefined;
    username?: string | undefined;
    tokenType?: string | undefined;
    exp?: number | undefined;
    iat?: number | undefined;
    sub?: string | undefined;
    aud?: string | undefined;
    iss?: string | undefined;
    jti?: string | undefined;
    [key: string]: unknown;
  }>;

  // ============================================================
  // Token Management Operations
  // ============================================================

  revokeToken(token: string, reason?: string): Promise<boolean>;

  revokeAllUserTokens(userId: string, reason?: string): Promise<number>;

  revokeAllSessionTokens(sessionId: string, reason?: string): Promise<number>;

  isTokenRevoked(token: string): Promise<boolean>;

  getTokenRemainingTime(token: string): Promise<number>;

  getTokenType(token: string): Promise<TokenType | null>;

  // ============================================================
  // Bangladesh Specific Operations
  // ============================================================

  generateBangladeshAccessToken(
    payload: Omit<AccessTokenPayload, 'type' | 'iat' | 'exp'> & {
      district?: string | undefined;
      upazila?: string | undefined;
      operator?: string | undefined;
      networkType?: string | undefined;
    },
    options?: TokenGenerationOptions,
  ): Promise<string>;

  generateMFSOTP(
    userId: string,
    channel: 'BKASH' | 'NAGAD' | 'ROCKET',
    options?: { purpose?: OTPPurpose | undefined; expiresInSeconds?: number | undefined },
  ): Promise<{
    pin: string;
    expiresAt: Date;
    transactionId: string;
  }>;

  verifyMFSOTP(
    userId: string,
    channel: 'BKASH' | 'NAGAD' | 'ROCKET',
    pin: string,
    transactionId: string,
  ): Promise<boolean>;

  // ============================================================
  // Utility Operations
  // ============================================================

  generateTokenId(prefix?: string): Promise<string>;

  getAlgorithm(): TokenAlgorithm;

  getSupportedTokenTypes(): TokenType[];

  getTokenConfig(tokenType: TokenType): Promise<{
    expiresInSeconds: number;
    algorithm: TokenAlgorithm;
    issuer?: string | undefined;
    audience?: string | undefined;
  }>;
}

// ============================================================
// Mock Token Generator (for testing)
// ============================================================

export class MockTokenGenerator implements ITokenGenerator {
  private tokens: Map<string, { payload: any; expiresAt: Date; revoked: boolean }> = new Map();
  private otps: Map<string, { code: string; expiresAt: Date; used: boolean; attempts: number }> =
    new Map();
  private backupCodes: Map<string, { codes: string[]; used: Set<string> }> = new Map();

  constructor(
    private readonly defaultExpirySeconds: number = 3600,
    private readonly algorithm: TokenAlgorithm = TokenAlgorithm.HS256,
  ) {}

  async generateAccessToken(
    payload: Omit<AccessTokenPayload, 'type' | 'iat' | 'exp'>,
    _options?: TokenGenerationOptions,
  ): Promise<string> {
    const token = `access_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiresAt = new Date(Date.now() + this.defaultExpirySeconds * 1000);
    this.tokens.set(token, {
      payload: { ...payload, type: TokenType.ACCESS },
      expiresAt,
      revoked: false,
    });
    return token;
  }

  async generateRefreshToken(
    payload: Omit<RefreshTokenPayload, 'type' | 'iat' | 'exp'>,
    _options?: TokenGenerationOptions,
  ): Promise<string> {
    const token = `refresh_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    this.tokens.set(token, {
      payload: { ...payload, type: TokenType.REFRESH },
      expiresAt,
      revoked: false,
    });
    return token;
  }

  async rotateRefreshToken(
    oldToken: string,
    payload: Omit<RefreshTokenPayload, 'type' | 'iat' | 'exp'>,
    _options?: TokenRefreshOptions,
  ): Promise<TokenRefreshResult> {
    await this.revokeToken(oldToken);
    const newToken = await this.generateRefreshToken(payload);
    return {
      accessToken: 'new_access_token',
      refreshToken: newToken,
      revokedTokenId: oldToken,
      newTokenId: 'new_token_id',
      familyId: 'family_123',
      rotationCount: 1,
    };
  }

  async generateOTP(options: OTPGenerationOptions): Promise<OTPGenerationResult> {
    const code = options.alphanumeric
      ? Math.random()
          .toString(36)
          .substring(2, 2 + (options.length || 6))
          .toUpperCase()
      : Math.random()
          .toString(10)
          .substring(2, 2 + (options.length || 6));

    const identifier = options.phoneNumber || options.email || 'unknown';
    const tokenId = await this.generateTokenId('otp');
    const expiresAt = new Date(Date.now() + (options.expiresInSeconds || 300) * 1000);

    this.otps.set(`${identifier}:${options.purpose}`, {
      code,
      expiresAt,
      used: false,
      attempts: 0,
    });

    return {
      token: code,
      type: TokenType.OTP,
      expiresAt,
      tokenId,
      version: 1,
      code,
      channel: options.channel,
      purpose: options.purpose,
      expirySeconds: options.expiresInSeconds || 300,
      maskedIdentifier: this.maskIdentifier(identifier),
    };
  }

  async verifyOTP(
    code: string,
    identifier: string,
    purpose: OTPPurpose,
    _options?: TokenValidationOptions,
  ): Promise<boolean> {
    const key = `${identifier}:${purpose}`;
    const otp = this.otps.get(key);

    if (!otp) return false;
    if (otp.used) return false;
    if (otp.expiresAt < new Date()) return false;
    if (otp.attempts >= 3) return false;

    if (otp.code === code) {
      otp.used = true;
      this.otps.set(key, otp);
      return true;
    }

    otp.attempts++;
    this.otps.set(key, otp);
    return false;
  }

  async resendOTP(
    identifier: string,
    purpose: OTPPurpose,
    options?: { cooldownSeconds?: number | undefined },
  ): Promise<{
    canResend: boolean;
    cooldownSeconds: number;
    newOTP?: OTPGenerationResult | undefined;
  }> {
    const key = `${identifier}:${purpose}`;
    const existing = this.otps.get(key);
    const cooldownSeconds = options?.cooldownSeconds || 60;

    if (existing && !existing.used) {
      return { canResend: false, cooldownSeconds };
    }

    const newOTP = await this.generateOTP({
      channel: OTPChannel.SMS,
      purpose,
      phoneNumber: identifier,
      length: 6,
      expiresInSeconds: 300,
    });

    return { canResend: true, cooldownSeconds, newOTP };
  }

  async generateBackupCodes(
    userId: string,
    count: number = 10,
    _options?: TokenGenerationOptions,
  ): Promise<string[]> {
    const codes: string[] = [];
    const used = new Set<string>();

    for (let i = 0; i < count; i++) {
      const code = `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      codes.push(code);
    }

    this.backupCodes.set(userId, { codes, used });
    return codes;
  }

  async verifyBackupCode(userId: string, code: string): Promise<boolean> {
    const backup = this.backupCodes.get(userId);
    if (!backup) return false;
    if (backup.used.has(code)) return false;
    if (!backup.codes.includes(code)) return false;

    backup.used.add(code);
    this.backupCodes.set(userId, backup);
    return true;
  }

  // ============================================================
  // Magic Link Operations - FIXED
  // ============================================================

  async generateMagicLink(
    email: string,
    purpose: 'login' | 'registration' | 'password_reset',
    options?: { redirectUrl?: string | undefined; expiresInSeconds?: number | undefined },
  ): Promise<string> {
    const data = {
      email,
      purpose,
      redirectUrl: options?.redirectUrl,
    };
    // ✅ FIXED: Ensure the input is always a string
    const jsonString = JSON.stringify(data);
    return `https://example.com/auth/magic/${Buffer.from(jsonString).toString('base64')}`;
  }

  async verifyMagicLink(
    token: string,
    _options?: TokenValidationOptions,
  ): Promise<{
    isValid: boolean;
    email?: string | undefined;
    purpose?: string | undefined;
    redirectUrl?: string | undefined;
    error?: string | undefined;
  }> {
    try {
      const parts = token.split('/');
      const encoded = parts[parts.length - 1];
      if (!encoded) {
        return { isValid: false, error: 'Invalid token format' };
      }
      // ✅ FIXED: Ensure encoded is a string before decoding
      const decoded = JSON.parse(Buffer.from(encoded, 'base64').toString('utf-8'));
      return {
        isValid: true,
        email: decoded.email,
        purpose: decoded.purpose,
        redirectUrl: decoded.redirectUrl,
      };
    } catch (error) {
      return { isValid: false, error: 'Invalid token' };
    }
  }

  async validateToken<T extends BaseTokenPayload = BaseTokenPayload>(
    token: string,
    _options?: TokenValidationOptions,
  ): Promise<TokenValidationResult<T>> {
    const stored = this.tokens.get(token);
    if (!stored) {
      return { isValid: false, error: 'Token not found' };
    }

    if (stored.revoked) {
      return { isValid: false, error: 'Token revoked' };
    }

    if (stored.expiresAt < new Date()) {
      return { isValid: false, error: 'Token expired' };
    }

    return {
      isValid: true,
      payload: stored.payload as T,
      userId: stored.payload.userId,
      sessionId: stored.payload.sessionId,
      expiresAt: stored.expiresAt,
      remainingSeconds: Math.max(0, (stored.expiresAt.getTime() - Date.now()) / 1000),
    };
  }

  async validateAccessToken(
    token: string,
    options?: TokenValidationOptions,
  ): Promise<TokenValidationResult<AccessTokenPayload>> {
    return this.validateToken<AccessTokenPayload>(token, options);
  }

  async validateRefreshToken(
    token: string,
    options?: TokenValidationOptions,
  ): Promise<TokenValidationResult<RefreshTokenPayload>> {
    return this.validateToken<RefreshTokenPayload>(token, options);
  }

  async introspectToken(
    token: string,
    options?: TokenValidationOptions,
  ): Promise<{
    active: boolean;
    scope?: string | undefined;
    clientId?: string | undefined;
    username?: string | undefined;
    tokenType?: string | undefined;
    exp?: number | undefined;
    iat?: number | undefined;
    sub?: string | undefined;
    aud?: string | undefined;
    iss?: string | undefined;
    jti?: string | undefined;
    [key: string]: unknown;
  }> {
    const result = await this.validateToken(token, options);
    return {
      active: result.isValid,
      sub: result.userId,
      exp: result.expiresAt ? Math.floor(result.expiresAt.getTime() / 1000) : undefined,
      iat: Math.floor(Date.now() / 1000),
      tokenType: result.payload?.type,
    };
  }

  async revokeToken(token: string, _reason?: string): Promise<boolean> {
    const stored = this.tokens.get(token);
    if (!stored) return false;
    stored.revoked = true;
    this.tokens.set(token, stored);
    return true;
  }

  async revokeAllUserTokens(userId: string, _reason?: string): Promise<number> {
    let count = 0;
    for (const [token, stored] of this.tokens) {
      if (stored.payload.userId === userId) {
        stored.revoked = true;
        this.tokens.set(token, stored);
        count++;
      }
    }
    return count;
  }

  async revokeAllSessionTokens(sessionId: string, _reason?: string): Promise<number> {
    let count = 0;
    for (const [token, stored] of this.tokens) {
      if (stored.payload.sessionId === sessionId) {
        stored.revoked = true;
        this.tokens.set(token, stored);
        count++;
      }
    }
    return count;
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    const stored = this.tokens.get(token);
    return stored ? stored.revoked : true;
  }

  async getTokenRemainingTime(token: string): Promise<number> {
    const stored = this.tokens.get(token);
    if (!stored) return 0;
    if (stored.revoked) return 0;
    return Math.max(0, (stored.expiresAt.getTime() - Date.now()) / 1000);
  }

  async getTokenType(token: string): Promise<TokenType | null> {
    const stored = this.tokens.get(token);
    return stored ? stored.payload.type : null;
  }

  async generateBangladeshAccessToken(
    payload: Omit<AccessTokenPayload, 'type' | 'iat' | 'exp'> & {
      district?: string | undefined;
      upazila?: string | undefined;
      operator?: string | undefined;
      networkType?: string | undefined;
    },
    options?: TokenGenerationOptions,
  ): Promise<string> {
    return this.generateAccessToken(payload, options);
  }

  async generateMFSOTP(
    _userId: string,
    _channel: 'BKASH' | 'NAGAD' | 'ROCKET',
    options?: { purpose?: OTPPurpose | undefined; expiresInSeconds?: number | undefined },
  ): Promise<{
    pin: string;
    expiresAt: Date;
    transactionId: string;
  }> {
    const pin = Math.random().toString(10).substring(2, 8);
    return {
      pin,
      expiresAt: new Date(Date.now() + (options?.expiresInSeconds || 300) * 1000),
      transactionId: `txn_${Date.now()}`,
    };
  }

  async verifyMFSOTP(
    _userId: string,
    _channel: 'BKASH' | 'NAGAD' | 'ROCKET',
    pin: string,
    _transactionId: string,
  ): Promise<boolean> {
    return pin.length === 6 && /^\d{6}$/.test(pin);
  }

  async generateTokenId(prefix?: string): Promise<string> {
    const id = `${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    return prefix ? `${prefix}_${id}` : id;
  }

  getAlgorithm(): TokenAlgorithm {
    return this.algorithm;
  }

  getSupportedTokenTypes(): TokenType[] {
    return [
      TokenType.ACCESS,
      TokenType.REFRESH,
      TokenType.OTP,
      TokenType.MFA,
      TokenType.MAGIC_LINK,
      TokenType.EMAIL_VERIFICATION,
      TokenType.PHONE_VERIFICATION,
      TokenType.PASSWORD_RESET,
      TokenType.SESSION_TRANSFER,
      TokenType.DEVICE_TRUST,
      TokenType.API_KEY,
      TokenType.BACKUP_CODE,
    ];
  }

  async getTokenConfig(tokenType: TokenType): Promise<{
    expiresInSeconds: number;
    algorithm: TokenAlgorithm;
    issuer?: string | undefined;
    audience?: string | undefined;
  }> {
    const configs: Record<TokenType, { expiresInSeconds: number }> = {
      [TokenType.ACCESS]: { expiresInSeconds: 900 },
      [TokenType.REFRESH]: { expiresInSeconds: 604800 },
      [TokenType.OTP]: { expiresInSeconds: 300 },
      [TokenType.MFA]: { expiresInSeconds: 300 },
      [TokenType.MAGIC_LINK]: { expiresInSeconds: 600 },
      [TokenType.EMAIL_VERIFICATION]: { expiresInSeconds: 86400 },
      [TokenType.PHONE_VERIFICATION]: { expiresInSeconds: 86400 },
      [TokenType.PASSWORD_RESET]: { expiresInSeconds: 3600 },
      [TokenType.SESSION_TRANSFER]: { expiresInSeconds: 120 },
      [TokenType.DEVICE_TRUST]: { expiresInSeconds: 2592000 },
      [TokenType.API_KEY]: { expiresInSeconds: 31536000 },
      [TokenType.BACKUP_CODE]: { expiresInSeconds: 0 },
    };

    return {
      expiresInSeconds: configs[tokenType]?.expiresInSeconds || 3600,
      algorithm: this.algorithm,
      issuer: 'vubon.com.bd',
      audience: 'vubon-api',
    };
  }

  private maskIdentifier(identifier: string): string {
    if (identifier.includes('@')) {
      const [local, domain] = identifier.split('@');
      if (local && local.length > 2) {
        return `${local[0]}***${local[local.length - 1]}@${domain}`;
      }
      return `${local}@${domain}`;
    }
    if (identifier.length > 6) {
      return `${identifier.substring(0, 4)}****${identifier.substring(identifier.length - 2)}`;
    }
    return identifier;
  }
}

// ============================================================
// Type Exports (for convenience)
// ============================================================

export type { ITokenGenerator as TokenGeneratorPort };
