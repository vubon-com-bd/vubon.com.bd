/**
 * AI সার্চ স্ট্র্যাটেজি এনাম
 */
export const AI_SEARCH_STRATEGY = {
  EXACT_MATCH: 'exact-match',
  PARTIAL_MATCH: 'partial-match',
  SYNONYM_EXPANSION: 'synonym-expansion',
  SEMANTIC_SEARCH: 'semantic-search',
  HYBRID_SEARCH: 'hybrid-search',
  RANKED_SEARCH: 'ranked-search',
  PERSONALIZED_SEARCH: 'personalized-search',
} as const;

/**
 * AI_SEARCH_STRATEGY থেকে টাইপ
 */
export type AISearchStrategyType = (typeof AI_SEARCH_STRATEGY)[keyof typeof AI_SEARCH_STRATEGY];

/**
 * সার্চ স্ট্র্যাটেজি লেবেল
 */
export const AI_SEARCH_STRATEGY_LABELS: Record<AISearchStrategyType, string> = {
  [AI_SEARCH_STRATEGY.EXACT_MATCH]: 'Exact Match',
  [AI_SEARCH_STRATEGY.PARTIAL_MATCH]: 'Partial Match',
  [AI_SEARCH_STRATEGY.SYNONYM_EXPANSION]: 'Synonym Expansion',
  [AI_SEARCH_STRATEGY.SEMANTIC_SEARCH]: 'Semantic Search',
  [AI_SEARCH_STRATEGY.HYBRID_SEARCH]: 'Hybrid Search',
  [AI_SEARCH_STRATEGY.RANKED_SEARCH]: 'Ranked Search',
  [AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH]: 'Personalized Search',
} as const;

/**
 * সার্চ স্ট্র্যাটেজি বিবরণ
 */
export const AI_SEARCH_STRATEGY_DESCRIPTIONS: Record<AISearchStrategyType, string> = {
  [AI_SEARCH_STRATEGY.EXACT_MATCH]: 'Performs exact matching of search terms with high precision',
  [AI_SEARCH_STRATEGY.PARTIAL_MATCH]: 'Performs partial matching with wildcard and prefix support',
  [AI_SEARCH_STRATEGY.SYNONYM_EXPANSION]: 'Expands search with synonyms and related terms',
  [AI_SEARCH_STRATEGY.SEMANTIC_SEARCH]: 'Uses semantic understanding for context-aware results',
  [AI_SEARCH_STRATEGY.HYBRID_SEARCH]: 'Combines multiple strategies for comprehensive results',
  [AI_SEARCH_STRATEGY.RANKED_SEARCH]: 'Ranks results based on relevance and importance',
  [AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH]: 'Personalizes results based on user preferences',
} as const;

/**
 * সার্চ স্ট্র্যাটেজি আইকন
 */
export const AI_SEARCH_STRATEGY_ICONS: Record<AISearchStrategyType, string> = {
  [AI_SEARCH_STRATEGY.EXACT_MATCH]: '🎯',
  [AI_SEARCH_STRATEGY.PARTIAL_MATCH]: '🔍',
  [AI_SEARCH_STRATEGY.SYNONYM_EXPANSION]: '📚',
  [AI_SEARCH_STRATEGY.SEMANTIC_SEARCH]: '🧠',
  [AI_SEARCH_STRATEGY.HYBRID_SEARCH]: '🔄',
  [AI_SEARCH_STRATEGY.RANKED_SEARCH]: '📊',
  [AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH]: '👤',
} as const;

/**
 * সার্চ স্ট্র্যাটেজি কমপ্লেক্সিটি (১-৫)
 */
export const AI_SEARCH_STRATEGY_COMPLEXITY: Record<AISearchStrategyType, number> = {
  [AI_SEARCH_STRATEGY.EXACT_MATCH]: 1,
  [AI_SEARCH_STRATEGY.PARTIAL_MATCH]: 2,
  [AI_SEARCH_STRATEGY.SYNONYM_EXPANSION]: 3,
  [AI_SEARCH_STRATEGY.SEMANTIC_SEARCH]: 4,
  [AI_SEARCH_STRATEGY.HYBRID_SEARCH]: 5,
  [AI_SEARCH_STRATEGY.RANKED_SEARCH]: 3,
  [AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH]: 4,
} as const;

/**
 * সার্চ স্ট্র্যাটেজি পারফরম্যান্স স্কোর (০-১০০)
 */
