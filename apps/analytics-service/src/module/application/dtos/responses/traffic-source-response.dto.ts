import { z } from 'zod';
import type { TrafficSourceVO } from '../../../domain/value-objects/composites/traffic-source.vo';

export const TrafficSourceResponseSchema = z.object({
  source: z.string().nullable(),
  medium: z.string().nullable(),
  campaign: z.string().nullable(),
  referrer: z.string(),
  label: z.string(),
  isDirect: z.boolean(),
  isPaid: z.boolean(),
  isOrganic: z.boolean(),
  hasUtm: z.boolean(),
});

export type TrafficSourceResponseDTO = z.infer<
  typeof TrafficSourceResponseSchema
>;

/**
 * Business logic: exposes derived classification (direct/paid/organic).
 */
export function toTrafficSourceResponse(
  vo: TrafficSourceVO,
): TrafficSourceResponseDTO {
  return {
    source: vo.source?.value ?? null,
    medium: vo.medium?.value ?? null,
    campaign: vo.campaign?.value ?? null,
    referrer: vo.referrer.value,
    label: vo.label,
    isDirect: vo.isDirect,
    isPaid: vo.isPaid,
    isOrganic: vo.isOrganic,
    hasUtm: vo.hasUtm,
  };
}
