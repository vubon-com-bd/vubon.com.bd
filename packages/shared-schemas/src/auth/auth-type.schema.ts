import { z } from 'zod';
import { AUTH_TYPES } from '@vubon/shared-constants/src/auth/auth-type.constants';

const authTypeKeys = Object.keys(AUTH_TYPES) as [string, ...string[]];

export const AuthTypeSchema = z.object({
  type: z.enum(authTypeKeys),
  category: z.literal('auth'),
});

export const AuthTypeEnumSchema = z.enum(authTypeKeys);
