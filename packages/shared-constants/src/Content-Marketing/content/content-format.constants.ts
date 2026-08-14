/**
 * কন্টেন্ট ফরম্যাট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * কন্টেন্টের সব ফরম্যাট
 */
export const CONTENT_FORMATS = ['html', 'markdown', 'plain-text', 'json', 'xml'] as const;

/**
 * কন্টেন্টের ডিফল্ট ফরম্যাট
 */
export const DEFAULT_CONTENT_FORMAT = 'html' as const;

/**
 * সাপোর্টেড ফরম্যাটসমূহ (যেগুলো রেন্ডার করা যায়)
 */
export const SUPPORTED_FORMATS = ['html', 'markdown'] as const;

/**
 * কন্টেন্ট ফরম্যাট টাইপ
 */
export type ContentFormat = (typeof CONTENT_FORMATS)[number];

/**
 * সাপোর্টেড ফরম্যাট টাইপ
 */
export type SupportedFormat = (typeof SUPPORTED_FORMATS)[number];

/**
 * ফরম্যাট এক্সটেনশন ম্যাপিং
 */
export const FORMAT_EXTENSIONS = {
  html: '.html',
  markdown: '.md',
  'plain-text': '.txt',
  json: '.json',
  xml: '.xml',
} as const satisfies Record<ContentFormat, string>;

/**
 * ফরম্যাট MIME টাইপ ম্যাপিং
 */
export const FORMAT_MIME_TYPES = {
  html: 'text/html',
  markdown: 'text/markdown',
  'plain-text': 'text/plain',
  json: 'application/json',
  xml: 'application/xml',
} as const satisfies Record<ContentFormat, string>;

/**
 * ফরম্যাটের লেবেল (বাংলা এবং ইংরেজি)
 */
export const FORMAT_LABELS = {
  html: {
    en: 'HTML',
    bn: 'এইচটিএমএল',
  },
  markdown: {
    en: 'Markdown',
    bn: 'মার্কডাউন',
  },
  'plain-text': {
    en: 'Plain Text',
    bn: 'সাধারণ টেক্সট',
  },
  json: {
    en: 'JSON',
    bn: 'জেসন',
  },
  xml: {
    en: 'XML',
    bn: 'এক্সএমএল',
  },
} as const satisfies Record<ContentFormat, { en: string; bn: string }>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * ফরম্যাট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidFormat(format: string): format is ContentFormat {
  return CONTENT_FORMATS.includes(format as ContentFormat);
}

/**
 * ফরম্যাট সাপোর্টেড কিনা চেক করার ফাংশন
 */
export function isSupportedFormat(format: string): format is SupportedFormat {
  return SUPPORTED_FORMATS.includes(format as SupportedFormat);
}

/**
 * ফরম্যাটের এক্সটেনশন পাওয়ার ফাংশন
 */
export function getFormatExtension(format: ContentFormat): string {
  return FORMAT_EXTENSIONS[format];
}

/**
 * ফরম্যাটের MIME টাইপ পাওয়ার ফাংশন
 */
export function getFormatMimeType(format: ContentFormat): string {
  return FORMAT_MIME_TYPES[format];
}

/**
 * ফরম্যাটের লেবেল পাওয়ার ফাংশন
 */
export function getFormatLabel(format: ContentFormat, lang: Language = 'en'): string {
  return FORMAT_LABELS[format][lang];
}

/**
 * এক্সটেনশন থেকে ফরম্যাট বের করার ফাংশন
 */
export function getFormatFromExtension(extension: string): ContentFormat | null {
  const normalizedExt = extension.toLowerCase().replace(/^\./, '');
  const entry = Object.entries(FORMAT_EXTENSIONS).find(([_, ext]) => ext === `.${normalizedExt}`);
  return entry ? (entry[0] as ContentFormat) : null;
}

/**
 * MIME টাইপ থেকে ফরম্যাট বের করার ফাংশন
 */
export function getFormatFromMimeType(mimeType: string): ContentFormat | null {
  const normalizedMime = mimeType.toLowerCase();
  const entry = Object.entries(FORMAT_MIME_TYPES).find(([_, mime]) => mime === normalizedMime);
  return entry ? (entry[0] as ContentFormat) : null;
}

/**
 * সব ফরম্যাটের তালিকা পাওয়ার ফাংশন
 */
export function getAllFormats(): readonly ContentFormat[] {
  return CONTENT_FORMATS;
}

/**
 * সব সাপোর্টেড ফরম্যাটের তালিকা পাওয়ার ফাংশন
 */
export function getAllSupportedFormats(): readonly SupportedFormat[] {
  return SUPPORTED_FORMATS;
}

/**
 * ফরম্যাটটি রিচ টেক্সট ফরম্যাট কিনা চেক করার ফাংশন
 */
export function isRichTextFormat(format: ContentFormat): boolean {
  return ['html', 'markdown'].includes(format);
}

/**
 * ফরম্যাটটি প্লেইন টেক্সট ফরম্যাট কিনা চেক করার ফাংশন
 */
export function isPlainTextFormat(format: ContentFormat): boolean {
  return format === 'plain-text';
}

/**
 * ফরম্যাটটি স্ট্রাকচার্ড ডেটা ফরম্যাট কিনা চেক করার ফাংশন
 */
export function isStructuredFormat(format: ContentFormat): boolean {
  return ['json', 'xml'].includes(format);
}
