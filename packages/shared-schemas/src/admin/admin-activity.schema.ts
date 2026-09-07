import { z } from 'zod';
import { UserActivitySchema } from '../user/user-activity.schema';

export const AdminActivitySchema = UserActivitySchema.extend({
  adminId: z.string().uuid(),
  action: z.enum(['create', 'update', 'delete', 'view', 'manage']),
  resource: z.string(),
  resourceId: z.string(),
  beforeState: z.record(z.unknown()).optional(),
  afterState: z.record(z.unknown()).optional(),
});
