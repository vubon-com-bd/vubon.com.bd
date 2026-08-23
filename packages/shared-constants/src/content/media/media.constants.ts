/**
 * Media Constants
 * Configuration for media files, uploads, and management
 */

export const CONTENT_MEDIA = {
  // Media Types
  TYPES: {
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    DOCUMENT: 'document',
    ARCHIVE: 'archive',
    OTHER: 'other',
  } as const,

  // Media Statuses
  STATUSES: {
    UPLOADING: 'uploading',
    PROCESSING: 'processing',
    READY: 'ready',
    FAILED: 'failed',
    DELETED: 'deleted',
    ARCHIVED: 'archived',
  } as const,

  // Media Formats
  FORMATS: {
    // Image Formats
    JPEG: 'jpeg',
    PNG: 'png',
    GIF: 'gif',
    WEBP: 'webp',
    SVG: 'svg',
    BMP: 'bmp',
    TIFF: 'tiff',
    ICO: 'ico',
    AVIF: 'avif',

    // Video Formats
    MP4: 'mp4',
    WEBM: 'webm',
    AVI: 'avi',
    MOV: 'mov',
    MKV: 'mkv',
    FLV: 'flv',
    WMV: 'wmv',
    MPEG: 'mpeg',

    // Audio Formats
    MP3: 'mp3',
    WAV: 'wav',
    AAC: 'aac',
    OGG: 'ogg',
    FLAC: 'flac',
    M4A: 'm4a',
    WMA: 'wma',

    // Document Formats
    PDF: 'pdf',
    DOC: 'doc',
    DOCX: 'docx',
    XLS: 'xls',
    XLSX: 'xlsx',
    PPT: 'ppt',
    PPTX: 'pptx',
    TXT: 'txt',
    CSV: 'csv',
    RTF: 'rtf',
    ODT: 'odt',
    ODS: 'ods',
    ODP: 'odp',

    // Archive Formats
    ZIP: 'zip',
    RAR: 'rar',
    TAR: 'tar',
    GZ: 'gz',
    BZ2: 'bz2',
    SEVEN_Z: '7z',
  } as const,

  // Media MIME Types
  MIME_TYPES: {
    // Images
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    GIF: 'image/gif',
    WEBP: 'image/webp',
    SVG: 'image/svg+xml',
    BMP: 'image/bmp',
    TIFF: 'image/tiff',
    ICO: 'image/x-icon',
    AVIF: 'image/avif',

    // Videos
    MP4: 'video/mp4',
    WEBM: 'video/webm',
    AVI: 'video/x-msvideo',
    MOV: 'video/quicktime',
    MKV: 'video/x-matroska',
    FLV: 'video/x-flv',
    WMV: 'video/x-ms-wmv',
    MPEG: 'video/mpeg',

    // Audio
    MP3: 'audio/mpeg',
    WAV: 'audio/wav',
    AAC: 'audio/aac',
    OGG: 'audio/ogg',
    FLAC: 'audio/flac',
    M4A: 'audio/mp4',
    WMA: 'audio/x-ms-wma',

    // Documents
    PDF: 'application/pdf',
    DOC: 'application/msword',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    XLS: 'application/vnd.ms-excel',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    PPT: 'application/vnd.ms-powerpoint',
    PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    TXT: 'text/plain',
    CSV: 'text/csv',
    RTF: 'application/rtf',
    ODT: 'application/vnd.oasis.opendocument.text',
    ODS: 'application/vnd.oasis.opendocument.spreadsheet',
    ODP: 'application/vnd.oasis.opendocument.presentation',

    // Archives
    ZIP: 'application/zip',
    RAR: 'application/x-rar-compressed',
    TAR: 'application/x-tar',
    GZ: 'application/gzip',
    BZ2: 'application/x-bzip2',
    SEVEN_Z: 'application/x-7z-compressed',
  } as const,

  // Media Size Categories
  SIZE_CATEGORIES: {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XLARGE: 'xlarge',
    XXLARGE: 'xxlarge',
  } as const,

  // Media Dimensions
  DIMENSIONS: {
    TINY: { width: 50, height: 50 },
    SMALL: { width: 150, height: 150 },
    MEDIUM: { width: 300, height: 300 },
    LARGE: { width: 600, height: 600 },
    XLARGE: { width: 1200, height: 1200 },
    XXLARGE: { width: 2000, height: 2000 },
  } as const,

  // Media Size Limits (in bytes)
  SIZE_LIMITS: {
    IMAGE: 5 * 1024 * 1024, // 5MB
    VIDEO: 100 * 1024 * 1024, // 100MB
    AUDIO: 50 * 1024 * 1024, // 50MB
    DOCUMENT: 10 * 1024 * 1024, // 10MB
    ARCHIVE: 50 * 1024 * 1024, // 50MB
    OTHER: 10 * 1024 * 1024, // 10MB
  } as const,

  // Media Defaults
  DEFAULTS: {
    QUALITY: 80,
    MAX_WIDTH: 1920,
    MAX_HEIGHT: 1080,
    THUMBNAIL_WIDTH: 150,
    THUMBNAIL_HEIGHT: 150,
  } as const,

  // Media Limits
  LIMITS: {
    MAX_FILENAME_LENGTH: 255,
    MAX_FILE_SIZE_GB: 1,
    MAX_UPLOAD_BATCH: 20,
    MAX_IMAGES_PER_GALLERY: 100,
  } as const,
} as const;

