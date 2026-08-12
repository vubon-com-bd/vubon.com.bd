/**
 * SEO অডিট টাইপ এনাম
 */
export const SEO_AUDIT_TYPE = {
  FULL: 'full',
  TECHNICAL: 'technical',
  ON_PAGE: 'on-page',
  CONTENT: 'content',
  LINK: 'link',
  MOBILE: 'mobile',
  SPEED: 'speed',
  COMPETITOR: 'competitor',
  CONTINUOUS: 'continuous',
  SCHEDULED: 'scheduled',
} as const;

/**
 * SEO_AUDIT_TYPE থেকে টাইপ
 */
export type SEOAuditType = (typeof SEO_AUDIT_TYPE)[keyof typeof SEO_AUDIT_TYPE];

/**
 * SEO অডিট টাইপ লেবেল
 */
export const SEO_AUDIT_TYPE_LABELS: Record<SEOAuditType, string> = {
  [SEO_AUDIT_TYPE.FULL]: 'Full Audit',
  [SEO_AUDIT_TYPE.TECHNICAL]: 'Technical Audit',
  [SEO_AUDIT_TYPE.ON_PAGE]: 'On-Page Audit',
  [SEO_AUDIT_TYPE.CONTENT]: 'Content Audit',
  [SEO_AUDIT_TYPE.LINK]: 'Link Audit',
  [SEO_AUDIT_TYPE.MOBILE]: 'Mobile Audit',
  [SEO_AUDIT_TYPE.SPEED]: 'Speed Audit',
  [SEO_AUDIT_TYPE.COMPETITOR]: 'Competitor Audit',
  [SEO_AUDIT_TYPE.CONTINUOUS]: 'Continuous Audit',
  [SEO_AUDIT_TYPE.SCHEDULED]: 'Scheduled Audit',
} as const;

/**
 * SEO অডিট টাইপ বিবরণ
 */
export const SEO_AUDIT_TYPE_DESCRIPTIONS: Record<SEOAuditType, string> = {
  [SEO_AUDIT_TYPE.FULL]: 'Comprehensive audit covering all SEO aspects',
  [SEO_AUDIT_TYPE.TECHNICAL]: 'In-depth technical SEO analysis and recommendations',
  [SEO_AUDIT_TYPE.ON_PAGE]: 'On-page SEO optimization audit',
  [SEO_AUDIT_TYPE.CONTENT]: 'Content quality, relevance, and optimization audit',
  [SEO_AUDIT_TYPE.LINK]: 'Internal and external link profile analysis',
  [SEO_AUDIT_TYPE.MOBILE]: 'Mobile usability and mobile-first indexing audit',
  [SEO_AUDIT_TYPE.SPEED]: 'Website performance and loading speed audit',
  [SEO_AUDIT_TYPE.COMPETITOR]: 'Competitor SEO strategy and performance analysis',
  [SEO_AUDIT_TYPE.CONTINUOUS]: 'Ongoing real-time monitoring and auditing',
  [SEO_AUDIT_TYPE.SCHEDULED]: 'Regular scheduled comprehensive audits',
} as const;

/**
 * SEO অডিট টাইপ আইকন
 */
export const SEO_AUDIT_TYPE_ICONS: Record<SEOAuditType, string> = {
  [SEO_AUDIT_TYPE.FULL]: '🔍',
  [SEO_AUDIT_TYPE.TECHNICAL]: '⚙️',
  [SEO_AUDIT_TYPE.ON_PAGE]: '📄',
  [SEO_AUDIT_TYPE.CONTENT]: '📝',
  [SEO_AUDIT_TYPE.LINK]: '🔗',
  [SEO_AUDIT_TYPE.MOBILE]: '📱',
  [SEO_AUDIT_TYPE.SPEED]: '⚡',
  [SEO_AUDIT_TYPE.COMPETITOR]: '🏁',
  [SEO_AUDIT_TYPE.CONTINUOUS]: '🔄',
  [SEO_AUDIT_TYPE.SCHEDULED]: '📅',
} as const;

