import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_OAUTH } from '@vubon/shared-constants/src/auth/auth-oauth.constants';
import { AUTH_PROVIDER } from '@vubon/shared-constants/src/auth/auth-provider.constants';

const oauthGrantValues = Object.values(AUTH_OAUTH) as [string, ...string[]];
const providerValues = Object.values(AUTH_PROVIDER) as [string, ...string[]];

/**
 * Internal AuthOAuth entity.
 * ⚠️ clientSecret + tokens are encrypted — never plain, never public.
 */
export const AuthOauthSchema = BaseSchema.extend({
  oauthId: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(providerValues),
  grantType: z.enum(oauthGrantValues),
  clientId: z.string(),
  /** @internal AES-256 encrypted */
  encryptedClientSecret: z.string(),
  redirectUri: z.string().url(),
  scope: z.array(z.string()),
  /** @internal AES-256 encrypted */
  encryptedAccessToken: z.string(),
  /** @internal AES-256 encrypted */
  encryptedRefreshToken: z.string().optional(),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Public-safe AuthOAuth DTO — no secrets.
 */
export const AuthOauthPublicSchema = AuthOauthSchema.omit({
  encryptedClientSecret: true,
  encryptedAccessToken: true,
  encryptedRefreshToken: true,
  metadata: true,
});
