/**
 * SEO স্ট্র্যাটেজি টাইপ এনাম
 */
export const SEO_STRATEGY_TYPE = {
  KEYWORD_FOCUSED: 'keyword-focused',
  CONTENT_FOCUSED: 'content-focused',
  LINK_BUILDING: 'link-building',
  TECHNICAL: 'technical',
  LOCAL_SEO: 'local-seo',
  ECOMMERCE: 'ecommerce',
  INTEGRATED: 'integrated',
  AGGRESSIVE: 'aggressive',
  CONSERVATIVE: 'conservative',
} as const;

/**
 * SEO_STRATEGY_TYPE থেকে টাইপ
 */
export type SEOStrategyType = (typeof SEO_STRATEGY_TYPE)[keyof typeof SEO_STRATEGY_TYPE];

/**
 * SEO স্ট্র্যাটেজি টাইপ লেবেল
 */
export const SEO_STRATEGY_TYPE_LABELS: Record<SEOStrategyType, string> = {
  [SEO_STRATEGY_TYPE.KEYWORD_FOCUSED]: 'Keyword Focused',
  [SEO_STRATEGY_TYPE.CONTENT_FOCUSED]: 'Content Focused',
  [SEO_STRATEGY_TYPE.LINK_BUILDING]: 'Link Building',
  [SEO_STRATEGY_TYPE.TECHNICAL]: 'Technical SEO',
  [SEO_STRATEGY_TYPE.LOCAL_SEO]: 'Local SEO',
  [SEO_STRATEGY_TYPE.ECOMMERCE]: 'E-commerce SEO',
  [SEO_STRATEGY_TYPE.INTEGRATED]: 'Integrated SEO',
  [SEO_STRATEGY_TYPE.AGGRESSIVE]: 'Aggressive SEO',
  [SEO_STRATEGY_TYPE.CONSERVATIVE]: 'Conservative SEO',
} as const;

/**
 * SEO স্ট্র্যাটেজি টাইপ বিবরণ
 */
export const SEO_STRATEGY_TYPE_DESCRIPTIONS: Record<SEOStrategyType, string> = {
  [SEO_STRATEGY_TYPE.KEYWORD_FOCUSED]: 'Focuses on targeting and ranking for specific keywords',
  [SEO_STRATEGY_TYPE.CONTENT_FOCUSED]:
    'Focuses on creating high-quality content for organic growth',
  [SEO_STRATEGY_TYPE.LINK_BUILDING]: 'Focuses on acquiring high-quality backlinks and authority',
  [SEO_STRATEGY_TYPE.TECHNICAL]:
    'Focuses on technical improvements for better crawlability and indexing',
  [SEO_STRATEGY_TYPE.LOCAL_SEO]: 'Focuses on optimizing for local search and geographic visibility',
  [SEO_STRATEGY_TYPE.ECOMMERCE]: 'Focuses on optimizing product pages and e-commerce conversions',
  [SEO_STRATEGY_TYPE.INTEGRATED]: 'Combines multiple strategies for a comprehensive approach',
  [SEO_STRATEGY_TYPE.AGGRESSIVE]: 'High-risk, high-reward approach with rapid implementation',
  [SEO_STRATEGY_TYPE.CONSERVATIVE]: 'Low-risk, steady approach with gradual improvements',
} as const;

/**
 * SEO স্ট্র্যাটেজি টাইপ আইকন
 */
export const SEO_STRATEGY_TYPE_ICONS: Record<SEOStrategyType, string> = {
  [SEO_STRATEGY_TYPE.KEYWORD_FOCUSED]: '🔑',
  [SEO_STRATEGY_TYPE.CONTENT_FOCUSED]: '📝',
  [SEO_STRATEGY_TYPE.LINK_BUILDING]: '🔗',
  [SEO_STRATEGY_TYPE.TECHNICAL]: '⚙️',
  [SEO_STRATEGY_TYPE.LOCAL_SEO]: '📍',
  [SEO_STRATEGY_TYPE.ECOMMERCE]: '🛒',
  [SEO_STRATEGY_TYPE.INTEGRATED]: '🔄',
  [SEO_STRATEGY_TYPE.AGGRESSIVE]: '🚀',
  [SEO_STRATEGY_TYPE.CONSERVATIVE]: '🛡️',
} as const;

/**
 * SEO স্ট্র্যাটেজি টাইপ রিস্ক লেভেল (১ = কম, ৫ = বেশি)
 */
