/**
 * ডিফল্ট ইনসাইট সংখ্যা (১০)
 */
export const AI_INSIGHT_DEFAULT_LIMIT = 10 as const;

/**
 * ন্যূনতম কনফিডেন্স (০.৬)
 */
export const AI_INSIGHT_MIN_CONFIDENCE = 0.6 as const;

/**
 * সর্বোচ্চ সিভারিটি (৫)
 */
export const AI_INSIGHT_MAX_SEVERITY = 5 as const;

/**
 * রিফ্রেশ ইন্টারভাল (২৪ ঘন্টা - মিলিসেকেন্ডে)
 */
export const AI_INSIGHT_REFRESH_INTERVAL = 86400000 as const; // 24 hours

/**
 * ইনসাইট টাইপ এনাম
 */
export const AI_INSIGHT_TYPE = {
  ANOMALY: 'anomaly',
  TREND: 'trend',
  PATTERN: 'pattern',
  CORRELATION: 'correlation',
  PREDICTION: 'prediction',
  OPPORTUNITY: 'opportunity',
  THREAT: 'threat',
  RECOMMENDATION: 'recommendation',
  ALERT: 'alert',
  SUMMARY: 'summary',
} as const;

/**
 * AI_INSIGHT_TYPE থেকে টাইপ
 */
export type AIInsightType = (typeof AI_INSIGHT_TYPE)[keyof typeof AI_INSIGHT_TYPE];

/**
 * ইনসাইট টাইপ লেবেল
 */
export const AI_INSIGHT_TYPE_LABELS: Record<AIInsightType, string> = {
  [AI_INSIGHT_TYPE.ANOMALY]: 'Anomaly',
  [AI_INSIGHT_TYPE.TREND]: 'Trend',
  [AI_INSIGHT_TYPE.PATTERN]: 'Pattern',
  [AI_INSIGHT_TYPE.CORRELATION]: 'Correlation',
  [AI_INSIGHT_TYPE.PREDICTION]: 'Prediction',
  [AI_INSIGHT_TYPE.OPPORTUNITY]: 'Opportunity',
  [AI_INSIGHT_TYPE.THREAT]: 'Threat',
  [AI_INSIGHT_TYPE.RECOMMENDATION]: 'Recommendation',
  [AI_INSIGHT_TYPE.ALERT]: 'Alert',
  [AI_INSIGHT_TYPE.SUMMARY]: 'Summary',
} as const;

/**
 * ইনসাইট টাইপ বিবরণ
 */
export const AI_INSIGHT_TYPE_DESCRIPTIONS: Record<AIInsightType, string> = {
  [AI_INSIGHT_TYPE.ANOMALY]: 'Identifies unusual patterns or outliers in data',
  [AI_INSIGHT_TYPE.TREND]: 'Shows directional patterns and changes over time',
  [AI_INSIGHT_TYPE.PATTERN]: 'Discovers recurring patterns and sequences',
  [AI_INSIGHT_TYPE.CORRELATION]: 'Finds relationships and dependencies between variables',
  [AI_INSIGHT_TYPE.PREDICTION]: 'Forecasts future outcomes based on historical data',
  [AI_INSIGHT_TYPE.OPPORTUNITY]: 'Highlights potential opportunities for improvement',
  [AI_INSIGHT_TYPE.THREAT]: 'Identifies risks and potential threats',
  [AI_INSIGHT_TYPE.RECOMMENDATION]: 'Provides actionable recommendations',
  [AI_INSIGHT_TYPE.ALERT]: 'Urgent notification requiring immediate attention',
  [AI_INSIGHT_TYPE.SUMMARY]: 'Concise overview of key findings',
} as const;

/**
 * ইনসাইট টাইপ আইকন
 */
