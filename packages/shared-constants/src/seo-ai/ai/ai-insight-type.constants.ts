/**
 * AI ইনসাইট টাইপ এনাম
 */
export const AI_INSIGHT_TYPE = {
  PATTERN: 'pattern',
  ANOMALY: 'anomaly',
  TREND: 'trend',
  OPPORTUNITY: 'opportunity',
  THREAT: 'threat',
  RECOMMENDATION: 'recommendation',
  WARNING: 'warning',
  PREDICTION: 'prediction',
  CORRELATION: 'correlation',
} as const;

/**
 * AI_INSIGHT_TYPE থেকে টাইপ
 */
export type AIInsightTypeType = (typeof AI_INSIGHT_TYPE)[keyof typeof AI_INSIGHT_TYPE];

/**
 * ইনসাইট টাইপ লেবেল
 */
export const AI_INSIGHT_TYPE_LABELS: Record<AIInsightTypeType, string> = {
  [AI_INSIGHT_TYPE.PATTERN]: 'Pattern',
  [AI_INSIGHT_TYPE.ANOMALY]: 'Anomaly',
  [AI_INSIGHT_TYPE.TREND]: 'Trend',
  [AI_INSIGHT_TYPE.OPPORTUNITY]: 'Opportunity',
  [AI_INSIGHT_TYPE.THREAT]: 'Threat',
  [AI_INSIGHT_TYPE.RECOMMENDATION]: 'Recommendation',
  [AI_INSIGHT_TYPE.WARNING]: 'Warning',
  [AI_INSIGHT_TYPE.PREDICTION]: 'Prediction',
  [AI_INSIGHT_TYPE.CORRELATION]: 'Correlation',
} as const;

/**
 * ইনসাইট টাইপ বিবরণ
 */
export const AI_INSIGHT_TYPE_DESCRIPTIONS: Record<AIInsightTypeType, string> = {
  [AI_INSIGHT_TYPE.PATTERN]: 'Identifies recurring patterns and sequences in data',
  [AI_INSIGHT_TYPE.ANOMALY]: 'Detects unusual patterns or outliers that deviate from normal',
  [AI_INSIGHT_TYPE.TREND]: 'Shows directional patterns and changes over time',
  [AI_INSIGHT_TYPE.OPPORTUNITY]: 'Highlights potential opportunities for improvement or growth',
  [AI_INSIGHT_TYPE.THREAT]: 'Identifies potential risks and threats to the system',
  [AI_INSIGHT_TYPE.RECOMMENDATION]: 'Provides actionable suggestions and recommendations',
  [AI_INSIGHT_TYPE.WARNING]: 'Alerts about potential issues that need attention',
  [AI_INSIGHT_TYPE.PREDICTION]: 'Forecasts future outcomes based on historical data',
  [AI_INSIGHT_TYPE.CORRELATION]: 'Finds relationships and dependencies between variables',
} as const;

/**
 * ইনসাইট টাইপ আইকন
 */
export const AI_INSIGHT_TYPE_ICONS: Record<AIInsightTypeType, string> = {
  [AI_INSIGHT_TYPE.PATTERN]: '🔄',
  [AI_INSIGHT_TYPE.ANOMALY]: '🚨',
  [AI_INSIGHT_TYPE.TREND]: '📈',
  [AI_INSIGHT_TYPE.OPPORTUNITY]: '💎',
  [AI_INSIGHT_TYPE.THREAT]: '⚠️',
  [AI_INSIGHT_TYPE.RECOMMENDATION]: '💡',
  [AI_INSIGHT_TYPE.WARNING]: '🔔',
  [AI_INSIGHT_TYPE.PREDICTION]: '🔮',
  [AI_INSIGHT_TYPE.CORRELATION]: '🔗',
} as const;

/**
 * ইনসাইট টাইপ কালার (হেক্স কোড)
 */
