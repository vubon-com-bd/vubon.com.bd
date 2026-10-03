/**
 * Analytics Dimension Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-dimension.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_DIMENSION, ANALYTICS_DIMENSION_TYPE } from '@vubon/shared-constants/platform';

export const AnalyticsDimensionNameSchema = z.enum(
  Object.values(ANALYTICS_DIMENSION) as [string, ...string[]]
);

export const AnalyticsDimensionDataTypeSchema = z.enum(
  Object.values(ANALYTICS_DIMENSION_TYPE) as [string, ...string[]]
);

export const AnalyticsDimensionSchema = z.object({
  name: AnalyticsDimensionNameSchema,
  value: z.union([z.string(), z.number(), z.boolean()]),
  dataType: AnalyticsDimensionDataTypeSchema,
});

export type AnalyticsDimensionNameSchemaType = z.infer<typeof AnalyticsDimensionNameSchema>;
export type AnalyticsDimensionDataTypeSchemaType = z.infer<typeof AnalyticsDimensionDataTypeSchema>;
export type AnalyticsDimensionSchemaType = z.infer<typeof AnalyticsDimensionSchema>;
