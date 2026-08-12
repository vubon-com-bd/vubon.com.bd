/**
 * AI মডেল প্রোভাইডার এনাম
 */
export const AI_MODEL_PROVIDER = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  COHERE: 'cohere',
  HUGGINGFACE: 'huggingface',
  GOOGLE: 'google',
  MISTRAL: 'mistral',
  REPLICATE: 'replicate',
  TOGETHER: 'together',
} as const;

/**
 * AI_MODEL_PROVIDER থেকে টাইপ
 */
export type AIModelProvider = (typeof AI_MODEL_PROVIDER)[keyof typeof AI_MODEL_PROVIDER];

/**
 * AI মডেল প্রোভাইডারের বেস URL
 */
export const AI_MODEL_PROVIDER_BASE_URL: Record<AIModelProvider, string> = {
  [AI_MODEL_PROVIDER.OPENAI]: 'https://api.openai.com/v1',
  [AI_MODEL_PROVIDER.ANTHROPIC]: 'https://api.anthropic.com/v1',
  [AI_MODEL_PROVIDER.COHERE]: 'https://api.cohere.ai/v1',
  [AI_MODEL_PROVIDER.HUGGINGFACE]: 'https://api-inference.huggingface.co',
  [AI_MODEL_PROVIDER.GOOGLE]: 'https://generativelanguage.googleapis.com/v1beta',
  [AI_MODEL_PROVIDER.MISTRAL]: 'https://api.mistral.ai/v1',
  [AI_MODEL_PROVIDER.REPLICATE]: 'https://api.replicate.com/v1',
  [AI_MODEL_PROVIDER.TOGETHER]: 'https://api.together.xyz/v1',
} as const;

/**
 * AI মডেল প্রোভাইডারের API ভার্সন
 */
export const AI_MODEL_PROVIDER_API_VERSION: Record<AIModelProvider, string> = {
  [AI_MODEL_PROVIDER.OPENAI]: '2024-02-15',
  [AI_MODEL_PROVIDER.ANTHROPIC]: '2023-06-01',
  [AI_MODEL_PROVIDER.COHERE]: '2022-12-06',
  [AI_MODEL_PROVIDER.HUGGINGFACE]: 'latest',
  [AI_MODEL_PROVIDER.GOOGLE]: 'v1beta',
  [AI_MODEL_PROVIDER.MISTRAL]: 'v1',
  [AI_MODEL_PROVIDER.REPLICATE]: 'v1',
  [AI_MODEL_PROVIDER.TOGETHER]: 'v1',
} as const;

/**
 * AI মডেল প্রোভাইডারের ডিফল্ট মডেল
 */
export const AI_MODEL_PROVIDER_DEFAULT_MODEL: Record<AIModelProvider, string> = {
  [AI_MODEL_PROVIDER.OPENAI]: 'gpt-4-turbo-preview',
  [AI_MODEL_PROVIDER.ANTHROPIC]: 'claude-3-opus-20240229',
  [AI_MODEL_PROVIDER.COHERE]: 'command-r-plus',
  [AI_MODEL_PROVIDER.HUGGINGFACE]: 'meta-llama/Llama-2-70b-chat-hf',
  [AI_MODEL_PROVIDER.GOOGLE]: 'gemini-1.5-pro',
  [AI_MODEL_PROVIDER.MISTRAL]: 'mistral-large-latest',
  [AI_MODEL_PROVIDER.REPLICATE]: 'meta/meta-llama-3-70b-instruct',
  [AI_MODEL_PROVIDER.TOGETHER]: 'meta-llama/Llama-3-70b-chat-hf',
} as const;

/**
 * AI মডেল প্রোভাইডারের নাম (মানব-পাঠযোগ্য)
 */
export const AI_MODEL_PROVIDER_NAMES: Record<AIModelProvider, string> = {
  [AI_MODEL_PROVIDER.OPENAI]: 'OpenAI',
  [AI_MODEL_PROVIDER.ANTHROPIC]: 'Anthropic',
  [AI_MODEL_PROVIDER.COHERE]: 'Cohere',
  [AI_MODEL_PROVIDER.HUGGINGFACE]: 'Hugging Face',
  [AI_MODEL_PROVIDER.GOOGLE]: 'Google',
  [AI_MODEL_PROVIDER.MISTRAL]: 'Mistral AI',
  [AI_MODEL_PROVIDER.REPLICATE]: 'Replicate',
  [AI_MODEL_PROVIDER.TOGETHER]: 'Together AI',
} as const;

