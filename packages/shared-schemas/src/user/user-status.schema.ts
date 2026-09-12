import { z } from 'zod';
import { USER_STATUS } from '@vubon/shared-constants/src/user/user-status.constants';

const userStatusValues = Object.values(USER_STATUS) as [string, ...string[]];

export const UserStatusSchema = z.object({
  status: z.enum(userStatusValues),
  category: z.literal('user'),
});

export const UserStatusEnumSchema = z.enum(userStatusValues);
