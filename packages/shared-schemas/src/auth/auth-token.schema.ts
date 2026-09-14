/**
 * Auth Token Schema
 * @module shared-schemas/auth
 *
 * Values আসে shared-constants/auth/auth-token.constants থেকে।
 */

import { z } from 'zod';
import { AUTH_TOKEN_TYPE } from '@vubon/shared-constants/auth';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const AuthTokenTypeSchema = z.enum(Object.values(AUTH_TOKEN_TYPE) as [string, ...string[]]);

export const AuthTokenPayloadSchema = z.object({
  sub: UuidSchema,
  sid: UuidSchema.optional(),
  type: AuthTokenTypeSchema,
  iat: z.number().int().nonnegative(),
  exp: z.number().int().nonnegative(),
  iss: z.string().min(1),
  aud: z.string().optional(),
  jti: z.string().optional(),
  scope: z.array(z.string()).optional(),
});

export const AuthTokenPairSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  accessExpiresAt: z.number().int().positive(),
  refreshExpiresAt: z.number().int().positive(),
  tokenType: z.literal('Bearer').default('Bearer'),
});

export const AuthTokenVerifyResultSchema = z.object({
  valid: z.boolean(),
  payload: AuthTokenPayloadSchema.optional(),
  error: z.string().optional(),
  expiredAt: z.number().int().nonnegative().optional(),
});

export const AuthTokenRefreshInputSchema = z.object({
  refreshToken: z.string().min(1),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
});

export const PasswordResetTokenSchema = z.object({
  token: z.string().min(1),
  userId: UuidSchema,
  expiresAt: z.string().datetime(),
  usedAt: z.string().datetime().optional(),
});

export const EmailVerifyTokenSchema = z.object({
  token: z.string().min(1),
  userId: UuidSchema,
  email: z.string().email(),
  expiresAt: z.string().datetime(),
  verifiedAt: z.string().datetime().optional(),
});

export const InviteTokenPayloadSchema = z.object({
  token: z.string().min(1),
  email: z.string().email(),
  invitedBy: UuidSchema,
  role: z.string().min(1).max(50),
  expiresAt: z.string().datetime(),
});

export const ApiKeyDataSchema = z.object({
  key: z.string().min(1),
  userId: UuidSchema,
  name: z.string().min(1).max(100),
  scopes: z.array(z.string()).max(100),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  lastUsedAt: z.string().datetime().optional(),
  isActive: z.boolean(),
});

export type AuthTokenPayloadSchemaType = z.infer<typeof AuthTokenPayloadSchema>;
export type AuthTokenPairSchemaType = z.infer<typeof AuthTokenPairSchema>;
export type AuthTokenVerifyResultSchemaType = z.infer<typeof AuthTokenVerifyResultSchema>;
export type AuthTokenRefreshInputSchemaType = z.infer<typeof AuthTokenRefreshInputSchema>;
export type PasswordResetTokenSchemaType = z.infer<typeof PasswordResetTokenSchema>;
export type EmailVerifyTokenSchemaType = z.infer<typeof EmailVerifyTokenSchema>;
export type InviteTokenPayloadSchemaType = z.infer<typeof InviteTokenPayloadSchema>;
export type ApiKeyDataSchemaType = z.infer<typeof ApiKeyDataSchema>;
