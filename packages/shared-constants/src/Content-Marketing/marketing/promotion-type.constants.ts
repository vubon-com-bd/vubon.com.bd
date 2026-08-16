/**
 * প্রমোশনের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * প্রমোশনের সব ধরন
 */
export const PROMOTION_TYPES = ['discount', 'bogof', 'free-shipping', 'gift', 'coupon'] as const;

/**
 * প্রতিটি প্রমোশন টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const PROMOTION_TYPE_LABELS = {
  discount: {
    en: 'Discount',
    bn: 'ডিসকাউন্ট',
  },
  bogof: {
    en: 'Buy One Get One Free',
    bn: 'একটি কিনলে একটি ফ্রি',
  },
  'free-shipping': {
    en: 'Free Shipping',
    bn: 'ফ্রি শিপিং',
  },
  gift: {
    en: 'Free Gift',
    bn: 'ফ্রি গিফট',
  },
  coupon: {
    en: 'Coupon Code',
    bn: 'কুপন কোড',
  },
} as const satisfies Record<(typeof PROMOTION_TYPES)[number], { en: string; bn: string }>;

/**
 * প্রমোশন টাইপ টাইপ
 */
export type PromotionType = (typeof PROMOTION_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট প্রমোশন টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getPromotionTypeLabel(type: PromotionType, lang: Language = 'en'): string {
  return PROMOTION_TYPE_LABELS[type][lang];
}

/**
 * সব প্রমোশন টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllPromotionTypes(): readonly PromotionType[] {
  return PROMOTION_TYPES;
}

/**
 * প্রমোশন টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPromotionType(type: string): type is PromotionType {
  return PROMOTION_TYPES.includes(type as PromotionType);
}

/**
 * প্রমোশন টাইপ ডিসকাউন্ট কিনা চেক করার ফাংশন
 */
export function isDiscountType(type: PromotionType): boolean {
  return type === 'discount';
}

/**
 * প্রমোশন টাইপ BOGOF কিনা চেক করার ফাংশন
 */
export function isBogofType(type: PromotionType): boolean {
  return type === 'bogof';
}

/**
 * প্রমোশন টাইপ ফ্রি শিপিং কিনা চেক করার ফাংশন
 */
export function isFreeShippingType(type: PromotionType): boolean {
  return type === 'free-shipping';
}

/**
 * প্রমোশন টাইপ গিফট কিনা চেক করার ফাংশন
 */
export function isGiftType(type: PromotionType): boolean {
  return type === 'gift';
}

/**
 * প্রমোশন টাইপ কুপন কিনা চেক করার ফাংশন
 */
export function isCouponType(type: PromotionType): boolean {
  return type === 'coupon';
}

/**
 * প্রমোশন টাইপে ডিসকাউন্ট আছে কিনা চেক করার ফাংশন
 */
export function hasDiscount(type: PromotionType): boolean {
  return ['discount', 'bogof', 'coupon'].includes(type);
}

/**
 * প্রমোশন টাইপে ফ্রি আইটেম আছে কিনা চেক করার ফাংশন
 */
export function hasFreeItem(type: PromotionType): boolean {
  return ['bogof', 'gift'].includes(type);
}

/**
 * প্রমোশন টাইপে কুপন প্রয়োজন কিনা চেক করার ফাংশন
 */
export function requiresCoupon(type: PromotionType): boolean {
  return type === 'coupon';
}

/**
 * ডিফল্ট প্রমোশন টাইপ পাওয়ার ফাংশন
 */
export function getDefaultPromotionType(): PromotionType {
  return 'discount';
}

/**
 * প্রমোশন টাইপের আইকন পাওয়ার ফাংশন
 */
export function getPromotionTypeIcon(type: PromotionType): string {
  const icons: Record<PromotionType, string> = {
    discount: '💰',
    bogof: '🎁',
    'free-shipping': '🚚',
    gift: '🎀',
    coupon: '🏷️',
  };
  return icons[type];
}

/**
 * প্রমোশন টাইপের রঙ পাওয়ার ফাংশন
 */
export function getPromotionTypeColor(type: PromotionType): string {
  const colors: Record<PromotionType, string> = {
    discount: '#3B82F6',
    bogof: '#10B981',
    'free-shipping': '#8B5CF6',
    gift: '#F59E0B',
    coupon: '#EC4899',
  };
  return colors[type];
}

/**
 * প্রমোশন টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getPromotionTypeDescription(type: PromotionType, lang: Language = 'en'): string {
  const descriptions: Record<PromotionType, { en: string; bn: string }> = {
    discount: {
      en: 'Percentage or fixed amount discount on products',
      bn: 'পণ্যে শতাংশ বা নির্দিষ্ট পরিমাণ ডিসকাউন্ট',
    },
    bogof: {
      en: 'Buy one product and get another product free',
      bn: 'একটি পণ্য কিনলে আরেকটি পণ্য ফ্রি',
    },
    'free-shipping': {
      en: 'Free shipping on orders above a certain amount',
      bn: 'নির্দিষ্ট পরিমাণের অর্ডারে ফ্রি শিপিং',
    },
    gift: {
      en: 'Free gift with purchase',
      bn: 'ক্রয়ের সাথে ফ্রি গিফট',
    },
    coupon: {
      en: 'Discount using coupon code',
      bn: 'কুপন কোড ব্যবহার করে ডিসকাউন্ট',
    },
  };
  return descriptions[type][lang];
}
