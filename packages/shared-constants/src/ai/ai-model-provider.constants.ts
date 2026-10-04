export const AI_MODEL_PROVIDER = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  GOOGLE: 'google',
  META: 'meta',
  MICROSOFT: 'microsoft',
  COHERE: 'cohere',
  HUGGING_FACE: 'hugging_face',
  STABILITY_AI: 'stability_ai',
  MISTRAL: 'mistral',
  DEEPSEEK: 'deepseek',
  XAI: 'xai',
  LOCAL: 'local',
  CUSTOM: 'custom',
} as const;

export const AI_PROVIDER_ENV_KEY = {
  OPENAI_API_KEY: 'OPENAI_API_KEY',
  ANTHROPIC_API_KEY: 'ANTHROPIC_API_KEY',
  GOOGLE_API_KEY: 'GOOGLE_API_KEY',
  COHERE_API_KEY: 'COHERE_API_KEY',
  HUGGING_FACE_API_KEY: 'HUGGING_FACE_API_KEY',
  MISTRAL_API_KEY: 'MISTRAL_API_KEY',
  DEEPSEEK_API_KEY: 'DEEPSEEK_API_KEY',
  XAI_API_KEY: 'XAI_API_KEY',
} as const;

export const AI_PROVIDER_REGION = {
  US: 'us',
  EU: 'eu',
  ASIA: 'asia',
  GLOBAL: 'global',
} as const;

export type AiModelProviderType = (typeof AI_MODEL_PROVIDER)[keyof typeof AI_MODEL_PROVIDER];
export type AiProviderRegionType = (typeof AI_PROVIDER_REGION)[keyof typeof AI_PROVIDER_REGION];
