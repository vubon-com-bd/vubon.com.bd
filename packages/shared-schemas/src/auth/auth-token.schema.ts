import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_TOKEN } from '@vubon/shared-constants/src/auth/auth-token.constants';

const authTokenKeys = Object.keys(AUTH_TOKEN) as [string, ...string[]];

export const AuthTokenSchema = BaseSchema.extend({
  tokenId: z.string().uuid(),
  userId: z.string().uuid(),
  token: z.string(),
  type: z.enum(authTokenKeys),
  expiresAt: z.date(),
  isRevoked: z.boolean().default(false),
  revokedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
