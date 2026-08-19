/**
 * অটোকমপ্লিট সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * অটোকমপ্লিট টাইপ
 */
export enum AutocompleteType {
  SIMPLE = 'simple',
  FUZZY = 'fuzzy',
  CONTEXTUAL = 'contextual',
}

/**
 * অটোকমপ্লিট টাইপ লেবেলসমূহ (বাংলায়)
 */
export const AUTOCOMPLETE_TYPE_LABELS: Record<AutocompleteType, string> = {
  [AutocompleteType.SIMPLE]: 'সরল',
  [AutocompleteType.FUZZY]: 'আনুমানিক',
  [AutocompleteType.CONTEXTUAL]: 'প্রাসঙ্গিক',
} as const;

/**
 * অটোকমপ্লিট টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const AUTOCOMPLETE_TYPE_LABELS_EN: Record<AutocompleteType, string> = {
  [AutocompleteType.SIMPLE]: 'Simple',
  [AutocompleteType.FUZZY]: 'Fuzzy',
  [AutocompleteType.CONTEXTUAL]: 'Contextual',
} as const;

/**
 * অটোকমপ্লিট টাইপ ব্যাখ্যা (বাংলায়)
 */
export const AUTOCOMPLETE_TYPE_DESCRIPTIONS: Record<AutocompleteType, string> = {
  [AutocompleteType.SIMPLE]: 'সাধারণ অটোকমপ্লিট সাজেশন',
  [AutocompleteType.FUZZY]: 'আনুমানিক মিল সহ অটোকমপ্লিট',
  [AutocompleteType.CONTEXTUAL]: 'প্রসঙ্গ অনুযায়ী অটোকমপ্লিট',
} as const;

/**
 * ডিফল্ট অটোকমপ্লিট সংখ্যা
 */
export const DEFAULT_AUTOCOMPLETE_COUNT = 5;

/**
 * সর্বোচ্চ অটোকমপ্লিট সংখ্যা
 */
export const MAX_AUTOCOMPLETE_COUNT = 20;

/**
 * ন্যূনতম অটোকমপ্লিট সংখ্যা
 */
export const MIN_AUTOCOMPLETE_COUNT = 1;

/**
 * অটোকমপ্লিট মিনিমাম ক্যারেক্টার
 */
export const AUTOCOMPLETE_MIN_CHARACTERS = 2;

/**
 * সর্বোচ্চ অটোকমপ্লিট ক্যারেক্টার
 */
export const AUTOCOMPLETE_MAX_CHARACTERS = 50;

/**
 * অটোকমপ্লিট ক্যাশের সময় (সেকেন্ডে)
 */
export const AUTOCOMPLETE_CACHE_TTL_SECONDS = 1800; // 30 minutes

/**
 * অটোকমপ্লিট টাইপের ভ্যালু সমূহ
 */
export const AUTOCOMPLETE_TYPE_VALUES = Object.values(
  AutocompleteType
) as readonly AutocompleteType[];

/**
 * ডিফল্ট অটোকমপ্লিট টাইপ
 */
export const DEFAULT_AUTOCOMPLETE_TYPE = AutocompleteType.SIMPLE;

/**
 * অটোকমপ্লিট কনফিগারেশন টাইপ
 */
export type AutocompleteConfig = {
  type: AutocompleteType;
  label: string;
  description: string;
  defaultCount: number;
  maxCount: number;
  minCharacters: number;
  maxCharacters: number;
  cacheTTL: number;
  enabled: boolean;
};

/**
 * অটোকমপ্লিট কনফিগারেশনসমূহ
 */
