/**
 * Auth Core Schema
 * @module shared-schemas/auth
 *
 * Auth entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { EmailSchema } from '../common/primitives/email.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';
import { AuthStatusSchema } from './auth-status.schema';
import { AuthTypeSchema } from './auth-type.schema';
import { AuthProviderSchema } from './auth-provider.schema';
import { AuthMethodSchema } from './auth-method.schema';

export const AuthSchema = BaseEntitySchema.extend({
  userId: UuidSchema,
  type: AuthTypeSchema,
  provider: AuthProviderSchema,
  method: AuthMethodSchema,
  status: AuthStatusSchema,
  identifier: z.union([EmailSchema, PhoneSchema, z.string().min(1).max(255)]),

  /** @internal */
  passwordHash: z.string().min(20).max(255).optional(),

  isEmailVerified: z.boolean(),
  isPhoneVerified: z.boolean(),
  isMfaEnabled: z.boolean(),
  lastLoginAt: z.string().datetime().optional(),
  lastLoginIp: z.string().ip().optional(),
  failedAttempts: z.number().int().nonnegative(),
  lockedUntil: z.string().datetime().optional(),
});

export const AuthPublicSchema = AuthSchema.omit({
  passwordHash: true,
  failedAttempts: true,
  lockedUntil: true,
  lastLoginIp: true,
});

export const AuthResultSchema = z.object({
  success: z.boolean(),
  userId: UuidSchema.optional(),
  sessionId: UuidSchema.optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  expiresAt: z.number().int().positive().optional(),
  requiresMfa: z.boolean().optional(),
  requiresVerification: z.boolean().optional(),
  error: z.string().optional(),
});

export const AuthContextSchema = z.object({
  userId: UuidSchema,
  sessionId: UuidSchema,
  roles: z.array(z.string()),
  permissions: z.array(z.string()),
  authenticatedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
});

export const AuthCredentialsInputSchema = z.object({
  identifier: z.string().min(1).max(255),
  password: z.string().min(1).max(128).optional(),
  otp: z
    .string()
    .regex(/^\d{4,8}$/)
    .optional(),
  provider: AuthProviderSchema.optional(),
  method: AuthMethodSchema.optional(),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
export type AuthPublicSchemaType = z.infer<typeof AuthPublicSchema>;
export type AuthResultSchemaType = z.infer<typeof AuthResultSchema>;
export type AuthContextSchemaType = z.infer<typeof AuthContextSchema>;
export type AuthCredentialsInputSchemaType = z.infer<typeof AuthCredentialsInputSchema>;
