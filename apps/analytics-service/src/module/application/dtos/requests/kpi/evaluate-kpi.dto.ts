/**
 * Evaluate KPI Request DTO
 * @module analytics-service/application/dtos/requests/kpi
 */
import { z } from 'zod';

export const EvaluateKpiSchema = z.object({
  actual: z.number().finite(),
  evaluatedAt: z.string().datetime().optional(),
});

export type EvaluateKpiDto = z.input<typeof EvaluateKpiSchema>;
