import { z } from 'zod';
import { AUTH_METHOD } from '@vubon/shared-constants';

export const AuthMethodSchema = z.object({
  method: z.enum(Object.keys(AUTH_METHOD) as [string, ...string[]]),
  category: z.literal('auth'),
});

export const AuthMethodEnumSchema = z.enum(Object.keys(AUTH_METHOD) as [string, ...string[]]);
