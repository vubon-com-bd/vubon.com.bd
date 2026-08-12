/**
 * AI ফিচার টাইপ এনাম
 */
export const AI_FEATURE_TYPE = {
  RECOMMENDATION: 'recommendation',
  SEARCH: 'search',
  RANKING: 'ranking',
  PERSONALIZATION: 'personalization',
  ANALYTICS: 'analytics',
  TRAINING: 'training',
  PREDICTION: 'prediction',
  INSIGHT: 'insight',
  FORECAST: 'forecast',
  EMBEDDING: 'embedding',
  VECTOR: 'vector',
} as const;

/**
 * AI_FEATURE_TYPE থেকে টাইপ
 */
export type AIFeatureType = (typeof AI_FEATURE_TYPE)[keyof typeof AI_FEATURE_TYPE];

/**
 * ফিচার টাইপ লেবেল
 */
export const AI_FEATURE_TYPE_LABELS: Record<AIFeatureType, string> = {
  [AI_FEATURE_TYPE.RECOMMENDATION]: 'Recommendation',
  [AI_FEATURE_TYPE.SEARCH]: 'Search',
  [AI_FEATURE_TYPE.RANKING]: 'Ranking',
  [AI_FEATURE_TYPE.PERSONALIZATION]: 'Personalization',
  [AI_FEATURE_TYPE.ANALYTICS]: 'Analytics',
  [AI_FEATURE_TYPE.TRAINING]: 'Training',
  [AI_FEATURE_TYPE.PREDICTION]: 'Prediction',
  [AI_FEATURE_TYPE.INSIGHT]: 'Insight',
  [AI_FEATURE_TYPE.FORECAST]: 'Forecast',
  [AI_FEATURE_TYPE.EMBEDDING]: 'Embedding',
  [AI_FEATURE_TYPE.VECTOR]: 'Vector',
} as const;

/**
 * ফিচার টাইপ বিবরণ
 */
export const AI_FEATURE_TYPE_DESCRIPTIONS: Record<AIFeatureType, string> = {
  [AI_FEATURE_TYPE.RECOMMENDATION]:
    'Provides personalized recommendations based on user preferences',
  [AI_FEATURE_TYPE.SEARCH]: 'Enables intelligent search with semantic understanding',
  [AI_FEATURE_TYPE.RANKING]: 'Provides ranking and scoring of items based on relevance',
  [AI_FEATURE_TYPE.PERSONALIZATION]: 'Personalizes content and experiences for individual users',
  [AI_FEATURE_TYPE.ANALYTICS]: 'Provides analytics and insights from data',
  [AI_FEATURE_TYPE.TRAINING]: 'Enables model training and fine-tuning capabilities',
  [AI_FEATURE_TYPE.PREDICTION]: 'Makes predictions based on historical data patterns',
  [AI_FEATURE_TYPE.INSIGHT]: 'Generates actionable insights from complex data',
  [AI_FEATURE_TYPE.FORECAST]: 'Provides forecasting and trend analysis',
  [AI_FEATURE_TYPE.EMBEDDING]: 'Generates embeddings for text, images, or other data types',
  [AI_FEATURE_TYPE.VECTOR]: 'Enables vector operations and similarity search',
} as const;

/**
 * ফিচার টাইপ আইকন
 */
export const AI_FEATURE_TYPE_ICONS: Record<AIFeatureType, string> = {
  [AI_FEATURE_TYPE.RECOMMENDATION]: '💡',
  [AI_FEATURE_TYPE.SEARCH]: '🔍',
  [AI_FEATURE_TYPE.RANKING]: '📊',
  [AI_FEATURE_TYPE.PERSONALIZATION]: '👤',
  [AI_FEATURE_TYPE.ANALYTICS]: '📈',
  [AI_FEATURE_TYPE.TRAINING]: '🎓',
  [AI_FEATURE_TYPE.PREDICTION]: '🔮',
  [AI_FEATURE_TYPE.INSIGHT]: '💎',
  [AI_FEATURE_TYPE.FORECAST]: '📅',
  [AI_FEATURE_TYPE.EMBEDDING]: '🌀',
  [AI_FEATURE_TYPE.VECTOR]: '📐',
} as const;

/**
 * ফিচার টাইপ কালার (হেক্স কোড)
 */
