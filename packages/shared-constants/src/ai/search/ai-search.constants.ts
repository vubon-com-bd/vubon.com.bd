/**
 * AI Search Constants
 * Configuration for AI-powered search systems
 */

export const AI_SEARCH = {
  // Search Types
  TYPES: {
    SEMANTIC: 'semantic',
    KEYWORD: 'keyword',
    HYBRID: 'hybrid',
    VECTOR: 'vector',
    FULL_TEXT: 'full_text',
    FUZZY: 'fuzzy',
    PHRASE: 'phrase',
    BOOLEAN: 'boolean',
    NATURAL_LANGUAGE: 'natural_language',
    MULTIMODAL: 'multimodal',
    IMAGE: 'image',
    VOICE: 'voice',
  } as const,

  // Search Status
  STATUSES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    INDEXING: 'indexing',
    SEARCHING: 'searching',
    RANKING: 'ranking',
    COMPLETED: 'completed',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    EXPIRED: 'expired',
    OPTIMIZED: 'optimized',
    CACHED: 'cached',
  } as const,

  // Search Strategies
  STRATEGIES: {
    // Relevance Strategies
    TF_IDF: 'tf_idf',
    BM25: 'bm25',
    VECTOR_SIMILARITY: 'vector_similarity',
    COSINE_SIMILARITY: 'cosine_similarity',
    DOT_PRODUCT: 'dot_product',
    EUCLIDEAN_DISTANCE: 'euclidean_distance',

    // Ranking Strategies
    LEARNING_TO_RANK: 'learning_to_rank',
    RANK_BM25: 'rank_bm25',
    RANK_BERT: 'rank_bert',
    RANK_GPT: 'rank_gpt',
    RANK_VECTOR: 'rank_vector',

    // Hybrid Strategies
    WEIGHTED_HYBRID: 'weighted_hybrid',
    CASCADE_HYBRID: 'cascade_hybrid',
    RECIPROCAL_RANK: 'reciprocal_rank',
    COMBINED_SCORE: 'combined_score',

    // Optimization Strategies
    QUERY_EXPANSION: 'query_expansion',
    QUERY_REFORMULATION: 'query_reformulation',
    SPELL_CHECK: 'spell_check',
    SYNONYM_EXPANSION: 'synonym_expansion',
    STOPWORD_REMOVAL: 'stopword_removal',
    STEMMING: 'stemming',
    LEMMATIZATION: 'lemmatization',

    // Personalization Strategies
    USER_CONTEXT: 'user_context',
    SEARCH_HISTORY: 'search_history',
    BEHAVIORAL: 'behavioral',
    LOCATION_AWARE: 'location_aware',
    TIME_AWARE: 'time_aware',

    // Advanced Strategies
    NEURAL_SEARCH: 'neural_search',
    BERT_SEARCH: 'bert_search',
    GPT_SEARCH: 'gpt_search',
    DENSE_RETRIEVAL: 'dense_retrieval',
    SPARSE_RETRIEVAL: 'sparse_retrieval',
    HNSW: 'hnsw',
    IVF: 'ivf',
    ANN: 'ann',
  } as const,

  // Search Filters
  FILTERS: {
    CATEGORY: 'category',
    BRAND: 'brand',
    PRICE_RANGE: 'price_range',
    RATING: 'rating',
    AVAILABILITY: 'availability',
    DISCOUNT: 'discount',
    FREE_SHIPPING: 'free_shipping',
    IN_STOCK: 'in_stock',
    NEW_ARRIVAL: 'new_arrival',
    BESTSELLER: 'bestseller',
    SEASONAL: 'seasonal',
    EXCLUSIVE: 'exclusive',
    PREMIUM: 'premium',
    VENDOR: 'vendor',
    LOCATION: 'location',
    LANGUAGE: 'language',
    CURRENCY: 'currency',
  } as const,

  // Search Sort Options
  SORT: {
    RELEVANCE: 'relevance',
    POPULARITY: 'popularity',
    PRICE_LOW_TO_HIGH: 'price_low_to_high',
    PRICE_HIGH_TO_LOW: 'price_high_to_low',
    RATING: 'rating',
    NEWEST: 'newest',
    OLDEST: 'oldest',
    BESTSELLING: 'bestselling',
    DISCOUNT: 'discount',
    REVENUE: 'revenue',
    TRENDING: 'trending',
  } as const,

  // Search Limits
  LIMITS: {
    DEFAULT: 10,
    MIN: 1,
    MAX: 100,
    PAGE_SIZE: 20,
    MAX_QUERY_LENGTH: 1000,
    MAX_SEARCH_RESULTS: 10000,
    CACHE_SIZE: 10000,
    BATCH_SIZE: 100,
    TIMEOUT: 5000,
    RETRY_ATTEMPTS: 3,
  } as const,

  // Search Metrics
  METRICS: {
    PRECISION: 'precision',
    RECALL: 'recall',
    F1_SCORE: 'f1_score',
    MAP: 'map',
    NDCG: 'ndcg',
    MRR: 'mrr',
    HIT_RATE: 'hit_rate',
    CTR: 'ctr',
    ZERO_RESULTS: 'zero_results',
    AVG_CLICK_TIME: 'avg_click_time',
    BOUNCE_RATE: 'bounce_rate',
    QUERY_LENGTH: 'query_length',
    SEARCH_TIME: 'search_time',
  } as const,

  // Search Languages
  LANGUAGES: {
    BENGALI: 'bn',
    ENGLISH: 'en',
    HINDI: 'hi',
    URDU: 'ur',
    ARABIC: 'ar',
    CHINESE: 'zh',
    SPANISH: 'es',
    FRENCH: 'fr',
    GERMAN: 'de',
    JAPANESE: 'ja',
    KOREAN: 'ko',
    RUSSIAN: 'ru',
    PORTUGUESE: 'pt',
    ITALIAN: 'it',
    DUTCH: 'nl',
  } as const,

  // Search Contexts
  CONTEXTS: {
    GLOBAL: 'global',
    CATEGORY: 'category',
    BRAND: 'brand',
    STORE: 'store',
    USER: 'user',
    SESSION: 'session',
    DEVICE: 'device',
    LOCATION: 'location',
    TIME: 'time',
  } as const,

  // Search Modes
  MODES: {
    PRECISE: 'precise',
    BROAD: 'broad',
    AUTO: 'auto',
    SEMANTIC: 'semantic',
    KEYWORD: 'keyword',
    HYBRID: 'hybrid',
  } as const,
} as const;

