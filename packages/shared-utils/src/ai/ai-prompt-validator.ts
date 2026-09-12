import { AI_PROMPT } from '@vubon/shared-constants/src/ai/ai-prompt.constants';

export interface AIPromptInput {
  template: string;
  type: string;
  temperature: number;
  topP: number;
  maxLength: number;
}

export const validateAIPrompt = (
  prompt: Partial<AIPromptInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!prompt.template) errors.push('Prompt template is required');
  if (prompt.type && !Object.keys(AI_PROMPT.TYPES).includes(prompt.type)) {
    errors.push('Invalid prompt type');
  }
  if (prompt.temperature !== undefined && (prompt.temperature < 0 || prompt.temperature > 1)) {
    errors.push('Temperature must be between 0 and 1');
  }
  if (prompt.topP !== undefined && (prompt.topP < 0 || prompt.topP > 1)) {
    errors.push('Top P must be between 0 and 1');
  }
  if (prompt.maxLength !== undefined && prompt.maxLength < 1) {
    errors.push('Max length must be at least 1');
  }
  return { isValid: errors.length === 0, errors };
};
