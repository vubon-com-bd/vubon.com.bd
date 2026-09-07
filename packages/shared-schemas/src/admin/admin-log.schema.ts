import { z } from 'zod';
import { UserLogSchema } from '../user/user-log.schema';

export const AdminLogSchema = UserLogSchema.extend({
  adminId: z.string().uuid(),
  level: z.enum(['info', 'warning', 'error', 'critical']),
});
