import { z } from 'zod';
import type { KpiEntity } from '../../../domain/entities/kpi.entity';

export const KpiResponseSchema = z.object({
  kpiId: z.string(),
  name: z.string(),
  metricName: z.string(),
  target: z.number(),
  threshold: z.number(),
  createdAt: z.string().datetime(),
});

export type KpiResponseDTO = z.infer<typeof KpiResponseSchema>;

export function toKpiResponse(entity: KpiEntity): KpiResponseDTO {
  return {
    kpiId: entity.id.value,
    name: entity.name.value,
    metricName: entity.metricName,
    target: entity.target.numeric,
    threshold: entity.threshold.numeric,
    createdAt: entity.createdAt,
  };
}
