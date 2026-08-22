/**
 * AI Insight Constants
 * Configuration for AI insights and discoveries
 */

export const AI_INSIGHT = {
  // Insight Types
  TYPES: {
    PATTERN: 'pattern',
    TREND: 'trend',
    ANOMALY: 'anomaly',
    CORRELATION: 'correlation',
    CAUSATION: 'causation',
    PREDICTION: 'prediction',
    RECOMMENDATION: 'recommendation',
    OPTIMIZATION: 'optimization',
    OPPORTUNITY: 'opportunity',
    RISK: 'risk',
    BEHAVIORAL: 'behavioral',
    SEASONAL: 'seasonal',
    CYCLICAL: 'cyclical',
    STRUCTURAL: 'structural',
    COMPARATIVE: 'comparative',
    DIAGNOSTIC: 'diagnostic',
    PRESCRIPTIVE: 'prescriptive',
  } as const,

  // Insight Status
  STATUSES: {
    PENDING: 'pending',
    DISCOVERING: 'discovering',
    ANALYZING: 'analyzing',
    GENERATING: 'generating',
    VALIDATING: 'validating',
    COMPLETED: 'completed',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    OPTIMIZED: 'optimized',
    CACHED: 'cached',
  } as const,

  // Insight Categories
  CATEGORIES: {
    DESCRIPTIVE: 'descriptive',
    DIAGNOSTIC: 'diagnostic',
    PREDICTIVE: 'predictive',
    PRESCRIPTIVE: 'prescriptive',
    COGNITIVE: 'cognitive',
    EXPLORATORY: 'exploratory',
    CONFIRMATORY: 'confirmatory',
    EXPLANATORY: 'explanatory',
  } as const,

  // Insight Methods
  METHODS: {
    STATISTICAL: 'statistical',
    MACHINE_LEARNING: 'machine_learning',
    DEEP_LEARNING: 'deep_learning',
    PATTERN_RECOGNITION: 'pattern_recognition',
    ANOMALY_DETECTION: 'anomaly_detection',
    CORRELATION_ANALYSIS: 'correlation_analysis',
    REGRESSION_ANALYSIS: 'regression_analysis',
    CLUSTER_ANALYSIS: 'cluster_analysis',
    TIME_SERIES: 'time_series',
    NLP: 'nlp',
    COMPUTER_VISION: 'computer_vision',
    RULE_BASED: 'rule_based',
    HYBRID: 'hybrid',
  } as const,

  // Insight Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
    NICE_TO_HAVE: 'nice_to_have',
  } as const,

  // Insight Confidence
  CONFIDENCE: {
    VERY_HIGH: 'very_high',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    VERY_LOW: 'very_low',
    UNKNOWN: 'unknown',
  } as const,

  // Insight Impact
  IMPACT: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    NEGATIVE: 'negative',
    POSITIVE: 'positive',
    NEUTRAL: 'neutral',
  } as const,

  // Insight Quality
  QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    FAIR: 'fair',
    POOR: 'poor',
    UNKNOWN: 'unknown',
  } as const,

  // Insight Sources
  SOURCES: {
    DATA_ANALYSIS: 'data_analysis',
    USER_BEHAVIOR: 'user_behavior',
    MARKET_TRENDS: 'market_trends',
    COMPETITIVE: 'competitive',
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    SOCIAL_MEDIA: 'social_media',
    CUSTOMER_FEEDBACK: 'customer_feedback',
    SALES_DATA: 'sales_data',
    OPERATIONAL: 'operational',
    FINANCIAL: 'financial',
  } as const,

  // Insight Limits
  LIMITS: {
    MAX_INSIGHTS: 1000,
    MIN_CONFIDENCE: 0.3,
    DEFAULT_CONFIDENCE: 0.5,
    MAX_PATTERNS: 100,
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
  } as const,

  // Insight Formats
  FORMATS: {
    TEXT: 'text',
    CHART: 'chart',
    TABLE: 'table',
    DASHBOARD: 'dashboard',
    REPORT: 'report',
    ALERT: 'alert',
    NOTIFICATION: 'notification',
  } as const,

  // Insight Metrics
  METRICS: {
    ACCURACY: 'accuracy',
    RELEVANCE: 'relevance',
    NOVELTY: 'novelty',
    ACTIONABILITY: 'actionability',
    IMPACT: 'impact',
    CLARITY: 'clarity',
    TIMELINESS: 'timeliness',
    COMPLETENESS: 'completeness',
  } as const,
} as const;

