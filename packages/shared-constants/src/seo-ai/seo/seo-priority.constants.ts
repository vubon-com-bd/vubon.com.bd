/**
 * SEO প্রায়োরিটি এনাম
 */
export const SEO_PRIORITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

/**
 * SEO_PRIORITY থেকে টাইপ
 */
export type SEOPriority = (typeof SEO_PRIORITY)[keyof typeof SEO_PRIORITY];

/**
 * SEO প্রায়োরিটি লেবেল
 */
export const SEO_PRIORITY_LABELS: Record<SEOPriority, string> = {
  [SEO_PRIORITY.CRITICAL]: 'Critical',
  [SEO_PRIORITY.HIGH]: 'High',
  [SEO_PRIORITY.MEDIUM]: 'Medium',
  [SEO_PRIORITY.LOW]: 'Low',
} as const;

/**
 * SEO প্রায়োরিটি বিবরণ
 */
export const SEO_PRIORITY_DESCRIPTIONS: Record<SEOPriority, string> = {
  [SEO_PRIORITY.CRITICAL]: 'Immediate action required - blocks core functionality',
  [SEO_PRIORITY.HIGH]: 'High priority - significant impact on SEO performance',
  [SEO_PRIORITY.MEDIUM]: 'Medium priority - important but not urgent',
  [SEO_PRIORITY.LOW]: 'Low priority - nice to have, minimal impact',
} as const;

/**
 * SEO প্রায়োরিটি স্কোর (সংখ্যাসূচক মান)
 */
export const SEO_PRIORITY_SCORES: Record<SEOPriority, number> = {
  [SEO_PRIORITY.CRITICAL]: 100,
  [SEO_PRIORITY.HIGH]: 75,
  [SEO_PRIORITY.MEDIUM]: 50,
  [SEO_PRIORITY.LOW]: 25,
} as const;

/**
 * SEO প্রায়োরিটি আইকন
 */
export const SEO_PRIORITY_ICONS: Record<SEOPriority, string> = {
  [SEO_PRIORITY.CRITICAL]: '🔴',
  [SEO_PRIORITY.HIGH]: '🟠',
  [SEO_PRIORITY.MEDIUM]: '🟡',
  [SEO_PRIORITY.LOW]: '🟢',
} as const;

/**
 * SEO প্রায়োরিটি কালার (হেক্স কোড)
 */
export const SEO_PRIORITY_COLORS: Record<SEOPriority, string> = {
  [SEO_PRIORITY.CRITICAL]: '#dc2626', // Red-600
  [SEO_PRIORITY.HIGH]: '#f59e0b', // Amber-500
  [SEO_PRIORITY.MEDIUM]: '#eab308', // Yellow-500
  [SEO_PRIORITY.LOW]: '#22c55e', // Green-500
} as const;

/**
 * SEO প্রায়োরিটি টাইম ফ্রেম (ঘন্টায়)
 */
export const SEO_PRIORITY_TIMEFRAME: Record<SEOPriority, number> = {
  [SEO_PRIORITY.CRITICAL]: 1, // 1 hour
  [SEO_PRIORITY.HIGH]: 24, // 24 hours
  [SEO_PRIORITY.MEDIUM]: 72, // 72 hours (3 days)
  [SEO_PRIORITY.LOW]: 168, // 168 hours (7 days)
} as const;

/**
 * SEO প্রায়োরিটি কনফিগারেশন
 */
export interface SEOPriorityConfig {
  priority: SEOPriority;
  label: string;
  description: string;
  score: number;
  icon: string;
  color: string;
  timeframe: number; // hours
  order: number;
}

/**
 * SEO প্রায়োরিটি মেটাডেটা
 */