export const AI_INSIGHT_TYPE_COLORS: Record<AIInsightTypeType, string> = {
  [AI_INSIGHT_TYPE.PATTERN]: '#8b5cf6', // Violet-500
  [AI_INSIGHT_TYPE.ANOMALY]: '#dc2626', // Red-600
  [AI_INSIGHT_TYPE.TREND]: '#3b82f6', // Blue-500
  [AI_INSIGHT_TYPE.OPPORTUNITY]: '#22c55e', // Green-500
  [AI_INSIGHT_TYPE.THREAT]: '#ef4444', // Red-500
  [AI_INSIGHT_TYPE.RECOMMENDATION]: '#f472b6', // Pink-400
  [AI_INSIGHT_TYPE.WARNING]: '#f59e0b', // Amber-500
  [AI_INSIGHT_TYPE.PREDICTION]: '#f97316', // Orange-500
  [AI_INSIGHT_TYPE.CORRELATION]: '#06b6d4', // Cyan-500
} as const;

/**
 * ইনসাইট টাইপ চরিত্রগত বৈশিষ্ট্য
 */
export const AI_INSIGHT_TYPE_CHARACTERISTICS: Record<
  AIInsightTypeType,
  {
    requiresHistoricalData: boolean;
    requiresRealTimeData: boolean;
    actionability: number;
    urgency: number;
    complexity: number;
    interpretability: number;
  }
> = {
  [AI_INSIGHT_TYPE.PATTERN]: {
    requiresHistoricalData: true,
    requiresRealTimeData: false,
    actionability: 6,
    urgency: 4,
    complexity: 4,
    interpretability: 7,
  },
  [AI_INSIGHT_TYPE.ANOMALY]: {
    requiresHistoricalData: true,
    requiresRealTimeData: true,
    actionability: 8,
    urgency: 9,
    complexity: 5,
    interpretability: 6,
  },
  [AI_INSIGHT_TYPE.TREND]: {
    requiresHistoricalData: true,
    requiresRealTimeData: false,
    actionability: 7,
    urgency: 5,
    complexity: 3,
    interpretability: 9,
  },
  [AI_INSIGHT_TYPE.OPPORTUNITY]: {
    requiresHistoricalData: true,
    requiresRealTimeData: false,
    actionability: 9,
    urgency: 6,
    complexity: 4,
    interpretability: 6,
  },
  [AI_INSIGHT_TYPE.THREAT]: {
    requiresHistoricalData: true,
    requiresRealTimeData: true,
    actionability: 9,
    urgency: 10,
    complexity: 5,
    interpretability: 5,
  },
  [AI_INSIGHT_TYPE.RECOMMENDATION]: {
    requiresHistoricalData: true,
    requiresRealTimeData: false,
    actionability: 10,
    urgency: 7,
    complexity: 5,
    interpretability: 8,
  },
  [AI_INSIGHT_TYPE.WARNING]: {
    requiresHistoricalData: true,
    requiresRealTimeData: true,
    actionability: 8,
    urgency: 8,
    complexity: 4,
    interpretability: 7,
  },
  [AI_INSIGHT_TYPE.PREDICTION]: {
    requiresHistoricalData: true,
    requiresRealTimeData: false,
    actionability: 7,
    urgency: 6,
    complexity: 5,
    interpretability: 5,
  },
  [AI_INSIGHT_TYPE.CORRELATION]: {
    requiresHistoricalData: true,
    requiresRealTimeData: false,
    actionability: 5,
    urgency: 3,
    complexity: 4,
    interpretability: 8,
  },
} as const;

/**
 * ইনসাইট টাইপ কনফিগারেশন
 */
export interface AIInsightTypeConfig {
  type: AIInsightTypeType;
  label: string;
  description: string;
  icon: string;
  color: string;
  characteristics: {
    requiresHistoricalData: boolean;
    requiresRealTimeData: boolean;
    actionability: number;
    urgency: number;
    complexity: number;
    interpretability: number;
  };
  typicalUseCases: string[];
  detectionMethods: string[];
}

/**
 * ইনসাইট টাইপ মেটাডেটা
 */
