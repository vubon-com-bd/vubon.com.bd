/**
 * Auth MFA Schema
 * প্রমাণীকরণ মাল্টি-ফ্যাক্টর অথেনটিকেশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_MFA } from '@vubon/shared-constants';

export const AuthMFASchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum([
    AUTH_MFA.TYPES.TOTP,
    AUTH_MFA.TYPES.SMS,
    AUTH_MFA.TYPES.EMAIL,
    AUTH_MFA.TYPES.BACKUP_CODE,
    AUTH_MFA.TYPES.WEBAUTHN,
    AUTH_MFA.TYPES.HARDWARE_TOKEN,
    AUTH_MFA.TYPES.SMART_CARD,
    AUTH_MFA.TYPES.BIOMETRIC,
    AUTH_MFA.TYPES.PUSH_NOTIFICATION,
    AUTH_MFA.TYPES.RECOVERY_CODE,
  ]),
  method: z.enum([
    AUTH_MFA.METHODS.AUTHENTICATOR_APP,
    AUTH_MFA.METHODS.SMS_OTP,
    AUTH_MFA.METHODS.EMAIL_OTP,
    AUTH_MFA.METHODS.BACKUP_CODES,
    AUTH_MFA.METHODS.WEBAUTHN_PASSKEY,
    AUTH_MFA.METHODS.YUBIKEY,
    AUTH_MFA.METHODS.SMART_CARD,
    AUTH_MFA.METHODS.FINGERPRINT,
    AUTH_MFA.METHODS.FACE_ID,
    AUTH_MFA.METHODS.IRIS_SCAN,
  ]),
  status: z.enum([
    AUTH_MFA.STATUS.ENABLED,
    AUTH_MFA.STATUS.DISABLED,
    AUTH_MFA.STATUS.PENDING,
    AUTH_MFA.STATUS.VERIFIED,
    AUTH_MFA.STATUS.FAILED,
    AUTH_MFA.STATUS.LOCKED,
    AUTH_MFA.STATUS.EXPIRED,
  ]),
  secret: z.string().optional(),
  backupCodes: z.array(z.string()).optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  deviceId: z.string().uuid().optional(),
  enabledAt: z.date().optional(),
  disabledAt: z.date().optional(),
  lastUsedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthMFASetupSchema = z.object({
  type: AuthMFASchema.shape.type,
  method: AuthMFASchema.shape.method,
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  deviceId: z.string().uuid().optional(),
});

export const AuthMFAVerifySchema = z.object({
  code: z.string().min(1, 'Verification code is required'),
  method: AuthMFASchema.shape.method,
  backupCode: z.string().optional(),
});

export type AuthMFASchemaType = z.infer<typeof AuthMFASchema>;
export type AuthMFASetupSchemaType = z.infer<typeof AuthMFASetupSchema>;
export type AuthMFAVerifySchemaType = z.infer<typeof AuthMFAVerifySchema>;