export const AI_INSIGHT_TYPE_ICONS: Record<AIInsightType, string> = {
  [AI_INSIGHT_TYPE.ANOMALY]: '🚨',
  [AI_INSIGHT_TYPE.TREND]: '📈',
  [AI_INSIGHT_TYPE.PATTERN]: '🔄',
  [AI_INSIGHT_TYPE.CORRELATION]: '🔗',
  [AI_INSIGHT_TYPE.PREDICTION]: '🔮',
  [AI_INSIGHT_TYPE.OPPORTUNITY]: '💎',
  [AI_INSIGHT_TYPE.THREAT]: '⚠️',
  [AI_INSIGHT_TYPE.RECOMMENDATION]: '💡',
  [AI_INSIGHT_TYPE.ALERT]: '🔔',
  [AI_INSIGHT_TYPE.SUMMARY]: '📋',
} as const;

/**
 * ইনসাইট টাইপ কালার (হেক্স কোড)
 */
export const AI_INSIGHT_TYPE_COLORS: Record<AIInsightType, string> = {
  [AI_INSIGHT_TYPE.ANOMALY]: '#dc2626', // Red-600
  [AI_INSIGHT_TYPE.TREND]: '#3b82f6', // Blue-500
  [AI_INSIGHT_TYPE.PATTERN]: '#8b5cf6', // Violet-500
  [AI_INSIGHT_TYPE.CORRELATION]: '#06b6d4', // Cyan-500
  [AI_INSIGHT_TYPE.PREDICTION]: '#f59e0b', // Amber-500
  [AI_INSIGHT_TYPE.OPPORTUNITY]: '#22c55e', // Green-500
  [AI_INSIGHT_TYPE.THREAT]: '#ef4444', // Red-500
  [AI_INSIGHT_TYPE.RECOMMENDATION]: '#f472b6', // Pink-400
  [AI_INSIGHT_TYPE.ALERT]: '#f97316', // Orange-500
  [AI_INSIGHT_TYPE.SUMMARY]: '#64748b', // Slate-500
} as const;

/**
 * ইনসাইট সিভারিটি লেভেল এনাম
 */
export const AI_INSIGHT_SEVERITY = {
  CRITICAL: 5,
  HIGH: 4,
  MEDIUM: 3,
  LOW: 2,
  INFO: 1,
} as const;

/**
 * AI_INSIGHT_SEVERITY থেকে টাইপ
 */
export type AIInsightSeverity = (typeof AI_INSIGHT_SEVERITY)[keyof typeof AI_INSIGHT_SEVERITY];

/**
 * ইনসাইট সিভারিটি লেবেল
 */
export const AI_INSIGHT_SEVERITY_LABELS: Record<AIInsightSeverity, string> = {
  [AI_INSIGHT_SEVERITY.CRITICAL]: 'Critical',
  [AI_INSIGHT_SEVERITY.HIGH]: 'High',
  [AI_INSIGHT_SEVERITY.MEDIUM]: 'Medium',
  [AI_INSIGHT_SEVERITY.LOW]: 'Low',
  [AI_INSIGHT_SEVERITY.INFO]: 'Info',
} as const;

/**
 * ইনসাইট সিভারিটি কালার
 */
export const AI_INSIGHT_SEVERITY_COLORS: Record<AIInsightSeverity, string> = {
  [AI_INSIGHT_SEVERITY.CRITICAL]: '#dc2626', // Red-600
  [AI_INSIGHT_SEVERITY.HIGH]: '#f97316', // Orange-500
  [AI_INSIGHT_SEVERITY.MEDIUM]: '#f59e0b', // Amber-500
  [AI_INSIGHT_SEVERITY.LOW]: '#3b82f6', // Blue-500
  [AI_INSIGHT_SEVERITY.INFO]: '#94a3b8', // Slate-400
} as const;

/**
 * ইনসাইট কনফিগারেশন
 */
export interface AIInsightConfig {
  defaultLimit: number;
  minConfidence: number;
  maxSeverity: number;
  refreshInterval: number;
  type: AIInsightType;
  severity: AIInsightSeverity;
  includeMetadata: boolean;
  includeEvidence: boolean;
  includeRecommendations: boolean;
}

/**
 * ইনসাইট ডিফল্ট কনফিগারেশন
 */
