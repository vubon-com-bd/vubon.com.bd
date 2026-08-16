/**
 * অটোমেশনের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * অটোমেশনের সব ধরন
 */
export const AUTOMATION_TYPES = ['email', 'sms', 'push', 'social', 'multi-channel'] as const;

/**
 * প্রতিটি অটোমেশন টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const AUTOMATION_TYPE_LABELS = {
  email: {
    en: 'Email Automation',
    bn: 'ইমেইল অটোমেশন',
  },
  sms: {
    en: 'SMS Automation',
    bn: 'এসএমএস অটোমেশন',
  },
  push: {
    en: 'Push Notification Automation',
    bn: 'পুশ বিজ্ঞপ্তি অটোমেশন',
  },
  social: {
    en: 'Social Media Automation',
    bn: 'সোশ্যাল মিডিয়া অটোমেশন',
  },
  'multi-channel': {
    en: 'Multi-Channel Automation',
    bn: 'মাল্টি-চ্যানেল অটোমেশন',
  },
} as const satisfies Record<(typeof AUTOMATION_TYPES)[number], { en: string; bn: string }>;

/**
 * প্রতিটি অটোমেশন টাইপের আইকন
 */
export const AUTOMATION_TYPE_ICONS = {
  email: '📧',
  sms: '💬',
  push: '🔔',
  social: '📱',
  'multi-channel': '📡',
} as const satisfies Record<(typeof AUTOMATION_TYPES)[number], string>;

/**
 * প্রতিটি অটোমেশন টাইপের রঙ
 */
export const AUTOMATION_TYPE_COLORS = {
  email: '#3B82F6',
  sms: '#10B981',
  push: '#8B5CF6',
  social: '#F59E0B',
  'multi-channel': '#EC4899',
} as const satisfies Record<(typeof AUTOMATION_TYPES)[number], string>;

/**
 * অটোমেশন টাইপ টাইপ
 */
export type AutomationType = (typeof AUTOMATION_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট অটোমেশন টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getAutomationTypeLabel(type: AutomationType, lang: Language = 'en'): string {
  return AUTOMATION_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট অটোমেশন টাইপের আইকন পাওয়ার ফাংশন
 */
export function getAutomationTypeIcon(type: AutomationType): string {
  return AUTOMATION_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট অটোমেশন টাইপের রঙ পাওয়ার ফাংশন
 */
export function getAutomationTypeColor(type: AutomationType): string {
  return AUTOMATION_TYPE_COLORS[type];
}

/**
 * সব অটোমেশন টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllAutomationTypes(): readonly AutomationType[] {
  return AUTOMATION_TYPES;
}

/**
 * অটোমেশন টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAutomationType(type: string): type is AutomationType {
  return AUTOMATION_TYPES.includes(type as AutomationType);
}

/**
 * টাইপ ইমেইল কিনা চেক করার ফাংশন
 */
export function isEmailAutomationType(type: AutomationType): boolean {
  return type === 'email';
}

/**
 * টাইপ এসএমএস কিনা চেক করার ফাংশন
 */
export function isSmsAutomationType(type: AutomationType): boolean {
  return type === 'sms';
}

/**
 * টাইপ পুশ কিনা চেক করার ফাংশন
 */
export function isPushAutomationType(type: AutomationType): boolean {
  return type === 'push';
}

/**
 * টাইপ সোশ্যাল কিনা চেক করার ফাংশন
 */
export function isSocialAutomationType(type: AutomationType): boolean {
  return type === 'social';
}

/**
 * টাইপ মাল্টি-চ্যানেল কিনা চেক করার ফাংশন
 */
export function isMultiChannelAutomationType(type: AutomationType): boolean {
  return type === 'multi-channel';
}

/**
 * টাইপ সিঙ্গেল চ্যানেল (ইমেইল, এসএমএস, পুশ, সোশ্যাল) কিনা চেক করার ফাংশন
 */
export function isSingleChannelAutomationType(type: AutomationType): boolean {
  return type !== 'multi-channel';
}

/**
 * টাইপ মেসেজিং (ইমেইল, এসএমএস, পুশ) কিনা চেক করার ফাংশন
 */
export function isMessagingAutomationType(type: AutomationType): boolean {
  return type === 'email' || type === 'sms' || type === 'push';
}

/**
 * টাইপ কমিউনিকেশন (সোশ্যাল) কিনা চেক করার ফাংশন
 */
export function isCommunicationAutomationType(type: AutomationType): boolean {
  return type === 'social';
}

/**
 * ডিফল্ট অটোমেশন টাইপ পাওয়ার ফাংশন
 */
export function getDefaultAutomationType(): AutomationType {
  return 'email';
}

/**
 * অটোমেশন টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getAutomationTypeDescription(type: AutomationType, lang: Language = 'en'): string {
  const descriptions: Record<AutomationType, { en: string; bn: string }> = {
    email: {
      en: 'Automated email marketing campaigns',
      bn: 'স্বয়ংক্রিয় ইমেইল মার্কেটিং ক্যাম্পেইন',
    },
    sms: {
      en: 'Automated SMS marketing campaigns',
      bn: 'স্বয়ংক্রিয় এসএমএস মার্কেটিং ক্যাম্পেইন',
    },
    push: {
      en: 'Automated push notification campaigns',
      bn: 'স্বয়ংক্রিয় পুশ বিজ্ঞপ্তি ক্যাম্পেইন',
    },
    social: {
      en: 'Automated social media posting and engagement',
      bn: 'স্বয়ংক্রিয় সোশ্যাল মিডিয়া পোস্টিং এবং এনগেজমেন্ট',
    },
    'multi-channel': {
      en: 'Automated campaigns across multiple channels',
      bn: 'একাধিক চ্যানেল জুড়ে স্বয়ংক্রিয় ক্যাম্পেইন',
    },
  };
  return descriptions[type][lang];
}
