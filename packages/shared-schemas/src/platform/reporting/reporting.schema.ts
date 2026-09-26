/**
 * Reporting Core Schema
 * @module shared-schemas/platform/reporting
 *
 * Report entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { ReportTypeSchema } from './report-type.schema';
import { ReportFormatSchema } from './report-format.schema';
import { ReportStatusSchema } from './report-status.schema';
import { ReportPrioritySchema } from './report-priority.schema';
import { ReportFilterSchema } from './report-filter.schema';

export const ReportSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  type: ReportTypeSchema,
  format: ReportFormatSchema,
  status: ReportStatusSchema,
  priority: ReportPrioritySchema,
  templateId: z.string().optional(),
  filters: z.array(ReportFilterSchema).max(30).optional(),
  parameters: z.record(z.string(), z.unknown()).optional(),
  periodStart: z.string().datetime().optional(),
  periodEnd: z.string().datetime().optional(),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().int().nonnegative().optional(),
  rowCount: z.number().int().nonnegative().optional(),
  generatedAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  generatedBy: UuidSchema.optional(),
  error: z.string().max(2000).optional(),
  durationMs: z.number().int().nonnegative().optional(),
});

export const ReportPublicSchema = ReportSchema.pick({
  id: true,
  name: true,
  type: true,
  format: true,
  status: true,
  periodStart: true,
  periodEnd: true,
  fileUrl: true,
  rowCount: true,
  generatedAt: true,
});

export const ReportSummarySchema = ReportSchema.pick({
  id: true,
  name: true,
  type: true,
  status: true,
  createdAt: true,
});

export const ReportGenerateInputSchema = z
  .object({
    name: z.string().trim().min(1).max(200),
    type: ReportTypeSchema,
    format: ReportFormatSchema,
    priority: ReportPrioritySchema.optional(),
    templateId: z.string().optional(),
    filters: z.array(ReportFilterSchema).max(30).optional(),
    parameters: z.record(z.string(), z.unknown()).optional(),
    periodStart: z.string().datetime().optional(),
    periodEnd: z.string().datetime().optional(),
  })
  .strict();

export const ReportListFilterSchema = z.object({
  type: ReportTypeSchema.optional(),
  format: ReportFormatSchema.optional(),
  status: ReportStatusSchema.optional(),
  priority: ReportPrioritySchema.optional(),
  generatedBy: UuidSchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export type ReportSchemaType = z.infer<typeof ReportSchema>;
export type ReportPublicSchemaType = z.infer<typeof ReportPublicSchema>;
export type ReportSummarySchemaType = z.infer<typeof ReportSummarySchema>;
export type ReportGenerateInputSchemaType = z.infer<typeof ReportGenerateInputSchema>;
export type ReportListFilterSchemaType = z.infer<typeof ReportListFilterSchema>;
