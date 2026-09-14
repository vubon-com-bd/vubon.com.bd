/**
 * Logistics Report Schema
 * @module shared-schemas/logistics
 */

import { z } from 'zod';
import { LogisticsAnalyticsPeriodSchema } from './logistics-analytics.schema';

export const LogisticsReportTypeSchema = z.enum([
  'shipments',
  'deliveries',
  'couriers',
  'warehouses',
  'drivers',
  'vehicles',
  'routes',
  'performance',
  'costs',
  'custom',
]);

export const LogisticsReportFormatSchema = z.enum(['pdf', 'csv', 'xlsx', 'json']);

export const LogisticsReportScheduleSchema = z.enum([
  'daily',
  'weekly',
  'monthly',
  'quarterly',
  'yearly',
  'on_demand',
]);

export const LogisticsReportSchema = z.object({
  id: z.string().min(1),
  type: LogisticsReportTypeSchema,
  format: LogisticsReportFormatSchema,
  schedule: LogisticsReportScheduleSchema.optional(),
  period: LogisticsAnalyticsPeriodSchema,
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().int().nonnegative().optional(),
  generatedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  generatedBy: z.string().optional(),
});

export const LogisticsReportRequestSchema = z
  .object({
    type: LogisticsReportTypeSchema,
    format: LogisticsReportFormatSchema,
    periodStart: z.string().datetime(),
    periodEnd: z.string().datetime(),
    filters: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type LogisticsReportTypeSchemaType = z.infer<typeof LogisticsReportTypeSchema>;
export type LogisticsReportFormatSchemaType = z.infer<typeof LogisticsReportFormatSchema>;
export type LogisticsReportSchemaType = z.infer<typeof LogisticsReportSchema>;
