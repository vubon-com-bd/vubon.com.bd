// ============================================================
// Login DTOs
// ============================================================

/**
 * Login request DTO
 */
export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean | undefined;
  deviceId?: string | undefined;
}

/**
 * Phone login DTO (Bangladesh specific)
 */
export interface PhoneLoginDto {
  phoneNumber: string;
  password: string;
  rememberMe?: boolean | undefined;
  deviceId?: string | undefined;
}

/**
 * Username login DTO
 */
export interface UsernameLoginDto {
  username: string;
  password: string;
  rememberMe?: boolean | undefined;
  deviceId?: string | undefined;
}

/**
 * OTP login DTO (Passwordless)
 */
export interface OtpLoginDto {
  phoneNumber: string;
  otpCode: string;
  deviceId?: string | undefined;
}

// ============================================================
// Login Response
// ============================================================

/**
 * Login response DTO
 */
export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    tier: string;
    avatar?: string | undefined;
  };
  sessionId?: string | undefined;
}

// ============================================================
// Login Result
// ============================================================

/**
 * Login result with MFA status
 */
export interface LoginResult {
  mfaRequired: boolean;
  mfaSessionId?: string | undefined;
  availableMfaMethods?: string[] | undefined;
  loginSessionId?: string | undefined;
}



/**
 * Registration Types - Shared Types
 *
 * @module shared-types/auth/register.types
 *
 * @description
 * Type definitions for user registration operations.
 */

// ============================================================
// Registration DTO
// ============================================================

/**
 * Registration request DTO
 */
export interface RegisterDto {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  displayName?: string | undefined;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  marketingConsent?: boolean | undefined;
  ageConfirmed?: boolean | undefined;
  referralCode?: string | undefined;
  captchaToken?: string | undefined;
  deviceId?: string | undefined;
  deviceFingerprint?: string | undefined;
  preferredLanguage?: 'en' | 'bn' | undefined;
  phoneNumber?: string | undefined;
}

// ============================================================
// User Response
// ============================================================

/**
 * User response DTO
 */
export interface UserResponseDto {
  id: string;
  email: string;
  phoneNumber?: string | undefined;
  fullName: string;
  status: string;
  role: string;
  tier: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isKycVerified?: boolean | undefined;
  mfaEnabled?: boolean | undefined;
  createdAt: Date;
  lastLoginAt?: Date | undefined;
}



/**
 * Token Types - Shared Types
 *
 * @module shared-types/auth/token.types
 *
 * @description
 * Type definitions for token operations.
 */

// ============================================================
// Refresh Token DTO
// ============================================================

/**
 * Refresh token request DTO
 */
export interface RefreshTokenDto {
  refreshToken: string;
  deviceId?: string | undefined;
}

// ============================================================
// Token Refresh Response
// ============================================================

/**
 * Token refresh response DTO
 */
export interface TokenRefreshResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
  sessionId?: string | undefined;
}



/**
 * Logout Types - Shared Types
 *
 * @module shared-types/auth/logout.types
 *
 * @description
 * Type definitions for logout operations.
 */

// ============================================================
// Logout DTO
// ============================================================

/**
 * Logout request DTO
 */
export interface LogoutDto {
  sessionId?: string | undefined;
  allDevices?: boolean | undefined;
  keepCurrent?: boolean | undefined;
}

// ============================================================
// Logout Response
// ============================================================

/**
 * Logout response DTO
 */
export interface LogoutResponseDto {
  success: boolean;
  message: string;
  sessionsRevoked: number;
  timestamp: string;
}

/**
 * MFA Types - Shared Types
 *
 * @module shared-types/auth/mfa.types
 *
 * @description
 * Type definitions for Multi-Factor Authentication operations.
 */

// ============================================================
// MFA DTOs
// ============================================================

/**
 * Enable MFA request DTO
 */
export interface EnableMfaDto {
  method: 'totp' | 'sms' | 'whatsapp' | 'backup_code';
  phoneNumber?: string | undefined;
  setAsPrimary?: boolean | undefined;
  deviceName?: string | undefined;
  generateBackupCodes?: boolean | undefined;
  backupCodeCount?: number | undefined;
}

/**
 * Verify MFA request DTO
 */
export interface VerifyMfaDto {
  mfaSessionId: string;
  code: string;
  method: 'totp' | 'sms' | 'whatsapp' | 'backup_code';
  trustDevice?: boolean | undefined;
}

/**
 * Disable MFA request DTO
 */
export interface DisableMfaDto {
  methodId?: string | undefined;
  password: string;
  reason?: string | undefined;
}

// ============================================================
// MFA Responses
// ============================================================

/**
 * TOTP setup response DTO
 */
export interface TOTPSetupResponseDto {
  methodId: string;
  secret: string;
  qrCode: string;
  backupCodes: string[];
  type: 'totp';
}

/**
 * Phone setup response DTO (SMS/WhatsApp)
 */
export interface PhoneSetupResponseDto {
  methodId: string;
  maskedPhone: string;
  type: 'sms' | 'whatsapp';
  cooldownSeconds: number;
}

