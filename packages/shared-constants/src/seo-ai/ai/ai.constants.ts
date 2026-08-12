/**
 * ডিফল্ট AI মডেল
 */
export const AI_DEFAULT_MODEL = 'gpt-4' as const;

/**
 * সর্বোচ্চ টোকেন সংখ্যা
 */
export const AI_MAX_TOKENS = 4096 as const;

/**
 * ডিফল্ট টেম্পারেচার (0.0 - 2.0)
 * উচ্চ মান = বেশি ক্রিয়েটিভ, নিম্ন মান = বেশি ডিটারমিনিস্টিক
 */
export const AI_TEMPERATURE = 0.7 as const;

/**
 * টপ-পি ভ্যালু (0.0 - 1.0)
 * নিউক্লিয়াস স্যাম্পলিং এর জন্য
 */
export const AI_TOP_P = 0.9 as const;

/**
 * ফ্রিকোয়েন্সি পেনাল্টি (-2.0 - 2.0)
 * একই টোকেন পুনরাবৃত্তি কমানোর জন্য
 */
export const AI_FREQUENCY_PENALTY = 0.5 as const;

/**
 * প্রেজেন্স পেনাল্টি (-2.0 - 2.0)
 * নতুন টপিক প্রবর্তন উৎসাহিত করার জন্য
 */
export const AI_PRESENCE_PENALTY = 0.5 as const;

/**
 * ডিফল্ট টাইমআউট (মিলিসেকেন্ড)
 */
export const AI_DEFAULT_TIMEOUT = 30000 as const; // 30 সেকেন্ড

/**
 * সর্বোচ্চ রিট্রাই সংখ্যা
 */
export const AI_MAX_RETRIES = 3 as const;

/**
 * ব্যাচ সাইজ
 */
export const AI_BATCH_SIZE = 10 as const;

/**
 * AI কনফিগারেশন অবজেক্ট
 */
export const AI_DEFAULT_CONFIG = {
  model: AI_DEFAULT_MODEL,
  maxTokens: AI_MAX_TOKENS,
  temperature: AI_TEMPERATURE,
  topP: AI_TOP_P,
  frequencyPenalty: AI_FREQUENCY_PENALTY,
  presencePenalty: AI_PRESENCE_PENALTY,
  timeout: AI_DEFAULT_TIMEOUT,
  maxRetries: AI_MAX_RETRIES,
  batchSize: AI_BATCH_SIZE,
} as const;

/**
 * AI কনফিগারেশন টাইপ
 */
export type AIConfig = typeof AI_DEFAULT_CONFIG;

/**
 * AI মডেল টাইপ
 */
export type AIModel = typeof AI_DEFAULT_MODEL;

/**
 * AI প্যারামিটার টাইপ
 */
export interface AIParameters {
  model?: AIModel;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  timeout?: number;
  maxRetries?: number;
  batchSize?: number;
}
