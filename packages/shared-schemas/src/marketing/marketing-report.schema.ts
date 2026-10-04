/**
 * Marketing Report Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/marketing-report.constants থেকে।
 */

import { z } from 'zod';
import {
  MARKETING_REPORT_TYPE,
  MARKETING_REPORT_FORMAT,
  MARKETING_REPORT_SCHEDULE,
} from '@vubon/shared-constants/marketing';

export const MarketingReportTypeSchema = z.enum(
  Object.values(MARKETING_REPORT_TYPE) as [string, ...string[]]
);

export const MarketingReportFormatSchema = z.enum(
  Object.values(MARKETING_REPORT_FORMAT) as [string, ...string[]]
);

export const MarketingReportScheduleSchema = z.enum(
  Object.values(MARKETING_REPORT_SCHEDULE) as [string, ...string[]]
);

export const MarketingReportSchema = z.object({
  id: z.string().min(1),
  type: MarketingReportTypeSchema,
  format: MarketingReportFormatSchema,
  schedule: MarketingReportScheduleSchema.optional(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().int().nonnegative().optional(),
  generatedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  generatedBy: z.string().optional(),
});

export const MarketingReportRequestSchema = z
  .object({
    type: MarketingReportTypeSchema,
    format: MarketingReportFormatSchema,
    periodStart: z.string().datetime(),
    periodEnd: z.string().datetime(),
    filters: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type MarketingReportTypeSchemaType = z.infer<typeof MarketingReportTypeSchema>;
export type MarketingReportFormatSchemaType = z.infer<typeof MarketingReportFormatSchema>;
export type MarketingReportSchemaType = z.infer<typeof MarketingReportSchema>;
