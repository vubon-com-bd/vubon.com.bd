/**
 * AI Search Strategy Constants
 * Strategies and algorithms for AI search
 */

export const AI_SEARCH_STRATEGY = {
  // Strategy Types
  TYPES: {
    // Retrieval Strategies
    DENSE_RETRIEVAL: 'dense_retrieval',
    SPARSE_RETRIEVAL: 'sparse_retrieval',
    HYBRID_RETRIEVAL: 'hybrid_retrieval',

    // Indexing Strategies
    INVERTED_INDEX: 'inverted_index',
    VECTOR_INDEX: 'vector_index',
    HNSW: 'hnsw',
    IVF: 'ivf',
    PQ: 'pq',

    // Ranking Strategies
    BM25: 'bm25',
    TF_IDF: 'tf_idf',
    LEARNING_TO_RANK: 'learning_to_rank',
    BERT_RANK: 'bert_rank',
    GPT_RANK: 'gpt_rank',

    // Query Processing
    QUERY_ANALYSIS: 'query_analysis',
    QUERY_EXPANSION: 'query_expansion',
    QUERY_REFORMULATION: 'query_reformulation',
    SPELL_CORRECTION: 'spell_correction',

    // Relevance Optimization
    SEMANTIC_RELEVANCE: 'semantic_relevance',
    CONTEXTUAL_RELEVANCE: 'contextual_relevance',
    PERSONALIZED_RELEVANCE: 'personalized_relevance',

    // Performance Strategies
    CACHING: 'caching',
    BATCHING: 'batching',
    PARALLELIZATION: 'parallelization',
    DISTRIBUTED: 'distributed',

    // Hybrid Strategies
    WEIGHTED_HYBRID: 'weighted_hybrid',
    CASCADE_HYBRID: 'cascade_hybrid',
    RECIPROCAL_RANK: 'reciprocal_rank',
  } as const,

  // Strategy Approaches
  APPROACHES: {
    EXACT: 'exact',
    FUZZY: 'fuzzy',
    SEMANTIC: 'semantic',
    CONTEXTUAL: 'contextual',
    HYBRID: 'hybrid',
    ADAPTIVE: 'adaptive',
    PREDICTIVE: 'predictive',
  } as const,

  // Strategy Goals
  GOALS: {
    MAXIMIZE_RELEVANCE: 'maximize_relevance',
    MAXIMIZE_RECALL: 'maximize_recall',
    MAXIMIZE_PRECISION: 'maximize_precision',
    MAXIMIZE_SPEED: 'maximize_speed',
    MAXIMIZE_SCALABILITY: 'maximize_scalability',
    BALANCED: 'balanced',
    COST_OPTIMIZED: 'cost_optimized',
    PERSONALIZED: 'personalized',
  } as const,

  // Strategy Optimization
  OPTIMIZATION: {
    ACCURACY: 'accuracy',
    SPEED: 'speed',
    MEMORY: 'memory',
    COST: 'cost',
    SCALABILITY: 'scalability',
    LATENCY: 'latency',
    THROUGHPUT: 'throughput',
  } as const,

  // Strategy Execution
  EXECUTION: {
    REAL_TIME: 'real_time',
    BATCH: 'batch',
    STREAMING: 'streaming',
    SCHEDULED: 'scheduled',
    ON_DEMAND: 'on_demand',
  } as const,

  // Strategy Evaluation
  EVALUATION: {
    OFFLINE: 'offline',
    ONLINE: 'online',
    A_B_TEST: 'a_b_test',
    MULTIVARIATE: 'multivariate',
    SIMULATION: 'simulation',
    USER_STUDY: 'user_study',
  } as const,
} as const;

// Strategy Types
export type AISearchStrategyType =
  (typeof AI_SEARCH_STRATEGY.TYPES)[keyof typeof AI_SEARCH_STRATEGY.TYPES];

// Strategy Approaches
export type AISearchStrategyApproach =
  (typeof AI_SEARCH_STRATEGY.APPROACHES)[keyof typeof AI_SEARCH_STRATEGY.APPROACHES];

// Strategy Goals
export type AISearchStrategyGoal =
  (typeof AI_SEARCH_STRATEGY.GOALS)[keyof typeof AI_SEARCH_STRATEGY.GOALS];

// Strategy Optimization
export type AISearchStrategyOptimization =
  (typeof AI_SEARCH_STRATEGY.OPTIMIZATION)[keyof typeof AI_SEARCH_STRATEGY.OPTIMIZATION];

// Strategy Execution
export type AISearchStrategyExecution =
  (typeof AI_SEARCH_STRATEGY.EXECUTION)[keyof typeof AI_SEARCH_STRATEGY.EXECUTION];

// Strategy Evaluation
export type AISearchStrategyEvaluation =
  (typeof AI_SEARCH_STRATEGY.EVALUATION)[keyof typeof AI_SEARCH_STRATEGY.EVALUATION];

