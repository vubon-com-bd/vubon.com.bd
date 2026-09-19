/**
 * AI Prompt Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-prompt.constants থেকে।
 */

import type { AI_PROMPT_TYPE, AI_PROMPT_STATUS, AI_PROMPT_ROLE } from '@vubon/shared-constants/ai';
import type { BaseEntity } from '../common/base';

export type AiPromptTypeValue = (typeof AI_PROMPT_TYPE)[keyof typeof AI_PROMPT_TYPE];

export type AiPromptStatusValue = (typeof AI_PROMPT_STATUS)[keyof typeof AI_PROMPT_STATUS];

export type AiPromptRoleValue = (typeof AI_PROMPT_ROLE)[keyof typeof AI_PROMPT_ROLE];

export interface AiPrompt extends BaseEntity<string> {
  readonly name: string;
  readonly slug: string;
  readonly type: AiPromptTypeValue;
  readonly status: AiPromptStatusValue;
  readonly template: string;
  readonly systemMessage?: string;
  readonly variables: readonly AiPromptVariable[];
  readonly model?: string;
  readonly temperature?: number;
  readonly maxTokens?: number;
  readonly topP?: number;
  readonly version: number;
  readonly createdBy: string;
  readonly updatedBy?: string;
}

export interface AiPromptVariable {
  readonly name: string;
  readonly type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  readonly required: boolean;
  readonly defaultValue?: string;
  readonly description?: string;
}

export interface AiPromptMessage {
  readonly role: AiPromptRoleValue;
  readonly content: string;
  readonly name?: string;
}

export interface AiPromptRenderInput {
  readonly promptId: string;
  readonly variables: Readonly<Record<string, unknown>>;
}

export interface AiPromptRenderResult {
  readonly messages: readonly AiPromptMessage[];
  readonly missingVariables?: readonly string[];
}
