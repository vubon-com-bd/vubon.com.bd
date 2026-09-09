import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { USER_STATUS } from '@vubon/shared-constants/src/user/user-status.constants';

const userStatusKeys = Object.keys(USER_STATUS) as [string, ...string[]];

export const UserStatusSchema = StatusSchema.extend({
  status: z.enum(userStatusKeys),
  category: z.literal('user'),
});

export const UserStatusEnumSchema = z.enum(userStatusKeys);
