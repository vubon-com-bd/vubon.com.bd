/**
 * সার্চ সিনোনিম (সমার্থক শব্দ) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সিনোনিম টাইপ
 */
export enum SynonymType {
  EXPLICIT = 'explicit',
  EQUIVALENT = 'equivalent',
  ALIAS = 'alias',
}

/**
 * সিনোনিম টাইপ লেবেলসমূহ (বাংলায়)
 */
export const SYNONYM_TYPE_LABELS: Record<SynonymType, string> = {
  [SynonymType.EXPLICIT]: 'স্পষ্ট সিনোনিম',
  [SynonymType.EQUIVALENT]: 'সমতুল্য সিনোনিম',
  [SynonymType.ALIAS]: 'ডাকনাম',
} as const;

/**
 * সিনোনিম টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const SYNONYM_TYPE_LABELS_EN: Record<SynonymType, string> = {
  [SynonymType.EXPLICIT]: 'Explicit Synonym',
  [SynonymType.EQUIVALENT]: 'Equivalent Synonym',
  [SynonymType.ALIAS]: 'Alias',
} as const;

/**
 * সিনোনিম টাইপ ব্যাখ্যা (বাংলায়)
 */
export const SYNONYM_TYPE_DESCRIPTIONS: Record<SynonymType, string> = {
  [SynonymType.EXPLICIT]: 'শব্দের সঠিক সমার্থক শব্দ',
  [SynonymType.EQUIVALENT]: 'একই অর্থবোধক শব্দ',
  [SynonymType.ALIAS]: 'শব্দের বিকল্প নাম',
} as const;

/**
 * সিনোনিম ফরম্যাট: word1, word2 => word3
 */
export const SYNONYM_FORMAT = 'word1, word2 => word3';

/**
 * সিনোনিম ফরম্যাটের উদাহরণ
 */
export const SYNONYM_FORMAT_EXAMPLE = 'mobile, phone => smartphone';

/**
 * ডিফল্ট সিনোনিম ফাইল পাথ
 */
export const DEFAULT_SYNONYM_FILE_PATH = 'data/synonyms.txt';

/**
 * ম্যাক্সিমাম সিনোনিম সেট সাইজ
 */
export const MAX_SYNONYM_SET_SIZE = 100;

/**
 * ন্যূনতম সিনোনিম সেট সাইজ
 */
export const MIN_SYNONYM_SET_SIZE = 1;

/**
 * সিনোনিম ক্যাশের সময় (সেকেন্ডে)
 */
export const SYNONYM_CACHE_TTL_SECONDS = 86400; // 24 hours

/**
 * সিনোনিম টাইপের ভ্যালু সমূহ
 */
export const SYNONYM_TYPE_VALUES = Object.values(SynonymType) as readonly SynonymType[];

/**
 * ডিফল্ট সিনোনিম টাইপ
 */
export const DEFAULT_SYNONYM_TYPE = SynonymType.EXPLICIT;

/**
 * সিনোনিম কনফিগারেশন টাইপ
 */
export type SynonymConfig = {
  type: SynonymType;
  label: string;
  description: string;
  format: string;
  defaultFilePath: string;
  maxSetSize: number;
  cacheTTL: number;
  enabled: boolean;
};

/**
 * সিনোনিম কনফিগারেশনসমূহ
 */
export const SYNONYM_CONFIGS: Record<SynonymType, SynonymConfig> = {
  [SynonymType.EXPLICIT]: {
    type: SynonymType.EXPLICIT,
    label: SYNONYM_TYPE_LABELS[SynonymType.EXPLICIT],
    description: SYNONYM_TYPE_DESCRIPTIONS[SynonymType.EXPLICIT],
    format: SYNONYM_FORMAT,
    defaultFilePath: DEFAULT_SYNONYM_FILE_PATH,
    maxSetSize: MAX_SYNONYM_SET_SIZE,
    cacheTTL: SYNONYM_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [SynonymType.EQUIVALENT]: {
    type: SynonymType.EQUIVALENT,
    label: SYNONYM_TYPE_LABELS[SynonymType.EQUIVALENT],
    description: SYNONYM_TYPE_DESCRIPTIONS[SynonymType.EQUIVALENT],
    format: SYNONYM_FORMAT,
    defaultFilePath: DEFAULT_SYNONYM_FILE_PATH,
    maxSetSize: MAX_SYNONYM_SET_SIZE,
    cacheTTL: SYNONYM_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [SynonymType.ALIAS]: {
    type: SynonymType.ALIAS,
    label: SYNONYM_TYPE_LABELS[SynonymType.ALIAS],
    description: SYNONYM_TYPE_DESCRIPTIONS[SynonymType.ALIAS],
    format: SYNONYM_FORMAT,
    defaultFilePath: DEFAULT_SYNONYM_FILE_PATH,
    maxSetSize: MAX_SYNONYM_SET_SIZE,
    cacheTTL: SYNONYM_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * সিনোনিম ডেটা টাইপ
 */
export type SynonymData = {
  id: string;
  type: SynonymType;
  words: string[];
  target: string;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
};

/**
 * সিনোনিম গ্রুপ টাইপ
 */
export type SynonymGroup = {
  id: string;
  synonyms: SynonymData[];
  source: string;
  target: string;
  count: number;
};

/**
 * সিনোনিম এরর মেসেজসমূহ
 */
export const SYNONYM_ERROR_MESSAGES = {
  INVALID_TYPE: 'সিনোনিম টাইপ সঠিক নয়',
  INVALID_FORMAT: `সিনোনিম ফরম্যাট সঠিক নয়। ফরম্যাট: ${SYNONYM_FORMAT}`,
  SET_TOO_LARGE: `সিনোনিম সেট সাইজ ${MAX_SYNONYM_SET_SIZE} এর বেশি হতে পারে না`,
  SET_TOO_SMALL: `সিনোনিম সেট সাইজ ${MIN_SYNONYM_SET_SIZE} এর কম হতে পারে না`,
  INVALID_WORDS: 'সিনোনিম শব্দগুলো সঠিক নয়',
  INVALID_TARGET: 'টার্গেট শব্দ সঠিক নয়',
  DUPLICATE_ENTRY: 'ডুপ্লিকেট সিনোনিম এন্ট্রি',
  FILE_NOT_FOUND: `সিনোনিম ফাইল পাওয়া যায়নি: ${DEFAULT_SYNONYM_FILE_PATH}`,
  CACHE_EXPIRED: 'সিনোনিম ক্যাশের মেয়াদ শেষ হয়েছে',
} as const;
