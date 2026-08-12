/**
 * AI র্যাঙ্কিং স্ট্র্যাটেজি এনাম
 */
export const AI_RANKING_STRATEGY = {
  LEARNING_TO_RANK: 'learning-to-rank',
  POINTWISE: 'pointwise',
  PAIRWISE: 'pairwise',
  LISTWISE: 'listwise',
  NEURAL_RANKING: 'neural-ranking',
  TREE_BASED: 'tree-based',
  ENSEMBLE: 'ensemble',
} as const;

/**
 * AI_RANKING_STRATEGY থেকে টাইপ
 */
export type AIRankingStrategyType = (typeof AI_RANKING_STRATEGY)[keyof typeof AI_RANKING_STRATEGY];

/**
 * র্যাঙ্কিং স্ট্র্যাটেজি লেবেল
 */
export const AI_RANKING_STRATEGY_LABELS: Record<AIRankingStrategyType, string> = {
  [AI_RANKING_STRATEGY.LEARNING_TO_RANK]: 'Learning to Rank',
  [AI_RANKING_STRATEGY.POINTWISE]: 'Pointwise',
  [AI_RANKING_STRATEGY.PAIRWISE]: 'Pairwise',
  [AI_RANKING_STRATEGY.LISTWISE]: 'Listwise',
  [AI_RANKING_STRATEGY.NEURAL_RANKING]: 'Neural Ranking',
  [AI_RANKING_STRATEGY.TREE_BASED]: 'Tree Based',
  [AI_RANKING_STRATEGY.ENSEMBLE]: 'Ensemble',
} as const;

/**
 * র্যাঙ্কিং স্ট্র্যাটেজি বিবরণ
 */
export const AI_RANKING_STRATEGY_DESCRIPTIONS: Record<AIRankingStrategyType, string> = {
  [AI_RANKING_STRATEGY.LEARNING_TO_RANK]:
    'Uses machine learning to learn optimal ranking functions',
  [AI_RANKING_STRATEGY.POINTWISE]:
    'Treats ranking as regression or classification on individual items',
  [AI_RANKING_STRATEGY.PAIRWISE]: 'Uses pairwise comparisons to learn ranking preferences',
  [AI_RANKING_STRATEGY.LISTWISE]: 'Optimizes ranking using list-level loss functions',
  [AI_RANKING_STRATEGY.NEURAL_RANKING]: 'Uses neural networks for complex ranking patterns',
  [AI_RANKING_STRATEGY.TREE_BASED]: 'Uses tree-based models like Random Forest for ranking',
  [AI_RANKING_STRATEGY.ENSEMBLE]: 'Combines multiple ranking models for better performance',
} as const;

/**
 * র্যাঙ্কিং স্ট্র্যাটেজি আইকন
 */
export const AI_RANKING_STRATEGY_ICONS: Record<AIRankingStrategyType, string> = {
  [AI_RANKING_STRATEGY.LEARNING_TO_RANK]: '🎓',
  [AI_RANKING_STRATEGY.POINTWISE]: '📍',
  [AI_RANKING_STRATEGY.PAIRWISE]: '⚖️',
  [AI_RANKING_STRATEGY.LISTWISE]: '📋',
  [AI_RANKING_STRATEGY.NEURAL_RANKING]: '🧠',
  [AI_RANKING_STRATEGY.TREE_BASED]: '🌳',
  [AI_RANKING_STRATEGY.ENSEMBLE]: '🤝',
} as const;

/**
 * র্যাঙ্কিং স্ট্র্যাটেজি কমপ্লেক্সিটি (১-৫)
 */
export const AI_RANKING_STRATEGY_COMPLEXITY: Record<AIRankingStrategyType, number> = {
  [AI_RANKING_STRATEGY.LEARNING_TO_RANK]: 4,
  [AI_RANKING_STRATEGY.POINTWISE]: 2,
  [AI_RANKING_STRATEGY.PAIRWISE]: 3,
  [AI_RANKING_STRATEGY.LISTWISE]: 4,
  [AI_RANKING_STRATEGY.NEURAL_RANKING]: 5,
  [AI_RANKING_STRATEGY.TREE_BASED]: 3,
  [AI_RANKING_STRATEGY.ENSEMBLE]: 5,
} as const;

/**
 * র্যাঙ্কিং স্ট্র্যাটেজি পারফরম্যান্স স্কোর (০-১০০)
 */
