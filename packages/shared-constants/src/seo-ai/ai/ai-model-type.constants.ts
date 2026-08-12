/**
 * AI মডেল টাইপ এনাম
 */
export const AI_MODEL_TYPE = {
  GPT: 'gpt',
  CLAUDE: 'claude',
  LLAMA: 'llama',
  BERT: 'bert',
  T5: 't5',
  BLOOM: 'bloom',
  FALCON: 'falcon',
  MISTRAL: 'mistral',
  GEMINI: 'gemini',
} as const;

/**
 * AI_MODEL_TYPE থেকে টাইপ
 */
export type AIModelType = (typeof AI_MODEL_TYPE)[keyof typeof AI_MODEL_TYPE];

/**
 * AI মডেল টাইপের বিবরণ
 */
export const AI_MODEL_TYPE_DESCRIPTION: Record<AIModelType, string> = {
  [AI_MODEL_TYPE.GPT]:
    'OpenAI GPT series - Advanced language models for text generation and reasoning',
  [AI_MODEL_TYPE.CLAUDE]:
    'Anthropic Claude - Constitutional AI models with strong reasoning capabilities',
  [AI_MODEL_TYPE.LLAMA]: 'Meta LLaMA - Open source foundation models for various NLP tasks',
  [AI_MODEL_TYPE.BERT]:
    'Google BERT - Bidirectional transformers for understanding context and embeddings',
  [AI_MODEL_TYPE.T5]: 'Google T5 - Text-to-Text Transfer Transformer for multi-task learning',
  [AI_MODEL_TYPE.BLOOM]: 'BigScience BLOOM - Large multilingual open-source language model',
  [AI_MODEL_TYPE.FALCON]: 'TII Falcon - High-performance open-source language models',
  [AI_MODEL_TYPE.MISTRAL]:
    'Mistral AI - Efficient and powerful language models with high performance',
  [AI_MODEL_TYPE.GEMINI]: 'Google Gemini - Multimodal AI models with advanced capabilities',
} as const;

/**
 * AI মডেল টাইপের সক্ষমতা
 */
export const AI_MODEL_TYPE_CAPABILITIES: Record<AIModelType, string[]> = {
  [AI_MODEL_TYPE.GPT]: [
    'text-generation',
    'text-completion',
    'code-generation',
    'chat-completion',
    'reasoning',
    'translation',
    'summarization',
  ],
  [AI_MODEL_TYPE.CLAUDE]: [
    'text-generation',
    'chat-completion',
    'reasoning',
    'analysis',
    'code-generation',
    'constitutional-ai',
  ],
  [AI_MODEL_TYPE.LLAMA]: [
    'text-generation',
    'text-completion',
    'code-generation',
    'summarization',
    'translation',
    'reasoning',
  ],
  [AI_MODEL_TYPE.BERT]: [
    'text-embedding',
    'sentiment-analysis',
    'named-entity-recognition',
    'question-answering',
    'text-classification',
  ],
  [AI_MODEL_TYPE.T5]: [
    'text-generation',
    'translation',
    'summarization',
    'question-answering',
    'text-classification',
    'multi-task-learning',
  ],
  [AI_MODEL_TYPE.BLOOM]: [
    'text-generation',
    'translation',
    'summarization',
    'code-generation',
    'multilingual-processing',
  ],
  [AI_MODEL_TYPE.FALCON]: [
    'text-generation',
    'code-generation',
    'reasoning',
    'chat-completion',
    'summarization',
  ],
  [AI_MODEL_TYPE.MISTRAL]: [
    'text-generation',
    'code-generation',
    'reasoning',
    'chat-completion',
    'efficient-processing',
  ],
  [AI_MODEL_TYPE.GEMINI]: [
    'text-generation',
    'multimodal-understanding',
    'image-generation',
    'code-generation',
    'reasoning',
    'translation',
  ],
} as const;

/**
 * AI মডেল টাইপের সক্ষমতা টাইপ
 */
export type AIModelCapability =
  | 'text-generation'
  | 'text-completion'
  | 'text-embedding'
  | 'chat-completion'
  | 'code-generation'
  | 'reasoning'
  | 'analysis'
  | 'constitutional-ai'
  | 'sentiment-analysis'
  | 'named-entity-recognition'
  | 'question-answering'
  | 'text-classification'
  | 'translation'
  | 'summarization'
  | 'multilingual-processing'
  | 'multi-task-learning'
  | 'efficient-processing'
  | 'multimodal-understanding'
  | 'image-generation';

/**
 * AI মডেল টাইপ কনফিগারেশন
 */
