/**
 * Auth Social Schema
 * প্রমাণীকরণ সোশ্যাল মিডিয়া সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_SOCIAL } from '@vubon/shared-constants';

// AUTH_SOCIAL থেকে প্রোভাইডার নাম ব্যবহার
const socialProviders = Object.keys(AUTH_SOCIAL.PROVIDERS) as [string, ...string[]];

export const AuthSocialSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(socialProviders),
  providerId: z.string().min(1, 'Provider ID is required'),
  email: z.string().email().optional(),
  name: z.string().optional(),
  avatar: z.string().url().optional(),
  accessToken: z.string().min(1, 'Access token is required'),
  refreshToken: z.string().optional(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
  linkedAt: z.date(),
  unlinkedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthSocialCreateSchema = AuthSocialSchema.omit({
  id: true,
  linkedAt: true,
  unlinkedAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  expiresIn: z.number().int().positive().optional(),
});

export const AuthSocialProfileSchema = z.object({
  id: z.string().min(1, 'Social ID is required'),
  email: z.string().email().optional(),
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.string().url().optional(),
  locale: z.string().optional(),
  gender: z.string().optional(),
  birthday: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AuthSocialSchemaType = z.infer<typeof AuthSocialSchema>;
export type AuthSocialCreateSchemaType = z.infer<typeof AuthSocialCreateSchema>;
export type AuthSocialProfileSchemaType = z.infer<typeof AuthSocialProfileSchema>;
