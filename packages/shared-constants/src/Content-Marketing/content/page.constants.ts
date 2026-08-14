/**
 * পেজ ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * পেজ ম্যানেজমেন্ট মডিউলের নাম
 */
export const PAGE_MODULE_NAME = 'Page Management';

/**
 * পেজের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_PAGE_STATUS = 'draft' as const;

/**
 * পেজের ডিফল্ট টেমপ্লেট
 */
export const DEFAULT_PAGE_TEMPLATE = 'default' as const;

/**
 * পেজ সাজানোর জন্য অনুমোদিত ফিল্ডসমূহ
 */
export const PAGE_SORT_FIELDS = ['createdAt', 'updatedAt', 'title', 'order'] as const;

/**
 * পেজ টাইটেলের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_PAGE_TITLE_LENGTH = 200;

/**
 * পেজ বডির সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_PAGE_BODY_LENGTH = 1000000;

/**
 * সিস্টেম পেজসমূহ
 */
export const SYSTEM_PAGES = ['home', 'about', 'contact', 'privacy', 'terms'] as const;

/**
 * পেজ সাজানোর ফিল্ড টাইপ
 */
export type PageSortField = (typeof PAGE_SORT_FIELDS)[number];

/**
 * পেজ স্ট্যাটাস টাইপ
 */
export type PageStatus = typeof DEFAULT_PAGE_STATUS;

/**
 * পেজ টেমপ্লেট টাইপ
 */
export type PageTemplate = typeof DEFAULT_PAGE_TEMPLATE;

/**
 * সিস্টেম পেজ টাইপ
 */
export type SystemPage = (typeof SYSTEM_PAGES)[number];

/**
 * পেজ ইন্টারফেস
 */
export interface PageInterface {
  id: string;
  title: string;
  slug: string;
  body: string;
  status: PageStatus;
  template: PageTemplate;
  order: number;
  isSystemPage: boolean;
  systemPageType?: SystemPage;
  authorId: string;
  parentId?: string;
  children?: PageInterface[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: PageMetadata;
}

/**
 * পেজ মেটাডেটা ইন্টারফেস
 */
export interface PageMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  hideFromMenu?: boolean;
  showInFooter?: boolean;
}

/**
 * পেজ তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreatePageInput {
  title: string;
  slug: string;
  body: string;
  template?: PageTemplate;
  order?: number;
  parentId?: string;
  isSystemPage?: boolean;
  systemPageType?: SystemPage;
  metadata?: PageMetadata;
  status?: PageStatus;
}

/**
 * পেজ আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdatePageInput {
  title?: string;
  slug?: string;
  body?: string;
  template?: PageTemplate;
  order?: number;
  parentId?: string;
  isSystemPage?: boolean;
  systemPageType?: SystemPage;
  metadata?: PageMetadata;
  status?: PageStatus;
}

/**
 * পেজ ফিল্টার ইন্টারফেস
 */
export interface PageFilter {
  search?: string;
  status?: PageStatus;
  template?: PageTemplate;
  parentId?: string;
  isSystemPage?: boolean;
  systemPageType?: SystemPage;
  sortBy?: PageSortField;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * পেজ সাজানোর ফিল্ড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPageSortField(field: string): field is PageSortField {
  return PAGE_SORT_FIELDS.includes(field as PageSortField);
}

/**
 * পেজ স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPageStatus(status: string): status is PageStatus {
  return status === 'draft';
}

/**
 * পেজ টেমপ্লেট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPageTemplate(template: string): template is PageTemplate {
  return template === 'default';
}

/**
 * সিস্টেম পেজ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSystemPage(page: string): page is SystemPage {
  return SYSTEM_PAGES.includes(page as SystemPage);
}

/**
 * পেজ স্লাগ তৈরির ফাংশন
 */
export function generatePageSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * পেজ টাইটেল বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPageTitle(title: string): boolean {
  if (!title || typeof title !== 'string') {
    return false;
  }
  const trimmedTitle = title.trim();
  return trimmedTitle.length > 0 && trimmedTitle.length <= MAX_PAGE_TITLE_LENGTH;
}

/**
 * পেজ বডি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPageBody(body: string): boolean {
  if (!body || typeof body !== 'string') {
    return false;
  }
  return body.length > 0 && body.length <= MAX_PAGE_BODY_LENGTH;
}

/**
 * পেজ প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isPagePublished(page: PageInterface): boolean {
  return page.status === 'draft';
}

/**
 * পেজ এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isPageEditable(page: PageInterface): boolean {
  return page.status === 'draft';
}

/**
 * পেজ সিস্টেম পেজ কিনা চেক করার ফাংশন
 */
export function isSystemPageType(page: PageInterface): boolean {
  return page.isSystemPage && page.systemPageType !== undefined;
}

/**
 * সব সিস্টেম পেজের তালিকা পাওয়ার ফাংশন
 */
export function getAllSystemPages(): readonly SystemPage[] {
  return SYSTEM_PAGES;
}

/**
 * ডিফল্ট পেজ টেমপ্লেট পাওয়ার ফাংশন
 */
export function getDefaultPageTemplate(): PageTemplate {
  return DEFAULT_PAGE_TEMPLATE;
}

/**
 * ডিফল্ট পেজ স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultPageStatus(): PageStatus {
  return DEFAULT_PAGE_STATUS;
}
