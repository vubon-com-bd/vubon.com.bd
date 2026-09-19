/**
 * Auth Session Schema
 * @module shared-schemas/auth
 *
 * Values আসে shared-constants/auth/auth-session.constants থেকে।
 */

import { z } from 'zod';
import { AUTH_SESSION } from '@vubon/shared-constants/auth';
import { SESSION_STATUS } from '@vubon/shared-constants/infrastructure';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const AuthSessionStatusSchema = z.enum(
  Object.values(SESSION_STATUS) as [string, ...string[]]
);

export const AuthSessionDataSchema = z.object({
  id: UuidSchema,
  userId: UuidSchema,
  status: AuthSessionStatusSchema,
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
  deviceId: z.string().max(128).optional(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  lastAccessedAt: z.string().datetime(),
  refreshedAt: z.string().datetime().optional(),
});

export const AuthSessionPublicSchema = AuthSessionDataSchema.omit({
  userId: true,
}).extend({
  isCurrent: z.boolean(),
});

export const AuthSessionCreateInputSchema = z.object({
  userId: UuidSchema,
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
  deviceId: z.string().max(128).optional(),
  rememberMe: z.boolean().optional().default(false),
});

export const AuthSessionRefreshResultSchema = z.object({
  sessionId: UuidSchema,
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresAt: z.number().int().positive(),
  refreshedAt: z.string().datetime(),
});

export const AuthSessionMaxAgeSchema = z
  .number()
  .int()
  .positive()
  .max(AUTH_SESSION.REMEMBER_ME_EXPIRY_SECONDS);

export type AuthSessionDataSchemaType = z.infer<typeof AuthSessionDataSchema>;
export type AuthSessionPublicSchemaType = z.infer<typeof AuthSessionPublicSchema>;
export type AuthSessionCreateInputSchemaType = z.infer<typeof AuthSessionCreateInputSchema>;
export type AuthSessionRefreshResultSchemaType = z.infer<typeof AuthSessionRefreshResultSchema>;
