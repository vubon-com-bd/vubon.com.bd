import { z } from 'zod';
import type { AttributionVO } from '../../../domain/value-objects/composites/attribution.vo';

export const AttributionCreditSchema = z.object({
  touchpoint: z.string(),
  credit: z.number(),
});

export const AttributionResponseSchema = z.object({
  model: z.string(),
  touchpoints: z.array(z.string()),
  conversionValue: z.number(),
  credits: z.array(AttributionCreditSchema),
  topTouchpoint: AttributionCreditSchema,
});

export type AttributionResponseDTO = z.infer<typeof AttributionResponseSchema>;

/**
 * Business logic: computes per-touchpoint credits + identifies top.
 */
export function toAttributionResponse(
  vo: AttributionVO,
): AttributionResponseDTO {
  return {
    model: vo.model.value,
    touchpoints: [...vo.touchpoints],
    conversionValue: vo.conversionValue,
    credits: [...vo.getCredits()],
    topTouchpoint: vo.getTopTouchpoint(),
  };
}
