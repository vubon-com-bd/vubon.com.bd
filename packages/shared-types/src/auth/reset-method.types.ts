/**
 * Reset Method Types - Pure TypeScript type contracts for Password Reset Methods
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/auth/reset-method.types
 * 
 * @description
 * Defines the available methods for password reset (Email, SMS, WhatsApp, Voice).
 * Bangladesh specific with phone-based reset support.
 * 
 * RULES:
 * ✅ ONLY type declarations - NO enums, NO runtime code
 * ✅ NO functions, classes, or values
 * ✅ Pure TypeScript types only
 * ✅ Extensible for future reset methods
 */

// ============================================================
// Reset Method Types (Union type over enum)
// ============================================================

/**
 * Available reset methods for password recovery
 * - EMAIL: Send reset link via email
 * - SMS: Send OTP via SMS (Bangladesh specific)
 * - WHATSAPP: Send OTP via WhatsApp (Bangladesh specific)
 * - VOICE: Send OTP via voice call (Bangladesh specific - for feature phones)
 */


export type ResetMethods = 
  | 'email'
  | 'sms'
  | 'whatsapp'
  | 'voice';

/**
 * Reset method display names (for UI)
 */
export type ResetMethodDisplayName = 
  | 'Email'
  | 'SMS'
  | 'WhatsApp'
  | 'Voice Call';

/**
 * Reset method categories
 */
export type ResetMethodCategory = 
  | 'email_based'
  | 'phone_based'
  | 'messaging_based';

// ============================================================
// Reset Method Configuration Types
// ============================================================

/**
 * Reset method configuration
 */
export interface ResetMethodConfig {
  /** The reset method identifier */
  readonly method: ResetMethods;
  
  /** Display name for the method */
  readonly displayName: ResetMethodDisplayName;
  
  /** Display name in Bengali */
  readonly displayNameBn: string;
  
  /** Category of the reset method */
  readonly category: ResetMethodCategory;
  
  /** Whether the method is enabled */
  readonly enabled: boolean;
  
  /** Priority order for display (lower = higher priority) */
  readonly priority: number;
  
  /** Maximum attempts allowed for this method */
  readonly maxAttempts: number;
  
  /** Cooldown in seconds between attempts */
  readonly cooldownSeconds: number;
  
  /** Whether the method requires a phone number */
  readonly requiresPhone: boolean;
  
  /** Whether the method requires an email address */
  readonly requiresEmail: boolean;
  
  /** Whether the method supports OTP */
  readonly supportsOtp: boolean;
  
  /** Whether the method supports magic link */
  readonly supportsMagicLink: boolean;
}

// ============================================================
// Reset Method Validation Types
// ============================================================

/**
 * Validation result for reset method
 */
export interface ResetMethodValidation {
  /** Whether the method is valid */
  readonly valid: boolean;
  
  /** Error message if invalid */
  readonly error?: string;
  
  /** Error message in Bengali */
  readonly errorBn?: string;
  
  /** Suggested alternative method */
  readonly suggestedAlternative?: ResetMethods;
}

// ============================================================
// Reset Method Constants (Type-only)
// ============================================================

/**
 * All available reset methods (readonly array)
 */
export const RESET_METHODS: readonly ResetMethods[] = [
  'email',
  'sms',
  'whatsapp',
  'voice',
] as const;

/**
 * Default reset method
 */
export const DEFAULT_RESET_METHOD: ResetMethods = 'email';

/**
 * Reset method configuration map (type-only)
 */
export type ResetMethodConfigMap = {
  readonly [K in ResetMethods]: ResetMethodConfig;
};

// ============================================================
// Type Guards
// ============================================================

/**
 * Type guard to check if a value is a valid ResetMethod
 */
export function isResetMethod(value: unknown): value is ResetMethods {
  return typeof value === 'string' && 
    RESET_METHODS.includes(value as ResetMethods);
}

/**
 * Type guard to check if a value is a valid ResetMethodCategory
 */
export function isResetMethodCategory(value: unknown): value is ResetMethodCategory {
  return value === 'email_based' || 
         value === 'phone_based' || 
         value === 'messaging_based';
}

// ============================================================
// Bangladesh Specific Reset Methods
// ============================================================

/**
 * Bangladesh-specific reset methods (phone-based)
 */
export type BangladeshResetMethod = Extract<ResetMethods, 'sms' | 'whatsapp' | 'voice'>;

/**
 * Check if a reset method is Bangladesh-specific
 */
export function isBangladeshResetMethod(method: ResetMethods): method is BangladeshResetMethod {
  return method === 'sms' || method === 'whatsapp' || method === 'voice';
}

// ============================================================
// Type Exports
// ============================================================

export type {
  ResetMethods as ResetMethodType,
  ResetMethodDisplayName as ResetMethodDisplayNameType,
  ResetMethodCategory as ResetMethodCategoryType,
  ResetMethodConfig as ResetMethodConfigType,
  ResetMethodValidation as ResetMethodValidationType,
  ResetMethodConfigMap as ResetMethodConfigMapType,
  BangladeshResetMethod as BangladeshResetMethodType,
};