export type AISearchType = (typeof AI_SEARCH.TYPES)[keyof typeof AI_SEARCH.TYPES];
export type AISearchStatus = (typeof AI_SEARCH.STATUSES)[keyof typeof AI_SEARCH.STATUSES];
export type AISearchStrategy = (typeof AI_SEARCH.STRATEGIES)[keyof typeof AI_SEARCH.STRATEGIES];
export type AISearchFilter = (typeof AI_SEARCH.FILTERS)[keyof typeof AI_SEARCH.FILTERS];
export type AISearchSort = (typeof AI_SEARCH.SORT)[keyof typeof AI_SEARCH.SORT];
export type AISearchLimit = (typeof AI_SEARCH.LIMITS)[keyof typeof AI_SEARCH.LIMITS];
export type AISearchMetric = (typeof AI_SEARCH.METRICS)[keyof typeof AI_SEARCH.METRICS];
export type AISearchLanguage = (typeof AI_SEARCH.LANGUAGES)[keyof typeof AI_SEARCH.LANGUAGES];
export type AISearchContext = (typeof AI_SEARCH.CONTEXTS)[keyof typeof AI_SEARCH.CONTEXTS];
export type AISearchMode = (typeof AI_SEARCH.MODES)[keyof typeof AI_SEARCH.MODES];

export function getAiSearchTypeLabel(type: AISearchType): string {
  const labels: Record<AISearchType, string> = {
    [AI_SEARCH.TYPES.SEMANTIC]: 'Semantic Search',
    [AI_SEARCH.TYPES.KEYWORD]: 'Keyword Search',
    [AI_SEARCH.TYPES.HYBRID]: 'Hybrid Search',
    [AI_SEARCH.TYPES.VECTOR]: 'Vector Search',
    [AI_SEARCH.TYPES.FULL_TEXT]: 'Full Text Search',
    [AI_SEARCH.TYPES.FUZZY]: 'Fuzzy Search',
    [AI_SEARCH.TYPES.PHRASE]: 'Phrase Search',
    [AI_SEARCH.TYPES.BOOLEAN]: 'Boolean Search',
    [AI_SEARCH.TYPES.NATURAL_LANGUAGE]: 'Natural Language Search',
    [AI_SEARCH.TYPES.MULTIMODAL]: 'Multimodal Search',
    [AI_SEARCH.TYPES.IMAGE]: 'Image Search',
    [AI_SEARCH.TYPES.VOICE]: 'Voice Search',
  };
  return labels[type] || 'Unknown';
}

