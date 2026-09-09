import { BaseEntity } from '../common/base.types';
import { AI_SIMILARITY } from '@vubon/shared-constants/src/ai/ai-similarity.constants';
import { AIVector } from './ai-vector.types';
import { AI } from './ai.types';

export interface AISimilarity extends BaseEntity {
  similarityId: string;
  aiId: string;
  ai: AI;
  type: keyof typeof AI_SIMILARITY.TYPES | string;
  metric: keyof typeof AI_SIMILARITY.DEFAULT_SIMILARITY_METRIC | string;
  vectorA: AIVector;
  vectorB: AIVector;
  score: number;
  threshold: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
