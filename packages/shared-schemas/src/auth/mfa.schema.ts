/**
 * MFA Schemas - Pure validation for Multi-Factor Authentication
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth/mfa.schema
 * 
 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO OTP generation, TOTP verification, QR code generation
 * ✅ NO side effects, NO async
 * ✅ Reusable primitives from constants
 * ✅ Strict mode enabled
 * ✅ Type exports with z.infer
 */

import { z } from 'zod';

// Import constants from shared-constants layer (Enterprise rule)
// ✅ FIXED: Correct package name
import {
  MFA_PROVIDERS,
  MFA_VERIFICATION_TYPES,
  MFA_STATUS,
  OTP_CONFIG,
  RECOVERY_CODES,
  MFA_TIMEOUTS,
} from '@vubon/shared-constants';

// ==================== Primitives (Reusable) ====================

// MFA Provider Schema (Based on constants)
export const MFAProviderSchema = z.enum([
  MFA_PROVIDERS.TOTP,
  MFA_PROVIDERS.SMS,
  MFA_PROVIDERS.EMAIL,
  MFA_PROVIDERS.BACKUP_CODE,
  MFA_PROVIDERS.WEBAUTHN,
  MFA_PROVIDERS.PUSH_NOTIFICATION,
  MFA_PROVIDERS.HARDWARE_TOKEN,
  // Bangladesh specific
  'whatsapp_otp',
  'imo_otp',
  'bkash_pin',
  'nagad_pin',
  'rocket_pin',
  'voice_call_otp',
]);

// MFA Verification Type Schema (Based on constants)
export const MFAVerificationTypeSchema = z.enum([
  MFA_VERIFICATION_TYPES.LOGIN,
  MFA_VERIFICATION_TYPES.PAYMENT,
  MFA_VERIFICATION_TYPES.SENSITIVE_CHANGE,
  MFA_VERIFICATION_TYPES.PASSWORD_CHANGE,
  MFA_VERIFICATION_TYPES.DEVICE_TRUST,
  // Bangladesh specific
  'high_value_order',
  'international_order',
  'bulk_order',
  'first_time_payment',
]);

// MFA Status Schema (Based on constants)
// ✅ FIXED: Use safe approach with fallback strings
export const MFAStatusSchema = z.enum([
  MFA_STATUS.NOT_ENABLED,
  MFA_STATUS.SETUP_PENDING,
  MFA_STATUS.ENABLED,
  MFA_STATUS.LOCKED,
  'disabled',  // Use string directly for consistent behavior
  MFA_STATUS.BACKUP_ONLY,
  'setup_in_progress',
  'enabled_default',
  'enabled_multi',
  'disabled_by_admin',
  'recovery_mode',
]);

// OTP Code Schema (Based on OTP_CONFIG)
export const OTPCodeSchema = z
  .string()
  .length(OTP_CONFIG.LENGTH, `OTP must be ${OTP_CONFIG.LENGTH} digits`)
  .regex(new RegExp(`^[0-9]{${OTP_CONFIG.LENGTH}}$`), 'OTP must contain only digits')
  .brand('OTPCode');

// Backup Code Schema (Based on RECOVERY_CODES)
// ✅ FIXED: Allow both uppercase and lowercase letters
export const BackupCodeSchema = z
  .string()
  .length(RECOVERY_CODES.CODE_LENGTH, `Backup code must be ${RECOVERY_CODES.CODE_LENGTH} characters`)
  .regex(/^[A-Za-z0-9]{8}$/, 'Backup code must be 8 alphanumeric characters (letters and numbers only)')
  .brand('BackupCode');

// MFA Method ID Schema
export const MFAMethodIdSchema = z.string().uuid('Invalid MFA method ID format').brand('MFAMethodId');

// MFA Challenge ID Schema
export const MFAChallengeIdSchema = z.string().uuid('Invalid challenge ID format').brand('MFAChallengeId');

// TOTP Secret Schema
export const TOTPSecretSchema = z
  .string()
  .min(16, 'TOTP secret must be at least 16 characters')
  .max(64, 'TOTP secret too long')
  .regex(/^[A-Z2-7]+=*$/, 'Invalid TOTP secret format (must be Base32 encoded)')
  .brand('TOTPSecret');

