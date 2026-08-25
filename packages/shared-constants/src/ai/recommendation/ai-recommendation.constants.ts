/**
 * AI Recommendation Constants
 * Configuration for AI recommendation systems and algorithms
 */

export const AI_RECOMMENDATION = {
  // Recommendation Types
  TYPES: {
    PERSONALIZED: 'personalized',
    POPULAR: 'popular',
    TRENDING: 'trending',
    SEASONAL: 'seasonal',
    EDITORIAL: 'editorial',
    COLLABORATIVE: 'collaborative',
    CONTENT_BASED: 'content_based',
    HYBRID: 'hybrid',
    CONTEXTUAL: 'contextual',
    SOCIAL: 'social',
    DEMOGRAPHIC: 'demographic',
    BEHAVIORAL: 'behavioral',
    SEQUENTIAL: 'sequential',
    SESSION_BASED: 'session_based',
    KNOWLEDGE_BASED: 'knowledge_based',
  } as const,

  // Recommendation Strategies
  STRATEGIES: {
    // Collaborative Filtering
    USER_BASED: 'user_based',
    ITEM_BASED: 'item_based',
    MATRIX_FACTORIZATION: 'matrix_factorization',
    SVD: 'svd',
    ALS: 'als',
    KNN: 'knn',

    // Content-Based
    TF_IDF: 'tf_idf',
    COSINE_SIMILARITY: 'cosine_similarity',
    EUCLIDEAN_DISTANCE: 'euclidean_distance',
    PEARSON_CORRELATION: 'pearson_correlation',

    // Deep Learning
    NEURAL_COLLABORATIVE: 'neural_collaborative',
    AUTOENCODER: 'autoencoder',
    TRANSFORMER: 'transformer',
    BERT: 'bert',
    GPT: 'gpt',

    // Hybrid
    WEIGHTED_HYBRID: 'weighted_hybrid',
    SWITCHING_HYBRID: 'switching_hybrid',
    CASCADE_HYBRID: 'cascade_hybrid',
    FEATURE_COMBINATION: 'feature_combination',

    // Contextual
    CONTEXT_AWARE: 'context_aware',
    TIME_AWARE: 'time_aware',
    LOCATION_AWARE: 'location_aware',
    DEVICE_AWARE: 'device_aware',

    // Advanced
    REINFORCEMENT_LEARNING: 'reinforcement_learning',
    BANDIT: 'bandit',
    EXPLORE_EXPLOIT: 'explore_exploit',
    ACTIVE_LEARNING: 'active_learning',
    ONLINE_LEARNING: 'online_learning',
  } as const,

  // Recommendation Scopes
  SCOPES: {
    GLOBAL: 'global',
    SITE_WIDE: 'site_wide',
    CATEGORY: 'category',
    SUB_CATEGORY: 'sub_category',
    BRAND: 'brand',
    COLLECTION: 'collection',
    USER: 'user',
    SESSION: 'session',
    DEVICE: 'device',
    LOCATION: 'location',
    TIME: 'time',
    SEASONAL: 'seasonal',
    CROSS_SELLING: 'cross_selling',
    UP_SELLING: 'up_selling',
    COMPLEMENTARY: 'complementary',
    SUBSTITUTE: 'substitute',
    BUNDLE: 'bundle',
    BROWSE: 'browse',
    SEARCH: 'search',
    CHECKOUT: 'checkout',
    CART: 'cart',
    WISHLIST: 'wishlist',
  } as const,

  // Recommendation Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Recommendation Status
  STATUSES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    GENERATED: 'generated',
    RANKED: 'ranked',
    FILTERED: 'filtered',
    VALIDATED: 'validated',
    DELIVERED: 'delivered',
    VIEWED: 'viewed',
    CLICKED: 'clicked',
    CONVERTED: 'converted',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    OPTIMIZED: 'optimized',
    PERSONALIZED: 'personalized',
    CACHED: 'cached',
  } as const,

  // Recommendation Feedback Types
  FEEDBACK_TYPES: {
    IMPLICIT: 'implicit',
    EXPLICIT: 'explicit',
    RATING: 'rating',
    REVIEW: 'review',
    PURCHASE: 'purchase',
    VIEW: 'view',
    CLICK: 'click',
    ADD_TO_CART: 'add_to_cart',
    ADD_TO_WISHLIST: 'add_to_wishlist',
    SHARE: 'share',
    COMPARE: 'compare',
    SEARCH: 'search',
    FILTER: 'filter',
    TIME_SPENT: 'time_spent',
    SCROLL_DEPTH: 'scroll_depth',
    BOUNCE: 'bounce',
    POSITIVE: 'positive',
    NEGATIVE: 'negative',
    NEUTRAL: 'neutral',
  } as const,

  // Recommendation Score Types
  SCORE_TYPES: {
    RELEVANCE: 'relevance',
    POPULARITY: 'popularity',
    FRESHNESS: 'freshness',
    DIVERSITY: 'diversity',
    NOVELTY: 'novelty',
    SERENDIPITY: 'serendipity',
    UTILITY: 'utility',
    SATISFACTION: 'satisfaction',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    REVENUE: 'revenue',
    PROFIT: 'profit',
  } as const,

  // Recommendation Filters
  FILTERS: {
    PRICE_RANGE: 'price_range',
    CATEGORY: 'category',
    BRAND: 'brand',
    RATING: 'rating',
    AVAILABILITY: 'availability',
    DISCOUNT: 'discount',
    FREE_SHIPPING: 'free_shipping',
    IN_STOCK: 'in_stock',
    NEW_ARRIVAL: 'new_arrival',
    BESTSELLER: 'bestseller',
    DEAL_OF_DAY: 'deal_of_day',
    FLASH_SALE: 'flash_sale',
    SEASONAL: 'seasonal',
    EXCLUSIVE: 'exclusive',
    PREMIUM: 'premium',
  } as const,

  // Recommendation Algorithms
  ALGORITHMS: {
    // Collaborative Filtering
    USER_BASED_CF: 'user_based_cf',
    ITEM_BASED_CF: 'item_based_cf',
    SVD: 'svd',
    SVD_PLUS_PLUS: 'svd_plus_plus',
    ALS: 'als',
    BPR: 'bpr',
    NCF: 'ncf',
    NEURAL_CF: 'neural_cf',

    // Content-Based
    TF_IDF: 'tf_idf',
    BM25: 'bm25',
    WORD2VEC: 'word2vec',
    GLOVE: 'glove',
    FASTTEXT: 'fasttext',
    BERT_EMBEDDINGS: 'bert_embeddings',

    // Matrix Factorization
    PMF: 'pmf',
    BPMF: 'bpmf',
    RBM: 'rbm',

    // Deep Learning
    DNN: 'dnn',
    RNN: 'rnn',
    LSTM: 'lstm',
    GRU: 'gru',
    CNN: 'cnn',
    TRANSFORMER_REC: 'transformer_rec',
    SASREC: 'sasrec',
    BERT_REC: 'bert_rec',

    // Graph-Based
    PAGERANK: 'pagerank',
    PERSONALIZED_PAGERANK: 'personalized_pagerank',
    GRAPH_SAGE: 'graph_sage',
    GCN: 'gcn',
    GAT: 'gat',

    // Ensemble
    BAGGING: 'bagging',
    BOOSTING: 'boosting',
    STACKING: 'stacking',
    VOTING: 'voting',

    // Rule-Based
    ASSOCIATION_RULES: 'association_rules',
    APRIORI: 'apriori',
    FP_GROWTH: 'fp_growth',
  } as const,

  // Recommendation Metrics
  METRICS: {
    // Accuracy Metrics
    RMSE: 'rmse',
    MAE: 'mae',
    MSE: 'mse',

    // Ranking Metrics
    PRECISION: 'precision',
    RECALL: 'recall',
    F1_SCORE: 'f1_score',
    MAP: 'map',
    NDCG: 'ndcg',
    MRR: 'mrr',
    HIT_RATE: 'hit_rate',

    // Business Metrics
    CTR: 'ctr',
    CONVERSION_RATE: 'conversion_rate',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    ROI: 'roi',
    CUSTOMER_LIFETIME_VALUE: 'customer_lifetime_value',

    // User Metrics
    ENGAGEMENT: 'engagement',
    RETENTION: 'retention',
    CHURN_RATE: 'churn_rate',
    SATISFACTION: 'satisfaction',
    LOYALTY: 'loyalty',

    // Diversity Metrics
    DIVERSITY: 'diversity',
    NOVELTY: 'novelty',
    SERENDIPITY: 'serendipity',
    COVERAGE: 'coverage',
  } as const,

  // Recommendation Limits
  LIMITS: {
    DEFAULT: 10,
    MIN: 1,
    MAX: 100,
    PAGE_SIZE: 20,
    MAX_ITEMS: 500,
    MAX_RECOMMENDATIONS: 1000,
    CACHE_SIZE: 10000,
    BATCH_SIZE: 100,
    TIMEOUT: 5000,
  } as const,

  // Recommendation Timeframes
  TIMEFRAMES: {
    REAL_TIME: 'real_time',
    NEAR_REAL_TIME: 'near_real_time',
    BATCH: 'batch',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Recommendation Models
  MODELS: {
    POPULARITY: 'popularity',
    COLLABORATIVE: 'collaborative',
    CONTENT_BASED: 'content_based',
    HYBRID: 'hybrid',
    NEURAL: 'neural',
    BANDIT: 'bandit',
    RULE_BASED: 'rule_based',
    RANDOM: 'random',
  } as const,
} as const;

