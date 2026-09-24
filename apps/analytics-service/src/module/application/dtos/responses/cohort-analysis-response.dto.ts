import { z } from 'zod';
import type { CohortAnalysisVO } from '../../../domain/value-objects/composites/cohort-analysis.vo';

export const CohortAnalysisResponseSchema = z.object({
  cohortId: z.string(),
  initialSize: z.number().int().nonnegative(),
  retainedSizes: z.array(z.number().int().nonnegative()),
  retentionRates: z.array(z.number()),
  day1Retention: z.number(),
  day7Retention: z.number(),
  day30Retention: z.number(),
  isHealthy: z.boolean(),
});

export type CohortAnalysisResponseDTO = z.infer<
  typeof CohortAnalysisResponseSchema
>;

/**
 * Business logic: exposes named retention checkpoints + health flag.
 */
export function toCohortAnalysisResponse(
  vo: CohortAnalysisVO,
): CohortAnalysisResponseDTO {
  return {
    cohortId: vo.cohortId.value,
    initialSize: vo.initialSize,
    retainedSizes: [...vo.retainedSizes],
    retentionRates: [...vo.retentionRates],
    day1Retention: vo.retentionAt(1),
    day7Retention: vo.retentionAt(7),
    day30Retention: vo.retentionAt(30),
    isHealthy: vo.isRetentionHealthy,
  };
}