export function getAiSearchStatusLabel(status: AISearchStatus): string {
  const labels: Record<AISearchStatus, string> = {
    [AI_SEARCH.STATUSES.PENDING]: 'Pending',
    [AI_SEARCH.STATUSES.PROCESSING]: 'Processing',
    [AI_SEARCH.STATUSES.INDEXING]: 'Indexing',
    [AI_SEARCH.STATUSES.SEARCHING]: 'Searching',
    [AI_SEARCH.STATUSES.RANKING]: 'Ranking',
    [AI_SEARCH.STATUSES.COMPLETED]: 'Completed',
    [AI_SEARCH.STATUSES.DELIVERED]: 'Delivered',
    [AI_SEARCH.STATUSES.FAILED]: 'Failed',
    [AI_SEARCH.STATUSES.EXPIRED]: 'Expired',
    [AI_SEARCH.STATUSES.OPTIMIZED]: 'Optimized',
    [AI_SEARCH.STATUSES.CACHED]: 'Cached',
  };
  return labels[status] || 'Unknown';
}

export function getAiSearchStrategyLabel(strategy: AISearchStrategy): string {
  const labels: Record<AISearchStrategy, string> = {
    [AI_SEARCH.STRATEGIES.TF_IDF]: 'TF-IDF',
    [AI_SEARCH.STRATEGIES.BM25]: 'BM25',
    [AI_SEARCH.STRATEGIES.VECTOR_SIMILARITY]: 'Vector Similarity',
    [AI_SEARCH.STRATEGIES.COSINE_SIMILARITY]: 'Cosine Similarity',
    [AI_SEARCH.STRATEGIES.DOT_PRODUCT]: 'Dot Product',
    [AI_SEARCH.STRATEGIES.EUCLIDEAN_DISTANCE]: 'Euclidean Distance',
    [AI_SEARCH.STRATEGIES.LEARNING_TO_RANK]: 'Learning to Rank',
    [AI_SEARCH.STRATEGIES.RANK_BM25]: 'Rank BM25',
    [AI_SEARCH.STRATEGIES.RANK_BERT]: 'Rank BERT',
    [AI_SEARCH.STRATEGIES.RANK_GPT]: 'Rank GPT',
    [AI_SEARCH.STRATEGIES.RANK_VECTOR]: 'Rank Vector',
    [AI_SEARCH.STRATEGIES.WEIGHTED_HYBRID]: 'Weighted Hybrid',
    [AI_SEARCH.STRATEGIES.CASCADE_HYBRID]: 'Cascade Hybrid',
    [AI_SEARCH.STRATEGIES.RECIPROCAL_RANK]: 'Reciprocal Rank',
    [AI_SEARCH.STRATEGIES.COMBINED_SCORE]: 'Combined Score',
    [AI_SEARCH.STRATEGIES.QUERY_EXPANSION]: 'Query Expansion',
    [AI_SEARCH.STRATEGIES.QUERY_REFORMULATION]: 'Query Reformulation',
    [AI_SEARCH.STRATEGIES.SPELL_CHECK]: 'Spell Check',
    [AI_SEARCH.STRATEGIES.SYNONYM_EXPANSION]: 'Synonym Expansion',
    [AI_SEARCH.STRATEGIES.STOPWORD_REMOVAL]: 'Stopword Removal',
    [AI_SEARCH.STRATEGIES.STEMMING]: 'Stemming',
    [AI_SEARCH.STRATEGIES.LEMMATIZATION]: 'Lemmatization',
    [AI_SEARCH.STRATEGIES.USER_CONTEXT]: 'User Context',
    [AI_SEARCH.STRATEGIES.SEARCH_HISTORY]: 'Search History',
    [AI_SEARCH.STRATEGIES.BEHAVIORAL]: 'Behavioral',
    [AI_SEARCH.STRATEGIES.LOCATION_AWARE]: 'Location Aware',
    [AI_SEARCH.STRATEGIES.TIME_AWARE]: 'Time Aware',
    [AI_SEARCH.STRATEGIES.NEURAL_SEARCH]: 'Neural Search',
    [AI_SEARCH.STRATEGIES.BERT_SEARCH]: 'BERT Search',
    [AI_SEARCH.STRATEGIES.GPT_SEARCH]: 'GPT Search',
    [AI_SEARCH.STRATEGIES.DENSE_RETRIEVAL]: 'Dense Retrieval',
    [AI_SEARCH.STRATEGIES.SPARSE_RETRIEVAL]: 'Sparse Retrieval',
    [AI_SEARCH.STRATEGIES.HNSW]: 'HNSW',
    [AI_SEARCH.STRATEGIES.IVF]: 'IVF',
    [AI_SEARCH.STRATEGIES.ANN]: 'ANN',
  };
  return labels[strategy] || 'Unknown';
}

