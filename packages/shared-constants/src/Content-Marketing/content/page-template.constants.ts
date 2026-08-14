/**
 * পেজ টেমপ্লেট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * পেজের সব টেমপ্লেট
 */
export const PAGE_TEMPLATES = [
  'default',
  'landing',
  'full-width',
  'sidebar-left',
  'sidebar-right',
  'custom',
] as const;

/**
 * প্রতিটি টেমপ্লেটের নাম (বাংলা এবং ইংরেজি)
 */
export const PAGE_TEMPLATE_LABELS = {
  default: {
    en: 'Default Template',
    bn: 'ডিফল্ট টেমপ্লেট',
  },
  landing: {
    en: 'Landing Page',
    bn: 'ল্যান্ডিং পেজ',
  },
  'full-width': {
    en: 'Full Width',
    bn: 'পূর্ণ প্রস্থ',
  },
  'sidebar-left': {
    en: 'Sidebar Left',
    bn: 'সাইডবার বামে',
  },
  'sidebar-right': {
    en: 'Sidebar Right',
    bn: 'সাইডবার ডানে',
  },
  custom: {
    en: 'Custom Template',
    bn: 'কাস্টম টেমপ্লেট',
  },
} as const satisfies Record<(typeof PAGE_TEMPLATES)[number], { en: string; bn: string }>;

/**
 * পেজ টেমপ্লেট টাইপ
 */
export type PageTemplate = (typeof PAGE_TEMPLATES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট টেমপ্লেটের নাম পাওয়ার ফাংশন
 */
export function getPageTemplateLabel(template: PageTemplate, lang: Language = 'en'): string {
  return PAGE_TEMPLATE_LABELS[template][lang];
}

/**
 * সব পেজ টেমপ্লেটের তালিকা পাওয়ার ফাংশন
 */
export function getAllPageTemplates(): readonly PageTemplate[] {
  return PAGE_TEMPLATES;
}

/**
 * পেজ টেমপ্লেট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPageTemplate(template: string): template is PageTemplate {
  return PAGE_TEMPLATES.includes(template as PageTemplate);
}

/**
 * টেমপ্লেটটি সাইডবার সমর্থিত কিনা চেক করার ফাংশন
 */
export function hasSidebar(template: PageTemplate): boolean {
  return template === 'sidebar-left' || template === 'sidebar-right';
}

/**
 * টেমপ্লেটটি ফুল-উইডথ কিনা চেক করার ফাংশন
 */
export function isFullWidth(template: PageTemplate): boolean {
  return template === 'full-width';
}

/**
 * টেমপ্লেটটি ল্যান্ডিং পেজ কিনা চেক করার ফাংশন
 */
export function isLandingPage(template: PageTemplate): boolean {
  return template === 'landing';
}

/**
 * টেমপ্লেটটি কাস্টম কিনা চেক করার ফাংশন
 */
export function isCustomTemplate(template: PageTemplate): boolean {
  return template === 'custom';
}

/**
 * ডিফল্ট টেমপ্লেট পাওয়ার ফাংশন
 */
export function getDefaultPageTemplate(): PageTemplate {
  return 'default';
}
