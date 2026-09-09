import { z } from 'zod';
import { UserTypeSchema } from '../user/user-type.schema';
import { ADMIN_TYPES } from '@vubon/shared-constants/src/admin/admin-type.constants';

const adminTypeKeys = Object.keys(ADMIN_TYPES) as [string, ...string[]];

export const AdminTypeSchema = UserTypeSchema.extend({
  type: z.enum(adminTypeKeys),
  category: z.literal('admin'),
});
