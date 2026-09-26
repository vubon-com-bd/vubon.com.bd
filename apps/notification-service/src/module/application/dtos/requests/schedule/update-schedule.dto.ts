import { z } from 'zod';

export const UpdateScheduleSchema = z.object({
  scheduleId: z.string().uuid(),
  frequency: z.enum(['once', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'custom']).optional(),
  interval: z.number().int().positive().optional(),
  startAt: z.string().datetime().optional(),
  endAt: z.string().datetime().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

export type UpdateScheduleRequestDTO = z.infer<typeof UpdateScheduleSchema>;
