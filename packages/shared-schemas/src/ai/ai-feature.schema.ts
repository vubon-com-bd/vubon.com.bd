/**
 * AI Feature Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-feature.constants থেকে।
 */

import { z } from 'zod';
import { AI_FEATURE, AI_FEATURE_STATUS } from '@vubon/shared-constants/ai';

export const AiFeatureSchema = z.enum(Object.values(AI_FEATURE) as [string, ...string[]]);

export const AiFeatureStatusSchema = z.enum(
  Object.values(AI_FEATURE_STATUS) as [string, ...string[]]
);

export const AiFeatureConfigSchema = z.object({
  feature: AiFeatureSchema,
  status: AiFeatureStatusSchema,
  enabled: z.boolean(),
  model: z.string().max(100).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
});

export const AiFeatureFlagSchema = z.object({
  feature: AiFeatureSchema,
  enabled: z.boolean(),
  rolloutPercent: z.number().int().min(0).max(100),
  allowedRoles: z.array(z.string().max(50)).max(50).optional(),
  allowedUserIds: z.array(z.string()).max(1000).optional(),
});

export type AiFeatureSchemaType = z.infer<typeof AiFeatureSchema>;
export type AiFeatureStatusSchemaType = z.infer<typeof AiFeatureStatusSchema>;
export type AiFeatureConfigSchemaType = z.infer<typeof AiFeatureConfigSchema>;
export type AiFeatureFlagSchemaType = z.infer<typeof AiFeatureFlagSchema>;
