/**
 * AI Ranking Strategy Constants
 * Strategies and approaches for AI ranking
 */

export const AI_RANKING_STRATEGY = {
  // Strategy Types
  TYPES: {
    // Point-wise Ranking
    POINT_WISE_LINEAR: 'point_wise_linear',
    POINT_WISE_LOGISTIC: 'point_wise_logistic',
    POINT_WISE_TREE: 'point_wise_tree',

    // Pair-wise Ranking
    PAIR_WISE_SVM: 'pair_wise_svm',
    PAIR_WISE_NET: 'pair_wise_net',
    PAIR_WISE_BOOSTING: 'pair_wise_boosting',

    // List-wise Ranking
    LIST_WISE_NET: 'list_wise_net',
    LIST_WISE_MART: 'list_wise_mart',
    LIST_WISE_DEEP: 'list_wise_deep',

    // Neural Ranking
    NEURAL_POINT_WISE: 'neural_point_wise',
    NEURAL_PAIR_WISE: 'neural_pair_wise',
    NEURAL_LIST_WISE: 'neural_list_wise',
    TRANSFORMER_RANK: 'transformer_rank',
    BERT_RANK: 'bert_rank',
    GPT_RANK: 'gpt_rank',

    // Hybrid Ranking
    HYBRID_POINT_PAIR: 'hybrid_point_pair',
    HYBRID_POINT_LIST: 'hybrid_point_list',
    HYBRID_PAIR_LIST: 'hybrid_pair_list',
    ENSEMBLE_RANK: 'ensemble_rank',

    // Personalization Ranking
    USER_CONTEXT_RANK: 'user_context_rank',
    BEHAVIORAL_RANK: 'behavioral_rank',
    PREFERENCE_RANK: 'preference_rank',
    SOCIAL_RANK: 'social_rank',

    // Contextual Ranking
    TIME_AWARE_RANK: 'time_aware_rank',
    LOCATION_AWARE_RANK: 'location_aware_rank',
    DEVICE_AWARE_RANK: 'device_aware_rank',
    SEASONAL_RANK: 'seasonal_rank',

    // Optimization Strategies
    RELEVANCE_OPTIMIZATION: 'relevance_optimization',
    DIVERSITY_OPTIMIZATION: 'diversity_optimization',
    NOVELTY_OPTIMIZATION: 'novelty_optimization',
    FRESHNESS_OPTIMIZATION: 'freshness_optimization',

    // Reinforcement
    REINFORCEMENT_RANK: 'reinforcement_rank',
  } as const,

  // Strategy Approaches
  APPROACHES: {
    SUPERVISED: 'supervised',
    UNSUPERVISED: 'unsupervised',
    SEMI_SUPERVISED: 'semi_supervised',
    REINFORCEMENT: 'reinforcement',
    TRANSFER: 'transfer',
    FEW_SHOT: 'few_shot',
    ZERO_SHOT: 'zero_shot',
  } as const,

  // Strategy Goals
  GOALS: {
    MAXIMIZE_RELEVANCE: 'maximize_relevance',
    MAXIMIZE_DIVERSITY: 'maximize_diversity',
    MAXIMIZE_NOVELTY: 'maximize_novelty',
    MAXIMIZE_FRESHNESS: 'maximize_freshness',
    MAXIMIZE_ENGAGEMENT: 'maximize_engagement',
    MAXIMIZE_CONVERSION: 'maximize_conversion',
    MAXIMIZE_REVENUE: 'maximize_revenue',
    BALANCED: 'balanced',
    EXPLORE_EXPLOIT: 'explore_exploit',
  } as const,

  // Strategy Optimization
  OPTIMIZATION: {
    ACCURACY: 'accuracy',
    SPEED: 'speed',
    SCALABILITY: 'scalability',
    MEMORY: 'memory',
    COST: 'cost',
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
export type AIRankingStrategyType =
  (typeof AI_RANKING_STRATEGY.TYPES)[keyof typeof AI_RANKING_STRATEGY.TYPES];

// Strategy Approaches
export type AIRankingStrategyApproach =
  (typeof AI_RANKING_STRATEGY.APPROACHES)[keyof typeof AI_RANKING_STRATEGY.APPROACHES];

// Strategy Goals
export type AIRankingStrategyGoal =
  (typeof AI_RANKING_STRATEGY.GOALS)[keyof typeof AI_RANKING_STRATEGY.GOALS];

// Strategy Optimization
export type AIRankingStrategyOptimization =
  (typeof AI_RANKING_STRATEGY.OPTIMIZATION)[keyof typeof AI_RANKING_STRATEGY.OPTIMIZATION];

// Strategy Execution
export type AIRankingStrategyExecution =
  (typeof AI_RANKING_STRATEGY.EXECUTION)[keyof typeof AI_RANKING_STRATEGY.EXECUTION];

// Strategy Evaluation
export type AIRankingStrategyEvaluation =
  (typeof AI_RANKING_STRATEGY.EVALUATION)[keyof typeof AI_RANKING_STRATEGY.EVALUATION];

// Utility Functions
export function getRankingStrategyTypeLabel(strategy: AIRankingStrategyType): string {
  const labels: Record<AIRankingStrategyType, string> = {
    [AI_RANKING_STRATEGY.TYPES.POINT_WISE_LINEAR]: 'Point Wise Linear',
    [AI_RANKING_STRATEGY.TYPES.POINT_WISE_LOGISTIC]: 'Point Wise Logistic',
    [AI_RANKING_STRATEGY.TYPES.POINT_WISE_TREE]: 'Point Wise Tree',
    [AI_RANKING_STRATEGY.TYPES.PAIR_WISE_SVM]: 'Pair Wise SVM',
    [AI_RANKING_STRATEGY.TYPES.PAIR_WISE_NET]: 'Pair Wise Net',
    [AI_RANKING_STRATEGY.TYPES.PAIR_WISE_BOOSTING]: 'Pair Wise Boosting',
    [AI_RANKING_STRATEGY.TYPES.LIST_WISE_NET]: 'List Wise Net',
    [AI_RANKING_STRATEGY.TYPES.LIST_WISE_MART]: 'List Wise MART',
    [AI_RANKING_STRATEGY.TYPES.LIST_WISE_DEEP]: 'List Wise Deep',
    [AI_RANKING_STRATEGY.TYPES.NEURAL_POINT_WISE]: 'Neural Point Wise',
    [AI_RANKING_STRATEGY.TYPES.NEURAL_PAIR_WISE]: 'Neural Pair Wise',
    [AI_RANKING_STRATEGY.TYPES.NEURAL_LIST_WISE]: 'Neural List Wise',
    [AI_RANKING_STRATEGY.TYPES.TRANSFORMER_RANK]: 'Transformer Rank',
    [AI_RANKING_STRATEGY.TYPES.BERT_RANK]: 'BERT Rank',
    [AI_RANKING_STRATEGY.TYPES.GPT_RANK]: 'GPT Rank',
    [AI_RANKING_STRATEGY.TYPES.HYBRID_POINT_PAIR]: 'Hybrid Point-Pair',
    [AI_RANKING_STRATEGY.TYPES.HYBRID_POINT_LIST]: 'Hybrid Point-List',
    [AI_RANKING_STRATEGY.TYPES.HYBRID_PAIR_LIST]: 'Hybrid Pair-List',
    [AI_RANKING_STRATEGY.TYPES.ENSEMBLE_RANK]: 'Ensemble Rank',
    [AI_RANKING_STRATEGY.TYPES.USER_CONTEXT_RANK]: 'User Context Rank',
    [AI_RANKING_STRATEGY.TYPES.BEHAVIORAL_RANK]: 'Behavioral Rank',
    [AI_RANKING_STRATEGY.TYPES.PREFERENCE_RANK]: 'Preference Rank',
    [AI_RANKING_STRATEGY.TYPES.SOCIAL_RANK]: 'Social Rank',
    [AI_RANKING_STRATEGY.TYPES.TIME_AWARE_RANK]: 'Time Aware Rank',
    [AI_RANKING_STRATEGY.TYPES.LOCATION_AWARE_RANK]: 'Location Aware Rank',
    [AI_RANKING_STRATEGY.TYPES.DEVICE_AWARE_RANK]: 'Device Aware Rank',
    [AI_RANKING_STRATEGY.TYPES.SEASONAL_RANK]: 'Seasonal Rank',
    [AI_RANKING_STRATEGY.TYPES.RELEVANCE_OPTIMIZATION]: 'Relevance Optimization',
    [AI_RANKING_STRATEGY.TYPES.DIVERSITY_OPTIMIZATION]: 'Diversity Optimization',
    [AI_RANKING_STRATEGY.TYPES.NOVELTY_OPTIMIZATION]: 'Novelty Optimization',
    [AI_RANKING_STRATEGY.TYPES.FRESHNESS_OPTIMIZATION]: 'Freshness Optimization',
    [AI_RANKING_STRATEGY.TYPES.REINFORCEMENT_RANK]: 'Reinforcement Rank',
  };
  return labels[strategy] || 'Unknown';
}

export function getRankingStrategyApproachLabel(approach: AIRankingStrategyApproach): string {
  const labels: Record<AIRankingStrategyApproach, string> = {
    [AI_RANKING_STRATEGY.APPROACHES.SUPERVISED]: 'Supervised',
    [AI_RANKING_STRATEGY.APPROACHES.UNSUPERVISED]: 'Unsupervised',
    [AI_RANKING_STRATEGY.APPROACHES.SEMI_SUPERVISED]: 'Semi-Supervised',
    [AI_RANKING_STRATEGY.APPROACHES.REINFORCEMENT]: 'Reinforcement',
    [AI_RANKING_STRATEGY.APPROACHES.TRANSFER]: 'Transfer',
    [AI_RANKING_STRATEGY.APPROACHES.FEW_SHOT]: 'Few Shot',
    [AI_RANKING_STRATEGY.APPROACHES.ZERO_SHOT]: 'Zero Shot',
  };
  return labels[approach] || 'Unknown';
}

export function getRankingStrategyGoalLabel(goal: AIRankingStrategyGoal): string {
  const labels: Record<AIRankingStrategyGoal, string> = {
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_RELEVANCE]: 'Maximize Relevance',
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_DIVERSITY]: 'Maximize Diversity',
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_NOVELTY]: 'Maximize Novelty',
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_FRESHNESS]: 'Maximize Freshness',
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_ENGAGEMENT]: 'Maximize Engagement',
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_CONVERSION]: 'Maximize Conversion',
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_REVENUE]: 'Maximize Revenue',
    [AI_RANKING_STRATEGY.GOALS.BALANCED]: 'Balanced',
    [AI_RANKING_STRATEGY.GOALS.EXPLORE_EXPLOIT]: 'Explore-Exploit',
  };
  return labels[goal] || 'Unknown';
}

