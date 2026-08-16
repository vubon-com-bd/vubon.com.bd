/**
 * লিডের সোর্স সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * লিডের সব সোর্স
 */
export const LEAD_SOURCES = ['organic', 'social', 'email', 'referral', 'paid', 'other'] as const;

/**
 * প্রতিটি সোর্সের লেবেল (বাংলা এবং ইংরেজি)
 */
export const LEAD_SOURCE_LABELS = {
  organic: {
    en: 'Organic Search',
    bn: 'অর্গানিক সার্চ',
  },
  social: {
    en: 'Social Media',
    bn: 'সোশ্যাল মিডিয়া',
  },
  email: {
    en: 'Email Marketing',
    bn: 'ইমেইল মার্কেটিং',
  },
  referral: {
    en: 'Referral',
    bn: 'রেফারেল',
  },
  paid: {
    en: 'Paid Advertising',
    bn: 'পেইড বিজ্ঞাপন',
  },
  other: {
    en: 'Other Sources',
    bn: 'অন্যান্য সোর্স',
  },
} as const satisfies Record<(typeof LEAD_SOURCES)[number], { en: string; bn: string }>;

/**
 * প্রতিটি সোর্সের আইকন
 */
export const LEAD_SOURCE_ICONS = {
  organic: '🔍',
  social: '📱',
  email: '📧',
  referral: '🤝',
  paid: '💰',
  other: '📌',
} as const satisfies Record<(typeof LEAD_SOURCES)[number], string>;

/**
 * প্রতিটি সোর্সের রঙ
 */
export const LEAD_SOURCE_COLORS = {
  organic: '#10B981',
  social: '#3B82F6',
  email: '#8B5CF6',
  referral: '#F59E0B',
  paid: '#EF4444',
  other: '#6B7280',
} as const satisfies Record<(typeof LEAD_SOURCES)[number], string>;

/**
 * লিড সোর্স টাইপ
 */
export type LeadSource = (typeof LEAD_SOURCES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট সোর্সের লেবেল পাওয়ার ফাংশন
 */
export function getLeadSourceLabel(source: LeadSource, lang: Language = 'en'): string {
  return LEAD_SOURCE_LABELS[source][lang];
}

/**
 * নির্দিষ্ট সোর্সের আইকন পাওয়ার ফাংশন
 */
export function getLeadSourceIcon(source: LeadSource): string {
  return LEAD_SOURCE_ICONS[source];
}

/**
 * নির্দিষ্ট সোর্সের রঙ পাওয়ার ফাংশন
 */
export function getLeadSourceColor(source: LeadSource): string {
  return LEAD_SOURCE_COLORS[source];
}

/**
 * সব লিড সোর্সের তালিকা পাওয়ার ফাংশন
 */
export function getAllLeadSources(): readonly LeadSource[] {
  return LEAD_SOURCES;
}

/**
 * লিড সোর্স বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLeadSource(source: string): source is LeadSource {
  return LEAD_SOURCES.includes(source as LeadSource);
}

/**
 * সোর্স অর্গানিক কিনা চেক করার ফাংশন
 */
export function isOrganicLeadSource(source: LeadSource): boolean {
  return source === 'organic';
}

/**
 * সোর্স সোশ্যাল কিনা চেক করার ফাংশন
 */
export function isSocialLeadSource(source: LeadSource): boolean {
  return source === 'social';
}

/**
 * সোর্স ইমেইল কিনা চেক করার ফাংশন
 */
export function isEmailLeadSource(source: LeadSource): boolean {
  return source === 'email';
}

/**
 * সোর্স রেফারেল কিনা চেক করার ফাংশন
 */
export function isReferralLeadSource(source: LeadSource): boolean {
  return source === 'referral';
}

/**
 * সোর্স পেইড কিনা চেক করার ফাংশন
 */
export function isPaidLeadSource(source: LeadSource): boolean {
  return source === 'paid';
}

/**
 * সোর্স অন্যান্য কিনা চেক করার ফাংশন
 */
export function isOtherLeadSource(source: LeadSource): boolean {
  return source === 'other';
}

/**
 * সোর্স ইনবাউন্ড (অর্গানিক, সোশ্যাল, ইমেইল) কিনা চেক করার ফাংশন
 */
export function isInboundLeadSource(source: LeadSource): boolean {
  return source === 'organic' || source === 'social' || source === 'email';
}

/**
 * সোর্স আউটবাউন্ড (পেইড) কিনা চেক করার ফাংশন
 */
export function isOutboundLeadSource(source: LeadSource): boolean {
  return source === 'paid';
}

/**
 * সোর্স অর্গানিক বা রেফারেল কিনা চেক করার ফাংশন
 */
export function isOrganicOrReferralLeadSource(source: LeadSource): boolean {
  return source === 'organic' || source === 'referral';
}

/**
 * সোর্স ডিজিটাল (অর্গানিক, সোশ্যাল, ইমেইল, পেইড) কিনা চেক করার ফাংশন
 */
export function isDigitalLeadSource(source: LeadSource): boolean {
  return source !== 'referral' && source !== 'other';
}

/**
 * ডিফল্ট লিড সোর্স পাওয়ার ফাংশন
 */
export function getDefaultLeadSource(): LeadSource {
  return 'organic';
}

/**
 * সোর্সের বিবরণ পাওয়ার ফাংশন
 */
export function getLeadSourceDescription(source: LeadSource, lang: Language = 'en'): string {
  const descriptions: Record<LeadSource, { en: string; bn: string }> = {
    organic: {
      en: 'Leads from organic search engine results',
      bn: 'অর্গানিক সার্চ ইঞ্জিন ফলাফল থেকে লিড',
    },
    social: {
      en: 'Leads from social media platforms',
      bn: 'সোশ্যাল মিডিয়া প্ল্যাটফর্ম থেকে লিড',
    },
    email: {
      en: 'Leads from email marketing campaigns',
      bn: 'ইমেইল মার্কেটিং ক্যাম্পেইন থেকে লিড',
    },
    referral: {
      en: 'Leads from referrals and word-of-mouth',
      bn: 'রেফারেল এবং মুখে মুখে থেকে লিড',
    },
    paid: {
      en: 'Leads from paid advertising campaigns',
      bn: 'পেইড বিজ্ঞাপন ক্যাম্পেইন থেকে লিড',
    },
    other: {
      en: 'Leads from other sources',
      bn: 'অন্যান্য সোর্স থেকে লিড',
    },
  };
  return descriptions[source][lang];
}

/**
 * সোর্সের ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getLeadSourceCategory(source: LeadSource): string {
  if (isInboundLeadSource(source)) return 'inbound';
  if (isOutboundLeadSource(source)) return 'outbound';
  return 'other';
}
