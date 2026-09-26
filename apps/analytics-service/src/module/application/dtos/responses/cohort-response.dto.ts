import { z } from 'zod';
import type { CohortEntity } from '../../../domain/entities/cohort.entity';

export const CohortResponseSchema = z.object({
  cohortId: z.string(),
  name: z.string(),
  period: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  size: z.number().int().nonnegative(),
  bucketKey: z.string(),
  durationDays: z.number().int().nonnegative(),
});

export type CohortResponseDTO = z.infer<typeof CohortResponseSchema>;

export function toCohortResponse(entity: CohortEntity): CohortResponseDTO {
  const startMs = entity.startDate.getTime();
  const endMs = entity.endDate.getTime();
  const durationDays = Math.round((endMs - startMs) / (24 * 60 * 60 * 1000));

  return {
    cohortId: entity.id.value,
    name: entity.name.value,
    period: entity.period.value,
    startDate: entity.startDate.toISOString(),
    endDate: entity.endDate.toISOString(),
    size: entity.size,
    bucketKey: entity.bucketKey,
    durationDays,
  };
}
