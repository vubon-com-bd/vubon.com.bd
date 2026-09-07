import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_SOCIAL } from '@vubon/shared-constants';

export const AuthSocialSchema = BaseSchema.extend({
  socialId: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(Object.keys(AUTH_SOCIAL) as [string, ...string[]]),
  providerUserId: z.string(),
  providerEmail: z.string().email(),
  displayName: z.string(),
  profileUrl: z.string().url().optional(),
  avatarUrl: z.string().url().optional(),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
