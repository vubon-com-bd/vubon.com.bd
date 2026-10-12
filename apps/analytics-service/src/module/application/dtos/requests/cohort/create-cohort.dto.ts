/**
 * Create Cohort Request DTO
 * @module analytics-service/application/dtos/requests/cohort
 */
import { z } from 'zod';
import { ANALYTICS_COHORT_PERIOD } from '@vubon/shared-constants/platform/analytics';

const PeriodEnum = z.enum(
  Object.values(ANALYTICS_COHORT_PERIOD) as [string, ...string[]]
);

export const CreateCohortSchema = z.object({
  name: z.string().min(3).max(150),
  period: PeriodEnum,
  fromDate: z.string().datetime(),
  toDate: z.string().datetime(),
  description: z.string().max(500).optional(),
  acquisitionEvent: z.string().min(2).max(100).optional(),
});

export type CreateCohortDto = z.input<typeof CreateCohortSchema>;
