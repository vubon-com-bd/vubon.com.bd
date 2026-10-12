/**
 * Analyze Cohort Request DTO
 * @module analytics-service/application/dtos/requests/cohort
 */
import { z } from 'zod';

export const AnalyzeCohortSchema = z.object({
  maxPeriods: z.number().int().positive().max(52).default(12),
  minCohortSize: z.number().int().positive().min(1).max(10000).default(10),
});

export type AnalyzeCohortDto = z.input<typeof AnalyzeCohortSchema>;
