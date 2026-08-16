/**
 * ইমেইল মার্কেটিং এর ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * ইমেইলের সব ধরন
 */
export const EMAIL_TYPES = [
  'newsletter',
  'promotional',
  'transactional',
  'welcome',
  'abandoned-cart',
] as const;

/**
 * প্রতিটি ইমেইল টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const EMAIL_TYPE_LABELS = {
  newsletter: {
    en: 'Newsletter',
    bn: 'নিউজলেটার',
  },
  promotional: {
    en: 'Promotional',
    bn: 'প্রচারমূলক',
  },
  transactional: {
    en: 'Transactional',
    bn: 'লেনদেনমূলক',
  },
  welcome: {
    en: 'Welcome',
    bn: 'স্বাগতম',
  },
  'abandoned-cart': {
    en: 'Abandoned Cart',
    bn: 'পরিত্যক্ত কার্ট',
  },
} as const satisfies Record<(typeof EMAIL_TYPES)[number], { en: string; bn: string }>;

/**
 * ইমেইল টাইপ টাইপ
 */
export type EmailType = (typeof EMAIL_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট ইমেইল টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getEmailTypeLabel(type: EmailType, lang: Language = 'en'): string {
  return EMAIL_TYPE_LABELS[type][lang];
}

/**
 * সব ইমেইল টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllEmailTypes(): readonly EmailType[] {
  return EMAIL_TYPES;
}

/**
 * ইমেইল টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEmailType(type: string): type is EmailType {
  return EMAIL_TYPES.includes(type as EmailType);
}

/**
 * টাইপ নিউজলেটার কিনা চেক করার ফাংশন
 */
export function isNewsletterType(type: EmailType): boolean {
  return type === 'newsletter';
}

/**
 * টাইপ প্রমোশনাল কিনা চেক করার ফাংশন
 */
export function isPromotionalType(type: EmailType): boolean {
  return type === 'promotional';
}

/**
 * টাইপ ট্রানজেকশনাল কিনা চেক করার ফাংশন
 */
export function isTransactionalType(type: EmailType): boolean {
  return type === 'transactional';
}

/**
 * টাইপ ওয়েলকাম কিনা চেক করার ফাংশন
 */
export function isWelcomeType(type: EmailType): boolean {
  return type === 'welcome';
}

/**
 * টাইপ অ্যাব্যান্ডনড-কার্ট কিনা চেক করার ফাংশন
 */
export function isAbandonedCartType(type: EmailType): boolean {
  return type === 'abandoned-cart';
}

/**
 * টাইপ মার্কেটিং (নিউজলেটার, প্রমোশনাল) কিনা চেক করার ফাংশন
 */
export function isMarketingEmailType(type: EmailType): boolean {
  return type === 'newsletter' || type === 'promotional';
}

/**
 * টাইপ ট্রানজেকশনাল (ট্রানজেকশনাল, ওয়েলকাম) কিনা চেক করার ফাংশন
 */
export function isTransactionalEmailType(type: EmailType): boolean {
  return type === 'transactional' || type === 'welcome';
}

/**
 * টাইপ অটোমেটেড (ওয়েলকাম, অ্যাব্যান্ডনড-কার্ট) কিনা চেক করার ফাংশন
 */
export function isAutomatedEmailType(type: EmailType): boolean {
  return type === 'welcome' || type === 'abandoned-cart';
}

/**
 * ডিফল্ট ইমেইল টাইপ পাওয়ার ফাংশন
 */
export function getDefaultEmailType(): EmailType {
  return 'newsletter';
}

/**
 * টাইপের আইকন পাওয়ার ফাংশন
 */
export function getEmailTypeIcon(type: EmailType): string {
  const icons: Record<EmailType, string> = {
    newsletter: '📰',
    promotional: '🏷️',
    transactional: '📊',
    welcome: '👋',
    'abandoned-cart': '🛒',
  };
  return icons[type];
}

/**
 * টাইপের রঙ পাওয়ার ফাংশন
 */
export function getEmailTypeColor(type: EmailType): string {
  const colors: Record<EmailType, string> = {
    newsletter: '#3B82F6',
    promotional: '#F59E0B',
    transactional: '#10B981',
    welcome: '#8B5CF6',
    'abandoned-cart': '#EF4444',
  };
  return colors[type];
}

/**
 * টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getEmailTypeDescription(type: EmailType, lang: Language = 'en'): string {
  const descriptions: Record<EmailType, { en: string; bn: string }> = {
    newsletter: {
      en: 'Regular updates and news about products/services',
      bn: 'পণ্য/সেবা সম্পর্কিত নিয়মিত আপডেট এবং খবর',
    },
    promotional: {
      en: 'Promotional offers, discounts, and special deals',
      bn: 'প্রচারমূলক অফার, ডিসকাউন্ট এবং বিশেষ ডিল',
    },
    transactional: {
      en: 'Order confirmations, receipts, and account updates',
      bn: 'অর্ডার নিশ্চিতকরণ, রসিদ এবং অ্যাকাউন্ট আপডেট',
    },
    welcome: {
      en: 'Welcome emails for new users or subscribers',
      bn: 'নতুন ব্যবহারকারী বা সাবস্ক্রাইবারদের জন্য স্বাগতম ইমেইল',
    },
    'abandoned-cart': {
      en: 'Reminder emails for abandoned shopping carts',
      bn: 'পরিত্যক্ত শপিং কার্টের জন্য রিমাইন্ডার ইমেইল',
    },
  };
  return descriptions[type][lang];
}
