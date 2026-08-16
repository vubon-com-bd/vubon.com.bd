/**
 * লিড জেনারেশন এর ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * লিড জেনারেশন এর সব ধরন
 */
export const LEAD_GEN_TYPES = ['form', 'landing-page', 'popup', 'chat'] as const;

/**
 * প্রতিটি টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const LEAD_GEN_TYPE_LABELS = {
  form: {
    en: 'Form',
    bn: 'ফর্ম',
  },
  'landing-page': {
    en: 'Landing Page',
    bn: 'ল্যান্ডিং পেজ',
  },
  popup: {
    en: 'Popup',
    bn: 'পপআপ',
  },
  chat: {
    en: 'Chat',
    bn: 'চ্যাট',
  },
} as const satisfies Record<(typeof LEAD_GEN_TYPES)[number], { en: string; bn: string }>;

/**
 * লিড জেনারেশন টাইপ টাইপ
 */
export type LeadGenType = (typeof LEAD_GEN_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getLeadGenTypeLabel(type: LeadGenType, lang: Language = 'en'): string {
  return LEAD_GEN_TYPE_LABELS[type][lang];
}

/**
 * সব লিড জেনারেশন টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllLeadGenTypes(): readonly LeadGenType[] {
  return LEAD_GEN_TYPES;
}

/**
 * লিড জেনারেশন টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLeadGenType(type: string): type is LeadGenType {
  return LEAD_GEN_TYPES.includes(type as LeadGenType);
}

/**
 * টাইপ ফর্ম কিনা চেক করার ফাংশন
 */
export function isFormLeadGenType(type: LeadGenType): boolean {
  return type === 'form';
}

/**
 * টাইপ ল্যান্ডিং-পেজ কিনা চেক করার ফাংশন
 */
export function isLandingPageLeadGenType(type: LeadGenType): boolean {
  return type === 'landing-page';
}

/**
 * টাইপ পপআপ কিনা চেক করার ফাংশন
 */
export function isPopupLeadGenType(type: LeadGenType): boolean {
  return type === 'popup';
}

/**
 * টাইপ চ্যাট কিনা চেক করার ফাংশন
 */
export function isChatLeadGenType(type: LeadGenType): boolean {
  return type === 'chat';
}

/**
 * টাইপ ইনবাউন্ড (ফর্ম, ল্যান্ডিং-পেজ) কিনা চেক করার ফাংশন
 */
export function isInboundLeadGenType(type: LeadGenType): boolean {
  return type === 'form' || type === 'landing-page';
}

/**
 * টাইপ আউটবাউন্ড (পপআপ, চ্যাট) কিনা চেক করার ফাংশন
 */
export function isOutboundLeadGenType(type: LeadGenType): boolean {
  return type === 'popup' || type === 'chat';
}

/**
 * টাইপ ইন্টারঅ্যাকটিভ (পপআপ, চ্যাট) কিনা চেক করার ফাংশন
 */
export function isInteractiveLeadGenType(type: LeadGenType): boolean {
  return type === 'popup' || type === 'chat';
}

/**
 * ডিফল্ট লিড জেনারেশন টাইপ পাওয়ার ফাংশন
 */
export function getDefaultLeadGenType(): LeadGenType {
  return 'form';
}

/**
 * টাইপের আইকন পাওয়ার ফাংশন
 */
export function getLeadGenTypeIcon(type: LeadGenType): string {
  const icons: Record<LeadGenType, string> = {
    form: '📝',
    'landing-page': '📄',
    popup: '🪟',
    chat: '💬',
  };
  return icons[type];
}

/**
 * টাইপের রঙ পাওয়ার ফাংশন
 */
export function getLeadGenTypeColor(type: LeadGenType): string {
  const colors: Record<LeadGenType, string> = {
    form: '#3B82F6',
    'landing-page': '#10B981',
    popup: '#F59E0B',
    chat: '#8B5CF6',
  };
  return colors[type];
}

/**
 * টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getLeadGenTypeDescription(type: LeadGenType, lang: Language = 'en'): string {
  const descriptions: Record<LeadGenType, { en: string; bn: string }> = {
    form: {
      en: 'Lead capture form embedded on website',
      bn: 'ওয়েবসাইটে এম্বেড করা লিড ক্যাপচার ফর্ম',
    },
    'landing-page': {
      en: 'Dedicated landing page for lead generation',
      bn: 'লিড জেনারেশনের জন্য ডেডিকেটেড ল্যান্ডিং পেজ',
    },
    popup: {
      en: 'Popup form that appears on website',
      bn: 'ওয়েবসাইটে প্রদর্শিত পপআপ ফর্ম',
    },
    chat: {
      en: 'Live chat or chatbot for lead generation',
      bn: 'লিড জেনারেশনের জন্য লাইভ চ্যাট বা চ্যাটবট',
    },
  };
  return descriptions[type][lang];
}
