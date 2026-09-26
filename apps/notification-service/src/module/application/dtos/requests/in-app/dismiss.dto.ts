import { z } from 'zod';

export const DismissSchema = z.object({
  notificationId: z.string().uuid(),
});

export type DismissRequestDTO = z.infer<typeof DismissSchema>;
