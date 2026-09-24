import { z } from 'zod';
import type { MetricEntity } from '../../../domain/entities/metric.entity';

export const MetricResponseSchema = z.object({
  metricId: z.string(),
  name: z.string(),
  value: z.number(),
  unit: z.string(),
  type: z.string(),
  window: z
    .object({
      startMs: z.number(),
      endMs: z.number(),
    })
    .nullable(),
  createdAt: z.string().datetime(),
});

export type MetricResponseDTO = z.infer<typeof MetricResponseSchema>;

export function toMetricResponse(entity: MetricEntity): MetricResponseDTO {
  return {
    metricId: entity.id.value,
    name: entity.name.value,
    value: entity.value.numeric,
    unit: entity.unit.value,
    type: entity.type.value,
    window: entity.window
      ? { startMs: entity.window.startMs, endMs: entity.window.endMs }
      : null,
    createdAt: entity.createdAt,
  };
}
