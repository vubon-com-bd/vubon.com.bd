/**
 * মিডিয়া ফরম্যাট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * মিডিয়া ফরম্যাটসমূহ
 */
export const MEDIA_FORMATS = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'svg',
  'mp4',
  'pdf',
  'doc',
] as const;

/**
 * প্রতিটি ফরম্যাটের MIME টাইপ
 */
export const MEDIA_FORMAT_MIME_TYPES = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  mp4: 'video/mp4',
  pdf: 'application/pdf',
  doc: 'application/msword',
} as const satisfies Record<(typeof MEDIA_FORMATS)[number], string>;

/**
 * ফরম্যাট থেকে MIME টাইপ রিভার্স ম্যাপিং
 */
export const MIME_TYPE_TO_FORMAT = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'video/mp4': 'mp4',
  'application/pdf': 'pdf',
  'application/msword': 'doc',
} as const;

/**
 * মিডিয়া ফরম্যাট টাইপ
 */
export type MediaFormat = (typeof MEDIA_FORMATS)[number];

/**
 * মিডিয়া ফরম্যাট ক্যাটাগরি
 */
export type MediaFormatCategory = 'image' | 'video' | 'document';

/**
 * ফরম্যাটের ক্যাটাগরি
 */
export const MEDIA_FORMAT_CATEGORIES = {
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  gif: 'image',
  webp: 'image',
  svg: 'image',
  mp4: 'video',
  pdf: 'document',
  doc: 'document',
} as const satisfies Record<MediaFormat, MediaFormatCategory>;

/**
 * ফরম্যাটের ফাইল এক্সটেনশন (ডট সহ)
 */
export const MEDIA_FORMAT_EXTENSIONS = {
  jpg: '.jpg',
  jpeg: '.jpeg',
  png: '.png',
  gif: '.gif',
  webp: '.webp',
  svg: '.svg',
  mp4: '.mp4',
  pdf: '.pdf',
  doc: '.doc',
} as const satisfies Record<MediaFormat, string>;

/**
 * মিডিয়া ফরম্যাট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidMediaFormat(format: string): format is MediaFormat {
  return MEDIA_FORMATS.includes(format as MediaFormat);
}

/**
 * ফরম্যাটের MIME টাইপ পাওয়ার ফাংশন
 */
export function getMediaFormatMimeType(format: MediaFormat): string {
  return MEDIA_FORMAT_MIME_TYPES[format];
}

/**
 * MIME টাইপ থেকে ফরম্যাট পাওয়ার ফাংশন
 */
export function getMediaFormatFromMimeType(mimeType: string): MediaFormat | null {
  const normalizedMime = mimeType.toLowerCase();
  const entry = Object.entries(MIME_TYPE_TO_FORMAT).find(([mime]) => mime === normalizedMime);
  return entry ? (entry[1] as MediaFormat) : null;
}

/**
 * ফরম্যাটের ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getMediaFormatCategory(format: MediaFormat): MediaFormatCategory {
  return MEDIA_FORMAT_CATEGORIES[format];
}

/**
 * ফরম্যাটের ফাইল এক্সটেনশন পাওয়ার ফাংশন
 */
export function getMediaFormatExtension(format: MediaFormat): string {
  return MEDIA_FORMAT_EXTENSIONS[format];
}

/**
 * ফরম্যাট ইমেজ কিনা চেক করার ফাংশন
 */
export function isImageFormat(format: MediaFormat): boolean {
  return getMediaFormatCategory(format) === 'image';
}

/**
 * ফরম্যাট ভিডিও কিনা চেক করার ফাংশন
 */
export function isVideoFormat(format: MediaFormat): boolean {
  return getMediaFormatCategory(format) === 'video';
}

/**
 * ফরম্যাট ডকুমেন্ট কিনা চেক করার ফাংশন
 */
export function isDocumentFormat(format: MediaFormat): boolean {
  return getMediaFormatCategory(format) === 'document';
}

/**
 * সব মিডিয়া ফরম্যাটের তালিকা পাওয়ার ফাংশন
 */
export function getAllMediaFormats(): readonly MediaFormat[] {
  return MEDIA_FORMATS;
}

/**
 * ইমেজ ফরম্যাটের তালিকা পাওয়ার ফাংশন
 */
export function getImageFormats(): MediaFormat[] {
  return MEDIA_FORMATS.filter((format) => isImageFormat(format));
}

/**
 * ভিডিও ফরম্যাটের তালিকা পাওয়ার ফাংশন
 */
export function getVideoFormats(): MediaFormat[] {
  return MEDIA_FORMATS.filter((format) => isVideoFormat(format));
}

/**
 * ডকুমেন্ট ফরম্যাটের তালিকা পাওয়ার ফাংশন
 */
export function getDocumentFormats(): MediaFormat[] {
  return MEDIA_FORMATS.filter((format) => isDocumentFormat(format));
}
