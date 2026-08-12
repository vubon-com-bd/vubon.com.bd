/**
 * ডিফল্ট সার্চ ফলাফল সংখ্যা
 */
export const AI_SEARCH_DEFAULT_LIMIT = 20 as const;

/**
 * ন্যূনতম কোয়েরি দৈর্ঘ্য
 */
export const AI_SEARCH_MIN_QUERY_LENGTH = 2 as const;

/**
 * সর্বোচ্চ কোয়েরি দৈর্ঘ্য
 */
export const AI_SEARCH_MAX_QUERY_LENGTH = 200 as const;

/**
 * ডিফল্ট অফসেট
 */
export const AI_SEARCH_DEFAULT_OFFSET = 0 as const;

/**
 * ফাজি ম্যাচিং থ্রেশহোল্ড (0.0 - 1.0)
 */
export const AI_SEARCH_FUZZY_THRESHOLD = 0.7 as const;

/**
 * সিম্যান্টিক ওয়েট (0.0 - 1.0)
 */
export const AI_SEARCH_SEMANTIC_WEIGHT = 0.5 as const;

/**
 * সার্চ টাইপ এনাম
 */
export const AI_SEARCH_TYPE = {
  KEYWORD: 'keyword',
  SEMANTIC: 'semantic',
  HYBRID: 'hybrid',
  VECTOR: 'vector',
  FUZZY: 'fuzzy',
  PHRASE: 'phrase',
  BOOLEAN: 'boolean',
  PROXIMITY: 'proximity',
} as const;

/**
 * AI_SEARCH_TYPE থেকে টাইপ
 */
export type AISearchType = (typeof AI_SEARCH_TYPE)[keyof typeof AI_SEARCH_TYPE];

/**
 * সার্চ টাইপ লেবেল
 */
export const AI_SEARCH_TYPE_LABELS: Record<AISearchType, string> = {
  [AI_SEARCH_TYPE.KEYWORD]: 'Keyword',
  [AI_SEARCH_TYPE.SEMANTIC]: 'Semantic',
  [AI_SEARCH_TYPE.HYBRID]: 'Hybrid',
  [AI_SEARCH_TYPE.VECTOR]: 'Vector',
  [AI_SEARCH_TYPE.FUZZY]: 'Fuzzy',
  [AI_SEARCH_TYPE.PHRASE]: 'Phrase',
  [AI_SEARCH_TYPE.BOOLEAN]: 'Boolean',
  [AI_SEARCH_TYPE.PROXIMITY]: 'Proximity',
} as const;

/**
 * সার্চ টাইপ বিবরণ
 */
export const AI_SEARCH_TYPE_DESCRIPTIONS: Record<AISearchType, string> = {
  [AI_SEARCH_TYPE.KEYWORD]: 'Traditional keyword-based search matching',
  [AI_SEARCH_TYPE.SEMANTIC]: 'Semantic search using embeddings and meaning understanding',
  [AI_SEARCH_TYPE.HYBRID]: 'Combines keyword and semantic search approaches',
  [AI_SEARCH_TYPE.VECTOR]: 'Vector similarity search using embeddings',
  [AI_SEARCH_TYPE.FUZZY]: 'Fuzzy matching with tolerance for spelling errors',
  [AI_SEARCH_TYPE.PHRASE]: 'Exact phrase matching search',
  [AI_SEARCH_TYPE.BOOLEAN]: 'Boolean search with AND, OR, NOT operators',
  [AI_SEARCH_TYPE.PROXIMITY]: 'Proximity search with distance-based matching',
} as const;

/**
 * সার্চ টাইপ আইকন
 */
export const AI_SEARCH_TYPE_ICONS: Record<AISearchType, string> = {
  [AI_SEARCH_TYPE.KEYWORD]: '🔑',
  [AI_SEARCH_TYPE.SEMANTIC]: '🧠',
  [AI_SEARCH_TYPE.HYBRID]: '🔄',
  [AI_SEARCH_TYPE.VECTOR]: '📐',
  [AI_SEARCH_TYPE.FUZZY]: '🎯',
  [AI_SEARCH_TYPE.PHRASE]: '💬',
  [AI_SEARCH_TYPE.BOOLEAN]: '⚡',
  [AI_SEARCH_TYPE.PROXIMITY]: '📏',
} as const;

/**
 * সার্চ মোড এনাম
 */
export const AI_SEARCH_MODE = {
  EXACT: 'exact',
  PARTIAL: 'partial',
  SMART: 'smart',
  NATURAL: 'natural',
} as const;

/**
 * AI_SEARCH_MODE থেকে টাইপ
 */
export type AISearchMode = (typeof AI_SEARCH_MODE)[keyof typeof AI_SEARCH_MODE];

/**
 * সার্চ মোড লেবেল
 */
export const AI_SEARCH_MODE_LABELS: Record<AISearchMode, string> = {
  [AI_SEARCH_MODE.EXACT]: 'Exact',
  [AI_SEARCH_MODE.PARTIAL]: 'Partial',
  [AI_SEARCH_MODE.SMART]: 'Smart',
  [AI_SEARCH_MODE.NATURAL]: 'Natural',
} as const;

/**
 * সার্চ মোড বিবরণ
 */
