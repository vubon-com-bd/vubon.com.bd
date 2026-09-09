import { z } from 'zod';
import { UserStatusSchema } from '../user/user-status.schema';
import { ADMIN_STATUS } from '@vubon/shared-constants/src/admin/admin-status.constants';

const adminStatusKeys = Object.keys(ADMIN_STATUS) as [string, ...string[]];

export const AdminStatusSchema = UserStatusSchema.extend({
  status: z.enum(adminStatusKeys),
  category: z.literal('admin'),
});
