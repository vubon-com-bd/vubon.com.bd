import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ProductSchema } from '../business/product/product.schema';
import { AI_RECOMMENDATION } from '@vubon/shared-constants/src/ai/ai-recommendation.constants';
import { RECOMMENDATION_STRATEGY } from '@vubon/shared-constants/src/platform/discovery/recommendation-strategy.constants';

const aiRecommendationTypeKeys = Object.keys(AI_RECOMMENDATION.TYPES) as [string, ...string[]];
const recommendationStrategyKeys = Object.keys(RECOMMENDATION_STRATEGY.TYPES) as [
  string,
  ...string[],
];
const aiRecommendationAlgorithmKeys = Object.keys(
  AI_RECOMMENDATION.AI_RECOMMENDATION_ALGORITHMS
) as [string, ...string[]];

export const AIRecommendationSchema = BaseSchema.extend({
  recommendationId: z.string().uuid(),
  aiId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  type: z.enum(aiRecommendationTypeKeys),
  strategy: z.enum(recommendationStrategyKeys),
  algorithm: z.enum(aiRecommendationAlgorithmKeys),
  score: z.number().min(0).max(1),
  confidence: z.number().min(0).max(1),
  rank: z.number().int().min(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
