/**
 * এডিটোরিয়াল (সম্পাদকীয়) কন্টেন্ট সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * এডিটোরিয়াল টাইপ
 */
export enum EditorialType {
  COLLECTION = 'collection',
  FEATURED = 'featured',
  STAFF_PICKS = 'staff_picks',
  EXCLUSIVE = 'exclusive',
}

/**
 * এডিটোরিয়াল স্ট্যাটাস
 */
export enum EditorialStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  SCHEDULED = 'scheduled',
}

/**
 * এডিটোরিয়াল টাইপ লেবেলসমূহ (বাংলায়)
 */
export const EDITORIAL_TYPE_LABELS_BN: Record<EditorialType, string> = {
  [EditorialType.COLLECTION]: 'সংকলন',
  [EditorialType.FEATURED]: 'বিশেষ',
  [EditorialType.STAFF_PICKS]: 'স্টাফ পিক',
  [EditorialType.EXCLUSIVE]: 'এক্সক্লুসিভ',
} as const;

/**
 * এডিটোরিয়াল টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const EDITORIAL_TYPE_LABELS_EN: Record<EditorialType, string> = {
  [EditorialType.COLLECTION]: 'Collection',
  [EditorialType.FEATURED]: 'Featured',
  [EditorialType.STAFF_PICKS]: 'Staff Picks',
  [EditorialType.EXCLUSIVE]: 'Exclusive',
} as const;

/**
 * এডিটোরিয়াল টাইপ বিবরণ (বাংলায়)
 */
export const EDITORIAL_TYPE_DESCRIPTIONS_BN: Record<EditorialType, string> = {
  [EditorialType.COLLECTION]: 'থিম ভিত্তিক পণ্যের সংকলন',
  [EditorialType.FEATURED]: 'বিশেষভাবে প্রদর্শিত পণ্য',
  [EditorialType.STAFF_PICKS]: 'দল দ্বারা নির্বাচিত পণ্য',
  [EditorialType.EXCLUSIVE]: 'এক্সক্লুসিভ পণ্য সমূহ',
} as const;

/**
 * এডিটোরিয়াল টাইপ বিবরণ (ইংরেজিতে)
 */
export const EDITORIAL_TYPE_DESCRIPTIONS_EN: Record<EditorialType, string> = {
  [EditorialType.COLLECTION]: 'Theme-based product collection',
  [EditorialType.FEATURED]: 'Specially featured products',
  [EditorialType.STAFF_PICKS]: 'Team selected products',
  [EditorialType.EXCLUSIVE]: 'Exclusive products',
} as const;

/**
 * এডিটোরিয়াল স্ট্যাটাস লেবেলসমূহ (বাংলায়)
 */
export const EDITORIAL_STATUS_LABELS_BN: Record<EditorialStatus, string> = {
  [EditorialStatus.DRAFT]: 'খসড়া',
  [EditorialStatus.PUBLISHED]: 'প্রকাশিত',
  [EditorialStatus.ARCHIVED]: 'আর্কাইভ',
  [EditorialStatus.SCHEDULED]: 'শিডিউল করা',
} as const;

/**
 * এডিটোরিয়াল স্ট্যাটাস লেবেলসমূহ (ইংরেজিতে)
 */
export const EDITORIAL_STATUS_LABELS_EN: Record<EditorialStatus, string> = {
  [EditorialStatus.DRAFT]: 'Draft',
  [EditorialStatus.PUBLISHED]: 'Published',
  [EditorialStatus.ARCHIVED]: 'Archived',
  [EditorialStatus.SCHEDULED]: 'Scheduled',
} as const;

/**
 * এডিটোরিয়াল স্ট্যাটাস রং
 */
export const EDITORIAL_STATUS_COLORS: Record<EditorialStatus, string> = {
  [EditorialStatus.DRAFT]: '#6B7280',
  [EditorialStatus.PUBLISHED]: '#10B981',
  [EditorialStatus.ARCHIVED]: '#6B7280',
  [EditorialStatus.SCHEDULED]: '#F59E0B',
} as const;

/**
 * ডিফল্ট প্রদর্শন সংখ্যা
 */
export const DEFAULT_EDITORIAL_DISPLAY_COUNT = 6;

/**
 * সর্বোচ্চ প্রদর্শন সংখ্যা
 */
export const MAX_EDITORIAL_DISPLAY_COUNT = 20;

/**
 * ন্যূনতম প্রদর্শন সংখ্যা
 */
export const MIN_EDITORIAL_DISPLAY_COUNT = 1;

/**
 * ক্যাশের সময় (সেকেন্ডে)
 */
export const EDITORIAL_CACHE_TTL_SECONDS = 3600;

/**
 * ডিফল্ট এডিটোরিয়াল টাইপ
 */
export const DEFAULT_EDITORIAL_TYPE = EditorialType.COLLECTION;

/**
 * এডিটোরিয়াল টাইপের ভ্যালু সমূহ
 */
export const EDITORIAL_TYPE_VALUES = Object.values(EditorialType) as readonly EditorialType[];

/**
 * এডিটোরিয়াল স্ট্যাটাসের ভ্যালু সমূহ
 */
export const EDITORIAL_STATUS_VALUES = Object.values(EditorialStatus) as readonly EditorialStatus[];

