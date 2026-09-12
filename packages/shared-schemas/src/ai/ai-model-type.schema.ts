import { z } from 'zod';
import { AI_MODEL_TYPE } from '@vubon/shared-constants/src/ai/ai-model-type.constants';

const aiModelTypeKeys = Object.keys(AI_MODEL_TYPE.TYPES) as [string, ...string[]];

export const AIModelTypeSchema = z.object({
  type: z.enum(aiModelTypeKeys),
  category: z.literal('ai_model_type'),
  isCollaborativeFiltering: z.boolean().default(false),
  isContentBased: z.boolean().default(false),
  isHybrid: z.boolean().default(false),
  isDeepLearning: z.boolean().default(false),
  isNeuralNetwork: z.boolean().default(false),
  isTransformer: z.boolean().default(false),
  isBert: z.boolean().default(false),
  isGpt: z.boolean().default(false),
  isClip: z.boolean().default(false),
  isResnet: z.boolean().default(false),
  isCnn: z.boolean().default(false),
  isRnn: z.boolean().default(false),
  isLstm: z.boolean().default(false),
  isGru: z.boolean().default(false),
  isXgboost: z.boolean().default(false),
  isRandomForest: z.boolean().default(false),
  isSvm: z.boolean().default(false),
  isKmeans: z.boolean().default(false),
  isDbscan: z.boolean().default(false),
  isPca: z.boolean().default(false),
  isTsne: z.boolean().default(false),
});

export const AIModelTypeEnumSchema = z.enum(aiModelTypeKeys);
