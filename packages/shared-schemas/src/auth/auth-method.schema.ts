import { z } from 'zod';
import { AUTH_METHOD } from '@vubon/shared-constants/src/auth/auth-method.constants';

const authMethodValues = Object.values(AUTH_METHOD) as [string, ...string[]];

export const AuthMethodSchema = z.object({
  method: z.enum(authMethodValues),
});

export const AuthMethodEnumSchema = z.enum(authMethodValues);
