/**
 * লিংকের সর্বোচ্চ দৈর্ঘ্য (২০৪৮)
 */
export const SEO_LINK_MAX_LENGTH = 2048 as const;

/**
 * অ্যাঙ্কর টেক্সটের সর্বোচ্চ দৈর্ঘ্য (১০০)
 */
export const SEO_LINK_ANCHOR_MAX_LENGTH = 100 as const;

/**
 * ডিফল্ট রিলেশনশিপ
 */
export const SEO_LINK_DEFAULT_REL = 'nofollow' as const;

/**
 * SEO লিংক টাইপ এনাম
 */
export const SEO_LINK_TYPE = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  BACKLINK: 'backlink',
  OUTBOUND: 'outbound',
  INBOUND: 'inbound',
  NOFOLLOW: 'nofollow',
  DOFOLLOW: 'dofollow',
  SPONSORED: 'sponsored',
  UGC: 'ugc',
} as const;

/**
 * SEO_LINK_TYPE থেকে টাইপ
 */
export type SEOLinkType = (typeof SEO_LINK_TYPE)[keyof typeof SEO_LINK_TYPE];

/**
 * SEO লিংক টাইপ লেবেল
 */
export const SEO_LINK_TYPE_LABELS: Record<SEOLinkType, string> = {
  [SEO_LINK_TYPE.INTERNAL]: 'Internal Link',
  [SEO_LINK_TYPE.EXTERNAL]: 'External Link',
  [SEO_LINK_TYPE.BACKLINK]: 'Backlink',
  [SEO_LINK_TYPE.OUTBOUND]: 'Outbound Link',
  [SEO_LINK_TYPE.INBOUND]: 'Inbound Link',
  [SEO_LINK_TYPE.NOFOLLOW]: 'NoFollow Link',
  [SEO_LINK_TYPE.DOFOLLOW]: 'DoFollow Link',
  [SEO_LINK_TYPE.SPONSORED]: 'Sponsored Link',
  [SEO_LINK_TYPE.UGC]: 'UGC Link',
} as const;

/**
 * SEO লিংক টাইপ বিবরণ
 */
export const SEO_LINK_TYPE_DESCRIPTIONS: Record<SEOLinkType, string> = {
  [SEO_LINK_TYPE.INTERNAL]: 'Links that point to other pages within the same domain',
  [SEO_LINK_TYPE.EXTERNAL]: 'Links that point to pages on other domains',
  [SEO_LINK_TYPE.BACKLINK]: 'External links pointing to your website from other domains',
  [SEO_LINK_TYPE.OUTBOUND]: 'Links from your site to external websites',
  [SEO_LINK_TYPE.INBOUND]: 'Links from external websites to your site',
  [SEO_LINK_TYPE.NOFOLLOW]: 'Links with rel="nofollow" attribute, not passing link juice',
  [SEO_LINK_TYPE.DOFOLLOW]: 'Links without nofollow, passing link juice',
  [SEO_LINK_TYPE.SPONSORED]: 'Links with rel="sponsored" for paid or sponsored content',
  [SEO_LINK_TYPE.UGC]: 'Links with rel="ugc" for user-generated content',
} as const;

/**
 * SEO লিংক টাইপ আইকন
 */
export const SEO_LINK_TYPE_ICONS: Record<SEOLinkType, string> = {
  [SEO_LINK_TYPE.INTERNAL]: '🔗',
  [SEO_LINK_TYPE.EXTERNAL]: '🌐',
  [SEO_LINK_TYPE.BACKLINK]: '⬅️',
  [SEO_LINK_TYPE.OUTBOUND]: '➡️',
  [SEO_LINK_TYPE.INBOUND]: '⬅️',
  [SEO_LINK_TYPE.NOFOLLOW]: '🚫',
  [SEO_LINK_TYPE.DOFOLLOW]: '✅',
  [SEO_LINK_TYPE.SPONSORED]: '💵',
  [SEO_LINK_TYPE.UGC]: '👤',
} as const;

/**
 * SEO লিংক রিলেশনশিপ এনাম
 */
export const SEO_LINK_REL = {
  NOFOLLOW: 'nofollow',
  DOFOLLOW: 'dofollow',
  SPONSORED: 'sponsored',
  UGC: 'ugc',
  ME: 'me',
  CANONICAL: 'canonical',
  ALTERNATE: 'alternate',
  PREV: 'prev',
  NEXT: 'next',
} as const;

/**
 * SEO_LINK_REL থেকে টাইপ
 */
export type SEOLinkRel = (typeof SEO_LINK_REL)[keyof typeof SEO_LINK_REL];

/**
 * SEO লিংক রিলেশনশিপ লেবেল
 */
export const SEO_LINK_REL_LABELS: Record<SEOLinkRel, string> = {
  [SEO_LINK_REL.NOFOLLOW]: 'NoFollow',
  [SEO_LINK_REL.DOFOLLOW]: 'DoFollow',
  [SEO_LINK_REL.SPONSORED]: 'Sponsored',
  [SEO_LINK_REL.UGC]: 'UGC',
  [SEO_LINK_REL.ME]: 'ME',
  [SEO_LINK_REL.CANONICAL]: 'Canonical',
  [SEO_LINK_REL.ALTERNATE]: 'Alternate',
  [SEO_LINK_REL.PREV]: 'Previous',
  [SEO_LINK_REL.NEXT]: 'Next',
} as const;

/**
 * SEO লিংক স্ট্যাটাস এনাম
 */
export const SEO_LINK_STATUS = {
  ACTIVE: 'active',
  BROKEN: 'broken',
  REDIRECTED: 'redirected',
  NOFOLLOW: 'nofollow',
  DELETED: 'deleted',
  PENDING: 'pending',
  VERIFIED: 'verified',
} as const;

