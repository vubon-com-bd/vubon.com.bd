/**
 * সার্চ সাজেশন (সাজেশন) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সাজেশন টাইপ
 */
export enum SuggestionType {
  TERM = 'term',
  PHRASE = 'phrase',
  COMPLETE = 'complete',
}

/**
 * সাজেশন টাইপ লেবেলসমূহ (বাংলায়)
 */
export const SUGGESTION_TYPE_LABELS: Record<SuggestionType, string> = {
  [SuggestionType.TERM]: 'শব্দ সাজেশন',
  [SuggestionType.PHRASE]: 'বাক্যাংশ সাজেশন',
  [SuggestionType.COMPLETE]: 'অটো-কমপ্লিট',
} as const;

/**
 * সাজেশন টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const SUGGESTION_TYPE_LABELS_EN: Record<SuggestionType, string> = {
  [SuggestionType.TERM]: 'Term Suggestion',
  [SuggestionType.PHRASE]: 'Phrase Suggestion',
  [SuggestionType.COMPLETE]: 'Auto-Complete',
} as const;

/**
 * সাজেশন টাইপ ব্যাখ্যা (বাংলায়)
 */
export const SUGGESTION_TYPE_DESCRIPTIONS: Record<SuggestionType, string> = {
  [SuggestionType.TERM]: 'পূর্ণ শব্দের সাজেশন প্রদান করে',
  [SuggestionType.PHRASE]: 'সম্পূর্ণ বাক্যাংশের সাজেশন প্রদান করে',
  [SuggestionType.COMPLETE]: 'টাইপ করার সাথে সাথে অটো-কমপ্লিট সাজেশন প্রদান করে',
} as const;

/**
 * ডিফল্ট সাজেশন সংখ্যা
 */
export const DEFAULT_SUGGESTION_COUNT = 10;

/**
 * সর্বোচ্চ সাজেশন সংখ্যা
 */
export const MAX_SUGGESTION_COUNT = 50;

/**
 * ন্যূনতম সাজেশন সংখ্যা
 */
export const MIN_SUGGESTION_COUNT = 1;

/**
 * সাজেশন ক্যাশের সময় (সেকেন্ডে)
 */
export const SUGGESTION_CACHE_TTL_SECONDS = 3600;

/**
 * সাজেশন স্কোর থ্রেশহোল্ড
 */
export const SUGGESTION_SCORE_THRESHOLD = 0.5;

/**
 * ন্যূনতম সাজেশন স্কোর
 */
export const MIN_SUGGESTION_SCORE = 0.1;

/**
 * সর্বোচ্চ সাজেশন স্কোর
 */
export const MAX_SUGGESTION_SCORE = 1.0;

/**
 * সাজেশন টাইপের ভ্যালু সমূহ
 */
export const SUGGESTION_TYPE_VALUES = Object.values(SuggestionType) as readonly SuggestionType[];

/**
 * ডিফল্ট সাজেশন টাইপ
 */
export const DEFAULT_SUGGESTION_TYPE = SuggestionType.TERM;

/**
 * সাজেশন কনফিগারেশন টাইপ
 */
export type SuggestionConfig = {
  type: SuggestionType;
  label: string;
  description: string;
  defaultCount: number;
  maxCount: number;
  cacheTTL: number;
  scoreThreshold: number;
  enabled: boolean;
};

/**
 * সাজেশন কনফিগারেশনসমূহ
 */
export const SUGGESTION_CONFIGS: Record<SuggestionType, SuggestionConfig> = {
  [SuggestionType.TERM]: {
    type: SuggestionType.TERM,
    label: SUGGESTION_TYPE_LABELS[SuggestionType.TERM],
    description: SUGGESTION_TYPE_DESCRIPTIONS[SuggestionType.TERM],
    defaultCount: DEFAULT_SUGGESTION_COUNT,
    maxCount: MAX_SUGGESTION_COUNT,
    cacheTTL: SUGGESTION_CACHE_TTL_SECONDS,
    scoreThreshold: SUGGESTION_SCORE_THRESHOLD,
    enabled: true,
  },
  [SuggestionType.PHRASE]: {
    type: SuggestionType.PHRASE,
    label: SUGGESTION_TYPE_LABELS[SuggestionType.PHRASE],
    description: SUGGESTION_TYPE_DESCRIPTIONS[SuggestionType.PHRASE],
    defaultCount: DEFAULT_SUGGESTION_COUNT,
    maxCount: MAX_SUGGESTION_COUNT,
    cacheTTL: SUGGESTION_CACHE_TTL_SECONDS,
    scoreThreshold: SUGGESTION_SCORE_THRESHOLD,
    enabled: true,
  },
  [SuggestionType.COMPLETE]: {
    type: SuggestionType.COMPLETE,
    label: SUGGESTION_TYPE_LABELS[SuggestionType.COMPLETE],
    description: SUGGESTION_TYPE_DESCRIPTIONS[SuggestionType.COMPLETE],
    defaultCount: DEFAULT_SUGGESTION_COUNT,
    maxCount: MAX_SUGGESTION_COUNT,
    cacheTTL: SUGGESTION_CACHE_TTL_SECONDS,
    scoreThreshold: SUGGESTION_SCORE_THRESHOLD,
    enabled: true,
  },
} as const;

/**
 * সাজেশন এরর মেসেজসমূহ
 */
export const SUGGESTION_ERROR_MESSAGES = {
  INVALID_TYPE: 'সাজেশন টাইপ সঠিক নয়',
  INVALID_COUNT: `সাজেশন সংখ্যা ${MIN_SUGGESTION_COUNT} থেকে ${MAX_SUGGESTION_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `সাজেশন সংখ্যা ${MIN_SUGGESTION_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `সাজেশন সংখ্যা ${MAX_SUGGESTION_COUNT} এর চেয়ে বেশি হতে পারে না`,
  INVALID_SCORE: 'সাজেশন স্কোর ০ থেকে ১ এর মধ্যে হতে হবে',
  SCORE_TOO_LOW: `সাজেশন স্কোর ${MIN_SUGGESTION_SCORE} এর চেয়ে কম হতে পারে না`,
  SCORE_TOO_HIGH: `সাজেশন স্কোর ${MAX_SUGGESTION_SCORE} এর চেয়ে বেশি হতে পারে না`,
  CACHE_EXPIRED: 'সাজেশন ক্যাশের মেয়াদ শেষ হয়েছে',
} as const;
