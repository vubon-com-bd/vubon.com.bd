/**
 * Recommendation Strategy Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/recommendation-strategy.constants থেকে।
 */

import { z } from 'zod';
import {
  RECOMMENDATION_STRATEGY,
  RECOMMENDATION_STRATEGY_STATUS,
} from '@vubon/shared-constants/platform';

export const RecommendationStrategySchema = z.enum(
  Object.values(RECOMMENDATION_STRATEGY) as [string, ...string[]]
);

export const RecommendationStrategyStatusSchema = z.enum(
  Object.values(RECOMMENDATION_STRATEGY_STATUS) as [string, ...string[]]
);

export type RecommendationStrategySchemaType = z.infer<typeof RecommendationStrategySchema>;
export type RecommendationStrategyStatusSchemaType = z.infer<
  typeof RecommendationStrategyStatusSchema
>;
