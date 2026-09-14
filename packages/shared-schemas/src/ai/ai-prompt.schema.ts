/**
 * AI Prompt Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-prompt.constants থেকে।
 */

import { z } from 'zod';
import { AI_PROMPT_TYPE, AI_PROMPT_STATUS, AI_PROMPT_ROLE } from '@vubon/shared-constants/ai';
import { BaseEntitySchema } from '../common/base/base-entity.schema';

export const AiPromptTypeSchema = z.enum(Object.values(AI_PROMPT_TYPE) as [string, ...string[]]);

export const AiPromptStatusSchema = z.enum(
  Object.values(AI_PROMPT_STATUS) as [string, ...string[]]
);

export const AiPromptRoleSchema = z.enum(Object.values(AI_PROMPT_ROLE) as [string, ...string[]]);

export const AiPromptVariableSchema = z.object({
  name: z.string().min(1).max(50),
  type: z.enum(['string', 'number', 'boolean', 'array', 'object']),
  required: z.boolean(),
  defaultValue: z.string().max(500).optional(),
  description: z.string().max(500).optional(),
});

export const AiPromptMessageSchema = z.object({
  role: AiPromptRoleSchema,
  content: z.string().min(1).max(100000),
  name: z.string().max(100).optional(),
});

export const AiPromptSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  slug: z.string().min(1).max(150),
  type: AiPromptTypeSchema,
  status: AiPromptStatusSchema,
  template: z.string().min(1).max(100000),
  systemMessage: z.string().max(50000).optional(),
  variables: z.array(AiPromptVariableSchema).max(50),
  model: z.string().max(100).optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().int().positive().max(200000).optional(),
  topP: z.number().min(0).max(1).optional(),
  version: z.number().int().positive(),
  createdBy: z.string().min(1),
  updatedBy: z.string().optional(),
});

export const AiPromptRenderInputSchema = z.object({
  promptId: z.string().min(1),
  variables: z.record(z.string(), z.unknown()),
});

export const AiPromptRenderResultSchema = z.object({
  messages: z.array(AiPromptMessageSchema).min(1).max(100),
  missingVariables: z.array(z.string().max(50)).optional(),
});

export type AiPromptTypeSchemaType = z.infer<typeof AiPromptTypeSchema>;
export type AiPromptStatusSchemaType = z.infer<typeof AiPromptStatusSchema>;
export type AiPromptRoleSchemaType = z.infer<typeof AiPromptRoleSchema>;
export type AiPromptSchemaType = z.infer<typeof AiPromptSchema>;
