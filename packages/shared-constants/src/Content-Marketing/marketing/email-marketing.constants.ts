/**
 * ইমেইল মার্কেটিং সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * ইমেইল মার্কেটিং মডিউলের নাম
 */
export const EMAIL_MARKETING_MODULE_NAME = 'Email Marketing';

/**
 * ইমেইলের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_EMAIL_STATUS = 'draft' as const;

/**
 * ইমেইল সাবজেক্টের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_EMAIL_SUBJECT_LENGTH = 150;

/**
 * ইমেইল বডির সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_EMAIL_BODY_LENGTH = 1000000;

/**
 * সর্বোচ্চ ইমেইল প্রাপক সংখ্যা
 */
export const MAX_EMAIL_RECIPIENTS = 100000;

/**
 * ইমেইল স্ট্যাটাস টাইপ
 */
export type EmailStatus = typeof DEFAULT_EMAIL_STATUS;

/**
 * ইমেইল টাইপ
 */
export type EmailType = 'marketing' | 'newsletter' | 'transactional' | 'promotional';

/**
 * ইমেইল প্ল্যাটফর্ম টাইপ
 */
export type EmailPlatform = 'sendgrid' | 'mailchimp' | 'ses' | 'custom';

/**
 * ইমেইল ইন্টারফেস
 */
export interface EmailInterface {
  id: string;
  subject: string;
  body: string;
  status: EmailStatus;
  type: EmailType;
  platform: EmailPlatform;
  recipients: string[];
  fromEmail: string;
  fromName?: string;
  replyTo?: string;
  scheduledAt?: Date;
  sentAt?: Date;
  openedCount: number;
  clickedCount: number;
  bounceCount: number;
  createdAt: Date;
  updatedAt: Date;
  metadata?: EmailMetadata;
}

/**
 * ইমেইল মেটাডেটা ইন্টারফেস
 */
export interface EmailMetadata {
  templateId?: string;
  templateName?: string;
  campaignId?: string;
  segmentId?: string;
  tags?: string[];
  attachments?: EmailAttachment[];
  trackingEnabled?: boolean;
  openTracking?: boolean;
  clickTracking?: boolean;
  unsubscribeLink?: string;
  customHeaders?: Record<string, string>;
}

/**
 * ইমেইল অ্যাটাচমেন্ট ইন্টারফেস
 */
export interface EmailAttachment {
  filename: string;
  content: string;
  contentType: string;
  size: number;
}

/**
 * ইমেইল তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateEmailInput {
  subject: string;
  body: string;
  type: EmailType;
  platform: EmailPlatform;
  recipients: string[];
  fromEmail: string;
  fromName?: string;
  replyTo?: string;
  scheduledAt?: Date;
  metadata?: EmailMetadata;
  status?: EmailStatus;
}

/**
 * ইমেইল আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateEmailInput {
  subject?: string;
  body?: string;
  status?: EmailStatus;
  type?: EmailType;
  platform?: EmailPlatform;
  recipients?: string[];
  fromEmail?: string;
  fromName?: string;
  replyTo?: string;
  scheduledAt?: Date;
  sentAt?: Date;
  openedCount?: number;
  clickedCount?: number;
  bounceCount?: number;
  metadata?: EmailMetadata;
}

/**
 * ইমেইল ফিল্টার ইন্টারফেস
 */
export interface EmailFilter {
  search?: string;
  status?: EmailStatus;
  type?: EmailType;
  platform?: EmailPlatform;
  fromDate?: Date;
  toDate?: Date;
  minOpened?: number;
  maxOpened?: number;
  minClicked?: number;
  maxClicked?: number;
  limit?: number;
  offset?: number;
}

