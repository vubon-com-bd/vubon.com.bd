/**
 * AI অ্যানালিটিক্স টাইপ এনাম
 */
export const AI_ANALYTICS_TYPE = {
  USAGE: 'usage',
  PERFORMANCE: 'performance',
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  REVENUE: 'revenue',
  TRAFFIC: 'traffic',
  RETENTION: 'retention',
  SATISFACTION: 'satisfaction',
} as const;

/**
 * AI_ANALYTICS_TYPE থেকে টাইপ
 */
export type AIAnalyticsTypeType = (typeof AI_ANALYTICS_TYPE)[keyof typeof AI_ANALYTICS_TYPE];

/**
 * অ্যানালিটিক্স টাইপ লেবেল
 */
export const AI_ANALYTICS_TYPE_LABELS: Record<AIAnalyticsTypeType, string> = {
  [AI_ANALYTICS_TYPE.USAGE]: 'Usage',
  [AI_ANALYTICS_TYPE.PERFORMANCE]: 'Performance',
  [AI_ANALYTICS_TYPE.ENGAGEMENT]: 'Engagement',
  [AI_ANALYTICS_TYPE.CONVERSION]: 'Conversion',
  [AI_ANALYTICS_TYPE.REVENUE]: 'Revenue',
  [AI_ANALYTICS_TYPE.TRAFFIC]: 'Traffic',
  [AI_ANALYTICS_TYPE.RETENTION]: 'Retention',
  [AI_ANALYTICS_TYPE.SATISFACTION]: 'Satisfaction',
} as const;

/**
 * অ্যানালিটিক্স টাইপ বিবরণ
 */
export const AI_ANALYTICS_TYPE_DESCRIPTIONS: Record<AIAnalyticsTypeType, string> = {
  [AI_ANALYTICS_TYPE.USAGE]: 'Tracks how users interact with the system and features',
  [AI_ANALYTICS_TYPE.PERFORMANCE]: 'Monitors system performance and efficiency metrics',
  [AI_ANALYTICS_TYPE.ENGAGEMENT]: 'Measures user engagement and interaction depth',
  [AI_ANALYTICS_TYPE.CONVERSION]: 'Tracks conversion rates and goal completions',
  [AI_ANALYTICS_TYPE.REVENUE]: 'Monitors revenue and monetization metrics',
  [AI_ANALYTICS_TYPE.TRAFFIC]: 'Analyzes traffic sources and visitor patterns',
  [AI_ANALYTICS_TYPE.RETENTION]: 'Tracks user retention and churn patterns',
  [AI_ANALYTICS_TYPE.SATISFACTION]: 'Measures user satisfaction and feedback metrics',
} as const;

/**
 * অ্যানালিটিক্স টাইপ আইকন
 */
export const AI_ANALYTICS_TYPE_ICONS: Record<AIAnalyticsTypeType, string> = {
  [AI_ANALYTICS_TYPE.USAGE]: '📊',
  [AI_ANALYTICS_TYPE.PERFORMANCE]: '⚡',
  [AI_ANALYTICS_TYPE.ENGAGEMENT]: '💬',
  [AI_ANALYTICS_TYPE.CONVERSION]: '🎯',
  [AI_ANALYTICS_TYPE.REVENUE]: '💰',
  [AI_ANALYTICS_TYPE.TRAFFIC]: '🚦',
  [AI_ANALYTICS_TYPE.RETENTION]: '🔄',
  [AI_ANALYTICS_TYPE.SATISFACTION]: '😊',
} as const;

/**
 * অ্যানালিটিক্স টাইপ কালার (হেক্স কোড)
 */
export const AI_ANALYTICS_TYPE_COLORS: Record<AIAnalyticsTypeType, string> = {
  [AI_ANALYTICS_TYPE.USAGE]: '#3b82f6', // Blue-500
  [AI_ANALYTICS_TYPE.PERFORMANCE]: '#8b5cf6', // Violet-500
  [AI_ANALYTICS_TYPE.ENGAGEMENT]: '#ec4899', // Pink-500
  [AI_ANALYTICS_TYPE.CONVERSION]: '#22c55e', // Green-500
  [AI_ANALYTICS_TYPE.REVENUE]: '#f59e0b', // Amber-500
  [AI_ANALYTICS_TYPE.TRAFFIC]: '#06b6d4', // Cyan-500
  [AI_ANALYTICS_TYPE.RETENTION]: '#ef4444', // Red-500
  [AI_ANALYTICS_TYPE.SATISFACTION]: '#f472b6', // Pink-400
} as const;

/**
 * অ্যানালিটিক্স টাইপ কমপ্লেক্সিটি (১-৫)
 */
