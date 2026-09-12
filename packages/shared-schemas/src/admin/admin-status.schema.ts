import { z } from 'zod';
import { ADMIN_STATUS } from '@vubon/shared-constants/src/admin/admin-status.constants';

const adminStatusValues = Object.values(ADMIN_STATUS) as [string, ...string[]];

export const AdminStatusSchema = z.object({
  status: z.enum(adminStatusValues),
  category: z.literal('admin'),
});

export const AdminStatusEnumSchema = z.enum(adminStatusValues);
