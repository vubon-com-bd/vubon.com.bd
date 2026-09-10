import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { AI_MODEL_STATUS } from '@vubon/shared-constants/src/ai/ai-model-status.constants';

const aiModelStatusKeys = Object.keys(AI_MODEL_STATUS) as [string, ...string[]];

export const AIModelStatusSchema = StatusSchema.extend({
  status: z.enum(aiModelStatusKeys),
  category: z.literal('ai_model'),
  isDraft: z.boolean().default(false),
  isTraining: z.boolean().default(false),
  isEvaluating: z.boolean().default(false),
  isDeployed: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  isDeprecated: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  isPaused: z.boolean().default(false),
});

export const AIModelStatusEnumSchema = z.enum(aiModelStatusKeys);
