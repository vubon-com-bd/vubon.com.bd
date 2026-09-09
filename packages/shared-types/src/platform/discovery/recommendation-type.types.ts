import { TypeObject } from '../../common/types.types';
import { RECOMMENDATION_TYPE } from '@vubon/shared-constants/src/platform/discovery/recommendation-type.constants';

export interface RecommendationType extends TypeObject {
  type: keyof typeof RECOMMENDATION_TYPE.TYPES | string;
  category: 'recommendation_type';
  isPersonalized: boolean;
  isTrending: boolean;
  isPopular: boolean;
  isRecentlyViewed: boolean;
  isFrequentlyBought: boolean;
  isComplementary: boolean;
  isSubstitute: boolean;
  isUpselling: boolean;
  isCrossSelling: boolean;
  isBundle: boolean;
  isNewArrivals: boolean;
  isBestSellers: boolean;
  isTopRated: boolean;
  isDiscounted: boolean;
  isSeasonal: boolean;
  isHoliday: boolean;
}

export type RecommendationTypeKey = keyof typeof RECOMMENDATION_TYPE.TYPES;