// WebAuthn Challenge Schema
export const WebAuthnChallengeSchema = z
  .string()
  .min(32, 'WebAuthn challenge must be at least 32 characters')
  .brand('WebAuthnChallenge');

// ==================== Request Schemas ====================

// MFA Setup Request
export const MFASetupRequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID format'),
    provider: MFAProviderSchema,
    identifier: z.string().min(1, 'Identifier is required').max(255, 'Identifier too long'),
    label: z.string().max(100, 'Label too long').optional(),
    setAsPrimary: z.boolean().default(false),
  })
  .strict()
  .brand('MFASetupRequest');

// MFA Verify Request
export const MFAVerifyRequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID format'),
    methodId: MFAMethodIdSchema.optional(),
    code: z.string().min(1, 'Verification code is required'),
    verificationType: MFAVerificationTypeSchema,
    trustDevice: z.boolean().default(false),
    trustDurationDays: z.number().int().min(1).max(365).optional(),
    challengeId: MFAChallengeIdSchema.optional(),
  })
  .strict()
  .brand('MFAVerifyRequest');

// MFA Recovery Request (Using backup codes)
export const MFARecoveryRequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID format'),
    backupCode: BackupCodeSchema,
    newPassword: z.string().min(8, 'Password must be at least 8 characters').max(128, 'Password too long').optional(),
    trustDevice: z.boolean().default(false),
  })
  .strict()
  .brand('MFARecoveryRequest');

// MFA Challenge Request (Request available methods)
export const MFAChallengeRequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID format'),
    verificationType: MFAVerificationTypeSchema,
    preferredMethod: MFAProviderSchema.optional(),
    forceMethod: z.boolean().default(false),
    metadata: z
      .object({
        amount: z.number().positive('Amount must be positive').optional(),
        orderId: z.string().optional(),
        deviceId: z.string().optional(),
        ipAddress: z.string().ip('Invalid IP address format').optional(),
      })
      .optional(),
  })
  .strict()
  .brand('MFAChallengeRequest');

// Disable MFA Request
export const DisableMFARequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID format'),
    methodId: MFAMethodIdSchema.optional(),
    code: OTPCodeSchema.optional(),
    backupCode: BackupCodeSchema.optional(),
    reason: z.string().max(500, 'Reason too long').optional(),
    adminId: z.string().uuid('Invalid admin ID format').optional(), // If disabled by admin
  })
  .strict()
  .refine(
    (data) => data.code !== undefined || data.backupCode !== undefined || data.adminId !== undefined,
    {
      message: 'Either verification code, backup code, or admin ID is required to disable MFA',
      path: ['code'],
    }
  )
  .brand('DisableMFARequest');

// TOTP Setup Request (Specific to TOTP)
export const TOTPSetupRequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID format'),
    issuer: z.string().default('vubon.com.bd'),
    accountName: z.string().email('Invalid email format for account name'),
  })
  .strict()
  .brand('TOTPSetupRequest');

// WebAuthn Registration Request
export const WebAuthnRegistrationRequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID format'),
    deviceName: z.string().min(1, 'Device name is required').max(100, 'Device name too long'),
    displayName: z.string().max(100, 'Display name too long').optional(),
    authenticatorType: z.enum(['platform', 'cross-platform']).default('cross-platform'),
  })
  .strict()
  .brand('WebAuthnRegistrationRequest');

// WebAuthn Authentication Request
export const WebAuthnAuthRequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID format'),
    challengeId: MFAChallengeIdSchema.optional(),
  })
  .strict()
  .brand('WebAuthnAuthRequest');

// WhatsApp MFA Request (Bangladesh specific)
export const WhatsAppMFARequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID format'),
    phoneNumber: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/, 'Invalid Bangladesh phone number. Use format: 01XXXXXXXXX or +8801XXXXXXXXX'),
    method: z.enum(['whatsapp_otp', 'whatsapp']),
  })
  .strict()
  .brand('WhatsAppMFARequest');