// Utility Functions
export function getSearchStrategyTypeLabel(strategy: AISearchStrategyType): string {
  const labels: Record<AISearchStrategyType, string> = {
    [AI_SEARCH_STRATEGY.TYPES.DENSE_RETRIEVAL]: 'Dense Retrieval',
    [AI_SEARCH_STRATEGY.TYPES.SPARSE_RETRIEVAL]: 'Sparse Retrieval',
    [AI_SEARCH_STRATEGY.TYPES.HYBRID_RETRIEVAL]: 'Hybrid Retrieval',
    [AI_SEARCH_STRATEGY.TYPES.INVERTED_INDEX]: 'Inverted Index',
    [AI_SEARCH_STRATEGY.TYPES.VECTOR_INDEX]: 'Vector Index',
    [AI_SEARCH_STRATEGY.TYPES.HNSW]: 'HNSW',
    [AI_SEARCH_STRATEGY.TYPES.IVF]: 'IVF',
    [AI_SEARCH_STRATEGY.TYPES.PQ]: 'PQ',
    [AI_SEARCH_STRATEGY.TYPES.BM25]: 'BM25',
    [AI_SEARCH_STRATEGY.TYPES.TF_IDF]: 'TF-IDF',
    [AI_SEARCH_STRATEGY.TYPES.LEARNING_TO_RANK]: 'Learning to Rank',
    [AI_SEARCH_STRATEGY.TYPES.BERT_RANK]: 'BERT Rank',
    [AI_SEARCH_STRATEGY.TYPES.GPT_RANK]: 'GPT Rank',
    [AI_SEARCH_STRATEGY.TYPES.QUERY_ANALYSIS]: 'Query Analysis',
    [AI_SEARCH_STRATEGY.TYPES.QUERY_EXPANSION]: 'Query Expansion',
    [AI_SEARCH_STRATEGY.TYPES.QUERY_REFORMULATION]: 'Query Reformulation',
    [AI_SEARCH_STRATEGY.TYPES.SPELL_CORRECTION]: 'Spell Correction',
    [AI_SEARCH_STRATEGY.TYPES.SEMANTIC_RELEVANCE]: 'Semantic Relevance',
    [AI_SEARCH_STRATEGY.TYPES.CONTEXTUAL_RELEVANCE]: 'Contextual Relevance',
    [AI_SEARCH_STRATEGY.TYPES.PERSONALIZED_RELEVANCE]: 'Personalized Relevance',
    [AI_SEARCH_STRATEGY.TYPES.CACHING]: 'Caching',
    [AI_SEARCH_STRATEGY.TYPES.BATCHING]: 'Batching',
    [AI_SEARCH_STRATEGY.TYPES.PARALLELIZATION]: 'Parallelization',
    [AI_SEARCH_STRATEGY.TYPES.DISTRIBUTED]: 'Distributed',
    [AI_SEARCH_STRATEGY.TYPES.WEIGHTED_HYBRID]: 'Weighted Hybrid',
    [AI_SEARCH_STRATEGY.TYPES.CASCADE_HYBRID]: 'Cascade Hybrid',
    [AI_SEARCH_STRATEGY.TYPES.RECIPROCAL_RANK]: 'Reciprocal Rank',
  };
  return labels[strategy] || 'Unknown';
}

export function getSearchStrategyApproachLabel(approach: AISearchStrategyApproach): string {
  const labels: Record<AISearchStrategyApproach, string> = {
    [AI_SEARCH_STRATEGY.APPROACHES.EXACT]: 'Exact',
    [AI_SEARCH_STRATEGY.APPROACHES.FUZZY]: 'Fuzzy',
    [AI_SEARCH_STRATEGY.APPROACHES.SEMANTIC]: 'Semantic',
    [AI_SEARCH_STRATEGY.APPROACHES.CONTEXTUAL]: 'Contextual',
    [AI_SEARCH_STRATEGY.APPROACHES.HYBRID]: 'Hybrid',
    [AI_SEARCH_STRATEGY.APPROACHES.ADAPTIVE]: 'Adaptive',
    [AI_SEARCH_STRATEGY.APPROACHES.PREDICTIVE]: 'Predictive',
  };
  return labels[approach] || 'Unknown';
}

export function getSearchStrategyGoalLabel(goal: AISearchStrategyGoal): string {
  const labels: Record<AISearchStrategyGoal, string> = {
    [AI_SEARCH_STRATEGY.GOALS.MAXIMIZE_RELEVANCE]: 'Maximize Relevance',
    [AI_SEARCH_STRATEGY.GOALS.MAXIMIZE_RECALL]: 'Maximize Recall',
    [AI_SEARCH_STRATEGY.GOALS.MAXIMIZE_PRECISION]: 'Maximize Precision',
    [AI_SEARCH_STRATEGY.GOALS.MAXIMIZE_SPEED]: 'Maximize Speed',
    [AI_SEARCH_STRATEGY.GOALS.MAXIMIZE_SCALABILITY]: 'Maximize Scalability',
    [AI_SEARCH_STRATEGY.GOALS.BALANCED]: 'Balanced',
    [AI_SEARCH_STRATEGY.GOALS.COST_OPTIMIZED]: 'Cost Optimized',
    [AI_SEARCH_STRATEGY.GOALS.PERSONALIZED]: 'Personalized',
  };
  return labels[goal] || 'Unknown';
}

