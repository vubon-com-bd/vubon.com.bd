/**
 * Popular Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/popular.constants থেকে।
 */

import { z } from 'zod';
import { POPULAR_TYPE, POPULAR_PERIOD, POPULAR_METRIC } from '@vubon/shared-constants/platform';

export const PopularTypeSchema = z.enum(Object.values(POPULAR_TYPE) as [string, ...string[]]);

export const PopularPeriodSchema = z.enum(Object.values(POPULAR_PERIOD) as [string, ...string[]]);

export const PopularMetricSchema = z.enum(Object.values(POPULAR_METRIC) as [string, ...string[]]);

export const PopularItemSchema = z.object({
  id: z.string().min(1),
  type: PopularTypeSchema,
  referenceId: z.string().min(1),
  period: PopularPeriodSchema,
  metric: PopularMetricSchema,
  value: z.number(),
  rank: z.number().int().positive(),
  capturedAt: z.string().datetime(),
});

export const PopularListSchema = z.object({
  type: PopularTypeSchema,
  period: PopularPeriodSchema,
  items: z.array(PopularItemSchema).max(100),
  generatedAt: z.string().datetime(),
});

export type PopularTypeSchemaType = z.infer<typeof PopularTypeSchema>;
export type PopularPeriodSchemaType = z.infer<typeof PopularPeriodSchema>;
export type PopularMetricSchemaType = z.infer<typeof PopularMetricSchema>;
export type PopularItemSchemaType = z.infer<typeof PopularItemSchema>;
export type PopularListSchemaType = z.infer<typeof PopularListSchema>;
