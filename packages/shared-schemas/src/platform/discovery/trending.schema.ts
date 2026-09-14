/**
 * Trending Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/trending.constants থেকে।
 */

import { z } from 'zod';
import { TRENDING_TYPE, TRENDING_PERIOD, TRENDING_STATUS } from '@vubon/shared-constants/platform';

export const TrendingTypeSchema = z.enum(Object.values(TRENDING_TYPE) as [string, ...string[]]);

export const TrendingPeriodSchema = z.enum(Object.values(TRENDING_PERIOD) as [string, ...string[]]);

export const TrendingStatusSchema = z.enum(Object.values(TRENDING_STATUS) as [string, ...string[]]);

export const TrendingItemSchema = z.object({
  id: z.string().min(1),
  type: TrendingTypeSchema,
  referenceId: z.string().min(1),
  period: TrendingPeriodSchema,
  status: TrendingStatusSchema,
  score: z.number(),
  rank: z.number().int().positive(),
  viewCount: z.number().int().nonnegative(),
  purchaseCount: z.number().int().nonnegative(),
  trend: z.enum(['rising', 'stable', 'falling']),
  capturedAt: z.string().datetime(),
});

export const TrendingListSchema = z.object({
  type: TrendingTypeSchema,
  period: TrendingPeriodSchema,
  items: z.array(TrendingItemSchema).max(100),
  generatedAt: z.string().datetime(),
});

export type TrendingTypeSchemaType = z.infer<typeof TrendingTypeSchema>;
export type TrendingPeriodSchemaType = z.infer<typeof TrendingPeriodSchema>;
export type TrendingItemSchemaType = z.infer<typeof TrendingItemSchema>;
export type TrendingListSchemaType = z.infer<typeof TrendingListSchema>;