// Media Types
export type ContentMediaType = (typeof CONTENT_MEDIA.TYPES)[keyof typeof CONTENT_MEDIA.TYPES];

// Media Statuses
export type ContentMediaStatus =
  (typeof CONTENT_MEDIA.STATUSES)[keyof typeof CONTENT_MEDIA.STATUSES];

// Media Formats
export type ContentMediaFormat = (typeof CONTENT_MEDIA.FORMATS)[keyof typeof CONTENT_MEDIA.FORMATS];

// Media MIME Types
export type ContentMediaMimeType =
  (typeof CONTENT_MEDIA.MIME_TYPES)[keyof typeof CONTENT_MEDIA.MIME_TYPES];

// Media Size Categories
export type ContentMediaSizeCategory =
  (typeof CONTENT_MEDIA.SIZE_CATEGORIES)[keyof typeof CONTENT_MEDIA.SIZE_CATEGORIES];

// Media Dimensions
export type ContentMediaDimension =
  (typeof CONTENT_MEDIA.DIMENSIONS)[keyof typeof CONTENT_MEDIA.DIMENSIONS];

// Utility Functions
export function contentMediaGetTypeLabel(type: ContentMediaType): string {
  const labels: Record<ContentMediaType, string> = {
    [CONTENT_MEDIA.TYPES.IMAGE]: 'Image',
    [CONTENT_MEDIA.TYPES.VIDEO]: 'Video',
    [CONTENT_MEDIA.TYPES.AUDIO]: 'Audio',
    [CONTENT_MEDIA.TYPES.DOCUMENT]: 'Document',
    [CONTENT_MEDIA.TYPES.ARCHIVE]: 'Archive',
    [CONTENT_MEDIA.TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown Media Type';
}

export function contentMediaGetStatusLabel(status: ContentMediaStatus): string {
  const labels: Record<ContentMediaStatus, string> = {
    [CONTENT_MEDIA.STATUSES.UPLOADING]: 'Uploading',
    [CONTENT_MEDIA.STATUSES.PROCESSING]: 'Processing',
    [CONTENT_MEDIA.STATUSES.READY]: 'Ready',
    [CONTENT_MEDIA.STATUSES.FAILED]: 'Failed',
    [CONTENT_MEDIA.STATUSES.DELETED]: 'Deleted',
    [CONTENT_MEDIA.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function contentMediaGetFormatLabel(format: ContentMediaFormat): string {
  const labels: Record<ContentMediaFormat, string> = {
    // Images
    [CONTENT_MEDIA.FORMATS.JPEG]: 'JPEG',
    [CONTENT_MEDIA.FORMATS.PNG]: 'PNG',
    [CONTENT_MEDIA.FORMATS.GIF]: 'GIF',
    [CONTENT_MEDIA.FORMATS.WEBP]: 'WebP',
    [CONTENT_MEDIA.FORMATS.SVG]: 'SVG',
    [CONTENT_MEDIA.FORMATS.BMP]: 'BMP',
    [CONTENT_MEDIA.FORMATS.TIFF]: 'TIFF',
    [CONTENT_MEDIA.FORMATS.ICO]: 'ICO',
    [CONTENT_MEDIA.FORMATS.AVIF]: 'AVIF',

    // Videos
    [CONTENT_MEDIA.FORMATS.MP4]: 'MP4',
    [CONTENT_MEDIA.FORMATS.WEBM]: 'WebM',
    [CONTENT_MEDIA.FORMATS.AVI]: 'AVI',
    [CONTENT_MEDIA.FORMATS.MOV]: 'MOV',
    [CONTENT_MEDIA.FORMATS.MKV]: 'MKV',
    [CONTENT_MEDIA.FORMATS.FLV]: 'FLV',
    [CONTENT_MEDIA.FORMATS.WMV]: 'WMV',
    [CONTENT_MEDIA.FORMATS.MPEG]: 'MPEG',

    // Audio
    [CONTENT_MEDIA.FORMATS.MP3]: 'MP3',
    [CONTENT_MEDIA.FORMATS.WAV]: 'WAV',
    [CONTENT_MEDIA.FORMATS.AAC]: 'AAC',
    [CONTENT_MEDIA.FORMATS.OGG]: 'OGG',
    [CONTENT_MEDIA.FORMATS.FLAC]: 'FLAC',
    [CONTENT_MEDIA.FORMATS.M4A]: 'M4A',
    [CONTENT_MEDIA.FORMATS.WMA]: 'WMA',

    // Documents
    [CONTENT_MEDIA.FORMATS.PDF]: 'PDF',
    [CONTENT_MEDIA.FORMATS.DOC]: 'DOC',
    [CONTENT_MEDIA.FORMATS.DOCX]: 'DOCX',
    [CONTENT_MEDIA.FORMATS.XLS]: 'XLS',
    [CONTENT_MEDIA.FORMATS.XLSX]: 'XLSX',
    [CONTENT_MEDIA.FORMATS.PPT]: 'PPT',
    [CONTENT_MEDIA.FORMATS.PPTX]: 'PPTX',
    [CONTENT_MEDIA.FORMATS.TXT]: 'TXT',
    [CONTENT_MEDIA.FORMATS.CSV]: 'CSV',
    [CONTENT_MEDIA.FORMATS.RTF]: 'RTF',
    [CONTENT_MEDIA.FORMATS.ODT]: 'ODT',
    [CONTENT_MEDIA.FORMATS.ODS]: 'ODS',
    [CONTENT_MEDIA.FORMATS.ODP]: 'ODP',

    // Archives
    [CONTENT_MEDIA.FORMATS.ZIP]: 'ZIP',
    [CONTENT_MEDIA.FORMATS.RAR]: 'RAR',
    [CONTENT_MEDIA.FORMATS.TAR]: 'TAR',
    [CONTENT_MEDIA.FORMATS.GZ]: 'GZ',
    [CONTENT_MEDIA.FORMATS.BZ2]: 'BZ2',
    [CONTENT_MEDIA.FORMATS.SEVEN_Z]: '7Z',
  };
  return labels[format] || 'Unknown Format';
}

export function contentMediaGetMimeType(format: ContentMediaFormat): ContentMediaMimeType {
  const mimeMap: Record<ContentMediaFormat, ContentMediaMimeType> = {
    // Images
    [CONTENT_MEDIA.FORMATS.JPEG]: CONTENT_MEDIA.MIME_TYPES.JPEG,
    [CONTENT_MEDIA.FORMATS.PNG]: CONTENT_MEDIA.MIME_TYPES.PNG,
    [CONTENT_MEDIA.FORMATS.GIF]: CONTENT_MEDIA.MIME_TYPES.GIF,
    [CONTENT_MEDIA.FORMATS.WEBP]: CONTENT_MEDIA.MIME_TYPES.WEBP,
    [CONTENT_MEDIA.FORMATS.SVG]: CONTENT_MEDIA.MIME_TYPES.SVG,
    [CONTENT_MEDIA.FORMATS.BMP]: CONTENT_MEDIA.MIME_TYPES.BMP,
    [CONTENT_MEDIA.FORMATS.TIFF]: CONTENT_MEDIA.MIME_TYPES.TIFF,
    [CONTENT_MEDIA.FORMATS.ICO]: CONTENT_MEDIA.MIME_TYPES.ICO,
    [CONTENT_MEDIA.FORMATS.AVIF]: CONTENT_MEDIA.MIME_TYPES.AVIF,

    // Videos
    [CONTENT_MEDIA.FORMATS.MP4]: CONTENT_MEDIA.MIME_TYPES.MP4,
    [CONTENT_MEDIA.FORMATS.WEBM]: CONTENT_MEDIA.MIME_TYPES.WEBM,
    [CONTENT_MEDIA.FORMATS.AVI]: CONTENT_MEDIA.MIME_TYPES.AVI,
    [CONTENT_MEDIA.FORMATS.MOV]: CONTENT_MEDIA.MIME_TYPES.MOV,
    [CONTENT_MEDIA.FORMATS.MKV]: CONTENT_MEDIA.MIME_TYPES.MKV,
    [CONTENT_MEDIA.FORMATS.FLV]: CONTENT_MEDIA.MIME_TYPES.FLV,
    [CONTENT_MEDIA.FORMATS.WMV]: CONTENT_MEDIA.MIME_TYPES.WMV,
    [CONTENT_MEDIA.FORMATS.MPEG]: CONTENT_MEDIA.MIME_TYPES.MPEG,

    // Audio
    [CONTENT_MEDIA.FORMATS.MP3]: CONTENT_MEDIA.MIME_TYPES.MP3,
    [CONTENT_MEDIA.FORMATS.WAV]: CONTENT_MEDIA.MIME_TYPES.WAV,
    [CONTENT_MEDIA.FORMATS.AAC]: CONTENT_MEDIA.MIME_TYPES.AAC,
    [CONTENT_MEDIA.FORMATS.OGG]: CONTENT_MEDIA.MIME_TYPES.OGG,
    [CONTENT_MEDIA.FORMATS.FLAC]: CONTENT_MEDIA.MIME_TYPES.FLAC,
    [CONTENT_MEDIA.FORMATS.M4A]: CONTENT_MEDIA.MIME_TYPES.M4A,
    [CONTENT_MEDIA.FORMATS.WMA]: CONTENT_MEDIA.MIME_TYPES.WMA,

    // Documents
    [CONTENT_MEDIA.FORMATS.PDF]: CONTENT_MEDIA.MIME_TYPES.PDF,
    [CONTENT_MEDIA.FORMATS.DOC]: CONTENT_MEDIA.MIME_TYPES.DOC,
    [CONTENT_MEDIA.FORMATS.DOCX]: CONTENT_MEDIA.MIME_TYPES.DOCX,
    [CONTENT_MEDIA.FORMATS.XLS]: CONTENT_MEDIA.MIME_TYPES.XLS,
    [CONTENT_MEDIA.FORMATS.XLSX]: CONTENT_MEDIA.MIME_TYPES.XLSX,
    [CONTENT_MEDIA.FORMATS.PPT]: CONTENT_MEDIA.MIME_TYPES.PPT,
    [CONTENT_MEDIA.FORMATS.PPTX]: CONTENT_MEDIA.MIME_TYPES.PPTX,
    [CONTENT_MEDIA.FORMATS.TXT]: CONTENT_MEDIA.MIME_TYPES.TXT,
    [CONTENT_MEDIA.FORMATS.CSV]: CONTENT_MEDIA.MIME_TYPES.CSV,
    [CONTENT_MEDIA.FORMATS.RTF]: CONTENT_MEDIA.MIME_TYPES.RTF,
    [CONTENT_MEDIA.FORMATS.ODT]: CONTENT_MEDIA.MIME_TYPES.ODT,
    [CONTENT_MEDIA.FORMATS.ODS]: CONTENT_MEDIA.MIME_TYPES.ODS,
    [CONTENT_MEDIA.FORMATS.ODP]: CONTENT_MEDIA.MIME_TYPES.ODP,

    // Archives
    [CONTENT_MEDIA.FORMATS.ZIP]: CONTENT_MEDIA.MIME_TYPES.ZIP,
    [CONTENT_MEDIA.FORMATS.RAR]: CONTENT_MEDIA.MIME_TYPES.RAR,
    [CONTENT_MEDIA.FORMATS.TAR]: CONTENT_MEDIA.MIME_TYPES.TAR,
    [CONTENT_MEDIA.FORMATS.GZ]: CONTENT_MEDIA.MIME_TYPES.GZ,
    [CONTENT_MEDIA.FORMATS.BZ2]: CONTENT_MEDIA.MIME_TYPES.BZ2,
    [CONTENT_MEDIA.FORMATS.SEVEN_Z]: CONTENT_MEDIA.MIME_TYPES.SEVEN_Z,
  };
  return mimeMap[format] || CONTENT_MEDIA.MIME_TYPES.TXT;
}

export function contentMediaGetSizeCategoryLabel(category: ContentMediaSizeCategory): string {
  const labels: Record<ContentMediaSizeCategory, string> = {
    [CONTENT_MEDIA.SIZE_CATEGORIES.TINY]: 'Tiny',
    [CONTENT_MEDIA.SIZE_CATEGORIES.SMALL]: 'Small',
    [CONTENT_MEDIA.SIZE_CATEGORIES.MEDIUM]: 'Medium',
    [CONTENT_MEDIA.SIZE_CATEGORIES.LARGE]: 'Large',
    [CONTENT_MEDIA.SIZE_CATEGORIES.XLARGE]: 'X-Large',
    [CONTENT_MEDIA.SIZE_CATEGORIES.XXLARGE]: 'XX-Large',
  };
  return labels[category] || 'Unknown Size';
}

export function contentMediaGetDimension(
  category: ContentMediaSizeCategory
): ContentMediaDimension {
  const dimMap: Record<ContentMediaSizeCategory, ContentMediaDimension> = {
    [CONTENT_MEDIA.SIZE_CATEGORIES.TINY]: CONTENT_MEDIA.DIMENSIONS.TINY,
    [CONTENT_MEDIA.SIZE_CATEGORIES.SMALL]: CONTENT_MEDIA.DIMENSIONS.SMALL,
    [CONTENT_MEDIA.SIZE_CATEGORIES.MEDIUM]: CONTENT_MEDIA.DIMENSIONS.MEDIUM,
    [CONTENT_MEDIA.SIZE_CATEGORIES.LARGE]: CONTENT_MEDIA.DIMENSIONS.LARGE,
    [CONTENT_MEDIA.SIZE_CATEGORIES.XLARGE]: CONTENT_MEDIA.DIMENSIONS.XLARGE,
    [CONTENT_MEDIA.SIZE_CATEGORIES.XXLARGE]: CONTENT_MEDIA.DIMENSIONS.XXLARGE,
  };
  return dimMap[category] || CONTENT_MEDIA.DIMENSIONS.MEDIUM;
}

export function contentMediaGetSizeLimit(mediaType: ContentMediaType): number {
  const limitMap: Record<ContentMediaType, number> = {
    [CONTENT_MEDIA.TYPES.IMAGE]: CONTENT_MEDIA.SIZE_LIMITS.IMAGE,
    [CONTENT_MEDIA.TYPES.VIDEO]: CONTENT_MEDIA.SIZE_LIMITS.VIDEO,
    [CONTENT_MEDIA.TYPES.AUDIO]: CONTENT_MEDIA.SIZE_LIMITS.AUDIO,
    [CONTENT_MEDIA.TYPES.DOCUMENT]: CONTENT_MEDIA.SIZE_LIMITS.DOCUMENT,
    [CONTENT_MEDIA.TYPES.ARCHIVE]: CONTENT_MEDIA.SIZE_LIMITS.ARCHIVE,
    [CONTENT_MEDIA.TYPES.OTHER]: CONTENT_MEDIA.SIZE_LIMITS.OTHER,
  };
  return limitMap[mediaType] || CONTENT_MEDIA.SIZE_LIMITS.OTHER;
}

export function contentMediaIsImage(format: ContentMediaFormat): boolean {
  const imageFormats: ContentMediaFormat[] = [
    CONTENT_MEDIA.FORMATS.JPEG,
    CONTENT_MEDIA.FORMATS.PNG,
    CONTENT_MEDIA.FORMATS.GIF,
    CONTENT_MEDIA.FORMATS.WEBP,
    CONTENT_MEDIA.FORMATS.SVG,
    CONTENT_MEDIA.FORMATS.BMP,
    CONTENT_MEDIA.FORMATS.TIFF,
    CONTENT_MEDIA.FORMATS.ICO,
    CONTENT_MEDIA.FORMATS.AVIF,
  ];
  return imageFormats.includes(format);
}

export function contentMediaIsVideo(format: ContentMediaFormat): boolean {
  const videoFormats: ContentMediaFormat[] = [
    CONTENT_MEDIA.FORMATS.MP4,
    CONTENT_MEDIA.FORMATS.WEBM,
    CONTENT_MEDIA.FORMATS.AVI,
    CONTENT_MEDIA.FORMATS.MOV,
    CONTENT_MEDIA.FORMATS.MKV,
    CONTENT_MEDIA.FORMATS.FLV,
    CONTENT_MEDIA.FORMATS.WMV,
    CONTENT_MEDIA.FORMATS.MPEG,
  ];
  return videoFormats.includes(format);
}

export function contentMediaIsAudio(format: ContentMediaFormat): boolean {
  const audioFormats: ContentMediaFormat[] = [
    CONTENT_MEDIA.FORMATS.MP3,
    CONTENT_MEDIA.FORMATS.WAV,
    CONTENT_MEDIA.FORMATS.AAC,
    CONTENT_MEDIA.FORMATS.OGG,
    CONTENT_MEDIA.FORMATS.FLAC,
    CONTENT_MEDIA.FORMATS.M4A,
    CONTENT_MEDIA.FORMATS.WMA,
  ];
  return audioFormats.includes(format);
}

export function contentMediaIsDocument(format: ContentMediaFormat): boolean {
  const documentFormats: ContentMediaFormat[] = [
    CONTENT_MEDIA.FORMATS.PDF,
    CONTENT_MEDIA.FORMATS.DOC,
    CONTENT_MEDIA.FORMATS.DOCX,
    CONTENT_MEDIA.FORMATS.XLS,
    CONTENT_MEDIA.FORMATS.XLSX,
    CONTENT_MEDIA.FORMATS.PPT,
    CONTENT_MEDIA.FORMATS.PPTX,
    CONTENT_MEDIA.FORMATS.TXT,
    CONTENT_MEDIA.FORMATS.CSV,
    CONTENT_MEDIA.FORMATS.RTF,
    CONTENT_MEDIA.FORMATS.ODT,
    CONTENT_MEDIA.FORMATS.ODS,
    CONTENT_MEDIA.FORMATS.ODP,
  ];
  return documentFormats.includes(format);
}

export function contentMediaIsArchive(format: ContentMediaFormat): boolean {
  const archiveFormats: ContentMediaFormat[] = [
    CONTENT_MEDIA.FORMATS.ZIP,
    CONTENT_MEDIA.FORMATS.RAR,
    CONTENT_MEDIA.FORMATS.TAR,
    CONTENT_MEDIA.FORMATS.GZ,
    CONTENT_MEDIA.FORMATS.BZ2,
    CONTENT_MEDIA.FORMATS.SEVEN_Z,
  ];
  return archiveFormats.includes(format);
}

export function contentMediaIsValidType(type: string): type is ContentMediaType {
  return Object.values(CONTENT_MEDIA.TYPES).includes(type as ContentMediaType);
}

export function contentMediaIsValidStatus(status: string): status is ContentMediaStatus {
  return Object.values(CONTENT_MEDIA.STATUSES).includes(status as ContentMediaStatus);
}

export function contentMediaIsValidFormat(format: string): format is ContentMediaFormat {
  return Object.values(CONTENT_MEDIA.FORMATS).includes(format as ContentMediaFormat);
}

export function contentMediaGetDefaultQuality(): number {
  return CONTENT_MEDIA.DEFAULTS.QUALITY;
}

export function contentMediaGetDefaultMaxWidth(): number {
  return CONTENT_MEDIA.DEFAULTS.MAX_WIDTH;
}

export function contentMediaGetDefaultMaxHeight(): number {
  return CONTENT_MEDIA.DEFAULTS.MAX_HEIGHT;
}

export function contentMediaGetThumbnailWidth(): number {
  return CONTENT_MEDIA.DEFAULTS.THUMBNAIL_WIDTH;
}

export function contentMediaGetThumbnailHeight(): number {
  return CONTENT_MEDIA.DEFAULTS.THUMBNAIL_HEIGHT;
}

export function contentMediaGetMaxFilenameLength(): number {
  return CONTENT_MEDIA.LIMITS.MAX_FILENAME_LENGTH;
}

export function contentMediaGetMaxFileSizeGB(): number {
  return CONTENT_MEDIA.LIMITS.MAX_FILE_SIZE_GB;
}

export function contentMediaGetMaxUploadBatch(): number {
  return CONTENT_MEDIA.LIMITS.MAX_UPLOAD_BATCH;
}