export const AI_SEARCH_STRATEGY_PERFORMANCE: Record<AISearchStrategyType, number> = {
  [AI_SEARCH_STRATEGY.EXACT_MATCH]: 95,
  [AI_SEARCH_STRATEGY.PARTIAL_MATCH]: 80,
  [AI_SEARCH_STRATEGY.SYNONYM_EXPANSION]: 85,
  [AI_SEARCH_STRATEGY.SEMANTIC_SEARCH]: 90,
  [AI_SEARCH_STRATEGY.HYBRID_SEARCH]: 92,
  [AI_SEARCH_STRATEGY.RANKED_SEARCH]: 88,
  [AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH]: 87,
} as const;

/**
 * সার্চ স্ট্র্যাটেজি কনফিগারেশন
 */
export interface AISearchStrategyConfig {
  strategy: AISearchStrategyType;
  label: string;
  description: string;
  icon: string;
  complexity: number;
  performance: number;
  requiresIndexing: boolean;
  requiresEmbedding: boolean;
  requiresUserData: boolean;
  isRealTime: boolean;
  recallRate: number;
  precisionRate: number;
}

/**
 * সার্চ স্ট্র্যাটেজি মেটাডেটা
 */
export const AI_SEARCH_STRATEGY_METADATA: Record<AISearchStrategyType, AISearchStrategyConfig> = {
  [AI_SEARCH_STRATEGY.EXACT_MATCH]: {
    strategy: AI_SEARCH_STRATEGY.EXACT_MATCH,
    label: AI_SEARCH_STRATEGY_LABELS[AI_SEARCH_STRATEGY.EXACT_MATCH],
    description: AI_SEARCH_STRATEGY_DESCRIPTIONS[AI_SEARCH_STRATEGY.EXACT_MATCH],
    icon: AI_SEARCH_STRATEGY_ICONS[AI_SEARCH_STRATEGY.EXACT_MATCH],
    complexity: AI_SEARCH_STRATEGY_COMPLEXITY[AI_SEARCH_STRATEGY.EXACT_MATCH],
    performance: AI_SEARCH_STRATEGY_PERFORMANCE[AI_SEARCH_STRATEGY.EXACT_MATCH],
    requiresIndexing: true,
    requiresEmbedding: false,
    requiresUserData: false,
    isRealTime: true,
    recallRate: 0.85,
    precisionRate: 0.98,
  },
  [AI_SEARCH_STRATEGY.PARTIAL_MATCH]: {
    strategy: AI_SEARCH_STRATEGY.PARTIAL_MATCH,
    label: AI_SEARCH_STRATEGY_LABELS[AI_SEARCH_STRATEGY.PARTIAL_MATCH],
    description: AI_SEARCH_STRATEGY_DESCRIPTIONS[AI_SEARCH_STRATEGY.PARTIAL_MATCH],
    icon: AI_SEARCH_STRATEGY_ICONS[AI_SEARCH_STRATEGY.PARTIAL_MATCH],
    complexity: AI_SEARCH_STRATEGY_COMPLEXITY[AI_SEARCH_STRATEGY.PARTIAL_MATCH],
    performance: AI_SEARCH_STRATEGY_PERFORMANCE[AI_SEARCH_STRATEGY.PARTIAL_MATCH],
    requiresIndexing: true,
    requiresEmbedding: false,
    requiresUserData: false,
    isRealTime: true,
    recallRate: 0.9,
    precisionRate: 0.75,
  },
  [AI_SEARCH_STRATEGY.SYNONYM_EXPANSION]: {
    strategy: AI_SEARCH_STRATEGY.SYNONYM_EXPANSION,
    label: AI_SEARCH_STRATEGY_LABELS[AI_SEARCH_STRATEGY.SYNONYM_EXPANSION],
    description: AI_SEARCH_STRATEGY_DESCRIPTIONS[AI_SEARCH_STRATEGY.SYNONYM_EXPANSION],
    icon: AI_SEARCH_STRATEGY_ICONS[AI_SEARCH_STRATEGY.SYNONYM_EXPANSION],
    complexity: AI_SEARCH_STRATEGY_COMPLEXITY[AI_SEARCH_STRATEGY.SYNONYM_EXPANSION],
    performance: AI_SEARCH_STRATEGY_PERFORMANCE[AI_SEARCH_STRATEGY.SYNONYM_EXPANSION],
    requiresIndexing: true,
    requiresEmbedding: false,
    requiresUserData: false,
    isRealTime: true,
    recallRate: 0.92,
    precisionRate: 0.78,
  },
  [AI_SEARCH_STRATEGY.SEMANTIC_SEARCH]: {
    strategy: AI_SEARCH_STRATEGY.SEMANTIC_SEARCH,
    label: AI_SEARCH_STRATEGY_LABELS[AI_SEARCH_STRATEGY.SEMANTIC_SEARCH],
    description: AI_SEARCH_STRATEGY_DESCRIPTIONS[AI_SEARCH_STRATEGY.SEMANTIC_SEARCH],
    icon: AI_SEARCH_STRATEGY_ICONS[AI_SEARCH_STRATEGY.SEMANTIC_SEARCH],
    complexity: AI_SEARCH_STRATEGY_COMPLEXITY[AI_SEARCH_STRATEGY.SEMANTIC_SEARCH],
    performance: AI_SEARCH_STRATEGY_PERFORMANCE[AI_SEARCH_STRATEGY.SEMANTIC_SEARCH],
    requiresIndexing: false,
    requiresEmbedding: true,
    requiresUserData: false,
    isRealTime: false,
    recallRate: 0.88,
    precisionRate: 0.85,
  },
  [AI_SEARCH_STRATEGY.HYBRID_SEARCH]: {
    strategy: AI_SEARCH_STRATEGY.HYBRID_SEARCH,
    label: AI_SEARCH_STRATEGY_LABELS[AI_SEARCH_STRATEGY.HYBRID_SEARCH],
    description: AI_SEARCH_STRATEGY_DESCRIPTIONS[AI_SEARCH_STRATEGY.HYBRID_SEARCH],
    icon: AI_SEARCH_STRATEGY_ICONS[AI_SEARCH_STRATEGY.HYBRID_SEARCH],
    complexity: AI_SEARCH_STRATEGY_COMPLEXITY[AI_SEARCH_STRATEGY.HYBRID_SEARCH],
    performance: AI_SEARCH_STRATEGY_PERFORMANCE[AI_SEARCH_STRATEGY.HYBRID_SEARCH],
    requiresIndexing: true,
    requiresEmbedding: true,
    requiresUserData: false,
    isRealTime: false,
    recallRate: 0.94,
    precisionRate: 0.88,
  },
  [AI_SEARCH_STRATEGY.RANKED_SEARCH]: {
    strategy: AI_SEARCH_STRATEGY.RANKED_SEARCH,
    label: AI_SEARCH_STRATEGY_LABELS[AI_SEARCH_STRATEGY.RANKED_SEARCH],
    description: AI_SEARCH_STRATEGY_DESCRIPTIONS[AI_SEARCH_STRATEGY.RANKED_SEARCH],
    icon: AI_SEARCH_STRATEGY_ICONS[AI_SEARCH_STRATEGY.RANKED_SEARCH],
    complexity: AI_SEARCH_STRATEGY_COMPLEXITY[AI_SEARCH_STRATEGY.RANKED_SEARCH],
    performance: AI_SEARCH_STRATEGY_PERFORMANCE[AI_SEARCH_STRATEGY.RANKED_SEARCH],
    requiresIndexing: true,
    requiresEmbedding: false,
    requiresUserData: false,
    isRealTime: true,
    recallRate: 0.87,
    precisionRate: 0.9,
  },
  [AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH]: {
    strategy: AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH,
    label: AI_SEARCH_STRATEGY_LABELS[AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH],
    description: AI_SEARCH_STRATEGY_DESCRIPTIONS[AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH],
    icon: AI_SEARCH_STRATEGY_ICONS[AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH],
    complexity: AI_SEARCH_STRATEGY_COMPLEXITY[AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH],
    performance: AI_SEARCH_STRATEGY_PERFORMANCE[AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH],
    requiresIndexing: true,
    requiresEmbedding: true,
    requiresUserData: true,
    isRealTime: true,
    recallRate: 0.8,
    precisionRate: 0.92,
  },
} as const;

/**
 * সার্চ স্ট্র্যাটেজি ক্যাটাগরি
 */
export const AI_SEARCH_STRATEGY_CATEGORIES = {
  PRECISION_FOCUSED: [AI_SEARCH_STRATEGY.EXACT_MATCH, AI_SEARCH_STRATEGY.RANKED_SEARCH] as const,
  RECALL_FOCUSED: [AI_SEARCH_STRATEGY.PARTIAL_MATCH, AI_SEARCH_STRATEGY.SYNONYM_EXPANSION] as const,
  ADVANCED: [
    AI_SEARCH_STRATEGY.SEMANTIC_SEARCH,
    AI_SEARCH_STRATEGY.HYBRID_SEARCH,
    AI_SEARCH_STRATEGY.PERSONALIZED_SEARCH,
  ] as const,
} as const;

/**
 * সার্চ স্ট্র্যাটেজি ক্যাটাগরি লেবেল
 */
export const AI_SEARCH_STRATEGY_CATEGORY_LABELS = {
  PRECISION_FOCUSED: 'Precision Focused',
  RECALL_FOCUSED: 'Recall Focused',
  ADVANCED: 'Advanced',
} as const;