/**
 * SEO অডিট টাইপ কালার (হেক্স কোড)
 */
export const SEO_AUDIT_TYPE_COLORS: Record<SEOAuditType, string> = {
  [SEO_AUDIT_TYPE.FULL]: '#8b5cf6', // Violet-500
  [SEO_AUDIT_TYPE.TECHNICAL]: '#3b82f6', // Blue-500
  [SEO_AUDIT_TYPE.ON_PAGE]: '#22c55e', // Green-500
  [SEO_AUDIT_TYPE.CONTENT]: '#f59e0b', // Amber-500
  [SEO_AUDIT_TYPE.LINK]: '#06b6d4', // Cyan-500
  [SEO_AUDIT_TYPE.MOBILE]: '#ec4899', // Pink-500
  [SEO_AUDIT_TYPE.SPEED]: '#dc2626', // Red-600
  [SEO_AUDIT_TYPE.COMPETITOR]: '#f97316', // Orange-500
  [SEO_AUDIT_TYPE.CONTINUOUS]: '#22d3ee', // Cyan-400
  [SEO_AUDIT_TYPE.SCHEDULED]: '#6366f1', // Indigo-500
} as const;

/**
 * SEO অডিট টাইপ ডিফিকাল্টি (১-১০)
 */
export const SEO_AUDIT_TYPE_DIFFICULTY: Record<SEOAuditType, number> = {
  [SEO_AUDIT_TYPE.FULL]: 9,
  [SEO_AUDIT_TYPE.TECHNICAL]: 8,
  [SEO_AUDIT_TYPE.ON_PAGE]: 5,
  [SEO_AUDIT_TYPE.CONTENT]: 6,
  [SEO_AUDIT_TYPE.LINK]: 6,
  [SEO_AUDIT_TYPE.MOBILE]: 7,
  [SEO_AUDIT_TYPE.SPEED]: 8,
  [SEO_AUDIT_TYPE.COMPETITOR]: 7,
  [SEO_AUDIT_TYPE.CONTINUOUS]: 9,
  [SEO_AUDIT_TYPE.SCHEDULED]: 6,
} as const;

/**
 * SEO অডিট টাইপ ডিউরেশন (ঘন্টায়)
 */
export const SEO_AUDIT_TYPE_DURATION: Record<SEOAuditType, number> = {
  [SEO_AUDIT_TYPE.FULL]: 48,
  [SEO_AUDIT_TYPE.TECHNICAL]: 24,
  [SEO_AUDIT_TYPE.ON_PAGE]: 12,
  [SEO_AUDIT_TYPE.CONTENT]: 18,
  [SEO_AUDIT_TYPE.LINK]: 8,
  [SEO_AUDIT_TYPE.MOBILE]: 6,
  [SEO_AUDIT_TYPE.SPEED]: 4,
  [SEO_AUDIT_TYPE.COMPETITOR]: 12,
  [SEO_AUDIT_TYPE.CONTINUOUS]: 168,
  [SEO_AUDIT_TYPE.SCHEDULED]: 24,
} as const;

/**
 * SEO অডিট টাইপ কনফিগারেশন
 */
export interface SEOAuditTypeConfig {
  type: SEOAuditType;
  label: string;
  description: string;
  icon: string;
  color: string;
  difficulty: number;
  duration: number;
  requiresCrawling: boolean;
  requiresBacklinkCheck: boolean;
  requiresCompetitorCheck: boolean;
  isContinuous: boolean;
  isScheduled: boolean;
  order: number;
}

/**
 * SEO অডিট টাইপ মেটাডেটা
 */
