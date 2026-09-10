import { z } from 'zod';
import { RECOMMENDATION_STRATEGY } from '@vubon/shared-constants/src/platform/discovery/recommendation-strategy.constants';

const strategyKeys = Object.keys(RECOMMENDATION_STRATEGY.TYPES) as [string, ...string[]];
const weightKeys = Object.keys(RECOMMENDATION_STRATEGY.STRATEGY_WEIGHTS) as [string, ...string[]];

export const RecommendationStrategySchema = z.object({
  strategy: z.enum(strategyKeys),
  category: z.literal('recommendation_strategy'),
  weight: z.enum(weightKeys),
  isCollaborativeFiltering: z.boolean().default(false),
  isContentBased: z.boolean().default(false),
  isHybrid: z.boolean().default(false),
  isPopularity: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  isPersonalized: z.boolean().default(false),
  isRuleBased: z.boolean().default(false),
  isAiBased: z.boolean().default(false),
  isAssociation: z.boolean().default(false),
  isSequential: z.boolean().default(false),
  isContextual: z.boolean().default(false),
});

export const RecommendationStrategyEnumSchema = z.enum(strategyKeys);