export const SEO_STRATEGY_TYPE_RISK_LEVEL: Record<SEOStrategyType, number> = {
  [SEO_STRATEGY_TYPE.KEYWORD_FOCUSED]: 2,
  [SEO_STRATEGY_TYPE.CONTENT_FOCUSED]: 1,
  [SEO_STRATEGY_TYPE.LINK_BUILDING]: 3,
  [SEO_STRATEGY_TYPE.TECHNICAL]: 1,
  [SEO_STRATEGY_TYPE.LOCAL_SEO]: 2,
  [SEO_STRATEGY_TYPE.ECOMMERCE]: 2,
  [SEO_STRATEGY_TYPE.INTEGRATED]: 3,
  [SEO_STRATEGY_TYPE.AGGRESSIVE]: 5,
  [SEO_STRATEGY_TYPE.CONSERVATIVE]: 1,
} as const;

/**
 * SEO স্ট্র্যাটেজি টাইপ টাইম টু রেজাল্ট (মাসে)
 */
export const SEO_STRATEGY_TYPE_TIME_TO_RESULT: Record<SEOStrategyType, number> = {
  [SEO_STRATEGY_TYPE.KEYWORD_FOCUSED]: 3,
  [SEO_STRATEGY_TYPE.CONTENT_FOCUSED]: 4,
  [SEO_STRATEGY_TYPE.LINK_BUILDING]: 6,
  [SEO_STRATEGY_TYPE.TECHNICAL]: 2,
  [SEO_STRATEGY_TYPE.LOCAL_SEO]: 3,
  [SEO_STRATEGY_TYPE.ECOMMERCE]: 4,
  [SEO_STRATEGY_TYPE.INTEGRATED]: 5,
  [SEO_STRATEGY_TYPE.AGGRESSIVE]: 3,
  [SEO_STRATEGY_TYPE.CONSERVATIVE]: 6,
} as const;

/**
 * SEO স্ট্র্যাটেজি টাইপ কনফিগারেশন
 */
export interface SEOStrategyTypeConfig {
  type: SEOStrategyType;
  label: string;
  description: string;
  icon: string;
  riskLevel: number;
  timeToResult: number; // months
  requiresContent: boolean;
  requiresTechnical: boolean;
  requiresBacklinks: boolean;
  requiresLocalData: boolean;
  isAggressive: boolean;
  isIntegrated: boolean;
}

/**
 * SEO স্ট্র্যাটেজি টাইপ মেটাডেটা
 */
