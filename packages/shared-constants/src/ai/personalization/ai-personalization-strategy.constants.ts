/**
 * AI Personalization Strategy Constants
 * Strategies and approaches for personalization
 */

export const AI_PERSONALIZATION_STRATEGY = {
  // Strategy Types
  TYPES: {
    // Rule-Based Strategies
    RULE_BASED: 'rule_based',
    DECISION_TREE: 'decision_tree',
    EXPERT_SYSTEM: 'expert_system',

    // Machine Learning Strategies
    SUPERVISED: 'supervised',
    UNSUPERVISED: 'unsupervised',
    SEMI_SUPERVISED: 'semi_supervised',
    REINFORCEMENT: 'reinforcement',

    // Deep Learning Strategies
    DEEP_NEURAL: 'deep_neural',
    CONVOLUTIONAL: 'convolutional',
    RECURRENT: 'recurrent',
    TRANSFORMER: 'transformer',
    ATTENTION: 'attention',

    // Hybrid Strategies
    ENSEMBLE: 'ensemble',
    STACKING: 'stacking',
    BOOSTING: 'boosting',
    BAGGING: 'bagging',
    HYBRID: 'hybrid',

    // Advanced Strategies
    MULTI_ARMED_BANDIT: 'multi_armed_bandit',
    CONTEXTUAL_BANDIT: 'contextual_bandit',
    EXPLORE_EXPLOIT: 'explore_exploit',
    ACTIVE_LEARNING: 'active_learning',
    ONLINE_LEARNING: 'online_learning',
    TRANSFER_LEARNING: 'transfer_learning',
    FEDERATED_LEARNING: 'federated_learning',
  } as const,

  // Strategy Approaches
  APPROACHES: {
    EXPLICIT: 'explicit',
    IMPLICIT: 'implicit',
    HYBRID: 'hybrid',
    ADAPTIVE: 'adaptive',
    PREDICTIVE: 'predictive',
    REACTIVE: 'reactive',
    PROACTIVE: 'proactive',
    INTERACTIVE: 'interactive',
  } as const,

  // Strategy Goals
  GOALS: {
    MAXIMIZE_RELEVANCE: 'maximize_relevance',
    MAXIMIZE_ENGAGEMENT: 'maximize_engagement',
    MAXIMIZE_CONVERSION: 'maximize_conversion',
    MAXIMIZE_RETENTION: 'maximize_retention',
    MAXIMIZE_SATISFACTION: 'maximize_satisfaction',
    MAXIMIZE_LOYALTY: 'maximize_loyalty',
    MAXIMIZE_REVENUE: 'maximize_revenue',
    MAXIMIZE_LIFETIME_VALUE: 'maximize_lifetime_value',
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
    PRIVACY: 'privacy',
    FAIRNESS: 'fairness',
    TRANSPARENCY: 'transparency',
  } as const,

  // Strategy Execution
  EXECUTION: {
    REAL_TIME: 'real_time',
    BATCH: 'batch',
    STREAMING: 'streaming',
    SCHEDULED: 'scheduled',
    EVENT_DRIVEN: 'event_driven',
    ON_DEMAND: 'on_demand',
  } as const,

  // Strategy Evaluation
  EVALUATION: {
    OFFLINE: 'offline',
    ONLINE: 'online',
    A_B_TEST: 'a_b_test',
    MULTIVARIATE: 'multivariate',
    BANDIT_EVAL: 'bandit_eval',
    SIMULATION: 'simulation',
    USER_STUDY: 'user_study',
  } as const,
} as const;

// Strategy Types
export type AIPersonalizationStrategyType =
  (typeof AI_PERSONALIZATION_STRATEGY.TYPES)[keyof typeof AI_PERSONALIZATION_STRATEGY.TYPES];

// Strategy Approaches
export type AIPersonalizationStrategyApproach =
  (typeof AI_PERSONALIZATION_STRATEGY.APPROACHES)[keyof typeof AI_PERSONALIZATION_STRATEGY.APPROACHES];

// Strategy Goals
export type AIPersonalizationStrategyGoal =
  (typeof AI_PERSONALIZATION_STRATEGY.GOALS)[keyof typeof AI_PERSONALIZATION_STRATEGY.GOALS];

// Strategy Optimization
export type AIPersonalizationStrategyOptimization =
  (typeof AI_PERSONALIZATION_STRATEGY.OPTIMIZATION)[keyof typeof AI_PERSONALIZATION_STRATEGY.OPTIMIZATION];

// Strategy Execution
export type AIPersonalizationStrategyExecution =
  (typeof AI_PERSONALIZATION_STRATEGY.EXECUTION)[keyof typeof AI_PERSONALIZATION_STRATEGY.EXECUTION];

