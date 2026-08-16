/**
 * কন্টেন্ট সম্পর্কিত এরর মেসেজ কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * কন্টেন্ট সম্পর্কিত এরর মেসেজসমূহ
 */
export const ERROR_MESSAGES = {
  CONTENT_NOT_FOUND: 'Content not found',
  CONTENT_ALREADY_EXISTS: 'Content already exists',
  INVALID_CONTENT_TYPE: 'Invalid content type',
  INVALID_CONTENT_STATUS: 'Invalid content status',
  CONTENT_PUBLISH_FAILED: 'Content publish failed',
  CONTENT_DELETE_FAILED: 'Content delete failed',
  MEDIA_UPLOAD_FAILED: 'Media upload failed',
  BLOG_NOT_FOUND: 'Blog not found',
  PAGE_NOT_FOUND: 'Page not found',
  SEO_NOT_FOUND: 'SEO data not found',
} as const;

/**
 * এরর মেসেজ টাইপ
 */
export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;

/**
 * এরর মেসেজ ভ্যালু টাইপ
 */
export type ErrorMessageValue = (typeof ERROR_MESSAGES)[ErrorMessageKey];

/**
 * কন্টেন্ট এরর কোডসমূহ
 */
export const CONTENT_ERROR_CODES = {
  CONTENT_NOT_FOUND: 'E1001',
  CONTENT_ALREADY_EXISTS: 'E1002',
  INVALID_CONTENT_TYPE: 'E1003',
  INVALID_CONTENT_STATUS: 'E1004',
  CONTENT_PUBLISH_FAILED: 'E1005',
  CONTENT_DELETE_FAILED: 'E1006',
  MEDIA_UPLOAD_FAILED: 'E1007',
  BLOG_NOT_FOUND: 'E2001',
  PAGE_NOT_FOUND: 'E2002',
  SEO_NOT_FOUND: 'E3001',
} as const;

/**
 * এরর কোড টাইপ
 */
export type ContentErrorCode = (typeof CONTENT_ERROR_CODES)[ErrorMessageKey];

/**
 * এরর রেসপন্স ইন্টারফেস
 */
export interface ContentErrorResponse {
  code: ContentErrorCode;
  message: ErrorMessageValue;
  details?: string;
  timestamp: Date;
}

/**
 * এরর মেসেজ পাওয়ার ফাংশন
 */
export function getErrorMessage(key: ErrorMessageKey): ErrorMessageValue {
  return ERROR_MESSAGES[key];
}

/**
 * এরর কোড পাওয়ার ফাংশন
 */
export function getContentErrorCode(key: ErrorMessageKey): ContentErrorCode {
  return CONTENT_ERROR_CODES[key];
}

/**
 * এরর রেসপন্স তৈরির ফাংশন
 */
export function createContentErrorResponse(
  key: ErrorMessageKey,
  details?: string
): ContentErrorResponse {
  return {
    code: getContentErrorCode(key),
    message: getErrorMessage(key),
    details,
    timestamp: new Date(),
  };
}

/**
 * সব এরর মেসেজের তালিকা পাওয়ার ফাংশন
 */
export function getAllErrorMessages(): Record<ErrorMessageKey, ErrorMessageValue> {
  return { ...ERROR_MESSAGES };
}

/**
 * সব এরর কোডের তালিকা পাওয়ার ফাংশন
 */
export function getAllContentErrorCodes(): Record<ErrorMessageKey, ContentErrorCode> {
  return { ...CONTENT_ERROR_CODES };
}

/**
 * এরর মেসেজটি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidErrorMessageKey(key: string): key is ErrorMessageKey {
  return key in ERROR_MESSAGES;
}

/**
 * এরর কোডটি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidContentErrorCode(code: string): code is ContentErrorCode {
  return Object.values(CONTENT_ERROR_CODES).includes(code as ContentErrorCode);
}

/**
 * কোড থেকে এরর কী পাওয়ার ফাংশন
 */
export function getErrorMessageKeyFromCode(code: ContentErrorCode): ErrorMessageKey | null {
  const entry = Object.entries(CONTENT_ERROR_CODES).find(([_, value]) => value === code);
  return entry ? (entry[0] as ErrorMessageKey) : null;
}

/**
 * এরর মেসেজের ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getErrorCategory(key: ErrorMessageKey): string {
  const categories: Record<ErrorMessageKey, string> = {
    CONTENT_NOT_FOUND: 'content',
    CONTENT_ALREADY_EXISTS: 'content',
    INVALID_CONTENT_TYPE: 'validation',
    INVALID_CONTENT_STATUS: 'validation',
    CONTENT_PUBLISH_FAILED: 'operation',
    CONTENT_DELETE_FAILED: 'operation',
    MEDIA_UPLOAD_FAILED: 'media',
    BLOG_NOT_FOUND: 'blog',
    PAGE_NOT_FOUND: 'page',
    SEO_NOT_FOUND: 'seo',
  };
  return categories[key];
}

/**
 * এরর মেসেজের বিবরণ পাওয়ার ফাংশন (বাংলা)
 */
export function getErrorMessageBn(key: ErrorMessageKey): string {
  const translations: Record<ErrorMessageKey, string> = {
    CONTENT_NOT_FOUND: 'কন্টেন্ট পাওয়া যায়নি',
    CONTENT_ALREADY_EXISTS: 'কন্টেন্ট ইতিমধ্যে বিদ্যমান',
    INVALID_CONTENT_TYPE: 'কন্টেন্টের ধরন অবৈধ',
    INVALID_CONTENT_STATUS: 'কন্টেন্টের স্ট্যাটাস অবৈধ',
    CONTENT_PUBLISH_FAILED: 'কন্টেন্ট প্রকাশ করতে ব্যর্থ হয়েছে',
    CONTENT_DELETE_FAILED: 'কন্টেন্ট মুছতে ব্যর্থ হয়েছে',
    MEDIA_UPLOAD_FAILED: 'মিডিয়া আপলোড করতে ব্যর্থ হয়েছে',
    BLOG_NOT_FOUND: 'ব্লগ পাওয়া যায়নি',
    PAGE_NOT_FOUND: 'পেজ পাওয়া যায়নি',
    SEO_NOT_FOUND: 'SEO ডেটা পাওয়া যায়নি',
  };
  return translations[key];
}

/**
 * এরর মেসেজের এইচটিটিপি স্ট্যাটাস কোড পাওয়ার ফাংশন
 */
export function getErrorHttpStatus(key: ErrorMessageKey): number {
  const statusCodes: Record<ErrorMessageKey, number> = {
    CONTENT_NOT_FOUND: 404,
    CONTENT_ALREADY_EXISTS: 409,
    INVALID_CONTENT_TYPE: 400,
    INVALID_CONTENT_STATUS: 400,
    CONTENT_PUBLISH_FAILED: 500,
    CONTENT_DELETE_FAILED: 500,
    MEDIA_UPLOAD_FAILED: 500,
    BLOG_NOT_FOUND: 404,
    PAGE_NOT_FOUND: 404,
    SEO_NOT_FOUND: 404,
  };
  return statusCodes[key];
}
