/**
 * Authentication Password Schema
 * Zod schemas for password management, validation, and security
 */

import { z } from 'zod';
import {
  AUTH_PASSWORD_RULES,
  AUTH_PASSWORD_STRENGTH,
  type AuthPasswordStrength,
} from '@vubon/shared-constants';
import { idSchema, emailSchema, timestampSchema } from '../common/core-primitives.schema';

// ============================================================
// AUTH PASSWORD STRENGTH SCHEMA
// ============================================================

/**
 * Auth password strength schema
 */
export const authPasswordStrengthSchema = z.enum([
  AUTH_PASSWORD_STRENGTH.VERY_WEAK,
  AUTH_PASSWORD_STRENGTH.WEAK,
  AUTH_PASSWORD_STRENGTH.FAIR,
  AUTH_PASSWORD_STRENGTH.STRONG,
  AUTH_PASSWORD_STRENGTH.VERY_STRONG,
]);

/**
 * Auth password reset status schema
 */
export const authPasswordResetStatusSchema = z.enum([
  'requested',
  'sent',
  'completed',
  'expired',
  'failed',
]);

// ============================================================
// AUTH PASSWORD RULES SCHEMA
// ============================================================

/**
 * Auth password rules schema
 */
export const authPasswordRulesSchema = z.object({
  minLength: z.number().int().positive().default(AUTH_PASSWORD_RULES.MIN_LENGTH),
  maxLength: z.number().int().positive().default(AUTH_PASSWORD_RULES.MAX_LENGTH),
  requireUppercase: z.boolean().default(AUTH_PASSWORD_RULES.REQUIRE_UPPERCASE),
  requireLowercase: z.boolean().default(AUTH_PASSWORD_RULES.REQUIRE_LOWERCASE),
  requireNumber: z.boolean().default(AUTH_PASSWORD_RULES.REQUIRE_NUMBER),
  requireSpecial: z.boolean().default(AUTH_PASSWORD_RULES.REQUIRE_SPECIAL),
  minUniqueChars: z.number().int().positive().default(AUTH_PASSWORD_RULES.MIN_UNIQUE_CHARS),
  maxConsecutiveRepeats: z
    .number()
    .int()
    .positive()
    .default(AUTH_PASSWORD_RULES.MAX_CONSECUTIVE_REPEATS),
  minCharacterClasses: z
    .number()
    .int()
    .positive()
    .default(AUTH_PASSWORD_RULES.MIN_CHARACTER_CLASSES),
  maxAgeDays: z.number().int().positive().default(AUTH_PASSWORD_RULES.MAX_AGE_DAYS),
  preventReuseCount: z.number().int().positive().default(AUTH_PASSWORD_RULES.PREVENT_REUSE_COUNT),
  resetLockTime: z.number().int().positive().default(AUTH_PASSWORD_RULES.RESET_LOCK_TIME),
  maxResetAttempts: z.number().int().positive().default(AUTH_PASSWORD_RULES.MAX_RESET_ATTEMPTS),
});

// ============================================================
// AUTH PASSWORD RESET REQUEST SCHEMA
// ============================================================

/**
 * Auth forgot password request schema
 */
export const authForgotPasswordRequestSchema = z.object({
  email: emailSchema,
  method: z.enum(['email', 'sms']).default('email'),
});

/**
 * Auth reset password request schema
 */
export const authResetPasswordRequestSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(AUTH_PASSWORD_RULES.MIN_LENGTH),
  confirmPassword: z.string().min(AUTH_PASSWORD_RULES.MIN_LENGTH),
});

/**
 * Auth change password request schema
 */
export const authChangePasswordRequestSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(AUTH_PASSWORD_RULES.MIN_LENGTH),
  confirmPassword: z.string().min(AUTH_PASSWORD_RULES.MIN_LENGTH),
});

// ============================================================
// AUTH PASSWORD RESET RESPONSE SCHEMA
// ============================================================

/**
 * Auth forgot password response schema
 */
export const authForgotPasswordResponseSchema = z.object({
  success: z.boolean(),
  emailSent: z.boolean(),
  resetToken: z.string().optional(),
  message: z.string().optional(),
  error: z.string().optional(),
});

/**
 * Auth reset password response schema
 */
export const authResetPasswordResponseSchema = z.object({
  success: z.boolean(),
  resetSuccess: z.boolean().default(false),
  message: z.string().optional(),
  error: z.string().optional(),
});

/**
 * Auth change password response schema
 */
export const authChangePasswordResponseSchema = z.object({
  success: z.boolean(),
  changedSuccess: z.boolean().default(false),
  message: z.string().optional(),
  error: z.string().optional(),
});

