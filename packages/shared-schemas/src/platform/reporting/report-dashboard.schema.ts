import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { ReportWidgetSchema } from './report-widget.schema';
import { REPORT_DASHBOARD } from '@vubon/shared-constants/src/platform/reporting/report-dashboard.constants';

const dashboardStatusKeys = Object.keys(REPORT_DASHBOARD.STATUS) as [string, ...string[]];
const dashboardTypeKeys = Object.keys(REPORT_DASHBOARD.DASHBOARD_TYPES) as [string, ...string[]];

export const ReportDashboardSchema = BaseSchema.extend({
  dashboardId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(dashboardStatusKeys),
  type: z.enum(dashboardTypeKeys),
  widgets: z.array(ReportWidgetSchema),
  widgetCount: z.number().int().min(0).default(0),
  layout: z.object({
    columns: z.number().int().min(1),
    rows: z.number().int().min(1),
    items: z.array(
      z.object({
        widgetId: z.string().uuid(),
        x: z.number().int().min(0),
        y: z.number().int().min(0),
        w: z.number().int().min(1),
        h: z.number().int().min(1),
      })
    ),
  }),
  createdBy: z.string().uuid(),
  createdByUser: UserSchema,
  isActive: z.boolean().default(true),
  isPublished: z.boolean().default(false),
  isShared: z.boolean().default(false),
  sharedWith: z.array(z.string().uuid()),
  metadata: z.record(z.unknown()).optional(),
});
