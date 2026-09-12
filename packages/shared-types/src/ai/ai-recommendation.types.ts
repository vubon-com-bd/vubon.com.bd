import { BaseEntity } from '../common/base.types';
import { Product } from '../business/product/product.types';
import { AI_RECOMMENDATION } from '@vubon/shared-constants/src/ai/ai-recommendation.constants';
import { RECOMMENDATION_STRATEGY } from '@vubon/shared-constants/src/platform/discovery/recommendation-strategy.constants';
import { AI } from './ai.types';

export interface AIRecommendation extends BaseEntity {
  recommendationId: string;
  aiId: string;
  ai: AI;
  productId: string;
  product: Product;
  type: keyof typeof AI_RECOMMENDATION.TYPES | string;
  strategy: keyof typeof RECOMMENDATION_STRATEGY.TYPES | string;
  algorithm: keyof typeof AI_RECOMMENDATION.AI_RECOMMENDATION_ALGORITHMS | string;
  score: number;
  confidence: number;
  rank: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
