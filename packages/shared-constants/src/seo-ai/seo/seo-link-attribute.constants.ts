/**
 * SEO লিংক অ্যাট্রিবিউট এনাম
 */
export const SEO_LINK_ATTRIBUTE = {
  REL_NOFOLLOW: 'rel-nofollow',
  REL_DOFOLLOW: 'rel-dofollow',
  REL_SPONSORED: 'rel-sponsored',
  REL_UGC: 'rel-ugc',
  TARGET_BLANK: 'target-blank',
  TARGET_SELF: 'target-self',
} as const;

/**
 * SEO_LINK_ATTRIBUTE থেকে টাইপ
 */
export type SEOLinkAttribute = (typeof SEO_LINK_ATTRIBUTE)[keyof typeof SEO_LINK_ATTRIBUTE];

/**
 * SEO লিংক অ্যাট্রিবিউট লেবেল
 */
export const SEO_LINK_ATTRIBUTE_LABELS: Record<SEOLinkAttribute, string> = {
  [SEO_LINK_ATTRIBUTE.REL_NOFOLLOW]: 'rel="nofollow"',
  [SEO_LINK_ATTRIBUTE.REL_DOFOLLOW]: 'rel="dofollow"',
  [SEO_LINK_ATTRIBUTE.REL_SPONSORED]: 'rel="sponsored"',
  [SEO_LINK_ATTRIBUTE.REL_UGC]: 'rel="ugc"',
  [SEO_LINK_ATTRIBUTE.TARGET_BLANK]: 'target="_blank"',
  [SEO_LINK_ATTRIBUTE.TARGET_SELF]: 'target="_self"',
} as const;

/**
 * SEO লিংক অ্যাট্রিবিউট বিবরণ
 */
export const SEO_LINK_ATTRIBUTE_DESCRIPTIONS: Record<SEOLinkAttribute, string> = {
  [SEO_LINK_ATTRIBUTE.REL_NOFOLLOW]:
    'Instructs search engines not to pass link juice or follow the link',
  [SEO_LINK_ATTRIBUTE.REL_DOFOLLOW]: 'Allows search engines to follow the link and pass link juice',
  [SEO_LINK_ATTRIBUTE.REL_SPONSORED]: 'Indicates the link is sponsored or paid content',
  [SEO_LINK_ATTRIBUTE.REL_UGC]: 'Indicates the link is from user-generated content',
  [SEO_LINK_ATTRIBUTE.TARGET_BLANK]: 'Opens the link in a new browser tab or window',
  [SEO_LINK_ATTRIBUTE.TARGET_SELF]: 'Opens the link in the same browser tab',
} as const;

/**
 * SEO লিংক অ্যাট্রিবিউট আইকন
 */
export const SEO_LINK_ATTRIBUTE_ICONS: Record<SEOLinkAttribute, string> = {
  [SEO_LINK_ATTRIBUTE.REL_NOFOLLOW]: '🚫',
  [SEO_LINK_ATTRIBUTE.REL_DOFOLLOW]: '✅',
  [SEO_LINK_ATTRIBUTE.REL_SPONSORED]: '💵',
  [SEO_LINK_ATTRIBUTE.REL_UGC]: '👤',
  [SEO_LINK_ATTRIBUTE.TARGET_BLANK]: '🔄',
  [SEO_LINK_ATTRIBUTE.TARGET_SELF]: '📍',
} as const;

/**
 * SEO লিংক অ্যাট্রিবিউট কালার (হেক্স কোড)
 */
export const SEO_LINK_ATTRIBUTE_COLORS: Record<SEOLinkAttribute, string> = {
  [SEO_LINK_ATTRIBUTE.REL_NOFOLLOW]: '#94a3b8', // Slate-400
  [SEO_LINK_ATTRIBUTE.REL_DOFOLLOW]: '#22c55e', // Green-500
  [SEO_LINK_ATTRIBUTE.REL_SPONSORED]: '#f97316', // Orange-500
  [SEO_LINK_ATTRIBUTE.REL_UGC]: '#8b5cf6', // Violet-500
  [SEO_LINK_ATTRIBUTE.TARGET_BLANK]: '#3b82f6', // Blue-500
  [SEO_LINK_ATTRIBUTE.TARGET_SELF]: '#64748b', // Slate-500
} as const;

/**
 * SEO লিংক অ্যাট্রিবিউট ক্যাটাগরি
 */
export const SEO_LINK_ATTRIBUTE_CATEGORY = {
  REL: 'rel',
  TARGET: 'target',
} as const;

/**
 * SEO_LINK_ATTRIBUTE_CATEGORY থেকে টাইপ
 */