// MFS MFA Request (bKash/Nagad/Rocket - Bangladesh specific)
export const MFSMFARequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID format'),
    provider: z.enum(['bkash_pin', 'nagad_pin', 'rocket_pin']),
    accountNumber: z.string().min(11, 'Account number must be at least 11 digits').max(20, 'Account number too long'),
    pin: z.string().length(4, 'PIN must be 4 digits').regex(/^\d{4}$/, 'PIN must contain only digits'),
  })
  .strict()
  .brand('MFSMFARequest');

// ==================== Response Schemas ====================

// MFA Setup Response
export const MFASetupResponseSchema = z
  .object({
    methodId: MFAMethodIdSchema,
    provider: MFAProviderSchema,
    qrCodeUrl: z.string().url('Invalid QR code URL').optional(),
    secret: TOTPSecretSchema.optional(),
    backupCodes: z.array(z.string()).optional(),
    instructions: z.string().optional(),
    expiresAt: z.date(),
  })
  .strict()
  .brand('MFASetupResponse');

// MFA Challenge Response
export const MFAChallengeResponseSchema = z
  .object({
    challengeId: MFAChallengeIdSchema,
    requiredMethods: z.array(MFAProviderSchema),
    expiresAt: z.date(),
    remainingAttempts: z.number().int().min(0).default(MFA_TIMEOUTS.MAX_VERIFICATION_ATTEMPTS),
    verificationType: MFAVerificationTypeSchema,
    instructions: z.string().optional(),
  })
  .strict()
  .brand('MFAChallengeResponse');

// MFA Verify Response
export const MFAVerifyResponseSchema = z
  .object({
    success: z.boolean(),
    verified: z.boolean(),
    methodUsed: MFAProviderSchema.nullable(),
    remainingAttempts: z.number().int().min(0).optional(),
    isLocked: z.boolean().default(false),
    lockExpiresAt: z.date().optional(),
    error: z.string().optional(),
    errorCode: z.enum([
      'invalid_code',
      'method_locked',
      'max_attempts_exceeded',
      'method_not_found',
      'verification_expired',
    ]).optional(),
    requiresAlternativeMethod: z.boolean().default(false),
    alternativeMethods: z.array(MFAProviderSchema).optional(),
  })
  .strict()
  .brand('MFAVerifyResponse');

// MFA Recovery Response
export const MFARecoveryResponseSchema = z
  .object({
    success: z.boolean(),
    recovered: z.boolean(),
    newSessionCreated: z.boolean(),
    sessionId: z.string().uuid().optional(),
    requiresPasswordReset: z.boolean().default(false),
    remainingBackupCodes: z.number().int().min(0),
    regenerateBackupCodesRequired: z.boolean().default(false),
    message: z.string().optional(),
  })
  .strict()
  .brand('MFARecoveryResponse');

// MFA Method Schema
export const MFAMethodSchema = z
  .object({
    id: MFAMethodIdSchema,
    provider: MFAProviderSchema,
    identifier: z.string(),
    label: z.string().nullable(),
    isPrimary: z.boolean(),
    isVerified: z.boolean(),
    isBackup: z.boolean().default(false),
    priority: z.number().int().min(1).max(10),
    createdAt: z.date(),
    lastUsedAt: z.date().nullable(),
    lastFailedAt: z.date().nullable(),
    iconName: z.string(),
    displayName: z.string(),
  })
  .strict()
  .brand('MFAMethod');

// MFA Status Response
export const MFAStatusResponseSchema = z
  .object({
    enabled: z.boolean(),
    status: MFAStatusSchema,
    methods: z.array(MFAMethodSchema),
    requiredForRole: z.boolean(),
    requiredForAction: z.boolean(),
    trustedDevices: z.array(z.string()),
    recoveryCodesRemaining: z.number().int().min(0),
    defaultMethod: MFAProviderSchema.nullable(),
    recommendedMethods: z.array(MFAProviderSchema),
  })
  .strict()
  .brand('MFAStatusResponse');

