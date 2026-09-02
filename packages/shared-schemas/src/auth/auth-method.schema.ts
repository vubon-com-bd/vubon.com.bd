/**
 * Auth Method Schema
 * প্রমাণীকরণ পদ্ধতি সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_METHOD } from '@vubon/shared-constants';

export const AuthMethodSchema = z.enum([
  AUTH_METHOD.PASSWORD,
  AUTH_METHOD.OTP,
  AUTH_METHOD.MAGIC_LINK,
  AUTH_METHOD.SOCIAL,
  AUTH_METHOD.SSO,
  AUTH_METHOD.OAUTH,
  AUTH_METHOD.MFA_TOTP,
  AUTH_METHOD.MFA_SMS,
  AUTH_METHOD.MFA_EMAIL,
  AUTH_METHOD.MFA_BACKUP_CODE,
  AUTH_METHOD.BIOMETRIC_FINGERPRINT,
  AUTH_METHOD.BIOMETRIC_FACE,
  AUTH_METHOD.BIOMETRIC_IRIS,
]);

export const AuthMethodConfigSchema = z.object({
  method: AuthMethodSchema,
  enabled: z.boolean().default(true),
  requiresVerification: z.boolean().default(false),
  verificationMethod: z.enum(['email', 'phone', 'both', 'none']).default('none'),
  priority: z.number().int().min(1).max(10).default(5),
  metadata: z.record(z.unknown()).optional(),
});

export type AuthMethodSchemaType = z.infer<typeof AuthMethodSchema>;
export type AuthMethodConfigSchemaType = z.infer<typeof AuthMethodConfigSchema>;
