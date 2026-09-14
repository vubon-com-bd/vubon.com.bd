/**
 * Report Dashboard Schema
 * @module shared-schemas/platform/reporting
 *
 * Values আসে shared-constants/platform/report-dashboard.constants থেকে।
 */

import { z } from 'zod';
import {
  REPORT_DASHBOARD_TYPE,
  REPORT_DASHBOARD_STATUS,
  REPORT_DASHBOARD_LAYOUT,
} from '@vubon/shared-constants/platform';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { ReportWidgetPublicSchema } from './report-widget.schema';

export const ReportDashboardTypeSchema = z.enum(
  Object.values(REPORT_DASHBOARD_TYPE) as [string, ...string[]]
);

export const ReportDashboardStatusSchema = z.enum(
  Object.values(REPORT_DASHBOARD_STATUS) as [string, ...string[]]
);

export const ReportDashboardLayoutSchema = z.enum(
  Object.values(REPORT_DASHBOARD_LAYOUT) as [string, ...string[]]
);

export const ReportDashboardSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  description: z.string().max(1000).optional(),
  type: ReportDashboardTypeSchema,
  status: ReportDashboardStatusSchema,
  layout: ReportDashboardLayoutSchema,
  ownerId: UuidSchema,
  widgets: z.array(ReportWidgetPublicSchema).max(50),
  sharedWith: z.array(UuidSchema).max(100).optional(),
  isPublic: z.boolean(),
  isDefault: z.boolean(),
  theme: z.string().max(50).optional(),
  autoRefresh: z.boolean(),
  refreshIntervalSeconds: z.number().int().positive().max(86400),
});

export const ReportDashboardPublicSchema = ReportDashboardSchema.pick({
  id: true,
  name: true,
  description: true,
  type: true,
  layout: true,
  widgets: true,
  isPublic: true,
});

export const ReportDashboardListFilterSchema = z.object({
  type: ReportDashboardTypeSchema.optional(),
  status: ReportDashboardStatusSchema.optional(),
  ownerId: UuidSchema.optional(),
  isPublic: z.boolean().optional(),
  search: z.string().max(200).optional(),
});

export type ReportDashboardTypeSchemaType = z.infer<typeof ReportDashboardTypeSchema>;
export type ReportDashboardStatusSchemaType = z.infer<typeof ReportDashboardStatusSchema>;
export type ReportDashboardLayoutSchemaType = z.infer<typeof ReportDashboardLayoutSchema>;
export type ReportDashboardSchemaType = z.infer<typeof ReportDashboardSchema>;
export type ReportDashboardPublicSchemaType = z.infer<typeof ReportDashboardPublicSchema>;
