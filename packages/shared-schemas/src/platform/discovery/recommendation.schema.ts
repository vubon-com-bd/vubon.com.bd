import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ProductSchema } from '../../business/product/product.schema';
import { RecommendationTypeSchema } from './recommendation-type.schema';
import { RecommendationStrategySchema } from './recommendation-strategy.schema';
import { RECOMMENDATION } from '@vubon/shared-constants/src/platform/discovery/recommendation.constants';

const sourceKeys = Object.keys(RECOMMENDATION.RECOMMENDATION_SOURCES) as [string, ...string[]];
const statusKeys = Object.keys(RECOMMENDATION.STATUS) as [string, ...string[]];

export const RecommendationSchema = BaseSchema.extend({
  recommendationId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  type: RecommendationTypeSchema,
  strategy: RecommendationStrategySchema,
  source: z.enum(sourceKeys),
  score: z.number().min(0).max(1),
  rank: z.number().int().min(0),
  status: z.enum(statusKeys),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
