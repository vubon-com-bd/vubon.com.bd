/**
 * AI সার্চ টাইপ এনাম
 */
export const AI_SEARCH_TYPE = {
  KEYWORD: 'keyword',
  SEMANTIC: 'semantic',
  HYBRID: 'hybrid',
  VECTOR: 'vector',
  FULL_TEXT: 'full-text',
  FUZZY: 'fuzzy',
  SYNONYM: 'synonym',
  PHRASE: 'phrase',
} as const;

/**
 * AI_SEARCH_TYPE থেকে টাইপ
 */
export type AISearchTypeType = (typeof AI_SEARCH_TYPE)[keyof typeof AI_SEARCH_TYPE];

/**
 * সার্চ টাইপ লেবেল
 */
export const AI_SEARCH_TYPE_LABELS: Record<AISearchTypeType, string> = {
  [AI_SEARCH_TYPE.KEYWORD]: 'Keyword',
  [AI_SEARCH_TYPE.SEMANTIC]: 'Semantic',
  [AI_SEARCH_TYPE.HYBRID]: 'Hybrid',
  [AI_SEARCH_TYPE.VECTOR]: 'Vector',
  [AI_SEARCH_TYPE.FULL_TEXT]: 'Full Text',
  [AI_SEARCH_TYPE.FUZZY]: 'Fuzzy',
  [AI_SEARCH_TYPE.SYNONYM]: 'Synonym',
  [AI_SEARCH_TYPE.PHRASE]: 'Phrase',
} as const;

/**
 * সার্চ টাইপ বিবরণ
 */
export const AI_SEARCH_TYPE_DESCRIPTIONS: Record<AISearchTypeType, string> = {
  [AI_SEARCH_TYPE.KEYWORD]: 'Searches using exact keyword matching with text indexing',
  [AI_SEARCH_TYPE.SEMANTIC]: 'Uses semantic understanding and embeddings for context-aware search',
  [AI_SEARCH_TYPE.HYBRID]: 'Combines keyword and semantic search for comprehensive results',
  [AI_SEARCH_TYPE.VECTOR]: 'Searches using vector similarity and embedding distances',
  [AI_SEARCH_TYPE.FULL_TEXT]: 'Searches across complete text content with full-text indexing',
  [AI_SEARCH_TYPE.FUZZY]: 'Searches with tolerance for spelling errors and approximate matches',
  [AI_SEARCH_TYPE.SYNONYM]: 'Searches including synonyms and related terms automatically',
  [AI_SEARCH_TYPE.PHRASE]: 'Searches for exact phrase matching in documents',
} as const;

/**
 * সার্চ টাইপ আইকন
 */
export const AI_SEARCH_TYPE_ICONS: Record<AISearchTypeType, string> = {
  [AI_SEARCH_TYPE.KEYWORD]: '🔑',
  [AI_SEARCH_TYPE.SEMANTIC]: '🧠',
  [AI_SEARCH_TYPE.HYBRID]: '🔄',
  [AI_SEARCH_TYPE.VECTOR]: '📐',
  [AI_SEARCH_TYPE.FULL_TEXT]: '📄',
  [AI_SEARCH_TYPE.FUZZY]: '🎯',
  [AI_SEARCH_TYPE.SYNONYM]: '📚',
  [AI_SEARCH_TYPE.PHRASE]: '💬',
} as const;

/**
 * সার্চ টাইপ কমপ্লেক্সিটি (১-৫)
 */
export const AI_SEARCH_TYPE_COMPLEXITY: Record<AISearchTypeType, number> = {
  [AI_SEARCH_TYPE.KEYWORD]: 1,
  [AI_SEARCH_TYPE.FULL_TEXT]: 2,
  [AI_SEARCH_TYPE.PHRASE]: 2,
  [AI_SEARCH_TYPE.FUZZY]: 3,
  [AI_SEARCH_TYPE.SYNONYM]: 3,
  [AI_SEARCH_TYPE.VECTOR]: 4,
  [AI_SEARCH_TYPE.SEMANTIC]: 4,
  [AI_SEARCH_TYPE.HYBRID]: 5,
} as const;

/**
 * সার্চ টাইপ পারফরম্যান্স স্কোর (০-১০০)
 */
export const AI_SEARCH_TYPE_PERFORMANCE: Record<AISearchTypeType, number> = {
  [AI_SEARCH_TYPE.KEYWORD]: 75,
  [AI_SEARCH_TYPE.FULL_TEXT]: 80,
  [AI_SEARCH_TYPE.PHRASE]: 85,
  [AI_SEARCH_TYPE.FUZZY]: 70,
  [AI_SEARCH_TYPE.SYNONYM]: 78,
  [AI_SEARCH_TYPE.VECTOR]: 88,
  [AI_SEARCH_TYPE.SEMANTIC]: 90,
  [AI_SEARCH_TYPE.HYBRID]: 95,
} as const;

