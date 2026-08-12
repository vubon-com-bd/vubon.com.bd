/**
 * AI পার্সোনালাইজেশন স্ট্র্যাটেজি এনাম
 */
export const AI_PERSONALIZATION_STRATEGY = {
  EXPLICIT: 'explicit',
  IMPLICIT: 'implicit',
  HYBRID: 'hybrid',
  ADAPTIVE: 'adaptive',
  PREDICTIVE: 'predictive',
  REINFORCEMENT_LEARNING: 'reinforcement-learning',
} as const;

/**
 * AI_PERSONALIZATION_STRATEGY থেকে টাইপ
 */
export type AIPersonalizationStrategyType =
  (typeof AI_PERSONALIZATION_STRATEGY)[keyof typeof AI_PERSONALIZATION_STRATEGY];

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি লেবেল
 */
export const AI_PERSONALIZATION_STRATEGY_LABELS: Record<AIPersonalizationStrategyType, string> = {
  [AI_PERSONALIZATION_STRATEGY.EXPLICIT]: 'Explicit',
  [AI_PERSONALIZATION_STRATEGY.IMPLICIT]: 'Implicit',
  [AI_PERSONALIZATION_STRATEGY.HYBRID]: 'Hybrid',
  [AI_PERSONALIZATION_STRATEGY.ADAPTIVE]: 'Adaptive',
  [AI_PERSONALIZATION_STRATEGY.PREDICTIVE]: 'Predictive',
  [AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING]: 'Reinforcement Learning',
} as const;

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি বিবরণ
 */
export const AI_PERSONALIZATION_STRATEGY_DESCRIPTIONS: Record<
  AIPersonalizationStrategyType,
  string
> = {
  [AI_PERSONALIZATION_STRATEGY.EXPLICIT]:
    'Uses explicit user feedback like ratings, surveys, and preferences',
  [AI_PERSONALIZATION_STRATEGY.IMPLICIT]:
    'Uses implicit signals like clicks, views, and time spent',
  [AI_PERSONALIZATION_STRATEGY.HYBRID]:
    'Combines explicit and implicit feedback for better accuracy',
  [AI_PERSONALIZATION_STRATEGY.ADAPTIVE]:
    'Continuously adapts to changing user behavior in real-time',
  [AI_PERSONALIZATION_STRATEGY.PREDICTIVE]:
    'Uses predictive models to anticipate user needs and preferences',
  [AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING]:
    'Uses RL to optimize personalization through trial and error',
} as const;

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি আইকন
 */
export const AI_PERSONALIZATION_STRATEGY_ICONS: Record<AIPersonalizationStrategyType, string> = {
  [AI_PERSONALIZATION_STRATEGY.EXPLICIT]: '📝',
  [AI_PERSONALIZATION_STRATEGY.IMPLICIT]: '👁️',
  [AI_PERSONALIZATION_STRATEGY.HYBRID]: '🔄',
  [AI_PERSONALIZATION_STRATEGY.ADAPTIVE]: '📊',
  [AI_PERSONALIZATION_STRATEGY.PREDICTIVE]: '🔮',
  [AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING]: '🧠',
} as const;

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি কমপ্লেক্সিটি (১-৫)
 */
export const AI_PERSONALIZATION_STRATEGY_COMPLEXITY: Record<AIPersonalizationStrategyType, number> =
  {
    [AI_PERSONALIZATION_STRATEGY.EXPLICIT]: 1,
    [AI_PERSONALIZATION_STRATEGY.IMPLICIT]: 2,
    [AI_PERSONALIZATION_STRATEGY.HYBRID]: 3,
    [AI_PERSONALIZATION_STRATEGY.ADAPTIVE]: 4,
    [AI_PERSONALIZATION_STRATEGY.PREDICTIVE]: 4,
    [AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING]: 5,
  } as const;

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি পারফরম্যান্স স্কোর (০-১০০)
 */
export const AI_PERSONALIZATION_STRATEGY_PERFORMANCE: Record<
  AIPersonalizationStrategyType,
  number
