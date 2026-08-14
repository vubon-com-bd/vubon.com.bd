/**
 * কন্টেন্ট ক্যাটাগরি সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ডিফল্ট ক্যাটাগরি তালিকা
 */
export const DEFAULT_CATEGORIES = [
  'Technology',
  'Business',
  'Health',
  'Education',
  'Lifestyle',
] as const;

/**
 * ক্যাটাগরি নামের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_CATEGORY_NAME_LENGTH = 50;

/**
 * ক্যাটাগরি বিবরণের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_CATEGORY_DESCRIPTION_LENGTH = 200;

/**
 * ক্যাটাগরি সাজানোর জন্য অনুমোদিত ফিল্ডসমূহ
 */
export const CATEGORY_SORT_FIELDS = ['name', 'createdAt', 'postCount'] as const;

/**
 * ক্যাটাগরি টাইপ
 */
export type Category = (typeof DEFAULT_CATEGORIES)[number];

/**
 * ক্যাটাগরি সাজানোর ফিল্ড টাইপ
 */
export type CategorySortField = (typeof CATEGORY_SORT_FIELDS)[number];

/**
 * ক্যাটাগরি ইন্টারফেস
 */
export interface CategoryInterface {
  id: string;
  name: Category | string;
  description?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  postCount: number;
  isActive: boolean;
}

/**
 * ক্যাটাগরি তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateCategoryInput {
  name: Category | string;
  description?: string;
  slug: string;
  isActive?: boolean;
}

/**
 * ক্যাটাগরি আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateCategoryInput {
  name?: Category | string;
  description?: string;
  slug?: string;
  isActive?: boolean;
}

/**
 * ক্যাটাগরি ফিল্টার ইন্টারফেস
 */
export interface CategoryFilter {
  search?: string;
  isActive?: boolean;
  sortBy?: CategorySortField;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * ডিফল্ট ক্যাটাগরি কিনা চেক করার ফাংশন
 */
export function isDefaultCategory(category: string): category is Category {
  return DEFAULT_CATEGORIES.includes(category as Category);
}

/**
 * ক্যাটাগরি সাজানোর ফিল্ড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCategorySortField(field: string): field is CategorySortField {
  return CATEGORY_SORT_FIELDS.includes(field as CategorySortField);
}

/**
 * ক্যাটাগরি স্লাগ তৈরির ফাংশন
 */
export function generateCategorySlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * ক্যাটাগরি নাম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCategoryName(name: string): boolean {
  return name.length > 0 && name.length <= MAX_CATEGORY_NAME_LENGTH;
}

/**
 * ক্যাটাগরি বিবরণ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCategoryDescription(description: string): boolean {
  return description.length <= MAX_CATEGORY_DESCRIPTION_LENGTH;
}

/**
 * সব ডিফল্ট ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getAllDefaultCategories(): readonly Category[] {
  return DEFAULT_CATEGORIES;
}
