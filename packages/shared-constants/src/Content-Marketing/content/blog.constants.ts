/**
 * ব্লগ ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ব্লগ ম্যানেজমেন্ট মডিউলের নাম
 */
export const BLOG_MODULE_NAME = 'Blog Management';

/**
 * ব্লগের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_BLOG_STATUS = 'draft' as const;

/**
 * ব্লগ সাজানোর জন্য অনুমোদিত ফিল্ডসমূহ
 */
export const BLOG_SORT_FIELDS = ['createdAt', 'updatedAt', 'title', 'views', 'likes'] as const;

/**
 * ব্লগ লিস্টিংয়ে প্রতি পেজে কতটি আইটেম দেখাবে
 */
export const BLOG_PAGE_SIZE = 10;

/**
 * ব্লগ টাইটেলের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_BLOG_TITLE_LENGTH = 200;

/**
 * ব্লগ এক্সার্পটের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_BLOG_EXCERPT_LENGTH = 300;

/**
 * ব্লগ বডির সর্বোচ্চ দৈর্ঘ্য (৫ লক্ষ ক্যারেক্টার)
 */
export const MAX_BLOG_BODY_LENGTH = 500000;

/**
 * ব্লগ পড়ার সময় গণনার জন্য প্রতি মিনিটে পড়ার শব্দ সংখ্যা
 */
export const BLOG_READING_TIME_WORDS_PER_MINUTE = 200;

/**
 * ডিফল্ট ব্লগ কভার ইমেজ
 */
export const DEFAULT_BLOG_COVER_IMAGE = '/images/default-blog-cover.jpg';

/**
 * ব্লগ সাজানোর ফিল্ড টাইপ
 */
export type BlogSortField = (typeof BLOG_SORT_FIELDS)[number];

/**
 * ব্লগ স্ট্যাটাস টাইপ
 */
export type BlogStatus = typeof DEFAULT_BLOG_STATUS;

/**
 * ব্লগ ইন্টারফেস
 */
export interface BlogInterface {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: BlogStatus;
  coverImage: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  views: number;
  likes: number;
  readingTime: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: BlogMetadata;
}

/**
 * ব্লগ মেটাডেটা ইন্টারফেস
 */
export interface BlogMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  featured?: boolean;
}

/**
 * ব্লগ তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateBlogInput {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  categoryId: string;
  tags?: string[];
  coverImage?: string;
  status?: BlogStatus;
  metadata?: BlogMetadata;
}

/**
 * ব্লগ আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateBlogInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  body?: string;
  categoryId?: string;
  tags?: string[];
  coverImage?: string;
  status?: BlogStatus;
  metadata?: BlogMetadata;
}

/**
 * ব্লগ ফিল্টার ইন্টারফেস
 */
export interface BlogFilter {
  search?: string;
  status?: BlogStatus | BlogStatus[];
  categoryId?: string;
  authorId?: string;
  tag?: string;
  featured?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: BlogSortField;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * ব্লগ সাজানোর ফিল্ড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidBlogSortField(field: string): field is BlogSortField {
  return BLOG_SORT_FIELDS.includes(field as BlogSortField);
}

/**
 * ব্লগ স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidBlogStatus(status: string): status is BlogStatus {
  return status === 'draft';
}

/**
 * ব্লগ পড়ার সময় গণনা করার ফাংশন
 */
export function calculateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / BLOG_READING_TIME_WORDS_PER_MINUTE);
}

/**
 * ব্লগ স্লাগ তৈরির ফাংশন
 */
export function generateBlogSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * ব্লগ টাইটেল বৈধ কিনা চেক করার ফাংশন
 */
export function isValidBlogTitle(title: string): boolean {
  return title.length > 0 && title.length <= MAX_BLOG_TITLE_LENGTH;
}

/**
 * ব্লগ এক্সার্পট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidBlogExcerpt(excerpt: string): boolean {
  return excerpt.length <= MAX_BLOG_EXCERPT_LENGTH;
}

/**
 * ব্লগ বডি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidBlogBody(body: string): boolean {
  return body.length > 0 && body.length <= MAX_BLOG_BODY_LENGTH;
}

/**
 * ব্লগ প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isBlogPublished(blog: BlogInterface): boolean {
  return blog.status === 'draft';
}

/**
 * ব্লগ এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isBlogEditable(blog: BlogInterface): boolean {
  return blog.status === 'draft';
}
