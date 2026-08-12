/**
 * SEO লিংক টাইপ এনাম
 */
export const SEO_LINK_TYPE = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  BACKLINK: 'backlink',
  OUTBOUND: 'outbound',
  INBOUND: 'inbound',
  AFFILIATE: 'affiliate',
  NOFOLLOW: 'nofollow',
  DOFOLLOW: 'dofollow',
  SPONSORED: 'sponsored',
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
  [SEO_LINK_TYPE.AFFILIATE]: 'Affiliate Link',
  [SEO_LINK_TYPE.NOFOLLOW]: 'NoFollow Link',
  [SEO_LINK_TYPE.DOFOLLOW]: 'DoFollow Link',
  [SEO_LINK_TYPE.SPONSORED]: 'Sponsored Link',
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
  [SEO_LINK_TYPE.AFFILIATE]: 'Links with affiliate tracking codes for commission tracking',
  [SEO_LINK_TYPE.NOFOLLOW]: 'Links with rel="nofollow" attribute, not passing link juice',
  [SEO_LINK_TYPE.DOFOLLOW]: 'Links without nofollow, passing link juice to target',
  [SEO_LINK_TYPE.SPONSORED]: 'Links with rel="sponsored" for paid or sponsored content',
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
  [SEO_LINK_TYPE.AFFILIATE]: '💰',
  [SEO_LINK_TYPE.NOFOLLOW]: '🚫',
  [SEO_LINK_TYPE.DOFOLLOW]: '✅',
  [SEO_LINK_TYPE.SPONSORED]: '💵',
} as const;

/**
 * SEO লিংক টাইপ কালার (হেক্স কোড)
 */
export const SEO_LINK_TYPE_COLORS: Record<SEOLinkType, string> = {
  [SEO_LINK_TYPE.INTERNAL]: '#3b82f6', // Blue-500
  [SEO_LINK_TYPE.EXTERNAL]: '#8b5cf6', // Violet-500
  [SEO_LINK_TYPE.BACKLINK]: '#22c55e', // Green-500
  [SEO_LINK_TYPE.OUTBOUND]: '#f59e0b', // Amber-500
  [SEO_LINK_TYPE.INBOUND]: '#06b6d4', // Cyan-500
  [SEO_LINK_TYPE.AFFILIATE]: '#ec4899', // Pink-500
  [SEO_LINK_TYPE.NOFOLLOW]: '#94a3b8', // Slate-400
  [SEO_LINK_TYPE.DOFOLLOW]: '#22d3ee', // Cyan-400
  [SEO_LINK_TYPE.SPONSORED]: '#f97316', // Orange-500
} as const;

/**
 * SEO লিংক টাইপ ভ্যালু স্কোর (০-১০০)
 */
export const SEO_LINK_TYPE_VALUE_SCORE: Record<SEOLinkType, number> = {
  [SEO_LINK_TYPE.INTERNAL]: 70,
  [SEO_LINK_TYPE.EXTERNAL]: 50,
  [SEO_LINK_TYPE.BACKLINK]: 90,
  [SEO_LINK_TYPE.OUTBOUND]: 40,
  [SEO_LINK_TYPE.INBOUND]: 85,
  [SEO_LINK_TYPE.AFFILIATE]: 30,
  [SEO_LINK_TYPE.NOFOLLOW]: 10,
  [SEO_LINK_TYPE.DOFOLLOW]: 80,
  [SEO_LINK_TYPE.SPONSORED]: 20,
} as const;

/**
 * SEO লিংক টাইপ কনফিগারেশন
 */
export interface SEOLinkTypeConfig {
  type: SEOLinkType;
  label: string;
  description: string;
  icon: string;
  color: string;
  valueScore: number;
  passesLinkJuice: boolean;
  isAffiliate: boolean;
  isSponsored: boolean;
  isInternal: boolean;
  order: number;
}

/**
 * SEO লিংক টাইপ মেটাডেটা
 */