// TOTP Setup Response
export const TOTPSetupResponseSchema = z
  .object({
    methodId: MFAMethodIdSchema,
    secret: TOTPSecretSchema,
    qrCodeUrl: z.string().url('Invalid QR code URL'),
    backupCodes: z.array(z.string()),
  })
  .strict()
  .brand('TOTPSetupResponse');

// WebAuthn Registration Response
export const WebAuthnRegistrationResponseSchema = z
  .object({
    challenge: WebAuthnChallengeSchema,
    rpId: z.string(),
    rpName: z.string(),
    userId: z.string(),
    userName: z.string(),
    userDisplayName: z.string(),
    timeout: z.number().int().positive(),
    attestation: z.enum(['none', 'indirect', 'direct']),
    authenticatorSelection: z
      .object({
        authenticatorAttachment: z.enum(['platform', 'cross-platform']).optional(),
        residentKey: z.enum(['discouraged', 'preferred', 'required']).optional(),
        userVerification: z.enum(['discouraged', 'preferred', 'required']).optional(),
      })
      .optional(),
  })
  .strict()
  .brand('WebAuthnRegistrationResponse');

// WebAuthn Authentication Response
export const WebAuthnAuthResponseSchema = z
  .object({
    challenge: WebAuthnChallengeSchema,
    rpId: z.string(),
    timeout: z.number().int().positive(),
    allowCredentials: z
      .array(
        z.object({
          id: z.string(),
          type: z.literal('public-key'),
          transports: z.array(z.enum(['usb', 'nfc', 'ble', 'internal'])).optional(),
        })
      )
      .optional(),
    userVerification: z.enum(['discouraged', 'preferred', 'required']).default('preferred'),
  })
  .strict()
  .brand('WebAuthnAuthResponse');

// ==================== Type Exports ====================

export type MFAProvider = z.infer<typeof MFAProviderSchema>;
export type MFAVerificationType = z.infer<typeof MFAVerificationTypeSchema>;
export type MFAStatus = z.infer<typeof MFAStatusSchema>;
export type OTPCode = z.infer<typeof OTPCodeSchema>;
export type BackupCode = z.infer<typeof BackupCodeSchema>;
export type MFAMethodId = z.infer<typeof MFAMethodIdSchema>;
export type MFAChallengeId = z.infer<typeof MFAChallengeIdSchema>;
export type TOTPSecret = z.infer<typeof TOTPSecretSchema>;
export type WebAuthnChallenge = z.infer<typeof WebAuthnChallengeSchema>;

export type MFASetupRequest = z.infer<typeof MFASetupRequestSchema>;
export type MFAVerifyRequest = z.infer<typeof MFAVerifyRequestSchema>;
export type MFARecoveryRequest = z.infer<typeof MFARecoveryRequestSchema>;
export type MFAChallengeRequest = z.infer<typeof MFAChallengeRequestSchema>;
export type DisableMFARequest = z.infer<typeof DisableMFARequestSchema>;
export type TOTPSetupRequest = z.infer<typeof TOTPSetupRequestSchema>;
export type WebAuthnRegistrationRequest = z.infer<typeof WebAuthnRegistrationRequestSchema>;
export type WebAuthnAuthRequest = z.infer<typeof WebAuthnAuthRequestSchema>;
export type WhatsAppMFARequest = z.infer<typeof WhatsAppMFARequestSchema>;
export type MFSMFARequest = z.infer<typeof MFSMFARequestSchema>;

export type MFASetupResponse = z.infer<typeof MFASetupResponseSchema>;
export type MFAChallengeResponse = z.infer<typeof MFAChallengeResponseSchema>;
export type MFAVerifyResponse = z.infer<typeof MFAVerifyResponseSchema>;
export type MFARecoveryResponse = z.infer<typeof MFARecoveryResponseSchema>;
export type MFAMethod = z.infer<typeof MFAMethodSchema>;
export type MFAStatusResponse = z.infer<typeof MFAStatusResponseSchema>;
export type TOTPSetupResponse = z.infer<typeof TOTPSetupResponseSchema>;
export type WebAuthnRegistrationResponse = z.infer<typeof WebAuthnRegistrationResponseSchema>;
export type WebAuthnAuthResponse = z.infer<typeof WebAuthnAuthResponseSchema>;
