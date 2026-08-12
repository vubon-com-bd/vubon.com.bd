/**
 * SEO স্কোর টাইপ এনাম
 */
export const SEO_SCORE_TYPE = {
  OVERALL: 'overall',
  ON_PAGE: 'on-page',
  TECHNICAL: 'technical',
  CONTENT: 'content',
  LINK: 'link',
  MOBILE: 'mobile',
  SPEED: 'speed',
  USER_EXPERIENCE: 'user-experience',
  ACCESSIBILITY: 'accessibility',
} as const;

/**
 * SEO_SCORE_TYPE থেকে টাইপ
 */
export type SEOScoreType = (typeof SEO_SCORE_TYPE)[keyof typeof SEO_SCORE_TYPE];

/**
 * SEO স্কোর টাইপ লেবেল
 */
export const SEO_SCORE_TYPE_LABELS: Record<SEOScoreType, string> = {
  [SEO_SCORE_TYPE.OVERALL]: 'Overall Score',
  [SEO_SCORE_TYPE.ON_PAGE]: 'On-Page SEO Score',
  [SEO_SCORE_TYPE.TECHNICAL]: 'Technical SEO Score',
  [SEO_SCORE_TYPE.CONTENT]: 'Content Score',
  [SEO_SCORE_TYPE.LINK]: 'Link Profile Score',
  [SEO_SCORE_TYPE.MOBILE]: 'Mobile Optimization Score',
  [SEO_SCORE_TYPE.SPEED]: 'Speed Performance Score',
  [SEO_SCORE_TYPE.USER_EXPERIENCE]: 'User Experience Score',
  [SEO_SCORE_TYPE.ACCESSIBILITY]: 'Accessibility Score',
} as const;

/**
 * SEO স্কোর টাইপ বিবরণ
 */
export const SEO_SCORE_TYPE_DESCRIPTIONS: Record<SEOScoreType, string> = {
  [SEO_SCORE_TYPE.OVERALL]: 'Overall SEO performance score combining all factors',
  [SEO_SCORE_TYPE.ON_PAGE]: 'Score for on-page SEO elements and optimization',
  [SEO_SCORE_TYPE.TECHNICAL]: 'Score for technical SEO aspects and infrastructure',
  [SEO_SCORE_TYPE.CONTENT]: 'Score for content quality, relevance, and optimization',
  [SEO_SCORE_TYPE.LINK]: 'Score for internal and external link profile quality',
  [SEO_SCORE_TYPE.MOBILE]: 'Score for mobile usability and responsiveness',
  [SEO_SCORE_TYPE.SPEED]: 'Score for page loading speed and performance',
  [SEO_SCORE_TYPE.USER_EXPERIENCE]: 'Score for overall user experience and engagement',
  [SEO_SCORE_TYPE.ACCESSIBILITY]: 'Score for accessibility and inclusivity standards',
} as const;

/**
 * SEO স্কোর টাইপ আইকন
 */
export const SEO_SCORE_TYPE_ICONS: Record<SEOScoreType, string> = {
  [SEO_SCORE_TYPE.OVERALL]: '📊',
  [SEO_SCORE_TYPE.ON_PAGE]: '📄',
  [SEO_SCORE_TYPE.TECHNICAL]: '⚙️',
  [SEO_SCORE_TYPE.CONTENT]: '📝',
  [SEO_SCORE_TYPE.LINK]: '🔗',
  [SEO_SCORE_TYPE.MOBILE]: '📱',
  [SEO_SCORE_TYPE.SPEED]: '⚡',
  [SEO_SCORE_TYPE.USER_EXPERIENCE]: '🎯',
  [SEO_SCORE_TYPE.ACCESSIBILITY]: '♿',
} as const;

/**
 * SEO স্কোর টাইপ কালার (হেক্স কোড)
 */
export const SEO_SCORE_TYPE_COLORS: Record<SEOScoreType, string> = {
  [SEO_SCORE_TYPE.OVERALL]: '#8b5cf6', // Violet-500
  [SEO_SCORE_TYPE.ON_PAGE]: '#3b82f6', // Blue-500
  [SEO_SCORE_TYPE.TECHNICAL]: '#22c55e', // Green-500
  [SEO_SCORE_TYPE.CONTENT]: '#f59e0b', // Amber-500
  [SEO_SCORE_TYPE.LINK]: '#06b6d4', // Cyan-500
  [SEO_SCORE_TYPE.MOBILE]: '#ec4899', // Pink-500
  [SEO_SCORE_TYPE.SPEED]: '#dc2626', // Red-600
  [SEO_SCORE_TYPE.USER_EXPERIENCE]: '#f97316', // Orange-500
  [SEO_SCORE_TYPE.ACCESSIBILITY]: '#6366f1', // Indigo-500
} as const;

