/**
 * Analytics Source Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-source.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_SOURCE, ANALYTICS_SOURCE_PLATFORM } from '@vubon/shared-constants/platform';

export const AnalyticsSourceSchema = z.enum(
  Object.values(ANALYTICS_SOURCE) as [string, ...string[]]
);

export const AnalyticsSourcePlatformSchema = z.enum(
  Object.values(ANALYTICS_SOURCE_PLATFORM) as [string, ...string[]]
);

export const AnalyticsSourceDetailSchema = z.object({
  source: AnalyticsSourceSchema,
  platform: AnalyticsSourcePlatformSchema.optional(),
  referrer: z.string().url().optional(),
});

export type AnalyticsSourceSchemaType = z.infer<typeof AnalyticsSourceSchema>;
export type AnalyticsSourcePlatformSchemaType = z.infer<typeof AnalyticsSourcePlatformSchema>;
export type AnalyticsSourceDetailSchemaType = z.infer<typeof AnalyticsSourceDetailSchema>;
