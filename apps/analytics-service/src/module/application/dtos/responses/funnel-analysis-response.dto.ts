import { z } from 'zod';
import type { FunnelAnalysisVO } from '../../../domain/value-objects/composites/funnel-analysis.vo';

export const FunnelAnalysisResponseSchema = z.object({
  funnelId: z.string(),
  steps: z.array(z.string()),
  counts: z.array(z.number().int().nonnegative()),
  conversionRates: z.array(z.number()),
  dropOffRates: z.array(z.number()),
  initialCount: z.number().int().nonnegative(),
  finalCount: z.number().int().nonnegative(),
  overallConversionRate: z.number(),
  biggestDropOffStepIndex: z.number().int(),
});

export type FunnelAnalysisResponseDTO = z.infer<
  typeof FunnelAnalysisResponseSchema
>;

/**
 * Business logic: computes per-step conversion + drop-off rates.
 */
export function toFunnelAnalysisResponse(
  vo: FunnelAnalysisVO,
): FunnelAnalysisResponseDTO {
  const stepCount = vo.steps.length;
  const conversionRates: number[] = [];
  const dropOffRates: number[] = [];

  for (let i = 0; i < stepCount; i++) {
    const conv = i === 0 ? 100 : vo.getStepConversionRate(i);
    conversionRates.push(conv);
    dropOffRates.push(i === 0 ? 0 : 100 - conv);
  }

  return {
    funnelId: vo.funnelId.value,
    steps: vo.steps.map((s) => s.value),
    counts: [...vo.counts],
    conversionRates,
    dropOffRates,
    initialCount: vo.initialCount,
    finalCount: vo.finalCount,
    overallConversionRate: vo.overallConversionRate,
    biggestDropOffStepIndex: vo.getBiggestDropOffStep(),
  };
}