/**
 * SEO স্কোর টাইপ ডিফল্ট ওয়েট (শতাংশে)
 */
export const SEO_SCORE_TYPE_WEIGHT: Record<SEOScoreType, number> = {
  [SEO_SCORE_TYPE.OVERALL]: 100,
  [SEO_SCORE_TYPE.ON_PAGE]: 20,
  [SEO_SCORE_TYPE.TECHNICAL]: 25,
  [SEO_SCORE_TYPE.CONTENT]: 20,
  [SEO_SCORE_TYPE.LINK]: 15,
  [SEO_SCORE_TYPE.MOBILE]: 10,
  [SEO_SCORE_TYPE.SPEED]: 5,
  [SEO_SCORE_TYPE.USER_EXPERIENCE]: 3,
  [SEO_SCORE_TYPE.ACCESSIBILITY]: 2,
} as const;

/**
 * SEO স্কোর টাইপ ক্যাটাগরি
 */
export const SEO_SCORE_TYPE_CATEGORY = {
  CORE: 'core',
  PERFORMANCE: 'performance',
  QUALITY: 'quality',
  SPECIAL: 'special',
} as const;

/**
 * SEO_SCORE_TYPE_CATEGORY থেকে টাইপ
 */
export type SEOScoreTypeCategory =
  (typeof SEO_SCORE_TYPE_CATEGORY)[keyof typeof SEO_SCORE_TYPE_CATEGORY];

/**
 * SEO স্কোর টাইপ ক্যাটাগরি লেবেল
 */
export const SEO_SCORE_TYPE_CATEGORY_LABELS: Record<SEOScoreTypeCategory, string> = {
  [SEO_SCORE_TYPE_CATEGORY.CORE]: 'Core SEO',
  [SEO_SCORE_TYPE_CATEGORY.PERFORMANCE]: 'Performance',
  [SEO_SCORE_TYPE_CATEGORY.QUALITY]: 'Quality',
  [SEO_SCORE_TYPE_CATEGORY.SPECIAL]: 'Specialized',
} as const;

/**
 * SEO স্কোর টাইপ ক্যাটাগরি ম্যাপিং
 */
export const SEO_SCORE_TYPE_CATEGORY_MAP: Record<SEOScoreType, SEOScoreTypeCategory> = {
  [SEO_SCORE_TYPE.OVERALL]: SEO_SCORE_TYPE_CATEGORY.CORE,
  [SEO_SCORE_TYPE.ON_PAGE]: SEO_SCORE_TYPE_CATEGORY.CORE,
  [SEO_SCORE_TYPE.TECHNICAL]: SEO_SCORE_TYPE_CATEGORY.CORE,
  [SEO_SCORE_TYPE.CONTENT]: SEO_SCORE_TYPE_CATEGORY.QUALITY,
  [SEO_SCORE_TYPE.LINK]: SEO_SCORE_TYPE_CATEGORY.QUALITY,
  [SEO_SCORE_TYPE.MOBILE]: SEO_SCORE_TYPE_CATEGORY.PERFORMANCE,
  [SEO_SCORE_TYPE.SPEED]: SEO_SCORE_TYPE_CATEGORY.PERFORMANCE,
  [SEO_SCORE_TYPE.USER_EXPERIENCE]: SEO_SCORE_TYPE_CATEGORY.SPECIAL,
  [SEO_SCORE_TYPE.ACCESSIBILITY]: SEO_SCORE_TYPE_CATEGORY.SPECIAL,
} as const;

/**
 * SEO স্কোর টাইপ কনফিগারেশন
 */
export interface SEOScoreTypeConfig {
  type: SEOScoreType;
  label: string;
  description: string;
  icon: string;
  color: string;
  weight: number;
  category: SEOScoreTypeCategory;
  isOverall: boolean;
  order: number;
}

/**
 * SEO স্কোর টাইপ মেটাডেটা
 */
