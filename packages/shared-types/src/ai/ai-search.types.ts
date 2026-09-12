import { BaseEntity } from '../common/base.types';
import { Product } from '../business/product/product.types';
import { AI_SEARCH } from '@vubon/shared-constants/src/ai/ai-search.constants';
import { AI } from './ai.types';

export interface AISearch extends BaseEntity {
  searchId: string;
  aiId: string;
  ai: AI;
  query: string;
  type: keyof typeof AI_SEARCH.TYPES | string;
  model: keyof typeof AI_SEARCH.SEMANTIC_SEARCH_MODELS | string;
  dimensions: keyof typeof AI_SEARCH.VECTOR_SEARCH_DIMENSIONS | string;
  similarityThreshold: number;
  results: Product[];
  resultCount: number;
  took: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
