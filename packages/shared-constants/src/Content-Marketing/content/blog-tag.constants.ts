/**
 * ব্লগ ট্যাগ সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ব্লগ ট্যাগ নামের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_BLOG_TAG_NAME_LENGTH = 30;

/**
 * প্রতি পোস্টে সর্বোচ্চ ট্যাগ সংখ্যা
 */
export const MAX_BLOG_TAGS_PER_POST = 10;

/**
 * জনপ্রিয় ব্লগ ট্যাগ লিমিট
 */
export const POPULAR_BLOG_TAGS_LIMIT = 15;

/**
 * ব্লগ ট্যাগ টাইপ
 */
export type BlogTagName = string;

/**
 * ব্লগ ট্যাগ ইন্টারফেস
 */
export interface BlogTagInterface {
  id: string;
  name: string;
  slug: string;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

/**
 * ব্লগ ট্যাগ তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateBlogTagInput {
  name: string;
  slug: string;
  isActive?: boolean;
}

/**
 * ব্লগ ট্যাগ আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateBlogTagInput {
  name?: string;
  slug?: string;
  isActive?: boolean;
}

/**
 * ব্লগ ট্যাগ ফিল্টার ইন্টারফেস
 */
export interface BlogTagFilter {
  search?: string;
  isActive?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'usageCount' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * ব্লগ ট্যাগ নাম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidBlogTagName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  const trimmedName = name.trim();
  return trimmedName.length > 0 && trimmedName.length <= MAX_BLOG_TAG_NAME_LENGTH;
}

/**
 * ব্লগ ট্যাগ স্লাগ তৈরির ফাংশন
 */
export function generateBlogTagSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * ট্যাগের ব্যবহারযোগ্যতা চেক করার ফাংশন
 */
export function isBlogTagUsable(tag: BlogTagInterface): boolean {
  return tag.isActive && tag.usageCount >= 0;
}

/**
 * জনপ্রিয় ব্লগ ট্যাগ ফিল্টার করার ফাংশন
 */
export function filterPopularBlogTags(tags: BlogTagInterface[]): BlogTagInterface[] {
  return tags
    .filter((tag) => tag.isActive)
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, POPULAR_BLOG_TAGS_LIMIT);
}

/**
 * ব্লগ ট্যাগ নাম স্বাভাবিক করার ফাংশন
 */
export function normalizeBlogTagName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

/**
 * ব্লগ ট্যাগগুলো বৈধ কিনা চেক করার ফাংশন
 */
export function areBlogTagsValid(tags: string[]): boolean {
  if (tags.length > MAX_BLOG_TAGS_PER_POST) {
    return false;
  }
  return tags.every((tag) => isValidBlogTagName(tag));
}

/**
 * ইউনিক ব্লগ ট্যাগ নাম পাওয়ার ফাংশন
 */
export function getUniqueBlogTagNames(tags: string[]): string[] {
  const normalized = tags.map((tag) => normalizeBlogTagName(tag));
  return [...new Set(normalized)];
}

/**
 * ট্যাগ ব্যবহার কাউন্ট ইনক্রিমেন্ট করার ফাংশন
 */
export function incrementBlogTagUsage(tag: BlogTagInterface): BlogTagInterface {
  return {
    ...tag,
    usageCount: tag.usageCount + 1,
  };
}

/**
 * ট্যাগ ব্যবহার কাউন্ট ডিক্রিমেন্ট করার ফাংশন
 */
export function decrementBlogTagUsage(tag: BlogTagInterface): BlogTagInterface {
  return {
    ...tag,
    usageCount: Math.max(0, tag.usageCount - 1),
  };
}

/**
 * সব ব্লগ ট্যাগের তালিকা পাওয়ার ফাংশন (ডিফল্ট খালি অ্যারে)
 */
export function getDefaultBlogTags(): BlogTagInterface[] {
  return [];
}
