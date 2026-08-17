/**
 * নিউজলেটার ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * নিউজলেটার ম্যানেজমেন্ট মডিউলের নাম
 */
export const NEWSLETTER_MODULE_NAME = 'Newsletter Management';

/**
 * নিউজলেটারের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_NEWSLETTER_STATUS = 'draft' as const;

/**
 * নিউজলেটার সাবজেক্টের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_NEWSLETTER_SUBJECT_LENGTH = 150;

/**
 * নিউজলেটার বডির সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_NEWSLETTER_BODY_LENGTH = 100000;

/**
 * নিউজলেটার সেন্ড ইন্টারভাল (ঘন্টায়)
 */
export const NEWSLETTER_SEND_INTERVAL_HOURS = 24;

/**
 * নিউজলেটার প্রাপকের সর্বোচ্চ সংখ্যা
 */
export const MAX_NEWSLETTER_RECIPIENTS = 10000;

/**
 * নিউজলেটার স্ট্যাটাস টাইপ
 */
export type NewsletterStatus = typeof DEFAULT_NEWSLETTER_STATUS;

/**
 * নিউজলেটার টাইপ টাইপ
 */
export type NewsletterType = 'regular' | 'promotional' | 'transactional' | 'digest';

/**
 * নিউজলেটার ইন্টারফেস
 */
export interface Newsletter {
  id: string;
  subject: string;
  body: string;
  status: NewsletterStatus;
  type: NewsletterType;
  fromEmail: string;
  fromName: string;
  recipients: string[];
  recipientCount: number;
  sentAt?: Date;
  scheduledFor?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: NewsletterMetadata;
}

/**
 * নিউজলেটার মেটাডেটা ইন্টারফেস
 */
export interface NewsletterMetadata {
  templateId?: string;
  category?: string;
  tags?: string[];
  isPersonalized?: boolean;
  trackingEnabled?: boolean;
  openTracking?: boolean;
  clickTracking?: boolean;
  unsubscribeLink?: string;
  replyTo?: string;
}

/**
 * নিউজলেটার তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateNewsletterInput {
  subject: string;
  body: string;
  type?: NewsletterType;
  fromEmail: string;
  fromName: string;
  recipients: string[];
  scheduledFor?: Date;
  status?: NewsletterStatus;
  metadata?: NewsletterMetadata;
}

/**
 * নিউজলেটার আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateNewsletterInput {
  subject?: string;
  body?: string;
  type?: NewsletterType;
  fromEmail?: string;
  fromName?: string;
  recipients?: string[];
  scheduledFor?: Date;
  status?: NewsletterStatus;
  metadata?: NewsletterMetadata;
}

/**
 * নিউজলেটার ফিল্টার ইন্টারফেস
 */
export interface NewsletterFilter {
  search?: string;
  status?: NewsletterStatus;
  type?: NewsletterType;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: 'createdAt' | 'scheduledFor' | 'subject';
  sortOrder?: 'asc' | 'desc';
}

/**
 * নিউজলেটার টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidNewsletterType(type: string): type is NewsletterType {
  const validTypes: NewsletterType[] = ['regular', 'promotional', 'transactional', 'digest'];
  return validTypes.includes(type as NewsletterType);
}

/**
 * নিউজলেটার স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidNewsletterStatus(status: string): status is NewsletterStatus {
  return status === 'draft';
}

/**
 * নিউজলেটার সাবজেক্ট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidNewsletterSubject(subject: string): boolean {
  if (!subject || typeof subject !== 'string') {
    return false;
  }
  const trimmedSubject = subject.trim();
  return trimmedSubject.length > 0 && trimmedSubject.length <= MAX_NEWSLETTER_SUBJECT_LENGTH;
}

/**
 * নিউজলেটার বডি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidNewsletterBody(body: string): boolean {
  if (!body || typeof body !== 'string') {
    return false;
  }
  return body.length > 0 && body.length <= MAX_NEWSLETTER_BODY_LENGTH;
}

/**
 * নিউজলেটার প্রাপকের তালিকা বৈধ কিনা চেক করার ফাংশন
 */
