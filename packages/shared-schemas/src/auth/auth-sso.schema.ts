import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_SSO } from '@vubon/shared-constants/src/auth/auth-sso.constants';

const authSsoValues = Object.values(AUTH_SSO) as [string, ...string[]];

/**
 * Internal AuthSSO entity.
 * ⚠️ samlResponse can contain sensitive assertions — keep @internal.
 */
export const AuthSsoSchema = BaseSchema.extend({
  ssoId: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(authSsoValues),
  idpUserId: z.string(),
  idpEmail: z.string().email(),
  /** @internal SAML assertion — never expose to clients */
  samlResponse: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const AuthSsoPublicSchema = AuthSsoSchema.omit({
  samlResponse: true,
  metadata: true,
});
