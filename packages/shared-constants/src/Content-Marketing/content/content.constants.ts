/**
 * কন্টেন্ট ম্যানেজমেন্ট মডিউলের জন্য কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * কন্টেন্ট ম্যানেজমেন্ট মডিউলের নাম
 */
export const CONTENT_MODULE_NAME = 'Content Management';

/**
 * কন্টেন্টের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_CONTENT_STATUS = 'draft' as const;

/**
 * কন্টেন্ট সাজানোর জন্য অনুমোদিত ফিল্ডসমূহ
 */
export const CONTENT_SORT_FIELDS = ['createdAt', 'updatedAt', 'title', 'views'] as const;

/**
 * কন্টেন্ট লিস্টিংয়ে প্রতি পেজে কতটি আইটেম দেখাবে
 */
export const CONTENT_PAGE_SIZE = 20;

/**
 * কন্টেন্ট টাইটেলের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_CONTENT_TITLE_LENGTH = 255;

/**
 * কন্টেন্ট এক্সার্পটের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_CONTENT_EXCERPT_LENGTH = 500;

/**
 * কন্টেন্ট বডির সর্বোচ্চ দৈর্ঘ্য (১ মিলিয়ন ক্যারেক্টার)
 */
export const MAX_CONTENT_BODY_LENGTH = 1000000;

/**
 * কন্টেন্ট স্ট্যাটাস টাইপ
 */
export type ContentStatus = typeof DEFAULT_CONTENT_STATUS;

/**
 * কন্টেন্ট সাজানোর ফিল্ড টাইপ
 */
export type ContentSortField = (typeof CONTENT_SORT_FIELDS)[number];
