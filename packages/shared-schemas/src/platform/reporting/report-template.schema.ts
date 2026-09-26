/**
 * Report Template Schema
 * @module shared-schemas/platform/reporting
 *
 * Values আসে shared-constants/platform/report-template.constants থেকে।
 */

import { z } from 'zod';
import {
  REPORT_TEMPLATE_TYPE,
  REPORT_TEMPLATE_CATEGORY,
  REPORT_TEMPLATE_STATUS,
} from '@vubon/shared-constants/platform';

export const ReportTemplateTypeSchema = z.enum(
  Object.values(REPORT_TEMPLATE_TYPE) as [string, ...string[]]
);

export const ReportTemplateCategorySchema = z.enum(
  Object.values(REPORT_TEMPLATE_CATEGORY) as [string, ...string[]]
);

export const ReportTemplateStatusSchema = z.enum(
  Object.values(REPORT_TEMPLATE_STATUS) as [string, ...string[]]
);

export const ReportSectionSchema = z.object({
  id: z.string().min(1).max(50),
  title: z.string().min(1).max(200),
  type: z.enum(['table', 'chart', 'summary', 'text']),
  order: z.number().int().nonnegative(),
  config: z.record(z.string(), z.unknown()).optional(),
});

export const ReportColumnSchema = z.object({
  field: z.string().min(1).max(100),
  label: z.string().min(1).max(200),
  type: z.enum(['string', 'number', 'date', 'boolean', 'currency']),
  width: z.number().int().positive().optional(),
  sortable: z.boolean().optional(),
  filterable: z.boolean().optional(),
  format: z.string().max(50).optional(),
});

export const ReportFilterConfigSchema = z.object({
  field: z.string().min(1).max(100),
  operator: z.string().min(1).max(50),
  value: z.unknown(),
});

export const ReportGroupingSchema = z.object({
  field: z.string().min(1).max(100),
  direction: z.enum(['asc', 'desc']),
});

export const ReportSortSchema = z.object({
  field: z.string().min(1).max(100),
  direction: z.enum(['asc', 'desc']),
});

export const ReportTemplateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  slug: z.string().min(1).max(150),
  description: z.string().max(1000).optional(),
  type: ReportTemplateTypeSchema,
  category: ReportTemplateCategorySchema,
  status: ReportTemplateStatusSchema,
  sections: z.array(ReportSectionSchema).max(50),
  columns: z.array(ReportColumnSchema).max(200),
  filters: z.array(ReportFilterConfigSchema).max(30).optional(),
  groupings: z.array(ReportGroupingSchema).max(20).optional(),
  sorts: z.array(ReportSortSchema).max(10).optional(),
  version: z.number().int().positive(),
  parentId: z.string().optional(),
  createdBy: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ReportTemplateTypeSchemaType = z.infer<typeof ReportTemplateTypeSchema>;
export type ReportTemplateCategorySchemaType = z.infer<typeof ReportTemplateCategorySchema>;
export type ReportTemplateStatusSchemaType = z.infer<typeof ReportTemplateStatusSchema>;
export type ReportTemplateSchemaType = z.infer<typeof ReportTemplateSchema>;
