/**
 * Analytics Filter Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-filter.constants থেকে।
 */

import { z } from 'zod';
import {
  ANALYTICS_FILTER_OPERATOR,
  ANALYTICS_FILTER_LOGIC,
} from '@vubon/shared-constants/platform';

export const AnalyticsFilterOperatorSchema = z.enum(
  Object.values(ANALYTICS_FILTER_OPERATOR) as [string, ...string[]]
);

export const AnalyticsFilterLogicSchema = z.enum(
  Object.values(ANALYTICS_FILTER_LOGIC) as [string, ...string[]]
);

export const AnalyticsFilterSchema = z.object({
  field: z.string().min(1).max(100),
  operator: AnalyticsFilterOperatorSchema,
  value: z.unknown(),
});

export const AnalyticsFilterGroupSchema: z.ZodType<unknown> = z.lazy(() =>
  z.object({
    logic: AnalyticsFilterLogicSchema,
    filters: z.array(z.union([AnalyticsFilterSchema, AnalyticsFilterGroupSchema])).max(20),
  })
);

export type AnalyticsFilterOperatorSchemaType = z.infer<typeof AnalyticsFilterOperatorSchema>;
export type AnalyticsFilterLogicSchemaType = z.infer<typeof AnalyticsFilterLogicSchema>;
export type AnalyticsFilterSchemaType = z.infer<typeof AnalyticsFilterSchema>;
