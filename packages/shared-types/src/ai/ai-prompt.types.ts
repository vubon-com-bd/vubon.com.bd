import { BaseEntity } from '../common/base.types';
import { AI_PROMPT } from '@vubon/shared-constants/src/ai/ai-prompt.constants';
import { AI } from './ai.types';

export interface AIPrompt extends BaseEntity {
  promptId: string;
  aiId: string;
  ai: AI;
  type: keyof typeof AI_PROMPT.TYPES | string;
  template: string;
  variables: string[];
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxLength: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
