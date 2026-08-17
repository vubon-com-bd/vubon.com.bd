/**
 * মিডিয়া ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * মিডিয়া ম্যানেজমেন্ট মডিউলের নাম
 */
export const MEDIA_MODULE_NAME = 'Media Management';

/**
 * সর্বোচ্চ ফাইল সাইজ (10MB)
 */
export const MAX_FILE_SIZE = 10485760;

/**
 * অনুমোদিত ইমেজ টাইপসমূহ
 */
export const ALLOWED_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'] as const;

/**
 * অনুমোদিত ভিডিও টাইপসমূহ
 */
export const ALLOWED_VIDEO_TYPES = ['mp4', 'webm', 'ogg'] as const;

/**
 * অনুমোদিত ডকুমেন্ট টাইপসমূহ
 */
export const ALLOWED_DOCUMENT_TYPES = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'] as const;

/**
 * ইমেজ থাম্বনেইল সাইজসমূহ
 */
export const IMAGE_THUMBNAIL_SIZES = {
  small: 150,
  medium: 300,
  large: 600,
} as const;

/**
 * মিডিয়া আপলোড পাথ
 */
export const MEDIA_UPLOAD_PATH = '/uploads/' as const;

/**
 * ডিফল্ট মিডিয়া স্ট্যাটাস
 */
export const DEFAULT_MEDIA_STATUS = 'active' as const;

/**
 * মিডিয়া টাইপ টাইপ
 */
export type MediaType = 'image' | 'video' | 'document' | 'other';

/**
 * অনুমোদিত ইমেজ টাইপ টাইপ
 */
export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

/**
 * অনুমোদিত ভিডিও টাইপ টাইপ
 */
export type AllowedVideoType = (typeof ALLOWED_VIDEO_TYPES)[number];

/**
 * অনুমোদিত ডকুমেন্ট টাইপ টাইপ
 */
export type AllowedDocumentType = (typeof ALLOWED_DOCUMENT_TYPES)[number];

/**
 * থাম্বনেইল সাইজ টাইপ
 */
export type ThumbnailSize = keyof typeof IMAGE_THUMBNAIL_SIZES;

/**
 * মিডিয়া স্ট্যাটাস টাইপ
 */
export type MediaStatus = typeof DEFAULT_MEDIA_STATUS;

/**
 * মিডিয়া ফাইল ইন্টারফেস
 */
export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  path: string;
  url: string;
  type: MediaType;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  status: MediaStatus;
  metadata?: MediaMetadata;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * মিডিয়া মেটাডেটা ইন্টারফেস
 */
export interface MediaMetadata {
  alt?: string;
  caption?: string;
  title?: string;
  description?: string;
  tags?: string[];
  credit?: string;
  source?: string;
  copyright?: string;
}

/**
 * মিডিয়া আপলোড ইন্টারফেস
 */
export interface MediaUpload {
  file: File;
  type: MediaType;
  path?: string;
  metadata?: MediaMetadata;
}

/**
 * মিডিয়া ফিল্টার ইন্টারফেস
 */
export interface MediaFilter {
  type?: MediaType;
  status?: MediaStatus;
  search?: string;
  tags?: string[];
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'filename' | 'size';
  sortOrder?: 'asc' | 'desc';
}

/**
 * মিডিয়া টাইপ নির্ধারণের ফাংশন
 */
export function getMediaType(mimeType: string): MediaType {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (
    mimeType.startsWith('application/pdf') ||
    mimeType.startsWith('application/msword') ||
    mimeType.startsWith('application/vnd.openxmlformats-officedocument') ||
    mimeType.startsWith('application/vnd.ms-excel') ||
    mimeType.startsWith('application/vnd.ms-powerpoint')
  ) {
    return 'document';
  }
  return 'other';
}

/**
 * ফাইল টাইপ অনুমোদিত কিনা চেক করার ফাংশন
 */
export function isAllowedFileType(extension: string, mediaType: MediaType): boolean {
  const ext = extension.toLowerCase().replace(/^\./, '');

  if (mediaType === 'image') {
    return ALLOWED_IMAGE_TYPES.includes(ext as AllowedImageType);
  }
  if (mediaType === 'video') {
    return ALLOWED_VIDEO_TYPES.includes(ext as AllowedVideoType);
  }
  if (mediaType === 'document') {
    return ALLOWED_DOCUMENT_TYPES.includes(ext as AllowedDocumentType);
  }
  return false;
}

/**
 * ফাইল সাইজ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidFileSize(size: number): boolean {
  return size > 0 && size <= MAX_FILE_SIZE;
}

/**
 * থাম্বনেইল URL তৈরির ফাংশন
 */
export function generateThumbnailUrl(mediaUrl: string, size: ThumbnailSize): string {
  const sizeValue = IMAGE_THUMBNAIL_SIZES[size];
  // Assuming the media URL structure supports size parameter
  return `${mediaUrl}?w=${sizeValue}&h=${sizeValue}&fit=crop`;
}

/**
 * মিডিয়া URL তৈরির ফাংশন
 */
export function generateMediaUrl(filename: string, path: string = MEDIA_UPLOAD_PATH): string {
  const cleanPath = path.endsWith('/') ? path : `${path}/`;
  return `${cleanPath}${filename}`;
}

/**
 * ফাইল এক্সটেনশন পাওয়ার ফাংশন
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : '';
}

/**
 * ফাইলের নাম স্বাভাবিক করার ফাংশন
 */
export function normalizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * সব অনুমোদিত টাইপ পাওয়ার ফাংশন
 */
export function getAllAllowedTypes(): string[] {
  return [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES, ...ALLOWED_DOCUMENT_TYPES];
}

/**
 * মিডিয়া টাইপের জন্য অনুমোদিত এক্সটেনশন পাওয়ার ফাংশন
 */
export function getAllowedExtensions(mediaType: MediaType): readonly string[] {
  if (mediaType === 'image') return ALLOWED_IMAGE_TYPES;
  if (mediaType === 'video') return ALLOWED_VIDEO_TYPES;
  if (mediaType === 'document') return ALLOWED_DOCUMENT_TYPES;
  return [];
}