// Insight Types
export type AIInsightType = (typeof AI_INSIGHT.TYPES)[keyof typeof AI_INSIGHT.TYPES];

// Insight Status
export type AIInsightStatus = (typeof AI_INSIGHT.STATUSES)[keyof typeof AI_INSIGHT.STATUSES];

// Insight Categories
export type AIInsightCategory = (typeof AI_INSIGHT.CATEGORIES)[keyof typeof AI_INSIGHT.CATEGORIES];

// Insight Methods
export type AIInsightMethod = (typeof AI_INSIGHT.METHODS)[keyof typeof AI_INSIGHT.METHODS];

// Insight Priorities
export type AIInsightPriority = (typeof AI_INSIGHT.PRIORITIES)[keyof typeof AI_INSIGHT.PRIORITIES];

// Insight Confidence
export type AIInsightConfidence =
  (typeof AI_INSIGHT.CONFIDENCE)[keyof typeof AI_INSIGHT.CONFIDENCE];

// Insight Impact
export type AIInsightImpact = (typeof AI_INSIGHT.IMPACT)[keyof typeof AI_INSIGHT.IMPACT];

// Insight Quality
export type AIInsightQuality = (typeof AI_INSIGHT.QUALITY)[keyof typeof AI_INSIGHT.QUALITY];

// Insight Sources
export type AIInsightSource = (typeof AI_INSIGHT.SOURCES)[keyof typeof AI_INSIGHT.SOURCES];

// Insight Limits
export type AIInsightLimit = (typeof AI_INSIGHT.LIMITS)[keyof typeof AI_INSIGHT.LIMITS];

// Insight Formats
export type AIInsightFormat = (typeof AI_INSIGHT.FORMATS)[keyof typeof AI_INSIGHT.FORMATS];

// Insight Metrics
export type AIInsightMetric = (typeof AI_INSIGHT.METRICS)[keyof typeof AI_INSIGHT.METRICS];

// Utility Functions
export function getInsightTypeLabel(type: AIInsightType): string {
  const labels: Record<AIInsightType, string> = {
    [AI_INSIGHT.TYPES.PATTERN]: 'Pattern',
    [AI_INSIGHT.TYPES.TREND]: 'Trend',
    [AI_INSIGHT.TYPES.ANOMALY]: 'Anomaly',
    [AI_INSIGHT.TYPES.CORRELATION]: 'Correlation',
    [AI_INSIGHT.TYPES.CAUSATION]: 'Causation',
    [AI_INSIGHT.TYPES.PREDICTION]: 'Prediction',
    [AI_INSIGHT.TYPES.RECOMMENDATION]: 'Recommendation',
    [AI_INSIGHT.TYPES.OPTIMIZATION]: 'Optimization',
    [AI_INSIGHT.TYPES.OPPORTUNITY]: 'Opportunity',
    [AI_INSIGHT.TYPES.RISK]: 'Risk',
    [AI_INSIGHT.TYPES.BEHAVIORAL]: 'Behavioral',
    [AI_INSIGHT.TYPES.SEASONAL]: 'Seasonal',
    [AI_INSIGHT.TYPES.CYCLICAL]: 'Cyclical',
    [AI_INSIGHT.TYPES.STRUCTURAL]: 'Structural',
    [AI_INSIGHT.TYPES.COMPARATIVE]: 'Comparative',
    [AI_INSIGHT.TYPES.DIAGNOSTIC]: 'Diagnostic',
    [AI_INSIGHT.TYPES.PRESCRIPTIVE]: 'Prescriptive',
  };
  return labels[type] || 'Unknown';
}

