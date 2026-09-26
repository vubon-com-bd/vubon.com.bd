import { AI_MODEL_TYPE } from './ai-model-type.constants';
import { AI_MODEL_STATUS } from './ai-model-status.constants';
import {
  AI_MODEL_PROVIDER,
  AI_PROVIDER_ENV_KEY,
  AI_PROVIDER_REGION,
} from './ai-model-provider.constants';

export const AI_MODEL_NAME = {
  GPT_4: 'gpt-4',
  GPT_4_TURBO: 'gpt-4-turbo',
  GPT_4O: 'gpt-4o',
  GPT_4O_MINI: 'gpt-4o-mini',
  GPT_3_5_TURBO: 'gpt-3.5-turbo',
  CLAUDE_3_OPUS: 'claude-3-opus',
  CLAUDE_3_SONNET: 'claude-3-sonnet',
  CLAUDE_3_HAIKU: 'claude-3-haiku',
  GEMINI_PRO: 'gemini-pro',
  GEMINI_FLASH: 'gemini-flash',
  LLAMA_3: 'llama-3',
  MISTRAL_LARGE: 'mistral-large',
  MIXTRAL_8X7B: 'mixtral-8x7b',
  DEEPSEEK_V3: 'deepseek-v3',
  DEEPSEEK_R1: 'deepseek-r1',
  COMMAND_R: 'command-r',
  TEXT_EMBEDDING_3: 'text-embedding-3-large',
  TEXT_EMBEDDING_3_SMALL: 'text-embedding-3-small',
} as const;

export const AI_MODEL = {
  TYPE: AI_MODEL_TYPE,
  STATUS: AI_MODEL_STATUS,
  PROVIDER: AI_MODEL_PROVIDER,
  PROVIDER_ENV_KEY: AI_PROVIDER_ENV_KEY,
  PROVIDER_REGION: AI_PROVIDER_REGION,
  NAME: AI_MODEL_NAME,
} as const;

export type AiModelType = typeof AI_MODEL;
