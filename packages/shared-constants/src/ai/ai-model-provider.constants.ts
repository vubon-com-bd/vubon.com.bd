import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const AI_MODEL_PROVIDER = {
  TYPES: {
    ...COMMON_TYPES,
    OPENAI: 'openai',
    GOOGLE: 'google',
    AWS: 'aws',
    AZURE: 'azure',
    META: 'meta',
    ANTHROPIC: 'anthropic',
    COHERE: 'cohere',
    HUGGINGFACE: 'huggingface',
    REKA: 'reka',
    MISTRAL: 'mistral',
    GEMINI: 'gemini',
    CLAUDE: 'claude',
    LLAMA: 'llama',
    BERT: 'bert',
    T5: 't5',
  },
  PROVIDER_ENDPOINTS: {
    OPENAI: 'https://api.openai.com/v1',
    GOOGLE: 'https://api.google.com/ai/v1',
    AWS: 'https://api.aws.amazon.com/ai/v1',
    AZURE: 'https://api.azure.com/ai/v1',
  },
  PROVIDER_API_VERSIONS: {
    OPENAI: '2024-02-15',
    GOOGLE: 'v1beta1',
    AWS: 'v1',
    AZURE: '2024-02-15-preview',
  },
} as const;