/**
 * সার্চ টাইপ কনফিগারেশন
 */
export interface AISearchTypeConfig {
  type: AISearchTypeType;
  label: string;
  description: string;
  icon: string;
  complexity: number;
  performance: number;
  requiresIndexing: boolean;
  requiresEmbedding: boolean;
  supportsWildcard: boolean;
  supportsBoolean: boolean;
  supportsPhrase: boolean;
  supportsFuzzy: boolean;
}

/**
 * সার্চ টাইপ মেটাডেটা
 */
export const AI_SEARCH_TYPE_METADATA: Record<AISearchTypeType, AISearchTypeConfig> = {
  [AI_SEARCH_TYPE.KEYWORD]: {
    type: AI_SEARCH_TYPE.KEYWORD,
    label: AI_SEARCH_TYPE_LABELS[AI_SEARCH_TYPE.KEYWORD],
    description: AI_SEARCH_TYPE_DESCRIPTIONS[AI_SEARCH_TYPE.KEYWORD],
    icon: AI_SEARCH_TYPE_ICONS[AI_SEARCH_TYPE.KEYWORD],
    complexity: AI_SEARCH_TYPE_COMPLEXITY[AI_SEARCH_TYPE.KEYWORD],
    performance: AI_SEARCH_TYPE_PERFORMANCE[AI_SEARCH_TYPE.KEYWORD],
    requiresIndexing: true,
    requiresEmbedding: false,
    supportsWildcard: true,
    supportsBoolean: true,
    supportsPhrase: false,
    supportsFuzzy: false,
  },
  [AI_SEARCH_TYPE.SEMANTIC]: {
    type: AI_SEARCH_TYPE.SEMANTIC,
    label: AI_SEARCH_TYPE_LABELS[AI_SEARCH_TYPE.SEMANTIC],
    description: AI_SEARCH_TYPE_DESCRIPTIONS[AI_SEARCH_TYPE.SEMANTIC],
    icon: AI_SEARCH_TYPE_ICONS[AI_SEARCH_TYPE.SEMANTIC],
    complexity: AI_SEARCH_TYPE_COMPLEXITY[AI_SEARCH_TYPE.SEMANTIC],
    performance: AI_SEARCH_TYPE_PERFORMANCE[AI_SEARCH_TYPE.SEMANTIC],
    requiresIndexing: false,
    requiresEmbedding: true,
    supportsWildcard: false,
    supportsBoolean: false,
    supportsPhrase: false,
    supportsFuzzy: false,
  },
  [AI_SEARCH_TYPE.HYBRID]: {
    type: AI_SEARCH_TYPE.HYBRID,
    label: AI_SEARCH_TYPE_LABELS[AI_SEARCH_TYPE.HYBRID],
    description: AI_SEARCH_TYPE_DESCRIPTIONS[AI_SEARCH_TYPE.HYBRID],
    icon: AI_SEARCH_TYPE_ICONS[AI_SEARCH_TYPE.HYBRID],
    complexity: AI_SEARCH_TYPE_COMPLEXITY[AI_SEARCH_TYPE.HYBRID],
    performance: AI_SEARCH_TYPE_PERFORMANCE[AI_SEARCH_TYPE.HYBRID],
    requiresIndexing: true,
    requiresEmbedding: true,
    supportsWildcard: true,
    supportsBoolean: true,
    supportsPhrase: true,
    supportsFuzzy: true,
  },
  [AI_SEARCH_TYPE.VECTOR]: {
    type: AI_SEARCH_TYPE.VECTOR,
    label: AI_SEARCH_TYPE_LABELS[AI_SEARCH_TYPE.VECTOR],
    description: AI_SEARCH_TYPE_DESCRIPTIONS[AI_SEARCH_TYPE.VECTOR],
    icon: AI_SEARCH_TYPE_ICONS[AI_SEARCH_TYPE.VECTOR],
    complexity: AI_SEARCH_TYPE_COMPLEXITY[AI_SEARCH_TYPE.VECTOR],
    performance: AI_SEARCH_TYPE_PERFORMANCE[AI_SEARCH_TYPE.VECTOR],
    requiresIndexing: false,
    requiresEmbedding: true,
    supportsWildcard: false,
    supportsBoolean: false,
    supportsPhrase: false,
    supportsFuzzy: false,
  },
  [AI_SEARCH_TYPE.FULL_TEXT]: {
    type: AI_SEARCH_TYPE.FULL_TEXT,
    label: AI_SEARCH_TYPE_LABELS[AI_SEARCH_TYPE.FULL_TEXT],
    description: AI_SEARCH_TYPE_DESCRIPTIONS[AI_SEARCH_TYPE.FULL_TEXT],
    icon: AI_SEARCH_TYPE_ICONS[AI_SEARCH_TYPE.FULL_TEXT],
    complexity: AI_SEARCH_TYPE_COMPLEXITY[AI_SEARCH_TYPE.FULL_TEXT],
    performance: AI_SEARCH_TYPE_PERFORMANCE[AI_SEARCH_TYPE.FULL_TEXT],
    requiresIndexing: true,
    requiresEmbedding: false,
    supportsWildcard: true,
    supportsBoolean: true,
    supportsPhrase: true,
    supportsFuzzy: false,
  },
  [AI_SEARCH_TYPE.FUZZY]: {
    type: AI_SEARCH_TYPE.FUZZY,
    label: AI_SEARCH_TYPE_LABELS[AI_SEARCH_TYPE.FUZZY],
    description: AI_SEARCH_TYPE_DESCRIPTIONS[AI_SEARCH_TYPE.FUZZY],
    icon: AI_SEARCH_TYPE_ICONS[AI_SEARCH_TYPE.FUZZY],
    complexity: AI_SEARCH_TYPE_COMPLEXITY[AI_SEARCH_TYPE.FUZZY],
    performance: AI_SEARCH_TYPE_PERFORMANCE[AI_SEARCH_TYPE.FUZZY],
    requiresIndexing: true,
    requiresEmbedding: false,
    supportsWildcard: true,
    supportsBoolean: false,
    supportsPhrase: false,
    supportsFuzzy: true,
  },
  [AI_SEARCH_TYPE.SYNONYM]: {
    type: AI_SEARCH_TYPE.SYNONYM,
    label: AI_SEARCH_TYPE_LABELS[AI_SEARCH_TYPE.SYNONYM],
    description: AI_SEARCH_TYPE_DESCRIPTIONS[AI_SEARCH_TYPE.SYNONYM],
    icon: AI_SEARCH_TYPE_ICONS[AI_SEARCH_TYPE.SYNONYM],
    complexity: AI_SEARCH_TYPE_COMPLEXITY[AI_SEARCH_TYPE.SYNONYM],
    performance: AI_SEARCH_TYPE_PERFORMANCE[AI_SEARCH_TYPE.SYNONYM],
    requiresIndexing: true,
    requiresEmbedding: false,
    supportsWildcard: false,
    supportsBoolean: false,
    supportsPhrase: false,
    supportsFuzzy: false,
  },
  [AI_SEARCH_TYPE.PHRASE]: {
    type: AI_SEARCH_TYPE.PHRASE,
    label: AI_SEARCH_TYPE_LABELS[AI_SEARCH_TYPE.PHRASE],
    description: AI_SEARCH_TYPE_DESCRIPTIONS[AI_SEARCH_TYPE.PHRASE],
    icon: AI_SEARCH_TYPE_ICONS[AI_SEARCH_TYPE.PHRASE],
    complexity: AI_SEARCH_TYPE_COMPLEXITY[AI_SEARCH_TYPE.PHRASE],
    performance: AI_SEARCH_TYPE_PERFORMANCE[AI_SEARCH_TYPE.PHRASE],
    requiresIndexing: true,
    requiresEmbedding: false,
    supportsWildcard: false,
    supportsBoolean: false,
    supportsPhrase: true,
    supportsFuzzy: false,
  },
} as const;

/**
 * সার্চ টাইপ গ্রুপ
 */
export const AI_SEARCH_TYPE_GROUPS = {
  TRADITIONAL: [
    AI_SEARCH_TYPE.KEYWORD,
    AI_SEARCH_TYPE.FULL_TEXT,
    AI_SEARCH_TYPE.PHRASE,
    AI_SEARCH_TYPE.FUZZY,
  ] as const,
  ADVANCED: [AI_SEARCH_TYPE.SEMANTIC, AI_SEARCH_TYPE.VECTOR] as const,
  HYBRID: [AI_SEARCH_TYPE.HYBRID] as const,
  ENHANCED: [AI_SEARCH_TYPE.SYNONYM] as const,
} as const;

/**
 * সার্চ টাইপ গ্রুপ লেবেল
 */
export const AI_SEARCH_TYPE_GROUP_LABELS = {
  TRADITIONAL: 'Traditional',
  ADVANCED: 'Advanced',
  HYBRID: 'Hybrid',
  ENHANCED: 'Enhanced',
} as const;