export type AIRecommendationType =
  (typeof AI_RECOMMENDATION.TYPES)[keyof typeof AI_RECOMMENDATION.TYPES];
export type AIRecommendationStrategy =
  (typeof AI_RECOMMENDATION.STRATEGIES)[keyof typeof AI_RECOMMENDATION.STRATEGIES];
export type AIRecommendationScope =
  (typeof AI_RECOMMENDATION.SCOPES)[keyof typeof AI_RECOMMENDATION.SCOPES];
export type AIRecommendationPriority =
  (typeof AI_RECOMMENDATION.PRIORITIES)[keyof typeof AI_RECOMMENDATION.PRIORITIES];
export type AIRecommendationStatus =
  (typeof AI_RECOMMENDATION.STATUSES)[keyof typeof AI_RECOMMENDATION.STATUSES];
export type AIRecommendationFeedbackType =
  (typeof AI_RECOMMENDATION.FEEDBACK_TYPES)[keyof typeof AI_RECOMMENDATION.FEEDBACK_TYPES];
export type AIRecommendationScoreType =
  (typeof AI_RECOMMENDATION.SCORE_TYPES)[keyof typeof AI_RECOMMENDATION.SCORE_TYPES];
export type AIRecommendationFilter =
  (typeof AI_RECOMMENDATION.FILTERS)[keyof typeof AI_RECOMMENDATION.FILTERS];
