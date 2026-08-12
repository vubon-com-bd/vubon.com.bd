/**
 * SEO রিপোর্ট টাইপ এনাম
 */
export const SEO_REPORT_TYPE = {
  AUDIT: 'audit',
  PERFORMANCE: 'performance',
  KEYWORD_RANKING: 'keyword-ranking',
  CONTENT: 'content',
  BACKLINK: 'backlink',
  TECHNICAL: 'technical',
  COMPETITOR: 'competitor',
  CUSTOM: 'custom',
  SCHEDULED: 'scheduled',
} as const;

/**
 * SEO_REPORT_TYPE থেকে টাইপ
 */
export type SEOReportType = (typeof SEO_REPORT_TYPE)[keyof typeof SEO_REPORT_TYPE];

/**
 * SEO রিপোর্ট টাইপ লেবেল
 */
export const SEO_REPORT_TYPE_LABELS: Record<SEOReportType, string> = {
  [SEO_REPORT_TYPE.AUDIT]: 'Audit Report',
  [SEO_REPORT_TYPE.PERFORMANCE]: 'Performance Report',
  [SEO_REPORT_TYPE.KEYWORD_RANKING]: 'Keyword Ranking Report',
  [SEO_REPORT_TYPE.CONTENT]: 'Content Report',
  [SEO_REPORT_TYPE.BACKLINK]: 'Backlink Report',
  [SEO_REPORT_TYPE.TECHNICAL]: 'Technical Report',
  [SEO_REPORT_TYPE.COMPETITOR]: 'Competitor Report',
  [SEO_REPORT_TYPE.CUSTOM]: 'Custom Report',
  [SEO_REPORT_TYPE.SCHEDULED]: 'Scheduled Report',
} as const;

/**
 * SEO রিপোর্ট টাইপ বিবরণ
 */
export const SEO_REPORT_TYPE_DESCRIPTIONS: Record<SEOReportType, string> = {
  [SEO_REPORT_TYPE.AUDIT]: 'Comprehensive SEO audit report with findings and recommendations',
  [SEO_REPORT_TYPE.PERFORMANCE]: 'Performance report tracking key SEO metrics and KPIs',
  [SEO_REPORT_TYPE.KEYWORD_RANKING]: 'Detailed keyword ranking report with position tracking',
  [SEO_REPORT_TYPE.CONTENT]: 'Content performance analysis and optimization report',
  [SEO_REPORT_TYPE.BACKLINK]: 'Backlink profile analysis and quality assessment report',
  [SEO_REPORT_TYPE.TECHNICAL]: 'Technical SEO audit and infrastructure analysis report',
  [SEO_REPORT_TYPE.COMPETITOR]: 'Competitor analysis and market positioning report',
  [SEO_REPORT_TYPE.CUSTOM]: 'Customized report with selected sections and metrics',
  [SEO_REPORT_TYPE.SCHEDULED]: 'Automated scheduled report with regular updates',
} as const;

/**
 * SEO রিপোর্ট টাইপ আইকন
 */
export const SEO_REPORT_TYPE_ICONS: Record<SEOReportType, string> = {
  [SEO_REPORT_TYPE.AUDIT]: '🔍',
  [SEO_REPORT_TYPE.PERFORMANCE]: '📊',
  [SEO_REPORT_TYPE.KEYWORD_RANKING]: '🎯',
  [SEO_REPORT_TYPE.CONTENT]: '📝',
  [SEO_REPORT_TYPE.BACKLINK]: '🔗',
  [SEO_REPORT_TYPE.TECHNICAL]: '⚙️',
  [SEO_REPORT_TYPE.COMPETITOR]: '🏁',
  [SEO_REPORT_TYPE.CUSTOM]: '🎨',
  [SEO_REPORT_TYPE.SCHEDULED]: '📅',
} as const;

/**
 * SEO রিপোর্ট টাইপ কালার (হেক্স কোড)
 */
