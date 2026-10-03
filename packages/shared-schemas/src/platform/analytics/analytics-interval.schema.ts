/**
 * Analytics Interval Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-interval.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_INTERVAL } from '@vubon/shared-constants/platform';

export const AnalyticsIntervalValueSchema = z.enum(
  Object.values(ANALYTICS_INTERVAL) as [string, ...string[]]
);

export type AnalyticsIntervalValueSchemaType = z.infer<typeof AnalyticsIntervalValueSchema>;
