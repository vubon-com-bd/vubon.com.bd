import { z } from 'zod';
import { AI_MODEL_PROVIDER } from '@vubon/shared-constants/src/ai/ai-model-provider.constants';

const aiModelProviderKeys = Object.keys(AI_MODEL_PROVIDER.TYPES) as [string, ...string[]];

export const AIModelProviderSchema = z.object({
  provider: z.enum(aiModelProviderKeys),
  category: z.literal('ai_model_provider'),
  apiEndpoint: z.string().url(),
  apiVersion: z.string(),
  isOpenAI: z.boolean().default(false),
  isGoogle: z.boolean().default(false),
  isAws: z.boolean().default(false),
  isAzure: z.boolean().default(false),
  isMeta: z.boolean().default(false),
  isAnthropic: z.boolean().default(false),
  isCohere: z.boolean().default(false),
  isHuggingFace: z.boolean().default(false),
  isReka: z.boolean().default(false),
  isMistral: z.boolean().default(false),
  isGemini: z.boolean().default(false),
  isClaude: z.boolean().default(false),
  isLlama: z.boolean().default(false),
  isBert: z.boolean().default(false),
  isT5: z.boolean().default(false),
});

export const AIModelProviderEnumSchema = z.enum(aiModelProviderKeys);