export function getAiSearchSortLabel(sort: AISearchSort): string {
  const labels: Record<AISearchSort, string> = {
    [AI_SEARCH.SORT.RELEVANCE]: 'Relevance',
    [AI_SEARCH.SORT.POPULARITY]: 'Popularity',
    [AI_SEARCH.SORT.PRICE_LOW_TO_HIGH]: 'Price: Low to High',
    [AI_SEARCH.SORT.PRICE_HIGH_TO_LOW]: 'Price: High to Low',
    [AI_SEARCH.SORT.RATING]: 'Rating',
    [AI_SEARCH.SORT.NEWEST]: 'Newest',
    [AI_SEARCH.SORT.OLDEST]: 'Oldest',
    [AI_SEARCH.SORT.BESTSELLING]: 'Bestselling',
    [AI_SEARCH.SORT.DISCOUNT]: 'Discount',
    [AI_SEARCH.SORT.REVENUE]: 'Revenue',
    [AI_SEARCH.SORT.TRENDING]: 'Trending',
  };
  return labels[sort] || 'Unknown';
}

export function getAiSearchMetricLabel(metric: AISearchMetric): string {
  const labels: Record<AISearchMetric, string> = {
    [AI_SEARCH.METRICS.PRECISION]: 'Precision',
    [AI_SEARCH.METRICS.RECALL]: 'Recall',
    [AI_SEARCH.METRICS.F1_SCORE]: 'F1 Score',
    [AI_SEARCH.METRICS.MAP]: 'Mean Average Precision',
    [AI_SEARCH.METRICS.NDCG]: 'NDCG',
    [AI_SEARCH.METRICS.MRR]: 'Mean Reciprocal Rank',
    [AI_SEARCH.METRICS.HIT_RATE]: 'Hit Rate',
    [AI_SEARCH.METRICS.CTR]: 'Click Through Rate',
    [AI_SEARCH.METRICS.ZERO_RESULTS]: 'Zero Results',
    [AI_SEARCH.METRICS.AVG_CLICK_TIME]: 'Average Click Time',
    [AI_SEARCH.METRICS.BOUNCE_RATE]: 'Bounce Rate',
    [AI_SEARCH.METRICS.QUERY_LENGTH]: 'Query Length',
    [AI_SEARCH.METRICS.SEARCH_TIME]: 'Search Time',
  };
  return labels[metric] || 'Unknown';
}

export function getAiSearchModeLabel(mode: AISearchMode): string {
  const labels: Record<AISearchMode, string> = {
    [AI_SEARCH.MODES.PRECISE]: 'Precise',
    [AI_SEARCH.MODES.BROAD]: 'Broad',
    [AI_SEARCH.MODES.AUTO]: 'Auto',
    [AI_SEARCH.MODES.SEMANTIC]: 'Semantic',
    [AI_SEARCH.MODES.KEYWORD]: 'Keyword',
    [AI_SEARCH.MODES.HYBRID]: 'Hybrid',
  };
  return labels[mode] || 'Unknown';
}

export function isAiSearchActive(status: AISearchStatus): boolean {
  const activeStatuses: AISearchStatus[] = [
    AI_SEARCH.STATUSES.PENDING,
    AI_SEARCH.STATUSES.PROCESSING,
    AI_SEARCH.STATUSES.INDEXING,
    AI_SEARCH.STATUSES.SEARCHING,
    AI_SEARCH.STATUSES.RANKING,
    AI_SEARCH.STATUSES.OPTIMIZED,
  ];
  return activeStatuses.includes(status);
}

export function isAiSearchComplete(status: AISearchStatus): boolean {
  const completeStatuses: AISearchStatus[] = [
    AI_SEARCH.STATUSES.COMPLETED,
    AI_SEARCH.STATUSES.DELIVERED,
    AI_SEARCH.STATUSES.CACHED,
  ];
  return completeStatuses.includes(status);
}

export function isAiSearchFailed(status: AISearchStatus): boolean {
  return status === AI_SEARCH.STATUSES.FAILED;
}

export function getAiSearchDefaultLimit(): number {
  return AI_SEARCH.LIMITS.DEFAULT;
}

export function getAiSearchMaxLimit(): number {
  return AI_SEARCH.LIMITS.MAX;
}
