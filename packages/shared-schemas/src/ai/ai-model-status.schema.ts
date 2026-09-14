/**
 * AI Model Status Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-model-status.constants থেকে।
 */

import { z } from 'zod';
import { AI_MODEL_STATUS } from '@vubon/shared-constants/ai';

export const AiModelStatusSchema = z.enum(Object.values(AI_MODEL_STATUS) as [string, ...string[]]);

export type AiModelStatusSchemaType = z.infer<typeof AiModelStatusSchema>;
