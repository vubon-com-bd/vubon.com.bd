/**
 * ন্যূনতম স্কোর (০)
 */
export const SEO_SCORE_MIN = 0 as const;

/**
 * সর্বোচ্চ স্কোর (১০০)
 */
export const SEO_SCORE_MAX = 100 as const;

/**
 * ভালো স্কোর থ্রেশহোল্ড (৮০)
 */
export const SEO_SCORE_GOOD = 80 as const;

/**
 * গড় স্কোর থ্রেশহোল্ড (৫০)
 */
export const SEO_SCORE_AVERAGE = 50 as const;

/**
 * SEO স্কোর ক্যাটাগরি
 */
export const SEO_SCORE_CATEGORY = {
  POOR: 'poor',
  FAIR: 'fair',
  AVERAGE: 'average',
  GOOD: 'good',
  EXCELLENT: 'excellent',
  PERFECT: 'perfect',
} as const;

/**
 * SEO_SCORE_CATEGORY থেকে টাইপ
 */
export type SEOScoreCategory = (typeof SEO_SCORE_CATEGORY)[keyof typeof SEO_SCORE_CATEGORY];

/**
 * SEO স্কোর ক্যাটাগরি লেবেল
 */
export const SEO_SCORE_CATEGORY_LABELS: Record<SEOScoreCategory, string> = {
  [SEO_SCORE_CATEGORY.POOR]: 'Poor',
  [SEO_SCORE_CATEGORY.FAIR]: 'Fair',
  [SEO_SCORE_CATEGORY.AVERAGE]: 'Average',
  [SEO_SCORE_CATEGORY.GOOD]: 'Good',
  [SEO_SCORE_CATEGORY.EXCELLENT]: 'Excellent',
  [SEO_SCORE_CATEGORY.PERFECT]: 'Perfect',
} as const;

/**
 * SEO স্কোর ক্যাটাগরি বিবরণ
 */
export const SEO_SCORE_CATEGORY_DESCRIPTIONS: Record<SEOScoreCategory, string> = {
  [SEO_SCORE_CATEGORY.POOR]: 'Significant improvements needed',
  [SEO_SCORE_CATEGORY.FAIR]: 'Below average, needs improvement',
  [SEO_SCORE_CATEGORY.AVERAGE]: 'Meets basic standards',
  [SEO_SCORE_CATEGORY.GOOD]: 'Above average, well optimized',
  [SEO_SCORE_CATEGORY.EXCELLENT]: 'Highly optimized, performing well',
  [SEO_SCORE_CATEGORY.PERFECT]: 'Perfect optimization across all metrics',
} as const;

/**
 * SEO স্কোর ক্যাটাগরি আইকন
 */
export const SEO_SCORE_CATEGORY_ICONS: Record<SEOScoreCategory, string> = {
  [SEO_SCORE_CATEGORY.POOR]: '🔴',
  [SEO_SCORE_CATEGORY.FAIR]: '🟠',
  [SEO_SCORE_CATEGORY.AVERAGE]: '🟡',
  [SEO_SCORE_CATEGORY.GOOD]: '🟢',
  [SEO_SCORE_CATEGORY.EXCELLENT]: '💎',
  [SEO_SCORE_CATEGORY.PERFECT]: '⭐',
} as const;

/**
 * SEO স্কোর ক্যাটাগরি কালার (হেক্স কোড)
 */
export const SEO_SCORE_CATEGORY_COLORS: Record<SEOScoreCategory, string> = {
  [SEO_SCORE_CATEGORY.POOR]: '#dc2626', // Red-600
  [SEO_SCORE_CATEGORY.FAIR]: '#f97316', // Orange-500
  [SEO_SCORE_CATEGORY.AVERAGE]: '#f59e0b', // Amber-500
  [SEO_SCORE_CATEGORY.GOOD]: '#22c55e', // Green-500
  [SEO_SCORE_CATEGORY.EXCELLENT]: '#06b6d4', // Cyan-500
  [SEO_SCORE_CATEGORY.PERFECT]: '#8b5cf6', // Violet-500
} as const;

/**
 * SEO স্কোর ক্যাটাগরি থ্রেশহোল্ড
 */