export interface AIModelTypeConfig {
  type: AIModelType;
  description: string;
  capabilities: AIModelCapability[];
  isOpenSource: boolean;
  provider: string;
  releaseYear: number;
}

/**
 * AI মডেল টাইপ মেটাডেটা
 */
export const AI_MODEL_TYPE_METADATA: Record<AIModelType, AIModelTypeConfig> = {
  [AI_MODEL_TYPE.GPT]: {
    type: AI_MODEL_TYPE.GPT,
    description: AI_MODEL_TYPE_DESCRIPTION[AI_MODEL_TYPE.GPT],
    capabilities: AI_MODEL_TYPE_CAPABILITIES[AI_MODEL_TYPE.GPT] as AIModelCapability[],
    isOpenSource: false,
    provider: 'OpenAI',
    releaseYear: 2018,
  },
  [AI_MODEL_TYPE.CLAUDE]: {
    type: AI_MODEL_TYPE.CLAUDE,
    description: AI_MODEL_TYPE_DESCRIPTION[AI_MODEL_TYPE.CLAUDE],
    capabilities: AI_MODEL_TYPE_CAPABILITIES[AI_MODEL_TYPE.CLAUDE] as AIModelCapability[],
    isOpenSource: false,
    provider: 'Anthropic',
    releaseYear: 2021,
  },
  [AI_MODEL_TYPE.LLAMA]: {
    type: AI_MODEL_TYPE.LLAMA,
    description: AI_MODEL_TYPE_DESCRIPTION[AI_MODEL_TYPE.LLAMA],
    capabilities: AI_MODEL_TYPE_CAPABILITIES[AI_MODEL_TYPE.LLAMA] as AIModelCapability[],
    isOpenSource: true,
    provider: 'Meta',
    releaseYear: 2023,
  },
  [AI_MODEL_TYPE.BERT]: {
    type: AI_MODEL_TYPE.BERT,
    description: AI_MODEL_TYPE_DESCRIPTION[AI_MODEL_TYPE.BERT],
    capabilities: AI_MODEL_TYPE_CAPABILITIES[AI_MODEL_TYPE.BERT] as AIModelCapability[],
    isOpenSource: true,
    provider: 'Google',
    releaseYear: 2018,
  },
  [AI_MODEL_TYPE.T5]: {
    type: AI_MODEL_TYPE.T5,
    description: AI_MODEL_TYPE_DESCRIPTION[AI_MODEL_TYPE.T5],
    capabilities: AI_MODEL_TYPE_CAPABILITIES[AI_MODEL_TYPE.T5] as AIModelCapability[],
    isOpenSource: true,
    provider: 'Google',
    releaseYear: 2019,
  },
  [AI_MODEL_TYPE.BLOOM]: {
    type: AI_MODEL_TYPE.BLOOM,
    description: AI_MODEL_TYPE_DESCRIPTION[AI_MODEL_TYPE.BLOOM],
    capabilities: AI_MODEL_TYPE_CAPABILITIES[AI_MODEL_TYPE.BLOOM] as AIModelCapability[],
    isOpenSource: true,
    provider: 'BigScience',
    releaseYear: 2022,
  },
  [AI_MODEL_TYPE.FALCON]: {
    type: AI_MODEL_TYPE.FALCON,
    description: AI_MODEL_TYPE_DESCRIPTION[AI_MODEL_TYPE.FALCON],
    capabilities: AI_MODEL_TYPE_CAPABILITIES[AI_MODEL_TYPE.FALCON] as AIModelCapability[],
    isOpenSource: true,
    provider: 'TII',
    releaseYear: 2023,
  },
  [AI_MODEL_TYPE.MISTRAL]: {
    type: AI_MODEL_TYPE.MISTRAL,
    description: AI_MODEL_TYPE_DESCRIPTION[AI_MODEL_TYPE.MISTRAL],
    capabilities: AI_MODEL_TYPE_CAPABILITIES[AI_MODEL_TYPE.MISTRAL] as AIModelCapability[],
    isOpenSource: true,
    provider: 'Mistral AI',
    releaseYear: 2023,
  },
  [AI_MODEL_TYPE.GEMINI]: {
    type: AI_MODEL_TYPE.GEMINI,
    description: AI_MODEL_TYPE_DESCRIPTION[AI_MODEL_TYPE.GEMINI],
    capabilities: AI_MODEL_TYPE_CAPABILITIES[AI_MODEL_TYPE.GEMINI] as AIModelCapability[],
    isOpenSource: false,
    provider: 'Google',
    releaseYear: 2023,
  },
} as const;
