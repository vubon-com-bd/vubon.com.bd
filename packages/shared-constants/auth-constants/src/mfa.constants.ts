/**
 * MFA Constants - Pure immutable Multi-Factor Authentication configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-constants/auth-constants/mfa.constants
 *
 * RULES:
 * ✅ NO OTP generation, QR code generation, TOTP verification
 * ✅ NO imports from other layers (pure standalone)
 * ✅ NO business logic
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// Type Utilities
// ============================================================
export type ValueOf<T> = T[keyof T];
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

// ============================================================
// MFA Provider Types (Bangladesh specific)
// ============================================================
export const MFA_PROVIDERS = {
  // Standard TOTP (Google Authenticator, Microsoft Authenticator)
  TOTP: 'totp',

  // SMS OTP (Critical for Bangladesh - high mobile penetration)
  SMS: 'sms',
  SMS_VOICE: 'sms_voice',           // Voice call OTP for accessibility

  // Email OTP
  EMAIL: 'email',
  EMAIL_MAGIC_LINK: 'email_magic',   // Passwordless email link

  // Backup methods
  BACKUP_CODE: 'backup_code',

  // Modern biometrics
  WEBAUTHN: 'webauthn',              // Passkey/FaceID/Fingerprint

  // Push notification (Mobile app)
  PUSH_NOTIFICATION: 'push',

  // Hardware token (Enterprise users)
  HARDWARE_TOKEN: 'hardware',

  // Bangladesh specific MFS (Mobile Financial Services)
  BKASH_PIN: 'bkash_pin',           // bKash PIN as MFA
  NAGAD_PIN: 'nagad_pin',           // Nagad PIN as MFA
  ROCKET_PIN: 'rocket_pin',         // Rocket PIN as MFA

  // WhatsApp OTP (Increasingly popular in BD)
  WHATSAPP_OTP: 'whatsapp',

  // Offline TOTP (For areas with poor internet)
  OFFLINE_TOTP: 'offline_totp',
} as const;

export type MfaProvider = ValueOf<typeof MFA_PROVIDERS>;

// ============================================================
// MFA Statuses (State machine ready)
// ============================================================
export const MFA_STATUS = {
  // Not configured
  NOT_ENABLED: 'not_enabled',

  // Setup flow
  SETUP_PENDING: 'setup_pending',
  SETUP_IN_PROGRESS: 'setup_in_progress',

  // Active states
  ENABLED: 'enabled',
  ENABLED_DEFAULT: 'enabled_default',   // Using default provider
  ENABLED_MULTI: 'enabled_multi',        // Multiple providers enabled

  // Security states
  LOCKED: 'locked',
  SUSPENDED: 'suspended',
  DISABLED_BY_ADMIN: 'disabled_by_admin',
  DISABLED_BY_USER: 'disabled_by_user',

  // Special states
  BACKUP_ONLY: 'backup_only',           // Only backup codes available
  RECOVERY_MODE: 'recovery_mode',        // Account recovery MFA bypass
} as const;

export type MfaStatus = ValueOf<typeof MFA_STATUS>;

// ============================================================
// MFA Verification Triggers (When MFA is required)
// ============================================================
export const MFA_VERIFICATION_TYPES = {
  // Authentication flows
  LOGIN: 'login',
  LOGIN_NEW_DEVICE: 'login_new_device',
  LOGIN_NEW_LOCATION: 'login_new_location',

  // Financial transactions (E-commerce critical)
  PAYMENT: 'payment',
  PAYMENT_HIGH_VALUE: 'payment_high_value',      // Above threshold
  PAYMENT_NEW_METHOD: 'payment_new_method',       // First time using payment method
  WITHDRAWAL: 'withdrawal',
  REFUND: 'refund',

  // Account changes
  SENSITIVE_CHANGE: 'sensitive_change',
  PASSWORD_CHANGE: 'password_change',
  EMAIL_CHANGE: 'email_change',
  PHONE_CHANGE: 'phone_change',
  MFA_DISABLE: 'mfa_disable',
  MFA_PROVIDER_CHANGE: 'mfa_provider_change',

  // Device & security
  DEVICE_TRUST: 'device_trust',
  SESSION_TRANSFER: 'session_transfer',

  // Bangladesh specific
  HIGH_VALUE_ORDER: 'high_value_order',          // > 25,000 BDT
  INTERNATIONAL_ORDER: 'international_order',
  BULK_ORDER: 'bulk_order',                      // Multiple items
} as const;

export type MfaVerificationType = ValueOf<typeof MFA_VERIFICATION_TYPES>;

// ============================================================
// MFA Priority Levels (Which MFA to try first)
// ============================================================
export const MFA_PRIORITY = {
  // Highest security (preferred)
  WEBAUTHN: 1,
  HARDWARE_TOKEN: 1,
  TOTP: 2,

  // Medium security
  PUSH_NOTIFICATION: 3,
  WHATSAPP_OTP: 4,

  // Lower security (but accessible)
  SMS: 5,
  SMS_VOICE: 5,
  EMAIL: 6,

  // Bangladesh MFS (Medium security)
  BKASH_PIN: 4,
  NAGAD_PIN: 4,
  ROCKET_PIN: 4,

  // Backup (Last resort)
  BACKUP_CODE: 99,
  OFFLINE_TOTP: 100,
} as const;

export type MfaPriority = ValueOf<typeof MFA_PRIORITY>;

// ============================================================
// OTP Configuration (Bangladesh standard)
// ============================================================
export const OTP_CONFIG = {
  // Length & format
  LENGTH: 6,
  DIGITS_ONLY: true,
  ALLOW_LEADING_ZERO: true,

  // TOTP standard (RFC 6238)
  TOTP_INTERVAL_SECONDS: 30,
  TOTP_DIGITS: 6,
  TOTP_ALGORITHM: 'SHA-1',
  TOTP_WINDOW: 1,                    // Allow 1 period before/after

  // SMS OTP (Bangladesh mobile operators)
  SMS_MAX_LENGTH: 6,
  SMS_ALLOW_REPEAT_DIGITS: true,

  // Voice OTP (For feature phones)
  VOICE_OTP_ENABLED: true,
  VOICE_LANGUAGE: 'bn',               // Bengali voice support

  // WhatsApp OTP
  WHATSAPP_TEMPLATE: 'your_otp_code',
} as const;

export type OtpConfig = typeof OTP_CONFIG;

// ============================================================
// Recovery Codes Configuration
// ============================================================
export const RECOVERY_CODES = {
  // Generation
  COUNT: 10,
  CODE_LENGTH: 8,
  CODE_FORMAT: 'alphanumeric',        // e.g., "AB3F-9K2M"

  // Security
  HASH_ALGORITHM: 'SHA-256',
  SALT_ROUNDS: 10,

  // Storage
  STORE_HASHED_ONLY: true,

  // Usage
  ONE_TIME_USE: true,
  REGENERATE_ON_USAGE: false,          // Regenerate when low
  REGENERATE_THRESHOLD: 3,              // Regenerate when 3 or less left

  // Display
  SHOW_AFTER_SETUP: true,
  FORCE_DOWNLOAD: true,                // Force download as text file
  ALLOW_PRINT: true,
} as const;

export type RecoveryCodes = typeof RECOVERY_CODES;

// ============================================================
// MFA Timeouts & Limits (Production ready)
// ============================================================
export const MFA_TIMEOUTS = {
  // Verification windows
  VERIFICATION_WINDOW_SECONDS: 300,     // 5 minutes to complete MFA
  CODE_VALIDITY_SECONDS: 300,           // 5 minutes OTP valid
  BACKUP_CODE_VALIDITY: 0,              // One-time use only (0 = immediate invalidate)

  // Attempt limits
  MAX_VERIFICATION_ATTEMPTS: 3,
  MAX_RESEND_ATTEMPTS_PER_HOUR: 5,

  // Lockout
  LOCKOUT_DURATION_SECONDS: 900,        // 15 minutes after max attempts
  LOCKOUT_INCREMENTAL: true,            // Increase lockout on repeated failures

  // Rate limits
  MAX_MFA_REQUESTS_PER_MINUTE: 10,
  MAX_SMS_PER_HOUR: 5,                  // Bangladesh SMS cost optimization
  MAX_EMAIL_PER_HOUR: 10,
  MAX_WHATSAPP_PER_HOUR: 5,

  // Session MFA skip (trusted device)
  TRUSTED_DEVICE_SKIP_SECONDS: 2592000,  // 30 days
  TRUSTED_LOCATION_SKIP_SECONDS: 86400,  // 24 hours
} as const;

export type MfaTimeouts = typeof MFA_TIMEOUTS;

// ============================================================
// MFA Thresholds (When MFA is forced)
// ============================================================
export const MFA_THRESHOLDS = {
  // Transaction value thresholds (in BDT - Bangladesh Taka)
  PAYMENT_MFA_THRESHOLD_BDT: 25000,      // MFA required for orders > 25,000 BDT
  HIGH_VALUE_THRESHOLD_BDT: 50000,       // Additional verification for > 50,000 BDT
  CRYPTO_THRESHOLD_BDT: 10000,           // Lower threshold for crypto payments

  // Login thresholds
  NEW_DEVICE_MFA_REQUIRED: true,
  NEW_LOCATION_MFA_REQUIRED: true,
  SUSPICIOUS_PATTERN_MFA_REQUIRED: true,

  // Time-based thresholds
  NIGHT_TIME_MFA_ENHANCED: true,         // 10 PM - 6 AM (increased scrutiny)
  WEEKEND_MFA_ENHANCED: true,            // Friday & Saturday (Bangladesh weekend)

  // Velocity thresholds
  MAX_LOGINS_PER_HOUR_BEFORE_MFA: 5,
  MAX_FAILED_LOGINS_BEFORE_MFA: 3,
} as const;

export type MfaThresholds = typeof MFA_THRESHOLDS;

// ============================================================
// MFA Trusted Environments (Skip MFA)
// ============================================================
export const MFA_TRUSTED_ENVIRONMENTS = {
  // Trusted device types
  TRUSTED_DEVICE_TYPES: ['desktop', 'laptop'],

  // Trusted networks (CIDR ranges - placeholders)
  // Actual values come from config, not constants
  TRUSTED_NETWORKS_CONFIGURABLE: true,

  // Trusted locations (Bangladesh specific)
  TRUSTED_LOCATIONS: ['home', 'office'],

  // Trust duration
  TRUST_DURATION_DAYS: {
    DEVICE: 30,
    NETWORK: 7,
    LOCATION: 1,
  },

  // Bypass types
  BYPASS_TYPES: {
    TRUSTED_DEVICE: 'trusted_device',
    TRUSTED_NETWORK: 'trusted_network',
    RECENT_VERIFICATION: 'recent_verification',
    ADMIN_OVERRIDE: 'admin_override',     // With audit log
    EMERGENCY_BYPASS: 'emergency',        // For support cases
  },
} as const;

export type MfaTrustedEnvironments = typeof MFA_TRUSTED_ENVIRONMENTS;

// ============================================================
// MFA Risk Scoring (For adaptive MFA)
// ============================================================
export const MFA_RISK_SCORES = {
  // Risk factors and their scores
  FACTORS: {
    NEW_DEVICE: 30,
    NEW_LOCATION: 25,
    NEW_IP: 15,
    OLD_BROWSER: 20,
    VPN_DETECTED: 40,
    PROXY_DETECTED: 35,
    SUSPICIOUS_HOUR: 20,        // 1 AM - 5 AM
    UNUSUAL_AMOUNT: 25,         // Transaction > 2x average
    MULTIPLE_ACCOUNTS_SAME_DEVICE: 50,
    SIM_SWAP_DETECTED: 100,      // Immediate MFA required
  },

  // Action thresholds
  THRESHOLDS: {
    NO_MFA_NEEDED: 0,
    PREFER_MFA: 30,              // Suggest MFA but not required
    MFA_REQUIRED: 50,            // Force MFA
    MFA_ENHANCED: 75,            // Require 2 different MFA methods
    BLOCK_TRANSACTION: 100,      // Block and notify support
  },
} as const;

export type MfaRiskScores = typeof MFA_RISK_SCORES;

// ============================================================
// MFA Setup Requirements by Security Level
// ============================================================
export const MFA_SETUP_REQUIREMENTS = {
  // Minimum MFA methods required per security level
  MINIMUM_METHODS: {
    STANDARD: 1,                  // At least one MFA method
    ENHANCED: 2,                  // At least two different methods
    HIGH_SECURITY: 2,             // Two methods, one must be hardware/WebAuthn
    MAXIMUM: 3,                   // Three methods
  },

  // Recommended MFA providers by user type
  RECOMMENDED: {
    CUSTOMER: [MFA_PROVIDERS.SMS, MFA_PROVIDERS.TOTP],
    SELLER: [MFA_PROVIDERS.SMS, MFA_PROVIDERS.TOTP, MFA_PROVIDERS.WEBAUTHN],
    ADMIN: [MFA_PROVIDERS.TOTP, MFA_PROVIDERS.WEBAUTHN, MFA_PROVIDERS.HARDWARE_TOKEN],
    SUPER_ADMIN: [MFA_PROVIDERS.WEBAUTHN, MFA_PROVIDERS.HARDWARE_TOKEN, MFA_PROVIDERS.TOTP],
  },

  // Required MFA methods (cannot be disabled)
  REQUIRED_PROVIDERS: {
    SUPER_ADMIN: [MFA_PROVIDERS.TOTP, MFA_PROVIDERS.WEBAUTHN],
    ADMIN: [MFA_PROVIDERS.TOTP],
    SELLER: [],
    CUSTOMER: [],
  },
} as const;

export type MfaSetupRequirements = typeof MFA_SETUP_REQUIREMENTS;

// ============================================================
// MFA Fallback Methods (When primary MFA fails)
// ============================================================
export const MFA_FALLBACKS = {
  ENABLED: true,

  // Order of fallback attempts
  ORDER: [
    MFA_PROVIDERS.BACKUP_CODE,
    MFA_PROVIDERS.SMS_VOICE,
    MFA_PROVIDERS.EMAIL,
    MFA_PROVIDERS.WHATSAPP_OTP,
  ],

  // Fallback limitations
  MAX_FALLBACK_ATTEMPTS: 2,
  FALLBACK_COOLDOWN_SECONDS: 3600,    // 1 hour after fallback use

  // Account recovery after fallback
  RECOVERY_REQUIRED_AFTER_FALLBACK: true,
  RECOVERY_METHODS: ['email', 'phone'],
} as const;

export type MfaFallbacks = typeof MFA_FALLBACKS;

// ============================================================
// SIM Swap Detection (Bangladesh specific - Critical)
// ============================================================
export const SIM_SWAP_DETECTION = {
  ENABLED: true,

  // Check intervals (seconds)
  CHECK_INTERVAL_SECONDS: 86400,      // Check daily

  // When SIM swap is detected
  ACTIONS: {
    INVALIDATE_SESSION: true,
    REQUIRE_MFA: true,
    REQUIRE_IDENTITY_VERIFICATION: true,
    SEND_ALERT: true,
    TEMPORARY_SUSPEND: true,          // 24 hour suspension
  },

  // SIM swap cooldown
  SUSPENSION_DURATION_HOURS: 24,

  // Trusted mobile operators in Bangladesh
  TRUSTED_OPERATORS: ['GP', 'ROBI', 'BANGLALINK', 'TELETALK'],
} as const;

export type SimSwapDetection = typeof SIM_SWAP_DETECTION;

// ============================================================
// Offline MFA Support (For poor connectivity areas)
// ============================================================
export const OFFLINE_MFA = {
  ENABLED: true,

  // Offline TOTP (Pre-generated codes)
  OFFLINE_TOTP_COUNT: 20,              // Generate 20 offline codes
  OFFLINE_CODE_LENGTH: 12,

  // Offline backup codes (Printable)
  PRINTABLE_BACKUP: {
    ENABLED: true,
    SIZE: 'A4',
    FORMAT: 'pdf',
  },

  // Offline verification window
  OFFLINE_VALIDITY_DAYS: 30,           // Offline codes valid for 30 days
} as const;

export type OfflineMfa = typeof OFFLINE_MFA;

// ============================================================
// MFA Events (For audit & monitoring)
// ============================================================
export const MFA_EVENTS = {
  // Setup events
  MFA_ENABLED: 'mfa.enabled',
  MFA_DISABLED: 'mfa.disabled',
  MFA_PROVIDER_ADDED: 'mfa.provider.added',
  MFA_PROVIDER_REMOVED: 'mfa.provider.removed',
  MFA_BACKUP_CODES_GENERATED: 'mfa.backup_codes.generated',

  // Verification events
  MFA_VERIFICATION_SUCCESS: 'mfa.verification.success',
  MFA_VERIFICATION_FAILED: 'mfa.verification.failed',
  MFA_BACKUP_CODE_USED: 'mfa.backup_code.used',
  MFA_FALLBACK_USED: 'mfa.fallback.used',

  // Security events
  MFA_LOCKED: 'mfa.locked',
  MFA_UNLOCKED: 'mfa.unlocked',
  MFA_ATTEMPTS_EXCEEDED: 'mfa.attempts.exceeded',

  // Bangladesh specific
  MFA_SIM_SWAP_DETECTED: 'mfa.sim_swap.detected',
  MFA_BYPASS_ADMIN: 'mfa.bypass.admin',      // With audit trail
  MFA_EMERGENCY_ACCESS: 'mfa.emergency.access',
} as const;

export type MfaEvent = ValueOf<typeof MFA_EVENTS>;

// ============================================================
// MFA Configuration Presets (For different risk levels)
// ============================================================
export const MFA_PRESETS = {
  // Low security (Fast checkout, low value)
  LOW: {
    requiredProviders: [],
    verificationTypes: [MFA_VERIFICATION_TYPES.PAYMENT_HIGH_VALUE],
    codeValiditySeconds: 600,
    maxAttempts: 5,
  },

  // Standard security (Default for customers)
  STANDARD: {
    requiredProviders: [MFA_PROVIDERS.SMS],
    verificationTypes: [
      MFA_VERIFICATION_TYPES.PAYMENT_HIGH_VALUE,
      MFA_VERIFICATION_TYPES.PASSWORD_CHANGE,
      MFA_VERIFICATION_TYPES.EMAIL_CHANGE,
    ],
    codeValiditySeconds: 300,
    maxAttempts: 3,
  },

  // High security (Sellers, high value accounts)
  HIGH: {
    requiredProviders: [MFA_PROVIDERS.TOTP, MFA_PROVIDERS.SMS],
    verificationTypes: Object.values(MFA_VERIFICATION_TYPES),
    codeValiditySeconds: 180,
    maxAttempts: 3,
    requireMfaForAllLogins: true,
  },

  // Maximum security (Admins)
  MAXIMUM: {
    requiredProviders: [MFA_PROVIDERS.TOTP, MFA_PROVIDERS.WEBAUTHN],
    verificationTypes: Object.values(MFA_VERIFICATION_TYPES),
    codeValiditySeconds: 120,
    maxAttempts: 2,
    requireMfaForAllLogins: true,
    requireReauthEveryHours: 12,
  },
} as const;

export type MfaPreset = ValueOf<typeof MFA_PRESETS>;
export type MfaPresetName = keyof typeof MFA_PRESETS;

// ============================================================
// User Role Types (For MFA requirements)
// ============================================================
export type MfaUserRole = 'CUSTOMER' | 'SELLER' | 'ADMIN' | 'SUPER_ADMIN';

// ============================================================
// Deep freeze everything for immutability
// ============================================================
const deepFreeze = <T>(obj: T): ReadonlyDeep<T> => {
  Object.freeze(obj);
  if (obj === null || typeof obj !== 'object') return obj as ReadonlyDeep<T>;

  for (const value of Object.values(obj)) {
    if (value !== null && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return obj as ReadonlyDeep<T>;
};

// Apply deep freeze to all exported objects
export const __ALL_CONSTANTS_FROZEN__ = deepFreeze({
  MFA_PROVIDERS,
  MFA_STATUS,
  MFA_VERIFICATION_TYPES,
  MFA_PRIORITY,
  OTP_CONFIG,
  RECOVERY_CODES,
  MFA_TIMEOUTS,
  MFA_THRESHOLDS,
  MFA_TRUSTED_ENVIRONMENTS,
  MFA_RISK_SCORES,
  MFA_SETUP_REQUIREMENTS,
  MFA_FALLBACKS,
  SIM_SWAP_DETECTION,
  OFFLINE_MFA,
  MFA_EVENTS,
  MFA_PRESETS,
});
