/**
 * AI Model Type Schema
 * @module shared-schemas/ai
 */

import { z } from 'zod';
import { AI_MODEL_TYPE } from '@vubon/shared-constants/ai';

export const AiModelTypeSchema = z.enum(Object.values(AI_MODEL_TYPE) as [string, ...string[]]);

export type AiModelTypeSchemaType = z.infer<typeof AiModelTypeSchema>;
