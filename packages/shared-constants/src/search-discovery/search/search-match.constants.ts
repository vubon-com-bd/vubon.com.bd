/**
 * সার্চ ম্যাচিং মোড সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ম্যাচ টাইপ
 */
export enum MatchType {
  EXACT = 'exact',
  FUZZY = 'fuzzy',
  PREFIX = 'prefix',
  PHRASE = 'phrase',
  WILDCARD = 'wildcard',
  REGEXP = 'regexp',
}

/**
 * ম্যাচ টাইপ লেবেলসমূহ (বাংলায়)
 */
export const MATCH_TYPE_LABELS: Record<MatchType, string> = {
  [MatchType.EXACT]: 'সঠিক মিল',
  [MatchType.FUZZY]: 'আনুমানিক মিল',
  [MatchType.PREFIX]: 'উপসর্গ মিল',
  [MatchType.PHRASE]: 'বাক্যাংশ মিল',
  [MatchType.WILDCARD]: 'ওয়াইল্ডকার্ড মিল',
  [MatchType.REGEXP]: 'রেগুলার এক্সপ্রেশন',
} as const;

/**
 * ম্যাচ টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const MATCH_TYPE_LABELS_EN: Record<MatchType, string> = {
  [MatchType.EXACT]: 'Exact Match',
  [MatchType.FUZZY]: 'Fuzzy Match',
  [MatchType.PREFIX]: 'Prefix Match',
  [MatchType.PHRASE]: 'Phrase Match',
  [MatchType.WILDCARD]: 'Wildcard Match',
  [MatchType.REGEXP]: 'Regular Expression',
} as const;

/**
 * ম্যাচ টাইপ ব্যাখ্যা (বাংলায়)
 */
export const MATCH_TYPE_DESCRIPTIONS: Record<MatchType, string> = {
  [MatchType.EXACT]: 'ঠিক একই শব্দ বা বাক্যাংশ খুঁজে বের করে',
  [MatchType.FUZZY]: 'অক্ষরের ছোটখাটো ভুল সহ মিল খুঁজে বের করে',
  [MatchType.PREFIX]: 'শব্দের শুরুতে দেওয়া অক্ষরগুলো মিলিয়ে খুঁজে বের করে',
  [MatchType.PHRASE]: 'পুরো বাক্যাংশটি হুবহু মিলিয়ে খুঁজে বের করে',
  [MatchType.WILDCARD]: '* বা ? ব্যবহার করে প্যাটার্ন মিলিয়ে খুঁজে বের করে',
  [MatchType.REGEXP]: 'রেগুলার এক্সপ্রেশন ব্যবহার করে জটিল প্যাটার্ন মিলিয়ে খুঁজে বের করে',
} as const;

/**
 * ফাজি ম্যাচের ডিফল্ট প্যারামিটার
 */
export const FUZZY_DEFAULT_CONFIG = {
  fuzziness: 2,
  prefixLength: 2,
  maxExpansions: 50,
  transpositions: true,
} as const;

/**
 * প্রিফিক্স ম্যাচের ডিফল্ট প্যারামিটার
 */
export const PREFIX_DEFAULT_CONFIG = {
  prefixLength: 2,
  maxExpansions: 10,
} as const;

/**
 * ফ্রেজ ম্যাচের ডিফল্ট প্যারামিটার
 */
export const PHRASE_DEFAULT_CONFIG = {
  slop: 2,
  maxExpansions: 10,
} as const;

/**
 * ওয়াইল্ডকার্ড ম্যাচের ডিফল্ট প্যারামিটার
 */
export const WILDCARD_DEFAULT_CONFIG = {
  maxExpansions: 100,
} as const;

/**
 * ম্যাচ টাইপের ভ্যালু সমূহ
 */
export const MATCH_TYPE_VALUES = Object.values(MatchType) as readonly MatchType[];

/**
 * ম্যাচ কনফিগারেশন টাইপ
 */
export type MatchConfig = {
  type: MatchType;
  label: string;
  description: string;
  defaultConfig: Record<string, unknown>;
  enabled: boolean;
};

/**
 * ম্যাচ কনফিগারেশনসমূহ
 */
export const MATCH_CONFIGS: Record<MatchType, MatchConfig> = {
  [MatchType.EXACT]: {
    type: MatchType.EXACT,
    label: MATCH_TYPE_LABELS[MatchType.EXACT],
    description: MATCH_TYPE_DESCRIPTIONS[MatchType.EXACT],
    defaultConfig: {},
    enabled: true,
  },
  [MatchType.FUZZY]: {
    type: MatchType.FUZZY,
    label: MATCH_TYPE_LABELS[MatchType.FUZZY],
    description: MATCH_TYPE_DESCRIPTIONS[MatchType.FUZZY],
    defaultConfig: FUZZY_DEFAULT_CONFIG,
    enabled: true,
  },
  [MatchType.PREFIX]: {
    type: MatchType.PREFIX,
    label: MATCH_TYPE_LABELS[MatchType.PREFIX],
    description: MATCH_TYPE_DESCRIPTIONS[MatchType.PREFIX],
    defaultConfig: PREFIX_DEFAULT_CONFIG,
    enabled: true,
  },
  [MatchType.PHRASE]: {
    type: MatchType.PHRASE,
    label: MATCH_TYPE_LABELS[MatchType.PHRASE],
    description: MATCH_TYPE_DESCRIPTIONS[MatchType.PHRASE],
    defaultConfig: PHRASE_DEFAULT_CONFIG,
    enabled: true,
  },
  [MatchType.WILDCARD]: {
    type: MatchType.WILDCARD,
    label: MATCH_TYPE_LABELS[MatchType.WILDCARD],
    description: MATCH_TYPE_DESCRIPTIONS[MatchType.WILDCARD],
    defaultConfig: WILDCARD_DEFAULT_CONFIG,
    enabled: true,
  },
  [MatchType.REGEXP]: {
    type: MatchType.REGEXP,
    label: MATCH_TYPE_LABELS[MatchType.REGEXP],
    description: MATCH_TYPE_DESCRIPTIONS[MatchType.REGEXP],
    defaultConfig: {},
    enabled: false, // রেগুলার এক্সপ্রেশন ডিফল্টভাবে বন্ধ থাকে
  },
} as const;

/**
 * ডিফল্ট ম্যাচ টাইপ
 */
export const DEFAULT_MATCH_TYPE = MatchType.EXACT;

/**
 * ম্যাচ এরর মেসেজসমূহ
 */
export const MATCH_ERROR_MESSAGES = {
  INVALID_TYPE: 'ম্যাচ টাইপ সঠিক নয়',
  INVALID_FUZZINESS: 'ফাজিনেস ০ থেকে ৫ এর মধ্যে হতে হবে',
  INVALID_PREFIX_LENGTH: 'প্রিফিক্স লেন্থ ১ থেকে ১০ এর মধ্যে হতে হবে',
  INVALID_REGEXP: 'রেগুলার এক্সপ্রেশন সঠিক নয়',
  PATTERN_TOO_COMPLEX: 'প্যাটার্ন খুব জটিল',
} as const;
