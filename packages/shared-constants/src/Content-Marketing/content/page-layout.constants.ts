/**
 * পেজ লেআউট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * পেজের সব লেআউট
 */
export const PAGE_LAYOUTS = ['default', 'full-width', 'boxed', 'fluid'] as const;

/**
 * প্রতিটি লেআউটের নাম (বাংলা এবং ইংরেজি)
 */
export const PAGE_LAYOUT_LABELS = {
  default: {
    en: 'Default Layout',
    bn: 'ডিফল্ট লেআউট',
  },
  'full-width': {
    en: 'Full Width',
    bn: 'পূর্ণ প্রস্থ',
  },
  boxed: {
    en: 'Boxed Layout',
    bn: 'বক্সড লেআউট',
  },
  fluid: {
    en: 'Fluid Layout',
    bn: 'ফ্লুইড লেআউট',
  },
} as const satisfies Record<(typeof PAGE_LAYOUTS)[number], { en: string; bn: string }>;

/**
 * পেজ লেআউট টাইপ
 */
export type PageLayout = (typeof PAGE_LAYOUTS)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট লেআউটের নাম পাওয়ার ফাংশন
 */
export function getPageLayoutLabel(layout: PageLayout, lang: Language = 'en'): string {
  return PAGE_LAYOUT_LABELS[layout][lang];
}

/**
 * সব পেজ লেআউটের তালিকা পাওয়ার ফাংশন
 */
export function getAllPageLayouts(): readonly PageLayout[] {
  return PAGE_LAYOUTS;
}

/**
 * পেজ লেআউট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPageLayout(layout: string): layout is PageLayout {
  return PAGE_LAYOUTS.includes(layout as PageLayout);
}

/**
 * লেআউটটি ফুল-উইডথ কিনা চেক করার ফাংশন
 */
export function isFullWidthLayout(layout: PageLayout): boolean {
  return layout === 'full-width';
}

/**
 * লেআউটটি বক্সড কিনা চেক করার ফাংশন
 */
export function isBoxedLayout(layout: PageLayout): boolean {
  return layout === 'boxed';
}

/**
 * লেআউটটি ফ্লুইড কিনা চেক করার ফাংশন
 */
export function isFluidLayout(layout: PageLayout): boolean {
  return layout === 'fluid';
}

/**
 * লেআউটটি ডিফল্ট কিনা চেক করার ফাংশন
 */
export function isDefaultLayout(layout: PageLayout): boolean {
  return layout === 'default';
}

/**
 * ডিফল্ট লেআউট পাওয়ার ফাংশন
 */
export function getDefaultPageLayout(): PageLayout {
  return 'default';
}