export const SEO_AUDIT_TYPE_METADATA: Record<SEOAuditType, SEOAuditTypeConfig> = {
  [SEO_AUDIT_TYPE.FULL]: {
    type: SEO_AUDIT_TYPE.FULL,
    label: SEO_AUDIT_TYPE_LABELS[SEO_AUDIT_TYPE.FULL],
    description: SEO_AUDIT_TYPE_DESCRIPTIONS[SEO_AUDIT_TYPE.FULL],
    icon: SEO_AUDIT_TYPE_ICONS[SEO_AUDIT_TYPE.FULL],
    color: SEO_AUDIT_TYPE_COLORS[SEO_AUDIT_TYPE.FULL],
    difficulty: SEO_AUDIT_TYPE_DIFFICULTY[SEO_AUDIT_TYPE.FULL],
    duration: SEO_AUDIT_TYPE_DURATION[SEO_AUDIT_TYPE.FULL],
    requiresCrawling: true,
    requiresBacklinkCheck: true,
    requiresCompetitorCheck: true,
    isContinuous: false,
    isScheduled: false,
    order: 0,
  },
  [SEO_AUDIT_TYPE.TECHNICAL]: {
    type: SEO_AUDIT_TYPE.TECHNICAL,
    label: SEO_AUDIT_TYPE_LABELS[SEO_AUDIT_TYPE.TECHNICAL],
    description: SEO_AUDIT_TYPE_DESCRIPTIONS[SEO_AUDIT_TYPE.TECHNICAL],
    icon: SEO_AUDIT_TYPE_ICONS[SEO_AUDIT_TYPE.TECHNICAL],
    color: SEO_AUDIT_TYPE_COLORS[SEO_AUDIT_TYPE.TECHNICAL],
    difficulty: SEO_AUDIT_TYPE_DIFFICULTY[SEO_AUDIT_TYPE.TECHNICAL],
    duration: SEO_AUDIT_TYPE_DURATION[SEO_AUDIT_TYPE.TECHNICAL],
    requiresCrawling: true,
    requiresBacklinkCheck: false,
    requiresCompetitorCheck: false,
    isContinuous: false,
    isScheduled: false,
    order: 1,
  },
  [SEO_AUDIT_TYPE.ON_PAGE]: {
    type: SEO_AUDIT_TYPE.ON_PAGE,
    label: SEO_AUDIT_TYPE_LABELS[SEO_AUDIT_TYPE.ON_PAGE],
    description: SEO_AUDIT_TYPE_DESCRIPTIONS[SEO_AUDIT_TYPE.ON_PAGE],
    icon: SEO_AUDIT_TYPE_ICONS[SEO_AUDIT_TYPE.ON_PAGE],
    color: SEO_AUDIT_TYPE_COLORS[SEO_AUDIT_TYPE.ON_PAGE],
    difficulty: SEO_AUDIT_TYPE_DIFFICULTY[SEO_AUDIT_TYPE.ON_PAGE],
    duration: SEO_AUDIT_TYPE_DURATION[SEO_AUDIT_TYPE.ON_PAGE],
    requiresCrawling: true,
    requiresBacklinkCheck: false,
    requiresCompetitorCheck: false,
    isContinuous: false,
    isScheduled: false,
    order: 2,
  },
  [SEO_AUDIT_TYPE.CONTENT]: {
    type: SEO_AUDIT_TYPE.CONTENT,
    label: SEO_AUDIT_TYPE_LABELS[SEO_AUDIT_TYPE.CONTENT],
    description: SEO_AUDIT_TYPE_DESCRIPTIONS[SEO_AUDIT_TYPE.CONTENT],
    icon: SEO_AUDIT_TYPE_ICONS[SEO_AUDIT_TYPE.CONTENT],
    color: SEO_AUDIT_TYPE_COLORS[SEO_AUDIT_TYPE.CONTENT],
    difficulty: SEO_AUDIT_TYPE_DIFFICULTY[SEO_AUDIT_TYPE.CONTENT],
    duration: SEO_AUDIT_TYPE_DURATION[SEO_AUDIT_TYPE.CONTENT],
    requiresCrawling: true,
    requiresBacklinkCheck: false,
    requiresCompetitorCheck: true,
    isContinuous: false,
    isScheduled: false,
    order: 3,
  },
  [SEO_AUDIT_TYPE.LINK]: {
    type: SEO_AUDIT_TYPE.LINK,
    label: SEO_AUDIT_TYPE_LABELS[SEO_AUDIT_TYPE.LINK],
    description: SEO_AUDIT_TYPE_DESCRIPTIONS[SEO_AUDIT_TYPE.LINK],
    icon: SEO_AUDIT_TYPE_ICONS[SEO_AUDIT_TYPE.LINK],
    color: SEO_AUDIT_TYPE_COLORS[SEO_AUDIT_TYPE.LINK],
    difficulty: SEO_AUDIT_TYPE_DIFFICULTY[SEO_AUDIT_TYPE.LINK],
    duration: SEO_AUDIT_TYPE_DURATION[SEO_AUDIT_TYPE.LINK],
    requiresCrawling: true,
    requiresBacklinkCheck: true,
    requiresCompetitorCheck: false,
    isContinuous: false,
    isScheduled: false,
    order: 4,
  },
  [SEO_AUDIT_TYPE.MOBILE]: {
    type: SEO_AUDIT_TYPE.MOBILE,
    label: SEO_AUDIT_TYPE_LABELS[SEO_AUDIT_TYPE.MOBILE],
    description: SEO_AUDIT_TYPE_DESCRIPTIONS[SEO_AUDIT_TYPE.MOBILE],
    icon: SEO_AUDIT_TYPE_ICONS[SEO_AUDIT_TYPE.MOBILE],
    color: SEO_AUDIT_TYPE_COLORS[SEO_AUDIT_TYPE.MOBILE],
    difficulty: SEO_AUDIT_TYPE_DIFFICULTY[SEO_AUDIT_TYPE.MOBILE],
    duration: SEO_AUDIT_TYPE_DURATION[SEO_AUDIT_TYPE.MOBILE],
    requiresCrawling: false,
    requiresBacklinkCheck: false,
    requiresCompetitorCheck: false,
    isContinuous: false,
    isScheduled: false,
    order: 5,
  },
  [SEO_AUDIT_TYPE.SPEED]: {
    type: SEO_AUDIT_TYPE.SPEED,
    label: SEO_AUDIT_TYPE_LABELS[SEO_AUDIT_TYPE.SPEED],
    description: SEO_AUDIT_TYPE_DESCRIPTIONS[SEO_AUDIT_TYPE.SPEED],
    icon: SEO_AUDIT_TYPE_ICONS[SEO_AUDIT_TYPE.SPEED],
    color: SEO_AUDIT_TYPE_COLORS[SEO_AUDIT_TYPE.SPEED],
    difficulty: SEO_AUDIT_TYPE_DIFFICULTY[SEO_AUDIT_TYPE.SPEED],
    duration: SEO_AUDIT_TYPE_DURATION[SEO_AUDIT_TYPE.SPEED],
    requiresCrawling: false,
    requiresBacklinkCheck: false,
    requiresCompetitorCheck: false,
    isContinuous: false,
    isScheduled: false,
    order: 6,
  },
  [SEO_AUDIT_TYPE.COMPETITOR]: {
    type: SEO_AUDIT_TYPE.COMPETITOR,
    label: SEO_AUDIT_TYPE_LABELS[SEO_AUDIT_TYPE.COMPETITOR],
    description: SEO_AUDIT_TYPE_DESCRIPTIONS[SEO_AUDIT_TYPE.COMPETITOR],
    icon: SEO_AUDIT_TYPE_ICONS[SEO_AUDIT_TYPE.COMPETITOR],
    color: SEO_AUDIT_TYPE_COLORS[SEO_AUDIT_TYPE.COMPETITOR],
    difficulty: SEO_AUDIT_TYPE_DIFFICULTY[SEO_AUDIT_TYPE.COMPETITOR],
    duration: SEO_AUDIT_TYPE_DURATION[SEO_AUDIT_TYPE.COMPETITOR],
    requiresCrawling: false,
    requiresBacklinkCheck: true,
    requiresCompetitorCheck: true,
    isContinuous: false,
    isScheduled: false,
    order: 7,
  },
  [SEO_AUDIT_TYPE.CONTINUOUS]: {
    type: SEO_AUDIT_TYPE.CONTINUOUS,
    label: SEO_AUDIT_TYPE_LABELS[SEO_AUDIT_TYPE.CONTINUOUS],
    description: SEO_AUDIT_TYPE_DESCRIPTIONS[SEO_AUDIT_TYPE.CONTINUOUS],
    icon: SEO_AUDIT_TYPE_ICONS[SEO_AUDIT_TYPE.CONTINUOUS],
    color: SEO_AUDIT_TYPE_COLORS[SEO_AUDIT_TYPE.CONTINUOUS],
    difficulty: SEO_AUDIT_TYPE_DIFFICULTY[SEO_AUDIT_TYPE.CONTINUOUS],
    duration: SEO_AUDIT_TYPE_DURATION[SEO_AUDIT_TYPE.CONTINUOUS],
    requiresCrawling: true,
    requiresBacklinkCheck: true,
    requiresCompetitorCheck: true,
    isContinuous: true,
    isScheduled: false,
    order: 8,
  },
  [SEO_AUDIT_TYPE.SCHEDULED]: {
    type: SEO_AUDIT_TYPE.SCHEDULED,
    label: SEO_AUDIT_TYPE_LABELS[SEO_AUDIT_TYPE.SCHEDULED],
    description: SEO_AUDIT_TYPE_DESCRIPTIONS[SEO_AUDIT_TYPE.SCHEDULED],
    icon: SEO_AUDIT_TYPE_ICONS[SEO_AUDIT_TYPE.SCHEDULED],
    color: SEO_AUDIT_TYPE_COLORS[SEO_AUDIT_TYPE.SCHEDULED],
    difficulty: SEO_AUDIT_TYPE_DIFFICULTY[SEO_AUDIT_TYPE.SCHEDULED],
    duration: SEO_AUDIT_TYPE_DURATION[SEO_AUDIT_TYPE.SCHEDULED],
    requiresCrawling: true,
    requiresBacklinkCheck: true,
    requiresCompetitorCheck: true,
    isContinuous: false,
    isScheduled: true,
    order: 9,
  },
} as const;

