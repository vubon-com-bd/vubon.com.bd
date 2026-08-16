/**
 * গাইডের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * গাইডের ধরনসমূহ
 */
export const GUIDE_TYPES = ['beginner', 'intermediate', 'advanced', 'expert'] as const;

/**
 * গাইড টাইপ টাইপ
 */
export type GuideType = (typeof GUIDE_TYPES)[number];

/**
 * গাইড টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const GUIDE_TYPE_LABELS = {
  beginner: {
    en: 'Beginner',
    bn: 'শিক্ষানবিশ',
  },
  intermediate: {
    en: 'Intermediate',
    bn: 'মাধ্যমিক',
  },
  advanced: {
    en: 'Advanced',
    bn: 'উন্নত',
  },
  expert: {
    en: 'Expert',
    bn: 'বিশেষজ্ঞ',
  },
} as const satisfies Record<GuideType, { en: string; bn: string }>;

/**
 * গাইড টাইপের বিবরণ (বাংলা এবং ইংরেজি)
 */
export const GUIDE_TYPE_DESCRIPTIONS = {
  beginner: {
    en: 'For users who are new to the topic',
    bn: 'যারা বিষয়টিতে নতুন তাদের জন্য',
  },
  intermediate: {
    en: 'For users with some experience and knowledge',
    bn: 'যাদের কিছু অভিজ্ঞতা এবং জ্ঞান আছে তাদের জন্য',
  },
  advanced: {
    en: 'For users with extensive experience',
    bn: 'যাদের ব্যাপক অভিজ্ঞতা আছে তাদের জন্য',
  },
  expert: {
    en: 'For users with expert-level knowledge',
    bn: 'যাদের বিশেষজ্ঞ স্তরের জ্ঞান আছে তাদের জন্য',
  },
} as const satisfies Record<GuideType, { en: string; bn: string }>;

/**
 * গাইড টাইপের আইকন
 */
export const GUIDE_TYPE_ICONS = {
  beginner: '🌱',
  intermediate: '📚',
  advanced: '🚀',
  expert: '🏆',
} as const satisfies Record<GuideType, string>;

/**
 * গাইড টাইপের কালার
 */
export const GUIDE_TYPE_COLORS = {
  beginner: 'green',
  intermediate: 'blue',
  advanced: 'orange',
  expert: 'purple',
} as const satisfies Record<GuideType, string>;

/**
 * নির্দিষ্ট গাইড টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getGuideTypeLabel(type: GuideType, lang: 'en' | 'bn' = 'en'): string {
  return GUIDE_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট গাইড টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getGuideTypeDescription(type: GuideType, lang: 'en' | 'bn' = 'en'): string {
  return GUIDE_TYPE_DESCRIPTIONS[type][lang];
}

/**
 * নির্দিষ্ট গাইড টাইপের আইকন পাওয়ার ফাংশন
 */
export function getGuideTypeIcon(type: GuideType): string {
  return GUIDE_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট গাইড টাইপের কালার পাওয়ার ফাংশন
 */
export function getGuideTypeColor(type: GuideType): string {
  return GUIDE_TYPE_COLORS[type];
}

/**
 * সব গাইড টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllGuideTypes(): readonly GuideType[] {
  return GUIDE_TYPES;
}

/**
 * গাইড টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidGuideType(type: string): type is GuideType {
  return GUIDE_TYPES.includes(type as GuideType);
}

/**
 * গাইড টাইপ শিক্ষানবিশ কিনা চেক করার ফাংশন
 */
export function isBeginnerGuide(type: GuideType): boolean {
  return type === 'beginner';
}

/**
 * গাইড টাইপ মাধ্যমিক কিনা চেক করার ফাংশন
 */
export function isIntermediateGuide(type: GuideType): boolean {
  return type === 'intermediate';
}

/**
 * গাইড টাইপ উন্নত কিনা চেক করার ফাংশন
 */
export function isAdvancedGuide(type: GuideType): boolean {
  return type === 'advanced';
}

/**
 * গাইড টাইপ বিশেষজ্ঞ কিনা চেক করার ফাংশন
 */
export function isExpertGuide(type: GuideType): boolean {
  return type === 'expert';
}

/**
 * গাইড টাইপের স্তর (লেভেল) পাওয়ার ফাংশন
 */
export function getGuideTypeLevel(type: GuideType): number {
  const levels: Record<GuideType, number> = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
  };
  return levels[type];
}

/**
 * ডিফল্ট গাইড টাইপ পাওয়ার ফাংশন
 */
export function getDefaultGuideType(): GuideType {
  return 'beginner';
}
