/**
 * AI Ranking Constants
 * Configuration for AI ranking systems and algorithms
 */

// First define the factors
export const AI_RANKING_FACTORS = {
  RELEVANCE: 'relevance',
  POPULARITY: 'popularity',
  FRESHNESS: 'freshness',
  DIVERSITY: 'diversity',
  NOVELTY: 'novelty',
  SERENDIPITY: 'serendipity',
  USER_PREFERENCE: 'user_preference',
  USER_HISTORY: 'user_history',
  CONTEXT: 'context',
  LOCATION: 'location',
  TIME: 'time',
  DEVICE: 'device',
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  REVENUE: 'revenue',
  PROFIT: 'profit',
} as const;

export type AIRankingFactor = (typeof AI_RANKING_FACTORS)[keyof typeof AI_RANKING_FACTORS];

export const AI_RANKING = {
  // Ranking Types
  TYPES: {
    RELEVANCE: 'relevance',
    POPULARITY: 'popularity',
    TRENDING: 'trending',
    PERSONALIZED: 'personalized',
    CONTEXTUAL: 'contextual',
    COLLABORATIVE: 'collaborative',
    CONTENT_BASED: 'content_based',
    HYBRID: 'hybrid',
    LEARNING_TO_RANK: 'learning_to_rank',
    NEURAL_RANK: 'neural_rank',
    BERT_RANK: 'bert_rank',
    GPT_RANK: 'gpt_rank',
    RANDOM: 'random',
    WEIGHTED: 'weighted',
  } as const,

  // Ranking Status
  STATUSES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    RANKING: 'ranking',
    SCORING: 'scoring',
    SORTING: 'sorting',
    COMPLETED: 'completed',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    OPTIMIZED: 'optimized',
    CACHED: 'cached',
    EXPIRED: 'expired',
  } as const,

  // Ranking Strategies
  STRATEGIES: {
    // Basic Ranking
    BM25: 'bm25',
    TF_IDF: 'tf_idf',
    COSINE_SIMILARITY: 'cosine_similarity',
    EUCLIDEAN_DISTANCE: 'euclidean_distance',
    DOT_PRODUCT: 'dot_product',

    // Learning to Rank
    LAMBDA_MART: 'lambda_mart',
    LAMBDA_RANK: 'lambda_rank',
    RANK_SVM: 'rank_svm',
    RANK_NET: 'rank_net',
    LIST_NET: 'list_net',
    COORDINATE_ASCENT: 'coordinate_ascent',

    // Neural Ranking
    BERT_RANK: 'bert_rank',
    GPT_RANK: 'gpt_rank',
    TRANSFORMER_RANK: 'transformer_rank',
    DEEP_RANK: 'deep_rank',
    DUAL_ENCODER: 'dual_encoder',
    CROSS_ENCODER: 'cross_encoder',

    // Hybrid Ranking
    WEIGHTED_HYBRID: 'weighted_hybrid',
    CASCADE_HYBRID: 'cascade_hybrid',
    RECIPROCAL_RANK: 'reciprocal_rank',
    COMBINED_SCORE: 'combined_score',

    // Personalization
    USER_CONTEXT: 'user_context',
    SEARCH_HISTORY: 'search_history',
    BEHAVIORAL: 'behavioral',
    LOCATION_AWARE: 'location_aware',
    TIME_AWARE: 'time_aware',
    DEVICE_AWARE: 'device_aware',

    // Optimization
    RELEVANCE_OPTIMIZATION: 'relevance_optimization',
    DIVERSITY_OPTIMIZATION: 'diversity_optimization',
    NOVELTY_OPTIMIZATION: 'novelty_optimization',
    FRESHNESS_OPTIMIZATION: 'freshness_optimization',
  } as const,

  // Ranking Factors
  FACTORS: AI_RANKING_FACTORS,

  // Ranking Weights
  WEIGHTS: {
    [AI_RANKING_FACTORS.RELEVANCE]: 0.3,
    [AI_RANKING_FACTORS.POPULARITY]: 0.15,
    [AI_RANKING_FACTORS.FRESHNESS]: 0.1,
    [AI_RANKING_FACTORS.DIVERSITY]: 0.05,
    [AI_RANKING_FACTORS.NOVELTY]: 0.05,
    [AI_RANKING_FACTORS.SERENDIPITY]: 0.05,
    [AI_RANKING_FACTORS.USER_PREFERENCE]: 0.1,
    [AI_RANKING_FACTORS.USER_HISTORY]: 0.05,
    [AI_RANKING_FACTORS.CONTEXT]: 0.05,
    [AI_RANKING_FACTORS.LOCATION]: 0.02,
    [AI_RANKING_FACTORS.TIME]: 0.02,
    [AI_RANKING_FACTORS.DEVICE]: 0.02,
    [AI_RANKING_FACTORS.ENGAGEMENT]: 0.02,
    [AI_RANKING_FACTORS.CONVERSION]: 0.02,
    [AI_RANKING_FACTORS.REVENUE]: 0.02,
    [AI_RANKING_FACTORS.PROFIT]: 0.02,
  } as const,

  // Ranking Limits
  LIMITS: {
    DEFAULT: 10,
    MIN: 1,
    MAX: 100,
    PAGE_SIZE: 20,
    MAX_RANKING_ITEMS: 10000,
    CACHE_SIZE: 10000,
    BATCH_SIZE: 100,
    TIMEOUT: 5000,
    RETRY_ATTEMPTS: 3,
  } as const,

  // Ranking Metrics
  METRICS: {
    NDCG: 'ndcg',
    MAP: 'map',
    MRR: 'mrr',
    PRECISION: 'precision',
    RECALL: 'recall',
    F1_SCORE: 'f1_score',
    HIT_RATE: 'hit_rate',
    CTR: 'ctr',
    CONVERSION_RATE: 'conversion_rate',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    ROI: 'roi',
  } as const,

  // Ranking Modes
  MODES: {
    BATCH: 'batch',
    REAL_TIME: 'real_time',
    STREAMING: 'streaming',
    HYBRID: 'hybrid',
    ON_DEMAND: 'on_demand',
    SCHEDULED: 'scheduled',
  } as const,

  // Ranking Algorithms
  ALGORITHMS: {
    PAGE_RANK: 'page_rank',
    HITS: 'hits',
    TOPIC_SENSITIVE: 'topic_sensitive',
    OBJECT_RANK: 'object_rank',
    RANK_BOOST: 'rank_boost',
    RANK_WEIGHT: 'rank_weight',
  } as const,
} as const;