/**
 * MFS PIN setup response DTO (bKash/Nagad/Rocket)
 */
export interface MFSPinSetupResponseDto {
  methodId: string;
  provider: 'bkash' | 'nagad' | 'rocket';
  maskedPhone: string;
  type: 'mfs_pin';
}

/**
 * WebAuthn setup response DTO
 */
export interface WebAuthnSetupResponseDto {
  methodId: string;
  registrationOptions: Record<string, unknown>;
  type: 'webauthn';
}

/**
 * MFA status response DTO
 */
export interface MFAStatusResponseDto {
  enabled: boolean;
  methods: Array<{
    id: string;
    type: string;
    isPrimary: boolean;
    createdAt: Date;
    lastUsedAt?: Date | undefined;
  }>;
  backupCodesRemaining: number;
}

export interface ServiceResult<T = any> {
  /** Whether the operation was successful */
  success: boolean;

  /** Response data (only present if success is true) */
  data?: T | undefined;

  /** Error code (only present if success is false) */
  errorCode?: string | undefined;

  /** Error message in English (only present if success is false) */
  errorMessage?: string | undefined;

  /** Error message in Bengali (only present if success is false) */
  errorMessageBn?: string | undefined;

  /** Rate limit metadata (when applicable) */
  rateLimit?: {
    /** Remaining requests allowed in the current window */
    remaining: number;
    /** Time when the rate limit window resets */
    resetAt: Date;
    /** Maximum requests allowed in the window */
    limit: number;
  } | undefined;

  /** Correlation ID for distributed tracing across services */
  correlationId?: string | undefined;

  /** Duration of the operation in milliseconds */
  durationMs?: number | undefined;
}


// ============================================================
// Social Login DTOs
// ============================================================

/**
 * Social login request DTO
 */
export interface SocialLoginDto {
  /** Social provider (google, facebook, github, apple, linkedin, whatsapp, imo, telegram) */
  provider: string;
  
  /** Authorization code from social provider */
  code: string;
  
  /** Redirect URI (for OAuth flow) */
  redirectUri?: string | undefined;
  
  /** State parameter (for CSRF protection) */
  state?: string | undefined;
  
  /** PKCE code verifier (for enhanced security) */
  codeVerifier?: string | undefined;
  
  /** Scope (comma-separated) */
  scope?: string | undefined;
  
  /** Device ID for session tracking */
  deviceId?: string | undefined;
  
  /** Device fingerprint */
  deviceFingerprint?: string | undefined;
  
  /** Correlation ID for distributed tracing */
  correlationId?: string | undefined;
  
  /** Preferred language (en/bn) */
  preferredLanguage?: 'en' | 'bn' | undefined;
}

/**
 * Social phone login request DTO (WhatsApp/Imo/Telegram)
 * Bangladesh specific - uses phone number + OTP
 */
export interface SocialPhoneLoginDto {
  /** Phone number (E.164 format) */
  phoneNumber: string;
  
  /** Social provider (whatsapp, imo, telegram) */
  provider: 'whatsapp' | 'imo' | 'telegram';
  
  /** OTP code (for verification step) */
  otpCode?: string | undefined;
  
  /** Device ID for session tracking */
  deviceId?: string | undefined;
  
  /** Device fingerprint */
  deviceFingerprint?: string | undefined;
  
  /** Correlation ID for distributed tracing */
  correlationId?: string | undefined;
  
  /** Preferred language (en/bn) */
  preferredLanguage?: 'en' | 'bn' | undefined;
  
  /** Auto-create user if doesn't exist */
  autoCreateUser?: boolean | undefined;
  
  /** District (Bangladesh specific) */
  district?: string | undefined;
  
  /** Network type (2g/3g/4g/5g/wifi) */
  networkType?: string | undefined;
}

// ============================================================
// এছাড়াও, যদি এই টাইপগুলোর প্রয়োজন হয়:
// ============================================================

/**
 * Social login response DTO
 */
export interface SocialLoginResponseDto {
  /** User ID */
  userId: string;
  
  /** Email */
  email: string;
  
  /** Full name */
  fullName: string;
  
  /** Social provider */
  provider: string;
  
  /** Provider user ID */
  providerUserId: string;
  
  /** Is new user (just registered) */
  isNewUser: boolean;
  
  /** Access token (if auto-login) */
  accessToken?: string | undefined;
  
  /** Refresh token (if auto-login) */
  refreshToken?: string | undefined;
  
  /** Token expiry in seconds */
  expiresIn?: number | undefined;
}

/**
 * Social OAuth state DTO
 */
export interface SocialOAuthStateDto {
  /** Provider name */
  provider: string;
  
  /** State token */
  state: string;
  
  /** Redirect URI */
  redirectUri?: string | undefined;
  
  /** PKCE code verifier */
  codeVerifier?: string | undefined;
  
  /** Scope */
  scope?: string | undefined;
  
  /** Created at timestamp */
  createdAt: Date;
  
  /** Expiry in seconds */
  expiresIn: number;
}
