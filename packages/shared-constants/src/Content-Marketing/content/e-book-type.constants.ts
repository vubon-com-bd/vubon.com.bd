/**
 * ই-বুকের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ই-বুকের ধরনসমূহ
 */
export const EBOOK_TYPES = ['fiction', 'non-fiction', 'academic', 'professional'] as const;

/**
 * ই-বুক টাইপ টাইপ
 */
export type EbookType = (typeof EBOOK_TYPES)[number];

/**
 * ই-বুক টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const EBOOK_TYPE_LABELS = {
  fiction: {
    en: 'Fiction',
    bn: 'কল্পকাহিনী',
  },
  'non-fiction': {
    en: 'Non-Fiction',
    bn: 'নন-ফিকশন',
  },
  academic: {
    en: 'Academic',
    bn: 'একাডেমিক',
  },
  professional: {
    en: 'Professional',
    bn: 'পেশাদার',
  },
} as const satisfies Record<EbookType, { en: string; bn: string }>;

/**
 * ই-বুক টাইপের বিবরণ (বাংলা এবং ইংরেজি)
 */
export const EBOOK_TYPE_DESCRIPTIONS = {
  fiction: {
    en: 'Fictional stories and novels',
    bn: 'কাল্পনিক গল্প এবং উপন্যাস',
  },
  'non-fiction': {
    en: 'Non-fictional works based on facts',
    bn: 'তথ্যের ভিত্তিতে নন-ফিকশনাল কাজ',
  },
  academic: {
    en: 'Academic textbooks and research materials',
    bn: 'একাডেমিক পাঠ্যপুস্তক এবং গবেষণা উপকরণ',
  },
  professional: {
    en: 'Professional development and career resources',
    bn: 'পেশাদার উন্নয়ন এবং কর্মজীবনের সংস্থান',
  },
} as const satisfies Record<EbookType, { en: string; bn: string }>;

/**
 * ই-বুক টাইপের আইকন
 */
export const EBOOK_TYPE_ICONS = {
  fiction: '📖',
  'non-fiction': '📚',
  academic: '🎓',
  professional: '💼',
} as const satisfies Record<EbookType, string>;

/**
 * ই-বুক টাইপের কালার
 */
export const EBOOK_TYPE_COLORS = {
  fiction: 'purple',
  'non-fiction': 'blue',
  academic: 'green',
  professional: 'orange',
} as const satisfies Record<EbookType, string>;

/**
 * নির্দিষ্ট ই-বুক টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getEbookTypeLabel(type: EbookType, lang: 'en' | 'bn' = 'en'): string {
  return EBOOK_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট ই-বুক টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getEbookTypeDescription(type: EbookType, lang: 'en' | 'bn' = 'en'): string {
  return EBOOK_TYPE_DESCRIPTIONS[type][lang];
}

/**
 * নির্দিষ্ট ই-বুক টাইপের আইকন পাওয়ার ফাংশন
 */
export function getEbookTypeIcon(type: EbookType): string {
  return EBOOK_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট ই-বুক টাইপের কালার পাওয়ার ফাংশন
 */
export function getEbookTypeColor(type: EbookType): string {
  return EBOOK_TYPE_COLORS[type];
}

/**
 * সব ই-বুক টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllEbookTypes(): readonly EbookType[] {
  return EBOOK_TYPES;
}

/**
 * ই-বুক টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEbookType(type: string): type is EbookType {
  return EBOOK_TYPES.includes(type as EbookType);
}

/**
 * ই-বুক টাইপ কল্পকাহিনী কিনা চেক করার ফাংশন
 */
export function isFictionEbook(type: EbookType): boolean {
  return type === 'fiction';
}

/**
 * ই-বুক টাইপ নন-ফিকশন কিনা চেক করার ফাংশন
 */
export function isNonFictionEbook(type: EbookType): boolean {
  return type === 'non-fiction';
}

/**
 * ই-বুক টাইপ একাডেমিক কিনা চেক করার ফাংশন
 */
export function isAcademicEbook(type: EbookType): boolean {
  return type === 'academic';
}

/**
 * ই-বুক টাইপ পেশাদার কিনা চেক করার ফাংশন
 */
export function isProfessionalEbook(type: EbookType): boolean {
  return type === 'professional';
}

/**
 * ডিফল্ট ই-বুক টাইপ পাওয়ার ফাংশন
 */
export function getDefaultEbookType(): EbookType {
  return 'non-fiction';
}
