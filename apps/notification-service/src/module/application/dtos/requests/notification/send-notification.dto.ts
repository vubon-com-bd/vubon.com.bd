import { z } from 'zod';
import {
  NotificationTypeSchema,
  NotificationChannelSchema,
  NotificationPrioritySchema,
  NotificationCategorySchema,
} from '@vubon/shared-schemas/platform/notification';

export const SendNotificationSchema = z.object({
  userId: z.string().uuid(),
  type: NotificationTypeSchema,
  channel: NotificationChannelSchema,
  priority: NotificationPrioritySchema.optional(),
  category: NotificationCategorySchema,
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(2000),
  data: z.record(z.string(), z.unknown()).optional(),
  actionUrl: z.string().url().optional(),
  scheduledAt: z.string().datetime().optional(),
});

export type SendNotificationRequestDTO = z.infer<typeof SendNotificationSchema>;
