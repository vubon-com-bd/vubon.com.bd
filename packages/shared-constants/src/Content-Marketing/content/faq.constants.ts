/**
 * FAQ ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * FAQ ম্যানেজমেন্ট মডিউলের নাম
 */
export const FAQ_MODULE_NAME = 'FAQ Management';

/**
 * FAQ এর ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_FAQ_STATUS = 'active' as const;

/**
 * FAQ প্রশ্নের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_FAQ_QUESTION_LENGTH = 500;

/**
 * FAQ উত্তরের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_FAQ_ANSWER_LENGTH = 5000;

/**
 * FAQ সাজানোর জন্য অনুমোদিত ফিল্ডসমূহ
 */
export const FAQ_SORT_FIELDS = ['order', 'createdAt', 'category'] as const;

/**
 * FAQ স্ট্যাটাস টাইপ
 */
export type FaqStatus = typeof DEFAULT_FAQ_STATUS | 'inactive';

/**
 * FAQ সাজানোর ফিল্ড টাইপ
 */
export type FaqSortField = (typeof FAQ_SORT_FIELDS)[number];

/**
 * FAQ ক্যাটাগরি টাইপ
 */
export type FaqCategory = string;

/**
 * FAQ ইন্টারফেস
 */
export interface Faq {
  id: string;
  question: string;
  answer: string;
  status: FaqStatus;
  category: FaqCategory;
  order: number;
  isFeatured: boolean;
  views: number;
  helpfulCount: number;
  notHelpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
  metadata?: FaqMetadata;
}

/**
 * FAQ মেটাডেটা ইন্টারফেস
 */
export interface FaqMetadata {
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  relatedFaqIds?: string[];
  authorId?: string;
  lastReviewedAt?: Date;
  reviewedBy?: string;
}

/**
 * FAQ তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateFaqInput {
  question: string;
  answer: string;
  category: FaqCategory;
  status?: FaqStatus;
  order?: number;
  isFeatured?: boolean;
  tags?: string[];
  metadata?: FaqMetadata;
}

/**
 * FAQ আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateFaqInput {
  question?: string;
  answer?: string;
  category?: FaqCategory;
  status?: FaqStatus;
  order?: number;
  isFeatured?: boolean;
  tags?: string[];
  metadata?: FaqMetadata;
}

/**
 * FAQ ফিল্টার ইন্টারফেস
 */
export interface FaqFilter {
  search?: string;
  status?: FaqStatus;
  category?: FaqCategory;
  isFeatured?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: FaqSortField;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * FAQ স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidFaqStatus(status: string): status is FaqStatus {
  const validStatuses: FaqStatus[] = ['active', 'inactive'];
  return validStatuses.includes(status as FaqStatus);
}

/**
 * FAQ সাজানোর ফিল্ড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidFaqSortField(field: string): field is FaqSortField {
  return FAQ_SORT_FIELDS.includes(field as FaqSortField);
}

/**
 * FAQ প্রশ্ন বৈধ কিনা চেক করার ফাংশন
 */
export function isValidFaqQuestion(question: string): boolean {
  if (!question || typeof question !== 'string') {
    return false;
  }
  const trimmedQuestion = question.trim();
  return trimmedQuestion.length > 0 && trimmedQuestion.length <= MAX_FAQ_QUESTION_LENGTH;
}

/**
 * FAQ উত্তর বৈধ কিনা চেক করার ফাংশন
 */
export function isValidFaqAnswer(answer: string): boolean {
  if (!answer || typeof answer !== 'string') {
    return false;
  }
  const trimmedAnswer = answer.trim();
  return trimmedAnswer.length > 0 && trimmedAnswer.length <= MAX_FAQ_ANSWER_LENGTH;
}

/**
 * FAQ সক্রিয় কিনা চেক করার ফাংশন
 */
export function isFaqActive(status: FaqStatus): boolean {
  return status === 'active';
}

/**
 * FAQ নিষ্ক্রিয় কিনা চেক করার ফাংশন
 */
export function isFaqInactive(status: FaqStatus): boolean {
  return status === 'inactive';
}

/**
 * FAQ প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isFaqPublishable(status: FaqStatus): boolean {
  return status === 'active';
}

/**
 * FAQ এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isFaqEditable(status: FaqStatus): boolean {
  return status === 'active' || status === 'inactive';
}

/**
 * FAQ স্ট্যাটাস টগল করার ফাংশন
 */
export function toggleFaqStatus(faq: Faq): Faq {
  const newStatus: FaqStatus = faq.status === 'active' ? 'inactive' : 'active';
  return {
    ...faq,
    status: newStatus,
    updatedAt: new Date(),
  };
}

/**
 * FAQ অর্ডার আপডেট করার ফাংশন
 */
export function updateFaqOrder(faqs: Faq[], orderMap: Record<string, number>): Faq[] {
  return faqs.map((faq) => {
    const newOrder = orderMap[faq.id];
    if (newOrder !== undefined) {
      return {
        ...faq,
        order: newOrder,
        updatedAt: new Date(),
      };
    }
    return faq;
  });
}

/**
 * FAQ স্ট্যাটাস লেবেল পাওয়ার ফাংশন
 */
export function getFaqStatusLabel(status: FaqStatus): { en: string; bn: string } {
  const labels: Record<FaqStatus, { en: string; bn: string }> = {
    active: {
      en: 'Active',
      bn: 'সক্রিয়',
    },
    inactive: {
      en: 'Inactive',
      bn: 'নিষ্ক্রিয়',
    },
  };
  return labels[status];
}

/**
 * FAQ স্ট্যাটাস কালার পাওয়ার ফাংশন
 */
export function getFaqStatusColor(status: FaqStatus): string {
  const colors: Record<FaqStatus, string> = {
    active: 'green',
    inactive: 'gray',
  };
  return colors[status];
}

/**
 * ডিফল্ট FAQ স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultFaqStatus(): FaqStatus {
  return DEFAULT_FAQ_STATUS;
}