export function getRankingStrategyExecutionLabel(execution: AIRankingStrategyExecution): string {
  const labels: Record<AIRankingStrategyExecution, string> = {
    [AI_RANKING_STRATEGY.EXECUTION.REAL_TIME]: 'Real Time',
    [AI_RANKING_STRATEGY.EXECUTION.BATCH]: 'Batch',
    [AI_RANKING_STRATEGY.EXECUTION.STREAMING]: 'Streaming',
    [AI_RANKING_STRATEGY.EXECUTION.SCHEDULED]: 'Scheduled',
    [AI_RANKING_STRATEGY.EXECUTION.ON_DEMAND]: 'On Demand',
  };
  return labels[execution] || 'Unknown';
}

export function getRankingStrategyEvaluationLabel(evaluation: AIRankingStrategyEvaluation): string {
  const labels: Record<AIRankingStrategyEvaluation, string> = {
    [AI_RANKING_STRATEGY.EVALUATION.OFFLINE]: 'Offline',
    [AI_RANKING_STRATEGY.EVALUATION.ONLINE]: 'Online',
    [AI_RANKING_STRATEGY.EVALUATION.A_B_TEST]: 'A/B Test',
    [AI_RANKING_STRATEGY.EVALUATION.MULTIVARIATE]: 'Multivariate',
    [AI_RANKING_STRATEGY.EVALUATION.SIMULATION]: 'Simulation',
    [AI_RANKING_STRATEGY.EVALUATION.USER_STUDY]: 'User Study',
  };
  return labels[evaluation] || 'Unknown';
}