export const AI_ANALYTICS_TYPE_COMPLEXITY: Record<AIAnalyticsTypeType, number> = {
  [AI_ANALYTICS_TYPE.USAGE]: 2,
  [AI_ANALYTICS_TYPE.PERFORMANCE]: 3,
  [AI_ANALYTICS_TYPE.ENGAGEMENT]: 3,
  [AI_ANALYTICS_TYPE.CONVERSION]: 4,
  [AI_ANALYTICS_TYPE.REVENUE]: 4,
  [AI_ANALYTICS_TYPE.TRAFFIC]: 2,
  [AI_ANALYTICS_TYPE.RETENTION]: 4,
  [AI_ANALYTICS_TYPE.SATISFACTION]: 3,
} as const;

/**
 * অ্যানালিটিক্স টাইপ কনফিগারেশন
 */
export interface AIAnalyticsTypeConfig {
  type: AIAnalyticsTypeType;
  label: string;
  description: string;
  icon: string;
  color: string;
  complexity: number;
  requiresRealTime: boolean;
  requiresAggregation: boolean;
  requiresHistoricalData: boolean;
  updateFrequency: string;
}

/**
 * অ্যানালিটিক্স টাইপ মেটাডেটা
 */
export const AI_ANALYTICS_TYPE_METADATA: Record<AIAnalyticsTypeType, AIAnalyticsTypeConfig> = {
  [AI_ANALYTICS_TYPE.USAGE]: {
    type: AI_ANALYTICS_TYPE.USAGE,
    label: AI_ANALYTICS_TYPE_LABELS[AI_ANALYTICS_TYPE.USAGE],
    description: AI_ANALYTICS_TYPE_DESCRIPTIONS[AI_ANALYTICS_TYPE.USAGE],
    icon: AI_ANALYTICS_TYPE_ICONS[AI_ANALYTICS_TYPE.USAGE],
    color: AI_ANALYTICS_TYPE_COLORS[AI_ANALYTICS_TYPE.USAGE],
    complexity: AI_ANALYTICS_TYPE_COMPLEXITY[AI_ANALYTICS_TYPE.USAGE],
    requiresRealTime: false,
    requiresAggregation: true,
    requiresHistoricalData: false,
    updateFrequency: 'daily',
  },
  [AI_ANALYTICS_TYPE.PERFORMANCE]: {
    type: AI_ANALYTICS_TYPE.PERFORMANCE,
    label: AI_ANALYTICS_TYPE_LABELS[AI_ANALYTICS_TYPE.PERFORMANCE],
    description: AI_ANALYTICS_TYPE_DESCRIPTIONS[AI_ANALYTICS_TYPE.PERFORMANCE],
    icon: AI_ANALYTICS_TYPE_ICONS[AI_ANALYTICS_TYPE.PERFORMANCE],
    color: AI_ANALYTICS_TYPE_COLORS[AI_ANALYTICS_TYPE.PERFORMANCE],
    complexity: AI_ANALYTICS_TYPE_COMPLEXITY[AI_ANALYTICS_TYPE.PERFORMANCE],
    requiresRealTime: true,
    requiresAggregation: false,
    requiresHistoricalData: false,
    updateFrequency: 'realtime',
  },
  [AI_ANALYTICS_TYPE.ENGAGEMENT]: {
    type: AI_ANALYTICS_TYPE.ENGAGEMENT,
    label: AI_ANALYTICS_TYPE_LABELS[AI_ANALYTICS_TYPE.ENGAGEMENT],
    description: AI_ANALYTICS_TYPE_DESCRIPTIONS[AI_ANALYTICS_TYPE.ENGAGEMENT],
    icon: AI_ANALYTICS_TYPE_ICONS[AI_ANALYTICS_TYPE.ENGAGEMENT],
    color: AI_ANALYTICS_TYPE_COLORS[AI_ANALYTICS_TYPE.ENGAGEMENT],
    complexity: AI_ANALYTICS_TYPE_COMPLEXITY[AI_ANALYTICS_TYPE.ENGAGEMENT],
    requiresRealTime: false,
    requiresAggregation: true,
    requiresHistoricalData: true,
    updateFrequency: 'hourly',
  },
  [AI_ANALYTICS_TYPE.CONVERSION]: {
    type: AI_ANALYTICS_TYPE.CONVERSION,
    label: AI_ANALYTICS_TYPE_LABELS[AI_ANALYTICS_TYPE.CONVERSION],
    description: AI_ANALYTICS_TYPE_DESCRIPTIONS[AI_ANALYTICS_TYPE.CONVERSION],
    icon: AI_ANALYTICS_TYPE_ICONS[AI_ANALYTICS_TYPE.CONVERSION],
    color: AI_ANALYTICS_TYPE_COLORS[AI_ANALYTICS_TYPE.CONVERSION],
    complexity: AI_ANALYTICS_TYPE_COMPLEXITY[AI_ANALYTICS_TYPE.CONVERSION],
    requiresRealTime: false,
    requiresAggregation: true,
    requiresHistoricalData: true,
    updateFrequency: 'daily',
  },
  [AI_ANALYTICS_TYPE.REVENUE]: {
    type: AI_ANALYTICS_TYPE.REVENUE,
    label: AI_ANALYTICS_TYPE_LABELS[AI_ANALYTICS_TYPE.REVENUE],
    description: AI_ANALYTICS_TYPE_DESCRIPTIONS[AI_ANALYTICS_TYPE.REVENUE],
    icon: AI_ANALYTICS_TYPE_ICONS[AI_ANALYTICS_TYPE.REVENUE],
    color: AI_ANALYTICS_TYPE_COLORS[AI_ANALYTICS_TYPE.REVENUE],
    complexity: AI_ANALYTICS_TYPE_COMPLEXITY[AI_ANALYTICS_TYPE.REVENUE],
    requiresRealTime: false,
    requiresAggregation: true,
    requiresHistoricalData: true,
    updateFrequency: 'daily',
  },
  [AI_ANALYTICS_TYPE.TRAFFIC]: {
    type: AI_ANALYTICS_TYPE.TRAFFIC,
    label: AI_ANALYTICS_TYPE_LABELS[AI_ANALYTICS_TYPE.TRAFFIC],
    description: AI_ANALYTICS_TYPE_DESCRIPTIONS[AI_ANALYTICS_TYPE.TRAFFIC],
    icon: AI_ANALYTICS_TYPE_ICONS[AI_ANALYTICS_TYPE.TRAFFIC],
    color: AI_ANALYTICS_TYPE_COLORS[AI_ANALYTICS_TYPE.TRAFFIC],
    complexity: AI_ANALYTICS_TYPE_COMPLEXITY[AI_ANALYTICS_TYPE.TRAFFIC],
    requiresRealTime: false,
    requiresAggregation: true,
    requiresHistoricalData: false,
    updateFrequency: 'hourly',
  },
  [AI_ANALYTICS_TYPE.RETENTION]: {
    type: AI_ANALYTICS_TYPE.RETENTION,
    label: AI_ANALYTICS_TYPE_LABELS[AI_ANALYTICS_TYPE.RETENTION],
    description: AI_ANALYTICS_TYPE_DESCRIPTIONS[AI_ANALYTICS_TYPE.RETENTION],
    icon: AI_ANALYTICS_TYPE_ICONS[AI_ANALYTICS_TYPE.RETENTION],
    color: AI_ANALYTICS_TYPE_COLORS[AI_ANALYTICS_TYPE.RETENTION],
    complexity: AI_ANALYTICS_TYPE_COMPLEXITY[AI_ANALYTICS_TYPE.RETENTION],
    requiresRealTime: false,
    requiresAggregation: true,
    requiresHistoricalData: true,
    updateFrequency: 'weekly',
  },
  [AI_ANALYTICS_TYPE.SATISFACTION]: {
    type: AI_ANALYTICS_TYPE.SATISFACTION,
    label: AI_ANALYTICS_TYPE_LABELS[AI_ANALYTICS_TYPE.SATISFACTION],
    description: AI_ANALYTICS_TYPE_DESCRIPTIONS[AI_ANALYTICS_TYPE.SATISFACTION],
    icon: AI_ANALYTICS_TYPE_ICONS[AI_ANALYTICS_TYPE.SATISFACTION],
    color: AI_ANALYTICS_TYPE_COLORS[AI_ANALYTICS_TYPE.SATISFACTION],
    complexity: AI_ANALYTICS_TYPE_COMPLEXITY[AI_ANALYTICS_TYPE.SATISFACTION],
    requiresRealTime: false,
    requiresAggregation: true,
    requiresHistoricalData: true,
    updateFrequency: 'weekly',
  },
} as const;

