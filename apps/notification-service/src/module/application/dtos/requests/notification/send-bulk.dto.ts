import { z } from 'zod';
import {
  NotificationTypeSchema,
  NotificationChannelSchema,
  NotificationCategorySchema,
} from '@vubon/shared-schemas/platform/notification';

export const SendBulkSchema = z.object({
  userIds: z.array(z.string().uuid()).min(1).max(10000),
  type: NotificationTypeSchema,
  channel: NotificationChannelSchema,
  category: NotificationCategorySchema,
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(2000),
  data: z.record(z.string(), z.unknown()).optional(),
});

export type SendBulkRequestDTO = z.infer<typeof SendBulkSchema>;