export const AI_FEATURE_TYPE_COLORS: Record<AIFeatureType, string> = {
  [AI_FEATURE_TYPE.RECOMMENDATION]: '#8b5cf6', // Violet-500
  [AI_FEATURE_TYPE.SEARCH]: '#3b82f6', // Blue-500
  [AI_FEATURE_TYPE.RANKING]: '#f59e0b', // Amber-500
  [AI_FEATURE_TYPE.PERSONALIZATION]: '#ec4899', // Pink-500
  [AI_FEATURE_TYPE.ANALYTICS]: '#06b6d4', // Cyan-500
  [AI_FEATURE_TYPE.TRAINING]: '#22c55e', // Green-500
  [AI_FEATURE_TYPE.PREDICTION]: '#f472b6', // Pink-400
  [AI_FEATURE_TYPE.INSIGHT]: '#f97316', // Orange-500
  [AI_FEATURE_TYPE.FORECAST]: '#14b8a6', // Teal-500
  [AI_FEATURE_TYPE.EMBEDDING]: '#a855f7', // Purple-500
  [AI_FEATURE_TYPE.VECTOR]: '#6366f1', // Indigo-500
} as const;

/**
 * ফিচার টাইপ কমপ্লেক্সিটি (১-৫)
 */
export const AI_FEATURE_TYPE_COMPLEXITY: Record<AIFeatureType, number> = {
  [AI_FEATURE_TYPE.RECOMMENDATION]: 4,
  [AI_FEATURE_TYPE.SEARCH]: 4,
  [AI_FEATURE_TYPE.RANKING]: 3,
  [AI_FEATURE_TYPE.PERSONALIZATION]: 4,
  [AI_FEATURE_TYPE.ANALYTICS]: 3,
  [AI_FEATURE_TYPE.TRAINING]: 5,
  [AI_FEATURE_TYPE.PREDICTION]: 4,
  [AI_FEATURE_TYPE.INSIGHT]: 4,
  [AI_FEATURE_TYPE.FORECAST]: 4,
  [AI_FEATURE_TYPE.EMBEDDING]: 3,
  [AI_FEATURE_TYPE.VECTOR]: 2,
} as const;

/**
 * ফিচার টাইপ কনফিগারেশন
 */
export interface AIFeatureTypeConfig {
  type: AIFeatureType;
  label: string;
  description: string;
  icon: string;
  color: string;
  complexity: number;
  requiresTraining: boolean;
  requiresRealTime: boolean;
  requiresData: boolean;
  typicalUseCase: string[];
}

/**
 * ফিচার টাইপ মেটাডেটা
 */