export const AI_RANKING_STRATEGY_PERFORMANCE: Record<AIRankingStrategyType, number> = {
  [AI_RANKING_STRATEGY.LEARNING_TO_RANK]: 88,
  [AI_RANKING_STRATEGY.POINTWISE]: 75,
  [AI_RANKING_STRATEGY.PAIRWISE]: 82,
  [AI_RANKING_STRATEGY.LISTWISE]: 90,
  [AI_RANKING_STRATEGY.NEURAL_RANKING]: 94,
  [AI_RANKING_STRATEGY.TREE_BASED]: 85,
  [AI_RANKING_STRATEGY.ENSEMBLE]: 95,
} as const;

/**
 * র্যাঙ্কিং স্ট্র্যাটেজি কনফিগারেশন
 */
export interface AIRankingStrategyConfig {
  strategy: AIRankingStrategyType;
  label: string;
  description: string;
  icon: string;
  complexity: number;
  performance: number;
  requiresTraining: boolean;
  requiresFeatures: boolean;
  requiresLabels: boolean;
  isInterpretable: boolean;
  convergenceSpeed: string;
}

/**
 * র্যাঙ্কিং স্ট্র্যাটেজি মেটাডেটা
 */
export const AI_RANKING_STRATEGY_METADATA: Record<AIRankingStrategyType, AIRankingStrategyConfig> =
  {
    [AI_RANKING_STRATEGY.LEARNING_TO_RANK]: {
      strategy: AI_RANKING_STRATEGY.LEARNING_TO_RANK,
      label: AI_RANKING_STRATEGY_LABELS[AI_RANKING_STRATEGY.LEARNING_TO_RANK],
      description: AI_RANKING_STRATEGY_DESCRIPTIONS[AI_RANKING_STRATEGY.LEARNING_TO_RANK],
      icon: AI_RANKING_STRATEGY_ICONS[AI_RANKING_STRATEGY.LEARNING_TO_RANK],
      complexity: AI_RANKING_STRATEGY_COMPLEXITY[AI_RANKING_STRATEGY.LEARNING_TO_RANK],
      performance: AI_RANKING_STRATEGY_PERFORMANCE[AI_RANKING_STRATEGY.LEARNING_TO_RANK],
      requiresTraining: true,
      requiresFeatures: true,
      requiresLabels: true,
      isInterpretable: false,
      convergenceSpeed: 'slow',
    },
    [AI_RANKING_STRATEGY.POINTWISE]: {
      strategy: AI_RANKING_STRATEGY.POINTWISE,
      label: AI_RANKING_STRATEGY_LABELS[AI_RANKING_STRATEGY.POINTWISE],
      description: AI_RANKING_STRATEGY_DESCRIPTIONS[AI_RANKING_STRATEGY.POINTWISE],
      icon: AI_RANKING_STRATEGY_ICONS[AI_RANKING_STRATEGY.POINTWISE],
      complexity: AI_RANKING_STRATEGY_COMPLEXITY[AI_RANKING_STRATEGY.POINTWISE],
      performance: AI_RANKING_STRATEGY_PERFORMANCE[AI_RANKING_STRATEGY.POINTWISE],
      requiresTraining: false,
      requiresFeatures: true,
      requiresLabels: false,
      isInterpretable: true,
      convergenceSpeed: 'fast',
    },
    [AI_RANKING_STRATEGY.PAIRWISE]: {
      strategy: AI_RANKING_STRATEGY.PAIRWISE,
      label: AI_RANKING_STRATEGY_LABELS[AI_RANKING_STRATEGY.PAIRWISE],
      description: AI_RANKING_STRATEGY_DESCRIPTIONS[AI_RANKING_STRATEGY.PAIRWISE],
      icon: AI_RANKING_STRATEGY_ICONS[AI_RANKING_STRATEGY.PAIRWISE],
      complexity: AI_RANKING_STRATEGY_COMPLEXITY[AI_RANKING_STRATEGY.PAIRWISE],
      performance: AI_RANKING_STRATEGY_PERFORMANCE[AI_RANKING_STRATEGY.PAIRWISE],
      requiresTraining: true,
      requiresFeatures: true,
      requiresLabels: true,
      isInterpretable: false,
      convergenceSpeed: 'medium',
    },
    [AI_RANKING_STRATEGY.LISTWISE]: {
      strategy: AI_RANKING_STRATEGY.LISTWISE,
      label: AI_RANKING_STRATEGY_LABELS[AI_RANKING_STRATEGY.LISTWISE],
      description: AI_RANKING_STRATEGY_DESCRIPTIONS[AI_RANKING_STRATEGY.LISTWISE],
      icon: AI_RANKING_STRATEGY_ICONS[AI_RANKING_STRATEGY.LISTWISE],
      complexity: AI_RANKING_STRATEGY_COMPLEXITY[AI_RANKING_STRATEGY.LISTWISE],
      performance: AI_RANKING_STRATEGY_PERFORMANCE[AI_RANKING_STRATEGY.LISTWISE],
      requiresTraining: true,
      requiresFeatures: true,
      requiresLabels: true,
      isInterpretable: false,
      convergenceSpeed: 'slow',
    },
    [AI_RANKING_STRATEGY.NEURAL_RANKING]: {
      strategy: AI_RANKING_STRATEGY.NEURAL_RANKING,
      label: AI_RANKING_STRATEGY_LABELS[AI_RANKING_STRATEGY.NEURAL_RANKING],
      description: AI_RANKING_STRATEGY_DESCRIPTIONS[AI_RANKING_STRATEGY.NEURAL_RANKING],
      icon: AI_RANKING_STRATEGY_ICONS[AI_RANKING_STRATEGY.NEURAL_RANKING],
      complexity: AI_RANKING_STRATEGY_COMPLEXITY[AI_RANKING_STRATEGY.NEURAL_RANKING],
      performance: AI_RANKING_STRATEGY_PERFORMANCE[AI_RANKING_STRATEGY.NEURAL_RANKING],
      requiresTraining: true,
      requiresFeatures: true,
      requiresLabels: true,
      isInterpretable: false,
      convergenceSpeed: 'very-slow',
    },
    [AI_RANKING_STRATEGY.TREE_BASED]: {
      strategy: AI_RANKING_STRATEGY.TREE_BASED,
      label: AI_RANKING_STRATEGY_LABELS[AI_RANKING_STRATEGY.TREE_BASED],
      description: AI_RANKING_STRATEGY_DESCRIPTIONS[AI_RANKING_STRATEGY.TREE_BASED],
      icon: AI_RANKING_STRATEGY_ICONS[AI_RANKING_STRATEGY.TREE_BASED],
      complexity: AI_RANKING_STRATEGY_COMPLEXITY[AI_RANKING_STRATEGY.TREE_BASED],
      performance: AI_RANKING_STRATEGY_PERFORMANCE[AI_RANKING_STRATEGY.TREE_BASED],
      requiresTraining: true,
      requiresFeatures: true,
      requiresLabels: true,
      isInterpretable: true,
      convergenceSpeed: 'medium',
    },
    [AI_RANKING_STRATEGY.ENSEMBLE]: {
      strategy: AI_RANKING_STRATEGY.ENSEMBLE,
      label: AI_RANKING_STRATEGY_LABELS[AI_RANKING_STRATEGY.ENSEMBLE],
      description: AI_RANKING_STRATEGY_DESCRIPTIONS[AI_RANKING_STRATEGY.ENSEMBLE],
      icon: AI_RANKING_STRATEGY_ICONS[AI_RANKING_STRATEGY.ENSEMBLE],
      complexity: AI_RANKING_STRATEGY_COMPLEXITY[AI_RANKING_STRATEGY.ENSEMBLE],
      performance: AI_RANKING_STRATEGY_PERFORMANCE[AI_RANKING_STRATEGY.ENSEMBLE],
      requiresTraining: true,
      requiresFeatures: true,
      requiresLabels: true,
      isInterpretable: false,
      convergenceSpeed: 'slow',
    },
  } as const;

/**
 * র্যাঙ্কিং স্ট্র্যাটেজি ক্যাটাগরি
 */
export const AI_RANKING_STRATEGY_CATEGORIES = {
  TRADITIONAL: [
    AI_RANKING_STRATEGY.POINTWISE,
    AI_RANKING_STRATEGY.PAIRWISE,
    AI_RANKING_STRATEGY.TREE_BASED,
  ] as const,
  ADVANCED: [
    AI_RANKING_STRATEGY.LEARNING_TO_RANK,
    AI_RANKING_STRATEGY.LISTWISE,
    AI_RANKING_STRATEGY.NEURAL_RANKING,
  ] as const,
  HYBRID: [AI_RANKING_STRATEGY.ENSEMBLE] as const,
} as const;

/**
 * র্যাঙ্কিং স্ট্র্যাটেজি ক্যাটাগরি লেবেল
 */
export const AI_RANKING_STRATEGY_CATEGORY_LABELS = {
  TRADITIONAL: 'Traditional',
  ADVANCED: 'Advanced',
  HYBRID: 'Hybrid',
} as const;