export const SEO_SCORE_TYPE_METADATA: Record<SEOScoreType, SEOScoreTypeConfig> = {
  [SEO_SCORE_TYPE.OVERALL]: {
    type: SEO_SCORE_TYPE.OVERALL,
    label: SEO_SCORE_TYPE_LABELS[SEO_SCORE_TYPE.OVERALL],
    description: SEO_SCORE_TYPE_DESCRIPTIONS[SEO_SCORE_TYPE.OVERALL],
    icon: SEO_SCORE_TYPE_ICONS[SEO_SCORE_TYPE.OVERALL],
    color: SEO_SCORE_TYPE_COLORS[SEO_SCORE_TYPE.OVERALL],
    weight: SEO_SCORE_TYPE_WEIGHT[SEO_SCORE_TYPE.OVERALL],
    category: SEO_SCORE_TYPE_CATEGORY_MAP[SEO_SCORE_TYPE.OVERALL],
    isOverall: true,
    order: 0,
  },
  [SEO_SCORE_TYPE.ON_PAGE]: {
    type: SEO_SCORE_TYPE.ON_PAGE,
    label: SEO_SCORE_TYPE_LABELS[SEO_SCORE_TYPE.ON_PAGE],
    description: SEO_SCORE_TYPE_DESCRIPTIONS[SEO_SCORE_TYPE.ON_PAGE],
    icon: SEO_SCORE_TYPE_ICONS[SEO_SCORE_TYPE.ON_PAGE],
    color: SEO_SCORE_TYPE_COLORS[SEO_SCORE_TYPE.ON_PAGE],
    weight: SEO_SCORE_TYPE_WEIGHT[SEO_SCORE_TYPE.ON_PAGE],
    category: SEO_SCORE_TYPE_CATEGORY_MAP[SEO_SCORE_TYPE.ON_PAGE],
    isOverall: false,
    order: 1,
  },
  [SEO_SCORE_TYPE.TECHNICAL]: {
    type: SEO_SCORE_TYPE.TECHNICAL,
    label: SEO_SCORE_TYPE_LABELS[SEO_SCORE_TYPE.TECHNICAL],
    description: SEO_SCORE_TYPE_DESCRIPTIONS[SEO_SCORE_TYPE.TECHNICAL],
    icon: SEO_SCORE_TYPE_ICONS[SEO_SCORE_TYPE.TECHNICAL],
    color: SEO_SCORE_TYPE_COLORS[SEO_SCORE_TYPE.TECHNICAL],
    weight: SEO_SCORE_TYPE_WEIGHT[SEO_SCORE_TYPE.TECHNICAL],
    category: SEO_SCORE_TYPE_CATEGORY_MAP[SEO_SCORE_TYPE.TECHNICAL],
    isOverall: false,
    order: 2,
  },
  [SEO_SCORE_TYPE.CONTENT]: {
    type: SEO_SCORE_TYPE.CONTENT,
    label: SEO_SCORE_TYPE_LABELS[SEO_SCORE_TYPE.CONTENT],
    description: SEO_SCORE_TYPE_DESCRIPTIONS[SEO_SCORE_TYPE.CONTENT],
    icon: SEO_SCORE_TYPE_ICONS[SEO_SCORE_TYPE.CONTENT],
    color: SEO_SCORE_TYPE_COLORS[SEO_SCORE_TYPE.CONTENT],
    weight: SEO_SCORE_TYPE_WEIGHT[SEO_SCORE_TYPE.CONTENT],
    category: SEO_SCORE_TYPE_CATEGORY_MAP[SEO_SCORE_TYPE.CONTENT],
    isOverall: false,
    order: 3,
  },
  [SEO_SCORE_TYPE.LINK]: {
    type: SEO_SCORE_TYPE.LINK,
    label: SEO_SCORE_TYPE_LABELS[SEO_SCORE_TYPE.LINK],
    description: SEO_SCORE_TYPE_DESCRIPTIONS[SEO_SCORE_TYPE.LINK],
    icon: SEO_SCORE_TYPE_ICONS[SEO_SCORE_TYPE.LINK],
    color: SEO_SCORE_TYPE_COLORS[SEO_SCORE_TYPE.LINK],
    weight: SEO_SCORE_TYPE_WEIGHT[SEO_SCORE_TYPE.LINK],
    category: SEO_SCORE_TYPE_CATEGORY_MAP[SEO_SCORE_TYPE.LINK],
    isOverall: false,
    order: 4,
  },
  [SEO_SCORE_TYPE.MOBILE]: {
    type: SEO_SCORE_TYPE.MOBILE,
    label: SEO_SCORE_TYPE_LABELS[SEO_SCORE_TYPE.MOBILE],
    description: SEO_SCORE_TYPE_DESCRIPTIONS[SEO_SCORE_TYPE.MOBILE],
    icon: SEO_SCORE_TYPE_ICONS[SEO_SCORE_TYPE.MOBILE],
    color: SEO_SCORE_TYPE_COLORS[SEO_SCORE_TYPE.MOBILE],
    weight: SEO_SCORE_TYPE_WEIGHT[SEO_SCORE_TYPE.MOBILE],
    category: SEO_SCORE_TYPE_CATEGORY_MAP[SEO_SCORE_TYPE.MOBILE],
    isOverall: false,
    order: 5,
  },
  [SEO_SCORE_TYPE.SPEED]: {
    type: SEO_SCORE_TYPE.SPEED,
    label: SEO_SCORE_TYPE_LABELS[SEO_SCORE_TYPE.SPEED],
    description: SEO_SCORE_TYPE_DESCRIPTIONS[SEO_SCORE_TYPE.SPEED],
    icon: SEO_SCORE_TYPE_ICONS[SEO_SCORE_TYPE.SPEED],
    color: SEO_SCORE_TYPE_COLORS[SEO_SCORE_TYPE.SPEED],
    weight: SEO_SCORE_TYPE_WEIGHT[SEO_SCORE_TYPE.SPEED],
    category: SEO_SCORE_TYPE_CATEGORY_MAP[SEO_SCORE_TYPE.SPEED],
    isOverall: false,
    order: 6,
  },
  [SEO_SCORE_TYPE.USER_EXPERIENCE]: {
    type: SEO_SCORE_TYPE.USER_EXPERIENCE,
    label: SEO_SCORE_TYPE_LABELS[SEO_SCORE_TYPE.USER_EXPERIENCE],
    description: SEO_SCORE_TYPE_DESCRIPTIONS[SEO_SCORE_TYPE.USER_EXPERIENCE],
    icon: SEO_SCORE_TYPE_ICONS[SEO_SCORE_TYPE.USER_EXPERIENCE],
    color: SEO_SCORE_TYPE_COLORS[SEO_SCORE_TYPE.USER_EXPERIENCE],
    weight: SEO_SCORE_TYPE_WEIGHT[SEO_SCORE_TYPE.USER_EXPERIENCE],
    category: SEO_SCORE_TYPE_CATEGORY_MAP[SEO_SCORE_TYPE.USER_EXPERIENCE],
    isOverall: false,
    order: 7,
  },
  [SEO_SCORE_TYPE.ACCESSIBILITY]: {
    type: SEO_SCORE_TYPE.ACCESSIBILITY,
    label: SEO_SCORE_TYPE_LABELS[SEO_SCORE_TYPE.ACCESSIBILITY],
    description: SEO_SCORE_TYPE_DESCRIPTIONS[SEO_SCORE_TYPE.ACCESSIBILITY],
    icon: SEO_SCORE_TYPE_ICONS[SEO_SCORE_TYPE.ACCESSIBILITY],
    color: SEO_SCORE_TYPE_COLORS[SEO_SCORE_TYPE.ACCESSIBILITY],
    weight: SEO_SCORE_TYPE_WEIGHT[SEO_SCORE_TYPE.ACCESSIBILITY],
    category: SEO_SCORE_TYPE_CATEGORY_MAP[SEO_SCORE_TYPE.ACCESSIBILITY],
    isOverall: false,
    order: 8,
  },
} as const;