// Strategy Evaluation
export type AIPersonalizationStrategyEvaluation =
  (typeof AI_PERSONALIZATION_STRATEGY.EVALUATION)[keyof typeof AI_PERSONALIZATION_STRATEGY.EVALUATION];

// Utility Functions
export function getPersonalizationStrategyTypeLabel(
  strategy: AIPersonalizationStrategyType
): string {
  const labels: Record<AIPersonalizationStrategyType, string> = {
    [AI_PERSONALIZATION_STRATEGY.TYPES.RULE_BASED]: 'Rule Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.DECISION_TREE]: 'Decision Tree',
    [AI_PERSONALIZATION_STRATEGY.TYPES.EXPERT_SYSTEM]: 'Expert System',
    [AI_PERSONALIZATION_STRATEGY.TYPES.SUPERVISED]: 'Supervised Learning',
    [AI_PERSONALIZATION_STRATEGY.TYPES.UNSUPERVISED]: 'Unsupervised Learning',
    [AI_PERSONALIZATION_STRATEGY.TYPES.SEMI_SUPERVISED]: 'Semi-Supervised Learning',
    [AI_PERSONALIZATION_STRATEGY.TYPES.REINFORCEMENT]: 'Reinforcement Learning',
    [AI_PERSONALIZATION_STRATEGY.TYPES.DEEP_NEURAL]: 'Deep Neural Network',
    [AI_PERSONALIZATION_STRATEGY.TYPES.CONVOLUTIONAL]: 'Convolutional Neural Network',
    [AI_PERSONALIZATION_STRATEGY.TYPES.RECURRENT]: 'Recurrent Neural Network',
    [AI_PERSONALIZATION_STRATEGY.TYPES.TRANSFORMER]: 'Transformer',
    [AI_PERSONALIZATION_STRATEGY.TYPES.ATTENTION]: 'Attention Mechanism',
    [AI_PERSONALIZATION_STRATEGY.TYPES.ENSEMBLE]: 'Ensemble',
    [AI_PERSONALIZATION_STRATEGY.TYPES.STACKING]: 'Stacking',
    [AI_PERSONALIZATION_STRATEGY.TYPES.BOOSTING]: 'Boosting',
    [AI_PERSONALIZATION_STRATEGY.TYPES.BAGGING]: 'Bagging',
    [AI_PERSONALIZATION_STRATEGY.TYPES.HYBRID]: 'Hybrid',
    [AI_PERSONALIZATION_STRATEGY.TYPES.MULTI_ARMED_BANDIT]: 'Multi-Armed Bandit',
    [AI_PERSONALIZATION_STRATEGY.TYPES.CONTEXTUAL_BANDIT]: 'Contextual Bandit',
    [AI_PERSONALIZATION_STRATEGY.TYPES.EXPLORE_EXPLOIT]: 'Explore-Exploit',
    [AI_PERSONALIZATION_STRATEGY.TYPES.ACTIVE_LEARNING]: 'Active Learning',
    [AI_PERSONALIZATION_STRATEGY.TYPES.ONLINE_LEARNING]: 'Online Learning',
    [AI_PERSONALIZATION_STRATEGY.TYPES.TRANSFER_LEARNING]: 'Transfer Learning',
    [AI_PERSONALIZATION_STRATEGY.TYPES.FEDERATED_LEARNING]: 'Federated Learning',
  };
  return labels[strategy] || 'Unknown';
}

export function getPersonalizationStrategyApproachLabel(
  approach: AIPersonalizationStrategyApproach
): string {
  const labels: Record<AIPersonalizationStrategyApproach, string> = {
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.EXPLICIT]: 'Explicit',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.IMPLICIT]: 'Implicit',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.HYBRID]: 'Hybrid',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.ADAPTIVE]: 'Adaptive',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.PREDICTIVE]: 'Predictive',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.REACTIVE]: 'Reactive',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.PROACTIVE]: 'Proactive',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.INTERACTIVE]: 'Interactive',
  };
  return labels[approach] || 'Unknown';
}

export function getPersonalizationStrategyGoalLabel(goal: AIPersonalizationStrategyGoal): string {
  const labels: Record<AIPersonalizationStrategyGoal, string> = {
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_RELEVANCE]: 'Maximize Relevance',
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_ENGAGEMENT]: 'Maximize Engagement',
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_CONVERSION]: 'Maximize Conversion',
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_RETENTION]: 'Maximize Retention',
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_SATISFACTION]: 'Maximize Satisfaction',
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_LOYALTY]: 'Maximize Loyalty',
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_REVENUE]: 'Maximize Revenue',
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_LIFETIME_VALUE]: 'Maximize Lifetime Value',
    [AI_PERSONALIZATION_STRATEGY.GOALS.BALANCED]: 'Balanced',
    [AI_PERSONALIZATION_STRATEGY.GOALS.EXPLORE_EXPLOIT]: 'Explore-Exploit',
  };
  return labels[goal] || 'Unknown';
}

