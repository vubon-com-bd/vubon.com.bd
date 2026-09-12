import { z } from 'zod';
import { AUTH_TYPES } from '@vubon/shared-constants/src/auth/auth-type.constants';

const authTypeValues = Object.values(AUTH_TYPES) as [string, ...string[]];

export const AuthTypeSchema = z.object({
  type: z.enum(authTypeValues),
  category: z.literal('auth'),
});

export const AuthTypeEnumSchema = z.enum(authTypeValues);
