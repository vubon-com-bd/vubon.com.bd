import { z } from 'zod';

export const ResendNotificationSchema = z.object({
  notificationId: z.string().uuid(),
  channel: z.string().optional(),
});

export type ResendNotificationRequestDTO = z.infer<typeof ResendNotificationSchema>;
