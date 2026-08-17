/**
 * টেস্টিমোনিয়াল ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * টেস্টিমোনিয়াল ম্যানেজমেন্ট মডিউলের নাম
 */
export const TESTIMONIAL_MODULE_NAME = 'Testimonial Management';

/**
 * টেস্টিমোনিয়ালের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_TESTIMONIAL_STATUS = 'pending' as const;

/**
 * টেস্টিমোনিয়াল কন্টেন্টের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_TESTIMONIAL_CONTENT_LENGTH = 2000;

/**
 * টেস্টিমোনিয়াল লেখকের নামের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_TESTIMONIAL_AUTHOR_NAME_LENGTH = 100;

/**
 * টেস্টিমোনিয়াল সাজানোর জন্য অনুমোদিত ফিল্ডসমূহ
 */
export const TESTIMONIAL_SORT_FIELDS = ['createdAt', 'rating', 'order'] as const;

/**
 * টেস্টিমোনিয়াল স্ট্যাটাস টাইপ
 */
export type TestimonialStatus = typeof DEFAULT_TESTIMONIAL_STATUS | 'approved' | 'rejected';

/**
 * টেস্টিমোনিয়াল সাজানোর ফিল্ড টাইপ
 */
export type TestimonialSortField = (typeof TESTIMONIAL_SORT_FIELDS)[number];

/**
 * টেস্টিমোনিয়াল ইন্টারফেস
 */
export interface Testimonial {
  id: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  authorTitle?: string;
  authorCompany?: string;
  content: string;
  rating: number;
  status: TestimonialStatus;
  order: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata?: TestimonialMetadata;
}

/**
 * টেস্টিমোনিয়াল মেটাডেটা ইন্টারফেস
 */
export interface TestimonialMetadata {
  source?: string;
  pageUrl?: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  tags?: string[];
  response?: string;
  respondedAt?: Date;
}

/**
 * টেস্টিমোনিয়াল তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateTestimonialInput {
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  authorTitle?: string;
  authorCompany?: string;
  content: string;
  rating: number;
  isFeatured?: boolean;
  source?: string;
  pageUrl?: string;
}

/**
 * টেস্টিমোনিয়াল আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateTestimonialInput {
  authorName?: string;
  authorEmail?: string;
  authorAvatar?: string;
  authorTitle?: string;
  authorCompany?: string;
  content?: string;
  rating?: number;
  status?: TestimonialStatus;
  order?: number;
  isFeatured?: boolean;
  metadata?: TestimonialMetadata;
}

/**
 * টেস্টিমোনিয়াল ফিল্টার ইন্টারফেস
 */
export interface TestimonialFilter {
  search?: string;
  status?: TestimonialStatus;
  rating?: number;
  isFeatured?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: TestimonialSortField;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * টেস্টিমোনিয়াল স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTestimonialStatus(status: string): status is TestimonialStatus {
  const validStatuses: TestimonialStatus[] = ['pending', 'approved', 'rejected'];
  return validStatuses.includes(status as TestimonialStatus);
}

/**
 * টেস্টিমোনিয়াল সাজানোর ফিল্ড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTestimonialSortField(field: string): field is TestimonialSortField {
  return TESTIMONIAL_SORT_FIELDS.includes(field as TestimonialSortField);
}

/**
 * টেস্টিমোনিয়াল রেটিং বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTestimonialRating(rating: number): boolean {
  return rating >= 1 && rating <= 5 && Number.isInteger(rating);
}

/**
 * টেস্টিমোনিয়াল কন্টেন্ট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTestimonialContent(content: string): boolean {
  if (!content || typeof content !== 'string') {
    return false;
  }
  const trimmedContent = content.trim();
  return trimmedContent.length > 0 && trimmedContent.length <= MAX_TESTIMONIAL_CONTENT_LENGTH;
}

/**
 * টেস্টিমোনিয়াল লেখকের নাম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTestimonialAuthorName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  const trimmedName = name.trim();
  return trimmedName.length > 0 && trimmedName.length <= MAX_TESTIMONIAL_AUTHOR_NAME_LENGTH;
}

/**
 * টেস্টিমোনিয়াল পেন্ডিং কিনা চেক করার ফাংশন
 */
export function isTestimonialPending(status: TestimonialStatus): boolean {
  return status === 'pending';
}

/**
 * টেস্টিমোনিয়াল অনুমোদিত কিনা চেক করার ফাংশন
 */
export function isTestimonialApproved(status: TestimonialStatus): boolean {
  return status === 'approved';
}

/**
 * টেস্টিমোনিয়াল রিজেক্টেড কিনা চেক করার ফাংশন
 */
export function isTestimonialRejected(status: TestimonialStatus): boolean {
  return status === 'rejected';
}

/**
 * টেস্টিমোনিয়াল প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isTestimonialPublishable(status: TestimonialStatus): boolean {
  return status === 'approved';
}

/**
 * টেস্টিমোনিয়াল এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isTestimonialEditable(status: TestimonialStatus): boolean {
  return status === 'pending' || status === 'approved';
}

/**
 * টেস্টিমোনিয়াল অনুমোদন করার ফাংশন
 */
export function approveTestimonial(testimonial: Testimonial): Testimonial {
  return {
    ...testimonial,
    status: 'approved',
    updatedAt: new Date(),
  };
}

/**
 * টেস্টিমোনিয়াল রিজেক্ট করার ফাংশন
 */
export function rejectTestimonial(testimonial: Testimonial): Testimonial {
  return {
    ...testimonial,
    status: 'rejected',
    updatedAt: new Date(),
  };
}

/**
 * টেস্টিমোনিয়াল ফিচার্ড টগল করার ফাংশন
 */
export function toggleTestimonialFeatured(testimonial: Testimonial): Testimonial {
  return {
    ...testimonial,
    isFeatured: !testimonial.isFeatured,
    updatedAt: new Date(),
  };
}

/**
 * টেস্টিমোনিয়াল অর্ডার আপডেট করার ফাংশন
 */
export function updateTestimonialOrder(
  testimonials: Testimonial[],
  orderMap: Record<string, number>
): Testimonial[] {
  return testimonials.map((testimonial) => {
    const newOrder = orderMap[testimonial.id];
    if (newOrder !== undefined) {
      return {
        ...testimonial,
        order: newOrder,
        updatedAt: new Date(),
      };
    }
    return testimonial;
  });
}

/**
 * টেস্টিমোনিয়াল স্ট্যাটাসের লেবেল পাওয়ার ফাংশন
 */
export function getTestimonialStatusLabel(status: TestimonialStatus): { en: string; bn: string } {
  const labels: Record<TestimonialStatus, { en: string; bn: string }> = {
    pending: {
      en: 'Pending Review',
      bn: 'পর্যালোচনার অপেক্ষায়',
    },
    approved: {
      en: 'Approved',
      bn: 'অনুমোদিত',
    },
    rejected: {
      en: 'Rejected',
      bn: 'প্রত্যাখ্যাত',
    },
  };
  return labels[status];
}

/**
 * টেস্টিমোনিয়াল স্ট্যাটাসের কালার পাওয়ার ফাংশন
 */
export function getTestimonialStatusColor(status: TestimonialStatus): string {
  const colors: Record<TestimonialStatus, string> = {
    pending: 'yellow',
    approved: 'green',
    rejected: 'red',
  };
  return colors[status];
}

/**
 * ডিফল্ট টেস্টিমোনিয়াল স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultTestimonialStatus(): TestimonialStatus {
  return DEFAULT_TESTIMONIAL_STATUS;
}
