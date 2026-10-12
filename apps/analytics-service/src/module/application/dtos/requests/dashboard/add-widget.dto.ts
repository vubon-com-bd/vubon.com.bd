/**
 * Add Widget Request DTO
 * @module analytics-service/application/dtos/requests/dashboard
 */
import { z } from 'zod';
import { ANALYTICS_WIDGET_TYPE } from '@vubon/shared-constants/platform/analytics';

const WidgetTypeEnum = z.enum(
  Object.values(ANALYTICS_WIDGET_TYPE) as [string, ...string[]]
);

export const AddWidgetSchema = z.object({
  type: WidgetTypeEnum,
  title: z.string().min(1).max(150),
  config: z.record(z.string(), z.unknown()).default({}),
  position: z.object({
    x: z.number().int().nonnegative(),
    y: z.number().int().nonnegative(),
    w: z.number().int().positive().max(24),
    h: z.number().int().positive().max(24),
  }),
  metrics: z.array(z.string().min(1).max(100)).max(20).optional(),
});

export type AddWidgetDto = z.input<typeof AddWidgetSchema>;
