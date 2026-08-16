/**
 * হোয়াইট পেপারের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * হোয়াইট পেপারের ধরনসমূহ
 */
export const WHITE_PAPER_TYPES = ['technical', 'business', 'research', 'policy'] as const;

/**
 * হোয়াইট পেপার টাইপ টাইপ
 */
export type WhitePaperType = (typeof WHITE_PAPER_TYPES)[number];

/**
 * হোয়াইট পেপার টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const WHITE_PAPER_TYPE_LABELS = {
  technical: {
    en: 'Technical',
    bn: 'টেকনিক্যাল',
  },
  business: {
    en: 'Business',
    bn: 'ব্যবসায়িক',
  },
  research: {
    en: 'Research',
    bn: 'গবেষণা',
  },
  policy: {
    en: 'Policy',
    bn: 'নীতি',
  },
} as const satisfies Record<WhitePaperType, { en: string; bn: string }>;

/**
 * হোয়াইট পেপার টাইপের বিবরণ (বাংলা এবং ইংরেজি)
 */
export const WHITE_PAPER_TYPE_DESCRIPTIONS = {
  technical: {
    en: 'Technical white paper focusing on technology and implementation',
    bn: 'প্রযুক্তি এবং বাস্তবায়নে ফোকাস করা টেকনিক্যাল হোয়াইট পেপার',
  },
  business: {
    en: 'Business white paper focusing on strategy and ROI',
    bn: 'কৌশল এবং ROI-তে ফোকাস করা ব্যবসায়িক হোয়াইট পেপার',
  },
  research: {
    en: 'Research white paper presenting findings and analysis',
    bn: 'গবেষণা ফলাফল এবং বিশ্লেষণ উপস্থাপনকারী গবেষণা হোয়াইট পেপার',
  },
  policy: {
    en: 'Policy white paper focusing on regulations and compliance',
    bn: 'নিয়মকানুন এবং সম্মতিতে ফোকাস করা নীতি হোয়াইট পেপার',
  },
} as const satisfies Record<WhitePaperType, { en: string; bn: string }>;

/**
 * হোয়াইট পেপার টাইপের আইকন
 */
export const WHITE_PAPER_TYPE_ICONS = {
  technical: '⚙️',
  business: '💼',
  research: '🔬',
  policy: '📋',
} as const satisfies Record<WhitePaperType, string>;

/**
 * হোয়াইট পেপার টাইপের কালার
 */
export const WHITE_PAPER_TYPE_COLORS = {
  technical: 'blue',
  business: 'green',
  research: 'purple',
  policy: 'orange',
} as const satisfies Record<WhitePaperType, string>;

/**
 * নির্দিষ্ট হোয়াইট পেপার টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getWhitePaperTypeLabel(type: WhitePaperType, lang: 'en' | 'bn' = 'en'): string {
  return WHITE_PAPER_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট হোয়াইট পেপার টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getWhitePaperTypeDescription(
  type: WhitePaperType,
  lang: 'en' | 'bn' = 'en'
): string {
  return WHITE_PAPER_TYPE_DESCRIPTIONS[type][lang];
}

/**
 * নির্দিষ্ট হোয়াইট পেপার টাইপের আইকন পাওয়ার ফাংশন
 */
export function getWhitePaperTypeIcon(type: WhitePaperType): string {
  return WHITE_PAPER_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট হোয়াইট পেপার টাইপের কালার পাওয়ার ফাংশন
 */
export function getWhitePaperTypeColor(type: WhitePaperType): string {
  return WHITE_PAPER_TYPE_COLORS[type];
}

/**
 * সব হোয়াইট পেপার টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllWhitePaperTypes(): readonly WhitePaperType[] {
  return WHITE_PAPER_TYPES;
}

/**
 * হোয়াইট পেপার টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidWhitePaperType(type: string): type is WhitePaperType {
  return WHITE_PAPER_TYPES.includes(type as WhitePaperType);
}

/**
 * হোয়াইট পেপার টাইপ টেকনিক্যাল কিনা চেক করার ফাংশন
 */
export function isTechnicalWhitePaper(type: WhitePaperType): boolean {
  return type === 'technical';
}

/**
 * হোয়াইট পেপার টাইপ ব্যবসায়িক কিনা চেক করার ফাংশন
 */
export function isBusinessWhitePaper(type: WhitePaperType): boolean {
  return type === 'business';
}

/**
 * হোয়াইট পেপার টাইপ গবেষণা কিনা চেক করার ফাংশন
 */
export function isResearchWhitePaper(type: WhitePaperType): boolean {
  return type === 'research';
}

/**
 * হোয়াইট পেপার টাইপ নীতি কিনা চেক করার ফাংশন
 */
export function isPolicyWhitePaper(type: WhitePaperType): boolean {
  return type === 'policy';
}

/**
 * ডিফল্ট হোয়াইট পেপার টাইপ পাওয়ার ফাংশন
 */
export function getDefaultWhitePaperType(): WhitePaperType {
  return 'research';
}
