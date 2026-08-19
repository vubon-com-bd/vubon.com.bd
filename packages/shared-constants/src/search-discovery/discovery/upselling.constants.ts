/**
 * আপসেলিং (উন্নত সংস্করণ) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * আপসেল টাইপ
 */
export enum UpsellType {
  PREMIUM = 'premium',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
  DELUXE = 'deluxe',
}

/**
 * আপসেল টাইপ লেবেলসমূহ (বাংলায়)
 */
export const UPSELL_TYPE_LABELS_BN: Record<UpsellType, string> = {
  [UpsellType.PREMIUM]: 'প্রিমিয়াম',
  [UpsellType.PRO]: 'প্রো',
  [UpsellType.ENTERPRISE]: 'এন্টারপ্রাইজ',
  [UpsellType.DELUXE]: 'ডিলাক্স',
} as const;

/**
 * আপসেল টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const UPSELL_TYPE_LABELS_EN: Record<UpsellType, string> = {
  [UpsellType.PREMIUM]: 'Premium',
  [UpsellType.PRO]: 'Pro',
  [UpsellType.ENTERPRISE]: 'Enterprise',
  [UpsellType.DELUXE]: 'Deluxe',
} as const;

/**
 * আপসেল টাইপ বিবরণ (বাংলায়)
 */
export const UPSELL_TYPE_DESCRIPTIONS_BN: Record<UpsellType, string> = {
  [UpsellType.PREMIUM]: 'উন্নত ফিচার সম্বলিত প্রিমিয়াম সংস্করণ',
  [UpsellType.PRO]: 'পেশাদার ব্যবহারের জন্য প্রো সংস্করণ',
  [UpsellType.ENTERPRISE]: 'বৃহৎ প্রতিষ্ঠানের জন্য এন্টারপ্রাইজ সংস্করণ',
  [UpsellType.DELUXE]: 'সর্বোচ্চ ফিচার সম্বলিত ডিলাক্স সংস্করণ',
} as const;

/**
 * আপসেল টাইপ বিবরণ (ইংরেজিতে)
 */
export const UPSELL_TYPE_DESCRIPTIONS_EN: Record<UpsellType, string> = {
  [UpsellType.PREMIUM]: 'Premium version with advanced features',
  [UpsellType.PRO]: 'Professional version for experts',
  [UpsellType.ENTERPRISE]: 'Enterprise version for large organizations',
  [UpsellType.DELUXE]: 'Deluxe version with all features',
} as const;

/**
 * প্রাইস ডিফারেন্স থ্রেশহোল্ড (শতাংশে)
 */
export const PRICE_DIFFERENCE_THRESHOLD = 20; // 20%

/**
 * ফিচার কম্প্যারিসন ফ্যাক্টর
 */
export const FEATURE_COMPARISON_FACTORS = {
  PREMIUM: 1.2,
  PRO: 1.5,
  ENTERPRISE: 2.0,
  DELUXE: 1.8,
} as const;

/**
 * ডিফল্ট প্রদর্শন সংখ্যা
 */
export const DEFAULT_UPSELL_DISPLAY_COUNT = 3;

/**
 * সর্বোচ্চ প্রদর্শন সংখ্যা
 */
export const MAX_UPSELL_DISPLAY_COUNT = 10;

/**
 * ন্যূনতম প্রদর্শন সংখ্যা
 */
export const MIN_UPSELL_DISPLAY_COUNT = 1;

/**
 * ডিফল্ট আপসেল টাইপ
 */
export const DEFAULT_UPSELL_TYPE = UpsellType.PREMIUM;

/**
 * আপসেল টাইপের ভ্যালু সমূহ
 */
export const UPSELL_TYPE_VALUES = Object.values(UpsellType) as readonly UpsellType[];

/**
 * আপসেল কনফিগারেশন টাইপ
 */
export type UpsellConfig = {
  type: UpsellType;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  descriptionEn: string;
  priceThreshold: number;
  featureFactor: number;
  defaultDisplayCount: number;
  maxDisplayCount: number;
  enabled: boolean;
};

/**
 * আপসেল কনফিগারেশনসমূহ
 */
