import { z } from 'zod';
import { AUTH_METHOD } from '@vubon/shared-constants/src/auth/auth-method.constants';

const authMethodKeys = Object.keys(AUTH_METHOD) as [string, ...string[]];

export const AuthMethodSchema = z.object({
  method: z.enum(authMethodKeys),
});

export const AuthMethodEnumSchema = z.enum(authMethodKeys);
