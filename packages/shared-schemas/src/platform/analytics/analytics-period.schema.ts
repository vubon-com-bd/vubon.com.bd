/**
 * Analytics Period Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-period.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_PERIOD } from '@vubon/shared-constants/platform';

export const AnalyticsPeriodValueSchema = z.enum(
  Object.values(ANALYTICS_PERIOD) as [string, ...string[]]
);

export const AnalyticsPeriodSchema = z.object({
  period: AnalyticsPeriodValueSchema,
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  days: z.number().int().positive().max(730),
});

export type AnalyticsPeriodValueSchemaType = z.infer<typeof AnalyticsPeriodValueSchema>;
export type AnalyticsPeriodSchemaType = z.infer<typeof AnalyticsPeriodSchema>;
