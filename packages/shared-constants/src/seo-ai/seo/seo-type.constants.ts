/**
 * SEO টাইপ এনাম
 */
export const SEO_TYPE = {
  ON_PAGE: 'on-page',
  OFF_PAGE: 'off-page',
  TECHNICAL: 'technical',
  LOCAL: 'local',
  ECOMMERCE: 'ecommerce',
  INTERNATIONAL: 'international',
  MOBILE: 'mobile',
  VOICE: 'voice',
} as const;

/**
 * SEO_TYPE থেকে টাইপ
 */
export type SEOType = (typeof SEO_TYPE)[keyof typeof SEO_TYPE];

/**
 * SEO টাইপ লেবেল
 */
export const SEO_TYPE_LABELS: Record<SEOType, string> = {
  [SEO_TYPE.ON_PAGE]: 'On-Page SEO',
  [SEO_TYPE.OFF_PAGE]: 'Off-Page SEO',
  [SEO_TYPE.TECHNICAL]: 'Technical SEO',
  [SEO_TYPE.LOCAL]: 'Local SEO',
  [SEO_TYPE.ECOMMERCE]: 'E-commerce SEO',
  [SEO_TYPE.INTERNATIONAL]: 'International SEO',
  [SEO_TYPE.MOBILE]: 'Mobile SEO',
  [SEO_TYPE.VOICE]: 'Voice Search SEO',
} as const;

/**
 * SEO টাইপ বিবরণ
 */
export const SEO_TYPE_DESCRIPTIONS: Record<SEOType, string> = {
  [SEO_TYPE.ON_PAGE]: 'Optimization of content and HTML source code on individual pages',
  [SEO_TYPE.OFF_PAGE]: 'Optimization through external signals and backlinks from other websites',
  [SEO_TYPE.TECHNICAL]:
    'Optimization of technical aspects like site speed, indexing, and crawlability',
  [SEO_TYPE.LOCAL]: 'Optimization for local search results and geographic-specific queries',
  [SEO_TYPE.ECOMMERCE]: 'Optimization of online stores and product pages for better conversions',
  [SEO_TYPE.INTERNATIONAL]: 'Optimization for multiple languages and countries/regions',
  [SEO_TYPE.MOBILE]: 'Optimization for mobile devices and mobile-first indexing',
  [SEO_TYPE.VOICE]: 'Optimization for voice search and natural language queries',
} as const;

/**
 * SEO টাইপ আইকন
 */
export const SEO_TYPE_ICONS: Record<SEOType, string> = {
  [SEO_TYPE.ON_PAGE]: '📄',
  [SEO_TYPE.OFF_PAGE]: '🔗',
  [SEO_TYPE.TECHNICAL]: '⚙️',
  [SEO_TYPE.LOCAL]: '📍',
  [SEO_TYPE.ECOMMERCE]: '🛒',
  [SEO_TYPE.INTERNATIONAL]: '🌍',
  [SEO_TYPE.MOBILE]: '📱',
  [SEO_TYPE.VOICE]: '🎤',
} as const;

/**
 * SEO টাইপ প্রায়োরিটি (১ = সর্বোচ্চ)
 */
export const SEO_TYPE_PRIORITY: Record<SEOType, number> = {
  [SEO_TYPE.ON_PAGE]: 1,
  [SEO_TYPE.TECHNICAL]: 2,
  [SEO_TYPE.OFF_PAGE]: 3,
  [SEO_TYPE.MOBILE]: 4,
  [SEO_TYPE.ECOMMERCE]: 5,
  [SEO_TYPE.LOCAL]: 6,
  [SEO_TYPE.VOICE]: 7,
  [SEO_TYPE.INTERNATIONAL]: 8,
} as const;

/**
 * SEO টাইপ কনফিগারেশন
 */
export interface SEOTypeConfig {
  type: SEOType;
  label: string;
  description: string;
  icon: string;
  priority: number;
  requiresContent: boolean;
  requiresBacklinks: boolean;
  requiresTechnicalAudit: boolean;
  requiresLocalData: boolean;
  requiresInternationalization: boolean;
  requiresMobileOptimization: boolean;
  requiresVoiceOptimization: boolean;
}

/**
 * SEO টাইপ মেটাডেটা
 */
