import { z } from 'zod';

const VALID_FREQUENCIES = [
  'once', 'hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly',
] as const;

export const ScheduleReportSchema = z
  .object({
    reportId: z.string().min(1).max(128),
    frequency: z.enum(VALID_FREQUENCIES).refine(
      (f) => f !== 'once',
      'Scheduling requires a recurring frequency',
    ),
    cronExpression: z.string().min(9).max(100).optional(),
    recipients: z.array(z.string().email()).max(50).optional(),
  })
  .strict();

export type ScheduleReportDTO = z.infer<typeof ScheduleReportSchema>;
