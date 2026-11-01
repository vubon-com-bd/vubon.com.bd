/**
 * Report Widget Schema
 * @module shared-schemas/platform/reporting
 *
 * Values আসে shared-constants/platform/report-widget.constants থেকে।
 */

import { z } from 'zod';
import {
  REPORT_WIDGET_TYPE,
  REPORT_WIDGET_SIZE,
  REPORT_WIDGET_STATUS,
} from '@vubon/shared-constants/platform';

export const ReportWidgetTypeSchema = z.enum(
  Object.values(REPORT_WIDGET_TYPE) as [string, ...string[]]
);

export const ReportWidgetSizeSchema = z.enum(
  Object.values(REPORT_WIDGET_SIZE) as [string, ...string[]]
);

export const ReportWidgetStatusSchema = z.enum(
  Object.values(REPORT_WIDGET_STATUS) as [string, ...string[]]
);

export const WidgetPositionSchema = z.object({
  x: z.number().int().nonnegative(),
  y: z.number().int().nonnegative(),
  w: z.number().int().positive().max(12),
  h: z.number().int().positive().max(12),
});

export const WidgetConfigSchema = z.object({
  chartType: z.enum(['line', 'bar', 'pie', 'area', 'scatter', 'funnel']).optional(),
  xAxis: z.string().max(100).optional(),
  yAxis: z.string().max(100).optional(),
  series: z.array(z.string().max(100)).max(20).optional(),
  colors: z.array(z.string().max(20)).max(20).optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  showGrid: z.boolean().optional(),
  options: z.record(z.string(), z.unknown()).optional(),
});

export const ReportWidgetSchema = z.object({
  id: z.string().min(1),
  dashboardId: z.string().optional(),
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: ReportWidgetTypeSchema,
  size: ReportWidgetSizeSchema,
  status: ReportWidgetStatusSchema,
  reportId: z.string().max(100).optional(),
  query: z.record(z.string(), z.unknown()).optional(),
  config: WidgetConfigSchema,
  position: WidgetPositionSchema,
  refreshIntervalSeconds: z.number().int().positive().max(86400).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ReportWidgetPublicSchema = ReportWidgetSchema.pick({
  id: true,
  title: true,
  type: true,
  size: true,
  position: true,
  config: true,
}).extend({
  data: z.record(z.string(), z.unknown()).optional(),
});

export type ReportWidgetTypeSchemaType = z.infer<typeof ReportWidgetTypeSchema>;
export type ReportWidgetSizeSchemaType = z.infer<typeof ReportWidgetSizeSchema>;
export type ReportWidgetStatusSchemaType = z.infer<typeof ReportWidgetStatusSchema>;
export type ReportWidgetSchemaType = z.infer<typeof ReportWidgetSchema>;
export type ReportWidgetPublicSchemaType = z.infer<typeof ReportWidgetPublicSchema>;
