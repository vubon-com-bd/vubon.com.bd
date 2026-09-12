import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AI_PROMPT } from '@vubon/shared-constants/src/ai/ai-prompt.constants';

const aiPromptTypeKeys = Object.keys(AI_PROMPT.TYPES) as [string, ...string[]];

export const AIPromptSchema = BaseSchema.extend({
  promptId: z.string().uuid(),
  aiId: z.string().uuid(),
  type: z.enum(aiPromptTypeKeys),
  template: z.string().min(1),
  variables: z.array(z.string()),
  temperature: z.number().min(0).max(1).default(0.7),
  topP: z.number().min(0).max(1).default(0.9),
  frequencyPenalty: z.number().min(-2).max(2).default(0),
  presencePenalty: z.number().min(-2).max(2).default(0),
  maxLength: z.number().int().min(1).default(4096),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