export type AIRecommendationAlgorithm =
  (typeof AI_RECOMMENDATION.ALGORITHMS)[keyof typeof AI_RECOMMENDATION.ALGORITHMS];
export type AIRecommendationMetric =
  (typeof AI_RECOMMENDATION.METRICS)[keyof typeof AI_RECOMMENDATION.METRICS];
export type AIRecommendationLimit =
  (typeof AI_RECOMMENDATION.LIMITS)[keyof typeof AI_RECOMMENDATION.LIMITS];
export type AIRecommendationTimeframe =
  (typeof AI_RECOMMENDATION.TIMEFRAMES)[keyof typeof AI_RECOMMENDATION.TIMEFRAMES];
export type AIRecommendationModel =
  (typeof AI_RECOMMENDATION.MODELS)[keyof typeof AI_RECOMMENDATION.MODELS];

export function getAiRecommendationPriorityLabel(priority: AIRecommendationPriority): string {
  const labels: Record<AIRecommendationPriority, string> = {
    [AI_RECOMMENDATION.PRIORITIES.CRITICAL]: 'Critical',
    [AI_RECOMMENDATION.PRIORITIES.HIGH]: 'High',
    [AI_RECOMMENDATION.PRIORITIES.MEDIUM]: 'Medium',
    [AI_RECOMMENDATION.PRIORITIES.LOW]: 'Low',
    [AI_RECOMMENDATION.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function getAiRecommendationStatusLabel(status: AIRecommendationStatus): string {
  const labels: Record<AIRecommendationStatus, string> = {
    [AI_RECOMMENDATION.STATUSES.PENDING]: 'Pending',
    [AI_RECOMMENDATION.STATUSES.PROCESSING]: 'Processing',
    [AI_RECOMMENDATION.STATUSES.GENERATED]: 'Generated',
    [AI_RECOMMENDATION.STATUSES.RANKED]: 'Ranked',
    [AI_RECOMMENDATION.STATUSES.FILTERED]: 'Filtered',
    [AI_RECOMMENDATION.STATUSES.VALIDATED]: 'Validated',
    [AI_RECOMMENDATION.STATUSES.DELIVERED]: 'Delivered',
    [AI_RECOMMENDATION.STATUSES.VIEWED]: 'Viewed',
    [AI_RECOMMENDATION.STATUSES.CLICKED]: 'Clicked',
    [AI_RECOMMENDATION.STATUSES.CONVERTED]: 'Converted',
    [AI_RECOMMENDATION.STATUSES.FAILED]: 'Failed',
    [AI_RECOMMENDATION.STATUSES.EXPIRED]: 'Expired',
    [AI_RECOMMENDATION.STATUSES.ARCHIVED]: 'Archived',
    [AI_RECOMMENDATION.STATUSES.OPTIMIZED]: 'Optimized',
    [AI_RECOMMENDATION.STATUSES.PERSONALIZED]: 'Personalized',
    [AI_RECOMMENDATION.STATUSES.CACHED]: 'Cached',
  };
  return labels[status] || 'Unknown';
}

export function getAiRecommendationScopeLabel(scope: AIRecommendationScope): string {
  const labels: Record<AIRecommendationScope, string> = {
    [AI_RECOMMENDATION.SCOPES.GLOBAL]: 'Global',
    [AI_RECOMMENDATION.SCOPES.SITE_WIDE]: 'Site Wide',
    [AI_RECOMMENDATION.SCOPES.CATEGORY]: 'Category',
    [AI_RECOMMENDATION.SCOPES.SUB_CATEGORY]: 'Sub Category',
    [AI_RECOMMENDATION.SCOPES.BRAND]: 'Brand',
    [AI_RECOMMENDATION.SCOPES.COLLECTION]: 'Collection',
    [AI_RECOMMENDATION.SCOPES.USER]: 'User',
    [AI_RECOMMENDATION.SCOPES.SESSION]: 'Session',
    [AI_RECOMMENDATION.SCOPES.DEVICE]: 'Device',
    [AI_RECOMMENDATION.SCOPES.LOCATION]: 'Location',
    [AI_RECOMMENDATION.SCOPES.TIME]: 'Time',
    [AI_RECOMMENDATION.SCOPES.SEASONAL]: 'Seasonal',
    [AI_RECOMMENDATION.SCOPES.CROSS_SELLING]: 'Cross Selling',
    [AI_RECOMMENDATION.SCOPES.UP_SELLING]: 'Up Selling',
    [AI_RECOMMENDATION.SCOPES.COMPLEMENTARY]: 'Complementary',
    [AI_RECOMMENDATION.SCOPES.SUBSTITUTE]: 'Substitute',
    [AI_RECOMMENDATION.SCOPES.BUNDLE]: 'Bundle',
    [AI_RECOMMENDATION.SCOPES.BROWSE]: 'Browse',
    [AI_RECOMMENDATION.SCOPES.SEARCH]: 'Search',
    [AI_RECOMMENDATION.SCOPES.CHECKOUT]: 'Checkout',
    [AI_RECOMMENDATION.SCOPES.CART]: 'Cart',
    [AI_RECOMMENDATION.SCOPES.WISHLIST]: 'Wishlist',
  };
  return labels[scope] || 'Unknown';
}

export function getAiRecommendationMetricLabel(metric: AIRecommendationMetric): string {
  const labels: Record<AIRecommendationMetric, string> = {
    [AI_RECOMMENDATION.METRICS.RMSE]: 'Root Mean Square Error',
    [AI_RECOMMENDATION.METRICS.MAE]: 'Mean Absolute Error',
    [AI_RECOMMENDATION.METRICS.MSE]: 'Mean Squared Error',
    [AI_RECOMMENDATION.METRICS.PRECISION]: 'Precision',
    [AI_RECOMMENDATION.METRICS.RECALL]: 'Recall',
    [AI_RECOMMENDATION.METRICS.F1_SCORE]: 'F1 Score',
    [AI_RECOMMENDATION.METRICS.MAP]: 'Mean Average Precision',
    [AI_RECOMMENDATION.METRICS.NDCG]: 'Normalized Discounted Cumulative Gain',
    [AI_RECOMMENDATION.METRICS.MRR]: 'Mean Reciprocal Rank',
    [AI_RECOMMENDATION.METRICS.HIT_RATE]: 'Hit Rate',
    [AI_RECOMMENDATION.METRICS.CTR]: 'Click-Through Rate',
    [AI_RECOMMENDATION.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [AI_RECOMMENDATION.METRICS.REVENUE]: 'Revenue',
    [AI_RECOMMENDATION.METRICS.PROFIT]: 'Profit',
    [AI_RECOMMENDATION.METRICS.ROI]: 'Return on Investment',
    [AI_RECOMMENDATION.METRICS.CUSTOMER_LIFETIME_VALUE]: 'Customer Lifetime Value',
    [AI_RECOMMENDATION.METRICS.ENGAGEMENT]: 'Engagement',
    [AI_RECOMMENDATION.METRICS.RETENTION]: 'Retention',
    [AI_RECOMMENDATION.METRICS.CHURN_RATE]: 'Churn Rate',
    [AI_RECOMMENDATION.METRICS.SATISFACTION]: 'Satisfaction',
    [AI_RECOMMENDATION.METRICS.LOYALTY]: 'Loyalty',
    [AI_RECOMMENDATION.METRICS.DIVERSITY]: 'Diversity',
    [AI_RECOMMENDATION.METRICS.NOVELTY]: 'Novelty',
    [AI_RECOMMENDATION.METRICS.SERENDIPITY]: 'Serendipity',
    [AI_RECOMMENDATION.METRICS.COVERAGE]: 'Coverage',
  };
  return labels[metric] || 'Unknown';
}

export function getAiRecommendationAlgorithmFamily(algorithm: AIRecommendationAlgorithm): string {
  const familyMap: Record<AIRecommendationAlgorithm, string> = {
    [AI_RECOMMENDATION.ALGORITHMS.USER_BASED_CF]: 'Collaborative Filtering',
    [AI_RECOMMENDATION.ALGORITHMS.ITEM_BASED_CF]: 'Collaborative Filtering',
    [AI_RECOMMENDATION.ALGORITHMS.SVD]: 'Matrix Factorization',
    [AI_RECOMMENDATION.ALGORITHMS.SVD_PLUS_PLUS]: 'Matrix Factorization',
    [AI_RECOMMENDATION.ALGORITHMS.ALS]: 'Matrix Factorization',
    [AI_RECOMMENDATION.ALGORITHMS.BPR]: 'Matrix Factorization',
    [AI_RECOMMENDATION.ALGORITHMS.NCF]: 'Deep Learning',
    [AI_RECOMMENDATION.ALGORITHMS.NEURAL_CF]: 'Deep Learning',
    [AI_RECOMMENDATION.ALGORITHMS.TF_IDF]: 'Content-Based',
    [AI_RECOMMENDATION.ALGORITHMS.BM25]: 'Content-Based',
    [AI_RECOMMENDATION.ALGORITHMS.WORD2VEC]: 'Content-Based',
    [AI_RECOMMENDATION.ALGORITHMS.GLOVE]: 'Content-Based',
    [AI_RECOMMENDATION.ALGORITHMS.FASTTEXT]: 'Content-Based',
    [AI_RECOMMENDATION.ALGORITHMS.BERT_EMBEDDINGS]: 'Content-Based',
    [AI_RECOMMENDATION.ALGORITHMS.PMF]: 'Matrix Factorization',
    [AI_RECOMMENDATION.ALGORITHMS.BPMF]: 'Matrix Factorization',
    [AI_RECOMMENDATION.ALGORITHMS.RBM]: 'Matrix Factorization',
    [AI_RECOMMENDATION.ALGORITHMS.DNN]: 'Deep Learning',
    [AI_RECOMMENDATION.ALGORITHMS.RNN]: 'Deep Learning',
    [AI_RECOMMENDATION.ALGORITHMS.LSTM]: 'Deep Learning',
    [AI_RECOMMENDATION.ALGORITHMS.GRU]: 'Deep Learning',
    [AI_RECOMMENDATION.ALGORITHMS.CNN]: 'Deep Learning',
    [AI_RECOMMENDATION.ALGORITHMS.TRANSFORMER_REC]: 'Deep Learning',
    [AI_RECOMMENDATION.ALGORITHMS.SASREC]: 'Deep Learning',
    [AI_RECOMMENDATION.ALGORITHMS.BERT_REC]: 'Deep Learning',
    [AI_RECOMMENDATION.ALGORITHMS.PAGERANK]: 'Graph-Based',
    [AI_RECOMMENDATION.ALGORITHMS.PERSONALIZED_PAGERANK]: 'Graph-Based',
    [AI_RECOMMENDATION.ALGORITHMS.GRAPH_SAGE]: 'Graph-Based',
    [AI_RECOMMENDATION.ALGORITHMS.GCN]: 'Graph-Based',
    [AI_RECOMMENDATION.ALGORITHMS.GAT]: 'Graph-Based',
    [AI_RECOMMENDATION.ALGORITHMS.BAGGING]: 'Ensemble',
    [AI_RECOMMENDATION.ALGORITHMS.BOOSTING]: 'Ensemble',
    [AI_RECOMMENDATION.ALGORITHMS.STACKING]: 'Ensemble',
    [AI_RECOMMENDATION.ALGORITHMS.VOTING]: 'Ensemble',
    [AI_RECOMMENDATION.ALGORITHMS.ASSOCIATION_RULES]: 'Rule-Based',
    [AI_RECOMMENDATION.ALGORITHMS.APRIORI]: 'Rule-Based',
    [AI_RECOMMENDATION.ALGORITHMS.FP_GROWTH]: 'Rule-Based',
  };
  return familyMap[algorithm] || 'Unknown';
}

export function isAiRecommendationDelivered(status: AIRecommendationStatus): boolean {
  const deliveredStatuses: AIRecommendationStatus[] = [
    AI_RECOMMENDATION.STATUSES.DELIVERED,
    AI_RECOMMENDATION.STATUSES.VIEWED,
    AI_RECOMMENDATION.STATUSES.CLICKED,
    AI_RECOMMENDATION.STATUSES.CONVERTED,
  ];
  return deliveredStatuses.includes(status);
}

export function isAiRecommendationActive(status: AIRecommendationStatus): boolean {
  const activeStatuses: AIRecommendationStatus[] = [
    AI_RECOMMENDATION.STATUSES.PENDING,
    AI_RECOMMENDATION.STATUSES.PROCESSING,
    AI_RECOMMENDATION.STATUSES.GENERATED,
    AI_RECOMMENDATION.STATUSES.RANKED,
    AI_RECOMMENDATION.STATUSES.FILTERED,
    AI_RECOMMENDATION.STATUSES.VALIDATED,
    AI_RECOMMENDATION.STATUSES.OPTIMIZED,
    AI_RECOMMENDATION.STATUSES.PERSONALIZED,
  ];
  return activeStatuses.includes(status);
}

export function getAiRecommendationDefaultCount(scope: AIRecommendationScope): number {
  const counts: Record<AIRecommendationScope, number> = {
    [AI_RECOMMENDATION.SCOPES.GLOBAL]: 20,
    [AI_RECOMMENDATION.SCOPES.SITE_WIDE]: 20,
    [AI_RECOMMENDATION.SCOPES.CATEGORY]: 15,
    [AI_RECOMMENDATION.SCOPES.SUB_CATEGORY]: 12,
    [AI_RECOMMENDATION.SCOPES.BRAND]: 10,
    [AI_RECOMMENDATION.SCOPES.COLLECTION]: 15,
    [AI_RECOMMENDATION.SCOPES.USER]: 10,
    [AI_RECOMMENDATION.SCOPES.SESSION]: 8,
    [AI_RECOMMENDATION.SCOPES.DEVICE]: 8,
    [AI_RECOMMENDATION.SCOPES.LOCATION]: 10,
    [AI_RECOMMENDATION.SCOPES.TIME]: 10,
    [AI_RECOMMENDATION.SCOPES.SEASONAL]: 15,
    [AI_RECOMMENDATION.SCOPES.CROSS_SELLING]: 5,
    [AI_RECOMMENDATION.SCOPES.UP_SELLING]: 3,
    [AI_RECOMMENDATION.SCOPES.COMPLEMENTARY]: 5,
    [AI_RECOMMENDATION.SCOPES.SUBSTITUTE]: 5,
    [AI_RECOMMENDATION.SCOPES.BUNDLE]: 3,
    [AI_RECOMMENDATION.SCOPES.BROWSE]: 12,
    [AI_RECOMMENDATION.SCOPES.SEARCH]: 10,
    [AI_RECOMMENDATION.SCOPES.CHECKOUT]: 4,
    [AI_RECOMMENDATION.SCOPES.CART]: 6,
    [AI_RECOMMENDATION.SCOPES.WISHLIST]: 8,
  };
  return counts[scope] || AI_RECOMMENDATION.LIMITS.DEFAULT;
}
