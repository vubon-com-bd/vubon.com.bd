/**
 * ঘোষণা ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ঘোষণা ম্যানেজমেন্ট মডিউলের নাম
 */
export const ANNOUNCEMENT_MODULE_NAME = 'Announcement Management';

/**
 * ঘোষণার ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_ANNOUNCEMENT_STATUS = 'draft' as const;

/**
 * ঘোষণার ডিফল্ট প্রায়োরিটি
 */
export const DEFAULT_ANNOUNCEMENT_PRIORITY = 'medium' as const;

/**
 * ঘোষণা সাজানোর জন্য অনুমোদিত ফিল্ডসমূহ
 */
export const ANNOUNCEMENT_SORT_FIELDS = ['createdAt', 'priority', 'expiryDate'] as const;

/**
 * ঘোষণা টাইটেলের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_ANNOUNCEMENT_TITLE_LENGTH = 200;

/**
 * ঘোষণা বডির সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_ANNOUNCEMENT_BODY_LENGTH = 5000;

/**
 * ঘোষণা স্ট্যাটাস টাইপ
 */
export type AnnouncementStatus = typeof DEFAULT_ANNOUNCEMENT_STATUS;

/**
 * ঘোষণা প্রায়োরিটি টাইপ
 */
export type AnnouncementPriority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * ঘোষণা সাজানোর ফিল্ড টাইপ
 */
export type AnnouncementSortField = (typeof ANNOUNCEMENT_SORT_FIELDS)[number];

/**
 * ঘোষণা ইন্টারফেস
 */
export interface Announcement {
  id: string;
  title: string;
  body: string;
  status: AnnouncementStatus;
  priority: AnnouncementPriority;
  category?: string;
  authorId: string;
  publishedAt?: Date;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: AnnouncementMetadata;
}

/**
 * ঘোষণা মেটাডেটা ইন্টারফেস
 */
export interface AnnouncementMetadata {
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  isFeatured?: boolean;
  isSticky?: boolean;
  targetAudience?: string[];
  showOnHomepage?: boolean;
}

/**
 * ঘোষণা তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateAnnouncementInput {
  title: string;
  body: string;
  priority?: AnnouncementPriority;
  category?: string;
  status?: AnnouncementStatus;
  expiryDate?: Date;
  metadata?: AnnouncementMetadata;
}

/**
 * ঘোষণা আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateAnnouncementInput {
  title?: string;
  body?: string;
  priority?: AnnouncementPriority;
  category?: string;
  status?: AnnouncementStatus;
  expiryDate?: Date;
  metadata?: AnnouncementMetadata;
}

/**
 * ঘোষণা ফিল্টার ইন্টারফেস
 */
export interface AnnouncementFilter {
  search?: string;
  status?: AnnouncementStatus;
  priority?: AnnouncementPriority;
  category?: string;
  isFeatured?: boolean;
  isSticky?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: AnnouncementSortField;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * ঘোষণা প্রায়োরিটি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAnnouncementPriority(priority: string): priority is AnnouncementPriority {
  const validPriorities: AnnouncementPriority[] = ['low', 'medium', 'high', 'urgent'];
  return validPriorities.includes(priority as AnnouncementPriority);
}

/**
 * ঘোষণা স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAnnouncementStatus(status: string): status is AnnouncementStatus {
  return status === 'draft';
}

/**
 * ঘোষণা সাজানোর ফিল্ড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAnnouncementSortField(field: string): field is AnnouncementSortField {
  return ANNOUNCEMENT_SORT_FIELDS.includes(field as AnnouncementSortField);
}

/**
 * ঘোষণা প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isAnnouncementPublished(announcement: Announcement): boolean {
  return announcement.status === 'draft';
}

/**
 * ঘোষণা মেয়াদোত্তীর্ণ কিনা চেক করার ফাংশন
 */
export function isAnnouncementExpired(announcement: Announcement): boolean {
  if (!announcement.expiryDate) {
    return false;
  }
  return new Date() > announcement.expiryDate;
}

/**
 * ঘোষণা সক্রিয় কিনা চেক করার ফাংশন
 */
export function isAnnouncementActive(announcement: Announcement): boolean {
  return isAnnouncementPublished(announcement) && !isAnnouncementExpired(announcement);
}

/**
 * ঘোষণা প্রায়োরিটি লেবেল পাওয়ার ফাংশন
 */
export function getAnnouncementPriorityLabel(priority: AnnouncementPriority): {
  en: string;
  bn: string;
} {
  const labels: Record<AnnouncementPriority, { en: string; bn: string }> = {
    low: {
      en: 'Low',
      bn: 'নিম্ন',
    },
    medium: {
      en: 'Medium',
      bn: 'মাঝারি',
    },
    high: {
      en: 'High',
      bn: 'উচ্চ',
    },
    urgent: {
      en: 'Urgent',
      bn: 'জরুরি',
    },
  };
  return labels[priority];
}

/**
 * ঘোষণা প্রায়োরিটি কালার পাওয়ার ফাংশন
 */
export function getAnnouncementPriorityColor(priority: AnnouncementPriority): string {
  const colors: Record<AnnouncementPriority, string> = {
    low: 'blue',
    medium: 'green',
    high: 'orange',
    urgent: 'red',
  };
  return colors[priority];
}

/**
 * ডিফল্ট ঘোষণা প্রায়োরিটি পাওয়ার ফাংশন
 */
export function getDefaultAnnouncementPriority(): AnnouncementPriority {
  return DEFAULT_ANNOUNCEMENT_PRIORITY;
}

/**
 * ডিফল্ট ঘোষণা স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultAnnouncementStatus(): AnnouncementStatus {
  return DEFAULT_ANNOUNCEMENT_STATUS;
}