export type SEOLinkAttributeCategory =
  (typeof SEO_LINK_ATTRIBUTE_CATEGORY)[keyof typeof SEO_LINK_ATTRIBUTE_CATEGORY];

/**
 * SEO লিংক অ্যাট্রিবিউট ক্যাটাগরি লেবেল
 */
export const SEO_LINK_ATTRIBUTE_CATEGORY_LABELS: Record<SEOLinkAttributeCategory, string> = {
  [SEO_LINK_ATTRIBUTE_CATEGORY.REL]: 'Relationship Attribute',
  [SEO_LINK_ATTRIBUTE_CATEGORY.TARGET]: 'Target Attribute',
} as const;

/**
 * SEO লিংক অ্যাট্রিবিউট ক্যাটাগরি ম্যাপিং
 */
export const SEO_LINK_ATTRIBUTE_CATEGORY_MAP: Record<SEOLinkAttribute, SEOLinkAttributeCategory> = {
  [SEO_LINK_ATTRIBUTE.REL_NOFOLLOW]: SEO_LINK_ATTRIBUTE_CATEGORY.REL,
  [SEO_LINK_ATTRIBUTE.REL_DOFOLLOW]: SEO_LINK_ATTRIBUTE_CATEGORY.REL,
  [SEO_LINK_ATTRIBUTE.REL_SPONSORED]: SEO_LINK_ATTRIBUTE_CATEGORY.REL,
  [SEO_LINK_ATTRIBUTE.REL_UGC]: SEO_LINK_ATTRIBUTE_CATEGORY.REL,
  [SEO_LINK_ATTRIBUTE.TARGET_BLANK]: SEO_LINK_ATTRIBUTE_CATEGORY.TARGET,
  [SEO_LINK_ATTRIBUTE.TARGET_SELF]: SEO_LINK_ATTRIBUTE_CATEGORY.TARGET,
} as const;

/**
 * SEO লিংক অ্যাট্রিবিউট কনফিগারেশন
 */
export interface SEOLinkAttributeConfig {
  attribute: SEOLinkAttribute;
  label: string;
  description: string;
  icon: string;
  color: string;
  category: SEOLinkAttributeCategory;
  passesLinkJuice: boolean;
  isDefault: boolean;
  order: number;
}

/**
 * SEO লিংক অ্যাট্রিবিউট মেটাডেটা
 */
