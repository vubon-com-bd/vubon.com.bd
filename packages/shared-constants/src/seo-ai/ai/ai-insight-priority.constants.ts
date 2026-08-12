/**
 * AI ইনসাইট প্রায়োরিটি এনাম
 */
export const AI_INSIGHT_PRIORITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

/**
 * AI_INSIGHT_PRIORITY থেকে টাইপ
 */
export type AIInsightPriorityType = (typeof AI_INSIGHT_PRIORITY)[keyof typeof AI_INSIGHT_PRIORITY];

/**
 * ইনসাইট প্রায়োরিটি লেবেল
 */
export const AI_INSIGHT_PRIORITY_LABELS: Record<AIInsightPriorityType, string> = {
  [AI_INSIGHT_PRIORITY.CRITICAL]: 'Critical',
  [AI_INSIGHT_PRIORITY.HIGH]: 'High',
  [AI_INSIGHT_PRIORITY.MEDIUM]: 'Medium',
  [AI_INSIGHT_PRIORITY.LOW]: 'Low',
} as const;

/**
 * ইনসাইট প্রায়োরিটি বিবরণ
 */
export const AI_INSIGHT_PRIORITY_DESCRIPTIONS: Record<AIInsightPriorityType, string> = {
  [AI_INSIGHT_PRIORITY.CRITICAL]: 'Requires immediate action and attention',
  [AI_INSIGHT_PRIORITY.HIGH]: 'Should be addressed as soon as possible',
  [AI_INSIGHT_PRIORITY.MEDIUM]: 'Should be addressed in due course',
  [AI_INSIGHT_PRIORITY.LOW]: 'Can be addressed when time permits',
} as const;

/**
 * ইনসাইট প্রায়োরিটি আইকন
 */
export const AI_INSIGHT_PRIORITY_ICONS: Record<AIInsightPriorityType, string> = {
  [AI_INSIGHT_PRIORITY.CRITICAL]: '🔴',
  [AI_INSIGHT_PRIORITY.HIGH]: '🟠',
  [AI_INSIGHT_PRIORITY.MEDIUM]: '🟡',
  [AI_INSIGHT_PRIORITY.LOW]: '🟢',
} as const;

/**
 * ইনসাইট প্রায়োরিটি কালার (হেক্স কোড)
 */
export const AI_INSIGHT_PRIORITY_COLORS: Record<AIInsightPriorityType, string> = {
  [AI_INSIGHT_PRIORITY.CRITICAL]: '#dc2626', // Red-600
  [AI_INSIGHT_PRIORITY.HIGH]: '#f97316', // Orange-500
  [AI_INSIGHT_PRIORITY.MEDIUM]: '#f59e0b', // Amber-500
  [AI_INSIGHT_PRIORITY.LOW]: '#94a3b8', // Slate-400
} as const;

/**
 * ইনসাইট প্রায়োরিটি থ্রেশহোল্ড
 */
export const AI_INSIGHT_PRIORITY_THRESHOLDS = {
  CRITICAL: {
    minConfidence: 0.95,
    minSeverity: 5,
    maxResponseTime: 300, // seconds
    requiresApproval: false,
    autoAction: true,
  },
  HIGH: {
    minConfidence: 0.85,
    minSeverity: 4,
    maxResponseTime: 1800, // seconds (30 minutes)
    requiresApproval: false,
    autoAction: false,
  },
  MEDIUM: {
    minConfidence: 0.7,
    minSeverity: 3,
    maxResponseTime: 7200, // seconds (2 hours)
    requiresApproval: true,
    autoAction: false,
  },
  LOW: {
    minConfidence: 0.6,
    minSeverity: 1,
    maxResponseTime: 86400, // seconds (24 hours)
    requiresApproval: true,
    autoAction: false,
  },
} as const;

/**
 * ইনসাইট প্রায়োরিটি থ্রেশহোল্ড টাইপ
 */
export type AIInsightPriorityThresholds = typeof AI_INSIGHT_PRIORITY_THRESHOLDS;

/**
 * ইনসাইট প্রায়োরিটি কনফিগারেশন
 */
export interface AIInsightPriorityConfig {
  priority: AIInsightPriorityType;
  label: string;
  description: string;
  icon: string;
  color: string;
  thresholds: {
    minConfidence: number;
    minSeverity: number;
    maxResponseTime: number;
    requiresApproval: boolean;
    autoAction: boolean;
  };
  order: number;
  escalationTime: number;
  notificationChannel: string;
}

/**
 * ইনসাইট প্রায়োরিটি মেটাডেটা
 */