export function getSearchStrategyExecutionLabel(execution: AISearchStrategyExecution): string {
  const labels: Record<AISearchStrategyExecution, string> = {
    [AI_SEARCH_STRATEGY.EXECUTION.REAL_TIME]: 'Real Time',
    [AI_SEARCH_STRATEGY.EXECUTION.BATCH]: 'Batch',
    [AI_SEARCH_STRATEGY.EXECUTION.STREAMING]: 'Streaming',
    [AI_SEARCH_STRATEGY.EXECUTION.SCHEDULED]: 'Scheduled',
    [AI_SEARCH_STRATEGY.EXECUTION.ON_DEMAND]: 'On Demand',
  };
  return labels[execution] || 'Unknown';
}

export function getSearchStrategyEvaluationLabel(evaluation: AISearchStrategyEvaluation): string {
  const labels: Record<AISearchStrategyEvaluation, string> = {
    [AI_SEARCH_STRATEGY.EVALUATION.OFFLINE]: 'Offline',
    [AI_SEARCH_STRATEGY.EVALUATION.ONLINE]: 'Online',
    [AI_SEARCH_STRATEGY.EVALUATION.A_B_TEST]: 'A/B Test',
    [AI_SEARCH_STRATEGY.EVALUATION.MULTIVARIATE]: 'Multivariate',
    [AI_SEARCH_STRATEGY.EVALUATION.SIMULATION]: 'Simulation',
    [AI_SEARCH_STRATEGY.EVALUATION.USER_STUDY]: 'User Study',
  };
  return labels[evaluation] || 'Unknown';
}

export function getRecommendedStrategyForGoal(goal: AISearchStrategyGoal): AISearchStrategyType[] {
  const mapping: Record<AISearchStrategyGoal, AISearchStrategyType[]> = {
    [AI_SEARCH_STRATEGY.GOALS.MAXIMIZE_RELEVANCE]: [
      AI_SEARCH_STRATEGY.TYPES.SEMANTIC_RELEVANCE,
      AI_SEARCH_STRATEGY.TYPES.BERT_RANK,
      AI_SEARCH_STRATEGY.TYPES.GPT_RANK,
    ],
    [AI_SEARCH_STRATEGY.GOALS.MAXIMIZE_RECALL]: [
      AI_SEARCH_STRATEGY.TYPES.DENSE_RETRIEVAL,
      AI_SEARCH_STRATEGY.TYPES.HYBRID_RETRIEVAL,
      AI_SEARCH_STRATEGY.TYPES.VECTOR_INDEX,
    ],
    [AI_SEARCH_STRATEGY.GOALS.MAXIMIZE_PRECISION]: [
      AI_SEARCH_STRATEGY.TYPES.LEARNING_TO_RANK,
      AI_SEARCH_STRATEGY.TYPES.BM25,
      AI_SEARCH_STRATEGY.TYPES.INVERTED_INDEX,
    ],
    [AI_SEARCH_STRATEGY.GOALS.MAXIMIZE_SPEED]: [
      AI_SEARCH_STRATEGY.TYPES.CACHING,
      AI_SEARCH_STRATEGY.TYPES.HNSW,
      AI_SEARCH_STRATEGY.TYPES.IVF,
    ],
    [AI_SEARCH_STRATEGY.GOALS.MAXIMIZE_SCALABILITY]: [
      AI_SEARCH_STRATEGY.TYPES.DISTRIBUTED,
      AI_SEARCH_STRATEGY.TYPES.BATCHING,
      AI_SEARCH_STRATEGY.TYPES.PARALLELIZATION,
    ],
    [AI_SEARCH_STRATEGY.GOALS.BALANCED]: [
      AI_SEARCH_STRATEGY.TYPES.WEIGHTED_HYBRID,
      AI_SEARCH_STRATEGY.TYPES.CASCADE_HYBRID,
      AI_SEARCH_STRATEGY.TYPES.RECIPROCAL_RANK,
    ],
    [AI_SEARCH_STRATEGY.GOALS.COST_OPTIMIZED]: [
      AI_SEARCH_STRATEGY.TYPES.SPARSE_RETRIEVAL,
      AI_SEARCH_STRATEGY.TYPES.TF_IDF,
      AI_SEARCH_STRATEGY.TYPES.PQ,
    ],
    [AI_SEARCH_STRATEGY.GOALS.PERSONALIZED]: [
      AI_SEARCH_STRATEGY.TYPES.PERSONALIZED_RELEVANCE,
      AI_SEARCH_STRATEGY.TYPES.CONTEXTUAL_RELEVANCE,
      AI_SEARCH_STRATEGY.TYPES.QUERY_EXPANSION,
    ],
  };
  return mapping[goal] || [];
}
