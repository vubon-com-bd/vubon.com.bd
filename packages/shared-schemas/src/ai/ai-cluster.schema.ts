import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AI_CLUSTER } from '@vubon/shared-constants/src/ai/ai-cluster.constants';
import { AIVectorSchema } from './ai-vector.schema';

const aiClusterTypeKeys = Object.keys(AI_CLUSTER.TYPES) as [string, ...string[]];

export const AIClusterSchema = BaseSchema.extend({
  clusterId: z.string().uuid(),
  aiId: z.string().uuid(),
  type: z.enum(aiClusterTypeKeys),
  vectors: z.array(AIVectorSchema),
  centroid: AIVectorSchema,
  size: z.number().int().min(0),
  silhouetteScore: z.number().min(-1).max(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
