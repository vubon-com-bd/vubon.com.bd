import { z } from 'zod';

export const MarkAsReadSchema = z.object({
  notificationIds: z.array(z.string().uuid()).min(1).max(1000),
});

export type MarkAsReadRequestDTO = z.infer<typeof MarkAsReadSchema>;
