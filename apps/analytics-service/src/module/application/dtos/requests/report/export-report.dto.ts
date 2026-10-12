/**
 * Export Report Request DTO
 * @module analytics-service/application/dtos/requests/report
 */
import { z } from 'zod';
import { ANALYTICS_REPORT_FORMAT } from '@vubon/shared-constants/platform/analytics';

const FormatEnum = z.enum(
  Object.values(ANALYTICS_REPORT_FORMAT) as [string, ...string[]]
);

export const ExportReportSchema = z.object({
  format: FormatEnum,
  includeTotals: z.boolean().default(true),
  maskPii: z.boolean().default(true),
  compress: z.boolean().default(false),
  rowLimit: z.number().int().positive().max(100000).default(10000),
});

export type ExportReportDto = z.input<typeof ExportReportSchema>;
