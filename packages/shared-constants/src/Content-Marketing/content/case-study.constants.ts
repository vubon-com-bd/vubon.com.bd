/**
 * কেস স্টাডি ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * কেস স্টাডি ম্যানেজমেন্ট মডিউলের নাম
 */
export const CASE_STUDY_MODULE_NAME = 'Case Study Management';

/**
 * কেস স্টাডির ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_CASE_STUDY_STATUS = 'draft' as const;

/**
 * কেস স্টাডি টাইটেলের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_CASE_STUDY_TITLE_LENGTH = 200;

/**
 * কেস স্টাডি স্ট্যাটাস টাইপ
 */
export type CaseStudyStatus = typeof DEFAULT_CASE_STUDY_STATUS | 'published' | 'archived';

/**
 * কেস স্টাডি ইন্টারফেস
 */
export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  status: CaseStudyStatus;
  clientName: string;
  clientLogo?: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  testimonial?: string;
  coverImage?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: CaseStudyMetadata;
}

/**
 * কেস স্টাডি মেটাডেটা ইন্টারফেস
 */
export interface CaseStudyMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  tags?: string[];
  categories?: string[];
  isFeatured?: boolean;
  relatedCaseStudies?: string[];
  metrics?: CaseStudyMetrics;
}

/**
 * কেস স্টাডি মেট্রিক্স ইন্টারফেস
 */
export interface CaseStudyMetrics {
  revenue?: string;
  growth?: string;
  roi?: string;
  satisfaction?: string;
  customMetrics?: Record<string, string>;
}

/**
 * কেস স্টাডি তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateCaseStudyInput {
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  clientLogo?: string;
  testimonial?: string;
  coverImage?: string;
  metadata?: CaseStudyMetadata;
  status?: CaseStudyStatus;
}

/**
 * কেস স্টাডি আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateCaseStudyInput {
  title?: string;
  slug?: string;
  clientName?: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  clientLogo?: string;
  testimonial?: string;
  coverImage?: string;
  status?: CaseStudyStatus;
  metadata?: CaseStudyMetadata;
}

/**
 * কেস স্টাডি ফিল্টার ইন্টারফেস
 */
export interface CaseStudyFilter {
  search?: string;
  status?: CaseStudyStatus;
  industry?: string;
  clientName?: string;
  isFeatured?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'publishedAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * কেস স্টাডি স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCaseStudyStatus(status: string): status is CaseStudyStatus {
  const validStatuses: CaseStudyStatus[] = ['draft', 'published', 'archived'];
  return validStatuses.includes(status as CaseStudyStatus);
}

/**
 * কেস স্টাডি টাইটেল বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCaseStudyTitle(title: string): boolean {
  if (!title || typeof title !== 'string') {
    return false;
  }
  const trimmedTitle = title.trim();
  return trimmedTitle.length > 0 && trimmedTitle.length <= MAX_CASE_STUDY_TITLE_LENGTH;
}

/**
 * কেস স্টাডি ড্রাফট কিনা চেক করার ফাংশন
 */
export function isCaseStudyDraft(status: CaseStudyStatus): boolean {
  return status === 'draft';
}

/**
 * কেস স্টাডি প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isCaseStudyPublished(status: CaseStudyStatus): boolean {
  return status === 'published';
}

/**
 * কেস স্টাডি আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isCaseStudyArchived(status: CaseStudyStatus): boolean {
  return status === 'archived';
}

/**
 * কেস স্টাডি প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isCaseStudyPublishable(status: CaseStudyStatus): boolean {
  return status === 'draft';
}

/**
 * কেস স্টাডি এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isCaseStudyEditable(status: CaseStudyStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * কেস স্টাডি স্ট্যাটাস লেবেল পাওয়ার ফাংশন
 */
export function getCaseStudyStatusLabel(status: CaseStudyStatus): { en: string; bn: string } {
  const labels: Record<CaseStudyStatus, { en: string; bn: string }> = {
    draft: {
      en: 'Draft',
      bn: 'খসড়া',
    },
    published: {
      en: 'Published',
      bn: 'প্রকাশিত',
    },
    archived: {
      en: 'Archived',
      bn: 'আর্কাইভড',
    },
  };
  return labels[status];
}

/**
 * কেস স্টাডি স্ট্যাটাস কালার পাওয়ার ফাংশন
 */
export function getCaseStudyStatusColor(status: CaseStudyStatus): string {
  const colors: Record<CaseStudyStatus, string> = {
    draft: 'gray',
    published: 'green',
    archived: 'orange',
  };
  return colors[status];
}

/**
 * ডিফল্ট কেস স্টাডি স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultCaseStudyStatus(): CaseStudyStatus {
  return DEFAULT_CASE_STUDY_STATUS;
}

/**
 * কেস স্টাডি স্লাগ তৈরির ফাংশন
 */
export function generateCaseStudySlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
