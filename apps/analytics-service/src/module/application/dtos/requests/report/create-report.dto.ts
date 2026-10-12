/**
 * Create Report Request DTO
 * @module analytics-service/application/dtos/requests/report
 */
import { z } from 'zod';
import {
  ANALYTICS_REPORT_TYPE,
  ANALYTICS_REPORT_FORMAT,
  ANALYTICS_REPORT_FREQUENCY,
} from '@vubon/shared-constants/platform/analytics';

const ReportTypeEnum = z.enum(
  Object.values(ANALYTICS_REPORT_TYPE) as [string, ...string[]]
);
const ReportFormatEnum = z.enum(
  Object.values(ANALYTICS_REPORT_FORMAT) as [string, ...string[]]
);
const ReportFrequencyEnum = z.enum(
  Object.values(ANALYTICS_REPORT_FREQUENCY) as [string, ...string[]]
);

export const CreateReportSchema = z.object({
  name: z.string().min(3).max(200),
  type: ReportTypeEnum,
  format: ReportFormatEnum,
  frequency: ReportFrequencyEnum,
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  description: z.string().max(500).optional(),
});

export type CreateReportDto = z.input<typeof CreateReportSchema>;
