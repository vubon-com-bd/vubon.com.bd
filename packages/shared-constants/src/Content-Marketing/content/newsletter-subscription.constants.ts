/**
 * নিউজলেটার সাবস্ক্রিপশন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * সাবস্ক্রিপশন ম্যানেজমেন্ট মডিউলের নাম
 */
export const SUBSCRIPTION_MODULE_NAME = 'Newsletter Subscription';

/**
 * ডিফল্ট সাবস্ক্রিপশন স্ট্যাটাস
 */
export const DEFAULT_SUBSCRIPTION_STATUS = 'pending' as const;

/**
 * প্রতি আইপি থেকে সর্বোচ্চ সাবস্ক্রিপশন সংখ্যা
 */
export const MAX_SUBSCRIPTIONS_PER_IP = 5;

/**
 * সাবস্ক্রিপশন কনফার্মেশন এক্সপাইরি সময় (ঘন্টায়)
 */
export const SUBSCRIPTION_CONFIRMATION_EXPIRY_HOURS = 48;

/**
 * সাবস্ক্রিপশন স্ট্যাটাস টাইপ
 */
export type SubscriptionStatus =
  typeof DEFAULT_SUBSCRIPTION_STATUS | 'active' | 'unsubscribed' | 'expired';

/**
 * সাবস্ক্রিপশন ইন্টারফেস
 */
export interface Subscription {
  id: string;
  email: string;
  status: SubscriptionStatus;
  ipAddress?: string;
  subscribedAt: Date;
  confirmedAt?: Date;
  unsubscribedAt?: Date;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: SubscriptionMetadata;
}

/**
 * সাবস্ক্রিপশন মেটাডেটা ইন্টারফেস
 */
export interface SubscriptionMetadata {
  source?: string;
  referrer?: string;
  userAgent?: string;
  country?: string;
  city?: string;
  preferences?: string[];
  tags?: string[];
}

/**
 * সাবস্ক্রিপশন তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateSubscriptionInput {
  email: string;
  ipAddress?: string;
  source?: string;
  referrer?: string;
  userAgent?: string;
  preferences?: string[];
  tags?: string[];
}

/**
 * সাবস্ক্রিপশন ফিল্টার ইন্টারফেস
 */
export interface SubscriptionFilter {
  email?: string;
  status?: SubscriptionStatus;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: 'createdAt' | 'subscribedAt' | 'email';
  sortOrder?: 'asc' | 'desc';
}

/**
 * সাবস্ক্রিপশন স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSubscriptionStatus(status: string): status is SubscriptionStatus {
  const validStatuses: SubscriptionStatus[] = ['pending', 'active', 'unsubscribed', 'expired'];
  return validStatuses.includes(status as SubscriptionStatus);
}

/**
 * সাবস্ক্রিপশন সক্রিয় কিনা চেক করার ফাংশন
 */
export function isSubscriptionActive(status: SubscriptionStatus): boolean {
  return status === 'active';
}

/**
 * সাবস্ক্রিপশন পেন্ডিং কিনা চেক করার ফাংশন
 */
export function isSubscriptionPending(status: SubscriptionStatus): boolean {
  return status === 'pending';
}

/**
 * সাবস্ক্রিপশন আনসাবস্ক্রাইবড কিনা চেক করার ফাংশন
 */
export function isSubscriptionUnsubscribed(status: SubscriptionStatus): boolean {
  return status === 'unsubscribed';
}

/**
 * সাবস্ক্রিপশন এক্সপায়ার্ড কিনা চেক করার ফাংশন
 */
export function isSubscriptionExpired(status: SubscriptionStatus): boolean {
  return status === 'expired';
}

/**
 * সাবস্ক্রিপশন কনফার্মেশন এক্সপায়ার্ড কিনা চেক করার ফাংশন
 */
export function isSubscriptionConfirmationExpired(subscription: Subscription): boolean {
  if (!subscription.confirmedAt) {
    const expiryHours = SUBSCRIPTION_CONFIRMATION_EXPIRY_HOURS;
    const expiryTime = new Date(subscription.createdAt.getTime() + expiryHours * 60 * 60 * 1000);
    return new Date() > expiryTime;
  }
  return false;
}

