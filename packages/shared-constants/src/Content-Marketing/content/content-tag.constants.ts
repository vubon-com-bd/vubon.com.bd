/**
 * কন্টেন্ট ট্যাগ সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ট্যাগ নামের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_TAG_NAME_LENGTH = 30;

/**
 * ট্যাগ নামের সর্বনিম্ন দৈর্ঘ্য
 */
export const MIN_TAG_NAME_LENGTH = 2;

/**
 * প্রতি কন্টেন্টে সর্বোচ্চ ট্যাগ সংখ্যা
 */
export const MAX_TAGS_PER_CONTENT = 10;

/**
 * জনপ্রিয় ট্যাগ লিমিট
 */
export const POPULAR_TAGS_LIMIT = 20;

/**
 * ট্যাগ সাজানোর জন্য অনুমোদিত ফিল্ডসমূহ
 */
export const TAG_SORT_FIELDS = ['name', 'usageCount', 'createdAt'] as const;

/**
 * ট্যাগ সাজানোর ফিল্ড টাইপ
 */
export type TagSortField = (typeof TAG_SORT_FIELDS)[number];

/**
 * ট্যাগ ইন্টারফেস
 */
export interface TagInterface {
  id: string;
  name: string;
  slug: string;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  metadata?: TagMetadata;
}

/**
 * ট্যাগ মেটাডেটা ইন্টারফেস
 */
export interface TagMetadata {
  description?: string;
  color?: string;
  icon?: string;
  seoTitle?: string;
  seoDescription?: string;
}

/**
 * ট্যাগ তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateTagInput {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  seoTitle?: string;
  seoDescription?: string;
}

/**
 * ট্যাগ আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateTagInput {
  name?: string;
  description?: string;
  color?: string;
  icon?: string;
  seoTitle?: string;
  seoDescription?: string;
  isActive?: boolean;
}

/**
 * ট্যাগ ফিল্টার ইন্টারফেস
 */
export interface TagFilter {
  search?: string;
  isActive?: boolean;
  sortBy?: TagSortField;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  minUsageCount?: number;
  maxUsageCount?: number;
}

/**
 * ট্যাগ নাম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTagName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  const trimmedName = name.trim();
  return trimmedName.length >= MIN_TAG_NAME_LENGTH && trimmedName.length <= MAX_TAG_NAME_LENGTH;
}

/**
 * ট্যাগ স্লাগ তৈরির ফাংশন
 */
export function generateTagSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * ট্যাগ সাজানোর ফিল্ড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTagSortField(field: string): field is TagSortField {
  return TAG_SORT_FIELDS.includes(field as TagSortField);
}

/**
 * ট্যাগের ব্যবহারযোগ্যতা চেক করার ফাংশন
 */
export function isTagUsable(tag: TagInterface): boolean {
  return tag.isActive && tag.usageCount >= 0;
}

/**
 * জনপ্রিয় ট্যাগ ফিল্টার করার ফাংশন
 */
export function filterPopularTags(tags: TagInterface[]): TagInterface[] {
  return tags
    .filter((tag) => tag.isActive)
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, POPULAR_TAGS_LIMIT);
}

/**
 * ট্যাগ নাম স্বাভাবিক করার ফাংশন
 */
export function normalizeTagName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

/**
 * ট্যাগগুলো বৈধ কিনা চেক করার ফাংশন
 */
export function areTagsValid(tags: string[]): boolean {
  if (tags.length > MAX_TAGS_PER_CONTENT) {
    return false;
  }
  return tags.every((tag) => isValidTagName(tag));
}

/**
 * ট্যাগের ইউনিক নাম চেক করার ফাংশন
 */
export function getUniqueTagNames(tags: string[]): string[] {
  const normalized = tags.map((tag) => normalizeTagName(tag));
  return [...new Set(normalized)];
}
