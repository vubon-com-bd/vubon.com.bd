import { z } from 'zod';
import { RECOMMENDATION_TYPE } from '@vubon/shared-constants/src/platform/discovery/recommendation-type.constants';

const recommendationTypeKeys = Object.keys(RECOMMENDATION_TYPE.TYPES) as [string, ...string[]];

export const RecommendationTypeSchema = z.object({
  type: z.enum(recommendationTypeKeys),
  category: z.literal('recommendation_type'),
  isPersonalized: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  isPopular: z.boolean().default(false),
  isRecentlyViewed: z.boolean().default(false),
  isFrequentlyBought: z.boolean().default(false),
  isComplementary: z.boolean().default(false),
  isSubstitute: z.boolean().default(false),
  isUpselling: z.boolean().default(false),
  isCrossSelling: z.boolean().default(false),
  isBundle: z.boolean().default(false),
  isNewArrivals: z.boolean().default(false),
  isBestSellers: z.boolean().default(false),
  isTopRated: z.boolean().default(false),
  isDiscounted: z.boolean().default(false),
  isSeasonal: z.boolean().default(false),
  isHoliday: z.boolean().default(false),
});

export const RecommendationTypeEnumSchema = z.enum(recommendationTypeKeys);
