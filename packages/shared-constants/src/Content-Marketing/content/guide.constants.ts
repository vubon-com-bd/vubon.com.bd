/**
 * গাইড ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * গাইড ম্যানেজমেন্ট মডিউলের নাম
 */
export const GUIDE_MODULE_NAME = 'Guide Management';

/**
 * গাইডের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_GUIDE_STATUS = 'draft' as const;

/**
 * গাইডের ধরনসমূহ
 */
export const GUIDE_TYPES = ['beginner', 'intermediate', 'advanced'] as const;

/**
 * গাইড টাইটেলের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_GUIDE_TITLE_LENGTH = 200;

/**
 * গাইড বডির সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_GUIDE_BODY_LENGTH = 1000000;

/**
 * গাইড স্ট্যাটাস টাইপ
 */
export type GuideStatus = typeof DEFAULT_GUIDE_STATUS | 'published' | 'archived';

/**
 * গাইড টাইপ টাইপ
 */
export type GuideType = (typeof GUIDE_TYPES)[number];

/**
 * গাইড ইন্টারফেস
 */
export interface Guide {
  id: string;
  title: string;
  slug: string;
  body: string;
  type: GuideType;
  status: GuideStatus;
  authorId: string;
  excerpt?: string;
  coverImage?: string;
  estimatedReadTime?: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: GuideMetadata;
}

/**
 * গাইড মেটাডেটা ইন্টারফেস
 */
export interface GuideMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  tags?: string[];
  categories?: string[];
  isFeatured?: boolean;
  tableOfContents?: string[];
}

/**
 * গাইড তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateGuideInput {
  title: string;
  slug: string;
  body: string;
  type: GuideType;
  excerpt?: string;
  coverImage?: string;
  authorId: string;
  metadata?: GuideMetadata;
  status?: GuideStatus;
}

/**
 * গাইড আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateGuideInput {
  title?: string;
  slug?: string;
  body?: string;
  type?: GuideType;
  excerpt?: string;
  coverImage?: string;
  status?: GuideStatus;
  metadata?: GuideMetadata;
}

/**
 * গাইড ফিল্টার ইন্টারফেস
 */
export interface GuideFilter {
  search?: string;
  type?: GuideType;
  status?: GuideStatus;
  authorId?: string;
  category?: string;
  tag?: string;
  isFeatured?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'publishedAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * গাইড স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidGuideStatus(status: string): status is GuideStatus {
  const validStatuses: GuideStatus[] = ['draft', 'published', 'archived'];
  return validStatuses.includes(status as GuideStatus);
}

/**
 * গাইড টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidGuideType(type: string): type is GuideType {
  return GUIDE_TYPES.includes(type as GuideType);
}

/**
 * গাইড টাইটেল বৈধ কিনা চেক করার ফাংশন
 */
export function isValidGuideTitle(title: string): boolean {
  if (!title || typeof title !== 'string') {
    return false;
  }
  const trimmedTitle = title.trim();
  return trimmedTitle.length > 0 && trimmedTitle.length <= MAX_GUIDE_TITLE_LENGTH;
}

/**
 * গাইড বডি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidGuideBody(body: string): boolean {
  if (!body || typeof body !== 'string') {
    return false;
  }
  return body.length > 0 && body.length <= MAX_GUIDE_BODY_LENGTH;
}

/**
 * গাইড ড্রাফট কিনা চেক করার ফাংশন
 */
export function isGuideDraft(status: GuideStatus): boolean {
  return status === 'draft';
}

/**
 * গাইড প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isGuidePublished(status: GuideStatus): boolean {
  return status === 'published';
}

/**
 * গাইড আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isGuideArchived(status: GuideStatus): boolean {
  return status === 'archived';
}

/**
 * গাইড প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isGuidePublishable(status: GuideStatus): boolean {
  return status === 'draft';
}

/**
 * গাইড এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isGuideEditable(status: GuideStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * গাইড টাইপ লেবেল পাওয়ার ফাংশন
 */
export function getGuideTypeLabel(type: GuideType): { en: string; bn: string } {
  const labels: Record<GuideType, { en: string; bn: string }> = {
    beginner: {
      en: 'Beginner',
      bn: 'শিক্ষানবিশ',
    },
    intermediate: {
      en: 'Intermediate',
      bn: 'মাধ্যমিক',
    },
    advanced: {
      en: 'Advanced',
      bn: 'উন্নত',
    },
  };
  return labels[type];
}

/**
 * গাইড টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getGuideTypeDescription(type: GuideType): { en: string; bn: string } {
  const descriptions: Record<GuideType, { en: string; bn: string }> = {
    beginner: {
      en: 'For users who are new to the topic',
      bn: 'যারা বিষয়টিতে নতুন তাদের জন্য',
    },
    intermediate: {
      en: 'For users with some experience',
      bn: 'যাদের কিছু অভিজ্ঞতা আছে তাদের জন্য',
    },
    advanced: {
      en: 'For users with extensive experience',
      bn: 'যাদের ব্যাপক অভিজ্ঞতা আছে তাদের জন্য',
    },
  };
  return descriptions[type];
}

/**
 * গাইড স্ট্যাটাস লেবেল পাওয়ার ফাংশন
 */
export function getGuideStatusLabel(status: GuideStatus): { en: string; bn: string } {
  const labels: Record<GuideStatus, { en: string; bn: string }> = {
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
 * গাইড স্ট্যাটাস কালার পাওয়ার ফাংশন
 */
export function getGuideStatusColor(status: GuideStatus): string {
  const colors: Record<GuideStatus, string> = {
    draft: 'gray',
    published: 'green',
    archived: 'orange',
  };
  return colors[status];
}

/**
 * ডিফল্ট গাইড স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultGuideStatus(): GuideStatus {
  return DEFAULT_GUIDE_STATUS;
}

/**
 * ডিফল্ট গাইড টাইপ পাওয়ার ফাংশন
 */
export function getDefaultGuideType(): GuideType {
  return 'beginner';
}
