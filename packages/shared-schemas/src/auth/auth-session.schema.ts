/**
 * Auth Session Schema
 * প্রমাণীকরণ সেশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_SESSION } from '@vubon/shared-constants';

export const AuthSessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  token: z.string().min(1, 'Session token is required'),
  expiresAt: z.date(),
  lastActivityAt: z.date(),
  deviceId: z.string().uuid(),
  status: z.enum([
    AUTH_SESSION.STATUS.ACTIVE,
    AUTH_SESSION.STATUS.EXPIRED,
    AUTH_SESSION.STATUS.TERMINATED,
    AUTH_SESSION.STATUS.REVOKED,
    AUTH_SESSION.STATUS.PENDING,
    AUTH_SESSION.STATUS.INACTIVE,
  ]),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  location: z.string().optional(),
  isActive: z.boolean().default(true),
  terminatedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthSessionCreateSchema = AuthSessionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  isActive: true,
}).extend({
  expiresIn: z.number().int().positive().optional(),
  status: AuthSessionSchema.shape.status.optional(),
});

export const AuthSessionUpdateSchema = z.object({
  lastActivityAt: z.date().optional(),
  status: AuthSessionSchema.shape.status.optional(),
  terminatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
});

export type AuthSessionSchemaType = z.infer<typeof AuthSessionSchema>;
export type AuthSessionCreateSchemaType = z.infer<typeof AuthSessionCreateSchema>;
export type AuthSessionUpdateSchemaType = z.infer<typeof AuthSessionUpdateSchema>;
