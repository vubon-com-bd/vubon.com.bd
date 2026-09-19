export const AI_PROMPT_TYPE = {
  SYSTEM: 'system',
  USER: 'user',
  ASSISTANT: 'assistant',
  FUNCTION: 'function',
  TOOL: 'tool',
  TEMPLATE: 'template',
  FEW_SHOT: 'few_shot',
  CHAIN_OF_THOUGHT: 'chain_of_thought',
} as const;

export const AI_PROMPT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  TESTING: 'testing',
  DEPRECATED: 'deprecated',
  ARCHIVED: 'archived',
} as const;

export const AI_PROMPT = {
  MAX_PROMPT_LENGTH: 100000,
  MAX_SYSTEM_LENGTH: 50000,
  MAX_VARIABLES: 50,
  VARIABLE_NAME_MAX_LENGTH: 50,
  MAX_VERSIONS: 50,
  TEMPERATURE_MIN: 0.0,
  TEMPERATURE_MAX: 2.0,
  TEMPERATURE_DEFAULT: 0.7,
  TOP_P_MIN: 0.0,
  TOP_P_MAX: 1.0,
  TOP_P_DEFAULT: 1.0,
  MAX_TOKENS_MIN: 1,
  MAX_TOKENS_MAX: 128000,
  MAX_TOKENS_DEFAULT: 2048,
  FREQUENCY_PENALTY_MIN: -2.0,
  FREQUENCY_PENALTY_MAX: 2.0,
  FREQUENCY_PENALTY_DEFAULT: 0.0,
  PRESENCE_PENALTY_MIN: -2.0,
  PRESENCE_PENALTY_MAX: 2.0,
  PRESENCE_PENALTY_DEFAULT: 0.0,
  RETENTION_DAYS: 365,
} as const;

export const AI_PROMPT_ROLE = {
  SYSTEM: 'system',
  USER: 'user',
  ASSISTANT: 'assistant',
  TOOL: 'tool',
} as const;

export type AiPromptTypeType = (typeof AI_PROMPT_TYPE)[keyof typeof AI_PROMPT_TYPE];
export type AiPromptStatusType = (typeof AI_PROMPT_STATUS)[keyof typeof AI_PROMPT_STATUS];
export type AiPromptRoleType = (typeof AI_PROMPT_ROLE)[keyof typeof AI_PROMPT_ROLE];