export const AI_INSIGHT_DEFAULT_CONFIG: AIInsightConfig = {
  defaultLimit: AI_INSIGHT_DEFAULT_LIMIT,
  minConfidence: AI_INSIGHT_MIN_CONFIDENCE,
  maxSeverity: AI_INSIGHT_MAX_SEVERITY,
  refreshInterval: AI_INSIGHT_REFRESH_INTERVAL,
  type: AI_INSIGHT_TYPE.SUMMARY,
  severity: AI_INSIGHT_SEVERITY.MEDIUM,
  includeMetadata: true,
  includeEvidence: true,
  includeRecommendations: true,
} as const;

/**
 * ইনসাইট ফিল্টার
 */
export interface AIInsightFilter {
  type?: AIInsightType;
  severity?: AIInsightSeverity;
  minConfidence?: number;
  maxConfidence?: number;
  minSeverity?: number;
  maxSeverity?: number;
  startDate?: Date;
  endDate?: Date;
  categories?: string[];
  tags?: string[];
  limit?: number;
  offset?: number;
}

/**
 * ইনসাইট এভিডেন্স
 */
export interface AIInsightEvidence {
  type: string;
  description: string;
  data: Record<string, unknown>;
  confidence: number;
  source: string;
  timestamp: Date;
}

/**
 * ইনসাইট
 */
export interface AIInsight<T = unknown> {
  id: string;
  type: AIInsightType;
  title: string;
  description: string;
  severity: AIInsightSeverity;
  confidence: number;
  category: string;
  tags: string[];
  data: T;
  evidence: AIInsightEvidence[];
  recommendations: string[];
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

/**
 * ইনসাইট রেসপন্স
 */
export interface AIInsightResponse<T = unknown> {
  insights: AIInsight<T>[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  summary: {
    totalInsights: number;
    bySeverity: Record<AIInsightSeverity, number>;
    byType: Record<AIInsightType, number>;
    avgConfidence: number;
  };
}

/**
 * ইনসাইট টাইপ গ্রুপ
 */
export const AI_INSIGHT_TYPE_GROUPS = {
  DETECTION: [
    AI_INSIGHT_TYPE.ANOMALY,
    AI_INSIGHT_TYPE.PATTERN,
    AI_INSIGHT_TYPE.CORRELATION,
  ] as const,
  FORECASTING: [AI_INSIGHT_TYPE.TREND, AI_INSIGHT_TYPE.PREDICTION] as const,
  ACTION: [
    AI_INSIGHT_TYPE.OPPORTUNITY,
    AI_INSIGHT_TYPE.THREAT,
    AI_INSIGHT_TYPE.RECOMMENDATION,
  ] as const,
  COMMUNICATION: [AI_INSIGHT_TYPE.ALERT, AI_INSIGHT_TYPE.SUMMARY] as const,
} as const;

/**
 * ইনসাইট টাইপ গ্রুপ লেবেল
 */
export const AI_INSIGHT_TYPE_GROUP_LABELS = {
  DETECTION: 'Detection',
  FORECASTING: 'Forecasting',
  ACTION: 'Action',
  COMMUNICATION: 'Communication',
} as const;

/**
 * ইনসাইট সিভারিটি গ্রুপ
 */
export const AI_INSIGHT_SEVERITY_GROUPS = {
  URGENT: [AI_INSIGHT_SEVERITY.CRITICAL, AI_INSIGHT_SEVERITY.HIGH] as const,
  MODERATE: [AI_INSIGHT_SEVERITY.MEDIUM, AI_INSIGHT_SEVERITY.LOW] as const,
  INFORMATIONAL: [AI_INSIGHT_SEVERITY.INFO] as const,
} as const;

/**
 * ইনসাইট সিভারিটি গ্রুপ লেবেল
 */
export const AI_INSIGHT_SEVERITY_GROUP_LABELS = {
  URGENT: 'Urgent',
  MODERATE: 'Moderate',
  INFORMATIONAL: 'Informational',
} as const;
