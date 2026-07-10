/**
 * Email Verification Constants - Enterprise Grade
 * @module shared-constants/email-verification.constants
 * 
 * @description
 * Centralized email verification configuration for the entire enterprise.
 * Used across all services (auth, user, notification) for email verification.
 * 
 * Enterprise Rules:
 * ✅ SINGLE SOURCE OF TRUTH - All email verification configurations
 * ✅ Cross-service consistency
 * ✅ Environment-aware defaults
 * ✅ Security-first defaults (short expiry, limited attempts)
 * ✅ Bangladesh specific - WhatsApp support
 * ✅ Type-safe exports with const assertions
 * ✅ Framework-free, no external dependencies
 * 
 * @example
 * import { EMAIL_VERIFICATION_CONFIG } from '@vubon/shared-constants';
 * 
 * // Use in email verification service
 * const expiryMs = EMAIL_VERIFICATION_CONFIG.EXPIRY_MS;
 * const maxAttempts = EMAIL_VERIFICATION_CONFIG.MAX_VERIFICATION_ATTEMPTS;
 */

// ============================================================
// Email Verification Configuration
// ============================================================
export const EMAIL_VERIFICATION_CONFIG = {
  // ============================================================
  // Expiry Configuration
  // ============================================================
  
  /** Expiry hours for verification tokens (24 hours default) */
  EXPIRY_HOURS: 24,
  
  /** Expiry minutes for verification tokens (1440 minutes = 24 hours) */
  EXPIRY_MINUTES: 1440,
  
  /** Expiry seconds for verification tokens (86400 seconds = 24 hours) */
  EXPIRY_SECONDS: 86400,
  
  /** Expiry milliseconds for verification tokens (86,400,000 ms = 24 hours) */
  EXPIRY_MS: 24 * 60 * 60 * 1000,
  
  // ============================================================
  // Resend Configuration
  // ============================================================
  
  /** Maximum resend attempts per verification request */
  MAX_RESEND_COUNT: 3,
  
  /** Resend cooldown minutes (2 minutes between resends) */
  RESEND_COOLDOWN_MINUTES: 2,
  
  /** Resend cooldown seconds (120 seconds between resends) */
  RESEND_COOLDOWN_SECONDS: 120,
  
  /** Resend cooldown milliseconds (120,000 ms between resends) */
  RESEND_COOLDOWN_MS: 2 * 60 * 1000,
  
  // ============================================================
  // Verification Attempts Configuration
  // ============================================================
  
  /** Maximum verification attempts before lock/expiry */
  MAX_VERIFICATION_ATTEMPTS: 3,
  
  /** Maximum failed attempts before rate limiting (5 attempts) */
  MAX_FAILED_ATTEMPTS: 5,
  
  /** Lockout duration minutes after max attempts (15 minutes) */
  LOCKOUT_DURATION_MINUTES: 15,
  
  /** Lockout duration seconds after max attempts (900 seconds) */
  LOCKOUT_DURATION_SECONDS: 900,
  
  // ============================================================
  // Magic Link Configuration
  // ============================================================
  
  /** Enable magic link support (passwordless verification) */
  ENABLE_MAGIC_LINK: true,
  
  /** Magic link expiry minutes (5 minutes for security) */
  MAGIC_LINK_EXPIRY_MINUTES: 5,
  
  /** Magic link expiry seconds (300 seconds for security) */
  MAGIC_LINK_EXPIRY_SECONDS: 300,
  
  /** Magic link expiry milliseconds (300,000 ms for security) */
  MAGIC_LINK_EXPIRY_MS: 5 * 60 * 1000,
  
  /** Magic link token length (64 characters) */
  MAGIC_LINK_TOKEN_LENGTH: 64,
  
  /** Magic link allowed characters (URL-safe base64) */
  MAGIC_LINK_ALLOWED_CHARS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
  
  // ============================================================
  // OTP Code Configuration
  // ============================================================
  
  /** Verification code length (6 digits) */
  CODE_LENGTH: 6,
  
  /** Verification code pattern (digits only) */
  CODE_PATTERN: /^\d{6}$/,
  
  /** OTP expiry seconds (5 minutes for security) */
  OTP_EXPIRY_SECONDS: 300,
  
  /** OTP expiry minutes (5 minutes) */
  OTP_EXPIRY_MINUTES: 5,
  
  /** OTP resend cooldown seconds (30 seconds) */
  OTP_RESEND_COOLDOWN_SECONDS: 30,
  
  // ============================================================
  // Rate Limiting Configuration
  // ============================================================
  
  /** Rate limit per hour per user (5 requests per hour) */
  RATE_LIMIT_PER_HOUR: 5,
  
  /** Rate limit per day per user (20 requests per day) */
  RATE_LIMIT_PER_DAY: 20,
  
  /** Rate limit per user per verification (3 attempts) */
  RATE_LIMIT_PER_VERIFICATION: 3,
  
  /** Rate limit cooldown seconds after limit reached (1 hour) */
  RATE_LIMIT_COOLDOWN_SECONDS: 3600,
  
  /** Rate limit window in seconds (3600 seconds = 1 hour) */
  RATE_LIMIT_WINDOW_SECONDS: 3600,
  
  // ============================================================
  // Channel Configuration
  // ============================================================
  
  /** Enable WhatsApp notifications (Bangladesh specific) */
  ENABLE_WHATSAPP_NOTIFICATION: true,
  
  /** Enable SMS notifications (fallback) */
  ENABLE_SMS_NOTIFICATION: true,
  
  /** Enable Email notifications (primary) */
  ENABLE_EMAIL_NOTIFICATION: true,
  
  /** Enable Voice call notifications (feature phones - Bangladesh) */
  ENABLE_VOICE_NOTIFICATION: true,
  
  /** Default notification channel order */
  DEFAULT_CHANNEL_ORDER: ['email', 'whatsapp', 'sms', 'voice'] as const,
  
  // ============================================================
  // Template Configuration
  // ============================================================
  
  /** Default email subject (English) */
  DEFAULT_EMAIL_SUBJECT: 'Verify Your Email Address - Vubon',
  
  /** Default email subject (Bengali) */
  DEFAULT_EMAIL_SUBJECT_BN: 'আপনার ইমেইল ঠিকানা যাচাই করুন - ভুবন',
  
  /** Default SMS template */
  DEFAULT_SMS_TEMPLATE: 'Your Vubon verification code is: {code}. Valid for {expiry} minutes.',
  
  /** Default SMS template (Bengali) */
  DEFAULT_SMS_TEMPLATE_BN: 'আপনার ভুবন যাচাইকরণ কোড: {code}। বৈধতা {expiry} মিনিট।',
  
  /** Default WhatsApp template name */
  DEFAULT_WHATSAPP_TEMPLATE: 'vubon_email_verification',
  
  /** Default WhatsApp language */
  DEFAULT_WHATSAPP_LANGUAGE: 'bn',
  
  /** Default WhatsApp template (English) */
  DEFAULT_WHATSAPP_TEMPLATE_EN: `🔐 *Vubon Email Verification*\n\nYour verification code is: *{code}*\nValid for {expiry} minutes.\n\nNever share this code with anyone.\n\n- Vubon Team`,
  
  /** Default WhatsApp template (Bengali) */
  DEFAULT_WHATSAPP_TEMPLATE_BN: `🔐 *ভুবন ইমেইল যাচাইকরণ*\n\nআপনার যাচাইকরণ কোড: *{code}*\nবৈধতা {expiry} মিনিট।\n\nএই কোড কখনো কারো সাথে শেয়ার করবেন না।\n\n- ভুবন টিম`,
  
  /** Default Voice message template */
  DEFAULT_VOICE_TEMPLATE: 'Your Vubon verification code is {code}. This code is valid for {expiry} minutes.',
  
  /** Default Voice message template (Bengali) */
  DEFAULT_VOICE_TEMPLATE_BN: 'আপনার ভুবন যাচাইকরণ কোড {code}। এই কোড {expiry} মিনিটের জন্য বৈধ।',
  
  // ============================================================
  // Security Configuration
  // ============================================================
  
  /** Minimum time between verification requests (30 seconds) */
  MIN_TIME_BETWEEN_REQUESTS_SECONDS: 30,
  
  /** Maximum allowed clock skew seconds (for OTP validation) */
  MAX_CLOCK_SKEW_SECONDS: 60,
  
  /** Require CAPTCHA after failed attempts (2 attempts) */
  CAPTCHA_REQUIRED_AFTER_ATTEMPTS: 2,
  
  /** Enforce same device for verification */
  ENFORCE_SAME_DEVICE: true,
  
  /** Enforce same IP for verification (recommended: false for mobile users) */
  ENFORCE_SAME_IP: false,
  
  /** Allow verification from different browser */
  ALLOW_DIFFERENT_BROWSER: true,
  
  /** Require HTTPS for callback URLs */
  REQUIRE_HTTPS_CALLBACK: true,
  
  // ============================================================
  // Cleanup Configuration
  // ============================================================
  
  /** Retention days for expired verifications (30 days) */
  RETENTION_DAYS: 30,
  
  /** Retention days for failed verifications (7 days) */
  FAILED_RETENTION_DAYS: 7,
  
  /** Cleanup batch size (100 records per batch) */
  CLEANUP_BATCH_SIZE: 100,
  
  /** Cleanup interval hours (24 hours) */
  CLEANUP_INTERVAL_HOURS: 24,
  
  /** Archive expired verifications after (7 days) */
  ARCHIVE_AFTER_DAYS: 7,
  
  // ============================================================
  // Audit & Monitoring Configuration
  // ============================================================
  
  /** Enable audit logging */
  ENABLE_AUDIT_LOGGING: true,
  
  /** Log all verification attempts */
  LOG_ALL_ATTEMPTS: true,
  
  /** Log suspicious activities */
  LOG_SUSPICIOUS_ACTIVITIES: true,
  
  /** Alert after failed attempts (3 attempts) */
  ALERT_AFTER_FAILED_ATTEMPTS: 3,
  
  /** Alert after suspicious pattern detected */
  ALERT_ON_SUSPICIOUS_PATTERN: true,
  
  /** Email for audit alerts */
  ALERT_EMAIL: 'security@vubon.com.bd',
  
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
  
  /** Support bKash verification (future) */
  SUPPORT_BKASH_VERIFICATION: false,
  
  /** Support Nagad verification (future) */
  SUPPORT_NAGAD_VERIFICATION: false,
  
  /** Bangladesh bank compliance (90 days retention for audit) */
  BD_BANK_COMPLIANCE_RETENTION_DAYS: 90,
} as const;

