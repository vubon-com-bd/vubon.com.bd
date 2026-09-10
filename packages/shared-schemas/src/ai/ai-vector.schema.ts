import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AI_VECTOR } from '@vubon/shared-constants/src/ai/ai-vector.constants';

const aiVectorTypeKeys = Object.keys(AI_VECTOR.TYPES) as [string, ...string[]];
const vectorIndexTypeKeys = Object.keys(AI_VECTOR.VECTOR_INDEX_TYPES) as [string, ...string[]];

export const AIVectorSchema = BaseSchema.extend({
  vectorId: z.string().uuid(),
  aiId: z.string().uuid(),
  type: z.enum(aiVectorTypeKeys),
  indexType: z.enum(vectorIndexTypeKeys),
  dimensions: z.number().int().min(1),
  values: z.array(z.number()),
  metadata: z.record(z.unknown()).optional(),
  isActive: z.boolean().default(true),
});