export const AUTOCOMPLETE_CONFIGS: Record<AutocompleteType, AutocompleteConfig> = {
  [AutocompleteType.SIMPLE]: {
    type: AutocompleteType.SIMPLE,
    label: AUTOCOMPLETE_TYPE_LABELS[AutocompleteType.SIMPLE],
    description: AUTOCOMPLETE_TYPE_DESCRIPTIONS[AutocompleteType.SIMPLE],
    defaultCount: DEFAULT_AUTOCOMPLETE_COUNT,
    maxCount: MAX_AUTOCOMPLETE_COUNT,
    minCharacters: AUTOCOMPLETE_MIN_CHARACTERS,
    maxCharacters: AUTOCOMPLETE_MAX_CHARACTERS,
    cacheTTL: AUTOCOMPLETE_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [AutocompleteType.FUZZY]: {
    type: AutocompleteType.FUZZY,
    label: AUTOCOMPLETE_TYPE_LABELS[AutocompleteType.FUZZY],
    description: AUTOCOMPLETE_TYPE_DESCRIPTIONS[AutocompleteType.FUZZY],
    defaultCount: DEFAULT_AUTOCOMPLETE_COUNT,
    maxCount: MAX_AUTOCOMPLETE_COUNT,
    minCharacters: AUTOCOMPLETE_MIN_CHARACTERS,
    maxCharacters: AUTOCOMPLETE_MAX_CHARACTERS,
    cacheTTL: AUTOCOMPLETE_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [AutocompleteType.CONTEXTUAL]: {
    type: AutocompleteType.CONTEXTUAL,
    label: AUTOCOMPLETE_TYPE_LABELS[AutocompleteType.CONTEXTUAL],
    description: AUTOCOMPLETE_TYPE_DESCRIPTIONS[AutocompleteType.CONTEXTUAL],
    defaultCount: DEFAULT_AUTOCOMPLETE_COUNT,
    maxCount: MAX_AUTOCOMPLETE_COUNT,
    minCharacters: AUTOCOMPLETE_MIN_CHARACTERS,
    maxCharacters: AUTOCOMPLETE_MAX_CHARACTERS,
    cacheTTL: AUTOCOMPLETE_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * অটোকমপ্লিট ডেটা টাইপ
 */
export type AutocompleteData = {
  id: string;
  text: string;
  type: AutocompleteType;
  score: number;
  context?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * অটোকমপ্লিট রেসপন্স টাইপ
 */
export type AutocompleteResponse = {
  suggestions: AutocompleteData[];
  total: number;
  took: number;
  type: AutocompleteType;
};

/**
 * অটোকমপ্লিট এরর মেসেজসমূহ
 */
export const AUTOCOMPLETE_ERROR_MESSAGES = {
  INVALID_TYPE: 'অটোকমপ্লিট টাইপ সঠিক নয়',
  INVALID_COUNT: `অটোকমপ্লিট সংখ্যা ${MIN_AUTOCOMPLETE_COUNT} থেকে ${MAX_AUTOCOMPLETE_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `অটোকমপ্লিট সংখ্যা ${MIN_AUTOCOMPLETE_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `অটোকমপ্লিট সংখ্যা ${MAX_AUTOCOMPLETE_COUNT} এর চেয়ে বেশি হতে পারে না`,
  INVALID_CHARACTERS: `অটোকমপ্লিট ক্যারেক্টার ${AUTOCOMPLETE_MIN_CHARACTERS} থেকে ${AUTOCOMPLETE_MAX_CHARACTERS} এর মধ্যে হতে হবে`,
  CHARACTERS_TOO_LOW: `অটোকমপ্লিট ক্যারেক্টার ${AUTOCOMPLETE_MIN_CHARACTERS} এর চেয়ে কম হতে পারে না`,
  CHARACTERS_TOO_HIGH: `অটোকমপ্লিট ক্যারেক্টার ${AUTOCOMPLETE_MAX_CHARACTERS} এর চেয়ে বেশি হতে পারে না`,
  CACHE_EXPIRED: 'অটোকমপ্লিট ক্যাশের মেয়াদ শেষ হয়েছে',
  NO_SUGGESTIONS: 'কোনো সাজেশন পাওয়া যায়নি',
} as const;
