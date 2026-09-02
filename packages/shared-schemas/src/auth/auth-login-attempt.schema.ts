/**
 * Auth Login Attempt Schema
 * প্রমাণীকরণ লগইন প্রচেষ্টা সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants';

export const AuthLoginAttemptSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  ipAddress: z.string().ip(),
  userAgent: z.string().optional(),
  status: z.enum([
    AUTH_LOGIN_ATTEMPT.STATUS.SUCCESS,
    AUTH_LOGIN_ATTEMPT.STATUS.FAILED,
    AUTH_LOGIN_ATTEMPT.STATUS.BLOCKED,
    AUTH_LOGIN_ATTEMPT.STATUS.LOCKED,
    AUTH_LOGIN_ATTEMPT.STATUS.SUSPICIOUS,
    AUTH_LOGIN_ATTEMPT.STATUS.RATE_LIMITED,
    AUTH_LOGIN_ATTEMPT.STATUS.INVALID_CREDENTIALS,
    AUTH_LOGIN_ATTEMPT.STATUS.INVALID_OTP,
    AUTH_LOGIN_ATTEMPT.STATUS.INVALID_MFA,
    AUTH_LOGIN_ATTEMPT.STATUS.ACCOUNT_LOCKED,
    AUTH_LOGIN_ATTEMPT.STATUS.ACCOUNT_SUSPENDED,
  ]),
  blockReason: z
    .enum([
      AUTH_LOGIN_ATTEMPT.BLOCK_REASONS.TOO_MANY_ATTEMPTS,
      AUTH_LOGIN_ATTEMPT.BLOCK_REASONS.SUSPICIOUS_ACTIVITY,
      AUTH_LOGIN_ATTEMPT.BLOCK_REASONS.UNUSUAL_LOCATION,
      AUTH_LOGIN_ATTEMPT.BLOCK_REASONS.UNUSUAL_DEVICE,
      AUTH_LOGIN_ATTEMPT.BLOCK_REASONS.UNUSUAL_TIME,
      AUTH_LOGIN_ATTEMPT.BLOCK_REASONS.BLACKLISTED_IP,
      AUTH_LOGIN_ATTEMPT.BLOCK_REASONS.BLACKLISTED_DEVICE,
      AUTH_LOGIN_ATTEMPT.BLOCK_REASONS.BLACKLISTED_USER,
      AUTH_LOGIN_ATTEMPT.BLOCK_REASONS.ADMIN_BLOCKED,
      AUTH_LOGIN_ATTEMPT.BLOCK_REASONS.SYSTEM_BLOCKED,
    ])
    .optional(),
  success: z.boolean(),
  attemptAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthLoginAttemptCreateSchema = AuthLoginAttemptSchema.omit({
  id: true,
  attemptAt: true,
  createdAt: true,
  updatedAt: true,
});

export type AuthLoginAttemptSchemaType = z.infer<typeof AuthLoginAttemptSchema>;
export type AuthLoginAttemptCreateSchemaType = z.infer<typeof AuthLoginAttemptCreateSchema>;
