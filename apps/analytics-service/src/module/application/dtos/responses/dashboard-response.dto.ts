import { z } from 'zod';
import type { DashboardEntity } from '../../../domain/entities/dashboard.entity';

export const DashboardResponseSchema = z.object({
  dashboardId: z.string(),
  name: z.string(),
  layout: z.string(),
  ownerId: z.string(),
  widgetCount: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
});

export type DashboardResponseDTO = z.infer<typeof DashboardResponseSchema>;

export function toDashboardResponse(entity: DashboardEntity): DashboardResponseDTO {
  return {
    dashboardId: entity.id.value,
    name: entity.name.value,
    layout: entity.layout.value,
    ownerId: entity.ownerId,
    widgetCount: entity.widgetCount,
    createdAt: entity.createdAt,
  };
}
