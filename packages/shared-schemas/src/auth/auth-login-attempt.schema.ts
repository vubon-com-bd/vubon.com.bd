/**
 * Auth Login Attempt Schema
 * @module shared-schemas/auth
 *
 * Values আসে shared-constants/auth/auth-login-attempt.constants থেকে।
 */

import { z } from 'zod';
import { AUTH_LOGIN_ATTEMPT_STATUS } from '@vubon/shared-constants/auth';

export const LoginAttemptStatusSchema = z.enum(
  Object.values(AUTH_LOGIN_ATTEMPT_STATUS) as [string, ...string[]]
);

export const LoginAttemptSchema = z.object({
  id: z.string().min(1),
  userId: z.string().optional(),
  identifier: z.string().min(1).max(255),
  status: LoginAttemptStatusSchema,
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
  deviceId: z.string().max(128).optional(),
  failureReason: z.string().max(500).optional(),
  attemptedAt: z.string().datetime(),
});

export const LoginAttemptSummarySchema = z.object({
  identifier: z.string().min(1).max(255),
  totalAttempts: z.number().int().nonnegative(),
  failedAttempts: z.number().int().nonnegative(),
  lastAttemptAt: z.string().datetime(),
  isLocked: z.boolean(),
  lockedUntil: z.string().datetime().optional(),
  lockoutRemainingSeconds: z.number().int().nonnegative().optional(),
});

export const AccountLockoutSchema = z.object({
  userId: z.string().min(1),
  reason: z.string().min(1).max(500),
  lockedAt: z.string().datetime(),
  lockedUntil: z.string().datetime(),
  attemptCount: z.number().int().positive(),
  ipAddress: z.string().ip().optional(),
});

export const LoginAttemptFilterSchema = z.object({
  userId: z.string().optional(),
  identifier: z.string().max(255).optional(),
  status: LoginAttemptStatusSchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type LoginAttemptSchemaType = z.infer<typeof LoginAttemptSchema>;
export type LoginAttemptSummarySchemaType = z.infer<typeof LoginAttemptSummarySchema>;
export type AccountLockoutSchemaType = z.infer<typeof AccountLockoutSchema>;
export type LoginAttemptFilterSchemaType = z.infer<typeof LoginAttemptFilterSchema>;
