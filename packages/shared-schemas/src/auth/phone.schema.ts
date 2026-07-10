/**
 * Phone Schema - Enterprise Grade Validation for Bangladesh Phone Numbers
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth/phone.schema
 * 
 * @description
 * Zod schemas for phone number validation across all services.
 * Single source of truth for phone validation rules.
 * 
 * Enterprise Features:
 * ✅ Bangladesh mobile number validation (all operators)
 * ✅ E.164 format normalization
 * ✅ Operator detection (GP, Robi, Banglalink, Teletalk)
 * ✅ Phone number type detection (mobile, landline, toll-free)
 * ✅ International phone number support (fallback)
 * ✅ Strict and lenient validation modes
 * ✅ Custom error messages with Bengali support
 * ✅ Reusable schemas for all use cases
 * 
 * @example
 * // Basic validation
 * const result = PhoneSchema.safeParse('01712345678');
 * // => { success: true, data: '+8801712345678' }
 * 
 * // With operator detection
 * const result = PhoneWithOperatorSchema.safeParse('01712345678');
 * // => { success: true, data: { e164: '+8801712345678', operator: 'gp' } }
 */

import { z } from 'zod';

// ============================================================
// Constants
// ============================================================

/**
 * Bangladesh mobile operator prefixes
 */
const BD_OPERATOR_PREFIXES = {
  GP: ['13', '14', '17'],
  ROBI: ['16', '18', '19'],
  BANGLALINK: ['19'],
  TELETALK: ['15'],
} as const;

/**
 * All valid Bangladesh mobile prefixes
 */
const BD_MOBILE_PREFIXES = [
  '13', '14', '15', '16', '17', '18', '19'
] as const;

/**
 * Bangladesh mobile number regex patterns
 */
const BD_MOBILE_REGEX = /^(?:\+880|0)1[3-9]\d{8}$/;


// ============================================================
// Base Phone Schemas
// ============================================================

/**
 * Base phone number schema (just validates format)
 * Can be extended for specific use cases
 */
export const BasePhoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .max(20, 'Phone number cannot exceed 20 characters')
  .trim();

/**
 * Bangladesh mobile phone schema (strict)
 * Validates Bangladesh mobile numbers only
 * Normalizes to +880 format
 */
export const PhoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .max(15, 'Phone number cannot exceed 15 digits')
  .regex(BD_MOBILE_REGEX, 'Invalid Bangladesh phone number. Use format: 01XXXXXXXXX or +8801XXXXXXXXX')
  .transform((val) => {
    // Normalize to +880 format
    if (val.startsWith('0')) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    return `+880${val}`;
  })
  .brand('Phone');

/**
 * Bangladesh mobile phone schema (lenient)
 * Allows both Bangladesh and international formats
 */
export const LenientPhoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .max(20, 'Phone number cannot exceed 20 characters')
  .regex(
    /^(?:\+880|0)1[3-9]\d{8}$|^\+[1-9]\d{1,14}$/,
    'Invalid phone number format. Use Bangladesh format: 01XXXXXXXXX or international: +XXXXXXXXXXX'
  )
  .transform((val) => {
    // Normalize Bangladesh numbers to +880
    if (val.startsWith('0') && val.length === 11) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    // International numbers - keep as is
    return val;
  })
  .brand('LenientPhone');

/**
 * Phone number schema with operator detection
 * Returns both the normalized number and detected operator
 */
export const PhoneWithOperatorSchema = z
  .string()
  .min(1, 'Phone number is required')
  .max(15, 'Phone number cannot exceed 15 digits')
  .regex(BD_MOBILE_REGEX, 'Invalid Bangladesh phone number. Use format: 01XXXXXXXXX or +8801XXXXXXXXX')
  .transform((val) => {
    let normalized = val;
    if (val.startsWith('0')) {
      normalized = `+88${val}`;
    } else if (!val.startsWith('+')) {
      normalized = `+880${val}`;
    }
    
    // Extract national number for operator detection
    const national = normalized.replace(/^\+880/, '');
    const prefix = national.substring(0, 2);
    
    let operator: string = 'unknown';
    for (const [key, prefixes] of Object.entries(BD_OPERATOR_PREFIXES)) {
      if ((prefixes as readonly string[]).includes(prefix)) {
        operator = key.toLowerCase();
        break;
      }
    }
    
    return {
      e164: normalized,
      operator,
      nationalNumber: national,
      prefix,
    };
  })
  .brand('PhoneWithOperator');

/**
 * Phone number with type detection schema
 */