export const SEO_REPORT_TYPE_COLORS: Record<SEOReportType, string> = {
  [SEO_REPORT_TYPE.AUDIT]: '#8b5cf6', // Violet-500
  [SEO_REPORT_TYPE.PERFORMANCE]: '#3b82f6', // Blue-500
  [SEO_REPORT_TYPE.KEYWORD_RANKING]: '#f59e0b', // Amber-500
  [SEO_REPORT_TYPE.CONTENT]: '#22c55e', // Green-500
  [SEO_REPORT_TYPE.BACKLINK]: '#06b6d4', // Cyan-500
  [SEO_REPORT_TYPE.TECHNICAL]: '#dc2626', // Red-600
  [SEO_REPORT_TYPE.COMPETITOR]: '#f97316', // Orange-500
  [SEO_REPORT_TYPE.CUSTOM]: '#ec4899', // Pink-500
  [SEO_REPORT_TYPE.SCHEDULED]: '#6366f1', // Indigo-500
} as const;

/**
 * SEO রিপোর্ট টাইপ প্রায়োরিটি (১ = সর্বোচ্চ)
 */
export const SEO_REPORT_TYPE_PRIORITY: Record<SEOReportType, number> = {
  [SEO_REPORT_TYPE.AUDIT]: 1,
  [SEO_REPORT_TYPE.PERFORMANCE]: 2,
  [SEO_REPORT_TYPE.KEYWORD_RANKING]: 3,
  [SEO_REPORT_TYPE.CONTENT]: 4,
  [SEO_REPORT_TYPE.BACKLINK]: 5,
  [SEO_REPORT_TYPE.TECHNICAL]: 6,
  [SEO_REPORT_TYPE.COMPETITOR]: 7,
  [SEO_REPORT_TYPE.CUSTOM]: 8,
  [SEO_REPORT_TYPE.SCHEDULED]: 9,
} as const;

/**
 * SEO রিপোর্ট টাইপ ক্যাটাগরি
 */
export const SEO_REPORT_TYPE_CATEGORY = {
  ANALYTICS: 'analytics',
  AUDIT: 'audit',
  STRATEGY: 'strategy',
  CUSTOM: 'custom',
} as const;

/**
 * SEO_REPORT_TYPE_CATEGORY থেকে টাইপ
 */
export type SEOReportTypeCategory =
  (typeof SEO_REPORT_TYPE_CATEGORY)[keyof typeof SEO_REPORT_TYPE_CATEGORY];

/**
 * SEO রিপোর্ট টাইপ ক্যাটাগরি লেবেল
 */
export const SEO_REPORT_TYPE_CATEGORY_LABELS: Record<SEOReportTypeCategory, string> = {
  [SEO_REPORT_TYPE_CATEGORY.ANALYTICS]: 'Analytics',
  [SEO_REPORT_TYPE_CATEGORY.AUDIT]: 'Audit',
  [SEO_REPORT_TYPE_CATEGORY.STRATEGY]: 'Strategy',
  [SEO_REPORT_TYPE_CATEGORY.CUSTOM]: 'Custom',
} as const;

/**
 * SEO রিপোর্ট টাইপ ক্যাটাগরি ম্যাপিং
 */
export const SEO_REPORT_TYPE_CATEGORY_MAP: Record<SEOReportType, SEOReportTypeCategory> = {
  [SEO_REPORT_TYPE.PERFORMANCE]: SEO_REPORT_TYPE_CATEGORY.ANALYTICS,
  [SEO_REPORT_TYPE.KEYWORD_RANKING]: SEO_REPORT_TYPE_CATEGORY.ANALYTICS,
  [SEO_REPORT_TYPE.CONTENT]: SEO_REPORT_TYPE_CATEGORY.ANALYTICS,
  [SEO_REPORT_TYPE.BACKLINK]: SEO_REPORT_TYPE_CATEGORY.ANALYTICS,
  [SEO_REPORT_TYPE.AUDIT]: SEO_REPORT_TYPE_CATEGORY.AUDIT,
  [SEO_REPORT_TYPE.TECHNICAL]: SEO_REPORT_TYPE_CATEGORY.AUDIT,
  [SEO_REPORT_TYPE.COMPETITOR]: SEO_REPORT_TYPE_CATEGORY.STRATEGY,
  [SEO_REPORT_TYPE.SCHEDULED]: SEO_REPORT_TYPE_CATEGORY.STRATEGY,
  [SEO_REPORT_TYPE.CUSTOM]: SEO_REPORT_TYPE_CATEGORY.CUSTOM,
} as const;

