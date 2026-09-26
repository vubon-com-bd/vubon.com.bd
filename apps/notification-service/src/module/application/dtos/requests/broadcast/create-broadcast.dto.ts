import { z } from 'zod';
import {
  NotificationBroadcastTypeSchema,
  NotificationBroadcastTargetSchema,
} from '@vubon/shared-schemas/platform/notification';

export const CreateBroadcastSchema = z.object({
  type: NotificationBroadcastTypeSchema,
  target: NotificationBroadcastTargetSchema,
  templateId: z.string().uuid().optional(),
  subject: z.string().max(200).optional(),
  content: z.string().min(1).max(500000),
  scheduledAt: z.string().datetime().optional(),
});

export type CreateBroadcastRequestDTO = z.infer<typeof CreateBroadcastSchema>;