// ============================================================
// Channel Order Types
// ============================================================

/**
 * Email verification notification channel types
 */
export type EmailVerificationChannel = 'email' | 'whatsapp' | 'sms' | 'voice';

/**
 * Default channel order from config
 */
export type DefaultChannelOrder = typeof EMAIL_VERIFICATION_CONFIG.DEFAULT_CHANNEL_ORDER;

// ============================================================
// Type Exports
// ============================================================

/**
 * Type-safe EmailVerificationConfig type
 */
export type EmailVerificationConfig = typeof EMAIL_VERIFICATION_CONFIG;

/**
 * Email verification configuration keys
 */
export type EmailVerificationConfigKey = keyof EmailVerificationConfig;

// ============================================================
// Utility Types
// ============================================================

/**
 * Configuration options for email verification
 */
export interface EmailVerificationOptions {
  /** Expiry minutes for the verification */
  expiryMinutes?: number;
  
  /** Maximum resend attempts */
  maxResendCount?: number;
  
  /** Maximum verification attempts */
  maxVerificationAttempts?: number;
  
  /** Notification channel to use */
  channel?: EmailVerificationChannel;
  
  /** Enable magic link */
  enableMagicLink?: boolean;
  
  /** Language (en or bn) */
  language?: 'en' | 'bn';
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get expiry in milliseconds
 * @param expiryMinutes - Custom expiry minutes (default: from config)
 * @returns Expiry in milliseconds
 */
export const getExpiryMs = (expiryMinutes?: number): number => {
  const minutes = expiryMinutes ?? EMAIL_VERIFICATION_CONFIG.EXPIRY_MINUTES;
  return minutes * 60 * 1000;
};

/**
 * Get cooldown in milliseconds
 * @param cooldownMinutes - Custom cooldown minutes (default: from config)
 * @returns Cooldown in milliseconds
 */
export const getCooldownMs = (cooldownMinutes?: number): number => {
  const minutes = cooldownMinutes ?? EMAIL_VERIFICATION_CONFIG.RESEND_COOLDOWN_MINUTES;
  return minutes * 60 * 1000;
};

/**
 * Check if channel is supported
 * @param channel - Notification channel
 * @returns True if channel is supported
 */
export const isChannelSupported = (channel: EmailVerificationChannel): boolean => {
  switch (channel) {
    case 'email':
      return EMAIL_VERIFICATION_CONFIG.ENABLE_EMAIL_NOTIFICATION;
    case 'whatsapp':
      return EMAIL_VERIFICATION_CONFIG.ENABLE_WHATSAPP_NOTIFICATION;
    case 'sms':
      return EMAIL_VERIFICATION_CONFIG.ENABLE_SMS_NOTIFICATION;
    case 'voice':
      return EMAIL_VERIFICATION_CONFIG.ENABLE_VOICE_NOTIFICATION;
    default:
      return false;
  }
};



/**
 * Check if feature is enabled
 * @param feature - Feature name
 * @returns True if feature is enabled
 */
export const isFeatureEnabled = (feature: keyof EmailVerificationConfig): boolean => {
  const value = EMAIL_VERIFICATION_CONFIG[feature];
  return typeof value === 'boolean' ? value : false;
};

/**
 * Get configured rate limit
 * @param type - Rate limit type ('hour', 'day', 'verification')
 * @returns Rate limit value
 */
export const getRateLimit = (type: 'hour' | 'day' | 'verification'): number => {
  switch (type) {
    case 'hour':
      return EMAIL_VERIFICATION_CONFIG.RATE_LIMIT_PER_HOUR;
    case 'day':
      return EMAIL_VERIFICATION_CONFIG.RATE_LIMIT_PER_DAY;
    case 'verification':
      return EMAIL_VERIFICATION_CONFIG.RATE_LIMIT_PER_VERIFICATION;
    default:
      return EMAIL_VERIFICATION_CONFIG.RATE_LIMIT_PER_HOUR;
  }
};

// ============================================================
// Default Export
// ============================================================

export default {
  EMAIL_VERIFICATION_CONFIG,
  getExpiryMs,
  getCooldownMs,
  isChannelSupported,
  isFeatureEnabled,
  getRateLimit,
};