export const SEO_SCORE_CATEGORY_THRESHOLDS: Record<SEOScoreCategory, number> = {
  [SEO_SCORE_CATEGORY.POOR]: 0,
  [SEO_SCORE_CATEGORY.FAIR]: 20,
  [SEO_SCORE_CATEGORY.AVERAGE]: 40,
  [SEO_SCORE_CATEGORY.GOOD]: 60,
  [SEO_SCORE_CATEGORY.EXCELLENT]: 80,
  [SEO_SCORE_CATEGORY.PERFECT]: 95,
} as const;

/**
 * SEO স্কোর ক্যাটাগরি রেঞ্জ
 */
export const SEO_SCORE_CATEGORY_RANGES: Record<SEOScoreCategory, { min: number; max: number }> = {
  [SEO_SCORE_CATEGORY.POOR]: { min: 0, max: 19 },
  [SEO_SCORE_CATEGORY.FAIR]: { min: 20, max: 39 },
  [SEO_SCORE_CATEGORY.AVERAGE]: { min: 40, max: 59 },
  [SEO_SCORE_CATEGORY.GOOD]: { min: 60, max: 79 },
  [SEO_SCORE_CATEGORY.EXCELLENT]: { min: 80, max: 94 },
  [SEO_SCORE_CATEGORY.PERFECT]: { min: 95, max: 100 },
} as const;

/**
 * SEO স্কোর ক্যাটাগরি কনফিগারেশন
 */
export interface SEOScoreCategoryConfig {
  category: SEOScoreCategory;
  label: string;
  description: string;
  icon: string;
  color: string;
  minScore: number;
  maxScore: number;
  isPassing: boolean;
  order: number;
}

/**
 * SEO স্কোর ক্যাটাগরি মেটাডেটা
 */
export const SEO_SCORE_CATEGORY_METADATA: Record<SEOScoreCategory, SEOScoreCategoryConfig> = {
  [SEO_SCORE_CATEGORY.POOR]: {
    category: SEO_SCORE_CATEGORY.POOR,
    label: SEO_SCORE_CATEGORY_LABELS[SEO_SCORE_CATEGORY.POOR],
    description: SEO_SCORE_CATEGORY_DESCRIPTIONS[SEO_SCORE_CATEGORY.POOR],
    icon: SEO_SCORE_CATEGORY_ICONS[SEO_SCORE_CATEGORY.POOR],
    color: SEO_SCORE_CATEGORY_COLORS[SEO_SCORE_CATEGORY.POOR],
    minScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.POOR].min,
    maxScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.POOR].max,
    isPassing: false,
    order: 0,
  },
  [SEO_SCORE_CATEGORY.FAIR]: {
    category: SEO_SCORE_CATEGORY.FAIR,
    label: SEO_SCORE_CATEGORY_LABELS[SEO_SCORE_CATEGORY.FAIR],
    description: SEO_SCORE_CATEGORY_DESCRIPTIONS[SEO_SCORE_CATEGORY.FAIR],
    icon: SEO_SCORE_CATEGORY_ICONS[SEO_SCORE_CATEGORY.FAIR],
    color: SEO_SCORE_CATEGORY_COLORS[SEO_SCORE_CATEGORY.FAIR],
    minScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.FAIR].min,
    maxScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.FAIR].max,
    isPassing: false,
    order: 1,
  },
  [SEO_SCORE_CATEGORY.AVERAGE]: {
    category: SEO_SCORE_CATEGORY.AVERAGE,
    label: SEO_SCORE_CATEGORY_LABELS[SEO_SCORE_CATEGORY.AVERAGE],
    description: SEO_SCORE_CATEGORY_DESCRIPTIONS[SEO_SCORE_CATEGORY.AVERAGE],
    icon: SEO_SCORE_CATEGORY_ICONS[SEO_SCORE_CATEGORY.AVERAGE],
    color: SEO_SCORE_CATEGORY_COLORS[SEO_SCORE_CATEGORY.AVERAGE],
    minScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.AVERAGE].min,
    maxScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.AVERAGE].max,
    isPassing: false,
    order: 2,
  },
  [SEO_SCORE_CATEGORY.GOOD]: {
    category: SEO_SCORE_CATEGORY.GOOD,
    label: SEO_SCORE_CATEGORY_LABELS[SEO_SCORE_CATEGORY.GOOD],
    description: SEO_SCORE_CATEGORY_DESCRIPTIONS[SEO_SCORE_CATEGORY.GOOD],
    icon: SEO_SCORE_CATEGORY_ICONS[SEO_SCORE_CATEGORY.GOOD],
    color: SEO_SCORE_CATEGORY_COLORS[SEO_SCORE_CATEGORY.GOOD],
    minScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.GOOD].min,
    maxScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.GOOD].max,
    isPassing: true,
    order: 3,
  },
  [SEO_SCORE_CATEGORY.EXCELLENT]: {
    category: SEO_SCORE_CATEGORY.EXCELLENT,
    label: SEO_SCORE_CATEGORY_LABELS[SEO_SCORE_CATEGORY.EXCELLENT],
    description: SEO_SCORE_CATEGORY_DESCRIPTIONS[SEO_SCORE_CATEGORY.EXCELLENT],
    icon: SEO_SCORE_CATEGORY_ICONS[SEO_SCORE_CATEGORY.EXCELLENT],
    color: SEO_SCORE_CATEGORY_COLORS[SEO_SCORE_CATEGORY.EXCELLENT],
    minScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.EXCELLENT].min,
    maxScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.EXCELLENT].max,
    isPassing: true,
    order: 4,
  },
  [SEO_SCORE_CATEGORY.PERFECT]: {
    category: SEO_SCORE_CATEGORY.PERFECT,
    label: SEO_SCORE_CATEGORY_LABELS[SEO_SCORE_CATEGORY.PERFECT],
    description: SEO_SCORE_CATEGORY_DESCRIPTIONS[SEO_SCORE_CATEGORY.PERFECT],
    icon: SEO_SCORE_CATEGORY_ICONS[SEO_SCORE_CATEGORY.PERFECT],
    color: SEO_SCORE_CATEGORY_COLORS[SEO_SCORE_CATEGORY.PERFECT],
    minScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.PERFECT].min,
    maxScore: SEO_SCORE_CATEGORY_RANGES[SEO_SCORE_CATEGORY.PERFECT].max,
    isPassing: true,
    order: 5,
  },
} as const;