export const AI_INSIGHT_TYPE_METADATA: Record<AIInsightTypeType, AIInsightTypeConfig> = {
  [AI_INSIGHT_TYPE.PATTERN]: {
    type: AI_INSIGHT_TYPE.PATTERN,
    label: AI_INSIGHT_TYPE_LABELS[AI_INSIGHT_TYPE.PATTERN],
    description: AI_INSIGHT_TYPE_DESCRIPTIONS[AI_INSIGHT_TYPE.PATTERN],
    icon: AI_INSIGHT_TYPE_ICONS[AI_INSIGHT_TYPE.PATTERN],
    color: AI_INSIGHT_TYPE_COLORS[AI_INSIGHT_TYPE.PATTERN],
    characteristics: AI_INSIGHT_TYPE_CHARACTERISTICS[AI_INSIGHT_TYPE.PATTERN],
    typicalUseCases: [
      'Sequence discovery',
      'Behavioral patterns',
      'Repeated events',
      'Seasonal patterns',
    ],
    detectionMethods: [
      'Sequential pattern mining',
      'Association rules',
      'Frequent pattern analysis',
      'Clustering',
    ],
  },
  [AI_INSIGHT_TYPE.ANOMALY]: {
    type: AI_INSIGHT_TYPE.ANOMALY,
    label: AI_INSIGHT_TYPE_LABELS[AI_INSIGHT_TYPE.ANOMALY],
    description: AI_INSIGHT_TYPE_DESCRIPTIONS[AI_INSIGHT_TYPE.ANOMALY],
    icon: AI_INSIGHT_TYPE_ICONS[AI_INSIGHT_TYPE.ANOMALY],
    color: AI_INSIGHT_TYPE_COLORS[AI_INSIGHT_TYPE.ANOMALY],
    characteristics: AI_INSIGHT_TYPE_CHARACTERISTICS[AI_INSIGHT_TYPE.ANOMALY],
    typicalUseCases: [
      'Fraud detection',
      'System monitoring',
      'Quality control',
      'Security threats',
    ],
    detectionMethods: [
      'Statistical outlier detection',
      'Isolation forest',
      'One-class SVM',
      'Autoencoders',
    ],
  },
  [AI_INSIGHT_TYPE.TREND]: {
    type: AI_INSIGHT_TYPE.TREND,
    label: AI_INSIGHT_TYPE_LABELS[AI_INSIGHT_TYPE.TREND],
    description: AI_INSIGHT_TYPE_DESCRIPTIONS[AI_INSIGHT_TYPE.TREND],
    icon: AI_INSIGHT_TYPE_ICONS[AI_INSIGHT_TYPE.TREND],
    color: AI_INSIGHT_TYPE_COLORS[AI_INSIGHT_TYPE.TREND],
    characteristics: AI_INSIGHT_TYPE_CHARACTERISTICS[AI_INSIGHT_TYPE.TREND],
    typicalUseCases: ['Market analysis', 'User engagement', 'Sales forecasting', 'Growth tracking'],
    detectionMethods: [
      'Time series analysis',
      'Moving averages',
      'Linear regression',
      'Seasonal decomposition',
    ],
  },
  [AI_INSIGHT_TYPE.OPPORTUNITY]: {
    type: AI_INSIGHT_TYPE.OPPORTUNITY,
    label: AI_INSIGHT_TYPE_LABELS[AI_INSIGHT_TYPE.OPPORTUNITY],
    description: AI_INSIGHT_TYPE_DESCRIPTIONS[AI_INSIGHT_TYPE.OPPORTUNITY],
    icon: AI_INSIGHT_TYPE_ICONS[AI_INSIGHT_TYPE.OPPORTUNITY],
    color: AI_INSIGHT_TYPE_COLORS[AI_INSIGHT_TYPE.OPPORTUNITY],
    characteristics: AI_INSIGHT_TYPE_CHARACTERISTICS[AI_INSIGHT_TYPE.OPPORTUNITY],
    typicalUseCases: [
      'Business growth',
      'Product development',
      'Market expansion',
      'Process optimization',
    ],
    detectionMethods: [
      'Opportunity analysis',
      'Gap analysis',
      'Predictive modeling',
      'Optimization algorithms',
    ],
  },
  [AI_INSIGHT_TYPE.THREAT]: {
    type: AI_INSIGHT_TYPE.THREAT,
    label: AI_INSIGHT_TYPE_LABELS[AI_INSIGHT_TYPE.THREAT],
    description: AI_INSIGHT_TYPE_DESCRIPTIONS[AI_INSIGHT_TYPE.THREAT],
    icon: AI_INSIGHT_TYPE_ICONS[AI_INSIGHT_TYPE.THREAT],
    color: AI_INSIGHT_TYPE_COLORS[AI_INSIGHT_TYPE.THREAT],
    characteristics: AI_INSIGHT_TYPE_CHARACTERISTICS[AI_INSIGHT_TYPE.THREAT],
    typicalUseCases: [
      'Cybersecurity',
      'Risk management',
      'System reliability',
      'Compliance monitoring',
    ],
    detectionMethods: [
      'Risk scoring',
      'Threat modeling',
      'Vulnerability assessment',
      'Real-time monitoring',
    ],
  },
  [AI_INSIGHT_TYPE.RECOMMENDATION]: {
    type: AI_INSIGHT_TYPE.RECOMMENDATION,
    label: AI_INSIGHT_TYPE_LABELS[AI_INSIGHT_TYPE.RECOMMENDATION],
    description: AI_INSIGHT_TYPE_DESCRIPTIONS[AI_INSIGHT_TYPE.RECOMMENDATION],
    icon: AI_INSIGHT_TYPE_ICONS[AI_INSIGHT_TYPE.RECOMMENDATION],
    color: AI_INSIGHT_TYPE_COLORS[AI_INSIGHT_TYPE.RECOMMENDATION],
    characteristics: AI_INSIGHT_TYPE_CHARACTERISTICS[AI_INSIGHT_TYPE.RECOMMENDATION],
    typicalUseCases: [
      'Decision support',
      'Process improvement',
      'Personalization',
      'Strategic planning',
    ],
    detectionMethods: [
      'Recommendation systems',
      'Decision trees',
      'Reinforcement learning',
      'Rule-based systems',
    ],
  },
  [AI_INSIGHT_TYPE.WARNING]: {
    type: AI_INSIGHT_TYPE.WARNING,
    label: AI_INSIGHT_TYPE_LABELS[AI_INSIGHT_TYPE.WARNING],
    description: AI_INSIGHT_TYPE_DESCRIPTIONS[AI_INSIGHT_TYPE.WARNING],
    icon: AI_INSIGHT_TYPE_ICONS[AI_INSIGHT_TYPE.WARNING],
    color: AI_INSIGHT_TYPE_COLORS[AI_INSIGHT_TYPE.WARNING],
    characteristics: AI_INSIGHT_TYPE_CHARACTERISTICS[AI_INSIGHT_TYPE.WARNING],
    typicalUseCases: [
      'Early warning systems',
      'Predictive maintenance',
      'Performance degradation',
      'Resource depletion',
    ],
    detectionMethods: [
      'Threshold monitoring',
      'Predictive analytics',
      'Trend analysis',
      'Machine learning models',
    ],
  },
  [AI_INSIGHT_TYPE.PREDICTION]: {
    type: AI_INSIGHT_TYPE.PREDICTION,
    label: AI_INSIGHT_TYPE_LABELS[AI_INSIGHT_TYPE.PREDICTION],
    description: AI_INSIGHT_TYPE_DESCRIPTIONS[AI_INSIGHT_TYPE.PREDICTION],
    icon: AI_INSIGHT_TYPE_ICONS[AI_INSIGHT_TYPE.PREDICTION],
    color: AI_INSIGHT_TYPE_COLORS[AI_INSIGHT_TYPE.PREDICTION],
    characteristics: AI_INSIGHT_TYPE_CHARACTERISTICS[AI_INSIGHT_TYPE.PREDICTION],
    typicalUseCases: ['Forecasting', 'Demand prediction', 'Resource planning', 'Risk assessment'],
    detectionMethods: [
      'Time series forecasting',
      'Regression models',
      'Neural networks',
      'Ensemble methods',
    ],
  },
  [AI_INSIGHT_TYPE.CORRELATION]: {
    type: AI_INSIGHT_TYPE.CORRELATION,
    label: AI_INSIGHT_TYPE_LABELS[AI_INSIGHT_TYPE.CORRELATION],
    description: AI_INSIGHT_TYPE_DESCRIPTIONS[AI_INSIGHT_TYPE.CORRELATION],
    icon: AI_INSIGHT_TYPE_ICONS[AI_INSIGHT_TYPE.CORRELATION],
    color: AI_INSIGHT_TYPE_COLORS[AI_INSIGHT_TYPE.CORRELATION],
    characteristics: AI_INSIGHT_TYPE_CHARACTERISTICS[AI_INSIGHT_TYPE.CORRELATION],
    typicalUseCases: [
      'Feature analysis',
      'Dependency discovery',
      'Causal inference',
      'Attribute relationships',
    ],
    detectionMethods: [
      'Correlation matrices',
      'Granger causality',
      'Mutual information',
      'Regression analysis',
    ],
  },
} as const;

