/**
 * Support Report Schema
 * @module shared-schemas/support
 */

import { z } from 'zod';
import { SupportAnalyticsPeriodSchema } from './support-analytics.schema';

export const SupportReportTypeSchema = z.enum([
  'tickets',
  'agents',
  'sla',
  'satisfaction',
  'channels',
  'categories',
  'performance',
  'custom',
]);

export const SupportReportFormatSchema = z.enum(['pdf', 'csv', 'xlsx', 'json']);

export const SupportReportScheduleSchema = z.enum([
  'daily',
  'weekly',
  'monthly',
  'quarterly',
  'yearly',
  'on_demand',
]);

export const SupportReportSchema = z.object({
  id: z.string().min(1),
  type: SupportReportTypeSchema,
  format: SupportReportFormatSchema,
  schedule: SupportReportScheduleSchema.optional(),
  period: SupportAnalyticsPeriodSchema,
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().int().nonnegative().optional(),
  generatedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  generatedBy: z.string().optional(),
});

export const SupportReportRequestSchema = z
  .object({
    type: SupportReportTypeSchema,
    format: SupportReportFormatSchema,
    periodStart: z.string().datetime(),
    periodEnd: z.string().datetime(),
    filters: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type SupportReportTypeSchemaType = z.infer<typeof SupportReportTypeSchema>;
export type SupportReportFormatSchemaType = z.infer<typeof SupportReportFormatSchema>;
export type SupportReportSchemaType = z.infer<typeof SupportReportSchema>;
