import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_TOKEN } from '@vubon/shared-constants';

export const AuthTokenSchema = BaseSchema.extend({
  tokenId: z.string().uuid(),
  userId: z.string().uuid(),
  token: z.string(),
  type: z.enum(Object.keys(AUTH_TOKEN) as [string, ...string[]]),
  expiresAt: z.date(),
  isRevoked: z.boolean().default(false),
  revokedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
