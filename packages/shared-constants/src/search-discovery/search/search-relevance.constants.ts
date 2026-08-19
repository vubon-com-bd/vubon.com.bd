/**
 * সার্চ রিলেভেন্স (প্রাসঙ্গিকতা) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * রিলেভেন্স স্কোর থ্রেশহোল্ড
 */
export enum RelevanceThreshold {
  HIGH = 0.8,
  MEDIUM = 0.5,
  LOW = 0.3,
}

/**
 * রিলেভেন্স ফ্যাক্টরসমূহ
 */
export enum RelevanceFactor {
  TERM_FREQUENCY = 'term_frequency',
  INVERSE_DOCUMENT_FREQUENCY = 'inverse_document_frequency',
  FIELD_LENGTH = 'field_length',
}

/**
 * রিলেভেন্স ক্যালকুলেশন মেথড
 */
export enum RelevanceMethod {
  BM25 = 'BM25',
  TF_IDF = 'TF-IDF',
}

/**
 * রিলেভেন্স থ্রেশহোল্ড লেবেলসমূহ (বাংলায়)
 */
export const RELEVANCE_THRESHOLD_LABELS: Record<RelevanceThreshold, string> = {
  [RelevanceThreshold.HIGH]: 'উচ্চ',
  [RelevanceThreshold.MEDIUM]: 'মধ্যম',
  [RelevanceThreshold.LOW]: 'নিম্ন',
} as const;

/**
 * রিলেভেন্স থ্রেশহোল্ড লেবেলসমূহ (ইংরেজিতে)
 */
export const RELEVANCE_THRESHOLD_LABELS_EN: Record<RelevanceThreshold, string> = {
  [RelevanceThreshold.HIGH]: 'High',
  [RelevanceThreshold.MEDIUM]: 'Medium',
  [RelevanceThreshold.LOW]: 'Low',
} as const;

/**
 * রিলেভেন্স ফ্যাক্টর লেবেলসমূহ (বাংলায়)
 */
export const RELEVANCE_FACTOR_LABELS: Record<RelevanceFactor, string> = {
  [RelevanceFactor.TERM_FREQUENCY]: 'টার্ম ফ্রিকোয়েন্সি',
  [RelevanceFactor.INVERSE_DOCUMENT_FREQUENCY]: 'ইনভার্স ডকুমেন্ট ফ্রিকোয়েন্সি',
  [RelevanceFactor.FIELD_LENGTH]: 'ফিল্ড লেংথ',
} as const;

/**
 * রিলেভেন্স ফ্যাক্টর লেবেলসমূহ (ইংরেজিতে)
 */
export const RELEVANCE_FACTOR_LABELS_EN: Record<RelevanceFactor, string> = {
  [RelevanceFactor.TERM_FREQUENCY]: 'Term Frequency',
  [RelevanceFactor.INVERSE_DOCUMENT_FREQUENCY]: 'Inverse Document Frequency',
  [RelevanceFactor.FIELD_LENGTH]: 'Field Length',
} as const;

/**
 * রিলেভেন্স মেথড লেবেলসমূহ (বাংলায়)
 */
export const RELEVANCE_METHOD_LABELS: Record<RelevanceMethod, string> = {
  [RelevanceMethod.BM25]: 'BM25',
  [RelevanceMethod.TF_IDF]: 'TF-IDF',
} as const;

/**
 * রিলেভেন্স মেথড লেবেলসমূহ (ইংরেজিতে)
 */
export const RELEVANCE_METHOD_LABELS_EN: Record<RelevanceMethod, string> = {
  [RelevanceMethod.BM25]: 'BM25',
  [RelevanceMethod.TF_IDF]: 'TF-IDF',
} as const;

/**
 * ডিফল্ট BM25 প্যারামিটার
 */
export const DEFAULT_BM25_PARAMS = {
  k1: 1.2,
  b: 0.75,
} as const;

/**
 * ডিফল্ট TF-IDF প্যারামিটার
 */
export const DEFAULT_TF_IDF_PARAMS = {
  smooth: true,
  normalize: true,
} as const;

/**
 * রিলেভেন্স স্কোর রেঞ্জ
 */
export const RELEVANCE_SCORE_RANGE = {
  MIN: 0.0,
  MAX: 1.0,
} as const;

/**
 * রিলেভেন্স ফ্যাক্টরের ভ্যালু সমূহ
 */
export const RELEVANCE_FACTOR_VALUES = Object.values(RelevanceFactor) as readonly RelevanceFactor[];

/**
 * রিলেভেন্স মেথডের ভ্যালু সমূহ
 */
export const RELEVANCE_METHOD_VALUES = Object.values(RelevanceMethod) as readonly RelevanceMethod[];

/**
 * রিলেভেন্স থ্রেশহোল্ডের ভ্যালু সমূহ
 */
export const RELEVANCE_THRESHOLD_VALUES = Object.values(
  RelevanceThreshold
) as readonly RelevanceThreshold[];

/**
 * ডিফল্ট রিলেভেন্স থ্রেশহোল্ড
 */
export const DEFAULT_RELEVANCE_THRESHOLD = RelevanceThreshold.MEDIUM;

/**
 * ডিফল্ট রিলেভেন্স মেথড
 */
export const DEFAULT_RELEVANCE_METHOD = RelevanceMethod.BM25;

/**
 * রিলেভেন্স কনফিগারেশন টাইপ
 */
export type RelevanceConfig = {
  threshold: RelevanceThreshold;
  method: RelevanceMethod;
  factors: RelevanceFactor[];
  bm25Params: typeof DEFAULT_BM25_PARAMS;
  tfIdfParams: typeof DEFAULT_TF_IDF_PARAMS;
  scoreRange: typeof RELEVANCE_SCORE_RANGE;
};

/**
 * ডিফল্ট রিলেভেন্স কনফিগারেশন
 */
export const DEFAULT_RELEVANCE_CONFIG: RelevanceConfig = {
  threshold: DEFAULT_RELEVANCE_THRESHOLD,
  method: DEFAULT_RELEVANCE_METHOD,
  factors: [
    RelevanceFactor.TERM_FREQUENCY,
    RelevanceFactor.INVERSE_DOCUMENT_FREQUENCY,
    RelevanceFactor.FIELD_LENGTH,
  ],
  bm25Params: DEFAULT_BM25_PARAMS,
  tfIdfParams: DEFAULT_TF_IDF_PARAMS,
  scoreRange: RELEVANCE_SCORE_RANGE,
} as const;

/**
 * রিলেভেন্স এরর মেসেজসমূহ
 */
export const RELEVANCE_ERROR_MESSAGES = {
  INVALID_THRESHOLD: 'রিলেভেন্স থ্রেশহোল্ড সঠিক নয়',
  INVALID_METHOD: 'রিলেভেন্স মেথড সঠিক নয়',
  INVALID_FACTOR: 'রিলেভেন্স ফ্যাক্টর সঠিক নয়',
  SCORE_OUT_OF_RANGE: `রিলেভেন্স স্কোর ${RELEVANCE_SCORE_RANGE.MIN} থেকে ${RELEVANCE_SCORE_RANGE.MAX} এর মধ্যে হতে হবে`,
  INVALID_BM25_PARAMS: 'BM25 প্যারামিটার সঠিক নয়',
  INVALID_TF_IDF_PARAMS: 'TF-IDF প্যারামিটার সঠিক নয়',
} as const;