/**
 * সাবস্ক্রিপশন এক্সপাইরি ডেট ক্যালকুলেট করার ফাংশন
 */
export function calculateSubscriptionExpiryDate(createdAt: Date): Date {
  const expiryHours = SUBSCRIPTION_CONFIRMATION_EXPIRY_HOURS;
  return new Date(createdAt.getTime() + expiryHours * 60 * 60 * 1000);
}

/**
 * সাবস্ক্রিপশন কনফার্ম করার ফাংশন
 */
export function confirmSubscription(subscription: Subscription): Subscription {
  return {
    ...subscription,
    status: 'active',
    confirmedAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * সাবস্ক্রিপশন আনসাবস্ক্রাইব করার ফাংশন
 */
export function unsubscribeSubscription(subscription: Subscription): Subscription {
  return {
    ...subscription,
    status: 'unsubscribed',
    unsubscribedAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * সাবস্ক্রিপশন এক্সপায়ার্ড মার্ক করার ফাংশন
 */
export function expireSubscription(subscription: Subscription): Subscription {
  return {
    ...subscription,
    status: 'expired',
    expiryDate: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * ইমেইল বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * সাবস্ক্রিপশন ইমেইল ইউনিক কিনা চেক করার ফাংশন
 */
export function isEmailUnique(email: string, existingSubscriptions: Subscription[]): boolean {
  return !existingSubscriptions.some((sub) => sub.email.toLowerCase() === email.toLowerCase());
}

/**
 * সাবস্ক্রিপশন স্ট্যাটাস লেবেল পাওয়ার ফাংশন
 */
export function getSubscriptionStatusLabel(status: SubscriptionStatus): { en: string; bn: string } {
  const labels: Record<SubscriptionStatus, { en: string; bn: string }> = {
    pending: {
      en: 'Pending Confirmation',
      bn: 'কনফার্মেশনের অপেক্ষায়',
    },
    active: {
      en: 'Active',
      bn: 'সক্রিয়',
    },
    unsubscribed: {
      en: 'Unsubscribed',
      bn: 'আনসাবস্ক্রাইবড',
    },
    expired: {
      en: 'Expired',
      bn: 'মেয়াদোত্তীর্ণ',
    },
  };
  return labels[status];
}

/**
 * সাবস্ক্রিপশন স্ট্যাটাস কালার পাওয়ার ফাংশন
 */
export function getSubscriptionStatusColor(status: SubscriptionStatus): string {
  const colors: Record<SubscriptionStatus, string> = {
    pending: 'yellow',
    active: 'green',
    unsubscribed: 'gray',
    expired: 'red',
  };
  return colors[status];
}

/**
 * সাবস্ক্রিপশন আইপি লিমিট চেক করার ফাংশন
 */
export function isIpSubscriptionLimitExceeded(
  ipAddress: string,
  existingSubscriptions: Subscription[]
): boolean {
  const ipSubscriptions = existingSubscriptions.filter((sub) => sub.ipAddress === ipAddress);
  return ipSubscriptions.length >= MAX_SUBSCRIPTIONS_PER_IP;
}

/**
 * ডিফল্ট সাবস্ক্রিপশন স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultSubscriptionStatus(): SubscriptionStatus {
  return DEFAULT_SUBSCRIPTION_STATUS;
}

/**
 * সাবস্ক্রিপশন কনফার্মেশন এক্সপাইরি সময় পাওয়ার ফাংশন
 */
export function getSubscriptionConfirmationExpiryHours(): number {
  return SUBSCRIPTION_CONFIRMATION_EXPIRY_HOURS;
}

/**
 * সাবস্ক্রিপশন কনফার্মেশন এক্সপাইরি সময় পার হয়েছে কিনা চেক করার ফাংশন
 */
export function hasConfirmationExpired(createdAt: Date): boolean {
  const expiryTime = new Date(
    createdAt.getTime() + SUBSCRIPTION_CONFIRMATION_EXPIRY_HOURS * 60 * 60 * 1000
  );
  return new Date() > expiryTime;
}
