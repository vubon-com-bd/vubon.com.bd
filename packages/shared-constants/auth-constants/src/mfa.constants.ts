/**
 * MFA Constants - Pure immutable Multi-Factor Authentication configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/mfa.constants
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
// CRITICAL: MFA Service Connection Configuration
// ============================================================
export const MFA_SERVICE_CONFIG = {
  // SMS Gateways (Bangladesh mobile operators)
  SMS_GATEWAYS: {
    GP: { 
      priority: 1, 
      name: 'Grameenphone',
      endpoint: 'https://api.gp.com.bd/sms',
      timeoutMs: 5000,
      retryCount: 2,
    },
    ROB: { 
      priority: 2, 
      name: 'Robi',
      endpoint: 'https://api.robi.com.bd/sms',
      timeoutMs: 5000,
      retryCount: 2,
    },
    BL: { 
      priority: 3, 
      name: 'Banglalink',
      endpoint: 'https://api.banglalink.net/sms',
      timeoutMs: 5000,
      retryCount: 2,
    },
    TT: { 
      priority: 4, 
      name: 'Teletalk',
      endpoint: 'https://api.teletalk.com.bd/sms',
      timeoutMs: 5000,
      retryCount: 2,
    },
  },
  
  // WhatsApp Business API
  WHATSAPP_CONFIG: {
    endpoint: 'https://graph.facebook.com/v17.0',
    timeoutMs: 10000,
    templateName: 'vubon_otp',
    language: 'bn',
  },
  
  // TOTP Service Configuration (RFC 6238 compliant)
  TOTP: {
    ISSUER: 'Vubon.com.bd',
    ALGORITHM: 'SHA1',
    DIGITS: 6,
    PERIOD: 30,
    WINDOW: 1,  // Allow 1 period before/after
    QR_CODE_SIZE: 200,
    QR_CODE_FORMAT: 'png',
  },
  
  // WebAuthn (Passkeys) Configuration
  WEBAUTHN: {
    RP_ID: 'vubon.com.bd',
    RP_NAME: 'Vubon E-commerce - Bangladesh',
    RP_ICON: 'https://vubon.com.bd/favicon.ico',
    TIMEOUT_MS: 60000,
    ALLOWED_ALGORITHMS: [-7, -257], // ES256, RS256
    ATTESTATION: 'none', // 'none', 'indirect', 'direct'
    USER_VERIFICATION: 'preferred', // 'required', 'preferred', 'discouraged'
    AUTHENTICATOR_SELECTION: {
      residentKey: 'preferred',
      userVerification: 'preferred',
      authenticatorAttachment: 'platform', // 'platform', 'cross-platform'
    },
  },
  
  // Push Notification Service
  PUSH_CONFIG: {
    endpoint: 'https://fcm.googleapis.com/fcm/send',
    timeoutMs: 10000,
    ttlSeconds: 300,
    priority: 'high',
  },
  
  // Hardware Token (YubiKey, etc.)
  HARDWARE_TOKEN_CONFIG: {
    allowedVendors: ['yubico', 'feitian', 'google'],
    protocols: ['fido2', 'u2f'],
    requireTouch: true,
  },
  
  // Bangladesh MFS (Mobile Financial Services)
  MFS_CONFIG: {
    BKASH: {
      endpoint: 'https://api.bkash.com',
      timeoutMs: 10000,
      verifyEndpoint: '/verify/pin',
    },
    NAGAD: {
      endpoint: 'https://api.nagad.com.bd',
      timeoutMs: 10000,
      verifyEndpoint: '/verify/pin',
    },
    ROCKET: {
      endpoint: 'https://api.rocket.com.bd',
      timeoutMs: 10000,
      verifyEndpoint: '/verify/pin',
    },
  },
} as const;

export type MfaServiceConfig = typeof MFA_SERVICE_CONFIG;

// ============================================================
// MFA Statuses (State machine ready)
// ============================================================
export const MFA_STATUS = {
  NOT_ENABLED: 'not_enabled',
  SETUP_PENDING: 'setup_pending',
  SETUP_IN_PROGRESS: 'setup_in_progress',
  ENABLED: 'enabled',
  ENABLED_DEFAULT: 'enabled_default',
  ENABLED_MULTI: 'enabled_multi',
  LOCKED: 'locked',
  SUSPENDED: 'suspended',
  DISABLED_BY_ADMIN: 'disabled_by_admin',
  DISABLED_BY_USER: 'disabled_by_user',
  BACKUP_ONLY: 'backup_only',
  RECOVERY_MODE: 'recovery_mode',
} as const;

export type MfaStatus = ValueOf<typeof MFA_STATUS>;

// ============================================================
// MFA Verification Triggers (When MFA is required)
// ============================================================
export const MFA_VERIFICATION_TYPES = {
  LOGIN: 'login',
  LOGIN_NEW_DEVICE: 'login_new_device',
  LOGIN_NEW_LOCATION: 'login_new_location',
  PAYMENT: 'payment',
  PAYMENT_HIGH_VALUE: 'payment_high_value',
  PAYMENT_NEW_METHOD: 'payment_new_method',
  WITHDRAWAL: 'withdrawal',
  REFUND: 'refund',
  SENSITIVE_CHANGE: 'sensitive_change',
  PASSWORD_CHANGE: 'password_change',
  EMAIL_CHANGE: 'email_change',
  PHONE_CHANGE: 'phone_change',
  MFA_DISABLE: 'mfa_disable',
  MFA_PROVIDER_CHANGE: 'mfa_provider_change',
  DEVICE_TRUST: 'device_trust',
  SESSION_TRANSFER: 'session_transfer',
  HIGH_VALUE_ORDER: 'high_value_order',
  INTERNATIONAL_ORDER: 'international_order',
  BULK_ORDER: 'bulk_order',
} as const;

export type MfaVerificationType = ValueOf<typeof MFA_VERIFICATION_TYPES>;

// ============================================================
// MFA Priority Levels (Which MFA to try first)
// ============================================================
export const MFA_PRIORITY = {
  WEBAUTHN: 1,
  HARDWARE_TOKEN: 1,
  TOTP: 2,
  PUSH_NOTIFICATION: 3,
  WHATSAPP_OTP: 4,
  BKASH_PIN: 4,
  NAGAD_PIN: 4,
  ROCKET_PIN: 4,
  SMS: 5,
  SMS_VOICE: 5,
  EMAIL: 6,
  BACKUP_CODE: 99,
  OFFLINE_TOTP: 100,
} as const;

export type MfaPriority = ValueOf<typeof MFA_PRIORITY>;

// ============================================================
// OTP Configuration (Bangladesh standard)
// ============================================================
export const OTP_CONFIG = {
  LENGTH: 6,
  DIGITS_ONLY: true,
  ALLOW_LEADING_ZERO: true,
  TOTP_INTERVAL_SECONDS: 30,
  TOTP_DIGITS: 6,
  TOTP_ALGORITHM: 'SHA-1',
  TOTP_WINDOW: 1,
  SMS_MAX_LENGTH: 6,
  SMS_ALLOW_REPEAT_DIGITS: true,
  VOICE_OTP_ENABLED: true,
  VOICE_LANGUAGE: 'bn',
  WHATSAPP_TEMPLATE: 'vubon_otp_verification',
} as const;

export type OtpConfig = typeof OTP_CONFIG;

// ============================================================
// Recovery Codes Configuration
// ============================================================
export const RECOVERY_CODES = {
  COUNT: 10,
  CODE_LENGTH: 8,
  CODE_FORMAT: 'alphanumeric',
  HASH_ALGORITHM: 'SHA-256',
  SALT_ROUNDS: 10,
  STORE_HASHED_ONLY: true,
  ONE_TIME_USE: true,
  REGENERATE_ON_USAGE: false,
  REGENERATE_THRESHOLD: 3,
  SHOW_AFTER_SETUP: true,
  FORCE_DOWNLOAD: true,
  ALLOW_PRINT: true,
  CODE_SEPARATOR: '-',
  CODE_SECTIONS: 2,  // e.g., "AB3F-9K2M"
} as const;

export type RecoveryCodes = typeof RECOVERY_CODES;

// ============================================================
// MFA Timeouts & Limits (Production ready)
// ============================================================
export const MFA_TIMEOUTS = {
  VERIFICATION_WINDOW_SECONDS: 300,
  CODE_VALIDITY_SECONDS: 300,
  BACKUP_CODE_VALIDITY: 0,
  MAX_VERIFICATION_ATTEMPTS: 3,
  MAX_RESEND_ATTEMPTS_PER_HOUR: 5,
  LOCKOUT_DURATION_SECONDS: 900,
  LOCKOUT_INCREMENTAL: true,
  MAX_MFA_REQUESTS_PER_MINUTE: 10,
  MAX_SMS_PER_HOUR: 5,
  MAX_EMAIL_PER_HOUR: 10,
  MAX_WHATSAPP_PER_HOUR: 5,
  TRUSTED_DEVICE_SKIP_SECONDS: 2592000,
  TRUSTED_LOCATION_SKIP_SECONDS: 86400,
} as const;

export type MfaTimeouts = typeof MFA_TIMEOUTS;

// ============================================================
// MFA Thresholds (When MFA is forced)
// ============================================================
export const MFA_THRESHOLDS = {
  PAYMENT_MFA_THRESHOLD_BDT: 25000,
  HIGH_VALUE_THRESHOLD_BDT: 50000,
  CRYPTO_THRESHOLD_BDT: 10000,
  NEW_DEVICE_MFA_REQUIRED: true,
  NEW_LOCATION_MFA_REQUIRED: true,
  SUSPICIOUS_PATTERN_MFA_REQUIRED: true,
  NIGHT_TIME_MFA_ENHANCED: true,
  WEEKEND_MFA_ENHANCED: true,
  MAX_LOGINS_PER_HOUR_BEFORE_MFA: 5,
  MAX_FAILED_LOGINS_BEFORE_MFA: 3,
  
  // Night time hours (Bangladesh timezone)
  NIGHT_TIME_START_HOUR: 22, // 10 PM
  NIGHT_TIME_END_HOUR: 6,    // 6 AM
  
  // Weekend days in Bangladesh
  WEEKEND_DAYS: [5, 6], // Friday (5), Saturday (6)
} as const;

export type MfaThresholds = typeof MFA_THRESHOLDS;

// ============================================================
// MFA Trusted Environments (Skip MFA)
// ============================================================
export const MFA_TRUSTED_ENVIRONMENTS = {
  TRUSTED_DEVICE_TYPES: ['desktop', 'laptop'],
  TRUSTED_NETWORKS_CONFIGURABLE: true,
  TRUSTED_LOCATIONS: ['home', 'office'],
  TRUST_DURATION_DAYS: {
    DEVICE: 30,
    NETWORK: 7,
    LOCATION: 1,
  },
  BYPASS_TYPES: {
    TRUSTED_DEVICE: 'trusted_device',
    TRUSTED_NETWORK: 'trusted_network',
    RECENT_VERIFICATION: 'recent_verification',
    ADMIN_OVERRIDE: 'admin_override',
    EMERGENCY_BYPASS: 'emergency',
  },
  
  // Trusted networks CIDR (configurable via env)
  DEFAULT_TRUSTED_NETWORKS: [
    '10.0.0.0/8',      // Internal corporate
    '172.16.0.0/12',   // Internal corporate
    '192.168.0.0/16',  // Internal corporate
  ],
} as const;

export type MfaTrustedEnvironments = typeof MFA_TRUSTED_ENVIRONMENTS;

// ============================================================
// MFA Risk Scoring (For adaptive MFA)
// ============================================================
export const MFA_RISK_SCORES = {
  FACTORS: {
    NEW_DEVICE: 30,
    NEW_LOCATION: 25,
    NEW_IP: 15,
    OLD_BROWSER: 20,
    VPN_DETECTED: 40,
    PROXY_DETECTED: 35,
    SUSPICIOUS_HOUR: 20,
    UNUSUAL_AMOUNT: 25,
    MULTIPLE_ACCOUNTS_SAME_DEVICE: 50,
    SIM_SWAP_DETECTED: 100,
    MULTIPLE_IP_SWITCHES: 30,      // IP changing rapidly
    DIFFERENT_TIMEZONE: 25,         // Login from different timezone
    DEVICE_FINGERPRINT_MISMATCH: 45,
  },
  THRESHOLDS: {
    NO_MFA_NEEDED: 0,
    PREFER_MFA: 30,
    MFA_REQUIRED: 50,
    MFA_ENHANCED: 75,
    BLOCK_TRANSACTION: 100,
  },
  DECAY_RATE_DAYS: 7,  // Risk factors decay after 7 days
} as const;

export type MfaRiskScores = typeof MFA_RISK_SCORES;
export type MfaRiskFactor = keyof typeof MFA_RISK_SCORES.FACTORS;

// ============================================================
// MFA Setup Requirements by Security Level
// ============================================================
export const MFA_SETUP_REQUIREMENTS = {
  MINIMUM_METHODS: {
    STANDARD: 1,
    ENHANCED: 2,
    HIGH_SECURITY: 2,
    MAXIMUM: 3,
  },
  RECOMMENDED: {
    CUSTOMER: [MFA_PROVIDERS.SMS, MFA_PROVIDERS.TOTP],
    SELLER: [MFA_PROVIDERS.SMS, MFA_PROVIDERS.TOTP, MFA_PROVIDERS.WEBAUTHN],
    ADMIN: [MFA_PROVIDERS.TOTP, MFA_PROVIDERS.WEBAUTHN, MFA_PROVIDERS.HARDWARE_TOKEN],
    SUPER_ADMIN: [MFA_PROVIDERS.WEBAUTHN, MFA_PROVIDERS.HARDWARE_TOKEN, MFA_PROVIDERS.TOTP],
  },
  REQUIRED_PROVIDERS: {
    SUPER_ADMIN: [MFA_PROVIDERS.TOTP, MFA_PROVIDERS.WEBAUTHN],
    ADMIN: [MFA_PROVIDERS.TOTP],
    SELLER: [],
    CUSTOMER: [],
  },
  
  // Setup grace period (days)
  GRACE_PERIOD_DAYS: {
    STANDARD: 7,
    ENHANCED: 3,
    HIGH_SECURITY: 1,
    MAXIMUM: 0,  // Immediate setup required
  },
} as const;

export type MfaSetupRequirements = typeof MFA_SETUP_REQUIREMENTS;
export type MfaSecurityLevel = keyof typeof MFA_SETUP_REQUIREMENTS.MINIMUM_METHODS;
export type MfaUserRole = keyof typeof MFA_SETUP_REQUIREMENTS.RECOMMENDED;

// ============================================================
// MFA Fallback Methods (When primary MFA fails)
// ============================================================
export const MFA_FALLBACKS = {
  ENABLED: true,
  ORDER: [
    MFA_PROVIDERS.BACKUP_CODE,
    MFA_PROVIDERS.SMS_VOICE,
    MFA_PROVIDERS.EMAIL,
    MFA_PROVIDERS.WHATSAPP_OTP,
  ],
  MAX_FALLBACK_ATTEMPTS: 2,
  FALLBACK_COOLDOWN_SECONDS: 3600,
  RECOVERY_REQUIRED_AFTER_FALLBACK: true,
  RECOVERY_METHODS: ['email', 'phone'],
  
  // After fallback, require stronger verification
  REQUIRE_STRONG_VERIFICATION_AFTER_FALLBACK: true,
  STRONG_VERIFICATION_PROVIDERS: [MFA_PROVIDERS.TOTP, MFA_PROVIDERS.WEBAUTHN],
} as const;

export type MfaFallbacks = typeof MFA_FALLBACKS;

// ============================================================
// SIM Swap Detection (Bangladesh specific - Critical)
// ============================================================
export const SIM_SWAP_DETECTION = {
  ENABLED: true,
  CHECK_INTERVAL_SECONDS: 86400,
  ACTIONS: {
    INVALIDATE_SESSION: true,
    REQUIRE_MFA: true,
    REQUIRE_IDENTITY_VERIFICATION: true,
    SEND_ALERT: true,
    TEMPORARY_SUSPEND: true,
  },
  SUSPENSION_DURATION_HOURS: 24,
  TRUSTED_OPERATORS: ['GP', 'ROBI', 'BANGLALINK', 'TELETALK'],
  
  // SIM swap API endpoints (Bangladesh operators)
  API_ENDPOINTS: {
    GP: 'https://api.gp.com.bd/sim/check',
    ROBI: 'https://api.robi.com.bd/sim/check',
    BANGLALINK: 'https://api.banglalink.net/sim/check',
    TELETALK: 'https://api.teletalk.com.bd/sim/check',
  },
  
  // Cache duration for SIM check results
  CACHE_DURATION_SECONDS: 3600,  // 1 hour
} as const;

export type SimSwapDetection = typeof SIM_SWAP_DETECTION;
export type BangladeshMobileOperator = ValueOf<typeof SIM_SWAP_DETECTION.TRUSTED_OPERATORS>;

// ============================================================
// Offline MFA Support (For poor connectivity areas)
// ============================================================
export const OFFLINE_MFA = {
  ENABLED: true,
  OFFLINE_TOTP_COUNT: 20,
  OFFLINE_CODE_LENGTH: 12,
  PRINTABLE_BACKUP: {
    ENABLED: true,
    SIZE: 'A4',
    FORMAT: 'pdf',
    QR_CODE_ON_PRINT: true,
  },
  OFFLINE_VALIDITY_DAYS: 30,
  
  // Offline code format
  OFFLINE_CODE_FORMAT: 'alphanumeric',
  OFFLINE_CODE_SEPARATOR: '-',
  OFFLINE_CODE_SECTIONS: 3,  // e.g., "AB3F-9K2M-X7P9"
  
  // Storage encryption for offline codes
  ENCRYPT_OFFLINE_CODES: true,
  ENCRYPTION_ALGORITHM: 'aes-256-gcm',
} as const;

export type OfflineMfa = typeof OFFLINE_MFA;

// ============================================================
// MFA Events (For audit & monitoring)
// ============================================================
export const MFA_EVENTS = {
  MFA_ENABLED: 'mfa.enabled',
  MFA_DISABLED: 'mfa.disabled',
  MFA_PROVIDER_ADDED: 'mfa.provider.added',
  MFA_PROVIDER_REMOVED: 'mfa.provider.removed',
  MFA_BACKUP_CODES_GENERATED: 'mfa.backup_codes.generated',
  MFA_VERIFICATION_SUCCESS: 'mfa.verification.success',
  MFA_VERIFICATION_FAILED: 'mfa.verification.failed',
  MFA_BACKUP_CODE_USED: 'mfa.backup_code.used',
  MFA_FALLBACK_USED: 'mfa.fallback.used',
  MFA_LOCKED: 'mfa.locked',
  MFA_UNLOCKED: 'mfa.unlocked',
  MFA_ATTEMPTS_EXCEEDED: 'mfa.attempts.exceeded',
  MFA_SIM_SWAP_DETECTED: 'mfa.sim_swap.detected',
  MFA_BYPASS_ADMIN: 'mfa.bypass.admin',
  MFA_EMERGENCY_ACCESS: 'mfa.emergency.access',
} as const;

export type MfaEvent = ValueOf<typeof MFA_EVENTS>;

// ============================================================
// MFA Configuration Presets (For different risk levels)
// ============================================================
export const MFA_PRESETS = {
  LOW: {
    requiredProviders: [],
    verificationTypes: [MFA_VERIFICATION_TYPES.PAYMENT_HIGH_VALUE],
    codeValiditySeconds: 600,
    maxAttempts: 5,
    lockoutDurationSeconds: 600,
  },
  STANDARD: {
    requiredProviders: [MFA_PROVIDERS.SMS],
    verificationTypes: [
      MFA_VERIFICATION_TYPES.PAYMENT_HIGH_VALUE,
      MFA_VERIFICATION_TYPES.PASSWORD_CHANGE,
      MFA_VERIFICATION_TYPES.EMAIL_CHANGE,
    ],
    codeValiditySeconds: 300,
    maxAttempts: 3,
    lockoutDurationSeconds: 900,
  },
  HIGH: {
    requiredProviders: [MFA_PROVIDERS.TOTP, MFA_PROVIDERS.SMS],
    verificationTypes: Object.values(MFA_VERIFICATION_TYPES),
    codeValiditySeconds: 180,
    maxAttempts: 3,
    lockoutDurationSeconds: 1800,
    requireMfaForAllLogins: true,
  },
  MAXIMUM: {
    requiredProviders: [MFA_PROVIDERS.TOTP, MFA_PROVIDERS.WEBAUTHN],
    verificationTypes: Object.values(MFA_VERIFICATION_TYPES),
    codeValiditySeconds: 120,
    maxAttempts: 2,
    lockoutDurationSeconds: 3600,
    requireMfaForAllLogins: true,
    requireReauthEveryHours: 12,
    requireHardwareToken: true,
  },
} as const;

export type MfaPreset = typeof MFA_PRESETS[keyof typeof MFA_PRESETS];
export type MfaPresetName = keyof typeof MFA_PRESETS;

// ============================================================
// MFA Security Metrics (For monitoring)
// ============================================================
export const MFA_METRICS = {
  ENABLED: true,
  
  // Metrics to track
  METRICS: {
    ENABLED_USERS: 'vubon_mfa_enabled_users',
    VERIFICATION_SUCCESS_RATE: 'vubon_mfa_verification_success_rate',
    VERIFICATION_FAILURE_RATE: 'vubon_mfa_verification_failure_rate',
    AVERAGE_VERIFICATION_TIME_MS: 'vubon_mfa_verification_time_ms',
    SMS_SENT_TOTAL: 'vubon_mfa_sms_sent_total',
    WHATSAPP_SENT_TOTAL: 'vubon_mfa_whatsapp_sent_total',
    BACKUP_CODE_USAGE: 'vubon_mfa_backup_code_usage',
    SIM_SWAP_ALERTS: 'vubon_mfa_sim_swap_alerts_total',
  },
  
  // Alert thresholds
  ALERT_THRESHOLDS: {
    HIGH_FAILURE_RATE: 0.15,        // 15% failure rate
    HIGH_SIM_SWAP_RATE: 10,         // 10 SIM swaps per hour
    HIGH_BACKUP_CODE_USAGE: 50,      // 50 backup codes used per hour
  },
} as const;

export type MfaMetrics = typeof MFA_METRICS;

// ============================================================
// Type Exports
// ============================================================
export type MfaProviderValue = ValueOf<typeof MFA_PROVIDERS>;
export type MfaStatusValue = ValueOf<typeof MFA_STATUS>;
export type MfaVerificationTypeValue = ValueOf<typeof MFA_VERIFICATION_TYPES>;
export type MfaPriorityValue = ValueOf<typeof MFA_PRIORITY>;
export type MfaPresetValue = ValueOf<typeof MFA_PRESETS>;
export type MfaEventValue = ValueOf<typeof MFA_EVENTS>;
