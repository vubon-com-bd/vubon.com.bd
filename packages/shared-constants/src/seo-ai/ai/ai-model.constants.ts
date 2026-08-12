/**
 * AI মডেলের ডিফল্ট কনফিগারেশন
 */
export const AI_MODEL_DEFAULT_CONFIG = {
  temperature: 0.7,
  maxTokens: 4096,
  topP: 0.9,
  frequencyPenalty: 0.5,
  presencePenalty: 0.5,
  timeout: 30000,
  maxRetries: 3,
} as const;

/**
 * সাপোর্টেড AI মডেল টাইপের তালিকা
 */
export const AI_MODEL_SUPPORTED_TYPES = [
  'gpt-4',
  'gpt-4-turbo',
  'gpt-3.5-turbo',
  'claude-3-opus',
  'claude-3-sonnet',
  'claude-3-haiku',
  'gemini-pro',
  'gemini-ultra',
  'llama-2-70b',
  'llama-3-70b',
  'mistral-large',
  'mistral-medium',
  'mixtral-8x7b',
] as const;

/**
 * AI_MODEL_SUPPORTED_TYPES থেকে টাইপ
 */
export type SupportedAIModelType = (typeof AI_MODEL_SUPPORTED_TYPES)[number];

/**
 * মডেল নামের সর্বোচ্চ দৈর্ঘ্য (100 ক্যারেক্টার)
 */
export const AI_MODEL_MAX_NAME_LENGTH = 100 as const;

/**
 * মডেল বিবরণের সর্বোচ্চ দৈর্ঘ্য (500 ক্যারেক্টার)
 */
export const AI_MODEL_MAX_DESCRIPTION_LENGTH = 500 as const;

/**
 * মডেল ভার্সন ফরম্যাট (semver)
 */
export const AI_MODEL_VERSION_FORMAT = 'semver' as const;

/**
 * ডিফল্ট পেজিনেশন সাইজ (20)
 */
export const AI_MODEL_PAGINATION_DEFAULT = 20 as const;

/**
 * AI মডেল কনফিগারেশন টাইপ
 */
export interface AIModelConfig {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  timeout: number;
  maxRetries: number;
}

/**
 * AI মডেল ইন্টারফেস
 */
export interface AIModel {
  id: string;
  name: string;
  description?: string;
  type: SupportedAIModelType;
  version: string;
  config: AIModelConfig;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * AI মডেল তৈরি করার জন্য ইনপুট টাইপ
 */
export interface CreateAIModelInput {
  name: string;
  description?: string;
  type: SupportedAIModelType;
  version: string;
  config?: Partial<AIModelConfig>;
  isActive?: boolean;
}

/**
 * AI মডেল আপডেট করার জন্য ইনপুট টাইপ
 */
export interface UpdateAIModelInput {
  name?: string;
  description?: string;
  type?: SupportedAIModelType;
  version?: string;
  config?: Partial<AIModelConfig>;
  isActive?: boolean;
}

/**
 * AI মডেল ফিল্টার টাইপ
 */
export interface AIModelFilter {
  type?: SupportedAIModelType;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * AI মডেল পেজিনেশন রেসপন্স টাইপ
 */
export interface AIModelPaginationResponse<T = AIModel> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
