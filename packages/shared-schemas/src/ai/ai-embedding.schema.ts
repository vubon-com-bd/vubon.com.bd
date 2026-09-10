import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AI_EMBEDDING } from '@vubon/shared-constants/src/ai/ai-embedding.constants';
import { AIModelProviderSchema } from './ai-model-provider.schema';

const aiEmbeddingTypeKeys = Object.keys(AI_EMBEDDING.TYPES) as [string, ...string[]];
const embeddingModelKeys = Object.keys(AI_EMBEDDING.EMBEDDING_MODELS) as [string, ...string[]];
const embeddingDimensionKeys = Object.keys(AI_EMBEDDING.EMBEDDING_DIMENSIONS) as [
  string,
  ...string[],
];

export const AIEmbeddingSchema = BaseSchema.extend({
  embeddingId: z.string().uuid(),
  aiId: z.string().uuid(),
  type: z.enum(aiEmbeddingTypeKeys),
  model: z.enum(embeddingModelKeys),
  dimensions: z.enum(embeddingDimensionKeys),
  provider: AIModelProviderSchema,
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
