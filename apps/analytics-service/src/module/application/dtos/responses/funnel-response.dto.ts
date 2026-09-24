import { z } from 'zod';
import type { FunnelEntity } from '../../../domain/entities/funnel.entity';

export const FunnelResponseSchema = z.object({
  funnelId: z.string(),
  name: z.string(),
  steps: z.array(z.string()),
  stepCount: z.number().int().positive(),
  createdAt: z.string().datetime(),
});

export type FunnelResponseDTO = z.infer<typeof FunnelResponseSchema>;

export function toFunnelResponse(entity: FunnelEntity): FunnelResponseDTO {
  return {
    funnelId: entity.id.value,
    name: entity.name,
    steps: entity.steps.map((s) => s.value),
    stepCount: entity.stepCount,
    createdAt: entity.createdAt,
  };
}
