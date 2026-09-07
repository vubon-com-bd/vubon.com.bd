import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { USER_STATUS } from '@vubon/shared-constants';

export const UserStatusSchema = StatusSchema.extend({
  status: z.enum(Object.keys(USER_STATUS) as [string, ...string[]]),
  category: z.literal('user'),
});

export const UserStatusEnumSchema = z.enum(Object.keys(USER_STATUS) as [string, ...string[]]);
