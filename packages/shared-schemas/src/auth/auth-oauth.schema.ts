import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_OAUTH } from '@vubon/shared-constants';

export const AuthOauthSchema = BaseSchema.extend({
  oauthId: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(Object.keys(AUTH_OAUTH) as [string, ...string[]]),
  clientId: z.string(),
  clientSecret: z.string(),
  redirectUri: z.string().url(),
  scope: z.array(z.string()),
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
