/**
 * AI Search Strategy Constants
 * Strategy definitions for AI search
 */

export const AI_SEARCH_STRATEGY = {
  // Strategy Categories
  CATEGORIES: {
    RELEVANCE: 'relevance',
    RANKING: 'ranking',
    HYBRID: 'hybrid',
    OPTIMIZATION: 'optimization',
    PERSONALIZATION: 'personalization',
  } as const,

  // Strategy Types
  TYPES: {
    // Relevance-based
    TF_IDF: 'tf_idf',
    BM25: 'bm25',
    VECTOR_SIMILARITY: 'vector_similarity',
    COSINE_SIMILARITY: 'cosine_similarity',
    DOT_PRODUCT: 'dot_product',

    // Ranking-based
    LEARNING_TO_RANK: 'learning_to_rank',
    RANK_BM25: 'rank_bm25',
    RANK_BERT: 'rank_bert',
    RANK_GPT: 'rank_gpt',

    // Hybrid
    WEIGHTED_HYBRID: 'weighted_hybrid',
    CASCADE_HYBRID: 'cascade_hybrid',
    RECIPROCAL_RANK: 'reciprocal_rank',
    COMBINED_SCORE: 'combined_score',

    // Optimization
    QUERY_EXPANSION: 'query_expansion',
    QUERY_REFORMULATION: 'query_reformulation',
    SPELL_CHECK: 'spell_check',
    SYNONYM_EXPANSION: 'synonym_expansion',

    // Personalization
    USER_CONTEXT: 'user_context',
    SEARCH_HISTORY: 'search_history',
    BEHAVIORAL: 'behavioral',
  } as const,

  // Strategy Approaches
  APPROACHES: {
    STATIC: 'static',
    DYNAMIC: 'dynamic',
    ADAPTIVE: 'adaptive',
    LEARNING: 'learning',
  } as const,

  // Strategy Goals
  GOALS: {
    PRECISION: 'precision',
    RECALL: 'recall',
    F1_SCORE: 'f1_score',
    MAP: 'map',
    NDCG: 'ndcg',
    MRR: 'mrr',
    HIT_RATE: 'hit_rate',
    CTR: 'ctr',
    ZERO_RESULTS: 'zero_results',
  } as const,

  // Strategy Trade-offs
  TRADE_OFFS: {
    PRECISION_RECALL: 'precision_recall',
    SPEED_ACCURACY: 'speed_accuracy',
    COVERAGE_PRECISION: 'coverage_precision',
    PERSONALIZATION_GENERALIZATION: 'personalization_generalization',
  } as const,

  // Strategy Execution
  EXECUTION: {
    BATCH: 'batch',
    REAL_TIME: 'real_time',
    STREAMING: 'streaming',
    HYBRID: 'hybrid',
  } as const,

  // Strategy Evaluation
  EVALUATION: {
    OFFLINE: 'offline',
    ONLINE: 'online',
    A_B: 'a_b',
    MULTIVARIATE: 'multivariate',
    INTERLEAVING: 'interleaving',
  } as const,
} as const;

export type AISearchStrategyCategory =
  (typeof AI_SEARCH_STRATEGY.CATEGORIES)[keyof typeof AI_SEARCH_STRATEGY.CATEGORIES];

export type AISearchStrategyType =
  (typeof AI_SEARCH_STRATEGY.TYPES)[keyof typeof AI_SEARCH_STRATEGY.TYPES];

export type AISearchStrategyApproach =
  (typeof AI_SEARCH_STRATEGY.APPROACHES)[keyof typeof AI_SEARCH_STRATEGY.APPROACHES];

export type AISearchStrategyGoal =
  (typeof AI_SEARCH_STRATEGY.GOALS)[keyof typeof AI_SEARCH_STRATEGY.GOALS];

export type AISearchStrategyTradeOff =
  (typeof AI_SEARCH_STRATEGY.TRADE_OFFS)[keyof typeof AI_SEARCH_STRATEGY.TRADE_OFFS];

export type AISearchStrategyExecution =
  (typeof AI_SEARCH_STRATEGY.EXECUTION)[keyof typeof AI_SEARCH_STRATEGY.EXECUTION];

export type AISearchStrategyEvaluation =
  (typeof AI_SEARCH_STRATEGY.EVALUATION)[keyof typeof AI_SEARCH_STRATEGY.EVALUATION];

export function getAiSearchStrategyCategoryLabel(category: AISearchStrategyCategory): string {
  const labels: Record<AISearchStrategyCategory, string> = {
    [AI_SEARCH_STRATEGY.CATEGORIES.RELEVANCE]: 'Relevance',
    [AI_SEARCH_STRATEGY.CATEGORIES.RANKING]: 'Ranking',
    [AI_SEARCH_STRATEGY.CATEGORIES.HYBRID]: 'Hybrid',
    [AI_SEARCH_STRATEGY.CATEGORIES.OPTIMIZATION]: 'Optimization',
    [AI_SEARCH_STRATEGY.CATEGORIES.PERSONALIZATION]: 'Personalization',
  };
  return labels[category] || 'Unknown';
}

