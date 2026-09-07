import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_SSO } from '@vubon/shared-constants';

export const AuthSsoSchema = BaseSchema.extend({
  ssoId: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(Object.keys(AUTH_SSO) as [string, ...string[]]),
  idpUserId: z.string(),
  idpEmail: z.string().email(),
  samlResponse: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