/**
 * SEO_LINK_STATUS থেকে টাইপ
 */
export type SEOLinkStatus = (typeof SEO_LINK_STATUS)[keyof typeof SEO_LINK_STATUS];

/**
 * SEO লিংক স্ট্যাটাস লেবেল
 */
export const SEO_LINK_STATUS_LABELS: Record<SEOLinkStatus, string> = {
  [SEO_LINK_STATUS.ACTIVE]: 'Active',
  [SEO_LINK_STATUS.BROKEN]: 'Broken',
  [SEO_LINK_STATUS.REDIRECTED]: 'Redirected',
  [SEO_LINK_STATUS.NOFOLLOW]: 'NoFollow',
  [SEO_LINK_STATUS.DELETED]: 'Deleted',
  [SEO_LINK_STATUS.PENDING]: 'Pending',
  [SEO_LINK_STATUS.VERIFIED]: 'Verified',
} as const;

/**
 * SEO লিংক স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_LINK_STATUS_COLORS: Record<SEOLinkStatus, string> = {
  [SEO_LINK_STATUS.ACTIVE]: '#22c55e', // Green-500
  [SEO_LINK_STATUS.BROKEN]: '#dc2626', // Red-600
  [SEO_LINK_STATUS.REDIRECTED]: '#f59e0b', // Amber-500
  [SEO_LINK_STATUS.NOFOLLOW]: '#94a3b8', // Slate-400
  [SEO_LINK_STATUS.DELETED]: '#64748b', // Slate-500
  [SEO_LINK_STATUS.PENDING]: '#3b82f6', // Blue-500
  [SEO_LINK_STATUS.VERIFIED]: '#8b5cf6', // Violet-500
} as const;

/**
 * SEO লিংক কনফিগারেশন
 */
export interface SEOLinkConfig {
  maxLength: number;
  anchorMaxLength: number;
  defaultRel: SEOLinkRel;
  enableFollowCheck: boolean;
  enableBrokenCheck: boolean;
  enableRedirectCheck: boolean;
}

/**
 * SEO লিংক ডিফল্ট কনফিগারেশন
 */
export const SEO_LINK_DEFAULT_CONFIG: SEOLinkConfig = {
  maxLength: SEO_LINK_MAX_LENGTH,
  anchorMaxLength: SEO_LINK_ANCHOR_MAX_LENGTH,
  defaultRel: SEO_LINK_DEFAULT_REL as SEOLinkRel,
  enableFollowCheck: true,
  enableBrokenCheck: true,
  enableRedirectCheck: true,
} as const;

/**
 * SEO লিংক ডেটা
 */
export interface SEOLinkData {
  id: string;
  url: string;
  anchorText: string;
  type: SEOLinkType;
  rel: SEOLinkRel;
  status: SEOLinkStatus;
  source: string;
  target: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * SEO লিংক ফিল্টার
 */
export interface SEOLinkFilter {
  type?: SEOLinkType;
  rel?: SEOLinkRel;
  status?: SEOLinkStatus;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * SEO লিংক রেজাল্ট
 */
export interface SEOLinkResult {
  data: SEOLinkData[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * SEO লিংক স্কোর থ্রেশহোল্ড
 */
export const SEO_LINK_SCORE_THRESHOLDS = {
  POOR: 0,
  FAIR: 40,
  GOOD: 60,
  EXCELLENT: 80,
  PERFECT: 90,
} as const;

/**
 * SEO লিংক স্কোর ক্যাটাগরি
 */
export const SEO_LINK_SCORE_CATEGORIES = {
  POOR: 'poor',
  FAIR: 'fair',
  GOOD: 'good',
  EXCELLENT: 'excellent',
  PERFECT: 'perfect',
} as const;

/**
 * SEO_LINK_SCORE_CATEGORIES থেকে টাইপ
 */
export type SEOLinkScoreCategory =
  (typeof SEO_LINK_SCORE_CATEGORIES)[keyof typeof SEO_LINK_SCORE_CATEGORIES];

/**
 * SEO লিংক স্কোর ক্যাটাগরি লেবেল
 */
export const SEO_LINK_SCORE_CATEGORY_LABELS: Record<SEOLinkScoreCategory, string> = {
  [SEO_LINK_SCORE_CATEGORIES.POOR]: 'Poor',
  [SEO_LINK_SCORE_CATEGORIES.FAIR]: 'Fair',
  [SEO_LINK_SCORE_CATEGORIES.GOOD]: 'Good',
  [SEO_LINK_SCORE_CATEGORIES.EXCELLENT]: 'Excellent',
  [SEO_LINK_SCORE_CATEGORIES.PERFECT]: 'Perfect',
} as const;

/**
 * SEO লিংক স্কোর ক্যাটাগরি থ্রেশহোল্ড ম্যাপিং
 */
export const SEO_LINK_SCORE_CATEGORY_THRESHOLDS: Record<SEOLinkScoreCategory, number> = {
  [SEO_LINK_SCORE_CATEGORIES.POOR]: SEO_LINK_SCORE_THRESHOLDS.POOR,
  [SEO_LINK_SCORE_CATEGORIES.FAIR]: SEO_LINK_SCORE_THRESHOLDS.FAIR,
  [SEO_LINK_SCORE_CATEGORIES.GOOD]: SEO_LINK_SCORE_THRESHOLDS.GOOD,
  [SEO_LINK_SCORE_CATEGORIES.EXCELLENT]: SEO_LINK_SCORE_THRESHOLDS.EXCELLENT,
  [SEO_LINK_SCORE_CATEGORIES.PERFECT]: SEO_LINK_SCORE_THRESHOLDS.PERFECT,
} as const;
