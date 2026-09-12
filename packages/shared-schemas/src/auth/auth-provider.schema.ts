import { z } from 'zod';
import { AUTH_PROVIDER } from '@vubon/shared-constants/src/auth/auth-provider.constants';

const authProviderValues = Object.values(AUTH_PROVIDER) as [string, ...string[]];

export const AuthProviderSchema = z.object({
  provider: z.enum(authProviderValues),
});

export const AuthProviderEnumSchema = z.enum(authProviderValues);
