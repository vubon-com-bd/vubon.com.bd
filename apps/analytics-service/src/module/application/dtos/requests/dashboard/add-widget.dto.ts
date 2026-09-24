import { z } from 'zod';

const VALID_WIDGET_TYPES = [
  'chart', 'table', 'metric', 'text', 'funnel', 'heatmap', 'gauge',
] as const;

export const AddWidgetSchema = z
  .object({
    dashboardId: z.string().min(1).max(128),
    widgetType: z.enum(VALID_WIDGET_TYPES),
    metricName: z.string().min(1).max(100),
    config: z.record(z.string(), z.unknown()).optional().default({}),
    position: z.number().int().nonnegative().optional(),
  })
  .strict();

export type AddWidgetDTO = z.infer<typeof AddWidgetSchema>;
