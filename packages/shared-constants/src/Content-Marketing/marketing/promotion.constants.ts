/**
 * প্রমোশন ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * প্রমোশন ম্যানেজমেন্ট মডিউলের নাম
 */
export const PROMOTION_MODULE_NAME = 'Promotion Management';

/**
 * প্রমোশনের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_PROMOTION_STATUS = 'draft' as const;

/**
 * প্রমোশন নামের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_PROMOTION_NAME_LENGTH = 200;

/**
 * সর্বোচ্চ ডিসকাউন্ট শতাংশ
 */
export const MAX_DISCOUNT_PERCENTAGE = 100;

/**
 * সর্বনিম্ন ডিসকাউন্ট পরিমাণ
 */
export const MIN_DISCOUNT_AMOUNT = 0;

/**
 * প্রমোশন স্ট্যাটাস টাইপ
 */
export type PromotionStatus = typeof DEFAULT_PROMOTION_STATUS;

/**
 * ডিসকাউন্ট টাইপ
 */
export type DiscountType = 'percentage' | 'fixed' | 'bogo' | 'free-shipping';

/**
 * প্রমোশন ইন্টারফেস
 */
export interface PromotionInterface {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: PromotionStatus;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  startDate: Date;
  endDate: Date;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  code?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: PromotionMetadata;
}

/**
 * প্রমোশন মেটাডেটা ইন্টারফেস
 */
export interface PromotionMetadata {
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  notes?: string;
  color?: string;
  icon?: string;
}

/**
 * প্রমোশন তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreatePromotionInput {
  name: string;
  slug: string;
  description?: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  startDate: Date;
  endDate: Date;
  usageLimit?: number;
  code?: string;
  metadata?: PromotionMetadata;
  status?: PromotionStatus;
}

/**
 * প্রমোশন আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdatePromotionInput {
  name?: string;
  slug?: string;
  description?: string;
  discountType?: DiscountType;
  discountValue?: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  startDate?: Date;
  endDate?: Date;
  usageLimit?: number;
  code?: string;
  metadata?: PromotionMetadata;
  status?: PromotionStatus;
  isActive?: boolean;
}

/**
 * প্রমোশন ফিল্টার ইন্টারফেস
 */
export interface PromotionFilter {
  search?: string;
  status?: PromotionStatus;
  discountType?: DiscountType;
  isActive?: boolean;
  startDateFrom?: Date;
  startDateTo?: Date;
  endDateFrom?: Date;
  endDateTo?: Date;
  minDiscount?: number;
  maxDiscount?: number;
  limit?: number;
  offset?: number;
}

/**
 * প্রমোশন স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPromotionStatus(status: string): status is PromotionStatus {
  return status === 'draft';
}

/**
 * প্রমোশন নাম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPromotionName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  const trimmedName = name.trim();
  return trimmedName.length > 0 && trimmedName.length <= MAX_PROMOTION_NAME_LENGTH;
}

/**
 * ডিসকাউন্ট শতাংশ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidDiscountPercentage(value: number): boolean {
  return typeof value === 'number' && value >= 0 && value <= MAX_DISCOUNT_PERCENTAGE;
}

/**
 * ডিসকাউন্ট পরিমাণ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidDiscountAmount(value: number): boolean {
  return typeof value === 'number' && value >= MIN_DISCOUNT_AMOUNT;
}

/**
 * প্রমোশন স্লাগ তৈরির ফাংশন
 */
export function generatePromotionSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * প্রমোশন সক্রিয় কিনা চেক করার ফাংশন
 */
export function isPromotionActive(promotion: PromotionInterface): boolean {
  const now = new Date();
  return (
    promotion.isActive &&
    promotion.startDate <= now &&
    promotion.endDate >= now &&
    (promotion.usageLimit === undefined || promotion.usedCount < promotion.usageLimit)
  );
}

/**
 * প্রমোশন এক্সপায়ার্ড কিনা চেক করার ফাংশন
 */
export function isPromotionExpired(promotion: PromotionInterface): boolean {
  return promotion.endDate < new Date();
}

/**
 * প্রমোশন ব্যবহারের লিমিট শেষ হয়েছে কিনা চেক করার ফাংশন
 */
export function isPromotionLimitReached(promotion: PromotionInterface): boolean {
  return promotion.usageLimit !== undefined && promotion.usedCount >= promotion.usageLimit;
}

/**
 * ডিসকাউন্ট গণনা করার ফাংশন
 */
export function calculateDiscount(
  price: number,
  discountType: DiscountType,
  discountValue: number,
  maxDiscountAmount?: number
): number {
  if (discountType === 'percentage') {
    let discount = (price * discountValue) / 100;
    if (maxDiscountAmount !== undefined) {
      discount = Math.min(discount, maxDiscountAmount);
    }
    return Math.min(discount, price);
  }
  if (discountType === 'fixed') {
    return Math.min(discountValue, price);
  }
  return 0;
}

/**
 * ডিসকাউন্ট টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidDiscountType(type: string): type is DiscountType {
  return ['percentage', 'fixed', 'bogo', 'free-shipping'].includes(type);
}

/**
 * ডিফল্ট প্রমোশন স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultPromotionStatus(): PromotionStatus {
  return DEFAULT_PROMOTION_STATUS;
}

/**
 * সব ডিসকাউন্ট টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllDiscountTypes(): DiscountType[] {
  return ['percentage', 'fixed', 'bogo', 'free-shipping'];
}
