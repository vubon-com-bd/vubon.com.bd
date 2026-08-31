/**
 * Authentication MFA Schema
 * Zod schemas for Multi-Factor Authentication setup, verification, and management
 */

import { z } from 'zod';
import {
  AUTH_MFA_METHODS,
  AUTH_MFA_STATUS,
  AUTH_MFA_CONFIG,
  AUTH_MFA_METHOD_LABELS,
  AUTH_MFA_METHOD_DESCRIPTIONS,
  AUTH_MFA_METHOD_SECURITY_LEVELS,
  RECOMMENDED_AUTH_MFA_METHODS,
  AUTH_MFA_METHOD_ICONS,
  AUTH_MFA_STATUS_MESSAGES,
  type AuthMfaMethod,
  type AuthMfaStatus,
} from '@vubon/shared-constants';
import {
  idSchema,
  emailSchema,
  timestampSchema,
  jsonObjectSchema,
} from '../common/core-primitives.schema';

// ============================================================
// AUTH MFA METHOD & STATUS SCHEMAS
// ============================================================

/**
 * Auth MFA method schema
 */
export const authMfaMethodSchema = z.enum([
  AUTH_MFA_METHODS.TOTP,
  AUTH_MFA_METHODS.SMS,
  AUTH_MFA_METHODS.EMAIL,
  AUTH_MFA_METHODS.BACKUP_CODES,
  AUTH_MFA_METHODS.PUSH,
  AUTH_MFA_METHODS.BIOMETRIC,
  AUTH_MFA_METHODS.HARDWARE,
  AUTH_MFA_METHODS.SECURITY_QUESTIONS,
]);

/**
 * Auth MFA status schema
 */
export const authMfaStatusSchema = z.enum([
  AUTH_MFA_STATUS.ENABLED,
  AUTH_MFA_STATUS.DISABLED,
  AUTH_MFA_STATUS.SETUP_IN_PROGRESS,
  AUTH_MFA_STATUS.PENDING_VERIFICATION,
  AUTH_MFA_STATUS.LOCKED,
  AUTH_MFA_STATUS.REQUIRED,
]);

// ============================================================
// AUTH MFA CONFIG SCHEMAS
// ============================================================

/**
 * TOTP config schema
 */
export const authTotpConfigSchema = z.object({
  secret: z.string().min(1),
  issuer: z.string().min(1),
  accountName: z.string().min(1),
  algorithm: z.enum(['SHA1', 'SHA256', 'SHA512']).default('SHA1'),
  timeStep: z.number().int().positive().default(30),
  codeLength: z.number().int().positive().default(6),
  windowSize: z.number().int().positive().default(1),
});

/**
 * SMS MFA config schema
 */
export const authSmsMfaConfigSchema = z.object({
  phoneNumber: z.string().min(1),
  countryCode: z.string().min(1),
});

/**
 * Email MFA config schema
 */
export const authEmailMfaConfigSchema = z.object({
  email: emailSchema,
});

/**
 * Push MFA config schema
 */
export const authPushMfaConfigSchema = z.object({
  deviceToken: z.string().min(1),
  service: z.enum(['fcm', 'apns', 'webpush']),
});

// ============================================================
// AUTH MFA RECORD SCHEMA
// ============================================================

/**
 * Auth MFA record schema
 */
export const authMfaRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  method: authMfaMethodSchema,
  status: authMfaStatusSchema,
  isPrimary: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  totpConfig: authTotpConfigSchema.optional(),
  smsConfig: authSmsMfaConfigSchema.optional(),
  emailConfig: authEmailMfaConfigSchema.optional(),
  pushConfig: authPushMfaConfigSchema.optional(),
  lastVerifiedAt: timestampSchema.optional(),
  failedAttempts: z.number().int().min(0).default(0),
  addedAt: timestampSchema,
  updatedAt: timestampSchema,
  expiresAt: timestampSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// AUTH MFA REQUEST SCHEMAS
// ============================================================

/**
 * Auth MFA setup request schema
 */
export const authMfaSetupRequestSchema = z.object({
  method: authMfaMethodSchema,
  isPrimary: z.boolean().optional(),
  phoneNumber: z.string().optional(),
  email: emailSchema.optional(),
  deviceToken: z.string().optional(),
  config: jsonObjectSchema.optional(),
});

/**
 * Auth MFA verify request schema
 */
export const authMfaVerifyRequestSchema = z.object({
  method: authMfaMethodSchema,
  code: z.string().min(1),
  totpSecret: z.string().optional(),
});

