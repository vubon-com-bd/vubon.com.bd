import { z } from 'zod';

export const CancelScheduleSchema = z.object({
  scheduleId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export type CancelScheduleRequestDTO = z.infer<typeof CancelScheduleSchema>;
