import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AIModelTypeSchema } from './ai-model-type.schema';
import { AIModelStatusSchema } from './ai-model-status.schema';
import { AIModelProviderSchema } from './ai-model-provider.schema';
import { AIFeatureSchema } from './ai-feature.schema';

export const AIModelSchema = BaseSchema.extend({
  modelId: z.string().uuid(),
  aiId: z.string().uuid(),
  name: z.string().min(1).max(100),
  version: z.string().min(1).max(20),
  type: AIModelTypeSchema,
  status: AIModelStatusSchema,
  provider: AIModelProviderSchema,
  features: z.array(AIFeatureSchema),
  modelSize: z.number().min(0),
  accuracy: z.number().min(0).max(1),
  precision: z.number().min(0).max(1),
  recall: z.number().min(0).max(1),
  f1Score: z.number().min(0).max(1),
  trainingDataSize: z.number().int().min(0),
  trainingTime: z.number().min(0),
  isActive: z.boolean().default(true),
  isDeployed: z.boolean().default(false),
  isDeprecated: z.boolean().default(false),
  deployedAt: z.date().optional(),
  deprecatedAt: z.date().optional(),
  metadata: z.object({
    description: z.string().optional(),
    tags: z.array(z.string()),
    hyperparameters: z.record(z.unknown()),
    evaluationMetrics: z.record(z.number()),
    limitations: z.array(z.string()),
    useCases: z.array(z.string()),
  }),
});
