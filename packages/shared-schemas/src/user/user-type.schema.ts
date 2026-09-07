import { z } from 'zod';
import { USER_TYPES } from '@vubon/shared-constants';

export const UserTypeSchema = z.object({
  type: z.enum(Object.keys(USER_TYPES) as [string, ...string[]]),
  category: z.literal('user'),
});

export const UserTypeEnumSchema = z.enum(Object.keys(USER_TYPES) as [string, ...string[]]);