export const SEO_STRATEGY_TYPE_METADATA: Record<SEOStrategyType, SEOStrategyTypeConfig> = {
  [SEO_STRATEGY_TYPE.KEYWORD_FOCUSED]: {
    type: SEO_STRATEGY_TYPE.KEYWORD_FOCUSED,
    label: SEO_STRATEGY_TYPE_LABELS[SEO_STRATEGY_TYPE.KEYWORD_FOCUSED],
    description: SEO_STRATEGY_TYPE_DESCRIPTIONS[SEO_STRATEGY_TYPE.KEYWORD_FOCUSED],
    icon: SEO_STRATEGY_TYPE_ICONS[SEO_STRATEGY_TYPE.KEYWORD_FOCUSED],
    riskLevel: SEO_STRATEGY_TYPE_RISK_LEVEL[SEO_STRATEGY_TYPE.KEYWORD_FOCUSED],
    timeToResult: SEO_STRATEGY_TYPE_TIME_TO_RESULT[SEO_STRATEGY_TYPE.KEYWORD_FOCUSED],
    requiresContent: true,
    requiresTechnical: true,
    requiresBacklinks: false,
    requiresLocalData: false,
    isAggressive: false,
    isIntegrated: false,
  },
  [SEO_STRATEGY_TYPE.CONTENT_FOCUSED]: {
    type: SEO_STRATEGY_TYPE.CONTENT_FOCUSED,
    label: SEO_STRATEGY_TYPE_LABELS[SEO_STRATEGY_TYPE.CONTENT_FOCUSED],
    description: SEO_STRATEGY_TYPE_DESCRIPTIONS[SEO_STRATEGY_TYPE.CONTENT_FOCUSED],
    icon: SEO_STRATEGY_TYPE_ICONS[SEO_STRATEGY_TYPE.CONTENT_FOCUSED],
    riskLevel: SEO_STRATEGY_TYPE_RISK_LEVEL[SEO_STRATEGY_TYPE.CONTENT_FOCUSED],
    timeToResult: SEO_STRATEGY_TYPE_TIME_TO_RESULT[SEO_STRATEGY_TYPE.CONTENT_FOCUSED],
    requiresContent: true,
    requiresTechnical: false,
    requiresBacklinks: false,
    requiresLocalData: false,
    isAggressive: false,
    isIntegrated: false,
  },
  [SEO_STRATEGY_TYPE.LINK_BUILDING]: {
    type: SEO_STRATEGY_TYPE.LINK_BUILDING,
    label: SEO_STRATEGY_TYPE_LABELS[SEO_STRATEGY_TYPE.LINK_BUILDING],
    description: SEO_STRATEGY_TYPE_DESCRIPTIONS[SEO_STRATEGY_TYPE.LINK_BUILDING],
    icon: SEO_STRATEGY_TYPE_ICONS[SEO_STRATEGY_TYPE.LINK_BUILDING],
    riskLevel: SEO_STRATEGY_TYPE_RISK_LEVEL[SEO_STRATEGY_TYPE.LINK_BUILDING],
    timeToResult: SEO_STRATEGY_TYPE_TIME_TO_RESULT[SEO_STRATEGY_TYPE.LINK_BUILDING],
    requiresContent: false,
    requiresTechnical: false,
    requiresBacklinks: true,
    requiresLocalData: false,
    isAggressive: false,
    isIntegrated: false,
  },
  [SEO_STRATEGY_TYPE.TECHNICAL]: {
    type: SEO_STRATEGY_TYPE.TECHNICAL,
    label: SEO_STRATEGY_TYPE_LABELS[SEO_STRATEGY_TYPE.TECHNICAL],
    description: SEO_STRATEGY_TYPE_DESCRIPTIONS[SEO_STRATEGY_TYPE.TECHNICAL],
    icon: SEO_STRATEGY_TYPE_ICONS[SEO_STRATEGY_TYPE.TECHNICAL],
    riskLevel: SEO_STRATEGY_TYPE_RISK_LEVEL[SEO_STRATEGY_TYPE.TECHNICAL],
    timeToResult: SEO_STRATEGY_TYPE_TIME_TO_RESULT[SEO_STRATEGY_TYPE.TECHNICAL],
    requiresContent: false,
    requiresTechnical: true,
    requiresBacklinks: false,
    requiresLocalData: false,
    isAggressive: false,
    isIntegrated: false,
  },
  [SEO_STRATEGY_TYPE.LOCAL_SEO]: {
    type: SEO_STRATEGY_TYPE.LOCAL_SEO,
    label: SEO_STRATEGY_TYPE_LABELS[SEO_STRATEGY_TYPE.LOCAL_SEO],
    description: SEO_STRATEGY_TYPE_DESCRIPTIONS[SEO_STRATEGY_TYPE.LOCAL_SEO],
    icon: SEO_STRATEGY_TYPE_ICONS[SEO_STRATEGY_TYPE.LOCAL_SEO],
    riskLevel: SEO_STRATEGY_TYPE_RISK_LEVEL[SEO_STRATEGY_TYPE.LOCAL_SEO],
    timeToResult: SEO_STRATEGY_TYPE_TIME_TO_RESULT[SEO_STRATEGY_TYPE.LOCAL_SEO],
    requiresContent: true,
    requiresTechnical: false,
    requiresBacklinks: false,
    requiresLocalData: true,
    isAggressive: false,
    isIntegrated: false,
  },
  [SEO_STRATEGY_TYPE.ECOMMERCE]: {
    type: SEO_STRATEGY_TYPE.ECOMMERCE,
    label: SEO_STRATEGY_TYPE_LABELS[SEO_STRATEGY_TYPE.ECOMMERCE],
    description: SEO_STRATEGY_TYPE_DESCRIPTIONS[SEO_STRATEGY_TYPE.ECOMMERCE],
    icon: SEO_STRATEGY_TYPE_ICONS[SEO_STRATEGY_TYPE.ECOMMERCE],
    riskLevel: SEO_STRATEGY_TYPE_RISK_LEVEL[SEO_STRATEGY_TYPE.ECOMMERCE],
    timeToResult: SEO_STRATEGY_TYPE_TIME_TO_RESULT[SEO_STRATEGY_TYPE.ECOMMERCE],
    requiresContent: true,
    requiresTechnical: true,
    requiresBacklinks: false,
    requiresLocalData: false,
    isAggressive: false,
    isIntegrated: false,
  },
  [SEO_STRATEGY_TYPE.INTEGRATED]: {
    type: SEO_STRATEGY_TYPE.INTEGRATED,
    label: SEO_STRATEGY_TYPE_LABELS[SEO_STRATEGY_TYPE.INTEGRATED],
    description: SEO_STRATEGY_TYPE_DESCRIPTIONS[SEO_STRATEGY_TYPE.INTEGRATED],
    icon: SEO_STRATEGY_TYPE_ICONS[SEO_STRATEGY_TYPE.INTEGRATED],
    riskLevel: SEO_STRATEGY_TYPE_RISK_LEVEL[SEO_STRATEGY_TYPE.INTEGRATED],
    timeToResult: SEO_STRATEGY_TYPE_TIME_TO_RESULT[SEO_STRATEGY_TYPE.INTEGRATED],
    requiresContent: true,
    requiresTechnical: true,
    requiresBacklinks: true,
    requiresLocalData: false,
    isAggressive: false,
    isIntegrated: true,
  },
  [SEO_STRATEGY_TYPE.AGGRESSIVE]: {
    type: SEO_STRATEGY_TYPE.AGGRESSIVE,
    label: SEO_STRATEGY_TYPE_LABELS[SEO_STRATEGY_TYPE.AGGRESSIVE],
    description: SEO_STRATEGY_TYPE_DESCRIPTIONS[SEO_STRATEGY_TYPE.AGGRESSIVE],
    icon: SEO_STRATEGY_TYPE_ICONS[SEO_STRATEGY_TYPE.AGGRESSIVE],
    riskLevel: SEO_STRATEGY_TYPE_RISK_LEVEL[SEO_STRATEGY_TYPE.AGGRESSIVE],
    timeToResult: SEO_STRATEGY_TYPE_TIME_TO_RESULT[SEO_STRATEGY_TYPE.AGGRESSIVE],
    requiresContent: true,
    requiresTechnical: true,
    requiresBacklinks: true,
    requiresLocalData: false,
    isAggressive: true,
    isIntegrated: true,
  },
  [SEO_STRATEGY_TYPE.CONSERVATIVE]: {
    type: SEO_STRATEGY_TYPE.CONSERVATIVE,
    label: SEO_STRATEGY_TYPE_LABELS[SEO_STRATEGY_TYPE.CONSERVATIVE],
    description: SEO_STRATEGY_TYPE_DESCRIPTIONS[SEO_STRATEGY_TYPE.CONSERVATIVE],
    icon: SEO_STRATEGY_TYPE_ICONS[SEO_STRATEGY_TYPE.CONSERVATIVE],
    riskLevel: SEO_STRATEGY_TYPE_RISK_LEVEL[SEO_STRATEGY_TYPE.CONSERVATIVE],
    timeToResult: SEO_STRATEGY_TYPE_TIME_TO_RESULT[SEO_STRATEGY_TYPE.CONSERVATIVE],
    requiresContent: false,
    requiresTechnical: false,
    requiresBacklinks: false,
    requiresLocalData: false,
    isAggressive: false,
    isIntegrated: false,
  },
} as const;

