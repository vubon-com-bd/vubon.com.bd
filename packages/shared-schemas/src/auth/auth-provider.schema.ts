import { z } from 'zod';
import { AUTH_PROVIDER } from '@vubon/shared-constants';

export const AuthProviderSchema = z.object({
  provider: z.enum(Object.keys(AUTH_PROVIDER) as [string, ...string[]]),
  category: z.literal('auth'),
});

export const AuthProviderEnumSchema = z.enum(Object.keys(AUTH_PROVIDER) as [string, ...string[]]);
