/**
 * ব্লগ ক্যাটাগরি সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ডিফল্ট ব্লগ ক্যাটাগরি তালিকা
 */
export const DEFAULT_BLOG_CATEGORIES = [
  'Programming',
  'Design',
  'Marketing',
  'Business',
  'Life',
] as const;

/**
 * ব্লগ ক্যাটাগরি নামের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_BLOG_CATEGORY_NAME_LENGTH = 50;

/**
 * ব্লগ ক্যাটাগরি বিবরণের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_BLOG_CATEGORY_DESCRIPTION_LENGTH = 200;

/**
 * ব্লগ ক্যাটাগরি টাইপ
 */
export type BlogCategory = (typeof DEFAULT_BLOG_CATEGORIES)[number];

/**
 * ব্লগ ক্যাটাগরি ইন্টারফেস
 */
export interface BlogCategoryInterface {
  id: string;
  name: BlogCategory | string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  postCount: number;
  isActive: boolean;
  parentId?: string;
  subCategories?: BlogCategoryInterface[];
}

/**
 * ব্লগ ক্যাটাগরি তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateBlogCategoryInput {
  name: BlogCategory | string;
  slug: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
}

/**
 * ব্লগ ক্যাটাগরি আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateBlogCategoryInput {
  name?: BlogCategory | string;
  slug?: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
}

/**
 * ব্লগ ক্যাটাগরি ফিল্টার ইন্টারফেস
 */
export interface BlogCategoryFilter {
  search?: string;
  isActive?: boolean;
  parentId?: string;
  limit?: number;
  offset?: number;
}

/**
 * ডিফল্ট ব্লগ ক্যাটাগরি কিনা চেক করার ফাংশন
 */
export function isDefaultBlogCategory(category: string): category is BlogCategory {
  return DEFAULT_BLOG_CATEGORIES.includes(category as BlogCategory);
}

/**
 * ব্লগ ক্যাটাগরি স্লাগ তৈরির ফাংশন
 */
export function generateBlogCategorySlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * ব্লগ ক্যাটাগরি নাম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidBlogCategoryName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  const trimmedName = name.trim();
  return trimmedName.length > 0 && trimmedName.length <= MAX_BLOG_CATEGORY_NAME_LENGTH;
}

/**
 * ব্লগ ক্যাটাগরি বিবরণ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidBlogCategoryDescription(description: string): boolean {
  if (!description) return true;
  return description.length <= MAX_BLOG_CATEGORY_DESCRIPTION_LENGTH;
}

/**
 * সব ডিফল্ট ব্লগ ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getAllDefaultBlogCategories(): readonly BlogCategory[] {
  return DEFAULT_BLOG_CATEGORIES;
}

/**
 * ব্লগ ক্যাটাগরি সক্রিয় কিনা চেক করার ফাংশন
 */
export function isBlogCategoryActive(category: BlogCategoryInterface): boolean {
  return category.isActive;
}

/**
 * ব্লগ ক্যাটাগরির পোস্ট কাউন্ট আপডেট করার ফাংশন
 */
export function updateBlogCategoryPostCount(
  category: BlogCategoryInterface,
  increment: boolean = true
): BlogCategoryInterface {
  return {
    ...category,
    postCount: increment ? category.postCount + 1 : Math.max(0, category.postCount - 1),
  };
}