/**
 * অ্যানালিটিক্স টাইপ গ্রুপ
 */
export const AI_ANALYTICS_TYPE_GROUPS = {
  USER_CENTRIC: [
    AI_ANALYTICS_TYPE.USAGE,
    AI_ANALYTICS_TYPE.ENGAGEMENT,
    AI_ANALYTICS_TYPE.SATISFACTION,
  ] as const,
  BUSINESS_CENTRIC: [
    AI_ANALYTICS_TYPE.CONVERSION,
    AI_ANALYTICS_TYPE.REVENUE,
    AI_ANALYTICS_TYPE.RETENTION,
  ] as const,
  SYSTEM_CENTRIC: [AI_ANALYTICS_TYPE.PERFORMANCE] as const,
  TRAFFIC_CENTRIC: [AI_ANALYTICS_TYPE.TRAFFIC] as const,
} as const;

/**
 * অ্যানালিটিক্স টাইপ গ্রুপ লেবেল
 */
export const AI_ANALYTICS_TYPE_GROUP_LABELS = {
  USER_CENTRIC: 'User Centric',
  BUSINESS_CENTRIC: 'Business Centric',
  SYSTEM_CENTRIC: 'System Centric',
  TRAFFIC_CENTRIC: 'Traffic Centric',
} as const;