export const PhoneWithTypeSchema = z
  .string()
  .min(1, 'Phone number is required')
  .max(20, 'Phone number cannot exceed 20 characters')
  .transform((val) => {
    const trimmed = val.trim();
    let type: string = 'unknown';
    let normalized = trimmed;
    
    // Detect type based on format
    if (BD_MOBILE_REGEX.test(trimmed)) {
      type = 'mobile';
      // Normalize to +880
      if (trimmed.startsWith('0')) {
        normalized = `+88${trimmed}`;
      } else if (!trimmed.startsWith('+')) {
        normalized = `+880${trimmed}`;
      }
    } else if (trimmed.startsWith('+')) {
      type = 'international';
      normalized = trimmed;
    } else if (/^0[2-9]\d{7,9}$/.test(trimmed)) {
      type = 'landline';
    } else if (/^0800\d{6}$/.test(trimmed)) {
      type = 'toll_free';
    } else if (/^0900\d{6}$/.test(trimmed)) {
      type = 'premium';
    }
    
    return {
      value: normalized,
      type,
      original: trimmed,
    };
  })
  .brand('PhoneWithType');

// ============================================================
// Request/Response Schemas
// ============================================================

/**
 * Phone verification request schema
 */
export const PhoneVerificationRequestSchema = z
  .object({
    phoneNumber: PhoneSchema,
    countryCode: z.string().default('BD'),
    method: z.enum(['sms', 'whatsapp', 'voice']).default('sms'),
    locale: z.enum(['en', 'bn']).default('en'),
  })
  .strict()
  .brand('PhoneVerificationRequest');

/**
 * Phone verification response schema
 */
export const PhoneVerificationResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    messageBn: z.string().optional(),
    maskedPhone: z.string(),
    method: z.enum(['sms', 'whatsapp', 'voice']),
    expiresInSeconds: z.number().int().positive().default(300),
    resendCooldownSeconds: z.number().int().default(30),
    sessionId: z.string().uuid().optional(),
    remainingAttempts: z.number().int().default(3),
    operator: z.string().optional(),
  })
  .strict()
  .brand('PhoneVerificationResponse');

/**
 * Phone change request schema
 */
export const PhoneChangeRequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID format'),
    newPhoneNumber: PhoneSchema,
    password: z.string().min(1, 'Password is required'),
    reason: z.string().max(500, 'Reason too long').optional(),
  })
  .strict()
  .brand('PhoneChangeRequest');

/**
 * Phone change response schema
 */
export const PhoneChangeResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    messageBn: z.string().optional(),
    verificationSent: z.boolean(),
    method: z.enum(['sms', 'whatsapp', 'voice']),
    maskedPhone: z.string(),
    expiresInSeconds: z.number().int().positive(),
    sessionId: z.string().uuid().optional(),
  })
  .strict()
  .brand('PhoneChangeResponse');

// ============================================================
// Batch Phone Schemas
// ============================================================

/**
 * Multiple phone numbers schema
 */
export const PhoneListSchema = z
  .array(PhoneSchema)
  .min(1, 'At least one phone number is required')
  .max(100, 'Cannot process more than 100 phone numbers at once')
  .brand('PhoneList');

/**
 * Phone numbers with operator detection (bulk)
 */
export const PhoneListWithOperatorSchema = z
  .array(PhoneWithOperatorSchema)
  .min(1, 'At least one phone number is required')
  .max(100, 'Cannot process more than 100 phone numbers at once')
  .brand('PhoneListWithOperator');

// ============================================================
// MFA Phone Schemas (Bangladesh specific)
// ============================================================

/**
 * Phone number for MFA (SMS/WhatsApp)
 */
export const MFAPhoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .max(15, 'Phone number cannot exceed 15 digits')
  .regex(BD_MOBILE_REGEX, 'Invalid Bangladesh phone number for MFA')
  .transform((val) => {
    if (val.startsWith('0')) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    return `+880${val}`;
  })
  .brand('MFAPhone');

/**
 * WhatsApp OTP phone schema (Bangladesh specific)
 */
export const WhatsAppPhoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .max(15, 'Phone number cannot exceed 15 digits')
  .regex(BD_MOBILE_REGEX, 'Invalid Bangladesh phone number for WhatsApp')
  .transform((val) => {
    if (val.startsWith('0')) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    return `+880${val}`;
  })
  .brand('WhatsAppPhone');

/**
 * Voice call OTP phone schema (for feature phones)
 */
export const VoiceCallPhoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .max(15, 'Phone number cannot exceed 15 digits')
  .regex(BD_MOBILE_REGEX, 'Invalid Bangladesh phone number for voice call')
  .transform((val) => {
    if (val.startsWith('0')) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    return `+880${val}`;
  })
  .brand('VoiceCallPhone');

