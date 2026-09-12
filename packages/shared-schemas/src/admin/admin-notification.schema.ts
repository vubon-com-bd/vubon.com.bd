import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { NOTIFICATION } from '@vubon/shared-constants/src/common/notification.constants';

/**
 * Notification TYPES — string values from NOTIFICATION.TYPE.
 */
const notificationTypeValues = Object.values(NOTIFICATION.TYPE) as [string, ...string[]];

/**
 * Notification PRIORITY — NOTIFICATION.PRIORITY holds numeric values
 * (LOW=0, MEDIUM=1, ...). We expose the string labels instead.
 */
const notificationPriorityValues = ['low', 'medium', 'high', 'urgent', 'critical'] as [
  string,
  ...string[],
];

export const AdminNotificationSchema = BaseSchema.extend({
  notificationId: z.string().uuid(),
  adminId: z.string().uuid(),
  type: z.enum(notificationTypeValues),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  isRead: z.boolean().default(false),
  readAt: z.date().optional(),
  priority: z.enum(notificationPriorityValues),
  metadata: z.record(z.unknown()).optional(),
});
