import { TypeObject } from '../../common/types.types';
import { RECOMMENDATION_STRATEGY } from '@vubon/shared-constants/src/platform/discovery/recommendation-strategy.constants';

export interface RecommendationStrategy extends TypeObject {
  type: keyof typeof RECOMMENDATION_STRATEGY.TYPES | string;
  category: 'recommendation_strategy';
  weight: keyof typeof RECOMMENDATION_STRATEGY.STRATEGY_WEIGHTS | string;
  isCollaborativeFiltering: boolean;
  isContentBased: boolean;
  isHybrid: boolean;
  isPopularity: boolean;
  isTrending: boolean;
  isPersonalized: boolean;
  isRuleBased: boolean;
  isAiBased: boolean;
  isAssociation: boolean;
  isSequential: boolean;
  isContextual: boolean;
}

export type RecommendationStrategyKey = keyof typeof RECOMMENDATION_STRATEGY.TYPES;
