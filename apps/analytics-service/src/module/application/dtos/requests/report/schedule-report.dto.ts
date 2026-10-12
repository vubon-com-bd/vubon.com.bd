/**
 * Schedule Report Request DTO
 * @module analytics-service/application/dtos/requests/report
 */
import { z } from 'zod';
import { ANALYTICS_REPORT_FREQUENCY } from '@vubon/shared-constants/platform/analytics';

const FrequencyEnum = z.enum(
  Object.values(ANALYTICS_REPORT_FREQUENCY) as [string, ...string[]]
);

export const ScheduleReportSchema = z.object({
  frequency: FrequencyEnum,
  startAt: z.string().datetime().optional(),
  timezone: z.string().max(50).default('UTC'),
  recipients: z.array(z.string().email()).max(50).optional(),
});

export type ScheduleReportDto = z.input<typeof ScheduleReportSchema>;
