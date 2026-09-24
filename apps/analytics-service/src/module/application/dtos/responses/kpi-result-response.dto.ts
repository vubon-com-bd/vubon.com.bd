import { z } from 'zod';
import type { KpiResultVO } from '../../../domain/value-objects/composites/kpi-result.vo';

export const KpiResultResponseSchema = z.object({
  kpiId: z.string(),
  actual: z.number(),
  target: z.number(),
  achievementPercent: z.number(),
  variance: z.number(),
  isAchieved: z.boolean(),
  isBreached: z.boolean(),
  status: z.string(),
  evaluatedAt: z.string().datetime(),
});

export type KpiResultResponseDTO = z.infer<typeof KpiResultResponseSchema>;

/**
 * Business logic: computes derived fields (variance, achievementPercent).
 */
export function toKpiResultResponse(vo: KpiResultVO): KpiResultResponseDTO {
  return {
    kpiId: vo.kpiId.value,
    actual: vo.actual,
    target: vo.target.numeric,
    achievementPercent: vo.achievementPercent,
    variance: vo.variance,
    isAchieved: vo.isAchieved,
    isBreached: vo.isBreached,
    status: vo.status,
    evaluatedAt: vo.evaluatedAt.toISOString(),
  };
}