export function getPersonalizationStrategyExecutionLabel(
  execution: AIPersonalizationStrategyExecution
): string {
  const labels: Record<AIPersonalizationStrategyExecution, string> = {
    [AI_PERSONALIZATION_STRATEGY.EXECUTION.REAL_TIME]: 'Real Time',
    [AI_PERSONALIZATION_STRATEGY.EXECUTION.BATCH]: 'Batch',
    [AI_PERSONALIZATION_STRATEGY.EXECUTION.STREAMING]: 'Streaming',
    [AI_PERSONALIZATION_STRATEGY.EXECUTION.SCHEDULED]: 'Scheduled',
    [AI_PERSONALIZATION_STRATEGY.EXECUTION.EVENT_DRIVEN]: 'Event Driven',
    [AI_PERSONALIZATION_STRATEGY.EXECUTION.ON_DEMAND]: 'On Demand',
  };
  return labels[execution] || 'Unknown';
}

export function getPersonalizationStrategyEvaluationLabel(
  evaluation: AIPersonalizationStrategyEvaluation
): string {
  const labels: Record<AIPersonalizationStrategyEvaluation, string> = {
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.OFFLINE]: 'Offline',
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.ONLINE]: 'Online',
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.A_B_TEST]: 'A/B Test',
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.MULTIVARIATE]: 'Multivariate',
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.BANDIT_EVAL]: 'Bandit',
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.SIMULATION]: 'Simulation',
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.USER_STUDY]: 'User Study',
  };
  return labels[evaluation] || 'Unknown';
}

export function getRecommendedStrategyForGoal(
  goal: AIPersonalizationStrategyGoal
): AIPersonalizationStrategyType[] {
  const mapping: Record<AIPersonalizationStrategyGoal, AIPersonalizationStrategyType[]> = {
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_RELEVANCE]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.SUPERVISED,
      AI_PERSONALIZATION_STRATEGY.TYPES.DEEP_NEURAL,
      AI_PERSONALIZATION_STRATEGY.TYPES.TRANSFORMER,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_ENGAGEMENT]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.CONTEXTUAL_BANDIT,
      AI_PERSONALIZATION_STRATEGY.TYPES.REINFORCEMENT,
      AI_PERSONALIZATION_STRATEGY.TYPES.ENSEMBLE,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_CONVERSION]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.MULTI_ARMED_BANDIT,
      AI_PERSONALIZATION_STRATEGY.TYPES.ACTIVE_LEARNING,
      AI_PERSONALIZATION_STRATEGY.TYPES.BOOSTING,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_RETENTION]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.FEDERATED_LEARNING,
      AI_PERSONALIZATION_STRATEGY.TYPES.ONLINE_LEARNING,
      AI_PERSONALIZATION_STRATEGY.TYPES.STACKING,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_SATISFACTION]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.EXPERT_SYSTEM,
      AI_PERSONALIZATION_STRATEGY.TYPES.DECISION_TREE,
      AI_PERSONALIZATION_STRATEGY.TYPES.RULE_BASED,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_LOYALTY]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.TRANSFER_LEARNING,
      AI_PERSONALIZATION_STRATEGY.TYPES.FEDERATED_LEARNING,
      AI_PERSONALIZATION_STRATEGY.TYPES.ENSEMBLE,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_REVENUE]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.CONTEXTUAL_BANDIT,
      AI_PERSONALIZATION_STRATEGY.TYPES.MULTI_ARMED_BANDIT,
      AI_PERSONALIZATION_STRATEGY.TYPES.BOOSTING,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.MAXIMIZE_LIFETIME_VALUE]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.TRANSFER_LEARNING,
      AI_PERSONALIZATION_STRATEGY.TYPES.ONLINE_LEARNING,
      AI_PERSONALIZATION_STRATEGY.TYPES.STACKING,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.BALANCED]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.ENSEMBLE,
      AI_PERSONALIZATION_STRATEGY.TYPES.HYBRID,
      AI_PERSONALIZATION_STRATEGY.TYPES.BAGGING,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.EXPLORE_EXPLOIT]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.MULTI_ARMED_BANDIT,
      AI_PERSONALIZATION_STRATEGY.TYPES.CONTEXTUAL_BANDIT,
      AI_PERSONALIZATION_STRATEGY.TYPES.REINFORCEMENT,
    ],
  };
  return mapping[goal] || [];
}