export function getAiSearchStrategyTypeLabel(type: AISearchStrategyType): string {
  const labels: Record<AISearchStrategyType, string> = {
    [AI_SEARCH_STRATEGY.TYPES.TF_IDF]: 'TF-IDF',
    [AI_SEARCH_STRATEGY.TYPES.BM25]: 'BM25',
    [AI_SEARCH_STRATEGY.TYPES.VECTOR_SIMILARITY]: 'Vector Similarity',
    [AI_SEARCH_STRATEGY.TYPES.COSINE_SIMILARITY]: 'Cosine Similarity',
    [AI_SEARCH_STRATEGY.TYPES.DOT_PRODUCT]: 'Dot Product',
    [AI_SEARCH_STRATEGY.TYPES.LEARNING_TO_RANK]: 'Learning to Rank',
    [AI_SEARCH_STRATEGY.TYPES.RANK_BM25]: 'Rank BM25',
    [AI_SEARCH_STRATEGY.TYPES.RANK_BERT]: 'Rank BERT',
    [AI_SEARCH_STRATEGY.TYPES.RANK_GPT]: 'Rank GPT',
    [AI_SEARCH_STRATEGY.TYPES.WEIGHTED_HYBRID]: 'Weighted Hybrid',
    [AI_SEARCH_STRATEGY.TYPES.CASCADE_HYBRID]: 'Cascade Hybrid',
    [AI_SEARCH_STRATEGY.TYPES.RECIPROCAL_RANK]: 'Reciprocal Rank',
    [AI_SEARCH_STRATEGY.TYPES.COMBINED_SCORE]: 'Combined Score',
    [AI_SEARCH_STRATEGY.TYPES.QUERY_EXPANSION]: 'Query Expansion',
    [AI_SEARCH_STRATEGY.TYPES.QUERY_REFORMULATION]: 'Query Reformulation',
    [AI_SEARCH_STRATEGY.TYPES.SPELL_CHECK]: 'Spell Check',
    [AI_SEARCH_STRATEGY.TYPES.SYNONYM_EXPANSION]: 'Synonym Expansion',
    [AI_SEARCH_STRATEGY.TYPES.USER_CONTEXT]: 'User Context',
    [AI_SEARCH_STRATEGY.TYPES.SEARCH_HISTORY]: 'Search History',
    [AI_SEARCH_STRATEGY.TYPES.BEHAVIORAL]: 'Behavioral',
  };
  return labels[type] || 'Unknown';
}

export function getAiSearchStrategyApproachLabel(approach: AISearchStrategyApproach): string {
  const labels: Record<AISearchStrategyApproach, string> = {
    [AI_SEARCH_STRATEGY.APPROACHES.STATIC]: 'Static',
    [AI_SEARCH_STRATEGY.APPROACHES.DYNAMIC]: 'Dynamic',
    [AI_SEARCH_STRATEGY.APPROACHES.ADAPTIVE]: 'Adaptive',
    [AI_SEARCH_STRATEGY.APPROACHES.LEARNING]: 'Learning',
  };
  return labels[approach] || 'Unknown';
}

export function getAiSearchStrategyGoalLabel(goal: AISearchStrategyGoal): string {
  const labels: Record<AISearchStrategyGoal, string> = {
    [AI_SEARCH_STRATEGY.GOALS.PRECISION]: 'Precision',
    [AI_SEARCH_STRATEGY.GOALS.RECALL]: 'Recall',
    [AI_SEARCH_STRATEGY.GOALS.F1_SCORE]: 'F1 Score',
    [AI_SEARCH_STRATEGY.GOALS.MAP]: 'Mean Average Precision',
    [AI_SEARCH_STRATEGY.GOALS.NDCG]: 'NDCG',
    [AI_SEARCH_STRATEGY.GOALS.MRR]: 'Mean Reciprocal Rank',
    [AI_SEARCH_STRATEGY.GOALS.HIT_RATE]: 'Hit Rate',
    [AI_SEARCH_STRATEGY.GOALS.CTR]: 'Click Through Rate',
    [AI_SEARCH_STRATEGY.GOALS.ZERO_RESULTS]: 'Zero Results',
  };
  return labels[goal] || 'Unknown';
}

export function getAiSearchStrategyTradeOffLabel(tradeOff: AISearchStrategyTradeOff): string {
  const labels: Record<AISearchStrategyTradeOff, string> = {
    [AI_SEARCH_STRATEGY.TRADE_OFFS.PRECISION_RECALL]: 'Precision-Recall',
    [AI_SEARCH_STRATEGY.TRADE_OFFS.SPEED_ACCURACY]: 'Speed-Accuracy',
    [AI_SEARCH_STRATEGY.TRADE_OFFS.COVERAGE_PRECISION]: 'Coverage-Precision',
    [AI_SEARCH_STRATEGY.TRADE_OFFS.PERSONALIZATION_GENERALIZATION]:
      'Personalization-Generalization',
  };
  return labels[tradeOff] || 'Unknown';
}

