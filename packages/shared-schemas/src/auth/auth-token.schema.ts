import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_TOKEN } from '@vubon/shared-constants/src/auth/auth-token.constants';

const authTokenValues = Object.values(AUTH_TOKEN) as [string, ...string[]];

/**
 * Internal AuthToken entity.
 * ⚠️ `token` is a raw secret — never serialize this to clients.
 */
export const AuthTokenSchema = BaseSchema.extend({
  tokenId: z.string().uuid(),
  userId: z.string().uuid(),
  token: z.string().min(20),
  type: z.enum(authTokenValues),
  expiresAt: z.date(),
  isRevoked: z.boolean().default(false),
  revokedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Public-safe AuthToken DTO — no raw token.
 */
export const AuthTokenPublicSchema = AuthTokenSchema.omit({ token: true }).extend({
  tokenPreview: z.string().max(12),
});
