/**
 * Reset Method Constants - Enterprise Grade
 * @module shared-constants/reset-method.constants
 * 
 * @description
 * Centralized reset method configuration for the entire enterprise.
 * Used across all services (auth, user, notification) for password reset flows.
 * 
 * @example
 * import { RESET_METHODS, RESET_METHOD_CONFIG } from '@vubon/shared-constants';
 * 
 * // Get all supported methods
 * const methods = RESET_METHODS.ALL;
 * 
 * // Check if WhatsApp is enabled
 * const isWhatsAppEnabled = RESET_METHOD_CONFIG.whatsapp.enabled;
 */

// ============================================================
// Reset Methods (Bangladesh specific)
// ============================================================

/**
 * Reset method identifiers
 */
export const RESET_METHODS = {
  /** Email-based password reset */
  EMAIL: 'email',
  /** SMS-based password reset (Bangladesh primary) */
  SMS: 'sms',
  /** WhatsApp-based password reset (Bangladesh specific) */
  WHATSAPP: 'whatsapp',
  /** Voice call OTP (for feature phones) */
  VOICE: 'voice',
} as const;

/**
 * All reset methods as an array
 */
export const RESET_METHODS_ARRAY = [
  RESET_METHODS.EMAIL,
  RESET_METHODS.SMS,
  RESET_METHODS.WHATSAPP,
  RESET_METHODS.VOICE,
] as const;

/**
 * Default reset method
 */
export const DEFAULT_RESET_METHOD = RESET_METHODS.EMAIL;

/**
 * Reset method display names (English)
 */
export const RESET_METHOD_DISPLAY_NAMES = {
  [RESET_METHODS.EMAIL]: 'Email',
  [RESET_METHODS.SMS]: 'SMS',
  [RESET_METHODS.WHATSAPP]: 'WhatsApp',
  [RESET_METHODS.VOICE]: 'Voice Call',
} as const;

/**
 * Reset method display names (Bengali)
 */
export const RESET_METHOD_DISPLAY_NAMES_BN = {
  [RESET_METHODS.EMAIL]: 'ইমেইল',
  [RESET_METHODS.SMS]: 'এসএমএস',
  [RESET_METHODS.WHATSAPP]: 'হোয়াটসঅ্যাপ',
  [RESET_METHODS.VOICE]: 'ভয়েস কল',
} as const;

/**
 * Reset method priorities (lower = higher priority)
 */
export const RESET_METHOD_PRIORITIES = {
  [RESET_METHODS.EMAIL]: 1,
  [RESET_METHODS.SMS]: 2,
  [RESET_METHODS.WHATSAPP]: 3,
  [RESET_METHODS.VOICE]: 4,
} as const;

/**
 * Reset method categories
 */
export const RESET_METHOD_CATEGORIES = {
  [RESET_METHODS.EMAIL]: 'email_based',
  [RESET_METHODS.SMS]: 'phone_based',
  [RESET_METHODS.WHATSAPP]: 'messaging_based',
  [RESET_METHODS.VOICE]: 'phone_based',
} as const;

// ============================================================
// Reset Method Configuration
// ============================================================

/**
 * Complete reset method configuration
 */
