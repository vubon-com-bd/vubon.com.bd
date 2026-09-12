import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { REPORT_WIDGET } from '@vubon/shared-constants/src/platform/reporting/report-widget.constants';
import { REPORT_WIDGET_TYPE } from '@vubon/shared-constants/src/platform/reporting/report-widget-type.constants';

const widgetTypeKeys = Object.keys(REPORT_WIDGET.TYPES) as [string, ...string[]];
const widgetTypeTypeKeys = Object.keys(REPORT_WIDGET_TYPE.TYPES) as [string, ...string[]];
const widgetSizeKeys = Object.keys(REPORT_WIDGET.WIDGET_SIZES) as [string, ...string[]];
const widgetPositionKeys = Object.keys(REPORT_WIDGET.WIDGET_POSITIONS) as [string, ...string[]];

export const ReportWidgetSchema = BaseSchema.extend({
  widgetId: z.string().uuid(),
  dashboardId: z.string().uuid(),
  type: z.enum(widgetTypeKeys),
  widgetType: z.enum(widgetTypeTypeKeys),
  size: z.enum(widgetSizeKeys),
  position: z.enum(widgetPositionKeys),
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  config: z.object({
    colors: z.array(z.string()),
    labels: z.array(z.string()),
    metrics: z.array(z.string()),
    dimensions: z.array(z.string()),
    filters: z.record(z.unknown()),
    refreshInterval: z.number().int().min(1),
    showLegend: z.boolean().default(true),
    showTooltip: z.boolean().default(true),
  }),
  data: z.unknown(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