export const SEO_PRIORITY_METADATA: Record<SEOPriority, SEOPriorityConfig> = {
  [SEO_PRIORITY.CRITICAL]: {
    priority: SEO_PRIORITY.CRITICAL,
    label: SEO_PRIORITY_LABELS[SEO_PRIORITY.CRITICAL],
    description: SEO_PRIORITY_DESCRIPTIONS[SEO_PRIORITY.CRITICAL],
    score: SEO_PRIORITY_SCORES[SEO_PRIORITY.CRITICAL],
    icon: SEO_PRIORITY_ICONS[SEO_PRIORITY.CRITICAL],
    color: SEO_PRIORITY_COLORS[SEO_PRIORITY.CRITICAL],
    timeframe: SEO_PRIORITY_TIMEFRAME[SEO_PRIORITY.CRITICAL],
    order: 0,
  },
  [SEO_PRIORITY.HIGH]: {
    priority: SEO_PRIORITY.HIGH,
    label: SEO_PRIORITY_LABELS[SEO_PRIORITY.HIGH],
    description: SEO_PRIORITY_DESCRIPTIONS[SEO_PRIORITY.HIGH],
    score: SEO_PRIORITY_SCORES[SEO_PRIORITY.HIGH],
    icon: SEO_PRIORITY_ICONS[SEO_PRIORITY.HIGH],
    color: SEO_PRIORITY_COLORS[SEO_PRIORITY.HIGH],
    timeframe: SEO_PRIORITY_TIMEFRAME[SEO_PRIORITY.HIGH],
    order: 1,
  },
  [SEO_PRIORITY.MEDIUM]: {
    priority: SEO_PRIORITY.MEDIUM,
    label: SEO_PRIORITY_LABELS[SEO_PRIORITY.MEDIUM],
    description: SEO_PRIORITY_DESCRIPTIONS[SEO_PRIORITY.MEDIUM],
    score: SEO_PRIORITY_SCORES[SEO_PRIORITY.MEDIUM],
    icon: SEO_PRIORITY_ICONS[SEO_PRIORITY.MEDIUM],
    color: SEO_PRIORITY_COLORS[SEO_PRIORITY.MEDIUM],
    timeframe: SEO_PRIORITY_TIMEFRAME[SEO_PRIORITY.MEDIUM],
    order: 2,
  },
  [SEO_PRIORITY.LOW]: {
    priority: SEO_PRIORITY.LOW,
    label: SEO_PRIORITY_LABELS[SEO_PRIORITY.LOW],
    description: SEO_PRIORITY_DESCRIPTIONS[SEO_PRIORITY.LOW],
    score: SEO_PRIORITY_SCORES[SEO_PRIORITY.LOW],
    icon: SEO_PRIORITY_ICONS[SEO_PRIORITY.LOW],
    color: SEO_PRIORITY_COLORS[SEO_PRIORITY.LOW],
    timeframe: SEO_PRIORITY_TIMEFRAME[SEO_PRIORITY.LOW],
    order: 3,
  },
} as const;

/**
 * SEO প্রায়োরিটি থ্রেশহোল্ড
 */
export const SEO_PRIORITY_THRESHOLDS = {
  CRITICAL_MIN: 80,
  HIGH_MIN: 60,
  MEDIUM_MIN: 40,
  LOW_MIN: 20,
} as const;

/**
 * স্কোর থেকে SEO প্রায়োরিটি নির্ধারণ
 */
export const SEO_PRIORITY_FROM_SCORE: Record<number, SEOPriority> = {
  [SEO_PRIORITY_THRESHOLDS.CRITICAL_MIN]: SEO_PRIORITY.CRITICAL,
  [SEO_PRIORITY_THRESHOLDS.HIGH_MIN]: SEO_PRIORITY.HIGH,
  [SEO_PRIORITY_THRESHOLDS.MEDIUM_MIN]: SEO_PRIORITY.MEDIUM,
  [SEO_PRIORITY_THRESHOLDS.LOW_MIN]: SEO_PRIORITY.LOW,
} as const;

/**
 * SEO প্রায়োরিটি গ্রুপ
 */
export const SEO_PRIORITY_GROUPS = {
  URGENT: [SEO_PRIORITY.CRITICAL, SEO_PRIORITY.HIGH] as const,
  STANDARD: [SEO_PRIORITY.MEDIUM] as const,
  OPTIONAL: [SEO_PRIORITY.LOW] as const,
} as const;

/**
 * SEO প্রায়োরিটি গ্রুপ লেবেল
 */
export const SEO_PRIORITY_GROUP_LABELS = {
  URGENT: 'Urgent',
  STANDARD: 'Standard',
  OPTIONAL: 'Optional',
} as const;