/**
 * AI মডেল প্রোভাইডারের ওয়েবসাইট
 */
export const AI_MODEL_PROVIDER_WEBSITE: Record<AIModelProvider, string> = {
  [AI_MODEL_PROVIDER.OPENAI]: 'https://openai.com',
  [AI_MODEL_PROVIDER.ANTHROPIC]: 'https://anthropic.com',
  [AI_MODEL_PROVIDER.COHERE]: 'https://cohere.ai',
  [AI_MODEL_PROVIDER.HUGGINGFACE]: 'https://huggingface.co',
  [AI_MODEL_PROVIDER.GOOGLE]: 'https://ai.google.dev',
  [AI_MODEL_PROVIDER.MISTRAL]: 'https://mistral.ai',
  [AI_MODEL_PROVIDER.REPLICATE]: 'https://replicate.com',
  [AI_MODEL_PROVIDER.TOGETHER]: 'https://together.ai',
} as const;

/**
 * AI মডেল প্রোভাইডারের সাপোর্টেড ফিচারসমূহ
 */
export const AI_MODEL_PROVIDER_FEATURES: Record<AIModelProvider, string[]> = {
  [AI_MODEL_PROVIDER.OPENAI]: [
    'chat-completion',
    'text-generation',
    'code-generation',
    'embedding',
    'fine-tuning',
    'function-calling',
    'json-mode',
    'vision',
    'audio',
  ],
  [AI_MODEL_PROVIDER.ANTHROPIC]: [
    'chat-completion',
    'text-generation',
    'code-generation',
    'function-calling',
    'json-mode',
    'vision',
    'constitutional-ai',
  ],
  [AI_MODEL_PROVIDER.COHERE]: [
    'chat-completion',
    'text-generation',
    'embedding',
    'rerank',
    'classification',
    'summarization',
  ],
  [AI_MODEL_PROVIDER.HUGGINGFACE]: [
    'text-generation',
    'code-generation',
    'embedding',
    'fine-tuning',
    'text-classification',
    'translation',
    'summarization',
  ],
  [AI_MODEL_PROVIDER.GOOGLE]: [
    'chat-completion',
    'text-generation',
    'code-generation',
    'embedding',
    'vision',
    'multimodal',
    'function-calling',
    'json-mode',
  ],
  [AI_MODEL_PROVIDER.MISTRAL]: [
    'chat-completion',
    'text-generation',
    'code-generation',
    'embedding',
    'fine-tuning',
    'function-calling',
    'json-mode',
  ],
  [AI_MODEL_PROVIDER.REPLICATE]: [
    'text-generation',
    'code-generation',
    'image-generation',
    'embedding',
    'fine-tuning',
  ],
  [AI_MODEL_PROVIDER.TOGETHER]: [
    'chat-completion',
    'text-generation',
    'code-generation',
    'embedding',
    'fine-tuning',
    'function-calling',
    'json-mode',
  ],
} as const;

/**
 * AI মডেল প্রোভাইডারের কনফিগারেশন
 */
export interface AIModelProviderConfig {
  provider: AIModelProvider;
  name: string;
  baseUrl: string;
  apiVersion: string;
  defaultModel: string;
  website: string;
  features: string[];
  isOpenSource: boolean;
  pricingModel: 'pay-per-token' | 'subscription' | 'free' | 'pay-per-request';
}

/**
 * AI মডেল প্রোভাইডার মেটাডেটা
 */
