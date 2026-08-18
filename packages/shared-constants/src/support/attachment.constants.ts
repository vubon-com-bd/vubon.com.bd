/**
 * অ্যাটাচমেন্ট সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * অ্যাটাচমেন্ট আইডি প্রিফিক্স
 */
export const ATTACHMENT_ID_PREFIX = 'ATT';

/**
 * অ্যাটাচমেন্ট নম্বর ফরম্যাট
 */
export const ATTACHMENT_NUMBER_FORMAT = 'ATT-{timestamp}-{sequence}';

/**
 * সর্বোচ্চ ফাইল সাইজ (বাইটে) - 25MB
 */
export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

/**
 * সর্বোচ্চ ফাইল সাইজ (মেগাবাইটে)
 */
export const MAX_FILE_SIZE_MB = 25;

/**
 * সমর্থিত ফাইল ফরম্যাট
 */
export const SUPPORTED_FILE_FORMATS = {
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tiff', 'ico'],
  DOCUMENT: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp'],
  TEXT: ['txt', 'csv', 'json', 'xml', 'yaml', 'yml', 'md', 'log'],
  ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'],
  AUDIO: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a'],
  VIDEO: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'],
  CODE: ['js', 'ts', 'py', 'java', 'cpp', 'c', 'html', 'css', 'php', 'rb', 'go', 'rs', 'swift'],
  OTHER: ['exe', 'dmg', 'iso', 'apk', 'ipa'],
} as const;

/**
 * সাপোর্টেড ফাইল ফরম্যাটের MIME টাইপ
 */