/**
 * ইনসাইট টাইপ গ্রুপ
 */
export const AI_INSIGHT_TYPE_GROUPS = {
  DISCOVERY: [AI_INSIGHT_TYPE.PATTERN, AI_INSIGHT_TYPE.CORRELATION] as const,
  DETECTION: [AI_INSIGHT_TYPE.ANOMALY, AI_INSIGHT_TYPE.THREAT, AI_INSIGHT_TYPE.WARNING] as const,
  FORECASTING: [AI_INSIGHT_TYPE.TREND, AI_INSIGHT_TYPE.PREDICTION] as const,
  ACTION: [AI_INSIGHT_TYPE.OPPORTUNITY, AI_INSIGHT_TYPE.RECOMMENDATION] as const,
} as const;

/**
 * ইনসাইট টাইপ গ্রুপ লেবেল
 */
export const AI_INSIGHT_TYPE_GROUP_LABELS = {
  DISCOVERY: 'Discovery',
  DETECTION: 'Detection',
  FORECASTING: 'Forecasting',
  ACTION: 'Action',
} as const;

/**
 * ইনসাইট টাইপ স্কোর (১-১০)
 */
export const AI_INSIGHT_TYPE_SCORES: Record<
  AIInsightTypeType,
  {
    actionability: number;
    urgency: number;
    complexity: number;
    interpretability: number;
  }
