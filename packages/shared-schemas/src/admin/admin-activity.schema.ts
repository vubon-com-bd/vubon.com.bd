import { z } from 'zod';
import { UserActivitySchema } from '../user/user-activity.schema';
import { ADMIN_ACTIVITY } from '@vubon/shared-constants/src/admin/admin-activity.constants';

const adminActivityValues = Object.values(ADMIN_ACTIVITY) as [string, ...string[]];

export const AdminActivitySchema = UserActivitySchema.extend({
  adminId: z.string().uuid(),
  action: z.enum(adminActivityValues),
  resource: z.string(),
  resourceId: z.string(),
  beforeState: z.record(z.unknown()).optional(),
  afterState: z.record(z.unknown()).optional(),
});