export function isValidNewsletterRecipients(recipients: string[]): boolean {
  if (!Array.isArray(recipients) || recipients.length === 0) {
    return false;
  }
  if (recipients.length > MAX_NEWSLETTER_RECIPIENTS) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return recipients.every((email) => emailRegex.test(email));
}

/**
 * নিউজলেটার ড্রাফট কিনা চেক করার ফাংশন
 */
export function isNewsletterDraft(newsletter: Newsletter): boolean {
  return newsletter.status === 'draft';
}

/**
 * নিউজলেটার পাঠানো হয়েছে কিনা চেক করার ফাংশন
 */
export function isNewsletterSent(newsletter: Newsletter): boolean {
  return newsletter.status === 'draft';
}

/**
 * নিউজলেটার নির্ধারিত কিনা চেক করার ফাংশন
 */
export function isNewsletterScheduled(newsletter: Newsletter): boolean {
  return !!newsletter.scheduledFor && !newsletter.sentAt;
}

/**
 * নিউজলেটার পাঠানোর সময় নির্ধারণ করার ফাংশন
 */
export function scheduleNewsletter(newsletter: Newsletter, scheduleDate: Date): Newsletter {
  return {
    ...newsletter,
    scheduledFor: scheduleDate,
    updatedAt: new Date(),
  };
}

/**
 * নিউজলেটার টাইপ লেবেল পাওয়ার ফাংশন
 */
export function getNewsletterTypeLabel(type: NewsletterType): { en: string; bn: string } {
  const labels: Record<NewsletterType, { en: string; bn: string }> = {
    regular: {
      en: 'Regular',
      bn: 'নিয়মিত',
    },
    promotional: {
      en: 'Promotional',
      bn: 'প্রচারমূলক',
    },
    transactional: {
      en: 'Transactional',
      bn: 'ট্রানজেকশনাল',
    },
    digest: {
      en: 'Digest',
      bn: 'ডাইজেস্ট',
    },
  };
  return labels[type];
}

/**
 * নিউজলেটার টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getNewsletterTypeDescription(type: NewsletterType): { en: string; bn: string } {
  const descriptions: Record<NewsletterType, { en: string; bn: string }> = {
    regular: {
      en: 'Regular newsletter with general content',
      bn: 'সাধারণ কন্টেন্ট সহ নিয়মিত নিউজলেটার',
    },
    promotional: {
      en: 'Promotional newsletter with marketing content',
      bn: 'মার্কেটিং কন্টেন্ট সহ প্রচারমূলক নিউজলেটার',
    },
    transactional: {
      en: 'Transactional newsletter for user actions',
      bn: 'ব্যবহারকারীর কর্মের জন্য ট্রানজেকশনাল নিউজলেটার',
    },
    digest: {
      en: 'Digest newsletter with summary content',
      bn: 'সারাংশ কন্টেন্ট সহ ডাইজেস্ট নিউজলেটার',
    },
  };
  return descriptions[type];
}

/**
 * ডিফল্ট নিউজলেটার টাইপ পাওয়ার ফাংশন
 */
export function getDefaultNewsletterType(): NewsletterType {
  return 'regular';
}

/**
 * ডিফল্ট নিউজলেটার স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultNewsletterStatus(): NewsletterStatus {
  return DEFAULT_NEWSLETTER_STATUS;
}

/**
 * নিউজলেটার প্রাপক সংখ্যা গণনা করার ফাংশন
 */
export function countNewsletterRecipients(recipients: string[]): number {
  return recipients.length;
}

/**
 * নিউজলেটার পাঠানোর জন্য প্রস্তুত কিনা চেক করার ফাংশন
 */
export function isNewsletterReadyToSend(newsletter: Newsletter): boolean {
  return (
    isNewsletterDraft(newsletter) &&
    isValidNewsletterSubject(newsletter.subject) &&
    isValidNewsletterBody(newsletter.body) &&
    newsletter.recipients.length > 0
  );
}