/**
 * SEO অডিট টাইপ গ্রুপ
 */
export const SEO_AUDIT_TYPE_GROUPS = {
  COMPREHENSIVE: [
    SEO_AUDIT_TYPE.FULL,
    SEO_AUDIT_TYPE.CONTINUOUS,
    SEO_AUDIT_TYPE.SCHEDULED,
  ] as const,
  TECHNICAL: [
    SEO_AUDIT_TYPE.TECHNICAL,
    SEO_AUDIT_TYPE.ON_PAGE,
    SEO_AUDIT_TYPE.SPEED,
    SEO_AUDIT_TYPE.MOBILE,
  ] as const,
  STRATEGIC: [SEO_AUDIT_TYPE.CONTENT, SEO_AUDIT_TYPE.LINK, SEO_AUDIT_TYPE.COMPETITOR] as const,
} as const;

/**
 * SEO অডিট টাইপ গ্রুপ লেবেল
 */
export const SEO_AUDIT_TYPE_GROUP_LABELS = {
  COMPREHENSIVE: 'Comprehensive Audits',
  TECHNICAL: 'Technical Audits',
  STRATEGIC: 'Strategic Audits',
} as const;

/**
 * SEO অডিট টাইপ গ্রুপ কালার
 */
export const SEO_AUDIT_TYPE_GROUP_COLORS = {
  COMPREHENSIVE: '#8b5cf6',
  TECHNICAL: '#3b82f6',
  STRATEGIC: '#22c55e',
} as const;