> = {
  [AI_INSIGHT_TYPE.PATTERN]: { actionability: 6, urgency: 4, complexity: 4, interpretability: 7 },
  [AI_INSIGHT_TYPE.ANOMALY]: { actionability: 8, urgency: 9, complexity: 5, interpretability: 6 },
  [AI_INSIGHT_TYPE.TREND]: { actionability: 7, urgency: 5, complexity: 3, interpretability: 9 },
  [AI_INSIGHT_TYPE.OPPORTUNITY]: {
    actionability: 9,
    urgency: 6,
    complexity: 4,
    interpretability: 6,
  },
  [AI_INSIGHT_TYPE.THREAT]: { actionability: 9, urgency: 10, complexity: 5, interpretability: 5 },
  [AI_INSIGHT_TYPE.RECOMMENDATION]: {
    actionability: 10,
    urgency: 7,
    complexity: 5,
    interpretability: 8,
  },
  [AI_INSIGHT_TYPE.WARNING]: { actionability: 8, urgency: 8, complexity: 4, interpretability: 7 },
  [AI_INSIGHT_TYPE.PREDICTION]: {
    actionability: 7,
    urgency: 6,
    complexity: 5,
    interpretability: 5,
  },
  [AI_INSIGHT_TYPE.CORRELATION]: {
    actionability: 5,
    urgency: 3,
    complexity: 4,
    interpretability: 8,
  },
} as const;
