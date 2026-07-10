/**
 * Password Reset Constants - Enterprise Grade
 * @module shared-constants/password-reset.constants
 * 
 * @description
 * Centralized password reset configuration for the entire enterprise.
 * Used across all services (auth, user, notification) for password reset flows.
 * 
 * Enterprise Rules:
 * ✅ SINGLE SOURCE OF TRUTH - All password reset configurations
 * ✅ Cross-service consistency
 * ✅ Security-first defaults (short expiry, limited attempts)
 * ✅ Bangladesh specific - SMS, WhatsApp, Voice support
 * ✅ Type-safe exports with const assertions
 * ✅ Framework-free, no external dependencies
 * ✅ Bangladesh Bank compliance (90 days retention for audit)
 * 
 * @example
 * import { PASSWORD_RESET_CONFIG } from '@vubon/shared-constants';
 * 
 * // Use in password reset service
 * const expiryMs = PASSWORD_RESET_CONFIG.EXPIRY_MS;
 * const maxAttempts = PASSWORD_RESET_CONFIG.MAX_VERIFICATION_ATTEMPTS;
 */

// ============================================================
// Password Reset Configuration
// ============================================================
export const PASSWORD_RESET_CONFIG = {
  // ============================================================
  // Token Expiry Configuration
  // ============================================================
  
  /** Expiry hours for reset tokens (24 hours) */
  EXPIRY_HOURS: 24,
  
  /** Expiry minutes for reset tokens (1440 minutes = 24 hours) */
  EXPIRY_MINUTES: 1440,
  
  /** Expiry seconds for reset tokens (86400 seconds = 24 hours) */
  EXPIRY_SECONDS: 86400,
  
  /** Expiry milliseconds for reset tokens (86,400,000 ms = 24 hours) */
  EXPIRY_MS: 24 * 60 * 60 * 1000,
  
  /** Short expiry for OTP (5 minutes) */
  OTP_EXPIRY_SECONDS: 300,
  
  /** Short expiry for OTP (5 minutes) */
  OTP_EXPIRY_MINUTES: 5,
  
  /** Short expiry for OTP (300,000 ms) */
  OTP_EXPIRY_MS: 5 * 60 * 1000,
  
  // ============================================================
  // Rate Limiting Configuration
  // ============================================================
  
  /** Maximum reset requests per day per user (3 requests) */
  MAX_REQUESTS_PER_DAY: 3,
  
  /** Maximum reset requests per day per IP (10 requests) */
  MAX_REQUESTS_PER_IP_PER_DAY: 10,
  
  /** Maximum reset requests per hour per IP (5 requests) */
  MAX_REQUESTS_PER_IP_PER_HOUR: 5,
  
  /** Cooldown minutes between requests (15 minutes) */
  COOLDOWN_MINUTES: 15,
  
  /** Cooldown seconds between requests (900 seconds) */
  COOLDOWN_SECONDS: 900,
  
  /** Cooldown milliseconds between requests (900,000 ms) */
  COOLDOWN_MS: 15 * 60 * 1000,
  
  // ============================================================
  // Verification Attempts Configuration
  // ============================================================
  
  /** Maximum verification attempts before lockout (3 attempts) */
  MAX_VERIFICATION_ATTEMPTS: 3,
  
  /** Lockout minutes after max attempts (15 minutes) */
  LOCKOUT_MINUTES: 15,
  
  /** Lockout seconds after max attempts (900 seconds) */
  LOCKOUT_SECONDS: 900,
  
  /** Lockout milliseconds after max attempts (900,000 ms) */
  LOCKOUT_MS: 15 * 60 * 1000,
  
  /** Require CAPTCHA after failed attempts (2 attempts) */
  CAPTCHA_REQUIRED_AFTER_ATTEMPTS: 2,
  
  // ============================================================
  // Token Configuration
  // ============================================================
  
  /** Reset token length (64 characters for security) */
  TOKEN_LENGTH: 64,
  
  /** OTP code length (6 digits) */
  OTP_LENGTH: 6,
  
  /** OTP code pattern (digits only) */
  OTP_PATTERN: /^\d{6}$/,
  
  /** Token allowed characters (URL-safe base64) */
  TOKEN_ALLOWED_CHARS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
  
  /** Enable concurrent requests (false - block multiple pending requests) */
  ALLOW_CONCURRENT_REQUESTS: false,
  
  /** Maximum concurrent pending requests (1) */
  MAX_CONCURRENT_PENDING: 1,
  
  // ============================================================
  // Channel Configuration
  // ============================================================
  
  /** Enable email reset (default) */
  ENABLE_EMAIL_RESET: true,
  
  /** Enable SMS reset (Bangladesh specific) */
  ENABLE_SMS_RESET: true,
  
  /** Enable WhatsApp reset (Bangladesh specific) */
  ENABLE_WHATSAPP_RESET: true,
  
  /** Enable Voice reset (Bangladesh specific - feature phones) */
  ENABLE_VOICE_RESET: true,
  
  /** Default reset channel order */
  DEFAULT_CHANNEL_ORDER: ['email', 'sms', 'whatsapp', 'voice'] as const,
  
  /** WhatsApp template name */
  WHATSAPP_TEMPLATE_NAME: 'vubon_password_reset',
  
  /** WhatsApp language (Bengali default for BD) */
  WHATSAPP_LANGUAGE: 'bn',
  
  // ============================================================
  // Template Configuration - English
  // ============================================================
  
  /** Email subject (English) */
  EMAIL_SUBJECT: 'Password Reset Request - Vubon',
  
  /** Email template (English) - {link} and {expiry} placeholders */
  EMAIL_TEMPLATE: 'Click the link below to reset your password: {link}. This link is valid for {expiry} hours.',
  
  /** SMS template (English) - {code} and {expiry} placeholders */
  SMS_TEMPLATE: 'Your password reset OTP is: {code}. Valid for {expiry} minutes.',
  
  /** WhatsApp template (English) - {code} and {expiry} placeholders */
  WHATSAPP_TEMPLATE_EN: 
    `🔐 *Vubon Password Reset*\n\n` +
    `Your OTP is: *{code}*\n` +
    `Valid for {expiry} minutes.\n\n` +
    `Never share this code with anyone.\n\n` +
    `- Vubon Team`,
  
  /** Voice template (English) - {code} and {expiry} placeholders */
  VOICE_TEMPLATE: 'Your password reset OTP is {code}. This code is valid for {expiry} minutes.',
  
  // ============================================================
  // Template Configuration - Bengali (Bangladesh specific)
  // ============================================================
  
  /** Email subject (Bengali) */
  EMAIL_SUBJECT_BN: 'পাসওয়ার্ড রিসেট অনুরোধ - ভুবন',
  
  /** Email template (Bengali) - {link} and {expiry} placeholders */
  EMAIL_TEMPLATE_BN: 'আপনার পাসওয়ার্ড রিসেট করতে নিচের লিঙ্কে ক্লিক করুন: {link}। এই লিঙ্ক {expiry} ঘন্টার জন্য বৈধ।',
  
  /** SMS template (Bengali) - {code} and {expiry} placeholders */
  SMS_TEMPLATE_BN: 'আপনার পাসওয়ার্ড রিসেট OTP: {code}। বৈধতা {expiry} মিনিট।',
  
  /** WhatsApp template (Bengali) - {code} and {expiry} placeholders */
  WHATSAPP_TEMPLATE_BN: 
    `🔐 *ভুবন পাসওয়ার্ড রিসেট*\n\n` +
    `আপনার OTP: *{code}*\n` +
    `বৈধতা {expiry} মিনিট।\n\n` +
    `এই কোড কখনো কারো সাথে শেয়ার করবেন না।\n\n` +
    `- ভুবন টিম`,
  
  /** Voice template (Bengali) - {code} and {expiry} placeholders */
  VOICE_TEMPLATE_BN: 'আপনার পাসওয়ার্ড রিসেট OTP {code}। এই কোড {expiry} মিনিটের জন্য বৈধ।',
  
  // ============================================================
  // Security Configuration
  // ============================================================
  
  /** Require HTTPS for callback URLs */
  REQUIRE_HTTPS_CALLBACK: true,
  
  /** Enforce same device for reset */
  ENFORCE_SAME_DEVICE: true,
  
  /** Enforce same IP for reset (recommended: false for mobile users) */
  ENFORCE_SAME_IP: false,
  
  /** Maximum clock skew seconds (for OTP validation) */
  MAX_CLOCK_SKEW_SECONDS: 60,
  
  /** Minimum time between requests (30 seconds) */
  MIN_TIME_BETWEEN_REQUESTS_SECONDS: 30,
  
  /** Block suspicious IPs after attempts (10 attempts) */
  BLOCK_IP_AFTER_ATTEMPTS: 10,
  
  /** Block suspicious IPs duration minutes (60 minutes) */
  BLOCK_IP_DURATION_MINUTES: 60,
  
  // ============================================================
  // Cleanup & Retention Configuration
  // ============================================================
  
  /** Retention days for expired requests (30 days) */
  RETENTION_DAYS: 30,
  
  /** Retention days for failed requests (7 days) */
  FAILED_RETENTION_DAYS: 7,
  
  /** Bangladesh Bank compliance retention (90 days for audit) */
  BD_BANK_COMPLIANCE_RETENTION_DAYS: 90,
  
  /** Cleanup batch size (100 records per batch) */
  CLEANUP_BATCH_SIZE: 100,
  
  /** Cleanup interval hours (24 hours) */
  CLEANUP_INTERVAL_HOURS: 24,
  
  /** Archive expired requests after (7 days) */
  ARCHIVE_AFTER_DAYS: 7,
  
  // ============================================================
  // Audit & Monitoring Configuration
  // ============================================================
  
  /** Enable audit logging */
  ENABLE_AUDIT_LOGGING: true,
  
  /** Log all reset attempts */
  LOG_ALL_ATTEMPTS: true,
  
  /** Log suspicious activities */
  LOG_SUSPICIOUS_ACTIVITIES: true,
  
  /** Alert after failed attempts (3 attempts) */
  ALERT_AFTER_FAILED_ATTEMPTS: 3,
  
  /** Alert on suspicious pattern detection */
  ALERT_ON_SUSPICIOUS_PATTERN: true,
  
  /** Alert on concurrent request block */
  ALERT_ON_CONCURRENT_BLOCK: true,
  
  /** Email for security alerts */
  ALERT_EMAIL: 'security@vubon.com.bd',
  
  /** Slack webhook for alerts */
  ALERT_SLACK_WEBHOOK: process.env['SLACK_ALERTS_WEBHOOK'] || '',
  
  // ============================================================
  // Bangladesh Specific Configuration
  // ============================================================
  
  /** Enable Bangladesh specific features */
  ENABLE_BANGLADESH_SPECIFIC: true,
  
  /** Support Bengali language */
  SUPPORT_BENGALI: true,
  
  /** Default language for Bangladesh users */
  DEFAULT_LANGUAGE_BD: 'bn',
  
  /** Support feature phones (voice OTP) */
  SUPPORT_FEATURE_PHONES: true,
  
  /** Support WhatsApp (high penetration in BD) */
  SUPPORT_WHATSAPP_BD: true,
  
  /** Bangladesh timezone */
  TIMEZONE_BD: 'Asia/Dhaka',
  
  /** Bangladesh Bank compliance (90 days retention) */
  BD_BANK_COMPLIANCE_ENABLED: true,
  
  /** Bangladesh Bank audit retention (90 days) */
  BD_BANK_AUDIT_RETENTION_DAYS: 90,
  
  // ============================================================
  // Advanced Security Configuration
  // ============================================================
  
  /** Enable ML-based fraud detection */
  ENABLE_ML_FRAUD_DETECTION: true,
  
  /** Enable geographic tracking for suspicious resets */
  ENABLE_GEOGRAPHIC_TRACKING: true,
  
  /** Enable device fingerprint tracking */
  ENABLE_DEVICE_TRACKING: true,
  
  /** Fraud score threshold for blocking (70) */
  FRAUD_SCORE_BLOCK_THRESHOLD: 70,
  
  /** Fraud score threshold for challenge (50) */
  FRAUD_SCORE_CHALLENGE_THRESHOLD: 50,
  
  /** Suspicious pattern detection window minutes (15 minutes) */
  SUSPICIOUS_WINDOW_MINUTES: 15,
  
  /** Maximum fraud escalations per hour (3) */
  MAX_FRAUD_ESCALATIONS_PER_HOUR: 3,
  
  /** Risk history retention (100 entries) */
  RISK_HISTORY_RETENTION: 100,
} as const;