export const AI_MODEL_PROVIDER_METADATA: Record<AIModelProvider, AIModelProviderConfig> = {
  [AI_MODEL_PROVIDER.OPENAI]: {
    provider: AI_MODEL_PROVIDER.OPENAI,
    name: AI_MODEL_PROVIDER_NAMES[AI_MODEL_PROVIDER.OPENAI],
    baseUrl: AI_MODEL_PROVIDER_BASE_URL[AI_MODEL_PROVIDER.OPENAI],
    apiVersion: AI_MODEL_PROVIDER_API_VERSION[AI_MODEL_PROVIDER.OPENAI],
    defaultModel: AI_MODEL_PROVIDER_DEFAULT_MODEL[AI_MODEL_PROVIDER.OPENAI],
    website: AI_MODEL_PROVIDER_WEBSITE[AI_MODEL_PROVIDER.OPENAI],
    features: AI_MODEL_PROVIDER_FEATURES[AI_MODEL_PROVIDER.OPENAI],
    isOpenSource: false,
    pricingModel: 'pay-per-token',
  },
  [AI_MODEL_PROVIDER.ANTHROPIC]: {
    provider: AI_MODEL_PROVIDER.ANTHROPIC,
    name: AI_MODEL_PROVIDER_NAMES[AI_MODEL_PROVIDER.ANTHROPIC],
    baseUrl: AI_MODEL_PROVIDER_BASE_URL[AI_MODEL_PROVIDER.ANTHROPIC],
    apiVersion: AI_MODEL_PROVIDER_API_VERSION[AI_MODEL_PROVIDER.ANTHROPIC],
    defaultModel: AI_MODEL_PROVIDER_DEFAULT_MODEL[AI_MODEL_PROVIDER.ANTHROPIC],
    website: AI_MODEL_PROVIDER_WEBSITE[AI_MODEL_PROVIDER.ANTHROPIC],
    features: AI_MODEL_PROVIDER_FEATURES[AI_MODEL_PROVIDER.ANTHROPIC],
    isOpenSource: false,
    pricingModel: 'pay-per-token',
  },
  [AI_MODEL_PROVIDER.COHERE]: {
    provider: AI_MODEL_PROVIDER.COHERE,
    name: AI_MODEL_PROVIDER_NAMES[AI_MODEL_PROVIDER.COHERE],
    baseUrl: AI_MODEL_PROVIDER_BASE_URL[AI_MODEL_PROVIDER.COHERE],
    apiVersion: AI_MODEL_PROVIDER_API_VERSION[AI_MODEL_PROVIDER.COHERE],
    defaultModel: AI_MODEL_PROVIDER_DEFAULT_MODEL[AI_MODEL_PROVIDER.COHERE],
    website: AI_MODEL_PROVIDER_WEBSITE[AI_MODEL_PROVIDER.COHERE],
    features: AI_MODEL_PROVIDER_FEATURES[AI_MODEL_PROVIDER.COHERE],
    isOpenSource: false,
    pricingModel: 'pay-per-request',
  },
  [AI_MODEL_PROVIDER.HUGGINGFACE]: {
    provider: AI_MODEL_PROVIDER.HUGGINGFACE,
    name: AI_MODEL_PROVIDER_NAMES[AI_MODEL_PROVIDER.HUGGINGFACE],
    baseUrl: AI_MODEL_PROVIDER_BASE_URL[AI_MODEL_PROVIDER.HUGGINGFACE],
    apiVersion: AI_MODEL_PROVIDER_API_VERSION[AI_MODEL_PROVIDER.HUGGINGFACE],
    defaultModel: AI_MODEL_PROVIDER_DEFAULT_MODEL[AI_MODEL_PROVIDER.HUGGINGFACE],
    website: AI_MODEL_PROVIDER_WEBSITE[AI_MODEL_PROVIDER.HUGGINGFACE],
    features: AI_MODEL_PROVIDER_FEATURES[AI_MODEL_PROVIDER.HUGGINGFACE],
    isOpenSource: true,
    pricingModel: 'free',
  },
  [AI_MODEL_PROVIDER.GOOGLE]: {
    provider: AI_MODEL_PROVIDER.GOOGLE,
    name: AI_MODEL_PROVIDER_NAMES[AI_MODEL_PROVIDER.GOOGLE],
    baseUrl: AI_MODEL_PROVIDER_BASE_URL[AI_MODEL_PROVIDER.GOOGLE],
    apiVersion: AI_MODEL_PROVIDER_API_VERSION[AI_MODEL_PROVIDER.GOOGLE],
    defaultModel: AI_MODEL_PROVIDER_DEFAULT_MODEL[AI_MODEL_PROVIDER.GOOGLE],
    website: AI_MODEL_PROVIDER_WEBSITE[AI_MODEL_PROVIDER.GOOGLE],
    features: AI_MODEL_PROVIDER_FEATURES[AI_MODEL_PROVIDER.GOOGLE],
    isOpenSource: false,
    pricingModel: 'pay-per-token',
  },
  [AI_MODEL_PROVIDER.MISTRAL]: {
    provider: AI_MODEL_PROVIDER.MISTRAL,
    name: AI_MODEL_PROVIDER_NAMES[AI_MODEL_PROVIDER.MISTRAL],
    baseUrl: AI_MODEL_PROVIDER_BASE_URL[AI_MODEL_PROVIDER.MISTRAL],
    apiVersion: AI_MODEL_PROVIDER_API_VERSION[AI_MODEL_PROVIDER.MISTRAL],
    defaultModel: AI_MODEL_PROVIDER_DEFAULT_MODEL[AI_MODEL_PROVIDER.MISTRAL],
    website: AI_MODEL_PROVIDER_WEBSITE[AI_MODEL_PROVIDER.MISTRAL],
    features: AI_MODEL_PROVIDER_FEATURES[AI_MODEL_PROVIDER.MISTRAL],
    isOpenSource: false,
    pricingModel: 'pay-per-token',
  },
  [AI_MODEL_PROVIDER.REPLICATE]: {
    provider: AI_MODEL_PROVIDER.REPLICATE,
    name: AI_MODEL_PROVIDER_NAMES[AI_MODEL_PROVIDER.REPLICATE],
    baseUrl: AI_MODEL_PROVIDER_BASE_URL[AI_MODEL_PROVIDER.REPLICATE],
    apiVersion: AI_MODEL_PROVIDER_API_VERSION[AI_MODEL_PROVIDER.REPLICATE],
    defaultModel: AI_MODEL_PROVIDER_DEFAULT_MODEL[AI_MODEL_PROVIDER.REPLICATE],
    website: AI_MODEL_PROVIDER_WEBSITE[AI_MODEL_PROVIDER.REPLICATE],
    features: AI_MODEL_PROVIDER_FEATURES[AI_MODEL_PROVIDER.REPLICATE],
    isOpenSource: false,
    pricingModel: 'pay-per-request',
  },
  [AI_MODEL_PROVIDER.TOGETHER]: {
    provider: AI_MODEL_PROVIDER.TOGETHER,
    name: AI_MODEL_PROVIDER_NAMES[AI_MODEL_PROVIDER.TOGETHER],
    baseUrl: AI_MODEL_PROVIDER_BASE_URL[AI_MODEL_PROVIDER.TOGETHER],
    apiVersion: AI_MODEL_PROVIDER_API_VERSION[AI_MODEL_PROVIDER.TOGETHER],
    defaultModel: AI_MODEL_PROVIDER_DEFAULT_MODEL[AI_MODEL_PROVIDER.TOGETHER],
    website: AI_MODEL_PROVIDER_WEBSITE[AI_MODEL_PROVIDER.TOGETHER],
    features: AI_MODEL_PROVIDER_FEATURES[AI_MODEL_PROVIDER.TOGETHER],
    isOpenSource: false,
    pricingModel: 'pay-per-token',
  },
} as const;

/**
 * সাপোর্টেড প্রোভাইডারের তালিকা (শুধু অ্যাক্টিভ)
 */
export const AI_MODEL_ACTIVE_PROVIDERS = [
  AI_MODEL_PROVIDER.OPENAI,
  AI_MODEL_PROVIDER.ANTHROPIC,
  AI_MODEL_PROVIDER.GOOGLE,
  AI_MODEL_PROVIDER.MISTRAL,
] as const;

/**
 * সাপোর্টেড প্রোভাইডারের তালিকা (কমিউনিটি)
 */
export const AI_MODEL_COMMUNITY_PROVIDERS = [
  AI_MODEL_PROVIDER.HUGGINGFACE,
  AI_MODEL_PROVIDER.REPLICATE,
  AI_MODEL_PROVIDER.TOGETHER,
] as const;

/**
 * সাপোর্টেড প্রোভাইডারের তালিকা (এন্টারপ্রাইজ)
 */
export const AI_MODEL_ENTERPRISE_PROVIDERS = [
  AI_MODEL_PROVIDER.OPENAI,
  AI_MODEL_PROVIDER.ANTHROPIC,
  AI_MODEL_PROVIDER.GOOGLE,
  AI_MODEL_PROVIDER.COHERE,
] as const;