export const UPSELL_CONFIGS: Record<UpsellType, UpsellConfig> = {
  [UpsellType.PREMIUM]: {
    type: UpsellType.PREMIUM,
    labelBn: UPSELL_TYPE_LABELS_BN[UpsellType.PREMIUM],
    labelEn: UPSELL_TYPE_LABELS_EN[UpsellType.PREMIUM],
    descriptionBn: UPSELL_TYPE_DESCRIPTIONS_BN[UpsellType.PREMIUM],
    descriptionEn: UPSELL_TYPE_DESCRIPTIONS_EN[UpsellType.PREMIUM],
    priceThreshold: PRICE_DIFFERENCE_THRESHOLD,
    featureFactor: FEATURE_COMPARISON_FACTORS.PREMIUM,
    defaultDisplayCount: DEFAULT_UPSELL_DISPLAY_COUNT,
    maxDisplayCount: MAX_UPSELL_DISPLAY_COUNT,
    enabled: true,
  },
  [UpsellType.PRO]: {
    type: UpsellType.PRO,
    labelBn: UPSELL_TYPE_LABELS_BN[UpsellType.PRO],
    labelEn: UPSELL_TYPE_LABELS_EN[UpsellType.PRO],
    descriptionBn: UPSELL_TYPE_DESCRIPTIONS_BN[UpsellType.PRO],
    descriptionEn: UPSELL_TYPE_DESCRIPTIONS_EN[UpsellType.PRO],
    priceThreshold: PRICE_DIFFERENCE_THRESHOLD,
    featureFactor: FEATURE_COMPARISON_FACTORS.PRO,
    defaultDisplayCount: DEFAULT_UPSELL_DISPLAY_COUNT,
    maxDisplayCount: MAX_UPSELL_DISPLAY_COUNT,
    enabled: true,
  },
  [UpsellType.ENTERPRISE]: {
    type: UpsellType.ENTERPRISE,
    labelBn: UPSELL_TYPE_LABELS_BN[UpsellType.ENTERPRISE],
    labelEn: UPSELL_TYPE_LABELS_EN[UpsellType.ENTERPRISE],
    descriptionBn: UPSELL_TYPE_DESCRIPTIONS_BN[UpsellType.ENTERPRISE],
    descriptionEn: UPSELL_TYPE_DESCRIPTIONS_EN[UpsellType.ENTERPRISE],
    priceThreshold: PRICE_DIFFERENCE_THRESHOLD,
    featureFactor: FEATURE_COMPARISON_FACTORS.ENTERPRISE,
    defaultDisplayCount: DEFAULT_UPSELL_DISPLAY_COUNT,
    maxDisplayCount: MAX_UPSELL_DISPLAY_COUNT,
    enabled: true,
  },
  [UpsellType.DELUXE]: {
    type: UpsellType.DELUXE,
    labelBn: UPSELL_TYPE_LABELS_BN[UpsellType.DELUXE],
    labelEn: UPSELL_TYPE_LABELS_EN[UpsellType.DELUXE],
    descriptionBn: UPSELL_TYPE_DESCRIPTIONS_BN[UpsellType.DELUXE],
    descriptionEn: UPSELL_TYPE_DESCRIPTIONS_EN[UpsellType.DELUXE],
    priceThreshold: PRICE_DIFFERENCE_THRESHOLD,
    featureFactor: FEATURE_COMPARISON_FACTORS.DELUXE,
    defaultDisplayCount: DEFAULT_UPSELL_DISPLAY_COUNT,
    maxDisplayCount: MAX_UPSELL_DISPLAY_COUNT,
    enabled: true,
  },
} as const;

/**
 * আপসেল আইটেম টাইপ
 */
export type UpsellItem = {
  id: string;
  type: UpsellType;
  priceDifference: number;
  featureComparison: Record<string, boolean>;
  score: number;
  metadata?: Record<string, unknown>;
};

/**
 * আপসেল রেসপন্স টাইপ
 */
export type UpsellResponse = {
  items: UpsellItem[];
  total: number;
  type: UpsellType;
  took: number;
};

/**
 * আপসেল এরর মেসেজসমূহ
 */
export const UPSELL_ERROR_MESSAGES = {
  INVALID_TYPE: 'আপসেল টাইপ সঠিক নয়',
  INVALID_PRICE_THRESHOLD: 'প্রাইস ডিফারেন্স থ্রেশহোল্ড ০ থেকে ১০০ এর মধ্যে হতে হবে',
  INVALID_COUNT: `প্রদর্শন সংখ্যা ${MIN_UPSELL_DISPLAY_COUNT} থেকে ${MAX_UPSELL_DISPLAY_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `প্রদর্শন সংখ্যা ${MIN_UPSELL_DISPLAY_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `প্রদর্শন সংখ্যা ${MAX_UPSELL_DISPLAY_COUNT} এর চেয়ে বেশি হতে পারে না`,
  NO_UPSELL_ITEMS: 'কোনো আপসেল আইটেম পাওয়া যায়নি',
  INVALID_FEATURE_FACTOR: 'ফিচার ফ্যাক্টর ০ এর চেয়ে বেশি হতে হবে',
} as const;