// ============================================================
// Channel Order Types
// ============================================================

/**
 * Reset channel types
 */
export type ResetChannel = 'email' | 'sms' | 'whatsapp' | 'voice';

/**
 * Default channel order from config
 */
export type PasswordDefaultChannelOrder = typeof PASSWORD_RESET_CONFIG.DEFAULT_CHANNEL_ORDER;

// ============================================================
// Type Exports
// ============================================================

/**
 * Type-safe PasswordResetConfig type
 */
export type PasswordResetConfig = typeof PASSWORD_RESET_CONFIG;

/**
 * Password reset configuration keys
 */
export type PasswordResetConfigKey = keyof PasswordResetConfig;

// ============================================================
// Utility Types
// ============================================================

/**
 * Configuration options for password reset
 */
export interface PasswordResetOptions {
  /** Expiry hours for the reset token */
  expiryHours?: number;
  
  /** Maximum resend attempts */
  maxRequestsPerDay?: number;
  
  /** Maximum verification attempts */
  maxVerificationAttempts?: number;
  
  /** Notification channel to use */
  channel?: ResetChannel;
  
  /** Language (en or bn) */
  language?: 'en' | 'bn';
  
  /** Allow concurrent requests */
  allowConcurrent?: boolean;
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get expiry in milliseconds
 * @param expiryHours - Custom expiry hours (default: from config)
 * @returns Expiry in milliseconds
 */
export const getResetExpiryMs = (expiryHours?: number): number => {
  const hours = expiryHours ?? PASSWORD_RESET_CONFIG.EXPIRY_HOURS;
  return hours * 60 * 60 * 1000;
};

/**
 * Get OTP expiry in milliseconds
 * @param expiryMinutes - Custom expiry minutes (default: 5)
 * @returns OTP expiry in milliseconds
 */
export const getOtpExpiryMs = (expiryMinutes?: number): number => {
  const minutes = expiryMinutes ?? PASSWORD_RESET_CONFIG.OTP_EXPIRY_MINUTES;
  return minutes * 60 * 1000;
};

/**
 * Get cooldown in milliseconds
 * @param cooldownMinutes - Custom cooldown minutes (default: from config)
 * @returns Cooldown in milliseconds
 */
export const PasswordgetCooldownMs = (cooldownMinutes?: number): number => {
  const minutes = cooldownMinutes ?? PASSWORD_RESET_CONFIG.COOLDOWN_MINUTES;
  return minutes * 60 * 1000;
};

/**
 * Check if channel is supported
 * @param channel - Reset channel
 * @returns True if channel is supported
 */
export const isResetChannelSupported = (channel: ResetChannel): boolean => {
  switch (channel) {
    case 'email':
      return PASSWORD_RESET_CONFIG.ENABLE_EMAIL_RESET;
    case 'sms':
      return PASSWORD_RESET_CONFIG.ENABLE_SMS_RESET;
    case 'whatsapp':
      return PASSWORD_RESET_CONFIG.ENABLE_WHATSAPP_RESET;
    case 'voice':
      return PASSWORD_RESET_CONFIG.ENABLE_VOICE_RESET;
    default:
      return false;
  }
};

/**
 * Get template for channel and language
 * @param channel - Reset channel
 * @param language - Language (en or bn)
 * @returns Template string with placeholders
 */
export const getResetTemplate = (
  channel: ResetChannel,
  language: 'en' | 'bn' = 'en'
): string => {
  if (channel === 'whatsapp') {
    return language === 'bn' 
      ? PASSWORD_RESET_CONFIG.WHATSAPP_TEMPLATE_BN
      : PASSWORD_RESET_CONFIG.WHATSAPP_TEMPLATE_EN;
  }
  
  if (channel === 'sms') {
    return language === 'bn'
      ? PASSWORD_RESET_CONFIG.SMS_TEMPLATE_BN
      : PASSWORD_RESET_CONFIG.SMS_TEMPLATE;
  }
  
  if (channel === 'voice') {
    return language === 'bn'
      ? PASSWORD_RESET_CONFIG.VOICE_TEMPLATE_BN
      : PASSWORD_RESET_CONFIG.VOICE_TEMPLATE;
  }
  
  // Email
  return language === 'bn'
    ? PASSWORD_RESET_CONFIG.EMAIL_TEMPLATE_BN
    : PASSWORD_RESET_CONFIG.EMAIL_TEMPLATE;
};

/**
 * Get email subject for language
 * @param language - Language (en or bn)
 * @returns Email subject
 */
export const getResetEmailSubject = (language: 'en' | 'bn' = 'en'): string => {
  return language === 'bn'
    ? PASSWORD_RESET_CONFIG.EMAIL_SUBJECT_BN
    : PASSWORD_RESET_CONFIG.EMAIL_SUBJECT;
};

/**
 * Check if feature is enabled
 * @param feature - Feature name
 * @returns True if feature is enabled
 */
export const isResetFeatureEnabled = (feature: keyof PasswordResetConfig): boolean => {
  const value = PASSWORD_RESET_CONFIG[feature];
  return typeof value === 'boolean' ? value : false;
};

/**
 * Get configured rate limit
 * @param type - Rate limit type ('day' or 'ip')
 * @returns Rate limit value
 */
export const getResetRateLimit = (type: 'day' | 'ip'): number => {
  switch (type) {
    case 'day':
      return PASSWORD_RESET_CONFIG.MAX_REQUESTS_PER_DAY;
    case 'ip':
      return PASSWORD_RESET_CONFIG.MAX_REQUESTS_PER_IP_PER_DAY;
    default:
      return PASSWORD_RESET_CONFIG.MAX_REQUESTS_PER_DAY;
  }
};

/**
 * Check if concurrent requests are allowed
 * @returns True if concurrent requests are allowed
 */
export const isConcurrentResetAllowed = (): boolean => {
  return PASSWORD_RESET_CONFIG.ALLOW_CONCURRENT_REQUESTS;
};

/**
 * Get lockout duration in milliseconds
 * @returns Lockout duration in milliseconds
 */
export const getResetLockoutMs = (): number => {
  return PASSWORD_RESET_CONFIG.LOCKOUT_MS;
};

/**
 * Format template with placeholders
 * @param template - Template string with {placeholders}
 * @param placeholders - Object with placeholder values
 * @returns Formatted string
 */
export const formatResetTemplate = (
  template: string,
  placeholders: Record<string, string | number>
): string => {
  let result = template;
  for (const [key, value] of Object.entries(placeholders)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return result;
};

// ============================================================
// Default Export
// ============================================================

export default {
  PASSWORD_RESET_CONFIG,
  getResetExpiryMs,
  getOtpExpiryMs,
  PasswordgetCooldownMs,
  isResetChannelSupported,
  getResetTemplate,
  getResetEmailSubject,
  isResetFeatureEnabled,
  getResetRateLimit,
  isConcurrentResetAllowed,
  getResetLockoutMs,
  formatResetTemplate,
};


// ============================================================
// Reset Methods (Bangladesh specific)
// ============================================================
export const PASSWORD_RESET_METHODS = {
  /** Email-based password reset */
  EMAIL: 'email',
  /** SMS-based password reset (Bangladesh primary) */
  SMS: 'sms',
  /** WhatsApp-based password reset (Bangladesh specific) */
  WHATSAPP: 'whatsapp',
  /** Voice call OTP (for feature phones) */
  VOICE: 'voice',
} as const;

export type ResetMethod = typeof PASSWORD_RESET_METHODS[keyof typeof PASSWORD_RESET_METHODS];

// ============================================================
// Reset Configuration
// ============================================================
export const RESET_CONFIG = {
  /** Token expiry in minutes (Bangladesh Bank: 30 minutes) */
  TOKEN_EXPIRY_MINUTES: 30,
  
  /** Maximum reset requests per day (3 per day) */
  MAX_REQUESTS_PER_DAY: 3,
  
  /** Cooldown between requests (15 minutes) */
  COOLDOWN_MINUTES: 15,
  
  /** Maximum verification attempts (3 attempts) */
  MAX_VERIFICATION_ATTEMPTS: 3,
  
  /** OTP expiry in seconds (5 minutes) */
  OTP_EXPIRY_SECONDS: 300,
  
  /** Token length for reset links */
  TOKEN_LENGTH: 64,
  
  /** OTP length (6 digits) */
  OTP_LENGTH: 6,
} as const;

// ============================================================
// Password Strength Message (English & Bengali)
// ============================================================
export const STRONG_PASSWORD_MESSAGE = 
  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';

export const STRONG_PASSWORD_MESSAGE_BN = 
  'পাসওয়ার্ডে কমপক্ষে একটি বড় হাতের অক্ষর, একটি ছোট হাতের অক্ষর, একটি সংখ্যা এবং একটি বিশেষ অক্ষর থাকতে হবে';

// ============================================================
// Reset Error Codes
// ============================================================
export const RESET_ERROR_CODES = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PHONE: 'INVALID_PHONE',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_ALREADY_USED: 'TOKEN_ALREADY_USED',
  RATE_LIMITED: 'RATE_LIMITED',
  TOO_MANY_ATTEMPTS: 'TOO_MANY_ATTEMPTS',
  PASSWORD_TOO_WEAK: 'PASSWORD_TOO_WEAK',
  PASSWORD_REUSED: 'PASSWORD_REUSED',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  INVALID_OTP: 'INVALID_OTP',
  OTP_EXPIRED: 'OTP_EXPIRED',
} as const;

export type ResetErrorCode = typeof RESET_ERROR_CODES[keyof typeof RESET_ERROR_CODES];

// ============================================================
// Reset Status Types
// ============================================================
export const RESET_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export type ResetStatus = typeof RESET_STATUS[keyof typeof RESET_STATUS];

// ============================================================
// Reset Channel Configuration
// ============================================================
export const RESET_CHANNEL_CONFIG = {
  [PASSWORD_RESET_METHODS.EMAIL]: {
    priority: 1,
    requiresInternet: true,
    requiresEmail: true,
    bangladeshSupport: 'full' as const,
  },
  [PASSWORD_RESET_METHODS.SMS]: {
    priority: 2,
    requiresInternet: false,
    requiresPhone: true,
    bangladeshSupport: 'full' as const,
  },
  [PASSWORD_RESET_METHODS.WHATSAPP]: {
    priority: 3,
    requiresInternet: true,
    requiresPhone: true,
    bangladeshSupport: 'full' as const,
  },
  [PASSWORD_RESET_METHODS.VOICE]: {
    priority: 4,
    requiresInternet: false,
    requiresPhone: true,
    bangladeshSupport: 'full' as const,
  },
} as const;

export type ResetChannelConfig = typeof RESET_CHANNEL_CONFIG;



// ============================================================
// Token Patterns
// ============================================================
export const TOKEN_PATTERNS = {
  /** JWT Token Pattern (RFC 7519 compliant) */
  JWT: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
  
  /** Reset Token Pattern (32+ characters, URL-safe) */
  RESET_TOKEN: /^[a-zA-Z0-9\-_]{32,128}$/,
  
  /** OTP Code Pattern (6 digits) */
  OTP_CODE: /^\d{6}$/,
  
  /** Magic Link Token (64+ characters, URL-safe) */
  MAGIC_LINK: /^[a-zA-Z0-9\-_]{64,}$/,
  
  /** Refresh Token Pattern (32+ characters, URL-safe) */
  REFRESH_TOKEN: /^[a-zA-Z0-9\-_]{32,128}$/,
  
  /** Access Token Pattern (JWT or base64url) */
  ACCESS_TOKEN: /^[A-Za-z0-9\-_]{20,}$/,
  
  /** API Key Pattern (starts with 'vub_') */
  API_KEY: /^vub_[a-zA-Z0-9\-_]{32,}$/,
  
  /** Session Token Pattern (URL-safe) */
  SESSION_TOKEN: /^[a-zA-Z0-9\-_]{32,}$/,
  
  /** CSRF Token Pattern (URL-safe) */
  CSRF_TOKEN: /^[a-zA-Z0-9\-_]{32,}$/,
  
  /** Device Token Pattern (starts with 'dev_') */
  DEVICE_TOKEN: /^dev_[a-zA-Z0-9\-_]{32,}$/,
} as const;

export type TokenPattern = typeof TOKEN_PATTERNS[keyof typeof TOKEN_PATTERNS];

// ============================================================
// Token Length Configuration
// ============================================================
export const TOKEN_LENGTH_CONFIG = {
  /** Minimum JWT length (including header and payload) */
  JWT_MIN_LENGTH: 20,
  
  /** Maximum JWT length */
  JWT_MAX_LENGTH: 2048,
  
  /** Reset token length */
  RESET_TOKEN_LENGTH: 64,
  
  /** OTP length */
  OTP_LENGTH: 6,
  
  /** Magic link length */
  MAGIC_LINK_LENGTH: 64,
  
  /** Refresh token length */
  REFRESH_TOKEN_LENGTH: 64,
  
  /** API key length (without prefix) */
  API_KEY_LENGTH: 32,
  
  /** CSRF token length */
  CSRF_TOKEN_LENGTH: 32,
} as const;

// ============================================================
// Token Expiry Configuration
// ============================================================
export const TOKEN_EXPIRY_CONFIG = {
  /** Access token expiry (15 minutes) */
  ACCESS_TOKEN_EXPIRY_SECONDS: 900,
  
  /** Refresh token expiry (7 days) */
  REFRESH_TOKEN_EXPIRY_SECONDS: 604800,
  
  /** Reset token expiry (30 minutes) */
  RESET_TOKEN_EXPIRY_SECONDS: 1800,
  
  /** OTP expiry (5 minutes) */
  OTP_EXPIRY_SECONDS: 300,
  
  /** Magic link expiry (5 minutes) */
  MAGIC_LINK_EXPIRY_SECONDS: 300,
  
  /** API key expiry (1 year) */
  API_KEY_EXPIRY_SECONDS: 31536000,
  
  /** CSRF token expiry (1 hour) */
  CSRF_TOKEN_EXPIRY_SECONDS: 3600,
  
  /** Email verification token expiry (24 hours) */
  EMAIL_VERIFICATION_EXPIRY_SECONDS: 86400,
  
  /** Phone verification token expiry (5 minutes) */
  PHONE_VERIFICATION_EXPIRY_SECONDS: 300,
} as const;

export type TokenExpiryConfig = typeof TOKEN_EXPIRY_CONFIG;