export const SEO_TYPE_METADATA: Record<SEOType, SEOTypeConfig> = {
  [SEO_TYPE.ON_PAGE]: {
    type: SEO_TYPE.ON_PAGE,
    label: SEO_TYPE_LABELS[SEO_TYPE.ON_PAGE],
    description: SEO_TYPE_DESCRIPTIONS[SEO_TYPE.ON_PAGE],
    icon: SEO_TYPE_ICONS[SEO_TYPE.ON_PAGE],
    priority: SEO_TYPE_PRIORITY[SEO_TYPE.ON_PAGE],
    requiresContent: true,
    requiresBacklinks: false,
    requiresTechnicalAudit: false,
    requiresLocalData: false,
    requiresInternationalization: false,
    requiresMobileOptimization: false,
    requiresVoiceOptimization: false,
  },
  [SEO_TYPE.OFF_PAGE]: {
    type: SEO_TYPE.OFF_PAGE,
    label: SEO_TYPE_LABELS[SEO_TYPE.OFF_PAGE],
    description: SEO_TYPE_DESCRIPTIONS[SEO_TYPE.OFF_PAGE],
    icon: SEO_TYPE_ICONS[SEO_TYPE.OFF_PAGE],
    priority: SEO_TYPE_PRIORITY[SEO_TYPE.OFF_PAGE],
    requiresContent: false,
    requiresBacklinks: true,
    requiresTechnicalAudit: false,
    requiresLocalData: false,
    requiresInternationalization: false,
    requiresMobileOptimization: false,
    requiresVoiceOptimization: false,
  },
  [SEO_TYPE.TECHNICAL]: {
    type: SEO_TYPE.TECHNICAL,
    label: SEO_TYPE_LABELS[SEO_TYPE.TECHNICAL],
    description: SEO_TYPE_DESCRIPTIONS[SEO_TYPE.TECHNICAL],
    icon: SEO_TYPE_ICONS[SEO_TYPE.TECHNICAL],
    priority: SEO_TYPE_PRIORITY[SEO_TYPE.TECHNICAL],
    requiresContent: false,
    requiresBacklinks: false,
    requiresTechnicalAudit: true,
    requiresLocalData: false,
    requiresInternationalization: false,
    requiresMobileOptimization: false,
    requiresVoiceOptimization: false,
  },
  [SEO_TYPE.LOCAL]: {
    type: SEO_TYPE.LOCAL,
    label: SEO_TYPE_LABELS[SEO_TYPE.LOCAL],
    description: SEO_TYPE_DESCRIPTIONS[SEO_TYPE.LOCAL],
    icon: SEO_TYPE_ICONS[SEO_TYPE.LOCAL],
    priority: SEO_TYPE_PRIORITY[SEO_TYPE.LOCAL],
    requiresContent: true,
    requiresBacklinks: false,
    requiresTechnicalAudit: false,
    requiresLocalData: true,
    requiresInternationalization: false,
    requiresMobileOptimization: false,
    requiresVoiceOptimization: false,
  },
  [SEO_TYPE.ECOMMERCE]: {
    type: SEO_TYPE.ECOMMERCE,
    label: SEO_TYPE_LABELS[SEO_TYPE.ECOMMERCE],
    description: SEO_TYPE_DESCRIPTIONS[SEO_TYPE.ECOMMERCE],
    icon: SEO_TYPE_ICONS[SEO_TYPE.ECOMMERCE],
    priority: SEO_TYPE_PRIORITY[SEO_TYPE.ECOMMERCE],
    requiresContent: true,
    requiresBacklinks: false,
    requiresTechnicalAudit: false,
    requiresLocalData: false,
    requiresInternationalization: false,
    requiresMobileOptimization: false,
    requiresVoiceOptimization: false,
  },
  [SEO_TYPE.INTERNATIONAL]: {
    type: SEO_TYPE.INTERNATIONAL,
    label: SEO_TYPE_LABELS[SEO_TYPE.INTERNATIONAL],
    description: SEO_TYPE_DESCRIPTIONS[SEO_TYPE.INTERNATIONAL],
    icon: SEO_TYPE_ICONS[SEO_TYPE.INTERNATIONAL],
    priority: SEO_TYPE_PRIORITY[SEO_TYPE.INTERNATIONAL],
    requiresContent: true,
    requiresBacklinks: false,
    requiresTechnicalAudit: false,
    requiresLocalData: false,
    requiresInternationalization: true,
    requiresMobileOptimization: false,
    requiresVoiceOptimization: false,
  },
  [SEO_TYPE.MOBILE]: {
    type: SEO_TYPE.MOBILE,
    label: SEO_TYPE_LABELS[SEO_TYPE.MOBILE],
    description: SEO_TYPE_DESCRIPTIONS[SEO_TYPE.MOBILE],
    icon: SEO_TYPE_ICONS[SEO_TYPE.MOBILE],
    priority: SEO_TYPE_PRIORITY[SEO_TYPE.MOBILE],
    requiresContent: false,
    requiresBacklinks: false,
    requiresTechnicalAudit: false,
    requiresLocalData: false,
    requiresInternationalization: false,
    requiresMobileOptimization: true,
    requiresVoiceOptimization: false,
  },
  [SEO_TYPE.VOICE]: {
    type: SEO_TYPE.VOICE,
    label: SEO_TYPE_LABELS[SEO_TYPE.VOICE],
    description: SEO_TYPE_DESCRIPTIONS[SEO_TYPE.VOICE],
    icon: SEO_TYPE_ICONS[SEO_TYPE.VOICE],
    priority: SEO_TYPE_PRIORITY[SEO_TYPE.VOICE],
    requiresContent: true,
    requiresBacklinks: false,
    requiresTechnicalAudit: false,
    requiresLocalData: false,
    requiresInternationalization: false,
    requiresMobileOptimization: false,
    requiresVoiceOptimization: true,
  },
} as const;

/**
 * SEO টাইপ গ্রুপ
 */
export const SEO_TYPE_GROUPS = {
  CONTENT: [SEO_TYPE.ON_PAGE, SEO_TYPE.ECOMMERCE, SEO_TYPE.INTERNATIONAL] as const,
  TECHNICAL: [SEO_TYPE.TECHNICAL, SEO_TYPE.MOBILE] as const,
  EXTERNAL: [SEO_TYPE.OFF_PAGE, SEO_TYPE.LOCAL] as const,
  EMERGING: [SEO_TYPE.VOICE] as const,
} as const;

/**
 * SEO টাইপ গ্রুপ লেবেল
 */
export const SEO_TYPE_GROUP_LABELS = {
  CONTENT: 'Content Optimization',
  TECHNICAL: 'Technical Optimization',
  EXTERNAL: 'External Signals',
  EMERGING: 'Emerging Technologies',
} as const;
