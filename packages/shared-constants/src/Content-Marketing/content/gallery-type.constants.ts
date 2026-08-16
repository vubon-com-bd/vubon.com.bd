/**
 * গ্যালারির ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * গ্যালারির ধরনসমূহ
 */
export const GALLERY_TYPES = ['image', 'video', 'mixed', 'slideshow'] as const;

/**
 * প্রতিটি গ্যালারি টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const GALLERY_TYPE_LABELS = {
  image: {
    en: 'Image Gallery',
    bn: 'ইমেজ গ্যালারি',
  },
  video: {
    en: 'Video Gallery',
    bn: 'ভিডিও গ্যালারি',
  },
  mixed: {
    en: 'Mixed Gallery',
    bn: 'মিক্সড গ্যালারি',
  },
  slideshow: {
    en: 'Slideshow',
    bn: 'স্লাইডশো',
  },
} as const satisfies Record<(typeof GALLERY_TYPES)[number], { en: string; bn: string }>;

/**
 * গ্যালারি টাইপ টাইপ
 */
export type GalleryType = (typeof GALLERY_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট গ্যালারি টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getGalleryTypeLabel(type: GalleryType, lang: Language = 'en'): string {
  return GALLERY_TYPE_LABELS[type][lang];
}

/**
 * সব গ্যালারি টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllGalleryTypes(): readonly GalleryType[] {
  return GALLERY_TYPES;
}

/**
 * গ্যালারি টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidGalleryType(type: string): type is GalleryType {
  return GALLERY_TYPES.includes(type as GalleryType);
}

/**
 * গ্যালারি টাইপ ইমেজ কিনা চেক করার ফাংশন
 */
export function isImageGallery(type: GalleryType): boolean {
  return type === 'image';
}

/**
 * গ্যালারি টাইপ ভিডিও কিনা চেক করার ফাংশন
 */
export function isVideoGallery(type: GalleryType): boolean {
  return type === 'video';
}

/**
 * গ্যালারি টাইপ মিক্সড কিনা চেক করার ফাংশন
 */
export function isMixedGallery(type: GalleryType): boolean {
  return type === 'mixed';
}

/**
 * গ্যালারি টাইপ স্লাইডশো কিনা চেক করার ফাংশন
 */
export function isSlideshowGallery(type: GalleryType): boolean {
  return type === 'slideshow';
}

/**
 * গ্যালারি টাইপ মাল্টিমিডিয়া সমর্থিত কিনা চেক করার ফাংশন
 */
export function supportsMultipleMediaTypes(type: GalleryType): boolean {
  return type === 'mixed' || type === 'slideshow';
}

/**
 * গ্যালারি টাইপ অ্যানিমেশন সমর্থিত কিনা চেক করার ফাংশন
 */
export function supportsAnimation(type: GalleryType): boolean {
  return type === 'slideshow';
}

/**
 * ডিফল্ট গ্যালারি টাইপ পাওয়ার ফাংশন
 */
export function getDefaultGalleryType(): GalleryType {
  return 'image';
}
