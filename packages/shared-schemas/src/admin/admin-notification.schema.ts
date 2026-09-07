import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';

export const AdminNotificationSchema = BaseSchema.extend({
  notificationId: z.string().uuid(),
  adminId: z.string().uuid(),
  type: z.string(),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  isRead: z.boolean().default(false),
  readAt: z.date().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  metadata: z.record(z.unknown()).optional(),
});
