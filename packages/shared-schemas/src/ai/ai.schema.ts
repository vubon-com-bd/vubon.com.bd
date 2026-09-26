/**
 * AI Core Schema
 * @module shared-schemas/ai
 *
 * AI entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { AiModelTypeSchema } from './ai-model-type.schema';
import { AiModelStatusSchema } from './ai-model-status.schema';
import { AiModelProviderSchema } from './ai-model-provider.schema';
import { AiFeatureSchema } from './ai-feature.schema';
import { AiModelSchema, AiModelConfigSchema } from './ai-model.schema';
import { AiModelUsageSchema } from './ai-analytics.schema';

export const AiSchema = BaseEntitySchema.extend({
  modelId: z.string().min(1),
  modelType: AiModelTypeSchema,
  modelStatus: AiModelStatusSchema,
  modelProvider: AiModelProviderSchema,
  feature: AiFeatureSchema,
  inputTokens: z.number().int().nonnegative(),
  outputTokens: z.number().int().nonnegative(),
  totalTokens: z.number().int().nonnegative(),
  cost: z.number().nonnegative(),
  currency: z.string().length(3),
  latencyMs: z.number().int().nonnegative(),
  success: z.boolean(),
  errorCode: z.string().max(50).optional(),
  errorMessage: z.string().max(1000).optional(),
  userId: z.string().optional(),
  sessionId: z.string().max(128).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const AiPublicSchema = AiSchema.pick({
  id: true,
  modelId: true,
  feature: true,
  totalTokens: true,
  latencyMs: true,
  success: true,
  createdAt: true,
});

export const AiRequestSchema = z.object({
  feature: AiFeatureSchema,
  modelId: z.string().max(100).optional(),
  prompt: z.string().min(1).max(100000),
  variables: z.record(z.string(), z.unknown()).optional(),
  config: AiModelConfigSchema.partial().optional(),
  userId: z.string().optional(),
  sessionId: z.string().max(128).optional(),
});

export const AiResponseSchema = z.object({
  id: z.string().min(1),
  modelId: z.string().min(1),
  content: z.string().max(500000),
  inputTokens: z.number().int().nonnegative(),
  outputTokens: z.number().int().nonnegative(),
  totalTokens: z.number().int().nonnegative(),
  latencyMs: z.number().int().nonnegative(),
  cost: z.number().nonnegative().optional(),
  finishReason: z.enum(['stop', 'length', 'content_filter', 'error']),
  cached: z.boolean(),
});

export const AiUsageSummarySchema = z.object({
  period: z.string().min(1),
  totalRequests: z.number().int().nonnegative(),
  totalTokens: z.number().int().nonnegative(),
  totalCost: z.number().nonnegative(),
  currency: z.string().length(3),
  averageLatencyMs: z.number().nonnegative(),
  errorRate: z.number().min(0).max(1),
  byModel: z.array(AiModelUsageSchema).max(100),
  byFeature: z.record(z.string(), z.number().int().nonnegative()),
});

export const AiListFilterSchema = z.object({
  modelId: z.string().optional(),
  modelType: AiModelTypeSchema.optional(),
  modelProvider: AiModelProviderSchema.optional(),
  feature: AiFeatureSchema.optional(),
  success: z.boolean().optional(),
  userId: z.string().optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export const AiContextSchema = z.object({
  models: z.array(AiModelSchema).max(100),
  defaultModelId: z.string().min(1),
  enabledFeatures: z.array(AiFeatureSchema).max(50),
});

export type AiSchemaType = z.infer<typeof AiSchema>;
export type AiPublicSchemaType = z.infer<typeof AiPublicSchema>;
export type AiRequestSchemaType = z.infer<typeof AiRequestSchema>;
export type AiResponseSchemaType = z.infer<typeof AiResponseSchema>;
export type AiUsageSummarySchemaType = z.infer<typeof AiUsageSummarySchema>;
export type AiListFilterSchemaType = z.infer<typeof AiListFilterSchema>;
export type AiContextSchemaType = z.infer<typeof AiContextSchema>;
