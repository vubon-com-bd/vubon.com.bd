/**
 * বান্ডল (প্যাকেজ) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * বান্ডল টাইপ
 */
export enum BundleType {
  FIXED = 'fixed',
  CUSTOMIZABLE = 'customizable',
  MIX_MATCH = 'mix_match',
}

/**
 * বান্ডল টাইপ লেবেলসমূহ (বাংলায়)
 */
export const BUNDLE_TYPE_LABELS_BN: Record<BundleType, string> = {
  [BundleType.FIXED]: 'নির্ধারিত',
  [BundleType.CUSTOMIZABLE]: 'কাস্টমাইজেবল',
  [BundleType.MIX_MATCH]: 'মিক্স ম্যাচ',
} as const;

/**
 * বান্ডল টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const BUNDLE_TYPE_LABELS_EN: Record<BundleType, string> = {
  [BundleType.FIXED]: 'Fixed',
  [BundleType.CUSTOMIZABLE]: 'Customizable',
  [BundleType.MIX_MATCH]: 'Mix & Match',
} as const;

/**
 * বান্ডল টাইপ বিবরণ (বাংলায়)
 */
export const BUNDLE_TYPE_DESCRIPTIONS_BN: Record<BundleType, string> = {
  [BundleType.FIXED]: 'পূর্বনির্ধারিত আইটেম সম্বলিত বান্ডল',
  [BundleType.CUSTOMIZABLE]: 'ব্যবহারকারী নিজে আইটেম নির্বাচন করতে পারে',
  [BundleType.MIX_MATCH]: 'একাধিক ক্যাটাগরি থেকে আইটেম মেশানো যায়',
} as const;

/**
 * বান্ডল টাইপ বিবরণ (ইংরেজিতে)
 */
export const BUNDLE_TYPE_DESCRIPTIONS_EN: Record<BundleType, string> = {
  [BundleType.FIXED]: 'Fixed bundle with predefined items',
  [BundleType.CUSTOMIZABLE]: 'User can select items themselves',
  [BundleType.MIX_MATCH]: 'Mix items from multiple categories',
} as const;

/**
 * বান্ডল লেবেলসমূহ
 */
export const BUNDLE_LABELS = {
  BEST_DEAL: 'সেরা দাম',
  BEST_DEAL_EN: 'Best Deal',
  PACKAGE_DEAL: 'প্যাকেজ ডিল',
  PACKAGE_DEAL_EN: 'Package Deal',
  SAVE_BUNDLE: 'বান্ডল সেভ',
  SAVE_BUNDLE_EN: 'Bundle Save',
} as const;

/**
 * ডিফল্ট বান্ডল সাইজ (ন্যূনতম)
 */
export const DEFAULT_BUNDLE_MIN_SIZE = 2;

/**
 * ডিফল্ট বান্ডল সাইজ (সর্বোচ্চ)
 */
export const DEFAULT_BUNDLE_MAX_SIZE = 5;

/**
 * ডিসকাউন্ট থ্রেশহোল্ড (শতাংশে)
 */
export const BUNDLE_DISCOUNT_THRESHOLD = 10; // 10%

/**
 * ডিফল্ট প্রদর্শন সংখ্যা
 */
export const DEFAULT_BUNDLE_DISPLAY_COUNT = 4;

/**
 * সর্বোচ্চ প্রদর্শন সংখ্যা
 */
export const MAX_BUNDLE_DISPLAY_COUNT = 10;

/**
 * ন্যূনতম প্রদর্শন সংখ্যা
 */
export const MIN_BUNDLE_DISPLAY_COUNT = 1;

/**
 * ডিফল্ট বান্ডল টাইপ
 */
export const DEFAULT_BUNDLE_TYPE = BundleType.FIXED;

/**
 * বান্ডল টাইপের ভ্যালু সমূহ
 */
export const BUNDLE_TYPE_VALUES = Object.values(BundleType) as readonly BundleType[];

/**
 * বান্ডল কনফিগারেশন টাইপ
 */
export type BundleConfig = {
  type: BundleType;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  descriptionEn: string;
  minSize: number;
  maxSize: number;
  discountThreshold: number;
  defaultDisplayCount: number;
  maxDisplayCount: number;
  enabled: boolean;
};

/**
 * বান্ডল কনফিগারেশনসমূহ
 */
