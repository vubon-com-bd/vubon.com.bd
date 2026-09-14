/**
 * AI Model Schema
 * @module shared-schemas/ai
 *
 * AI model definition + configuration।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { AiModelTypeSchema } from './ai-model-type.schema';
import { AiModelStatusSchema } from './ai-model-status.schema';
import { AiModelProviderSchema } from './ai-model-provider.schema';

export const AiModelSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(100),
  displayName: z.string().min(1).max(150),
  type: AiModelTypeSchema,
  provider: AiModelProviderSchema,
  status: AiModelStatusSchema,
  version: z.string().min(1).max(50),
  description: z.string().max(2000).optional(),
  contextWindow: z.number().int().positive().max(2000000).optional(),
  maxOutputTokens: z.number().int().positive().max(200000).optional(),
  embeddingDimension: z.number().int().positive().max(10000).optional(),
  supportsStreaming: z.boolean(),
  supportsFunctionCalling: z.boolean(),
  supportsVision: z.boolean(),
  costPerInputToken: z.number().nonnegative().optional(),
  costPerOutputToken: z.number().nonnegative().optional(),
  currency: z.string().length(3).optional(),
  documentationUrl: z.string().url().optional(),
  isDefault: z.boolean(),
});

export const AiModelPublicSchema = AiModelSchema.pick({
  id: true,
  name: true,
  displayName: true,
  type: true,
  provider: true,
  version: true,
  contextWindow: true,
  supportsStreaming: true,
});

export const AiModelConfigSchema = z.object({
  modelId: z.string().min(1),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().int().min(1).max(200000),
  topP: z.number().min(0).max(1),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
  stopSequences: z.array(z.string().max(100)).max(4).optional(),
});

export const AiModelListFilterSchema = z.object({
  type: AiModelTypeSchema.optional(),
  provider: AiModelProviderSchema.optional(),
  status: AiModelStatusSchema.optional(),
  isDefault: z.boolean().optional(),
  search: z.string().max(200).optional(),
});

export type AiModelSchemaType = z.infer<typeof AiModelSchema>;
export type AiModelPublicSchemaType = z.infer<typeof AiModelPublicSchema>;
export type AiModelConfigSchemaType = z.infer<typeof AiModelConfigSchema>;
export type AiModelListFilterSchemaType = z.infer<typeof AiModelListFilterSchema>;