export const AI_INSIGHT_PRIORITY_METADATA: Record<AIInsightPriorityType, AIInsightPriorityConfig> =
  {
    [AI_INSIGHT_PRIORITY.CRITICAL]: {
      priority: AI_INSIGHT_PRIORITY.CRITICAL,
      label: AI_INSIGHT_PRIORITY_LABELS[AI_INSIGHT_PRIORITY.CRITICAL],
      description: AI_INSIGHT_PRIORITY_DESCRIPTIONS[AI_INSIGHT_PRIORITY.CRITICAL],
      icon: AI_INSIGHT_PRIORITY_ICONS[AI_INSIGHT_PRIORITY.CRITICAL],
      color: AI_INSIGHT_PRIORITY_COLORS[AI_INSIGHT_PRIORITY.CRITICAL],
      thresholds: AI_INSIGHT_PRIORITY_THRESHOLDS.CRITICAL,
      order: 0,
      escalationTime: 300,
      notificationChannel: 'urgent',
    },
    [AI_INSIGHT_PRIORITY.HIGH]: {
      priority: AI_INSIGHT_PRIORITY.HIGH,
      label: AI_INSIGHT_PRIORITY_LABELS[AI_INSIGHT_PRIORITY.HIGH],
      description: AI_INSIGHT_PRIORITY_DESCRIPTIONS[AI_INSIGHT_PRIORITY.HIGH],
      icon: AI_INSIGHT_PRIORITY_ICONS[AI_INSIGHT_PRIORITY.HIGH],
      color: AI_INSIGHT_PRIORITY_COLORS[AI_INSIGHT_PRIORITY.HIGH],
      thresholds: AI_INSIGHT_PRIORITY_THRESHOLDS.HIGH,
      order: 1,
      escalationTime: 1800,
      notificationChannel: 'email',
    },
    [AI_INSIGHT_PRIORITY.MEDIUM]: {
      priority: AI_INSIGHT_PRIORITY.MEDIUM,
      label: AI_INSIGHT_PRIORITY_LABELS[AI_INSIGHT_PRIORITY.MEDIUM],
      description: AI_INSIGHT_PRIORITY_DESCRIPTIONS[AI_INSIGHT_PRIORITY.MEDIUM],
      icon: AI_INSIGHT_PRIORITY_ICONS[AI_INSIGHT_PRIORITY.MEDIUM],
      color: AI_INSIGHT_PRIORITY_COLORS[AI_INSIGHT_PRIORITY.MEDIUM],
      thresholds: AI_INSIGHT_PRIORITY_THRESHOLDS.MEDIUM,
      order: 2,
      escalationTime: 7200,
      notificationChannel: 'dashboard',
    },
    [AI_INSIGHT_PRIORITY.LOW]: {
      priority: AI_INSIGHT_PRIORITY.LOW,
      label: AI_INSIGHT_PRIORITY_LABELS[AI_INSIGHT_PRIORITY.LOW],
      description: AI_INSIGHT_PRIORITY_DESCRIPTIONS[AI_INSIGHT_PRIORITY.LOW],
      icon: AI_INSIGHT_PRIORITY_ICONS[AI_INSIGHT_PRIORITY.LOW],
      color: AI_INSIGHT_PRIORITY_COLORS[AI_INSIGHT_PRIORITY.LOW],
      thresholds: AI_INSIGHT_PRIORITY_THRESHOLDS.LOW,
      order: 3,
      escalationTime: 86400,
      notificationChannel: 'dashboard',
    },
  } as const;

/**
 * ইনসাইট প্রায়োরিটি গ্রুপ
 */
export const AI_INSIGHT_PRIORITY_GROUPS = {
  URGENT: [AI_INSIGHT_PRIORITY.CRITICAL, AI_INSIGHT_PRIORITY.HIGH] as const,
  STANDARD: [AI_INSIGHT_PRIORITY.MEDIUM] as const,
  LOW: [AI_INSIGHT_PRIORITY.LOW] as const,
} as const;

/**
 * ইনসাইট প্রায়োরিটি গ্রুপ লেবেল
 */
export const AI_INSIGHT_PRIORITY_GROUP_LABELS = {
  URGENT: 'Urgent',
  STANDARD: 'Standard',
  LOW: 'Low',
} as const;

/**
 * ইনসাইট প্রায়োরিটি স্কোর (সংখ্যাসূচক মান)
 */
export const AI_INSIGHT_PRIORITY_SCORES: Record<AIInsightPriorityType, number> = {
  [AI_INSIGHT_PRIORITY.CRITICAL]: 100,
  [AI_INSIGHT_PRIORITY.HIGH]: 75,
  [AI_INSIGHT_PRIORITY.MEDIUM]: 50,
  [AI_INSIGHT_PRIORITY.LOW]: 25,
} as const;

/**
 * ইনসাইট প্রায়োরিটি ক্যালকুলেশন ফ্যাক্টর
 */
export const AI_INSIGHT_PRIORITY_FACTORS = {
  confidenceWeight: 0.4,
  severityWeight: 0.3,
  impactWeight: 0.2,
  urgencyWeight: 0.1,
} as const;

/**
 * ইনসাইট প্রায়োরিটি রেসপন্স টাইম (সেকেন্ডে)
 */
export const AI_INSIGHT_PRIORITY_RESPONSE_TIME: Record<AIInsightPriorityType, number> = {
  [AI_INSIGHT_PRIORITY.CRITICAL]: 300, // 5 minutes
  [AI_INSIGHT_PRIORITY.HIGH]: 1800, // 30 minutes
  [AI_INSIGHT_PRIORITY.MEDIUM]: 7200, // 2 hours
  [AI_INSIGHT_PRIORITY.LOW]: 86400, // 24 hours
} as const;

/**
 * ইনসাইট প্রায়োরিটি এসকেলেশন লেভেল
 */
export const AI_INSIGHT_PRIORITY_ESCALATION: Record<AIInsightPriorityType, number> = {
  [AI_INSIGHT_PRIORITY.CRITICAL]: 3,
  [AI_INSIGHT_PRIORITY.HIGH]: 2,
  [AI_INSIGHT_PRIORITY.MEDIUM]: 1,
  [AI_INSIGHT_PRIORITY.LOW]: 0,
} as const;