export const RESET_METHOD_CONFIG = {
  [RESET_METHODS.EMAIL]: {
    method: RESET_METHODS.EMAIL,
    displayName: RESET_METHOD_DISPLAY_NAMES[RESET_METHODS.EMAIL],
    displayNameBn: RESET_METHOD_DISPLAY_NAMES_BN[RESET_METHODS.EMAIL],
    category: RESET_METHOD_CATEGORIES[RESET_METHODS.EMAIL],
    enabled: true,
    priority: RESET_METHOD_PRIORITIES[RESET_METHODS.EMAIL],
    maxAttempts: 3,
    cooldownSeconds: 60,
    requiresPhone: false,
    requiresEmail: true,
    supportsOtp: false,
    supportsMagicLink: true,
  },
  [RESET_METHODS.SMS]: {
    method: RESET_METHODS.SMS,
    displayName: RESET_METHOD_DISPLAY_NAMES[RESET_METHODS.SMS],
    displayNameBn: RESET_METHOD_DISPLAY_NAMES_BN[RESET_METHODS.SMS],
    category: RESET_METHOD_CATEGORIES[RESET_METHODS.SMS],
    enabled: true,
    priority: RESET_METHOD_PRIORITIES[RESET_METHODS.SMS],
    maxAttempts: 5,
    cooldownSeconds: 30,
    requiresPhone: true,
    requiresEmail: false,
    supportsOtp: true,
    supportsMagicLink: false,
  },
  [RESET_METHODS.WHATSAPP]: {
    method: RESET_METHODS.WHATSAPP,
    displayName: RESET_METHOD_DISPLAY_NAMES[RESET_METHODS.WHATSAPP],
    displayNameBn: RESET_METHOD_DISPLAY_NAMES_BN[RESET_METHODS.WHATSAPP],
    category: RESET_METHOD_CATEGORIES[RESET_METHODS.WHATSAPP],
    enabled: true,
    priority: RESET_METHOD_PRIORITIES[RESET_METHODS.WHATSAPP],
    maxAttempts: 5,
    cooldownSeconds: 30,
    requiresPhone: true,
    requiresEmail: false,
    supportsOtp: true,
    supportsMagicLink: false,
  },
  [RESET_METHODS.VOICE]: {
    method: RESET_METHODS.VOICE,
    displayName: RESET_METHOD_DISPLAY_NAMES[RESET_METHODS.VOICE],
    displayNameBn: RESET_METHOD_DISPLAY_NAMES_BN[RESET_METHODS.VOICE],
    category: RESET_METHOD_CATEGORIES[RESET_METHODS.VOICE],
    enabled: true,
    priority: RESET_METHOD_PRIORITIES[RESET_METHODS.VOICE],
    maxAttempts: 3,
    cooldownSeconds: 60,
    requiresPhone: true,
    requiresEmail: false,
    supportsOtp: true,
    supportsMagicLink: false,
  },
} as const;

// ============================================================
// Reset Method Validation
// ============================================================

/**
 * Check if a reset method is supported
 */
export function isSupportedResetMethod(method: unknown): method is keyof typeof RESET_METHOD_CONFIG {
  return typeof method === 'string' && method in RESET_METHOD_CONFIG;
}

/**
 * Get enabled reset methods
 */
export function getEnabledResetMethods(): readonly string[] {
  return RESET_METHODS_ARRAY.filter(method => 
    RESET_METHOD_CONFIG[method as keyof typeof RESET_METHOD_CONFIG]?.enabled ?? false
  );
}

/**
 * Get reset method priority
 */
export function getResetMethodPriority(method: string): number {
  return RESET_METHOD_PRIORITIES[method as keyof typeof RESET_METHOD_PRIORITIES] ?? 99;
}

/**
 * Get reset method display name
 */
export function getResetMethodDisplayName(method: string, locale: 'en' | 'bn' = 'en'): string {
  if (locale === 'bn') {
    return RESET_METHOD_DISPLAY_NAMES_BN[method as keyof typeof RESET_METHOD_DISPLAY_NAMES_BN] ?? method;
  }
  return RESET_METHOD_DISPLAY_NAMES[method as keyof typeof RESET_METHOD_DISPLAY_NAMES] ?? method;
}

// ============================================================
// Password Reset Configuration (Bangladesh Bank Compliant)
// ============================================================

export const PASSWORD_RESET_CONFIGS = {
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
// Type Exports
// ============================================================

export type Reset_Method = typeof RESET_METHODS[keyof typeof RESET_METHODS];
export type ResetMethodDisplayName = typeof RESET_METHOD_DISPLAY_NAMES[keyof typeof RESET_METHOD_DISPLAY_NAMES];
export type ResetMethodDisplayNameBn = typeof RESET_METHOD_DISPLAY_NAMES_BN[keyof typeof RESET_METHOD_DISPLAY_NAMES_BN];
export type ResetMethodPriority = typeof RESET_METHOD_PRIORITIES[keyof typeof RESET_METHOD_PRIORITIES];
export type ResetMethodCategory = typeof RESET_METHOD_CATEGORIES[keyof typeof RESET_METHOD_CATEGORIES];
export type ResetMethodConfigType = typeof RESET_METHOD_CONFIG[keyof typeof RESET_METHOD_CONFIG];