/**
 * SEO রিপোর্ট টাইপ কনফিগারেশন
 */
export interface SEOReportTypeConfig {
  type: SEOReportType;
  label: string;
  description: string;
  icon: string;
  color: string;
  priority: number;
  category: SEOReportTypeCategory;
  defaultSections: string[];
  recommendedFrequency: string;
  requiresData: boolean;
  requiresHistoricalData: boolean;
  order: number;
}

/**
 * SEO রিপোর্ট টাইপ মেটাডেটা
 */
export const SEO_REPORT_TYPE_METADATA: Record<SEOReportType, SEOReportTypeConfig> = {
  [SEO_REPORT_TYPE.AUDIT]: {
    type: SEO_REPORT_TYPE.AUDIT,
    label: SEO_REPORT_TYPE_LABELS[SEO_REPORT_TYPE.AUDIT],
    description: SEO_REPORT_TYPE_DESCRIPTIONS[SEO_REPORT_TYPE.AUDIT],
    icon: SEO_REPORT_TYPE_ICONS[SEO_REPORT_TYPE.AUDIT],
    color: SEO_REPORT_TYPE_COLORS[SEO_REPORT_TYPE.AUDIT],
    priority: SEO_REPORT_TYPE_PRIORITY[SEO_REPORT_TYPE.AUDIT],
    category: SEO_REPORT_TYPE_CATEGORY_MAP[SEO_REPORT_TYPE.AUDIT],
    defaultSections: [
      'executive-summary',
      'overview',
      'technical-seo',
      'content-performance',
      'recommendations',
    ],
    recommendedFrequency: 'quarterly',
    requiresData: true,
    requiresHistoricalData: true,
    order: 0,
  },
  [SEO_REPORT_TYPE.PERFORMANCE]: {
    type: SEO_REPORT_TYPE.PERFORMANCE,
    label: SEO_REPORT_TYPE_LABELS[SEO_REPORT_TYPE.PERFORMANCE],
    description: SEO_REPORT_TYPE_DESCRIPTIONS[SEO_REPORT_TYPE.PERFORMANCE],
    icon: SEO_REPORT_TYPE_ICONS[SEO_REPORT_TYPE.PERFORMANCE],
    color: SEO_REPORT_TYPE_COLORS[SEO_REPORT_TYPE.PERFORMANCE],
    priority: SEO_REPORT_TYPE_PRIORITY[SEO_REPORT_TYPE.PERFORMANCE],
    category: SEO_REPORT_TYPE_CATEGORY_MAP[SEO_REPORT_TYPE.PERFORMANCE],
    defaultSections: [
      'executive-summary',
      'overview',
      'traffic-analysis',
      'keyword-performance',
      'ranking-analysis',
    ],
    recommendedFrequency: 'monthly',
    requiresData: true,
    requiresHistoricalData: true,
    order: 1,
  },
  [SEO_REPORT_TYPE.KEYWORD_RANKING]: {
    type: SEO_REPORT_TYPE.KEYWORD_RANKING,
    label: SEO_REPORT_TYPE_LABELS[SEO_REPORT_TYPE.KEYWORD_RANKING],
    description: SEO_REPORT_TYPE_DESCRIPTIONS[SEO_REPORT_TYPE.KEYWORD_RANKING],
    icon: SEO_REPORT_TYPE_ICONS[SEO_REPORT_TYPE.KEYWORD_RANKING],
    color: SEO_REPORT_TYPE_COLORS[SEO_REPORT_TYPE.KEYWORD_RANKING],
    priority: SEO_REPORT_TYPE_PRIORITY[SEO_REPORT_TYPE.KEYWORD_RANKING],
    category: SEO_REPORT_TYPE_CATEGORY_MAP[SEO_REPORT_TYPE.KEYWORD_RANKING],
    defaultSections: [
      'executive-summary',
      'keyword-performance',
      'ranking-analysis',
      'recommendations',
    ],
    recommendedFrequency: 'weekly',
    requiresData: true,
    requiresHistoricalData: true,
    order: 2,
  },
  [SEO_REPORT_TYPE.CONTENT]: {
    type: SEO_REPORT_TYPE.CONTENT,
    label: SEO_REPORT_TYPE_LABELS[SEO_REPORT_TYPE.CONTENT],
    description: SEO_REPORT_TYPE_DESCRIPTIONS[SEO_REPORT_TYPE.CONTENT],
    icon: SEO_REPORT_TYPE_ICONS[SEO_REPORT_TYPE.CONTENT],
    color: SEO_REPORT_TYPE_COLORS[SEO_REPORT_TYPE.CONTENT],
    priority: SEO_REPORT_TYPE_PRIORITY[SEO_REPORT_TYPE.CONTENT],
    category: SEO_REPORT_TYPE_CATEGORY_MAP[SEO_REPORT_TYPE.CONTENT],
    defaultSections: [
      'executive-summary',
      'content-performance',
      'keyword-performance',
      'recommendations',
    ],
    recommendedFrequency: 'monthly',
    requiresData: true,
    requiresHistoricalData: true,
    order: 3,
  },
  [SEO_REPORT_TYPE.BACKLINK]: {
    type: SEO_REPORT_TYPE.BACKLINK,
    label: SEO_REPORT_TYPE_LABELS[SEO_REPORT_TYPE.BACKLINK],
    description: SEO_REPORT_TYPE_DESCRIPTIONS[SEO_REPORT_TYPE.BACKLINK],
    icon: SEO_REPORT_TYPE_ICONS[SEO_REPORT_TYPE.BACKLINK],
    color: SEO_REPORT_TYPE_COLORS[SEO_REPORT_TYPE.BACKLINK],
    priority: SEO_REPORT_TYPE_PRIORITY[SEO_REPORT_TYPE.BACKLINK],
    category: SEO_REPORT_TYPE_CATEGORY_MAP[SEO_REPORT_TYPE.BACKLINK],
    defaultSections: [
      'executive-summary',
      'backlink-profile',
      'competitor-analysis',
      'recommendations',
    ],
    recommendedFrequency: 'monthly',
    requiresData: true,
    requiresHistoricalData: true,
    order: 4,
  },
  [SEO_REPORT_TYPE.TECHNICAL]: {
    type: SEO_REPORT_TYPE.TECHNICAL,
    label: SEO_REPORT_TYPE_LABELS[SEO_REPORT_TYPE.TECHNICAL],
    description: SEO_REPORT_TYPE_DESCRIPTIONS[SEO_REPORT_TYPE.TECHNICAL],
    icon: SEO_REPORT_TYPE_ICONS[SEO_REPORT_TYPE.TECHNICAL],
    color: SEO_REPORT_TYPE_COLORS[SEO_REPORT_TYPE.TECHNICAL],
    priority: SEO_REPORT_TYPE_PRIORITY[SEO_REPORT_TYPE.TECHNICAL],
    category: SEO_REPORT_TYPE_CATEGORY_MAP[SEO_REPORT_TYPE.TECHNICAL],
    defaultSections: ['executive-summary', 'technical-seo', 'recommendations'],
    recommendedFrequency: 'quarterly',
    requiresData: true,
    requiresHistoricalData: true,
    order: 5,
  },
  [SEO_REPORT_TYPE.COMPETITOR]: {
    type: SEO_REPORT_TYPE.COMPETITOR,
    label: SEO_REPORT_TYPE_LABELS[SEO_REPORT_TYPE.COMPETITOR],
    description: SEO_REPORT_TYPE_DESCRIPTIONS[SEO_REPORT_TYPE.COMPETITOR],
    icon: SEO_REPORT_TYPE_ICONS[SEO_REPORT_TYPE.COMPETITOR],
    color: SEO_REPORT_TYPE_COLORS[SEO_REPORT_TYPE.COMPETITOR],
    priority: SEO_REPORT_TYPE_PRIORITY[SEO_REPORT_TYPE.COMPETITOR],
    category: SEO_REPORT_TYPE_CATEGORY_MAP[SEO_REPORT_TYPE.COMPETITOR],
    defaultSections: [
      'executive-summary',
      'competitor-analysis',
      'ranking-analysis',
      'recommendations',
    ],
    recommendedFrequency: 'monthly',
    requiresData: true,
    requiresHistoricalData: true,
    order: 6,
  },
  [SEO_REPORT_TYPE.CUSTOM]: {
    type: SEO_REPORT_TYPE.CUSTOM,
    label: SEO_REPORT_TYPE_LABELS[SEO_REPORT_TYPE.CUSTOM],
    description: SEO_REPORT_TYPE_DESCRIPTIONS[SEO_REPORT_TYPE.CUSTOM],
    icon: SEO_REPORT_TYPE_ICONS[SEO_REPORT_TYPE.CUSTOM],
    color: SEO_REPORT_TYPE_COLORS[SEO_REPORT_TYPE.CUSTOM],
    priority: SEO_REPORT_TYPE_PRIORITY[SEO_REPORT_TYPE.CUSTOM],
    category: SEO_REPORT_TYPE_CATEGORY_MAP[SEO_REPORT_TYPE.CUSTOM],
    defaultSections: ['executive-summary', 'overview', 'recommendations'],
    recommendedFrequency: 'on-demand',
    requiresData: true,
    requiresHistoricalData: false,
    order: 7,
  },
  [SEO_REPORT_TYPE.SCHEDULED]: {
    type: SEO_REPORT_TYPE.SCHEDULED,
    label: SEO_REPORT_TYPE_LABELS[SEO_REPORT_TYPE.SCHEDULED],
    description: SEO_REPORT_TYPE_DESCRIPTIONS[SEO_REPORT_TYPE.SCHEDULED],
    icon: SEO_REPORT_TYPE_ICONS[SEO_REPORT_TYPE.SCHEDULED],
    color: SEO_REPORT_TYPE_COLORS[SEO_REPORT_TYPE.SCHEDULED],
    priority: SEO_REPORT_TYPE_PRIORITY[SEO_REPORT_TYPE.SCHEDULED],
    category: SEO_REPORT_TYPE_CATEGORY_MAP[SEO_REPORT_TYPE.SCHEDULED],
    defaultSections: [
      'executive-summary',
      'overview',
      'traffic-analysis',
      'keyword-performance',
      'ranking-analysis',
      'recommendations',
    ],
    recommendedFrequency: 'weekly',
    requiresData: true,
    requiresHistoricalData: true,
    order: 8,
  },
} as const;