export function getAiSearchStrategyExecutionLabel(execution: AISearchStrategyExecution): string {
  const labels: Record<AISearchStrategyExecution, string> = {
    [AI_SEARCH_STRATEGY.EXECUTION.BATCH]: 'Batch',
    [AI_SEARCH_STRATEGY.EXECUTION.REAL_TIME]: 'Real Time',
    [AI_SEARCH_STRATEGY.EXECUTION.STREAMING]: 'Streaming',
    [AI_SEARCH_STRATEGY.EXECUTION.HYBRID]: 'Hybrid',
  };
  return labels[execution] || 'Unknown';
}

export function getAiSearchStrategyEvaluationLabel(evaluation: AISearchStrategyEvaluation): string {
  const labels: Record<AISearchStrategyEvaluation, string> = {
    [AI_SEARCH_STRATEGY.EVALUATION.OFFLINE]: 'Offline',
    [AI_SEARCH_STRATEGY.EVALUATION.ONLINE]: 'Online',
    [AI_SEARCH_STRATEGY.EVALUATION.A_B]: 'A/B Testing',
    [AI_SEARCH_STRATEGY.EVALUATION.MULTIVARIATE]: 'Multivariate',
    [AI_SEARCH_STRATEGY.EVALUATION.INTERLEAVING]: 'Interleaving',
  };
  return labels[evaluation] || 'Unknown';
}

export function getAiSearchStrategyPriorityWeight(goal: AISearchStrategyGoal): number {
  const weights: Record<AISearchStrategyGoal, number> = {
    [AI_SEARCH_STRATEGY.GOALS.PRECISION]: 0.25,
    [AI_SEARCH_STRATEGY.GOALS.RECALL]: 0.2,
    [AI_SEARCH_STRATEGY.GOALS.F1_SCORE]: 0.15,
    [AI_SEARCH_STRATEGY.GOALS.MAP]: 0.1,
    [AI_SEARCH_STRATEGY.GOALS.NDCG]: 0.1,
    [AI_SEARCH_STRATEGY.GOALS.MRR]: 0.1,
    [AI_SEARCH_STRATEGY.GOALS.HIT_RATE]: 0.05,
    [AI_SEARCH_STRATEGY.GOALS.CTR]: 0.03,
    [AI_SEARCH_STRATEGY.GOALS.ZERO_RESULTS]: 0.02,
  };
  return weights[goal] || 0.1;
}

export function getAiSearchRecommendedStrategyForGoal(
  goal: AISearchStrategyGoal
): AISearchStrategyType[] {
  const recommendations: Record<AISearchStrategyGoal, AISearchStrategyType[]> = {
    [AI_SEARCH_STRATEGY.GOALS.PRECISION]: [
      AI_SEARCH_STRATEGY.TYPES.BM25,
      AI_SEARCH_STRATEGY.TYPES.LEARNING_TO_RANK,
    ],
    [AI_SEARCH_STRATEGY.GOALS.RECALL]: [
      AI_SEARCH_STRATEGY.TYPES.TF_IDF,
      AI_SEARCH_STRATEGY.TYPES.VECTOR_SIMILARITY,
    ],
    [AI_SEARCH_STRATEGY.GOALS.F1_SCORE]: [
      AI_SEARCH_STRATEGY.TYPES.WEIGHTED_HYBRID,
      AI_SEARCH_STRATEGY.TYPES.RANK_BERT,
    ],
    [AI_SEARCH_STRATEGY.GOALS.MAP]: [
      AI_SEARCH_STRATEGY.TYPES.RANK_BM25,
      AI_SEARCH_STRATEGY.TYPES.RANK_GPT,
    ],
    [AI_SEARCH_STRATEGY.GOALS.NDCG]: [
      AI_SEARCH_STRATEGY.TYPES.LEARNING_TO_RANK,
      AI_SEARCH_STRATEGY.TYPES.CASCADE_HYBRID,
    ],
    [AI_SEARCH_STRATEGY.GOALS.MRR]: [
      AI_SEARCH_STRATEGY.TYPES.RECIPROCAL_RANK,
      AI_SEARCH_STRATEGY.TYPES.COMBINED_SCORE,
    ],
    [AI_SEARCH_STRATEGY.GOALS.HIT_RATE]: [
      AI_SEARCH_STRATEGY.TYPES.USER_CONTEXT,
      AI_SEARCH_STRATEGY.TYPES.SEARCH_HISTORY,
    ],
    [AI_SEARCH_STRATEGY.GOALS.CTR]: [
      AI_SEARCH_STRATEGY.TYPES.BEHAVIORAL,
      AI_SEARCH_STRATEGY.TYPES.QUERY_EXPANSION,
    ],
    [AI_SEARCH_STRATEGY.GOALS.ZERO_RESULTS]: [
      AI_SEARCH_STRATEGY.TYPES.QUERY_REFORMULATION,
      AI_SEARCH_STRATEGY.TYPES.SYNONYM_EXPANSION,
    ],
  };
  return recommendations[goal] || [];
}
