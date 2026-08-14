/**
 * কন্টেন্ট টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * কন্টেন্টের সব ধরন
 */
export const CONTENT_TYPES = [
  'blog',
  'page',
  'video',
  'podcast',
  'webinar',
  'guide',
  'case-study',
  'white-paper',
  'e-book',
] as const;

/**
 * কন্টেন্ট টাইপের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const CONTENT_TYPE_LABELS = {
  blog: {
    en: 'Blog Post',
    bn: 'ব্লগ পোস্ট',
  },
  page: {
    en: 'Page',
    bn: 'পৃষ্ঠা',
  },
  video: {
    en: 'Video',
    bn: 'ভিডিও',
  },
  podcast: {
    en: 'Podcast',
    bn: 'পডকাস্ট',
  },
  webinar: {
    en: 'Webinar',
    bn: 'ওয়েবিনার',
  },
  guide: {
    en: 'Guide',
    bn: 'গাইড',
  },
  'case-study': {
    en: 'Case Study',
    bn: 'কেস স্টাডি',
  },
  'white-paper': {
    en: 'White Paper',
    bn: 'হোয়াইট পেপার',
  },
  'e-book': {
    en: 'E-Book',
    bn: 'ই-বুক',
  },
} as const satisfies Record<(typeof CONTENT_TYPES)[number], { en: string; bn: string }>;

/**
 * কন্টেন্ট টাইপ টাইপ
 */
export type ContentType = (typeof CONTENT_TYPES)[number];

/**
 * কন্টেন্ট টাইপ লেবেল টাইপ
 */
export type ContentTypeLabel = typeof CONTENT_TYPE_LABELS;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট কন্টেন্ট টাইপের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getContentTypeLabel(type: ContentType, lang: Language = 'en'): string {
  return CONTENT_TYPE_LABELS[type][lang];
}

/**
 * সব কন্টেন্ট টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllContentTypes(): readonly ContentType[] {
  return CONTENT_TYPES;
}

/**
 * কন্টেন্ট টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidContentType(type: string): type is ContentType {
  return CONTENT_TYPES.includes(type as ContentType);
}