/**
 * Auth MFA disable request schema
 */
export const authMfaDisableRequestSchema = z.object({
  method: authMfaMethodSchema,
  code: z.string().min(1),
});

// ============================================================
// AUTH MFA RESPONSE SCHEMAS
// ============================================================

/**
 * Auth MFA response schema
 */
export const authMfaResponseSchema = z.object({
  success: z.boolean(),
  record: authMfaRecordSchema.optional(),
  totpSecret: z.string().optional(),
  totpQrUrl: z.string().url().optional(),
  verificationRequired: z.boolean().optional(),
  error: z.string().optional(),
});

/**
 * Auth MFA verification response schema
 */
export const authMfaVerificationResponseSchema = z.object({
  success: z.boolean(),
  mfaRequired: z.boolean(),
  availableMethods: z.array(authMfaMethodSchema),
  recommendedMethod: authMfaMethodSchema.optional(),
  sessionId: z.string().optional(),
});

// ============================================================
// AUTH MFA FILTER SCHEMA
// ============================================================

/**
 * Auth MFA filter schema
 */
export const authMfaFilterSchema = z.object({
  userId: idSchema.optional(),
  method: z.union([authMfaMethodSchema, z.array(authMfaMethodSchema)]).optional(),
  status: z.union([authMfaStatusSchema, z.array(authMfaStatusSchema)]).optional(),
  verifiedOnly: z.boolean().optional(),
  primaryOnly: z.boolean().optional(),
});

// ============================================================
// AUTH MFA SUMMARY SCHEMA
// ============================================================

/**
 * Auth MFA summary schema
 */
