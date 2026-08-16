/**
 * নিউজলেটার সাবস্ক্রিপশন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * সাবস্ক্রিপশনের সব স্ট্যাটাস
 */
export const SUBSCRIPTION_STATUSES = [
  'pending',
  'active',
  'unsubscribed',
  'bounced',
  'blocked',
] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const SUBSCRIPTION_STATUS_COLORS = {
  pending: 'yellow',
  active: 'green',
  unsubscribed: 'gray',
  bounced: 'orange',
  blocked: 'red',
} as const satisfies Record<(typeof SUBSCRIPTION_STATUSES)[number], string>;

/**
 * সাবস্ক্রিপশন স্ট্যাটাস টাইপ
 */
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getSubscriptionStatusColor(status: SubscriptionStatus): string {
  return SUBSCRIPTION_STATUS_COLORS[status];
}

/**
 * সব সাবস্ক্রিপশন স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllSubscriptionStatuses(): readonly SubscriptionStatus[] {
  return SUBSCRIPTION_STATUSES;
}

/**
 * সাবস্ক্রিপশন স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSubscriptionStatus(status: string): status is SubscriptionStatus {
  return SUBSCRIPTION_STATUSES.includes(status as SubscriptionStatus);
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
 * সাবস্ক্রিপশন বাউন্সড কিনা চেক করার ফাংশন
 */
export function isSubscriptionBounced(status: SubscriptionStatus): boolean {
  return status === 'bounced';
}

/**
 * সাবস্ক্রিপশন ব্লকড কিনা চেক করার ফাংশন
 */
export function isSubscriptionBlocked(status: SubscriptionStatus): boolean {
  return status === 'blocked';
}

/**
 * সাবস্ক্রিপশন সক্রিয় এবং ভালো কিনা চেক করার ফাংশন
 */
export function isSubscriptionValid(status: SubscriptionStatus): boolean {
  return status === 'active' || status === 'pending';
}

/**
 * সাবস্ক্রিপশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function isSubscriptionAllowed(status: SubscriptionStatus): boolean {
  return status === 'active' || status === 'pending';
}

/**
 * সাবস্ক্রিপশন নিষ্ক্রিয় কিনা চেক করার ফাংশন
 */
export function isSubscriptionInactive(status: SubscriptionStatus): boolean {
  return status === 'unsubscribed' || status === 'bounced' || status === 'blocked';
}

/**
 * সাবস্ক্রিপশন এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isSubscriptionEditable(status: SubscriptionStatus): boolean {
  return status === 'pending' || status === 'active';
}

/**
 * সাবস্ক্রিপশন ডিলিট করা যায় কিনা চেক করার ফাংশন
 */
export function isSubscriptionDeletable(status: SubscriptionStatus): boolean {
  return status === 'unsubscribed' || status === 'bounced' || status === 'blocked';
}

/**
 * সাবস্ক্রিপশন পুনরায় সক্রিয় করা যায় কিনা চেক করার ফাংশন
 */
export function isSubscriptionReactivateable(status: SubscriptionStatus): boolean {
  return status === 'unsubscribed' || status === 'bounced' || status === 'blocked';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canSubscriptionTransitionTo(
  currentStatus: SubscriptionStatus,
  newStatus: SubscriptionStatus
): boolean {
  const transitions: Record<SubscriptionStatus, SubscriptionStatus[]> = {
    pending: ['active', 'unsubscribed', 'blocked'],
    active: ['unsubscribed', 'bounced', 'blocked'],
    unsubscribed: ['active', 'blocked'],
    bounced: ['active', 'unsubscribed', 'blocked'],
    blocked: ['active', 'unsubscribed'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * সাবস্ক্রিপশন স্ট্যাটাস লেবেল পাওয়ার ফাংশন (বাংলা এবং ইংরেজি)
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
    bounced: {
      en: 'Bounced',
      bn: 'বাউন্সড',
    },
    blocked: {
      en: 'Blocked',
      bn: 'ব্লকড',
    },
  };
  return labels[status];
}

/**
 * সাবস্ক্রিপশন স্ট্যাটাসের বিবরণ পাওয়ার ফাংশন (বাংলা এবং ইংরেজি)
 */
export function getSubscriptionStatusDescription(status: SubscriptionStatus): {
  en: string;
  bn: string;
} {
  const descriptions: Record<SubscriptionStatus, { en: string; bn: string }> = {
    pending: {
      en: 'Subscription is waiting for email confirmation',
      bn: 'সাবস্ক্রিপশন ইমেইল কনফার্মেশনের অপেক্ষায়',
    },
    active: {
      en: 'Subscription is active and receiving newsletters',
      bn: 'সাবস্ক্রিপশন সক্রিয় এবং নিউজলেটার পাচ্ছে',
    },
    unsubscribed: {
      en: 'Subscription has been unsubscribed',
      bn: 'সাবস্ক্রিপশন আনসাবস্ক্রাইবড করা হয়েছে',
    },
    bounced: {
      en: 'Subscription emails are bouncing',
      bn: 'সাবস্ক্রিপশনের ইমেইল বাউন্স হচ্ছে',
    },
    blocked: {
      en: 'Subscription has been blocked',
      bn: 'সাবস্ক্রিপশন ব্লক করা হয়েছে',
    },
  };
  return descriptions[status];
}

/**
 * ডিফল্ট সাবস্ক্রিপশন স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultSubscriptionStatus(): SubscriptionStatus {
  return 'pending';
}