export type AIRankingType = (typeof AI_RANKING.TYPES)[keyof typeof AI_RANKING.TYPES];
export type AIRankingStatus = (typeof AI_RANKING.STATUSES)[keyof typeof AI_RANKING.STATUSES];
export type AIRankingStrategy = (typeof AI_RANKING.STRATEGIES)[keyof typeof AI_RANKING.STRATEGIES];
export type AIRankingWeight = (typeof AI_RANKING.WEIGHTS)[keyof typeof AI_RANKING.WEIGHTS];
export type AIRankingLimit = (typeof AI_RANKING.LIMITS)[keyof typeof AI_RANKING.LIMITS];
export type AIRankingMetric = (typeof AI_RANKING.METRICS)[keyof typeof AI_RANKING.METRICS];
export type AIRankingMode = (typeof AI_RANKING.MODES)[keyof typeof AI_RANKING.MODES];
export type AIRankingAlgorithm = (typeof AI_RANKING.ALGORITHMS)[keyof typeof AI_RANKING.ALGORITHMS];

export function getAiRankingTypeLabel(type: AIRankingType): string {
  const labels: Record<AIRankingType, string> = {
    [AI_RANKING.TYPES.RELEVANCE]: 'Relevance',
    [AI_RANKING.TYPES.POPULARITY]: 'Popularity',
    [AI_RANKING.TYPES.TRENDING]: 'Trending',
    [AI_RANKING.TYPES.PERSONALIZED]: 'Personalized',
    [AI_RANKING.TYPES.CONTEXTUAL]: 'Contextual',
    [AI_RANKING.TYPES.COLLABORATIVE]: 'Collaborative',
    [AI_RANKING.TYPES.CONTENT_BASED]: 'Content Based',
    [AI_RANKING.TYPES.HYBRID]: 'Hybrid',
    [AI_RANKING.TYPES.LEARNING_TO_RANK]: 'Learning to Rank',
    [AI_RANKING.TYPES.NEURAL_RANK]: 'Neural Rank',
    [AI_RANKING.TYPES.BERT_RANK]: 'BERT Rank',
    [AI_RANKING.TYPES.GPT_RANK]: 'GPT Rank',
    [AI_RANKING.TYPES.RANDOM]: 'Random',
    [AI_RANKING.TYPES.WEIGHTED]: 'Weighted',
  };
  return labels[type] || 'Unknown';
}