export function getInsightStatusLabel(status: AIInsightStatus): string {
  const labels: Record<AIInsightStatus, string> = {
    [AI_INSIGHT.STATUSES.PENDING]: 'Pending',
    [AI_INSIGHT.STATUSES.DISCOVERING]: 'Discovering',
    [AI_INSIGHT.STATUSES.ANALYZING]: 'Analyzing',
    [AI_INSIGHT.STATUSES.GENERATING]: 'Generating',
    [AI_INSIGHT.STATUSES.VALIDATING]: 'Validating',
    [AI_INSIGHT.STATUSES.COMPLETED]: 'Completed',
    [AI_INSIGHT.STATUSES.DELIVERED]: 'Delivered',
    [AI_INSIGHT.STATUSES.FAILED]: 'Failed',
    [AI_INSIGHT.STATUSES.EXPIRED]: 'Expired',
    [AI_INSIGHT.STATUSES.ARCHIVED]: 'Archived',
    [AI_INSIGHT.STATUSES.OPTIMIZED]: 'Optimized',
    [AI_INSIGHT.STATUSES.CACHED]: 'Cached',
  };
  return labels[status] || 'Unknown';
}

export function getInsightCategoryLabel(category: AIInsightCategory): string {
  const labels: Record<AIInsightCategory, string> = {
    [AI_INSIGHT.CATEGORIES.DESCRIPTIVE]: 'Descriptive',
    [AI_INSIGHT.CATEGORIES.DIAGNOSTIC]: 'Diagnostic',
    [AI_INSIGHT.CATEGORIES.PREDICTIVE]: 'Predictive',
    [AI_INSIGHT.CATEGORIES.PRESCRIPTIVE]: 'Prescriptive',
    [AI_INSIGHT.CATEGORIES.COGNITIVE]: 'Cognitive',
    [AI_INSIGHT.CATEGORIES.EXPLORATORY]: 'Exploratory',
    [AI_INSIGHT.CATEGORIES.CONFIRMATORY]: 'Confirmatory',
    [AI_INSIGHT.CATEGORIES.EXPLANATORY]: 'Explanatory',
  };
  return labels[category] || 'Unknown';
}

export function getInsightMethodLabel(method: AIInsightMethod): string {
  const labels: Record<AIInsightMethod, string> = {
    [AI_INSIGHT.METHODS.STATISTICAL]: 'Statistical',
    [AI_INSIGHT.METHODS.MACHINE_LEARNING]: 'Machine Learning',
    [AI_INSIGHT.METHODS.DEEP_LEARNING]: 'Deep Learning',
    [AI_INSIGHT.METHODS.PATTERN_RECOGNITION]: 'Pattern Recognition',
    [AI_INSIGHT.METHODS.ANOMALY_DETECTION]: 'Anomaly Detection',
    [AI_INSIGHT.METHODS.CORRELATION_ANALYSIS]: 'Correlation Analysis',
    [AI_INSIGHT.METHODS.REGRESSION_ANALYSIS]: 'Regression Analysis',
    [AI_INSIGHT.METHODS.CLUSTER_ANALYSIS]: 'Cluster Analysis',
    [AI_INSIGHT.METHODS.TIME_SERIES]: 'Time Series',
    [AI_INSIGHT.METHODS.NLP]: 'NLP',
    [AI_INSIGHT.METHODS.COMPUTER_VISION]: 'Computer Vision',
    [AI_INSIGHT.METHODS.RULE_BASED]: 'Rule Based',
    [AI_INSIGHT.METHODS.HYBRID]: 'Hybrid',
  };
  return labels[method] || 'Unknown';
}

export function getInsightPriorityLabel(priority: AIInsightPriority): string {
  const labels: Record<AIInsightPriority, string> = {
    [AI_INSIGHT.PRIORITIES.CRITICAL]: 'Critical',
    [AI_INSIGHT.PRIORITIES.HIGH]: 'High',
    [AI_INSIGHT.PRIORITIES.MEDIUM]: 'Medium',
    [AI_INSIGHT.PRIORITIES.LOW]: 'Low',
    [AI_INSIGHT.PRIORITIES.BACKGROUND]: 'Background',
    [AI_INSIGHT.PRIORITIES.NICE_TO_HAVE]: 'Nice to Have',
  };
  return labels[priority] || 'Unknown';
}

