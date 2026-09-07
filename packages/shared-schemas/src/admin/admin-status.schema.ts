import { z } from 'zod';
import { UserStatusSchema } from '../user/user-status.schema';
import { ADMIN_STATUS } from '@vubon/shared-constants';

export const AdminStatusSchema = UserStatusSchema.extend({
  status: z.enum(Object.keys(ADMIN_STATUS) as [string, ...string[]]),
  category: z.literal('admin'),
});

export const AdminStatusEnumSchema = z.enum(Object.keys(ADMIN_STATUS) as [string, ...string[]]);
