/**
 * AI Model Provider Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-model-provider.constants থেকে।
 */

import { z } from 'zod';
import { AI_MODEL_PROVIDER, AI_PROVIDER_REGION } from '@vubon/shared-constants/ai';

export const AiModelProviderSchema = z.enum(
  Object.values(AI_MODEL_PROVIDER) as [string, ...string[]]
);

export const AiProviderRegionSchema = z.enum(
  Object.values(AI_PROVIDER_REGION) as [string, ...string[]]
);

export type AiModelProviderSchemaType = z.infer<typeof AiModelProviderSchema>;
export type AiProviderRegionSchemaType = z.infer<typeof AiProviderRegionSchema>;