/**
 * এডিটোরিয়াল কনফিগারেশন টাইপ
 */
export type EditorialConfig = {
  type: EditorialType;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  descriptionEn: string;
  defaultDisplayCount: number;
  maxDisplayCount: number;
  cacheTTL: number;
  enabled: boolean;
};

/**
 * এডিটোরিয়াল কনফিগারেশনসমূহ
 */
export const EDITORIAL_CONFIGS: Record<EditorialType, EditorialConfig> = {
  [EditorialType.COLLECTION]: {
    type: EditorialType.COLLECTION,
    labelBn: EDITORIAL_TYPE_LABELS_BN[EditorialType.COLLECTION],
    labelEn: EDITORIAL_TYPE_LABELS_EN[EditorialType.COLLECTION],
    descriptionBn: EDITORIAL_TYPE_DESCRIPTIONS_BN[EditorialType.COLLECTION],
    descriptionEn: EDITORIAL_TYPE_DESCRIPTIONS_EN[EditorialType.COLLECTION],
    defaultDisplayCount: DEFAULT_EDITORIAL_DISPLAY_COUNT,
    maxDisplayCount: MAX_EDITORIAL_DISPLAY_COUNT,
    cacheTTL: EDITORIAL_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [EditorialType.FEATURED]: {
    type: EditorialType.FEATURED,
    labelBn: EDITORIAL_TYPE_LABELS_BN[EditorialType.FEATURED],
    labelEn: EDITORIAL_TYPE_LABELS_EN[EditorialType.FEATURED],
    descriptionBn: EDITORIAL_TYPE_DESCRIPTIONS_BN[EditorialType.FEATURED],
    descriptionEn: EDITORIAL_TYPE_DESCRIPTIONS_EN[EditorialType.FEATURED],
    defaultDisplayCount: DEFAULT_EDITORIAL_DISPLAY_COUNT,
    maxDisplayCount: MAX_EDITORIAL_DISPLAY_COUNT,
    cacheTTL: EDITORIAL_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [EditorialType.STAFF_PICKS]: {
    type: EditorialType.STAFF_PICKS,
    labelBn: EDITORIAL_TYPE_LABELS_BN[EditorialType.STAFF_PICKS],
    labelEn: EDITORIAL_TYPE_LABELS_EN[EditorialType.STAFF_PICKS],
    descriptionBn: EDITORIAL_TYPE_DESCRIPTIONS_BN[EditorialType.STAFF_PICKS],
    descriptionEn: EDITORIAL_TYPE_DESCRIPTIONS_EN[EditorialType.STAFF_PICKS],
    defaultDisplayCount: DEFAULT_EDITORIAL_DISPLAY_COUNT,
    maxDisplayCount: MAX_EDITORIAL_DISPLAY_COUNT,
    cacheTTL: EDITORIAL_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [EditorialType.EXCLUSIVE]: {
    type: EditorialType.EXCLUSIVE,
    labelBn: EDITORIAL_TYPE_LABELS_BN[EditorialType.EXCLUSIVE],
    labelEn: EDITORIAL_TYPE_LABELS_EN[EditorialType.EXCLUSIVE],
    descriptionBn: EDITORIAL_TYPE_DESCRIPTIONS_BN[EditorialType.EXCLUSIVE],
    descriptionEn: EDITORIAL_TYPE_DESCRIPTIONS_EN[EditorialType.EXCLUSIVE],
    defaultDisplayCount: DEFAULT_EDITORIAL_DISPLAY_COUNT,
    maxDisplayCount: MAX_EDITORIAL_DISPLAY_COUNT,
    cacheTTL: EDITORIAL_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * এডিটোরিয়াল আইটেম টাইপ
 */
export type EditorialItem = {
  id: string;
  type: EditorialType;
  status: EditorialStatus;
  title: string;
  description?: string;
  items: string[];
  scheduledDate?: Date;
  publishedDate?: Date;
  metadata?: Record<string, unknown>;
};

/**
 * এডিটোরিয়াল রেসপন্স টাইপ
 */
export type EditorialResponse = {
  items: EditorialItem[];
  total: number;
  type: EditorialType;
  took: number;
  cache: boolean;
};

/**
 * এডিটোরিয়াল এরর মেসেজসমূহ
 */
export const EDITORIAL_ERROR_MESSAGES = {
  INVALID_TYPE: 'এডিটোরিয়াল টাইপ সঠিক নয়',
  INVALID_STATUS: 'এডিটোরিয়াল স্ট্যাটাস সঠিক নয়',
  INVALID_COUNT: `প্রদর্শন সংখ্যা ${MIN_EDITORIAL_DISPLAY_COUNT} থেকে ${MAX_EDITORIAL_DISPLAY_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `প্রদর্শন সংখ্যা ${MIN_EDITORIAL_DISPLAY_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `প্রদর্শন সংখ্যা ${MAX_EDITORIAL_DISPLAY_COUNT} এর চেয়ে বেশি হতে পারে না`,
  NO_EDITORIAL_ITEMS: 'কোনো এডিটোরিয়াল আইটেম পাওয়া যায়নি',
  CACHE_EXPIRED: 'এডিটোরিয়াল ক্যাশের মেয়াদ শেষ হয়েছে',
  INVALID_SCHEDULE: 'শিডিউল সময় সঠিক নয়',
} as const;
