/**
 * Auth Token Schema
 * প্রমাণীকরণ টোকেন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_TOKEN } from '@vubon/shared-constants';

export const AuthTokenSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  token: z.string().min(1, 'Token is required'),
  type: z.enum([
    AUTH_TOKEN.ACCESS,
    AUTH_TOKEN.REFRESH,
    AUTH_TOKEN.VERIFICATION,
    AUTH_TOKEN.PASSWORD_RESET,
    AUTH_TOKEN.MAGIC_LINK,
    AUTH_TOKEN.MFA,
    AUTH_TOKEN.API_KEY,
  ]),
  expiresAt: z.date(),
  revokedAt: z.date().optional(),
  revokedReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthTokenPayloadSchema = z.object({
  sub: z.string().uuid(),
  type: AuthTokenSchema.shape.type,
  sessionId: z.string().uuid().optional(),
  deviceId: z.string().uuid().optional(),
  role: z.string().optional(),
  permissions: z.array(z.string()).optional(),
  iat: z.number().int(),
  exp: z.number().int(),
});

export const AuthTokenCreateSchema = AuthTokenSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  revokedAt: true,
  revokedReason: true,
}).extend({
  expiresIn: z.number().int().positive().optional(),
});

export type AuthTokenSchemaType = z.infer<typeof AuthTokenSchema>;
export type AuthTokenPayloadSchemaType = z.infer<typeof AuthTokenPayloadSchema>;
export type AuthTokenCreateSchemaType = z.infer<typeof AuthTokenCreateSchema>;