export const BUNDLE_CONFIGS: Record<BundleType, BundleConfig> = {
  [BundleType.FIXED]: {
    type: BundleType.FIXED,
    labelBn: BUNDLE_TYPE_LABELS_BN[BundleType.FIXED],
    labelEn: BUNDLE_TYPE_LABELS_EN[BundleType.FIXED],
    descriptionBn: BUNDLE_TYPE_DESCRIPTIONS_BN[BundleType.FIXED],
    descriptionEn: BUNDLE_TYPE_DESCRIPTIONS_EN[BundleType.FIXED],
    minSize: DEFAULT_BUNDLE_MIN_SIZE,
    maxSize: DEFAULT_BUNDLE_MAX_SIZE,
    discountThreshold: BUNDLE_DISCOUNT_THRESHOLD,
    defaultDisplayCount: DEFAULT_BUNDLE_DISPLAY_COUNT,
    maxDisplayCount: MAX_BUNDLE_DISPLAY_COUNT,
    enabled: true,
  },
  [BundleType.CUSTOMIZABLE]: {
    type: BundleType.CUSTOMIZABLE,
    labelBn: BUNDLE_TYPE_LABELS_BN[BundleType.CUSTOMIZABLE],
    labelEn: BUNDLE_TYPE_LABELS_EN[BundleType.CUSTOMIZABLE],
    descriptionBn: BUNDLE_TYPE_DESCRIPTIONS_BN[BundleType.CUSTOMIZABLE],
    descriptionEn: BUNDLE_TYPE_DESCRIPTIONS_EN[BundleType.CUSTOMIZABLE],
    minSize: DEFAULT_BUNDLE_MIN_SIZE,
    maxSize: DEFAULT_BUNDLE_MAX_SIZE,
    discountThreshold: BUNDLE_DISCOUNT_THRESHOLD,
    defaultDisplayCount: DEFAULT_BUNDLE_DISPLAY_COUNT,
    maxDisplayCount: MAX_BUNDLE_DISPLAY_COUNT,
    enabled: true,
  },
  [BundleType.MIX_MATCH]: {
    type: BundleType.MIX_MATCH,
    labelBn: BUNDLE_TYPE_LABELS_BN[BundleType.MIX_MATCH],
    labelEn: BUNDLE_TYPE_LABELS_EN[BundleType.MIX_MATCH],
    descriptionBn: BUNDLE_TYPE_DESCRIPTIONS_BN[BundleType.MIX_MATCH],
    descriptionEn: BUNDLE_TYPE_DESCRIPTIONS_EN[BundleType.MIX_MATCH],
    minSize: DEFAULT_BUNDLE_MIN_SIZE,
    maxSize: DEFAULT_BUNDLE_MAX_SIZE,
    discountThreshold: BUNDLE_DISCOUNT_THRESHOLD,
    defaultDisplayCount: DEFAULT_BUNDLE_DISPLAY_COUNT,
    maxDisplayCount: MAX_BUNDLE_DISPLAY_COUNT,
    enabled: true,
  },
} as const;

/**
 * বান্ডল আইটেম টাইপ
 */
export type BundleItem = {
  id: string;
  type: BundleType;
  items: string[];
  price: number;
  discount: number;
  label: string;
  metadata?: Record<string, unknown>;
};

/**
 * বান্ডল রেসপন্স টাইপ
 */
export type BundleResponse = {
  items: BundleItem[];
  total: number;
  type: BundleType;
  took: number;
};

/**
 * বান্ডল এরর মেসেজসমূহ
 */
export const BUNDLE_ERROR_MESSAGES = {
  INVALID_TYPE: 'বান্ডল টাইপ সঠিক নয়',
  INVALID_SIZE: `বান্ডল সাইজ ${DEFAULT_BUNDLE_MIN_SIZE} থেকে ${DEFAULT_BUNDLE_MAX_SIZE} এর মধ্যে হতে হবে`,
  SIZE_TOO_SMALL: `বান্ডল সাইজ ${DEFAULT_BUNDLE_MIN_SIZE} এর চেয়ে কম হতে পারে না`,
  SIZE_TOO_LARGE: `বান্ডল সাইজ ${DEFAULT_BUNDLE_MAX_SIZE} এর চেয়ে বেশি হতে পারে না`,
  INVALID_DISCOUNT: 'ডিসকাউন্ট ০ থেকে ১০০ এর মধ্যে হতে হবে',
  INVALID_COUNT: `প্রদর্শন সংখ্যা ${MIN_BUNDLE_DISPLAY_COUNT} থেকে ${MAX_BUNDLE_DISPLAY_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `প্রদর্শন সংখ্যা ${MIN_BUNDLE_DISPLAY_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `প্রদর্শন সংখ্যা ${MAX_BUNDLE_DISPLAY_COUNT} এর চেয়ে বেশি হতে পারে না`,
  NO_BUNDLES_FOUND: 'কোনো বান্ডল পাওয়া যায়নি',
  INVALID_ITEMS: 'বান্ডল আইটেম সঠিক নয়',
} as const;