export const SEO_LINK_ATTRIBUTE_METADATA: Record<SEOLinkAttribute, SEOLinkAttributeConfig> = {
  [SEO_LINK_ATTRIBUTE.REL_NOFOLLOW]: {
    attribute: SEO_LINK_ATTRIBUTE.REL_NOFOLLOW,
    label: SEO_LINK_ATTRIBUTE_LABELS[SEO_LINK_ATTRIBUTE.REL_NOFOLLOW],
    description: SEO_LINK_ATTRIBUTE_DESCRIPTIONS[SEO_LINK_ATTRIBUTE.REL_NOFOLLOW],
    icon: SEO_LINK_ATTRIBUTE_ICONS[SEO_LINK_ATTRIBUTE.REL_NOFOLLOW],
    color: SEO_LINK_ATTRIBUTE_COLORS[SEO_LINK_ATTRIBUTE.REL_NOFOLLOW],
    category: SEO_LINK_ATTRIBUTE_CATEGORY_MAP[SEO_LINK_ATTRIBUTE.REL_NOFOLLOW],
    passesLinkJuice: false,
    isDefault: false,
    order: 0,
  },
  [SEO_LINK_ATTRIBUTE.REL_DOFOLLOW]: {
    attribute: SEO_LINK_ATTRIBUTE.REL_DOFOLLOW,
    label: SEO_LINK_ATTRIBUTE_LABELS[SEO_LINK_ATTRIBUTE.REL_DOFOLLOW],
    description: SEO_LINK_ATTRIBUTE_DESCRIPTIONS[SEO_LINK_ATTRIBUTE.REL_DOFOLLOW],
    icon: SEO_LINK_ATTRIBUTE_ICONS[SEO_LINK_ATTRIBUTE.REL_DOFOLLOW],
    color: SEO_LINK_ATTRIBUTE_COLORS[SEO_LINK_ATTRIBUTE.REL_DOFOLLOW],
    category: SEO_LINK_ATTRIBUTE_CATEGORY_MAP[SEO_LINK_ATTRIBUTE.REL_DOFOLLOW],
    passesLinkJuice: true,
    isDefault: true,
    order: 1,
  },
  [SEO_LINK_ATTRIBUTE.REL_SPONSORED]: {
    attribute: SEO_LINK_ATTRIBUTE.REL_SPONSORED,
    label: SEO_LINK_ATTRIBUTE_LABELS[SEO_LINK_ATTRIBUTE.REL_SPONSORED],
    description: SEO_LINK_ATTRIBUTE_DESCRIPTIONS[SEO_LINK_ATTRIBUTE.REL_SPONSORED],
    icon: SEO_LINK_ATTRIBUTE_ICONS[SEO_LINK_ATTRIBUTE.REL_SPONSORED],
    color: SEO_LINK_ATTRIBUTE_COLORS[SEO_LINK_ATTRIBUTE.REL_SPONSORED],
    category: SEO_LINK_ATTRIBUTE_CATEGORY_MAP[SEO_LINK_ATTRIBUTE.REL_SPONSORED],
    passesLinkJuice: false,
    isDefault: false,
    order: 2,
  },
  [SEO_LINK_ATTRIBUTE.REL_UGC]: {
    attribute: SEO_LINK_ATTRIBUTE.REL_UGC,
    label: SEO_LINK_ATTRIBUTE_LABELS[SEO_LINK_ATTRIBUTE.REL_UGC],
    description: SEO_LINK_ATTRIBUTE_DESCRIPTIONS[SEO_LINK_ATTRIBUTE.REL_UGC],
    icon: SEO_LINK_ATTRIBUTE_ICONS[SEO_LINK_ATTRIBUTE.REL_UGC],
    color: SEO_LINK_ATTRIBUTE_COLORS[SEO_LINK_ATTRIBUTE.REL_UGC],
    category: SEO_LINK_ATTRIBUTE_CATEGORY_MAP[SEO_LINK_ATTRIBUTE.REL_UGC],
    passesLinkJuice: false,
    isDefault: false,
    order: 3,
  },
  [SEO_LINK_ATTRIBUTE.TARGET_BLANK]: {
    attribute: SEO_LINK_ATTRIBUTE.TARGET_BLANK,
    label: SEO_LINK_ATTRIBUTE_LABELS[SEO_LINK_ATTRIBUTE.TARGET_BLANK],
    description: SEO_LINK_ATTRIBUTE_DESCRIPTIONS[SEO_LINK_ATTRIBUTE.TARGET_BLANK],
    icon: SEO_LINK_ATTRIBUTE_ICONS[SEO_LINK_ATTRIBUTE.TARGET_BLANK],
    color: SEO_LINK_ATTRIBUTE_COLORS[SEO_LINK_ATTRIBUTE.TARGET_BLANK],
    category: SEO_LINK_ATTRIBUTE_CATEGORY_MAP[SEO_LINK_ATTRIBUTE.TARGET_BLANK],
    passesLinkJuice: true,
    isDefault: false,
    order: 4,
  },
  [SEO_LINK_ATTRIBUTE.TARGET_SELF]: {
    attribute: SEO_LINK_ATTRIBUTE.TARGET_SELF,
    label: SEO_LINK_ATTRIBUTE_LABELS[SEO_LINK_ATTRIBUTE.TARGET_SELF],
    description: SEO_LINK_ATTRIBUTE_DESCRIPTIONS[SEO_LINK_ATTRIBUTE.TARGET_SELF],
    icon: SEO_LINK_ATTRIBUTE_ICONS[SEO_LINK_ATTRIBUTE.TARGET_SELF],
    color: SEO_LINK_ATTRIBUTE_COLORS[SEO_LINK_ATTRIBUTE.TARGET_SELF],
    category: SEO_LINK_ATTRIBUTE_CATEGORY_MAP[SEO_LINK_ATTRIBUTE.TARGET_SELF],
    passesLinkJuice: true,
    isDefault: true,
    order: 5,
  },
} as const;

/**
 * SEO লিংক অ্যাট্রিবিউট গ্রুপ
 */
export const SEO_LINK_ATTRIBUTE_GROUPS = {
  REL: [
    SEO_LINK_ATTRIBUTE.REL_NOFOLLOW,
    SEO_LINK_ATTRIBUTE.REL_DOFOLLOW,
    SEO_LINK_ATTRIBUTE.REL_SPONSORED,
    SEO_LINK_ATTRIBUTE.REL_UGC,
  ] as const,
  TARGET: [SEO_LINK_ATTRIBUTE.TARGET_BLANK, SEO_LINK_ATTRIBUTE.TARGET_SELF] as const,
} as const;

/**
 * SEO লিংক অ্যাট্রিবিউট গ্রুপ লেবেল
 */
export const SEO_LINK_ATTRIBUTE_GROUP_LABELS = {
  REL: 'Relationship Attributes',
  TARGET: 'Target Attributes',
} as const;

/**
 * SEO লিংক অ্যাট্রিবিউট গ্রুপ কালার
 */
export const SEO_LINK_ATTRIBUTE_GROUP_COLORS = {
  REL: '#8b5cf6',
  TARGET: '#3b82f6',
} as const;
