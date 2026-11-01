/**
 * SEO Report Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-report.constants থেকে।
 */

import { z } from 'zod';
import {
  SEO_REPORT_TYPE,
  SEO_REPORT_FORMAT,
  SEO_REPORT_SCHEDULE,
} from '@vubon/shared-constants/platform';

export const SeoReportTypeSchema = z.enum(Object.values(SEO_REPORT_TYPE) as [string, ...string[]]);

export const SeoReportFormatSchema = z.enum(
  Object.values(SEO_REPORT_FORMAT) as [string, ...string[]]
);

export const SeoReportScheduleSchema = z.enum(
  Object.values(SEO_REPORT_SCHEDULE) as [string, ...string[]]
);

export const SeoReportSchema = z.object({
  id: z.string().min(1),
  type: SeoReportTypeSchema,
  format: SeoReportFormatSchema,
  schedule: SeoReportScheduleSchema.optional(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().int().nonnegative().optional(),
  generatedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  generatedBy: z.string().optional(),
});

export type SeoReportTypeSchemaType = z.infer<typeof SeoReportTypeSchema>;
export type SeoReportFormatSchemaType = z.infer<typeof SeoReportFormatSchema>;
export type SeoReportScheduleSchemaType = z.infer<typeof SeoReportScheduleSchema>;
export type SeoReportSchemaType = z.infer<typeof SeoReportSchema>;