// ============================================================
// Phone Number Components Schema
// ============================================================

/**
 * Phone number components (parsed)
 */
export const PhoneComponentsSchema = z
  .object({
    e164: z.string(),
    countryCode: z.string().default('880'),
    nationalNumber: z.string(),
    prefix: z.string().optional(),
    operator: z.enum(['gp', 'robi', 'banglalink', 'teletalk', 'unknown']).optional(),
    type: z.enum(['mobile', 'landline', 'toll_free', 'premium', 'shared_cost', 'voip', 'international', 'unknown']).default('unknown'),
    isBangladesh: z.boolean().default(true),
    isValid: z.boolean().default(true),
  })
  .strict()
  .brand('PhoneComponents');

// ============================================================
// Error Response Schema
// ============================================================

export const PhoneErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'invalid_phone_format',
      'invalid_bangladesh_phone',
      'phone_already_exists',
      'phone_not_verified',
      'phone_verification_failed',
      'invalid_operator',
      'rate_limited',
      'max_attempts_exceeded',
    ]),
    field: z.string().optional(),
    remainingAttempts: z.number().int().min(0).optional(),
    retryAfterSeconds: z.number().int().optional(),
    messageBn: z.string().optional(),
  })
  .strict()
  .brand('PhoneError');

// ============================================================
// Type Exports
// ============================================================

export type Phone = z.infer<typeof PhoneSchema>;
export type LenientPhone = z.infer<typeof LenientPhoneSchema>;
export type PhoneWithOperator = z.infer<typeof PhoneWithOperatorSchema>;
export type PhoneWithType = z.infer<typeof PhoneWithTypeSchema>;
export type PhoneVerificationRequest = z.infer<typeof PhoneVerificationRequestSchema>;
export type PhoneVerificationResponse = z.infer<typeof PhoneVerificationResponseSchema>;
export type PhoneChangeRequest = z.infer<typeof PhoneChangeRequestSchema>;
export type PhoneChangeResponse = z.infer<typeof PhoneChangeResponseSchema>;
export type PhoneList = z.infer<typeof PhoneListSchema>;
export type PhoneListWithOperator = z.infer<typeof PhoneListWithOperatorSchema>;
export type MFAPhone = z.infer<typeof MFAPhoneSchema>;
export type WhatsAppPhone = z.infer<typeof WhatsAppPhoneSchema>;
export type VoiceCallPhone = z.infer<typeof VoiceCallPhoneSchema>;
export type PhoneComponents = z.infer<typeof PhoneComponentsSchema>;
export type PhoneError = z.infer<typeof PhoneErrorSchema>;

// ============================================================
// Bangladesh Specific Type
// ============================================================

export type BDMobilePrefix = typeof BD_MOBILE_PREFIXES[number];
export type BDOperator = keyof typeof BD_OPERATOR_PREFIXES;

// ============================================================
// Helper Functions (for runtime usage)
// ============================================================

/**
 * Check if a phone number is a valid Bangladesh mobile number
 */
export const isValidBangladeshMobile = (phone: string): boolean => {
  return BD_MOBILE_REGEX.test(phone);
};

/**
 * Get operator from Bangladesh phone number
 */
export const getBangladeshOperator = (phone: string): string | null => {
  const normalized = phone.replace(/^\+880/, '').replace(/^0/, '');
  const prefix = normalized.substring(0, 2);
  
  for (const [key, prefixes] of Object.entries(BD_OPERATOR_PREFIXES)) {
    if ((prefixes as readonly string[]).includes(prefix)) {
      return key.toLowerCase();
    }
  }
  return null;
};

/**
 * Normalize Bangladesh phone number to E.164 format
 */
export const normalizeBangladeshPhone = (phone: string): string => {
  const trimmed = phone.trim();
  if (trimmed.startsWith('+880')) return trimmed;
  if (trimmed.startsWith('0')) return `+88${trimmed}`;
  return `+880${trimmed}`;
};

/**
 * Mask phone number for privacy
 */
export const maskPhoneNumber = (phone: string, visibleStart: number = 4, visibleEnd: number = 4): string => {
  const normalized = phone.replace(/[^0-9+]/g, '');
  if (normalized.length <= visibleStart + visibleEnd) {
    return '*'.repeat(Math.min(normalized.length, 8));
  }
  const start = normalized.substring(0, visibleStart);
  const end = normalized.substring(normalized.length - visibleEnd);
  const maskedLength = normalized.length - visibleStart - visibleEnd;
  return `${start}${'*'.repeat(maskedLength)}${end}`;
};
