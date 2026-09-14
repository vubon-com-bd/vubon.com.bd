/**
 * Auth Social Schema
 * @module shared-schemas/auth
 *
 * Values আসে shared-constants/auth/auth-social.constants থেকে।
 */

import { z } from 'zod';
import { AUTH_SOCIAL } from '@vubon/shared-constants/auth';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const SocialProviderSchema = z.enum(Object.values(AUTH_SOCIAL) as [string, ...string[]]);

export const SocialAccountSchema = z.object({
  id: z.string().min(1),
  userId: UuidSchema,
  provider: SocialProviderSchema,
  providerUserId: z.string().min(1).max(255),
  email: z.string().email().optional(),
  name: z.string().max(200).optional(),
  avatarUrl: z.string().url().optional(),
  connectedAt: z.string().datetime(),
  lastUsedAt: z.string().datetime().optional(),
  isActive: z.boolean(),
});

export const SocialLoginInputSchema = z.object({
  provider: SocialProviderSchema,
  code: z.string().min(1, 'Authorization code is required'),
  redirectUri: z.string().url(),
  state: z.string().max(255).optional(),
});

export const SocialLoginResultSchema = z.object({
  success: z.boolean(),
  userId: UuidSchema.optional(),
  isNewUser: z.boolean(),
  isEmailVerified: z.boolean(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  error: z.string().optional(),
});

export const SocialAccountLinkInputSchema = z.object({
  userId: UuidSchema,
  provider: SocialProviderSchema,
  code: z.string().min(1),
  redirectUri: z.string().url(),
});

export const SocialAccountUnlinkInputSchema = z.object({
  userId: UuidSchema,
  provider: SocialProviderSchema,
});

export type SocialProviderSchemaType = z.infer<typeof SocialProviderSchema>;
export type SocialAccountSchemaType = z.infer<typeof SocialAccountSchema>;
export type SocialLoginInputSchemaType = z.infer<typeof SocialLoginInputSchema>;
export type SocialLoginResultSchemaType = z.infer<typeof SocialLoginResultSchema>;
export type SocialAccountLinkInputSchemaType = z.infer<typeof SocialAccountLinkInputSchema>;
export type SocialAccountUnlinkInputSchemaType = z.infer<typeof SocialAccountUnlinkInputSchema>;