export const AI_FEATURE_TYPE_METADATA: Record<AIFeatureType, AIFeatureTypeConfig> = {
  [AI_FEATURE_TYPE.RECOMMENDATION]: {
    type: AI_FEATURE_TYPE.RECOMMENDATION,
    label: AI_FEATURE_TYPE_LABELS[AI_FEATURE_TYPE.RECOMMENDATION],
    description: AI_FEATURE_TYPE_DESCRIPTIONS[AI_FEATURE_TYPE.RECOMMENDATION],
    icon: AI_FEATURE_TYPE_ICONS[AI_FEATURE_TYPE.RECOMMENDATION],
    color: AI_FEATURE_TYPE_COLORS[AI_FEATURE_TYPE.RECOMMENDATION],
    complexity: AI_FEATURE_TYPE_COMPLEXITY[AI_FEATURE_TYPE.RECOMMENDATION],
    requiresTraining: true,
    requiresRealTime: false,
    requiresData: true,
    typicalUseCase: ['Product Recommendations', 'Content Discovery', 'User Engagement'],
  },
  [AI_FEATURE_TYPE.SEARCH]: {
    type: AI_FEATURE_TYPE.SEARCH,
    label: AI_FEATURE_TYPE_LABELS[AI_FEATURE_TYPE.SEARCH],
    description: AI_FEATURE_TYPE_DESCRIPTIONS[AI_FEATURE_TYPE.SEARCH],
    icon: AI_FEATURE_TYPE_ICONS[AI_FEATURE_TYPE.SEARCH],
    color: AI_FEATURE_TYPE_COLORS[AI_FEATURE_TYPE.SEARCH],
    complexity: AI_FEATURE_TYPE_COMPLEXITY[AI_FEATURE_TYPE.SEARCH],
    requiresTraining: true,
    requiresRealTime: true,
    requiresData: true,
    typicalUseCase: ['Semantic Search', 'Document Retrieval', 'Question Answering'],
  },
  [AI_FEATURE_TYPE.RANKING]: {
    type: AI_FEATURE_TYPE.RANKING,
    label: AI_FEATURE_TYPE_LABELS[AI_FEATURE_TYPE.RANKING],
    description: AI_FEATURE_TYPE_DESCRIPTIONS[AI_FEATURE_TYPE.RANKING],
    icon: AI_FEATURE_TYPE_ICONS[AI_FEATURE_TYPE.RANKING],
    color: AI_FEATURE_TYPE_COLORS[AI_FEATURE_TYPE.RANKING],
    complexity: AI_FEATURE_TYPE_COMPLEXITY[AI_FEATURE_TYPE.RANKING],
    requiresTraining: true,
    requiresRealTime: true,
    requiresData: true,
    typicalUseCase: ['Search Ranking', 'Product Ranking', 'Content Curation'],
  },
  [AI_FEATURE_TYPE.PERSONALIZATION]: {
    type: AI_FEATURE_TYPE.PERSONALIZATION,
    label: AI_FEATURE_TYPE_LABELS[AI_FEATURE_TYPE.PERSONALIZATION],
    description: AI_FEATURE_TYPE_DESCRIPTIONS[AI_FEATURE_TYPE.PERSONALIZATION],
    icon: AI_FEATURE_TYPE_ICONS[AI_FEATURE_TYPE.PERSONALIZATION],
    color: AI_FEATURE_TYPE_COLORS[AI_FEATURE_TYPE.PERSONALIZATION],
    complexity: AI_FEATURE_TYPE_COMPLEXITY[AI_FEATURE_TYPE.PERSONALIZATION],
    requiresTraining: true,
    requiresRealTime: true,
    requiresData: true,
    typicalUseCase: ['User Experience', 'Content Curation', 'A/B Testing'],
  },
  [AI_FEATURE_TYPE.ANALYTICS]: {
    type: AI_FEATURE_TYPE.ANALYTICS,
    label: AI_FEATURE_TYPE_LABELS[AI_FEATURE_TYPE.ANALYTICS],
    description: AI_FEATURE_TYPE_DESCRIPTIONS[AI_FEATURE_TYPE.ANALYTICS],
    icon: AI_FEATURE_TYPE_ICONS[AI_FEATURE_TYPE.ANALYTICS],
    color: AI_FEATURE_TYPE_COLORS[AI_FEATURE_TYPE.ANALYTICS],
    complexity: AI_FEATURE_TYPE_COMPLEXITY[AI_FEATURE_TYPE.ANALYTICS],
    requiresTraining: false,
    requiresRealTime: false,
    requiresData: true,
    typicalUseCase: ['Business Intelligence', 'Performance Tracking', 'Data Visualization'],
  },
  [AI_FEATURE_TYPE.TRAINING]: {
    type: AI_FEATURE_TYPE.TRAINING,
    label: AI_FEATURE_TYPE_LABELS[AI_FEATURE_TYPE.TRAINING],
    description: AI_FEATURE_TYPE_DESCRIPTIONS[AI_FEATURE_TYPE.TRAINING],
    icon: AI_FEATURE_TYPE_ICONS[AI_FEATURE_TYPE.TRAINING],
    color: AI_FEATURE_TYPE_COLORS[AI_FEATURE_TYPE.TRAINING],
    complexity: AI_FEATURE_TYPE_COMPLEXITY[AI_FEATURE_TYPE.TRAINING],
    requiresTraining: false,
    requiresRealTime: false,
    requiresData: true,
    typicalUseCase: ['Model Development', 'Fine-tuning', 'Research'],
  },
  [AI_FEATURE_TYPE.PREDICTION]: {
    type: AI_FEATURE_TYPE.PREDICTION,
    label: AI_FEATURE_TYPE_LABELS[AI_FEATURE_TYPE.PREDICTION],
    description: AI_FEATURE_TYPE_DESCRIPTIONS[AI_FEATURE_TYPE.PREDICTION],
    icon: AI_FEATURE_TYPE_ICONS[AI_FEATURE_TYPE.PREDICTION],
    color: AI_FEATURE_TYPE_COLORS[AI_FEATURE_TYPE.PREDICTION],
    complexity: AI_FEATURE_TYPE_COMPLEXITY[AI_FEATURE_TYPE.PREDICTION],
    requiresTraining: true,
    requiresRealTime: true,
    requiresData: true,
    typicalUseCase: ['Sales Forecasting', 'Risk Assessment', 'Demand Planning'],
  },
  [AI_FEATURE_TYPE.INSIGHT]: {
    type: AI_FEATURE_TYPE.INSIGHT,
    label: AI_FEATURE_TYPE_LABELS[AI_FEATURE_TYPE.INSIGHT],
    description: AI_FEATURE_TYPE_DESCRIPTIONS[AI_FEATURE_TYPE.INSIGHT],
    icon: AI_FEATURE_TYPE_ICONS[AI_FEATURE_TYPE.INSIGHT],
    color: AI_FEATURE_TYPE_COLORS[AI_FEATURE_TYPE.INSIGHT],
    complexity: AI_FEATURE_TYPE_COMPLEXITY[AI_FEATURE_TYPE.INSIGHT],
    requiresTraining: true,
    requiresRealTime: false,
    requiresData: true,
    typicalUseCase: ['Data Discovery', 'Pattern Recognition', 'Decision Support'],
  },
  [AI_FEATURE_TYPE.FORECAST]: {
    type: AI_FEATURE_TYPE.FORECAST,
    label: AI_FEATURE_TYPE_LABELS[AI_FEATURE_TYPE.FORECAST],
    description: AI_FEATURE_TYPE_DESCRIPTIONS[AI_FEATURE_TYPE.FORECAST],
    icon: AI_FEATURE_TYPE_ICONS[AI_FEATURE_TYPE.FORECAST],
    color: AI_FEATURE_TYPE_COLORS[AI_FEATURE_TYPE.FORECAST],
    complexity: AI_FEATURE_TYPE_COMPLEXITY[AI_FEATURE_TYPE.FORECAST],
    requiresTraining: true,
    requiresRealTime: false,
    requiresData: true,
    typicalUseCase: ['Time Series', 'Trend Analysis', 'Resource Planning'],
  },
  [AI_FEATURE_TYPE.EMBEDDING]: {
    type: AI_FEATURE_TYPE.EMBEDDING,
    label: AI_FEATURE_TYPE_LABELS[AI_FEATURE_TYPE.EMBEDDING],
    description: AI_FEATURE_TYPE_DESCRIPTIONS[AI_FEATURE_TYPE.EMBEDDING],
    icon: AI_FEATURE_TYPE_ICONS[AI_FEATURE_TYPE.EMBEDDING],
    color: AI_FEATURE_TYPE_COLORS[AI_FEATURE_TYPE.EMBEDDING],
    complexity: AI_FEATURE_TYPE_COMPLEXITY[AI_FEATURE_TYPE.EMBEDDING],
    requiresTraining: true,
    requiresRealTime: true,
    requiresData: true,
    typicalUseCase: ['Text Embedding', 'Image Embedding', 'Feature Extraction'],
  },
  [AI_FEATURE_TYPE.VECTOR]: {
    type: AI_FEATURE_TYPE.VECTOR,
    label: AI_FEATURE_TYPE_LABELS[AI_FEATURE_TYPE.VECTOR],
    description: AI_FEATURE_TYPE_DESCRIPTIONS[AI_FEATURE_TYPE.VECTOR],
    icon: AI_FEATURE_TYPE_ICONS[AI_FEATURE_TYPE.VECTOR],
    color: AI_FEATURE_TYPE_COLORS[AI_FEATURE_TYPE.VECTOR],
    complexity: AI_FEATURE_TYPE_COMPLEXITY[AI_FEATURE_TYPE.VECTOR],
    requiresTraining: false,
    requiresRealTime: true,
    requiresData: false,
    typicalUseCase: ['Vector Search', 'Similarity Matching', 'Nearest Neighbor'],
  },
} as const;

/**
 * ফিচার টাইপ গ্রুপ
 */
export const AI_FEATURE_TYPE_GROUPS = {
  CONTENT: [AI_FEATURE_TYPE.SEARCH, AI_FEATURE_TYPE.RANKING] as const,
  USER: [AI_FEATURE_TYPE.RECOMMENDATION, AI_FEATURE_TYPE.PERSONALIZATION] as const,
  ANALYSIS: [
    AI_FEATURE_TYPE.ANALYTICS,
    AI_FEATURE_TYPE.INSIGHT,
    AI_FEATURE_TYPE.PREDICTION,
    AI_FEATURE_TYPE.FORECAST,
  ] as const,
  MODEL: [AI_FEATURE_TYPE.TRAINING, AI_FEATURE_TYPE.EMBEDDING, AI_FEATURE_TYPE.VECTOR] as const,
} as const;

/**
 * ফিচার টাইপ গ্রুপ লেবেল
 */
export const AI_FEATURE_TYPE_GROUP_LABELS = {
  CONTENT: 'Content',
  USER: 'User',
  ANALYSIS: 'Analysis',
  MODEL: 'Model',
} as const;
