import { z } from 'zod';
import {
  MarketingReportTypeSchema,
  MarketingReportScheduleSchema,
} from '@vubon/shared-schemas/marketing';

export const ScheduleReportRequestSchema = z.object({
  name: z.string().min(1).max(200),
  type: MarketingReportTypeSchema,
  schedule: MarketingReportScheduleSchema,
  recipients: z.array(z.string().email()).optional(),
});

export type ScheduleReportRequestDTO = z.infer<typeof ScheduleReportRequestSchema>;
