/**
 * এসএমএস মার্কেটিং সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * এসএমএস মার্কেটিং মডিউলের নাম
 */
export const SMS_MARKETING_MODULE_NAME = 'SMS Marketing';

/**
 * এসএমএসের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_SMS_STATUS = 'draft' as const;

/**
 * এসএমএস বডির সর্বোচ্চ দৈর্ঘ্য (160 ক্যারেক্টার - স্ট্যান্ডার্ড SMS)
 */
export const MAX_SMS_BODY_LENGTH = 160;

/**
 * সর্বোচ্চ এসএমএস প্রাপক সংখ্যা
 */
export const MAX_SMS_RECIPIENTS = 10000;

/**
 * এসএমএস স্ট্যাটাস টাইপ
 */
export type SmsStatus = typeof DEFAULT_SMS_STATUS;

/**
 * এসএমএস টাইপ
 */
export type SmsType = 'marketing' | 'transactional' | 'promotional' | 'otp';

/**
 * এসএমএস প্রোভাইডার টাইপ
 */
export type SmsProvider = 'twilio' | 'vonage' | 'aws-sns' | 'custom';

/**
 * এসএমএস ইন্টারফেস
 */
export interface SmsInterface {
  id: string;
  body: string;
  status: SmsStatus;
  type: SmsType;
  provider: SmsProvider;
  recipients: string[];
  fromNumber: string;
  scheduledAt?: Date;
  sentAt?: Date;
  deliveredCount: number;
  failedCount: number;
  createdAt: Date;
  updatedAt: Date;
  metadata?: SmsMetadata;
}

/**
 * এসএমএস মেটাডেটা ইন্টারফেস
 */
export interface SmsMetadata {
  templateId?: string;
  templateName?: string;
  campaignId?: string;
  segmentId?: string;
  tags?: string[];
  unicodeEnabled?: boolean;
  flashSms?: boolean;
  priority?: 'high' | 'normal' | 'low';
  customData?: Record<string, unknown>;
}

/**
 * এসএমএস তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateSmsInput {
  body: string;
  type: SmsType;
  provider: SmsProvider;
  recipients: string[];
  fromNumber: string;
  scheduledAt?: Date;
  metadata?: SmsMetadata;
  status?: SmsStatus;
}

/**
 * এসএমএস আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateSmsInput {
  body?: string;
  status?: SmsStatus;
  type?: SmsType;
  provider?: SmsProvider;
  recipients?: string[];
  fromNumber?: string;
  scheduledAt?: Date;
  sentAt?: Date;
  deliveredCount?: number;
  failedCount?: number;
  metadata?: SmsMetadata;
}

/**
 * এসএমএস ফিল্টার ইন্টারফেস
 */
export interface SmsFilter {
  search?: string;
  status?: SmsStatus;
  type?: SmsType;
  provider?: SmsProvider;
  fromDate?: Date;
  toDate?: Date;
  minDelivered?: number;
  maxDelivered?: number;
  minFailed?: number;
  maxFailed?: number;
  limit?: number;
  offset?: number;
}

/**
 * এসএমএস স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSmsStatus(status: string): status is SmsStatus {
  return status === 'draft';
}

/**
 * এসএমএস টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSmsType(type: string): type is SmsType {
  return ['marketing', 'transactional', 'promotional', 'otp'].includes(type);
}

/**
 * এসএমএস প্রোভাইডার বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSmsProvider(provider: string): provider is SmsProvider {
  return ['twilio', 'vonage', 'aws-sns', 'custom'].includes(provider);
}

/**
 * এসএমএস বডি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSmsBody(body: string): boolean {
  if (!body || typeof body !== 'string') {
    return false;
  }
  return body.length > 0 && body.length <= MAX_SMS_BODY_LENGTH;
}

/**
 * এসএমএস প্রাপক বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSmsRecipients(recipients: string[]): boolean {
  if (!Array.isArray(recipients) || recipients.length === 0) {
    return false;
  }
  if (recipients.length > MAX_SMS_RECIPIENTS) {
    return false;
  }
  // Simple phone number validation (basic)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return recipients.every((phone) => phoneRegex.test(phone));
}

/**
 * ফোন নম্বর বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
}

/**
 * এসএমএস ডেলিভারি হার গণনা করার ফাংশন
 */
export function calculateSmsDeliveryRate(sms: SmsInterface): number {
  const total = sms.recipients.length;
  if (total === 0) return 0;
  return (sms.deliveredCount / total) * 100;
}

/**
 * এসএমএস ব্যর্থতার হার গণনা করার ফাংশন
 */
export function calculateSmsFailureRate(sms: SmsInterface): number {
  const total = sms.recipients.length;
  if (total === 0) return 0;
  return (sms.failedCount / total) * 100;
}

/**
 * এসএমএস পাঠানো হয়েছে কিনা চেক করার ফাংশন
 */
export function isSmsSent(sms: SmsInterface): boolean {
  return sms.status === 'draft' && sms.sentAt !== undefined;
}

/**
 * এসএমএস নির্ধারিত কিনা চেক করার ফাংশন
 */
export function isSmsScheduled(sms: SmsInterface): boolean {
  return sms.status === 'draft' && sms.scheduledAt !== undefined;
}

/**
 * এসএমএস ড্রাফট কিনা চেক করার ফাংশন
 */
export function isSmsDraft(sms: SmsInterface): boolean {
  return sms.status === 'draft' && !sms.sentAt;
}

/**
 * এসএমএস বডির ক্যারেক্টার কাউন্ট গণনা করার ফাংশন
 */
export function countSmsCharacters(body: string): number {
  return body.length;
}

/**
 * এসএমএস পার্টস কাউন্ট গণনা করার ফাংশন (একাধিক SMS)
 */
export function countSmsParts(body: string): number {
  const length = body.length;
  if (length <= 160) return 1;
  // Unicode SMS (70 chars per part) or standard (153 chars per part for multi-part)
  // Assuming standard GSM-7 encoding
  return Math.ceil(length / 153);
}

/**
 * ডিফল্ট এসএমএস স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultSmsStatus(): SmsStatus {
  return DEFAULT_SMS_STATUS;
}

/**
 * সব এসএমএস টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllSmsTypes(): SmsType[] {
  return ['marketing', 'transactional', 'promotional', 'otp'];
}

/**
 * সব এসএমএস প্রোভাইডারের তালিকা পাওয়ার ফাংশন
 */
export function getAllSmsProviders(): SmsProvider[] {
  return ['twilio', 'vonage', 'aws-sns', 'custom'];
}

/**
 * এসএমএস টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getSmsTypeLabel(type: SmsType): string {
  const labels: Record<SmsType, string> = {
    marketing: 'Marketing',
    transactional: 'Transactional',
    promotional: 'Promotional',
    otp: 'OTP / Verification',
  };
  return labels[type];
}

/**
 * এসএমএস প্রোভাইডারের লেবেল পাওয়ার ফাংশন
 */
export function getSmsProviderLabel(provider: SmsProvider): string {
  const labels: Record<SmsProvider, string> = {
    twilio: 'Twilio',
    vonage: 'Vonage',
    'aws-sns': 'AWS SNS',
    custom: 'Custom',
  };
  return labels[provider];
}
