/**
 * সার্চ স্টপওয়ার্ড (অর্থহীন শব্দ) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * বাংলা স্টপওয়ার্ডের তালিকা
 */
export const BENGALI_STOPWORDS = [
  'আমি',
  'তুমি',
  'সে',
  'এটি',
  'ও',
  'এবং',
  'কি',
  'যে',
  'এই',
  'তা',
  'তারা',
  'আমরা',
  'তোমরা',
  'আপনি',
  'তিনি',
  'কারণ',
  'কিন্তু',
  'যদি',
  'তাহলে',
  'অথবা',
  'থেকে',
  'পর্যন্ত',
  'সাথে',
  'মধ্যে',
  'পরে',
  'আগে',
  'উপর',
  'নিচে',
  'ভিতরে',
  'বাইরে',
  'সম্পর্কে',
  'জন্য',
  'বিনা',
  'সহ',
  'হিসাবে',
  'মতো',
  'চেয়ে',
  'তুলনায়',
] as const;

/**
 * ইংরেজি স্টপওয়ার্ডের তালিকা
 */
export const ENGLISH_STOPWORDS = [
  'a',
  'an',
  'the',
  'and',
  'or',
  'but',
  'for',
  'nor',
  'on',
  'at',
  'to',
  'by',
  'with',
  'without',
  'about',
  'against',
  'between',
  'through',
  'during',
  'within',
  'upon',
  'towards',
  'upon',
  'etc',
  'i',
  'you',
  'he',
  'she',
  'it',
  'we',
  'they',
  'me',
  'him',
  'her',
  'us',
  'them',
  'my',
  'your',
  'his',
  'her',
  'our',
  'their',
  'this',
  'that',
  'these',
  'those',
  'some',
  'any',
  'many',
  'much',
  'more',
  'most',
  'other',
  'such',
  'no',
  'nor',
  'not',
  'only',
  'own',
  'same',
  'so',
  'than',
  'too',
  'very',
] as const;

/**
 * স্টপওয়ার্ড ভাষা
 */
export enum StopwordLanguage {
  BENGALI = 'bengali',
  ENGLISH = 'english',
  BOTH = 'both',
}

/**
 * স্টপওয়ার্ড ভাষা লেবেলসমূহ (বাংলায়)
 */
export const STOPWORD_LANGUAGE_LABELS: Record<StopwordLanguage, string> = {
  [StopwordLanguage.BENGALI]: 'বাংলা',
  [StopwordLanguage.ENGLISH]: 'ইংরেজি',
  [StopwordLanguage.BOTH]: 'উভয়',
} as const;

/**
 * স্টপওয়ার্ড ভাষা লেবেলসমূহ (ইংরেজিতে)
 */
export const STOPWORD_LANGUAGE_LABELS_EN: Record<StopwordLanguage, string> = {
  [StopwordLanguage.BENGALI]: 'Bengali',
  [StopwordLanguage.ENGLISH]: 'English',
  [StopwordLanguage.BOTH]: 'Both',
} as const;

/**
 * স্টপওয়ার্ড ভাষার ভ্যালু সমূহ
 */
export const STOPWORD_LANGUAGE_VALUES = Object.values(
  StopwordLanguage
) as readonly StopwordLanguage[];

/**
 * ডিফল্ট স্টপওয়ার্ড ভাষা
 */
export const DEFAULT_STOPWORD_LANGUAGE = StopwordLanguage.BOTH;

/**
 * স্টপওয়ার্ড ফাইল পাথ
 */
export const STOPWORD_FILE_PATH = 'data/stopwords.txt';

/**
 * বাংলা স্টপওয়ার্ড ফাইল পাথ
 */
export const BENGALI_STOPWORD_FILE_PATH = 'data/stopwords_bn.txt';

/**
 * ইংরেজি স্টপওয়ার্ড ফাইল পাথ
 */
export const ENGLISH_STOPWORD_FILE_PATH = 'data/stopwords_en.txt';

/**
 * স্টপওয়ার্ড ক্যাশের সময় (সেকেন্ডে)
 */
export const STOPWORD_CACHE_TTL_SECONDS = 86400; // 24 hours

/**
 * স্টপওয়ার্ড কনফিগারেশন টাইপ
 */
export type StopwordConfig = {
  language: StopwordLanguage;
  label: string;
  words: readonly string[];
  filePath: string;
  cacheTTL: number;
  enabled: boolean;
};

/**
 * স্টপওয়ার্ড কনফিগারেশনসমূহ
 */
export const STOPWORD_CONFIGS: Record<StopwordLanguage, StopwordConfig> = {
  [StopwordLanguage.BENGALI]: {
    language: StopwordLanguage.BENGALI,
    label: STOPWORD_LANGUAGE_LABELS[StopwordLanguage.BENGALI],
    words: BENGALI_STOPWORDS,
    filePath: BENGALI_STOPWORD_FILE_PATH,
    cacheTTL: STOPWORD_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [StopwordLanguage.ENGLISH]: {
    language: StopwordLanguage.ENGLISH,
    label: STOPWORD_LANGUAGE_LABELS[StopwordLanguage.ENGLISH],
    words: ENGLISH_STOPWORDS,
    filePath: ENGLISH_STOPWORD_FILE_PATH,
    cacheTTL: STOPWORD_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [StopwordLanguage.BOTH]: {
    language: StopwordLanguage.BOTH,
    label: STOPWORD_LANGUAGE_LABELS[StopwordLanguage.BOTH],
    words: [...BENGALI_STOPWORDS, ...ENGLISH_STOPWORDS] as const,
    filePath: STOPWORD_FILE_PATH,
    cacheTTL: STOPWORD_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * স্টপওয়ার্ড ডেটা টাইপ
 */
export type StopwordData = {
  id: string;
  word: string;
  language: StopwordLanguage;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * স্টপওয়ার্ড গ্রুপ টাইপ
 */
export type StopwordGroup = {
  language: StopwordLanguage;
  words: string[];
  count: number;
  totalWords: number;
};

/**
 * স্টপওয়ার্ড এরর মেসেজসমূহ
 */
export const STOPWORD_ERROR_MESSAGES = {
  INVALID_LANGUAGE: 'স্টপওয়ার্ড ভাষা সঠিক নয়',
  INVALID_WORD: 'স্টপওয়ার্ড শব্দ সঠিক নয়',
  DUPLICATE_ENTRY: 'ডুপ্লিকেট স্টপওয়ার্ড এন্ট্রি',
  FILE_NOT_FOUND: `স্টপওয়ার্ড ফাইল পাওয়া যায়নি: ${STOPWORD_FILE_PATH}`,
  CACHE_EXPIRED: 'স্টপওয়ার্ড ক্যাশের মেয়াদ শেষ হয়েছে',
  WORD_TOO_LONG: 'স্টপওয়ার্ড শব্দ খুব বড়',
  EMPTY_WORD: 'স্টপওয়ার্ড শব্দ খালি হতে পারে না',
} as const;
