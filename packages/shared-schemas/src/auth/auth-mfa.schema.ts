import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_MFA } from '@vubon/shared-constants/src/auth/auth-mfa.constants';

const authMfaValues = Object.values(AUTH_MFA) as [string, ...string[]];

/**
 * Internal AuthMfa entity.
 * ⚠️ Secret + backup codes are encrypted/hashed — never plain.
 */
export const AuthMfaSchema = BaseSchema.extend({
  mfaId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(authMfaValues),
  /** @internal AES-256 encrypted TOTP secret */
  encryptedSecret: z.string(),
  /** @internal bcrypt-hashed backup codes */
  backupCodeHashes: z.array(z.string()).min(5).max(20),
  isEnabled: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Public-safe AuthMfa DTO — no secret or code hashes.
 */
export const AuthMfaPublicSchema = AuthMfaSchema.omit({
  encryptedSecret: true,
  backupCodeHashes: true,
  metadata: true,
}).extend({
  hasBackupCodes: z.boolean(),
});

/**
 * MFA SETUP REQUEST — client sends type; server returns secret + QR once.
 * Formerly named MfaSetupSchema (renamed for clarity).
 */
export const MfaSetupRequestSchema = z.object({
  type: z.enum(authMfaValues),
});

/** @deprecated Use MfaSetupRequestSchema. */
export const MfaSetupSchema = MfaSetupRequestSchema;

/**
 * MFA SETUP RESPONSE — one-time payload shown to the user.
 * Mirrors MfaSetupResponse in shared-types.
 */
export const MfaSetupResponseSchema = z.object({
  secret: z.string(),
  qrCode: z.string().url(),
  backupCodes: z.array(z.string()).min(5).max(20),
  recoveryUrl: z.string().url(),
});

/**
 * MFA VERIFY REQUEST — client sends the OTP code.
 */
export const MfaVerifyRequestSchema = z.object({
  type: z.enum(authMfaValues),
  code: z
    .string()
    .length(6)
    .regex(/^\d{6}$/, 'OTP must be 6 digits'),
});