> = {
  [AI_PERSONALIZATION_STRATEGY.EXPLICIT]: 75,
  [AI_PERSONALIZATION_STRATEGY.IMPLICIT]: 70,
  [AI_PERSONALIZATION_STRATEGY.HYBRID]: 88,
  [AI_PERSONALIZATION_STRATEGY.ADAPTIVE]: 85,
  [AI_PERSONALIZATION_STRATEGY.PREDICTIVE]: 90,
  [AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING]: 92,
} as const;

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি কনফিগারেশন
 */
export interface AIPersonalizationStrategyConfig {
  strategy: AIPersonalizationStrategyType;
  label: string;
  description: string;
  icon: string;
  complexity: number;
  performance: number;
  requiresTraining: boolean;
  requiresRealTime: boolean;
  requiresUserFeedback: boolean;
  isExplainable: boolean;
  convergenceTime: string;
}

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি মেটাডেটা
 */
export const AI_PERSONALIZATION_STRATEGY_METADATA: Record<
  AIPersonalizationStrategyType,
  AIPersonalizationStrategyConfig
> = {
  [AI_PERSONALIZATION_STRATEGY.EXPLICIT]: {
    strategy: AI_PERSONALIZATION_STRATEGY.EXPLICIT,
    label: AI_PERSONALIZATION_STRATEGY_LABELS[AI_PERSONALIZATION_STRATEGY.EXPLICIT],
    description: AI_PERSONALIZATION_STRATEGY_DESCRIPTIONS[AI_PERSONALIZATION_STRATEGY.EXPLICIT],
    icon: AI_PERSONALIZATION_STRATEGY_ICONS[AI_PERSONALIZATION_STRATEGY.EXPLICIT],
    complexity: AI_PERSONALIZATION_STRATEGY_COMPLEXITY[AI_PERSONALIZATION_STRATEGY.EXPLICIT],
    performance: AI_PERSONALIZATION_STRATEGY_PERFORMANCE[AI_PERSONALIZATION_STRATEGY.EXPLICIT],
    requiresTraining: false,
    requiresRealTime: true,
    requiresUserFeedback: true,
    isExplainable: true,
    convergenceTime: 'immediate',
  },
  [AI_PERSONALIZATION_STRATEGY.IMPLICIT]: {
    strategy: AI_PERSONALIZATION_STRATEGY.IMPLICIT,
    label: AI_PERSONALIZATION_STRATEGY_LABELS[AI_PERSONALIZATION_STRATEGY.IMPLICIT],
    description: AI_PERSONALIZATION_STRATEGY_DESCRIPTIONS[AI_PERSONALIZATION_STRATEGY.IMPLICIT],
    icon: AI_PERSONALIZATION_STRATEGY_ICONS[AI_PERSONALIZATION_STRATEGY.IMPLICIT],
    complexity: AI_PERSONALIZATION_STRATEGY_COMPLEXITY[AI_PERSONALIZATION_STRATEGY.IMPLICIT],
    performance: AI_PERSONALIZATION_STRATEGY_PERFORMANCE[AI_PERSONALIZATION_STRATEGY.IMPLICIT],
    requiresTraining: false,
    requiresRealTime: true,
    requiresUserFeedback: false,
    isExplainable: false,
    convergenceTime: 'hours',
  },
  [AI_PERSONALIZATION_STRATEGY.HYBRID]: {
    strategy: AI_PERSONALIZATION_STRATEGY.HYBRID,
    label: AI_PERSONALIZATION_STRATEGY_LABELS[AI_PERSONALIZATION_STRATEGY.HYBRID],
    description: AI_PERSONALIZATION_STRATEGY_DESCRIPTIONS[AI_PERSONALIZATION_STRATEGY.HYBRID],
    icon: AI_PERSONALIZATION_STRATEGY_ICONS[AI_PERSONALIZATION_STRATEGY.HYBRID],
    complexity: AI_PERSONALIZATION_STRATEGY_COMPLEXITY[AI_PERSONALIZATION_STRATEGY.HYBRID],
    performance: AI_PERSONALIZATION_STRATEGY_PERFORMANCE[AI_PERSONALIZATION_STRATEGY.HYBRID],
    requiresTraining: false,
    requiresRealTime: true,
    requiresUserFeedback: true,
    isExplainable: false,
    convergenceTime: 'days',
  },
  [AI_PERSONALIZATION_STRATEGY.ADAPTIVE]: {
    strategy: AI_PERSONALIZATION_STRATEGY.ADAPTIVE,
    label: AI_PERSONALIZATION_STRATEGY_LABELS[AI_PERSONALIZATION_STRATEGY.ADAPTIVE],
    description: AI_PERSONALIZATION_STRATEGY_DESCRIPTIONS[AI_PERSONALIZATION_STRATEGY.ADAPTIVE],
    icon: AI_PERSONALIZATION_STRATEGY_ICONS[AI_PERSONALIZATION_STRATEGY.ADAPTIVE],
    complexity: AI_PERSONALIZATION_STRATEGY_COMPLEXITY[AI_PERSONALIZATION_STRATEGY.ADAPTIVE],
    performance: AI_PERSONALIZATION_STRATEGY_PERFORMANCE[AI_PERSONALIZATION_STRATEGY.ADAPTIVE],
    requiresTraining: true,
    requiresRealTime: true,
    requiresUserFeedback: true,
    isExplainable: false,
    convergenceTime: 'hours',
  },
  [AI_PERSONALIZATION_STRATEGY.PREDICTIVE]: {
    strategy: AI_PERSONALIZATION_STRATEGY.PREDICTIVE,
    label: AI_PERSONALIZATION_STRATEGY_LABELS[AI_PERSONALIZATION_STRATEGY.PREDICTIVE],
    description: AI_PERSONALIZATION_STRATEGY_DESCRIPTIONS[AI_PERSONALIZATION_STRATEGY.PREDICTIVE],
    icon: AI_PERSONALIZATION_STRATEGY_ICONS[AI_PERSONALIZATION_STRATEGY.PREDICTIVE],
    complexity: AI_PERSONALIZATION_STRATEGY_COMPLEXITY[AI_PERSONALIZATION_STRATEGY.PREDICTIVE],
    performance: AI_PERSONALIZATION_STRATEGY_PERFORMANCE[AI_PERSONALIZATION_STRATEGY.PREDICTIVE],
    requiresTraining: true,
    requiresRealTime: false,
    requiresUserFeedback: true,
    isExplainable: false,
    convergenceTime: 'weeks',
  },
  [AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING]: {
    strategy: AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING,
    label: AI_PERSONALIZATION_STRATEGY_LABELS[AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING],
    description:
      AI_PERSONALIZATION_STRATEGY_DESCRIPTIONS[AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING],
    icon: AI_PERSONALIZATION_STRATEGY_ICONS[AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING],
    complexity:
      AI_PERSONALIZATION_STRATEGY_COMPLEXITY[AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING],
    performance:
      AI_PERSONALIZATION_STRATEGY_PERFORMANCE[AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING],
    requiresTraining: true,
    requiresRealTime: false,
    requiresUserFeedback: true,
    isExplainable: false,
    convergenceTime: 'months',
  },
} as const;

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি ক্যাটাগরি
 */
export const AI_PERSONALIZATION_STRATEGY_CATEGORIES = {
  FEEDBACK_BASED: [
    AI_PERSONALIZATION_STRATEGY.EXPLICIT,
    AI_PERSONALIZATION_STRATEGY.IMPLICIT,
  ] as const,
  HYBRID: [AI_PERSONALIZATION_STRATEGY.HYBRID] as const,
  ADVANCED: [
    AI_PERSONALIZATION_STRATEGY.ADAPTIVE,
    AI_PERSONALIZATION_STRATEGY.PREDICTIVE,
    AI_PERSONALIZATION_STRATEGY.REINFORCEMENT_LEARNING,
  ] as const,
} as const;

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি ক্যাটাগরি লেবেল
 */
export const AI_PERSONALIZATION_STRATEGY_CATEGORY_LABELS = {
  FEEDBACK_BASED: 'Feedback Based',
  HYBRID: 'Hybrid',
  ADVANCED: 'Advanced',
} as const;
