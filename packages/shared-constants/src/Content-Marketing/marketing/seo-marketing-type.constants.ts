/**
 * SEO মার্কেটিং এর ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * SEO এর সব ধরন
 */
export const SEO_TYPES = ['on-page', 'off-page', 'technical', 'local'] as const;

/**
 * প্রতিটি SEO টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const SEO_TYPE_LABELS = {
  'on-page': {
    en: 'On-Page SEO',
    bn: 'অন-পেজ এসইও',
  },
  'off-page': {
    en: 'Off-Page SEO',
    bn: 'অফ-পেজ এসইও',
  },
  technical: {
    en: 'Technical SEO',
    bn: 'টেকনিক্যাল এসইও',
  },
  local: {
    en: 'Local SEO',
    bn: 'লোকাল এসইও',
  },
} as const satisfies Record<(typeof SEO_TYPES)[number], { en: string; bn: string }>;

/**
 * SEO টাইপ টাইপ
 */
export type SeoType = (typeof SEO_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট SEO টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getSeoTypeLabel(type: SeoType, lang: Language = 'en'): string {
  return SEO_TYPE_LABELS[type][lang];
}

/**
 * সব SEO টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllSeoTypes(): readonly SeoType[] {
  return SEO_TYPES;
}

/**
 * SEO টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSeoType(type: string): type is SeoType {
  return SEO_TYPES.includes(type as SeoType);
}

/**
 * টাইপ অন-পেজ কিনা চেক করার ফাংশন
 */
export function isOnPageSeoType(type: SeoType): boolean {
  return type === 'on-page';
}

/**
 * টাইপ অফ-পেজ কিনা চেক করার ফাংশন
 */
export function isOffPageSeoType(type: SeoType): boolean {
  return type === 'off-page';
}

/**
 * টাইপ টেকনিক্যাল কিনা চেক করার ফাংশন
 */
export function isTechnicalSeoType(type: SeoType): boolean {
  return type === 'technical';
}

/**
 * টাইপ লোকাল কিনা চেক করার ফাংশন
 */
export function isLocalSeoType(type: SeoType): boolean {
  return type === 'local';
}

/**
 * টাইপ কন্টেন্ট বেইসড (অন-পেজ) কিনা চেক করার ফাংশন
 */
export function isContentBasedSeoType(type: SeoType): boolean {
  return type === 'on-page';
}

/**
 * টাইপ লিংক বেইসড (অফ-পেজ) কিনা চেক করার ফাংশন
 */
export function isLinkBasedSeoType(type: SeoType): boolean {
  return type === 'off-page';
}

/**
 * টাইপ টেকনিক্যাল (টেকনিক্যাল) কিনা চেক করার ফাংশন
 */
export function isTechnicalBasedSeoType(type: SeoType): boolean {
  return type === 'technical';
}

/**
 * টাইপ লোকেশন বেইসড (লোকাল) কিনা চেক করার ফাংশন
 */
export function isLocationBasedSeoType(type: SeoType): boolean {
  return type === 'local';
}

/**
 * টাইপ ভিজিবিলিটি বেইসড (অন-পেজ, টেকনিক্যাল) কিনা চেক করার ফাংশন
 */
export function isVisibilityBasedSeoType(type: SeoType): boolean {
  return type === 'on-page' || type === 'technical';
}

/**
 * ডিফল্ট SEO টাইপ পাওয়ার ফাংশন
 */
export function getDefaultSeoType(): SeoType {
  return 'on-page';
}

/**
 * টাইপের আইকন পাওয়ার ফাংশন
 */
export function getSeoTypeIcon(type: SeoType): string {
  const icons: Record<SeoType, string> = {
    'on-page': '📄',
    'off-page': '🔗',
    technical: '⚙️',
    local: '📍',
  };
  return icons[type];
}

/**
 * টাইপের রঙ পাওয়ার ফাংশন
 */
export function getSeoTypeColor(type: SeoType): string {
  const colors: Record<SeoType, string> = {
    'on-page': '#3B82F6',
    'off-page': '#8B5CF6',
    technical: '#F59E0B',
    local: '#10B981',
  };
  return colors[type];
}

/**
 * টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getSeoTypeDescription(type: SeoType, lang: Language = 'en'): string {
  const descriptions: Record<SeoType, { en: string; bn: string }> = {
    'on-page': {
      en: 'Optimize individual web pages to rank higher',
      bn: 'উচ্চ র্যাঙ্কের জন্য পৃথক ওয়েব পেজ অপটিমাইজ করুন',
    },
    'off-page': {
      en: 'Build backlinks and external signals for SEO',
      bn: 'এসইওর জন্য ব্যাকলিংক এবং বাহ্যিক সংকেত তৈরি করুন',
    },
    technical: {
      en: 'Optimize website infrastructure for search engines',
      bn: 'সার্চ ইঞ্জিনের জন্য ওয়েবসাইট ইনফ্রাস্ট্রাকচার অপটিমাইজ করুন',
    },
    local: {
      en: 'Optimize for local search and geographic targeting',
      bn: 'লোকাল সার্চ এবং ভৌগলিক টার্গেটিং এর জন্য অপটিমাইজ করুন',
    },
  };
  return descriptions[type][lang];
}