export const SUPPORTED_MIME_TYPES = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/gif': ['gif'],
  'image/svg+xml': ['svg'],
  'image/webp': ['webp'],
  'image/bmp': ['bmp'],
  'image/tiff': ['tiff'],
  'image/x-icon': ['ico'],
  'application/pdf': ['pdf'],
  'application/msword': ['doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
  'application/vnd.ms-excel': ['xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
  'application/vnd.ms-powerpoint': ['ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['pptx'],
  'application/vnd.oasis.opendocument.text': ['odt'],
  'application/vnd.oasis.opendocument.spreadsheet': ['ods'],
  'application/vnd.oasis.opendocument.presentation': ['odp'],
  'text/plain': ['txt', 'log'],
  'text/csv': ['csv'],
  'application/json': ['json'],
  'application/xml': ['xml'],
  'text/yaml': ['yaml', 'yml'],
  'text/markdown': ['md'],
  'application/zip': ['zip'],
  'application/x-rar-compressed': ['rar'],
  'application/x-7z-compressed': ['7z'],
  'application/x-tar': ['tar'],
  'application/gzip': ['gz'],
  'application/x-bzip2': ['bz2'],
  'audio/mpeg': ['mp3'],
  'audio/wav': ['wav'],
  'audio/aac': ['aac'],
  'audio/ogg': ['ogg'],
  'audio/flac': ['flac'],
  'audio/mp4': ['m4a'],
  'video/mp4': ['mp4'],
  'video/x-msvideo': ['avi'],
  'video/x-matroska': ['mkv'],
  'video/quicktime': ['mov'],
  'video/x-ms-wmv': ['wmv'],
  'video/x-flv': ['flv'],
  'video/webm': ['webm'],
  'text/javascript': ['js'],
  'text/typescript': ['ts'],
  'text/x-python': ['py'],
  'text/x-java': ['java'],
  'text/x-c': ['c', 'cpp'],
  'text/html': ['html'],
  'text/css': ['css'],
  'text/x-php': ['php'],
  'text/x-ruby': ['rb'],
  'text/x-go': ['go'],
  'text/x-rust': ['rs'],
  'text/x-swift': ['swift'],
  'application/x-msdownload': ['exe'],
  'application/x-apple-diskimage': ['dmg'],
  'application/x-iso9660-image': ['iso'],
  'application/vnd.android.package-archive': ['apk'],
  'application/x-iphone': ['ipa'],
} as const;

/**
 * ফাইল স্টোরেজ লোকেশন
 */
export const FILE_STORAGE_LOCATIONS = {
  LOCAL: 'local',
  S3: 's3',
  GCS: 'gcs',
  AZURE: 'azure',
  CDN: 'cdn',
  DATABASE: 'database',
} as const;

/**
 * ফাইল রিটেনশন পিরিয়ড (দিনে)
 */
export const FILE_RETENTION_PERIODS = {
  TEMPORARY: 1,
  SHORT_TERM: 7,
  MEDIUM_TERM: 30,
  LONG_TERM: 90,
  PERMANENT: 365,
} as const;

/**
 * ডিফল্ট ফাইল কোয়ালিটি
 */
export const DEFAULT_FILE_QUALITY = {
  IMAGE_QUALITY: 85,
  VIDEO_QUALITY: 80,
  AUDIO_QUALITY: 128,
} as const;

/**
 * ইমেজ থাম্বনেইল সাইজ (পিক্সেলে)
 */
export const IMAGE_THUMBNAIL_SIZES = {
  SMALL: { width: 150, height: 150 },
  MEDIUM: { width: 300, height: 300 },
  LARGE: { width: 600, height: 600 },
  ORIGINAL: { width: 0, height: 0 },
} as const;

/**
 * ফাইল অ্যাক্সেস লেভেল
 */
export const FILE_ACCESS_LEVELS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  SHARED: 'shared',
  RESTRICTED: 'restricted',
  CONFIDENTIAL: 'confidential',
} as const;

/**
 * ফাইল স্ট্যাটাস
 */
export const FILE_STATUS = {
  UPLOADING: 'uploading',
  UPLOADED: 'uploaded',
  PROCESSING: 'processing',
  PROCESSED: 'processed',
  FAILED: 'failed',
  DELETED: 'deleted',
  ARCHIVED: 'archived',
} as const;

/**
 * ফাইল টাইপ ক্যাটাগরি
 */
export const FILE_TYPE_CATEGORIES = {
  IMAGE: 'image',
  DOCUMENT: 'document',
  TEXT: 'text',
  ARCHIVE: 'archive',
  AUDIO: 'audio',
  VIDEO: 'video',
  CODE: 'code',
  OTHER: 'other',
} as const;

/**
 * ফাইল ভ্যালিডেশন রুলস
 */
export const ATTACHMENT_VALIDATION_RULES = {
  maxFileSize: MAX_FILE_SIZE_BYTES,
  maxFiles: 10,
  allowedFormats: [
    ...SUPPORTED_FILE_FORMATS.IMAGE,
    ...SUPPORTED_FILE_FORMATS.DOCUMENT,
    ...SUPPORTED_FILE_FORMATS.TEXT,
    ...SUPPORTED_FILE_FORMATS.ARCHIVE,
    ...SUPPORTED_FILE_FORMATS.AUDIO,
    ...SUPPORTED_FILE_FORMATS.VIDEO,
  ],
  minImageWidth: 50,
  minImageHeight: 50,
  maxImageWidth: 10000,
  maxImageHeight: 10000,
} as const;

/**
 * ফাইল মেটাডেটা ফিল্ডস
 */
export const FILE_METADATA_FIELDS = {
  ORIGINAL_NAME: 'originalName',
  FILE_NAME: 'fileName',
  FILE_SIZE: 'fileSize',
  MIME_TYPE: 'mimeType',
  FILE_FORMAT: 'fileFormat',
  FILE_CATEGORY: 'fileCategory',
  DIMENSIONS: 'dimensions',
  DURATION: 'duration',
  BITRATE: 'bitrate',
  FRAME_RATE: 'frameRate',
  COLOR_SPACE: 'colorSpace',
} as const;

export type AttachmentIdPrefix = typeof ATTACHMENT_ID_PREFIX;
export type SupportedFileFormats = typeof SUPPORTED_FILE_FORMATS;
export type SupportedMimeTypes = typeof SUPPORTED_MIME_TYPES;
export type FileStorageLocation =
  (typeof FILE_STORAGE_LOCATIONS)[keyof typeof FILE_STORAGE_LOCATIONS];
export type FileRetentionPeriod =
  (typeof FILE_RETENTION_PERIODS)[keyof typeof FILE_RETENTION_PERIODS];
export type DefaultFileQuality = typeof DEFAULT_FILE_QUALITY;
export type ImageThumbnailSize = (typeof IMAGE_THUMBNAIL_SIZES)[keyof typeof IMAGE_THUMBNAIL_SIZES];
export type FileAccessLevel = (typeof FILE_ACCESS_LEVELS)[keyof typeof FILE_ACCESS_LEVELS];
export type FileStatus = (typeof FILE_STATUS)[keyof typeof FILE_STATUS];
export type FileTypeCategory = (typeof FILE_TYPE_CATEGORIES)[keyof typeof FILE_TYPE_CATEGORIES];
export type AttachmentValidationRules = typeof ATTACHMENT_VALIDATION_RULES;
export type FileMetadataFields = typeof FILE_METADATA_FIELDS;

export interface FileDimension {
  width: number;
  height: number;
}

export interface FileMetadata {
  id: string;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  fileFormat: string;
  fileCategory: FileTypeCategory;
  storageLocation: FileStorageLocation;
  storagePath: string;
  accessLevel: FileAccessLevel;
  status: FileStatus;
  thumbnailUrl?: string;
  metadata: {
    dimensions?: FileDimension;
    duration?: number;
    bitrate?: number;
    frameRate?: number;
    colorSpace?: string;
    [key: string]: unknown;
  };
  uploadedBy: string;
  uploadedAt: Date;
  expiresAt?: Date;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileUploadOptions {
  maxFileSize?: number;
  allowedFormats?: string[];
  minImageWidth?: number;
  minImageHeight?: number;
  maxImageWidth?: number;
  maxImageHeight?: number;
  generateThumbnail?: boolean;
  thumbnailSizes?: string[];
  storageLocation?: FileStorageLocation;
  accessLevel?: FileAccessLevel;
  retentionPeriod?: number;
}

export interface ThumbnailConfig {
  size: keyof typeof IMAGE_THUMBNAIL_SIZES;
  width: number;
  height: number;
  quality: number;
  format: string;
}

/**
 * অ্যাটাচমেন্ট কনফিগারেশন
 */
export const ATTACHMENT_CONFIG = {
  idPrefix: ATTACHMENT_ID_PREFIX,
  numberFormat: ATTACHMENT_NUMBER_FORMAT,
  maxFileSize: MAX_FILE_SIZE_BYTES,
  maxFileSizeMB: MAX_FILE_SIZE_MB,
  supportedFormats: SUPPORTED_FILE_FORMATS,
  supportedMimeTypes: SUPPORTED_MIME_TYPES,
  storageLocations: FILE_STORAGE_LOCATIONS,
  retentionPeriods: FILE_RETENTION_PERIODS,
  defaultQuality: DEFAULT_FILE_QUALITY,
  thumbnailSizes: IMAGE_THUMBNAIL_SIZES,
  accessLevels: FILE_ACCESS_LEVELS,
  validationRules: ATTACHMENT_VALIDATION_RULES,
  metadataFields: FILE_METADATA_FIELDS,
} as const;

/**
 * ডিফল্ট থাম্বনেইল কনফিগারেশন
 */
export const DEFAULT_THUMBNAIL_CONFIGS: ThumbnailConfig[] = [
  {
    size: 'SMALL',
    width: IMAGE_THUMBNAIL_SIZES.SMALL.width,
    height: IMAGE_THUMBNAIL_SIZES.SMALL.height,
    quality: 80,
    format: 'jpeg',
  },
  {
    size: 'MEDIUM',
    width: IMAGE_THUMBNAIL_SIZES.MEDIUM.width,
    height: IMAGE_THUMBNAIL_SIZES.MEDIUM.height,
    quality: 85,
    format: 'jpeg',
  },
  {
    size: 'LARGE',
    width: IMAGE_THUMBNAIL_SIZES.LARGE.width,
    height: IMAGE_THUMBNAIL_SIZES.LARGE.height,
    quality: 90,
    format: 'jpeg',
  },
] as const;

/**
 * ফাইল টাইপ ক্যাটাগরি ডিটেকশন
 */
export const FILE_TYPE_DETECTION = {
  [FILE_TYPE_CATEGORIES.IMAGE]: SUPPORTED_FILE_FORMATS.IMAGE,
  [FILE_TYPE_CATEGORIES.DOCUMENT]: SUPPORTED_FILE_FORMATS.DOCUMENT,
  [FILE_TYPE_CATEGORIES.TEXT]: SUPPORTED_FILE_FORMATS.TEXT,
  [FILE_TYPE_CATEGORIES.ARCHIVE]: SUPPORTED_FILE_FORMATS.ARCHIVE,
  [FILE_TYPE_CATEGORIES.AUDIO]: SUPPORTED_FILE_FORMATS.AUDIO,
  [FILE_TYPE_CATEGORIES.VIDEO]: SUPPORTED_FILE_FORMATS.VIDEO,
  [FILE_TYPE_CATEGORIES.CODE]: SUPPORTED_FILE_FORMATS.CODE,
  [FILE_TYPE_CATEGORIES.OTHER]: SUPPORTED_FILE_FORMATS.OTHER,
} as const;

/**
 * অ্যাটাচমেন্ট ইভেন্ট টাইপ
 */
export const ATTACHMENT_EVENT_TYPES = {
  UPLOADED: 'attachment_uploaded',
  PROCESSED: 'attachment_processed',
  VIEWED: 'attachment_viewed',
  DOWNLOADED: 'attachment_downloaded',
  DELETED: 'attachment_deleted',
  EXPIRED: 'attachment_expired',
  SHARED: 'attachment_shared',
} as const;

export type AttachmentEventType =
  (typeof ATTACHMENT_EVENT_TYPES)[keyof typeof ATTACHMENT_EVENT_TYPES];

/**
 * অ্যাটাচমেন্ট ফিল্টার অপশন
 */
export const ATTACHMENT_FILTER_OPTIONS = {
  TYPE: 'type',
  CATEGORY: 'category',
  STATUS: 'status',
  DATE_RANGE: 'date_range',
  SIZE_RANGE: 'size_range',
  UPLOADED_BY: 'uploaded_by',
  SEARCH: 'search',
} as const;

export type AttachmentFilterOption =
  (typeof ATTACHMENT_FILTER_OPTIONS)[keyof typeof ATTACHMENT_FILTER_OPTIONS];

/**
 * অ্যাটাচমেন্ট সর্ট অপশন
 */
export const ATTACHMENT_SORT_OPTIONS = {
  UPLOADED_AT: 'uploadedAt',
  FILE_SIZE: 'fileSize',
  FILE_NAME: 'fileName',
  TYPE: 'type',
  STATUS: 'status',
} as const;

export type AttachmentSortOption =
  (typeof ATTACHMENT_SORT_OPTIONS)[keyof typeof ATTACHMENT_SORT_OPTIONS];