/**
 * স্কোর থেকে ক্যাটাগরি নির্ধারণ
 */
export const getScoreCategory = (score: number): SEOScoreCategory => {
  if (score >= SEO_SCORE_CATEGORY_THRESHOLDS[SEO_SCORE_CATEGORY.PERFECT]) {
    return SEO_SCORE_CATEGORY.PERFECT;
  }
  if (score >= SEO_SCORE_CATEGORY_THRESHOLDS[SEO_SCORE_CATEGORY.EXCELLENT]) {
    return SEO_SCORE_CATEGORY.EXCELLENT;
  }
  if (score >= SEO_SCORE_CATEGORY_THRESHOLDS[SEO_SCORE_CATEGORY.GOOD]) {
    return SEO_SCORE_CATEGORY.GOOD;
  }
  if (score >= SEO_SCORE_CATEGORY_THRESHOLDS[SEO_SCORE_CATEGORY.AVERAGE]) {
    return SEO_SCORE_CATEGORY.AVERAGE;
  }
  if (score >= SEO_SCORE_CATEGORY_THRESHOLDS[SEO_SCORE_CATEGORY.FAIR]) {
    return SEO_SCORE_CATEGORY.FAIR;
  }
  return SEO_SCORE_CATEGORY.POOR;
};

/**
 * স্কোর পাসিং কিনা চেক করুন
 */
export const isScorePassing = (score: number): boolean => {
  const category = getScoreCategory(score);
  return SEO_SCORE_CATEGORY_METADATA[category].isPassing;
};

/**
 * স্কোর ক্যাটাগরি গ্রুপ
 */
export const SEO_SCORE_CATEGORY_GROUPS = {
  FAILING: [SEO_SCORE_CATEGORY.POOR, SEO_SCORE_CATEGORY.FAIR, SEO_SCORE_CATEGORY.AVERAGE] as const,
  PASSING: [
    SEO_SCORE_CATEGORY.GOOD,
    SEO_SCORE_CATEGORY.EXCELLENT,
    SEO_SCORE_CATEGORY.PERFECT,
  ] as const,
} as const;

/**
 * স্কোর ক্যাটাগরি গ্রুপ লেবেল
 */
export const SEO_SCORE_CATEGORY_GROUP_LABELS = {
  FAILING: 'Needs Improvement',
  PASSING: 'Passing',
} as const;

/**
 * স্কোর ক্যাটাগরি গ্রুপ কালার
 */
export const SEO_SCORE_CATEGORY_GROUP_COLORS = {
  FAILING: '#dc2626',
  PASSING: '#22c55e',
} as const;