// ============================================================
// AUTH PASSWORD VALIDATION SCHEMA
// ============================================================

/**
 * Auth password validation result schema
 */
export const authPasswordValidationResultSchema = z.object({
  isValid: z.boolean(),
  errors: z.array(z.string()),
  strength: authPasswordStrengthSchema.optional(),
  score: z.number().int().min(0).max(100).optional(),
});

// ============================================================
// AUTH PASSWORD RESET RECORD SCHEMA
// ============================================================

/**
 * Auth password reset record schema
 */
export const authPasswordResetRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  token: z.string().min(1),
  status: authPasswordResetStatusSchema,
  attempts: z.number().int().min(0).default(0),
  maxAttempts: z.number().int().positive().default(AUTH_PASSWORD_RULES.MAX_RESET_ATTEMPTS),
  requestedAt: timestampSchema,
  expiresAt: timestampSchema,
  completedAt: timestampSchema.optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// ============================================================
// AUTH PASSWORD HISTORY RECORD SCHEMA
// ============================================================

/**
 * Auth password history record schema
 */
export const authPasswordHistoryRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  passwordHash: z.string().min(1),
  changedAt: timestampSchema,
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthPasswordRules = z.infer<typeof authPasswordRulesSchema>;
export type AuthForgotPasswordRequest = z.infer<typeof authForgotPasswordRequestSchema>;
export type AuthResetPasswordRequest = z.infer<typeof authResetPasswordRequestSchema>;
export type AuthChangePasswordRequest = z.infer<typeof authChangePasswordRequestSchema>;
export type AuthForgotPasswordResponse = z.infer<typeof authForgotPasswordResponseSchema>;
export type AuthResetPasswordResponse = z.infer<typeof authResetPasswordResponseSchema>;
export type AuthChangePasswordResponse = z.infer<typeof authChangePasswordResponseSchema>;
export type AuthPasswordValidationResult = z.infer<typeof authPasswordValidationResultSchema>;
export type AuthPasswordResetRecord = z.infer<typeof authPasswordResetRecordSchema>;
export type AuthPasswordHistoryRecord = z.infer<typeof authPasswordHistoryRecordSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if password is strong enough
 */
export function isAuthPasswordStrongEnough(score: number, threshold: number = 50): boolean {
  return score >= threshold;
}

/**
 * Validate password against rules
 */
export function validateAuthPassword(
  password: string,
  rules: Partial<AuthPasswordRules> = {}
): AuthPasswordValidationResult {
  const finalRules = { ...authPasswordRulesSchema.parse({}), ...rules };
  const errors: string[] = [];

  // Length validation
  if (password.length < finalRules.minLength) {
    errors.push(`Password must be at least ${finalRules.minLength} characters`);
  }
  if (password.length > finalRules.maxLength) {
    errors.push(`Password must not exceed ${finalRules.maxLength} characters`);
  }

  // Character type validation
  if (finalRules.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (finalRules.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (finalRules.requireNumber && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (finalRules.requireSpecial && !/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Consecutive repeats validation
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password has too many repeating characters');
  }

  // Common passwords validation (using AUTH_COMMON_PASSWORDS from constants)
  // We'll use a local list of common passwords since we removed the import
  const commonPasswords = [
    'password',
    '123456',
    '12345678',
    '123456789',
    '1234567890',
    'qwerty',
    'abc123',
    'password123',
    'admin',
    'letmein',
    'welcome',
    'monkey',
    'dragon',
    'master',
    'hello',
    'freedom',
    'whatever',
    'jordan',
    'computer',
    'abcdef',
    '111111',
    '000000',
    '123123',
    '654321',
    '0987654321',
    'qwertyuiop',
    'qwerty123',
    '1q2w3e4r',
    'password1',
    'passw0rd',
  ];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common or easily guessable');
  }

  // Unique characters validation
  const uniqueChars = new Set(password).size;
  if (uniqueChars < (finalRules.minUniqueChars || 4)) {
    errors.push(`Password must have at least ${finalRules.minUniqueChars} unique characters`);
  }

  // Character classes validation
  let charClasses = 0;
  if (/[A-Z]/.test(password)) charClasses++;
  if (/[a-z]/.test(password)) charClasses++;
  if (/[0-9]/.test(password)) charClasses++;
  if (/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password)) charClasses++;
  if (charClasses < (finalRules.minCharacterClasses || 3)) {
    errors.push(
      `Password must contain at least ${finalRules.minCharacterClasses} different character types (uppercase, lowercase, numbers, special)`
    );
  }

  const score = calculateAuthPasswordStrength(password);
  const strength = getAuthPasswordStrength(score);

  return {
    isValid: errors.length === 0,
    errors,
    strength,
    score,
  };
}

/**
 * Calculate password strength score
 */
export function calculateAuthPasswordStrength(password: string): number {
  let score = 0;

  // Length scoring
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 5;

  // Character variety scoring
  if (/[A-Z]/.test(password)) score += 5;
  if (/[a-z]/.test(password)) score += 5;
  if (/[0-9]/.test(password)) score += 5;
  if (/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password)) score += 10;

  // Unique characters scoring
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= 6) score += 10;
  if (uniqueChars >= 8) score += 10;
  if (uniqueChars >= 10) score += 5;

  // Pattern detection (penalties)
  if (!/(.)\1{2,}/.test(password)) score += 10;
  if (!/(012|123|234|345|456|567|678|789|890)/.test(password)) score += 7;
  if (!/(qwerty|asdfgh|zxcvbn|qwertyuiop|asdfghjkl|zxcvbnm)/.test(password.toLowerCase()))
    score += 8;

  // Common passwords penalty
  const commonPasswords = [
    'password',
    '123456',
    '12345678',
    '123456789',
    '1234567890',
    'qwerty',
    'abc123',
    'password123',
    'admin',
    'letmein',
    'welcome',
    'monkey',
    'dragon',
    'master',
    'hello',
    'freedom',
    'whatever',
    'jordan',
    'computer',
    'abcdef',
    '111111',
    '000000',
    '123123',
    '654321',
    '0987654321',
    'qwertyuiop',
    'qwerty123',
    '1q2w3e4r',
    'password1',
    'passw0rd',
  ];
  if (commonPasswords.includes(password.toLowerCase())) {
    score = Math.max(0, score - 30);
  }

  return Math.min(100, score);
}

