import { BaseEntity } from '../../common/base.types';
import { Product } from '../../business/product/product.types';
import { RECOMMENDATION } from '@vubon/shared-constants/src/platform/discovery/recommendation.constants';
import { RecommendationType } from './recommendation-type.types';
import { RecommendationStrategy } from './recommendation-strategy.types';

export interface Recommendation extends BaseEntity {
  recommendationId: string;
  productId: string;
  product: Product;
  type: RecommendationType;
  strategy: RecommendationStrategy;
  source: keyof typeof RECOMMENDATION.RECOMMENDATION_SOURCES | string;
  score: number;
  rank: number;
  status: keyof typeof RECOMMENDATION.STATUS | string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
