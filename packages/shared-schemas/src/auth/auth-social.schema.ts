import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_SOCIAL } from '@vubon/shared-constants/src/auth/auth-social.constants';

const authSocialValues = Object.values(AUTH_SOCIAL) as [string, ...string[]];

/**
 * Internal AuthSocial entity.
 * ⚠️ Access/refresh tokens are stored encrypted — never plain.
 */
export const AuthSocialSchema = BaseSchema.extend({
  socialId: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(authSocialValues),
  providerUserId: z.string(),
  providerEmail: z.string().email(),
  displayName: z.string(),
  profileUrl: z.string().url().optional(),
  avatarUrl: z.string().url().optional(),
  /** @internal AES-256 encrypted */
  encryptedAccessToken: z.string(),
  /** @internal AES-256 encrypted */
  encryptedRefreshToken: z.string().optional(),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Public-safe AuthSocial DTO — no tokens.
 */
export const AuthSocialPublicSchema = AuthSocialSchema.omit({
  encryptedAccessToken: true,
  encryptedRefreshToken: true,
  metadata: true,
});
