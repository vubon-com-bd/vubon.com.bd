/**
 * Analytics Status Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-status.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_STATUS } from '@vubon/shared-constants/platform';

export const AnalyticsStatusSchema = z.enum(
  Object.values(ANALYTICS_STATUS) as [string, ...string[]]
);

export type AnalyticsStatusSchemaType = z.infer<typeof AnalyticsStatusSchema>;