export const AI_SEARCH_MODE_DESCRIPTIONS: Record<AISearchMode, string> = {
  [AI_SEARCH_MODE.EXACT]: 'Performs exact matching of search terms',
  [AI_SEARCH_MODE.PARTIAL]: 'Performs partial and wildcard matching',
  [AI_SEARCH_MODE.SMART]: 'Uses smart matching with intent understanding',
  [AI_SEARCH_MODE.NATURAL]: 'Processes natural language queries',
} as const;

/**
 * সার্চ কনফিগারেশন
 */
export interface AISearchConfig {
  limit: number;
  offset: number;
  minQueryLength: number;
  maxQueryLength: number;
  fuzzyThreshold: number;
  semanticWeight: number;
  type: AISearchType;
  mode: AISearchMode;
  enableStemming: boolean;
  enableStopWords: boolean;
  enableHighlighting: boolean;
  enableSuggestions: boolean;
  enableSynonyms: boolean;
  enableFiltering: boolean;
  enableSorting: boolean;
}

/**
 * সার্চ ডিফল্ট কনফিগারেশন
 */
export const AI_SEARCH_DEFAULT_CONFIG: AISearchConfig = {
  limit: AI_SEARCH_DEFAULT_LIMIT,
  offset: AI_SEARCH_DEFAULT_OFFSET,
  minQueryLength: AI_SEARCH_MIN_QUERY_LENGTH,
  maxQueryLength: AI_SEARCH_MAX_QUERY_LENGTH,
  fuzzyThreshold: AI_SEARCH_FUZZY_THRESHOLD,
  semanticWeight: AI_SEARCH_SEMANTIC_WEIGHT,
  type: AI_SEARCH_TYPE.HYBRID,
  mode: AI_SEARCH_MODE.SMART,
  enableStemming: true,
  enableStopWords: true,
  enableHighlighting: true,
  enableSuggestions: true,
  enableSynonyms: true,
  enableFiltering: true,
  enableSorting: true,
} as const;

/**
 * সার্চ ফিল্টার
 */
export interface AISearchFilter {
  type?: AISearchType;
  mode?: AISearchMode;
  limit?: number;
  offset?: number;
  categories?: string[];
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minScore?: number;
  maxScore?: number;
  author?: string;
  source?: string;
  language?: string;
}

/**
 * সার্চ রেসপন্স
 */
export interface AISearchResponse<T = unknown> {
  results: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  nextOffset?: number;
  took: number;
  query: string;
  type: AISearchType;
  mode: AISearchMode;
  suggestions?: string[];
  facets?: Record<string, unknown>;
  highlights?: Record<string, string[]>;
}

/**
 * সার্চ সাজানোর ক্ষেত্র
 */
export const AI_SEARCH_SORT_FIELDS = {
  RELEVANCE: 'relevance',
  SCORE: 'score',
  DATE: 'date',
  TITLE: 'title',
  POPULARITY: 'popularity',
  RECENCY: 'recency',
} as const;

/**
 * AI_SEARCH_SORT_FIELDS থেকে টাইপ
 */
export type AISearchSortField = (typeof AI_SEARCH_SORT_FIELDS)[keyof typeof AI_SEARCH_SORT_FIELDS];

/**
 * সার্চ সাজানোর ক্রম
 */
export const AI_SEARCH_SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

/**
 * AI_SEARCH_SORT_ORDER থেকে টাইপ
 */
export type AISearchSortOrder = (typeof AI_SEARCH_SORT_ORDER)[keyof typeof AI_SEARCH_SORT_ORDER];

/**
 * সার্চ সাজানোর কনফিগারেশন
 */
export interface AISearchSort {
  field: AISearchSortField;
  order: AISearchSortOrder;
}

/**
 * সার্চ টাইপ গ্রুপ
 */
export const AI_SEARCH_TYPE_GROUPS = {
  TRADITIONAL: [
    AI_SEARCH_TYPE.KEYWORD,
    AI_SEARCH_TYPE.FUZZY,
    AI_SEARCH_TYPE.PHRASE,
    AI_SEARCH_TYPE.BOOLEAN,
    AI_SEARCH_TYPE.PROXIMITY,
  ] as const,
  ADVANCED: [AI_SEARCH_TYPE.SEMANTIC, AI_SEARCH_TYPE.VECTOR] as const,
  HYBRID: [AI_SEARCH_TYPE.HYBRID] as const,
} as const;

/**
 * সার্চ টাইপ গ্রুপ লেবেল
 */
export const AI_SEARCH_TYPE_GROUP_LABELS = {
  TRADITIONAL: 'Traditional',
  ADVANCED: 'Advanced',
  HYBRID: 'Hybrid',
} as const;

/**
 * সার্চ মোড গ্রুপ
 */
export const AI_SEARCH_MODE_GROUPS = {
  PRECISE: [AI_SEARCH_MODE.EXACT] as const,
  FLEXIBLE: [AI_SEARCH_MODE.PARTIAL, AI_SEARCH_MODE.SMART] as const,
  NATURAL: [AI_SEARCH_MODE.NATURAL] as const,
} as const;

/**
 * সার্চ মোড গ্রুপ লেবেল
 */
export const AI_SEARCH_MODE_GROUP_LABELS = {
  PRECISE: 'Precise',
  FLEXIBLE: 'Flexible',
  NATURAL: 'Natural',
} as const;
