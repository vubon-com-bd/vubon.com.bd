import { z } from 'zod';

export const CreateScheduleSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(['once', 'recurring', 'cron']),
  frequency: z.enum(['once', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'custom']),
  interval: z.number().int().positive().optional(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime().optional(),
  payload: z.record(z.string(), z.unknown()),
});

export type CreateScheduleRequestDTO = z.infer<typeof CreateScheduleSchema>;