export const SEO_LINK_TYPE_METADATA: Record<SEOLinkType, SEOLinkTypeConfig> = {
  [SEO_LINK_TYPE.INTERNAL]: {
    type: SEO_LINK_TYPE.INTERNAL,
    label: SEO_LINK_TYPE_LABELS[SEO_LINK_TYPE.INTERNAL],
    description: SEO_LINK_TYPE_DESCRIPTIONS[SEO_LINK_TYPE.INTERNAL],
    icon: SEO_LINK_TYPE_ICONS[SEO_LINK_TYPE.INTERNAL],
    color: SEO_LINK_TYPE_COLORS[SEO_LINK_TYPE.INTERNAL],
    valueScore: SEO_LINK_TYPE_VALUE_SCORE[SEO_LINK_TYPE.INTERNAL],
    passesLinkJuice: true,
    isAffiliate: false,
    isSponsored: false,
    isInternal: true,
    order: 0,
  },
  [SEO_LINK_TYPE.EXTERNAL]: {
    type: SEO_LINK_TYPE.EXTERNAL,
    label: SEO_LINK_TYPE_LABELS[SEO_LINK_TYPE.EXTERNAL],
    description: SEO_LINK_TYPE_DESCRIPTIONS[SEO_LINK_TYPE.EXTERNAL],
    icon: SEO_LINK_TYPE_ICONS[SEO_LINK_TYPE.EXTERNAL],
    color: SEO_LINK_TYPE_COLORS[SEO_LINK_TYPE.EXTERNAL],
    valueScore: SEO_LINK_TYPE_VALUE_SCORE[SEO_LINK_TYPE.EXTERNAL],
    passesLinkJuice: true,
    isAffiliate: false,
    isSponsored: false,
    isInternal: false,
    order: 1,
  },
  [SEO_LINK_TYPE.BACKLINK]: {
    type: SEO_LINK_TYPE.BACKLINK,
    label: SEO_LINK_TYPE_LABELS[SEO_LINK_TYPE.BACKLINK],
    description: SEO_LINK_TYPE_DESCRIPTIONS[SEO_LINK_TYPE.BACKLINK],
    icon: SEO_LINK_TYPE_ICONS[SEO_LINK_TYPE.BACKLINK],
    color: SEO_LINK_TYPE_COLORS[SEO_LINK_TYPE.BACKLINK],
    valueScore: SEO_LINK_TYPE_VALUE_SCORE[SEO_LINK_TYPE.BACKLINK],
    passesLinkJuice: true,
    isAffiliate: false,
    isSponsored: false,
    isInternal: false,
    order: 2,
  },
  [SEO_LINK_TYPE.OUTBOUND]: {
    type: SEO_LINK_TYPE.OUTBOUND,
    label: SEO_LINK_TYPE_LABELS[SEO_LINK_TYPE.OUTBOUND],
    description: SEO_LINK_TYPE_DESCRIPTIONS[SEO_LINK_TYPE.OUTBOUND],
    icon: SEO_LINK_TYPE_ICONS[SEO_LINK_TYPE.OUTBOUND],
    color: SEO_LINK_TYPE_COLORS[SEO_LINK_TYPE.OUTBOUND],
    valueScore: SEO_LINK_TYPE_VALUE_SCORE[SEO_LINK_TYPE.OUTBOUND],
    passesLinkJuice: true,
    isAffiliate: false,
    isSponsored: false,
    isInternal: false,
    order: 3,
  },
  [SEO_LINK_TYPE.INBOUND]: {
    type: SEO_LINK_TYPE.INBOUND,
    label: SEO_LINK_TYPE_LABELS[SEO_LINK_TYPE.INBOUND],
    description: SEO_LINK_TYPE_DESCRIPTIONS[SEO_LINK_TYPE.INBOUND],
    icon: SEO_LINK_TYPE_ICONS[SEO_LINK_TYPE.INBOUND],
    color: SEO_LINK_TYPE_COLORS[SEO_LINK_TYPE.INBOUND],
    valueScore: SEO_LINK_TYPE_VALUE_SCORE[SEO_LINK_TYPE.INBOUND],
    passesLinkJuice: true,
    isAffiliate: false,
    isSponsored: false,
    isInternal: false,
    order: 4,
  },
  [SEO_LINK_TYPE.AFFILIATE]: {
    type: SEO_LINK_TYPE.AFFILIATE,
    label: SEO_LINK_TYPE_LABELS[SEO_LINK_TYPE.AFFILIATE],
    description: SEO_LINK_TYPE_DESCRIPTIONS[SEO_LINK_TYPE.AFFILIATE],
    icon: SEO_LINK_TYPE_ICONS[SEO_LINK_TYPE.AFFILIATE],
    color: SEO_LINK_TYPE_COLORS[SEO_LINK_TYPE.AFFILIATE],
    valueScore: SEO_LINK_TYPE_VALUE_SCORE[SEO_LINK_TYPE.AFFILIATE],
    passesLinkJuice: true,
    isAffiliate: true,
    isSponsored: false,
    isInternal: false,
    order: 5,
  },
  [SEO_LINK_TYPE.NOFOLLOW]: {
    type: SEO_LINK_TYPE.NOFOLLOW,
    label: SEO_LINK_TYPE_LABELS[SEO_LINK_TYPE.NOFOLLOW],
    description: SEO_LINK_TYPE_DESCRIPTIONS[SEO_LINK_TYPE.NOFOLLOW],
    icon: SEO_LINK_TYPE_ICONS[SEO_LINK_TYPE.NOFOLLOW],
    color: SEO_LINK_TYPE_COLORS[SEO_LINK_TYPE.NOFOLLOW],
    valueScore: SEO_LINK_TYPE_VALUE_SCORE[SEO_LINK_TYPE.NOFOLLOW],
    passesLinkJuice: false,
    isAffiliate: false,
    isSponsored: false,
    isInternal: false,
    order: 6,
  },
  [SEO_LINK_TYPE.DOFOLLOW]: {
    type: SEO_LINK_TYPE.DOFOLLOW,
    label: SEO_LINK_TYPE_LABELS[SEO_LINK_TYPE.DOFOLLOW],
    description: SEO_LINK_TYPE_DESCRIPTIONS[SEO_LINK_TYPE.DOFOLLOW],
    icon: SEO_LINK_TYPE_ICONS[SEO_LINK_TYPE.DOFOLLOW],
    color: SEO_LINK_TYPE_COLORS[SEO_LINK_TYPE.DOFOLLOW],
    valueScore: SEO_LINK_TYPE_VALUE_SCORE[SEO_LINK_TYPE.DOFOLLOW],
    passesLinkJuice: true,
    isAffiliate: false,
    isSponsored: false,
    isInternal: false,
    order: 7,
  },
  [SEO_LINK_TYPE.SPONSORED]: {
    type: SEO_LINK_TYPE.SPONSORED,
    label: SEO_LINK_TYPE_LABELS[SEO_LINK_TYPE.SPONSORED],
    description: SEO_LINK_TYPE_DESCRIPTIONS[SEO_LINK_TYPE.SPONSORED],
    icon: SEO_LINK_TYPE_ICONS[SEO_LINK_TYPE.SPONSORED],
    color: SEO_LINK_TYPE_COLORS[SEO_LINK_TYPE.SPONSORED],
    valueScore: SEO_LINK_TYPE_VALUE_SCORE[SEO_LINK_TYPE.SPONSORED],
    passesLinkJuice: false,
    isAffiliate: false,
    isSponsored: true,
    isInternal: false,
    order: 8,
  },
} as const;

