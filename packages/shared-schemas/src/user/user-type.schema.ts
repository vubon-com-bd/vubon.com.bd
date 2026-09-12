import { z } from 'zod';
import { USER_TYPES } from '@vubon/shared-constants/src/user/user-type.constants';

const userTypeValues = Object.values(USER_TYPES) as [string, ...string[]];

export const UserTypeSchema = z.object({
  type: z.enum(userTypeValues),
  category: z.literal('user'),
});

export const UserTypeEnumSchema = z.enum(userTypeValues);