/**
 * SEO রিপোর্ট টাইপ গ্রুপ
 */
export const SEO_REPORT_TYPE_GROUPS = {
  ANALYTICS: [
    SEO_REPORT_TYPE.PERFORMANCE,
    SEO_REPORT_TYPE.KEYWORD_RANKING,
    SEO_REPORT_TYPE.CONTENT,
    SEO_REPORT_TYPE.BACKLINK,
  ] as const,
  AUDIT: [SEO_REPORT_TYPE.AUDIT, SEO_REPORT_TYPE.TECHNICAL] as const,
  STRATEGY: [SEO_REPORT_TYPE.COMPETITOR, SEO_REPORT_TYPE.SCHEDULED] as const,
  CUSTOM: [SEO_REPORT_TYPE.CUSTOM] as const,
} as const;

/**
 * SEO রিপোর্ট টাইপ গ্রুপ লেবেল
 */
export const SEO_REPORT_TYPE_GROUP_LABELS = {
  ANALYTICS: 'Analytics Reports',
  AUDIT: 'Audit Reports',
  STRATEGY: 'Strategy Reports',
  CUSTOM: 'Custom Reports',
} as const;

/**
 * SEO রিপোর্ট টাইপ গ্রুপ কালার
 */
export const SEO_REPORT_TYPE_GROUP_COLORS = {
  ANALYTICS: '#3b82f6',
  AUDIT: '#8b5cf6',
  STRATEGY: '#f59e0b',
  CUSTOM: '#ec4899',
} as const;