export function getInsightConfidenceLabel(confidence: AIInsightConfidence): string {
  const labels: Record<AIInsightConfidence, string> = {
    [AI_INSIGHT.CONFIDENCE.VERY_HIGH]: 'Very High',
    [AI_INSIGHT.CONFIDENCE.HIGH]: 'High',
    [AI_INSIGHT.CONFIDENCE.MEDIUM]: 'Medium',
    [AI_INSIGHT.CONFIDENCE.LOW]: 'Low',
    [AI_INSIGHT.CONFIDENCE.VERY_LOW]: 'Very Low',
    [AI_INSIGHT.CONFIDENCE.UNKNOWN]: 'Unknown',
  };
  return labels[confidence] || 'Unknown';
}

export function getInsightImpactLabel(impact: AIInsightImpact): string {
  const labels: Record<AIInsightImpact, string> = {
    [AI_INSIGHT.IMPACT.HIGH]: 'High',
    [AI_INSIGHT.IMPACT.MEDIUM]: 'Medium',
    [AI_INSIGHT.IMPACT.LOW]: 'Low',
    [AI_INSIGHT.IMPACT.NEGATIVE]: 'Negative',
    [AI_INSIGHT.IMPACT.POSITIVE]: 'Positive',
    [AI_INSIGHT.IMPACT.NEUTRAL]: 'Neutral',
  };
  return labels[impact] || 'Unknown';
}

export function getInsightQualityLabel(quality: AIInsightQuality): string {
  const labels: Record<AIInsightQuality, string> = {
    [AI_INSIGHT.QUALITY.EXCELLENT]: 'Excellent',
    [AI_INSIGHT.QUALITY.GOOD]: 'Good',
    [AI_INSIGHT.QUALITY.FAIR]: 'Fair',
    [AI_INSIGHT.QUALITY.POOR]: 'Poor',
    [AI_INSIGHT.QUALITY.UNKNOWN]: 'Unknown',
  };
  return labels[quality] || 'Unknown';
}

export function getInsightSourceLabel(source: AIInsightSource): string {
  const labels: Record<AIInsightSource, string> = {
    [AI_INSIGHT.SOURCES.DATA_ANALYSIS]: 'Data Analysis',
    [AI_INSIGHT.SOURCES.USER_BEHAVIOR]: 'User Behavior',
    [AI_INSIGHT.SOURCES.MARKET_TRENDS]: 'Market Trends',
    [AI_INSIGHT.SOURCES.COMPETITIVE]: 'Competitive',
    [AI_INSIGHT.SOURCES.INTERNAL]: 'Internal',
    [AI_INSIGHT.SOURCES.EXTERNAL]: 'External',
    [AI_INSIGHT.SOURCES.SOCIAL_MEDIA]: 'Social Media',
    [AI_INSIGHT.SOURCES.CUSTOMER_FEEDBACK]: 'Customer Feedback',
    [AI_INSIGHT.SOURCES.SALES_DATA]: 'Sales Data',
    [AI_INSIGHT.SOURCES.OPERATIONAL]: 'Operational',
    [AI_INSIGHT.SOURCES.FINANCIAL]: 'Financial',
  };
  return labels[source] || 'Unknown';
}

export function getInsightFormatLabel(format: AIInsightFormat): string {
  const labels: Record<AIInsightFormat, string> = {
    [AI_INSIGHT.FORMATS.TEXT]: 'Text',
    [AI_INSIGHT.FORMATS.CHART]: 'Chart',
    [AI_INSIGHT.FORMATS.TABLE]: 'Table',
    [AI_INSIGHT.FORMATS.DASHBOARD]: 'Dashboard',
    [AI_INSIGHT.FORMATS.REPORT]: 'Report',
    [AI_INSIGHT.FORMATS.ALERT]: 'Alert',
    [AI_INSIGHT.FORMATS.NOTIFICATION]: 'Notification',
  };
  return labels[format] || 'Unknown';
}

