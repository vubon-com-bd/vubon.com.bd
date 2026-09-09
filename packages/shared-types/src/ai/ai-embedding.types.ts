import { BaseEntity } from '../common/base.types';
import { AI_EMBEDDING } from '@vubon/shared-constants/src/ai/ai-embedding.constants';
import { AIModelProvider } from './ai-model-provider.types';
import { AI } from './ai.types';

export interface AIEmbedding extends BaseEntity {
  embeddingId: string;
  aiId: string;
  ai: AI;
  type: keyof typeof AI_EMBEDDING.TYPES | string;
  model: keyof typeof AI_EMBEDDING.EMBEDDING_MODELS | string;
  dimensions: keyof typeof AI_EMBEDDING.EMBEDDING_DIMENSIONS | string;
  provider: AIModelProvider;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