/**
 * SEO স্ট্র্যাটেজি টাইপ গ্রুপ
 */
export const SEO_STRATEGY_TYPE_GROUPS = {
  FOCUSED: [SEO_STRATEGY_TYPE.KEYWORD_FOCUSED, SEO_STRATEGY_TYPE.CONTENT_FOCUSED] as const,
  TECHNICAL: [
    SEO_STRATEGY_TYPE.TECHNICAL,
    SEO_STRATEGY_TYPE.LOCAL_SEO,
    SEO_STRATEGY_TYPE.ECOMMERCE,
  ] as const,
  LINK: [SEO_STRATEGY_TYPE.LINK_BUILDING] as const,
  COMPREHENSIVE: [
    SEO_STRATEGY_TYPE.INTEGRATED,
    SEO_STRATEGY_TYPE.AGGRESSIVE,
    SEO_STRATEGY_TYPE.CONSERVATIVE,
  ] as const,
} as const;

/**
 * SEO স্ট্র্যাটেজি টাইপ গ্রুপ লেবেল
 */
export const SEO_STRATEGY_TYPE_GROUP_LABELS = {
  FOCUSED: 'Focused Strategies',
  TECHNICAL: 'Technical Strategies',
  LINK: 'Link Strategies',
  COMPREHENSIVE: 'Comprehensive Strategies',
} as const;