export function getInsightMetricLabel(metric: AIInsightMetric): string {
  const labels: Record<AIInsightMetric, string> = {
    [AI_INSIGHT.METRICS.ACCURACY]: 'Accuracy',
    [AI_INSIGHT.METRICS.RELEVANCE]: 'Relevance',
    [AI_INSIGHT.METRICS.NOVELTY]: 'Novelty',
    [AI_INSIGHT.METRICS.ACTIONABILITY]: 'Actionability',
    [AI_INSIGHT.METRICS.IMPACT]: 'Impact',
    [AI_INSIGHT.METRICS.CLARITY]: 'Clarity',
    [AI_INSIGHT.METRICS.TIMELINESS]: 'Timeliness',
    [AI_INSIGHT.METRICS.COMPLETENESS]: 'Completeness',
  };
  return labels[metric] || 'Unknown';
}

export function isInsightActive(status: AIInsightStatus): boolean {
  const activeStatuses: AIInsightStatus[] = [
    AI_INSIGHT.STATUSES.COMPLETED,
    AI_INSIGHT.STATUSES.DELIVERED,
    AI_INSIGHT.STATUSES.CACHED,
    AI_INSIGHT.STATUSES.OPTIMIZED,
  ];
  return activeStatuses.includes(status);
}

export function isInsightProcessing(status: AIInsightStatus): boolean {
  const processingStatuses: AIInsightStatus[] = [
    AI_INSIGHT.STATUSES.PENDING,
    AI_INSIGHT.STATUSES.DISCOVERING,
    AI_INSIGHT.STATUSES.ANALYZING,
    AI_INSIGHT.STATUSES.GENERATING,
    AI_INSIGHT.STATUSES.VALIDATING,
  ];
  return processingStatuses.includes(status);
}

export function isInsightFailed(status: AIInsightStatus): boolean {
  const failedStatuses: AIInsightStatus[] = [
    AI_INSIGHT.STATUSES.FAILED,
    AI_INSIGHT.STATUSES.EXPIRED,
  ];
  return failedStatuses.includes(status);
}

export function getPriorityScore(priority: AIInsightPriority): number {
  const scores: Record<AIInsightPriority, number> = {
    [AI_INSIGHT.PRIORITIES.CRITICAL]: 10,
    [AI_INSIGHT.PRIORITIES.HIGH]: 8,
    [AI_INSIGHT.PRIORITIES.MEDIUM]: 5,
    [AI_INSIGHT.PRIORITIES.LOW]: 3,
    [AI_INSIGHT.PRIORITIES.BACKGROUND]: 1,
    [AI_INSIGHT.PRIORITIES.NICE_TO_HAVE]: 0,
  };
  return scores[priority] || 0;
}

export function getConfidenceScore(confidence: AIInsightConfidence): number {
  const scores: Record<AIInsightConfidence, number> = {
    [AI_INSIGHT.CONFIDENCE.VERY_HIGH]: 0.9,
    [AI_INSIGHT.CONFIDENCE.HIGH]: 0.7,
    [AI_INSIGHT.CONFIDENCE.MEDIUM]: 0.5,
    [AI_INSIGHT.CONFIDENCE.LOW]: 0.3,
    [AI_INSIGHT.CONFIDENCE.VERY_LOW]: 0.1,
    [AI_INSIGHT.CONFIDENCE.UNKNOWN]: 0,
  };
  return scores[confidence] || 0;
}

export function getQualityScore(quality: AIInsightQuality): number {
  const scores: Record<AIInsightQuality, number> = {
    [AI_INSIGHT.QUALITY.EXCELLENT]: 0.9,
    [AI_INSIGHT.QUALITY.GOOD]: 0.7,
    [AI_INSIGHT.QUALITY.FAIR]: 0.5,
    [AI_INSIGHT.QUALITY.POOR]: 0.3,
    [AI_INSIGHT.QUALITY.UNKNOWN]: 0,
  };
  return scores[quality] || 0;
}

export function getImpactScore(impact: AIInsightImpact): number {
  const scores: Record<AIInsightImpact, number> = {
    [AI_INSIGHT.IMPACT.HIGH]: 1.0,
    [AI_INSIGHT.IMPACT.MEDIUM]: 0.6,
    [AI_INSIGHT.IMPACT.LOW]: 0.3,
    [AI_INSIGHT.IMPACT.POSITIVE]: 0.7,
    [AI_INSIGHT.IMPACT.NEGATIVE]: -0.5,
    [AI_INSIGHT.IMPACT.NEUTRAL]: 0,
  };
  return scores[impact] || 0;
}