export const authMfaSummarySchema = z.object({
  userId: idSchema,
  isEnabled: z.boolean(),
  totalMethods: z.number().int().min(0),
  verifiedMethods: z.number().int().min(0),
  primaryMethod: authMfaMethodSchema.optional(),
  methods: z.array(authMfaMethodSchema),
  hasBackupCodes: z.boolean(),
  remainingBackupCodes: z.number().int().min(0).optional(),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthTotpConfig = z.infer<typeof authTotpConfigSchema>;
export type AuthSmsMfaConfig = z.infer<typeof authSmsMfaConfigSchema>;
export type AuthEmailMfaConfig = z.infer<typeof authEmailMfaConfigSchema>;
export type AuthPushMfaConfig = z.infer<typeof authPushMfaConfigSchema>;
export type AuthMfaRecord = z.infer<typeof authMfaRecordSchema>;
export type AuthMfaSetupRequest = z.infer<typeof authMfaSetupRequestSchema>;
export type AuthMfaVerifyRequest = z.infer<typeof authMfaVerifyRequestSchema>;
export type AuthMfaDisableRequest = z.infer<typeof authMfaDisableRequestSchema>;
export type AuthMfaResponse = z.infer<typeof authMfaResponseSchema>;
export type AuthMfaVerificationResponse = z.infer<typeof authMfaVerificationResponseSchema>;
export type AuthMfaFilter = z.infer<typeof authMfaFilterSchema>;
export type AuthMfaSummary = z.infer<typeof authMfaSummarySchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if MFA method is valid
 */
export function isValidAuthMfaMethod(method: string): method is AuthMfaMethod {
  return Object.values(AUTH_MFA_METHODS).includes(method as AuthMfaMethod);
}

/**
 * Check if MFA status is valid
 */
export function isValidAuthMfaStatus(status: string): status is AuthMfaStatus {
  return Object.values(AUTH_MFA_STATUS).includes(status as AuthMfaStatus);
}

/**
 * Check if MFA is enabled
 */
export function isAuthMfaEnabled(status: AuthMfaStatus): boolean {
  return status === AUTH_MFA_STATUS.ENABLED || status === AUTH_MFA_STATUS.REQUIRED;
}

/**
 * Check if MFA is locked
 */
export function isAuthMfaLocked(status: AuthMfaStatus): boolean {
  return status === AUTH_MFA_STATUS.LOCKED;
}

/**
 * Check if MFA needs setup
 */
export function isAuthMfaSetupRequired(status: AuthMfaStatus): boolean {
  return status === AUTH_MFA_STATUS.DISABLED || status === AUTH_MFA_STATUS.SETUP_IN_PROGRESS;
}

/**
 * Check if MFA is pending verification
 */
export function isAuthMfaPendingVerification(status: AuthMfaStatus): boolean {
  return status === AUTH_MFA_STATUS.PENDING_VERIFICATION;
}

/**
 * Get MFA method label
 */
export function getAuthMfaMethodLabel(method: AuthMfaMethod): string {
  return AUTH_MFA_METHOD_LABELS[method] || 'Unknown Method';
}

/**
 * Get MFA method description
 */
export function getAuthMfaMethodDescription(method: AuthMfaMethod): string {
  return AUTH_MFA_METHOD_DESCRIPTIONS[method] || 'No description available';
}

/**
 * Get MFA method security level
 */
export function getAuthMfaMethodSecurityLevel(method: AuthMfaMethod): number {
  return AUTH_MFA_METHOD_SECURITY_LEVELS[method] || 0;
}

/**
 * Check if MFA method is recommended
 */
export function isAuthMfaMethodRecommended(method: AuthMfaMethod): boolean {
  return RECOMMENDED_AUTH_MFA_METHODS.includes(method);
}

/**
 * Get MFA method icon
 */
export function getAuthMfaMethodIcon(method: AuthMfaMethod): string {
  return AUTH_MFA_METHOD_ICONS[method] || 'security';
}

/**
 * Get MFA status label
 */
export function getAuthMfaStatusLabel(status: AuthMfaStatus): string {
  const labels: Record<AuthMfaStatus, string> = {
    enabled: 'Enabled',
    disabled: 'Disabled',
    setup_in_progress: 'Setup In Progress',
    pending_verification: 'Pending Verification',
    locked: 'Locked',
    required: 'Required',
  };
  return labels[status] || 'Unknown Status';
}

/**
 * Get MFA status message
 */
export function getAuthMfaStatusMessage(status: AuthMfaStatus): string {
  return AUTH_MFA_STATUS_MESSAGES[status] || 'Unknown MFA status';
}

/**
 * Check if TOTP code is valid
 */
export function isAuthTotpCodeValid(code: string, createdAt: Date): boolean {
  if (!/^[0-9]{6}$/.test(code)) {
    return false;
  }
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age <= AUTH_MFA_CONFIG.TOTP_CODE_EXPIRY;
}

/**
 * Check if SMS code is valid
 */
export function isAuthSmsCodeValid(code: string, createdAt: Date): boolean {
  if (!/^[0-9]{6}$/.test(code)) {
    return false;
  }
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age <= AUTH_MFA_CONFIG.SMS_CODE_EXPIRY;
}

/**
 * Check if email code is valid
 */
export function isAuthEmailCodeValid(code: string, createdAt: Date): boolean {
  if (!/^[0-9]{6}$/.test(code)) {
    return false;
  }
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age <= AUTH_MFA_CONFIG.EMAIL_CODE_EXPIRY;
}

/**
 * Check if MFA code is valid format
 */
export function isAuthMfaCodeValidFormat(code: string, method: AuthMfaMethod): boolean {
  if (method === AUTH_MFA_METHODS.TOTP) {
    return /^\d{6}$/.test(code);
  }
  if (method === AUTH_MFA_METHODS.SMS || method === AUTH_MFA_METHODS.EMAIL) {
    return /^\d{6}$/.test(code);
  }
  if (method === AUTH_MFA_METHODS.BACKUP_CODES) {
    return /^[A-Z0-9]{8}$/.test(code);
  }
  return true;
}

/**
 * Generate TOTP secret
 */
export function generateAuthTotpSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return secret;
}

/**
 * Generate TOTP QR URL
 */
export function generateAuthTotpQrUrl(
  secret: string,
  accountName: string,
  issuer: string = AUTH_MFA_CONFIG.TOTP_ISSUER
): string {
  return `otpauth://totp/${issuer}:${accountName}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;
}

/**
 * Get default TOTP config
 */
export function getAuthDefaultTotpConfig() {
  return {
    algorithm: AUTH_MFA_CONFIG.TOTP_ALGORITHM,
    timeStep: AUTH_MFA_CONFIG.TOTP_TIME_STEP,
    codeLength: AUTH_MFA_CONFIG.TOTP_CODE_LENGTH,
    windowSize: 1,
    issuer: AUTH_MFA_CONFIG.TOTP_ISSUER,
  };
}

/**
 * Generate MFA session ID
 */
export function generateAuthMfaSessionId(): string {
  const chunks: string[] = [];
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      chunks.push('-');
    } else if (i === 14) {
      chunks.push('4');
    } else if (i === 19) {
      chunks.push('89ab'[Math.floor(Math.random() * 4)]);
    } else {
      chunks.push(Math.floor(Math.random() * 16).toString(16));
    }
  }
  return chunks.join('');
}
