/**
 * FAQ ক্যাটাগরি সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ডিফল্ট FAQ ক্যাটাগরি তালিকা
 */
export const DEFAULT_FAQ_CATEGORIES = [
  'General',
  'Account',
  'Payment',
  'Product',
  'Support',
] as const;

/**
 * FAQ ক্যাটাগরি নামের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_FAQ_CATEGORY_NAME_LENGTH = 50;

/**
 * FAQ ক্যাটাগরি টাইপ
 */
export type FaqCategory = (typeof DEFAULT_FAQ_CATEGORIES)[number];

/**
 * FAQ ক্যাটাগরি ইন্টারফেস
 */
export interface FaqCategoryInterface {
  id: string;
  name: FaqCategory | string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  faqCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata?: FaqCategoryMetadata;
}

/**
 * FAQ ক্যাটাগরি মেটাডেটা ইন্টারফেস
 */
export interface FaqCategoryMetadata {
  seoTitle?: string;
  seoDescription?: string;
  color?: string;
  parentId?: string;
  subCategories?: FaqCategoryInterface[];
}

/**
 * FAQ ক্যাটাগরি তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateFaqCategoryInput {
  name: FaqCategory | string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
  metadata?: FaqCategoryMetadata;
}

/**
 * FAQ ক্যাটাগরি আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateFaqCategoryInput {
  name?: FaqCategory | string;
  slug?: string;
  description?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
  metadata?: FaqCategoryMetadata;
}

/**
 * FAQ ক্যাটাগরি ফিল্টার ইন্টারফেস
 */
export interface FaqCategoryFilter {
  search?: string;
  isActive?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'order' | 'faqCount' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * ডিফল্ট FAQ ক্যাটাগরি কিনা চেক করার ফাংশন
 */
export function isDefaultFaqCategory(category: string): category is FaqCategory {
  return DEFAULT_FAQ_CATEGORIES.includes(category as FaqCategory);
}

/**
 * FAQ ক্যাটাগরি স্লাগ তৈরির ফাংশন
 */
export function generateFaqCategorySlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * FAQ ক্যাটাগরি নাম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidFaqCategoryName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  const trimmedName = name.trim();
  return trimmedName.length > 0 && trimmedName.length <= MAX_FAQ_CATEGORY_NAME_LENGTH;
}

/**
 * সব ডিফল্ট FAQ ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getAllDefaultFaqCategories(): readonly FaqCategory[] {
  return DEFAULT_FAQ_CATEGORIES;
}

/**
 * FAQ ক্যাটাগরি সক্রিয় কিনা চেক করার ফাংশন
 */
export function isFaqCategoryActive(category: FaqCategoryInterface): boolean {
  return category.isActive;
}

/**
 * FAQ ক্যাটাগরি FAQ কাউন্ট আপডেট করার ফাংশন
 */
export function updateFaqCategoryCount(
  category: FaqCategoryInterface,
  increment: boolean = true
): FaqCategoryInterface {
  return {
    ...category,
    faqCount: increment ? category.faqCount + 1 : Math.max(0, category.faqCount - 1),
    updatedAt: new Date(),
  };
}

/**
 * FAQ ক্যাটাগরি অর্ডার আপডেট করার ফাংশন
 */
export function updateFaqCategoryOrder(
  categories: FaqCategoryInterface[],
  orderMap: Record<string, number>
): FaqCategoryInterface[] {
  return categories.map((category) => {
    const newOrder = orderMap[category.id];
    if (newOrder !== undefined) {
      return {
        ...category,
        order: newOrder,
        updatedAt: new Date(),
      };
    }
    return category;
  });
}

/**
 * FAQ ক্যাটাগরি লেবেল পাওয়ার ফাংশন (বাংলা এবং ইংরেজি)
 */
export function getFaqCategoryLabel(category: FaqCategory | string): { en: string; bn: string } {
  const labels: Record<string, { en: string; bn: string }> = {
    General: {
      en: 'General',
      bn: 'সাধারণ',
    },
    Account: {
      en: 'Account',
      bn: 'অ্যাকাউন্ট',
    },
    Payment: {
      en: 'Payment',
      bn: 'পেমেন্ট',
    },
    Product: {
      en: 'Product',
      bn: 'পণ্য',
    },
    Support: {
      en: 'Support',
      bn: 'সাপোর্ট',
    },
  };
  return (
    labels[category] || {
      en: category,
      bn: category,
    }
  );
}

/**
 * FAQ ক্যাটাগরি আইকন পাওয়ার ফাংশন
 */
export function getFaqCategoryIcon(category: FaqCategory | string): string {
  const icons: Record<string, string> = {
    General: '📋',
    Account: '👤',
    Payment: '💳',
    Product: '📦',
    Support: '🎯',
  };
  return icons[category] || '📌';
}

/**
 * FAQ ক্যাটাগরি কালার পাওয়ার ফাংশন
 */
export function getFaqCategoryColor(category: FaqCategory | string): string {
  const colors: Record<string, string> = {
    General: 'blue',
    Account: 'green',
    Payment: 'purple',
    Product: 'orange',
    Support: 'red',
  };
  return colors[category] || 'gray';
}

/**
 * ডিফল্ট FAQ ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getDefaultFaqCategory(): FaqCategory {
  return 'General';
}