/**
 * Get password strength from score
 */
export function getAuthPasswordStrength(score: number): AuthPasswordStrength {
  if (score >= 80) return AUTH_PASSWORD_STRENGTH.VERY_STRONG;
  if (score >= 60) return AUTH_PASSWORD_STRENGTH.STRONG;
  if (score >= 40) return AUTH_PASSWORD_STRENGTH.FAIR;
  if (score >= 20) return AUTH_PASSWORD_STRENGTH.WEAK;
  return AUTH_PASSWORD_STRENGTH.VERY_WEAK;
}

/**
 * Get password strength label
 */
export function getAuthPasswordStrengthLabel(strength: AuthPasswordStrength): string {
  const labels: Record<AuthPasswordStrength, string> = {
    very_weak: 'Very Weak',
    weak: 'Weak',
    fair: 'Fair',
    strong: 'Strong',
    very_strong: 'Very Strong',
  };
  return labels[strength] || 'Unknown';
}

/**
 * Get password strength color
 */
export function getAuthPasswordStrengthColor(strength: AuthPasswordStrength): string {
  const colors: Record<AuthPasswordStrength, string> = {
    very_weak: '#ff0000',
    weak: '#ff6600',
    fair: '#ffcc00',
    strong: '#66cc00',
    very_strong: '#00cc66',
  };
  return colors[strength] || '#808080';
}

/**
 * Check if password has expired
 */
export function isAuthPasswordExpired(
  lastChangedAt: Date,
  maxAgeDays: number = AUTH_PASSWORD_RULES.MAX_AGE_DAYS
): boolean {
  const now = Date.now();
  const age = (now - lastChangedAt.getTime()) / (1000 * 60 * 60 * 24);
  return age >= maxAgeDays;
}

/**
 * Check if reset token is expired
 */
export function isAuthResetTokenExpired(requestedAt: Date, expirySeconds: number = 3600): boolean {
  const now = Date.now();
  const age = (now - requestedAt.getTime()) / 1000;
  return age >= expirySeconds;
}

/**
 * Get remaining reset lock time
 */
export function getAuthResetLockRemainingTime(
  lockedAt: Date,
  lockTimeSeconds: number = AUTH_PASSWORD_RULES.RESET_LOCK_TIME
): number {
  const now = Date.now();
  const elapsed = (now - lockedAt.getTime()) / 1000;
  const remaining = lockTimeSeconds - elapsed;
  return Math.max(0, Math.ceil(remaining));
}

/**
 * Check if reset attempts exceeded
 */
export function isAuthResetAttemptsExceeded(
  attempts: number,
  maxAttempts: number = AUTH_PASSWORD_RULES.MAX_RESET_ATTEMPTS
): boolean {
  return attempts >= maxAttempts;
}

/**
 * Generate random password
 */
export function generateAuthRandomPassword(length: number = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