/**
 * SEO স্কোর টাইপ গ্রুপ
 */
export const SEO_SCORE_TYPE_GROUPS = {
  CORE: [SEO_SCORE_TYPE.OVERALL, SEO_SCORE_TYPE.ON_PAGE, SEO_SCORE_TYPE.TECHNICAL] as const,
  QUALITY: [SEO_SCORE_TYPE.CONTENT, SEO_SCORE_TYPE.LINK] as const,
  PERFORMANCE: [SEO_SCORE_TYPE.MOBILE, SEO_SCORE_TYPE.SPEED] as const,
  SPECIAL: [SEO_SCORE_TYPE.USER_EXPERIENCE, SEO_SCORE_TYPE.ACCESSIBILITY] as const,
} as const;

/**
 * SEO স্কোর টাইপ গ্রুপ লেবেল
 */
export const SEO_SCORE_TYPE_GROUP_LABELS = {
  CORE: 'Core SEO Metrics',
  QUALITY: 'Quality Metrics',
  PERFORMANCE: 'Performance Metrics',
  SPECIAL: 'Specialized Metrics',
} as const;

/**
 * SEO স্কোর টাইপ গ্রুপ কালার
 */
export const SEO_SCORE_TYPE_GROUP_COLORS = {
  CORE: '#8b5cf6',
  QUALITY: '#f59e0b',
  PERFORMANCE: '#dc2626',
  SPECIAL: '#ec4899',
} as const;
