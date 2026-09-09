import { z } from 'zod';
import { ADMIN_LEVEL } from '@vubon/shared-constants/src/admin/admin-level.constants';

const adminLevelKeys = Object.keys(ADMIN_LEVEL) as [string, ...string[]];

export const AdminLevelSchema = z.object({
  level: z.enum(adminLevelKeys),
  category: z.literal('admin'),
});