export function getRecommendedStrategyForGoal(
  goal: AIRankingStrategyGoal
): AIRankingStrategyType[] {
  const mapping: Record<AIRankingStrategyGoal, AIRankingStrategyType[]> = {
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_RELEVANCE]: [
      AI_RANKING_STRATEGY.TYPES.BERT_RANK,
      AI_RANKING_STRATEGY.TYPES.GPT_RANK,
      AI_RANKING_STRATEGY.TYPES.TRANSFORMER_RANK,
    ],
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_DIVERSITY]: [
      AI_RANKING_STRATEGY.TYPES.LIST_WISE_MART,
      AI_RANKING_STRATEGY.TYPES.LIST_WISE_DEEP,
      AI_RANKING_STRATEGY.TYPES.ENSEMBLE_RANK,
    ],
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_NOVELTY]: [
      AI_RANKING_STRATEGY.TYPES.BEHAVIORAL_RANK,
      AI_RANKING_STRATEGY.TYPES.SOCIAL_RANK,
      AI_RANKING_STRATEGY.TYPES.PREFERENCE_RANK,
    ],
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_FRESHNESS]: [
      AI_RANKING_STRATEGY.TYPES.TIME_AWARE_RANK,
      AI_RANKING_STRATEGY.TYPES.SEASONAL_RANK,
      AI_RANKING_STRATEGY.TYPES.FRESHNESS_OPTIMIZATION,
    ],
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_ENGAGEMENT]: [
      AI_RANKING_STRATEGY.TYPES.USER_CONTEXT_RANK,
      AI_RANKING_STRATEGY.TYPES.BEHAVIORAL_RANK,
      AI_RANKING_STRATEGY.TYPES.ENSEMBLE_RANK,
    ],
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_CONVERSION]: [
      AI_RANKING_STRATEGY.TYPES.NEURAL_LIST_WISE,
      AI_RANKING_STRATEGY.TYPES.LIST_WISE_NET,
      AI_RANKING_STRATEGY.TYPES.RELEVANCE_OPTIMIZATION,
    ],
    [AI_RANKING_STRATEGY.GOALS.MAXIMIZE_REVENUE]: [
      AI_RANKING_STRATEGY.TYPES.RELEVANCE_OPTIMIZATION,
      AI_RANKING_STRATEGY.TYPES.ENSEMBLE_RANK,
      AI_RANKING_STRATEGY.TYPES.HYBRID_POINT_LIST,
    ],
    [AI_RANKING_STRATEGY.GOALS.BALANCED]: [
      AI_RANKING_STRATEGY.TYPES.HYBRID_POINT_PAIR,
      AI_RANKING_STRATEGY.TYPES.HYBRID_PAIR_LIST,
      AI_RANKING_STRATEGY.TYPES.ENSEMBLE_RANK,
    ],
    [AI_RANKING_STRATEGY.GOALS.EXPLORE_EXPLOIT]: [
      AI_RANKING_STRATEGY.TYPES.PAIR_WISE_BOOSTING,
      AI_RANKING_STRATEGY.TYPES.REINFORCEMENT_RANK,
      AI_RANKING_STRATEGY.TYPES.ENSEMBLE_RANK,
    ],
  };
  return mapping[goal] || [];
}