export function getAiRankingStatusLabel(status: AIRankingStatus): string {
  const labels: Record<AIRankingStatus, string> = {
    [AI_RANKING.STATUSES.PENDING]: 'Pending',
    [AI_RANKING.STATUSES.PROCESSING]: 'Processing',
    [AI_RANKING.STATUSES.RANKING]: 'Ranking',
    [AI_RANKING.STATUSES.SCORING]: 'Scoring',
    [AI_RANKING.STATUSES.SORTING]: 'Sorting',
    [AI_RANKING.STATUSES.COMPLETED]: 'Completed',
    [AI_RANKING.STATUSES.DELIVERED]: 'Delivered',
    [AI_RANKING.STATUSES.FAILED]: 'Failed',
    [AI_RANKING.STATUSES.OPTIMIZED]: 'Optimized',
    [AI_RANKING.STATUSES.CACHED]: 'Cached',
    [AI_RANKING.STATUSES.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown';
}

export function getAiRankingStrategyLabel(strategy: AIRankingStrategy): string {
  const labels: Record<AIRankingStrategy, string> = {
    [AI_RANKING.STRATEGIES.BM25]: 'BM25',
    [AI_RANKING.STRATEGIES.TF_IDF]: 'TF-IDF',
    [AI_RANKING.STRATEGIES.COSINE_SIMILARITY]: 'Cosine Similarity',
    [AI_RANKING.STRATEGIES.EUCLIDEAN_DISTANCE]: 'Euclidean Distance',
    [AI_RANKING.STRATEGIES.DOT_PRODUCT]: 'Dot Product',
    [AI_RANKING.STRATEGIES.LAMBDA_MART]: 'Lambda MART',
    [AI_RANKING.STRATEGIES.LAMBDA_RANK]: 'Lambda Rank',
    [AI_RANKING.STRATEGIES.RANK_SVM]: 'Rank SVM',
    [AI_RANKING.STRATEGIES.RANK_NET]: 'Rank Net',
    [AI_RANKING.STRATEGIES.LIST_NET]: 'List Net',
    [AI_RANKING.STRATEGIES.COORDINATE_ASCENT]: 'Coordinate Ascent',
    [AI_RANKING.STRATEGIES.BERT_RANK]: 'BERT Rank',
    [AI_RANKING.STRATEGIES.GPT_RANK]: 'GPT Rank',
    [AI_RANKING.STRATEGIES.TRANSFORMER_RANK]: 'Transformer Rank',
    [AI_RANKING.STRATEGIES.DEEP_RANK]: 'Deep Rank',
    [AI_RANKING.STRATEGIES.DUAL_ENCODER]: 'Dual Encoder',
    [AI_RANKING.STRATEGIES.CROSS_ENCODER]: 'Cross Encoder',
    [AI_RANKING.STRATEGIES.WEIGHTED_HYBRID]: 'Weighted Hybrid',
    [AI_RANKING.STRATEGIES.CASCADE_HYBRID]: 'Cascade Hybrid',
    [AI_RANKING.STRATEGIES.RECIPROCAL_RANK]: 'Reciprocal Rank',
    [AI_RANKING.STRATEGIES.COMBINED_SCORE]: 'Combined Score',
    [AI_RANKING.STRATEGIES.USER_CONTEXT]: 'User Context',
    [AI_RANKING.STRATEGIES.SEARCH_HISTORY]: 'Search History',
    [AI_RANKING.STRATEGIES.BEHAVIORAL]: 'Behavioral',
    [AI_RANKING.STRATEGIES.LOCATION_AWARE]: 'Location Aware',
    [AI_RANKING.STRATEGIES.TIME_AWARE]: 'Time Aware',
    [AI_RANKING.STRATEGIES.DEVICE_AWARE]: 'Device Aware',
    [AI_RANKING.STRATEGIES.RELEVANCE_OPTIMIZATION]: 'Relevance Optimization',
    [AI_RANKING.STRATEGIES.DIVERSITY_OPTIMIZATION]: 'Diversity Optimization',
    [AI_RANKING.STRATEGIES.NOVELTY_OPTIMIZATION]: 'Novelty Optimization',
    [AI_RANKING.STRATEGIES.FRESHNESS_OPTIMIZATION]: 'Freshness Optimization',
  };
  return labels[strategy] || 'Unknown';
}

export function getAiRankingFactorLabel(factor: AIRankingFactor): string {
  const labels: Record<AIRankingFactor, string> = {
    [AI_RANKING_FACTORS.RELEVANCE]: 'Relevance',
    [AI_RANKING_FACTORS.POPULARITY]: 'Popularity',
    [AI_RANKING_FACTORS.FRESHNESS]: 'Freshness',
    [AI_RANKING_FACTORS.DIVERSITY]: 'Diversity',
    [AI_RANKING_FACTORS.NOVELTY]: 'Novelty',
    [AI_RANKING_FACTORS.SERENDIPITY]: 'Serendipity',
    [AI_RANKING_FACTORS.USER_PREFERENCE]: 'User Preference',
    [AI_RANKING_FACTORS.USER_HISTORY]: 'User History',
    [AI_RANKING_FACTORS.CONTEXT]: 'Context',
    [AI_RANKING_FACTORS.LOCATION]: 'Location',
    [AI_RANKING_FACTORS.TIME]: 'Time',
    [AI_RANKING_FACTORS.DEVICE]: 'Device',
    [AI_RANKING_FACTORS.ENGAGEMENT]: 'Engagement',
    [AI_RANKING_FACTORS.CONVERSION]: 'Conversion',
    [AI_RANKING_FACTORS.REVENUE]: 'Revenue',
    [AI_RANKING_FACTORS.PROFIT]: 'Profit',
  };
  return labels[factor] || 'Unknown';
}

export function getAiRankingMetricLabel(metric: AIRankingMetric): string {
  const labels: Record<AIRankingMetric, string> = {
    [AI_RANKING.METRICS.NDCG]: 'NDCG',
    [AI_RANKING.METRICS.MAP]: 'Mean Average Precision',
    [AI_RANKING.METRICS.MRR]: 'Mean Reciprocal Rank',
    [AI_RANKING.METRICS.PRECISION]: 'Precision',
    [AI_RANKING.METRICS.RECALL]: 'Recall',
    [AI_RANKING.METRICS.F1_SCORE]: 'F1 Score',
    [AI_RANKING.METRICS.HIT_RATE]: 'Hit Rate',
    [AI_RANKING.METRICS.CTR]: 'Click Through Rate',
    [AI_RANKING.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [AI_RANKING.METRICS.REVENUE]: 'Revenue',
    [AI_RANKING.METRICS.PROFIT]: 'Profit',
    [AI_RANKING.METRICS.ROI]: 'ROI',
  };
  return labels[metric] || 'Unknown';
}

export function getAiRankingModeLabel(mode: AIRankingMode): string {
  const labels: Record<AIRankingMode, string> = {
    [AI_RANKING.MODES.BATCH]: 'Batch',
    [AI_RANKING.MODES.REAL_TIME]: 'Real Time',
    [AI_RANKING.MODES.STREAMING]: 'Streaming',
    [AI_RANKING.MODES.HYBRID]: 'Hybrid',
    [AI_RANKING.MODES.ON_DEMAND]: 'On Demand',
    [AI_RANKING.MODES.SCHEDULED]: 'Scheduled',
  };
  return labels[mode] || 'Unknown';
}

export function isAiRankingActive(status: AIRankingStatus): boolean {
  const activeStatuses: AIRankingStatus[] = [
    AI_RANKING.STATUSES.PENDING,
    AI_RANKING.STATUSES.PROCESSING,
    AI_RANKING.STATUSES.RANKING,
    AI_RANKING.STATUSES.SCORING,
    AI_RANKING.STATUSES.SORTING,
    AI_RANKING.STATUSES.OPTIMIZED,
  ];
  return activeStatuses.includes(status);
}

export function isAiRankingComplete(status: AIRankingStatus): boolean {
  const completeStatuses: AIRankingStatus[] = [
    AI_RANKING.STATUSES.COMPLETED,
    AI_RANKING.STATUSES.DELIVERED,
    AI_RANKING.STATUSES.CACHED,
  ];
  return completeStatuses.includes(status);
}

export function isAiRankingFailed(status: AIRankingStatus): boolean {
  return status === AI_RANKING.STATUSES.FAILED;
}

export function getAiRankingWeight(factor: AIRankingFactor): number {
  return AI_RANKING.WEIGHTS[factor] || 0;
}

export function getAiRankingDefaultLimit(): number {
  return AI_RANKING.LIMITS.DEFAULT;
}

export function calculateAiRankingCombinedScore(
  scores: Partial<Record<AIRankingFactor, number>>
): number {
  let totalScore = 0;
  for (const [factor, value] of Object.entries(scores)) {
    const factorKey = factor as AIRankingFactor;
    const weight = getAiRankingWeight(factorKey);
    if (weight && value) {
      totalScore += value * weight;
    }
  }
  return Math.min(totalScore, 100);
}
