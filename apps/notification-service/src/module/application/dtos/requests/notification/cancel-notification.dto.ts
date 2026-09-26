import { z } from 'zod';

export const CancelNotificationSchema = z.object({
  notificationId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export type CancelNotificationRequestDTO = z.infer<typeof CancelNotificationSchema>;
