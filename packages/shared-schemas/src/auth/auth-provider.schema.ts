import { z } from 'zod';
import { AUTH_PROVIDER } from '@vubon/shared-constants/src/auth/auth-provider.constants';

const authProviderKeys = Object.keys(AUTH_PROVIDER) as [string, ...string[]];

export const AuthProviderSchema = z.object({
  provider: z.enum(authProviderKeys),
});

export const AuthProviderEnumSchema = z.enum(authProviderKeys);
