/**
 * ক্যাম্পেইনের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * ক্যাম্পেইনের সব ধরন
 */
export const CAMPAIGN_TYPES = [
  'email',
  'social',
  'display',
  'search',
  'content',
  'influencer',
] as const;

/**
 * প্রতিটি ক্যাম্পেইন টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const CAMPAIGN_TYPE_LABELS = {
  email: {
    en: 'Email Campaign',
    bn: 'ইমেইল ক্যাম্পেইন',
  },
  social: {
    en: 'Social Media Campaign',
    bn: 'সোশ্যাল মিডিয়া ক্যাম্পেইন',
  },
  display: {
    en: 'Display Advertising',
    bn: 'ডিসপ্লে বিজ্ঞাপন',
  },
  search: {
    en: 'Search Engine Marketing',
    bn: 'সার্চ ইঞ্জিন মার্কেটিং',
  },
  content: {
    en: 'Content Marketing',
    bn: 'কন্টেন্ট মার্কেটিং',
  },
  influencer: {
    en: 'Influencer Marketing',
    bn: 'ইনফ্লুয়েন্সার মার্কেটিং',
  },
} as const satisfies Record<(typeof CAMPAIGN_TYPES)[number], { en: string; bn: string }>;

/**
 * ক্যাম্পেইন টাইপ টাইপ
 */
export type CampaignType = (typeof CAMPAIGN_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট ক্যাম্পেইন টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getCampaignTypeLabel(type: CampaignType, lang: Language = 'en'): string {
  return CAMPAIGN_TYPE_LABELS[type][lang];
}

/**
 * সব ক্যাম্পেইন টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllCampaignTypes(): readonly CampaignType[] {
  return CAMPAIGN_TYPES;
}

/**
 * ক্যাম্পেইন টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCampaignType(type: string): type is CampaignType {
  return CAMPAIGN_TYPES.includes(type as CampaignType);
}

/**
 * ক্যাম্পেইন টাইপ ডিজিটাল মার্কেটিং কিনা চেক করার ফাংশন
 */
export function isDigitalMarketingType(type: CampaignType): boolean {
  return ['email', 'social', 'display', 'search'].includes(type);
}

/**
 * ক্যাম্পেইন টাইপ কন্টেন্ট মার্কেটিং কিনা চেক করার ফাংশন
 */
export function isContentMarketingType(type: CampaignType): boolean {
  return type === 'content' || type === 'influencer';
}

/**
 * ক্যাম্পেইন টাইপ পেইড অ্যাডভারটাইজিং কিনা চেক করার ফাংশন
 */
export function isPaidAdvertisingType(type: CampaignType): boolean {
  return ['display', 'search'].includes(type);
}

/**
 * ক্যাম্পেইন টাইপ অর্গানিক কিনা চেক করার ফাংশন
 */
export function isOrganicType(type: CampaignType): boolean {
  return ['email', 'social', 'content'].includes(type);
}

/**
 * ডিফল্ট ক্যাম্পেইন টাইপ পাওয়ার ফাংশন
 */
export function getDefaultCampaignType(): CampaignType {
  return 'email';
}
