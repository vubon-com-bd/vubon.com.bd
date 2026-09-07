import { z } from 'zod';
import { AUTH_TYPES } from '@vubon/shared-constants';

export const AuthTypeSchema = z.object({
  type: z.enum(Object.keys(AUTH_TYPES) as [string, ...string[]]),
  category: z.literal('auth'),
});

export const AuthTypeEnumSchema = z.enum(Object.keys(AUTH_TYPES) as [string, ...string[]]);