/**
 * ইমেইল স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEmailStatus(status: string): status is EmailStatus {
  return status === 'draft';
}

/**
 * ইমেইল টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEmailType(type: string): type is EmailType {
  return ['marketing', 'newsletter', 'transactional', 'promotional'].includes(type);
}

/**
 * ইমেইল প্ল্যাটফর্ম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEmailPlatform(platform: string): platform is EmailPlatform {
  return ['sendgrid', 'mailchimp', 'ses', 'custom'].includes(platform);
}

/**
 * ইমেইল সাবজেক্ট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEmailSubject(subject: string): boolean {
  if (!subject || typeof subject !== 'string') {
    return false;
  }
  const trimmedSubject = subject.trim();
  return trimmedSubject.length > 0 && trimmedSubject.length <= MAX_EMAIL_SUBJECT_LENGTH;
}

/**
 * ইমেইল বডি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEmailBody(body: string): boolean {
  if (!body || typeof body !== 'string') {
    return false;
  }
  return body.length > 0 && body.length <= MAX_EMAIL_BODY_LENGTH;
}

/**
 * ইমেইল প্রাপক বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEmailRecipients(recipients: string[]): boolean {
  if (!Array.isArray(recipients) || recipients.length === 0) {
    return false;
  }
  if (recipients.length > MAX_EMAIL_RECIPIENTS) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return recipients.every((email) => emailRegex.test(email));
}

/**
 * ইমেইল ইমেইল ঠিকানা বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * ইমেইল খোলার হার গণনা করার ফাংশন
 */
export function calculateOpenRate(email: EmailInterface): number {
  const total = email.recipients.length;
  if (total === 0) return 0;
  return (email.openedCount / total) * 100;
}

/**
 * ইমেইল ক্লিক হার গণনা করার ফাংশন
 */
export function calculateClickRate(email: EmailInterface): number {
  const total = email.recipients.length;
  if (total === 0) return 0;
  return (email.clickedCount / total) * 100;
}

/**
 * ইমেইল বাউন্স হার গণনা করার ফাংশন
 */
export function calculateBounceRate(email: EmailInterface): number {
  const total = email.recipients.length;
  if (total === 0) return 0;
  return (email.bounceCount / total) * 100;
}

/**
 * ইমেইল পাঠানো হয়েছে কিনা চেক করার ফাংশন
 */
export function isEmailSent(email: EmailInterface): boolean {
  return email.status === 'draft' && email.sentAt !== undefined;
}

/**
 * ইমেইল নির্ধারিত কিনা চেক করার ফাংশন
 */
export function isEmailScheduled(email: EmailInterface): boolean {
  return email.status === 'draft' && email.scheduledAt !== undefined;
}

/**
 * ইমেইল ড্রাফট কিনা চেক করার ফাংশন
 */
export function isEmailDraft(email: EmailInterface): boolean {
  return email.status === 'draft' && !email.sentAt;
}

/**
 * ডিফল্ট ইমেইল স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultEmailStatus(): EmailStatus {
  return DEFAULT_EMAIL_STATUS;
}

/**
 * সব ইমেইল টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllEmailTypes(): EmailType[] {
  return ['marketing', 'newsletter', 'transactional', 'promotional'];
}

/**
 * সব ইমেইল প্ল্যাটফর্মের তালিকা পাওয়ার ফাংশন
 */
export function getAllEmailPlatforms(): EmailPlatform[] {
  return ['sendgrid', 'mailchimp', 'ses', 'custom'];
}

/**
 * ইমেইল টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getEmailTypeLabel(type: EmailType): string {
  const labels: Record<EmailType, string> = {
    marketing: 'Marketing',
    newsletter: 'Newsletter',
    transactional: 'Transactional',
    promotional: 'Promotional',
  };
  return labels[type];
}

/**
 * ইমেইল প্ল্যাটফর্মের লেবেল পাওয়ার ফাংশন
 */
export function getEmailPlatformLabel(platform: EmailPlatform): string {
  const labels: Record<EmailPlatform, string> = {
    sendgrid: 'SendGrid',
    mailchimp: 'Mailchimp',
    ses: 'Amazon SES',
    custom: 'Custom',
  };
  return labels[platform];
}