/**
 * SEO লিংক টাইপ গ্রুপ
 */
export const SEO_LINK_TYPE_GROUPS = {
  DIRECTION: [
    SEO_LINK_TYPE.INTERNAL,
    SEO_LINK_TYPE.EXTERNAL,
    SEO_LINK_TYPE.OUTBOUND,
    SEO_LINK_TYPE.INBOUND,
  ] as const,
  QUALITY: [SEO_LINK_TYPE.BACKLINK, SEO_LINK_TYPE.DOFOLLOW] as const,
  ATTRIBUTE: [SEO_LINK_TYPE.NOFOLLOW, SEO_LINK_TYPE.SPONSORED, SEO_LINK_TYPE.AFFILIATE] as const,
} as const;

/**
 * SEO লিংক টাইপ গ্রুপ লেবেল
 */
export const SEO_LINK_TYPE_GROUP_LABELS = {
  DIRECTION: 'Link Direction',
  QUALITY: 'Link Quality',
  ATTRIBUTE: 'Link Attributes',
} as const;

/**
 * SEO লিংক টাইপ গ্রুপ কালার
 */
export const SEO_LINK_TYPE_GROUP_COLORS = {
  DIRECTION: '#3b82f6',
  QUALITY: '#22c55e',
  ATTRIBUTE: '#f59e0b',
} as const;
