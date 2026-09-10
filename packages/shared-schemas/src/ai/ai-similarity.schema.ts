import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AI_SIMILARITY } from '@vubon/shared-constants/src/ai/ai-similarity.constants';
import { AIVectorSchema } from './ai-vector.schema';

const aiSimilarityTypeKeys = Object.keys(AI_SIMILARITY.TYPES) as [string, ...string[]];

export const AISimilaritySchema = BaseSchema.extend({
  similarityId: z.string().uuid(),
  aiId: z.string().uuid(),
  type: z.enum(aiSimilarityTypeKeys),
  metric: z.string(),
  vectorA: AIVectorSchema,
  vectorB: AIVectorSchema,
  score: z.number().min(0).max(1),
  threshold: z.number().min(0).max(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
