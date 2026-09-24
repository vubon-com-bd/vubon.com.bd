import { z } from 'zod';
import type { WidgetEntity } from '../../../domain/entities/widget.entity';

export const WidgetResponseSchema = z.object({
  widgetId: z.string(),
  type: z.string(),
  metricName: z.string(),
  position: z.number().int().nonnegative(),
  dashboardId: z.string(),
  configKeys: z.array(z.string()),
});

export type WidgetResponseDTO = z.infer<typeof WidgetResponseSchema>;

/**
 * Business logic: config values NOT exposed, only keys.
 */
export function toWidgetResponse(entity: WidgetEntity): WidgetResponseDTO {
  return {
    widgetId: entity.id.value,
    type: entity.type.value,
    metricName: entity.metricName,
    position: entity.position,
    dashboardId: entity.dashboardId,
    configKeys: Object.keys(entity.config.toObject()),
  };
}
