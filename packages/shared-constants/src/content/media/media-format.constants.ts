/**
 * Media Format Constants
 * Formats and specifications for media files
 */

export const CONTENT_MEDIA_FORMAT = {
  // Format Categories
  CATEGORIES: {
    RASTER: 'raster',
    VECTOR: 'vector',
    VIDEO: 'video',
    AUDIO: 'audio',
    DOCUMENT: 'document',
    ARCHIVE: 'archive',
  } as const,

  // Image Formats
  IMAGE: {
    JPEG: 'jpeg',
    PNG: 'png',
    GIF: 'gif',
    WEBP: 'webp',
    SVG: 'svg',
    BMP: 'bmp',
    TIFF: 'tiff',
    ICO: 'ico',
    AVIF: 'avif',
    HEIC: 'heic',
    HEIF: 'heif',
  } as const,

  // Video Formats
  VIDEO: {
    MP4: 'mp4',
    WEBM: 'webm',
    AVI: 'avi',
    MOV: 'mov',
    MKV: 'mkv',
    FLV: 'flv',
    WMV: 'wmv',
    MPEG: 'mpeg',
    HLS: 'hls',
    DASH: 'dash',
  } as const,

  // Audio Formats
  AUDIO: {
    MP3: 'mp3',
    WAV: 'wav',
    AAC: 'aac',
    OGG: 'ogg',
    FLAC: 'flac',
    M4A: 'm4a',
    WMA: 'wma',
    OPUS: 'opus',
  } as const,

  // Document Formats
  DOCUMENT: {
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
  } as const,

  // Archive Formats
  ARCHIVE: {
    ZIP: 'zip',
    RAR: 'rar',
    TAR: 'tar',
    GZ: 'gz',
    BZ2: 'bz2',
    SEVEN_Z: '7z',
  } as const,

  // Format Features
  FEATURES: {
    ANIMATION: 'animation',
    ALPHA: 'alpha',
    LOSSY: 'lossy',
    LOSSLESS: 'lossless',
    TRANSPARENCY: 'transparency',
    METADATA: 'metadata',
    EXIF: 'exif',
    ICC_PROFILE: 'icc_profile',
    THUMBNAILS: 'thumbnails',
    STREAMING: 'streaming',
    DRM: 'drm',
  } as const,

  // Format Quality
  QUALITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    ORIGINAL: 'original',
  } as const,
} as const;

// Format Categories
export type ContentMediaFormatCategory =
  (typeof CONTENT_MEDIA_FORMAT.CATEGORIES)[keyof typeof CONTENT_MEDIA_FORMAT.CATEGORIES];

// Image Formats
export type ContentMediaImageFormat =
  (typeof CONTENT_MEDIA_FORMAT.IMAGE)[keyof typeof CONTENT_MEDIA_FORMAT.IMAGE];

// Video Formats
export type ContentMediaVideoFormat =
  (typeof CONTENT_MEDIA_FORMAT.VIDEO)[keyof typeof CONTENT_MEDIA_FORMAT.VIDEO];

// Audio Formats
export type ContentMediaAudioFormat =
  (typeof CONTENT_MEDIA_FORMAT.AUDIO)[keyof typeof CONTENT_MEDIA_FORMAT.AUDIO];

// Document Formats
export type ContentMediaDocumentFormat =
  (typeof CONTENT_MEDIA_FORMAT.DOCUMENT)[keyof typeof CONTENT_MEDIA_FORMAT.DOCUMENT];

// Archive Formats
export type ContentMediaArchiveFormat =
  (typeof CONTENT_MEDIA_FORMAT.ARCHIVE)[keyof typeof CONTENT_MEDIA_FORMAT.ARCHIVE];

// Format Features
export type ContentMediaFormatFeature =
  (typeof CONTENT_MEDIA_FORMAT.FEATURES)[keyof typeof CONTENT_MEDIA_FORMAT.FEATURES];

// Format Quality
export type ContentMediaFormatQuality =
  (typeof CONTENT_MEDIA_FORMAT.QUALITY)[keyof typeof CONTENT_MEDIA_FORMAT.QUALITY];

// Utility Functions
export function contentMediaFormatGetCategoryLabel(category: ContentMediaFormatCategory): string {
  const labels: Record<ContentMediaFormatCategory, string> = {
    [CONTENT_MEDIA_FORMAT.CATEGORIES.RASTER]: 'Raster Image',
    [CONTENT_MEDIA_FORMAT.CATEGORIES.VECTOR]: 'Vector Image',
    [CONTENT_MEDIA_FORMAT.CATEGORIES.VIDEO]: 'Video',
    [CONTENT_MEDIA_FORMAT.CATEGORIES.AUDIO]: 'Audio',
    [CONTENT_MEDIA_FORMAT.CATEGORIES.DOCUMENT]: 'Document',
    [CONTENT_MEDIA_FORMAT.CATEGORIES.ARCHIVE]: 'Archive',
  };
  return labels[category] || 'Unknown Category';
}

export function contentMediaFormatGetFeatureLabel(feature: ContentMediaFormatFeature): string {
  const labels: Record<ContentMediaFormatFeature, string> = {
    [CONTENT_MEDIA_FORMAT.FEATURES.ANIMATION]: 'Animation',
    [CONTENT_MEDIA_FORMAT.FEATURES.ALPHA]: 'Alpha Channel',
    [CONTENT_MEDIA_FORMAT.FEATURES.LOSSY]: 'Lossy Compression',
    [CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS]: 'Lossless Compression',
    [CONTENT_MEDIA_FORMAT.FEATURES.TRANSPARENCY]: 'Transparency',
    [CONTENT_MEDIA_FORMAT.FEATURES.METADATA]: 'Metadata',
    [CONTENT_MEDIA_FORMAT.FEATURES.EXIF]: 'EXIF Data',
    [CONTENT_MEDIA_FORMAT.FEATURES.ICC_PROFILE]: 'ICC Profile',
    [CONTENT_MEDIA_FORMAT.FEATURES.THUMBNAILS]: 'Thumbnails',
    [CONTENT_MEDIA_FORMAT.FEATURES.STREAMING]: 'Streaming',
    [CONTENT_MEDIA_FORMAT.FEATURES.DRM]: 'DRM Protection',
  };
  return labels[feature] || 'Unknown Feature';
}

export function contentMediaFormatGetQualityLabel(quality: ContentMediaFormatQuality): string {
  const labels: Record<ContentMediaFormatQuality, string> = {
    [CONTENT_MEDIA_FORMAT.QUALITY.LOW]: 'Low',
    [CONTENT_MEDIA_FORMAT.QUALITY.MEDIUM]: 'Medium',
    [CONTENT_MEDIA_FORMAT.QUALITY.HIGH]: 'High',
    [CONTENT_MEDIA_FORMAT.QUALITY.ORIGINAL]: 'Original',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentMediaFormatHasFeature(
  format: string,
  feature: ContentMediaFormatFeature
): boolean {
  const featureMap: Record<string, ContentMediaFormatFeature[]> = {
    // Image Features
    [CONTENT_MEDIA_FORMAT.IMAGE.JPEG]: [
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSY,
      CONTENT_MEDIA_FORMAT.FEATURES.EXIF,
    ],
    [CONTENT_MEDIA_FORMAT.IMAGE.PNG]: [
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS,
      CONTENT_MEDIA_FORMAT.FEATURES.TRANSPARENCY,
    ],
    [CONTENT_MEDIA_FORMAT.IMAGE.GIF]: [
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS,
      CONTENT_MEDIA_FORMAT.FEATURES.ANIMATION,
      CONTENT_MEDIA_FORMAT.FEATURES.TRANSPARENCY,
    ],
    [CONTENT_MEDIA_FORMAT.IMAGE.WEBP]: [
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSY,
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS,
      CONTENT_MEDIA_FORMAT.FEATURES.ANIMATION,
      CONTENT_MEDIA_FORMAT.FEATURES.TRANSPARENCY,
    ],
    [CONTENT_MEDIA_FORMAT.IMAGE.SVG]: [
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS,
      CONTENT_MEDIA_FORMAT.FEATURES.TRANSPARENCY,
      CONTENT_MEDIA_FORMAT.FEATURES.ANIMATION,
    ],
    [CONTENT_MEDIA_FORMAT.IMAGE.AVIF]: [
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSY,
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS,
      CONTENT_MEDIA_FORMAT.FEATURES.TRANSPARENCY,
    ],
    [CONTENT_MEDIA_FORMAT.IMAGE.HEIC]: [
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSY,
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS,
      CONTENT_MEDIA_FORMAT.FEATURES.TRANSPARENCY,
    ],
    [CONTENT_MEDIA_FORMAT.IMAGE.TIFF]: [
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS,
      CONTENT_MEDIA_FORMAT.FEATURES.ICC_PROFILE,
    ],
    [CONTENT_MEDIA_FORMAT.IMAGE.BMP]: [CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS],

    // Video Features
    [CONTENT_MEDIA_FORMAT.VIDEO.MP4]: [
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSY,
      CONTENT_MEDIA_FORMAT.FEATURES.STREAMING,
    ],
    [CONTENT_MEDIA_FORMAT.VIDEO.WEBM]: [
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSY,
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS,
      CONTENT_MEDIA_FORMAT.FEATURES.STREAMING,
    ],
    [CONTENT_MEDIA_FORMAT.VIDEO.HLS]: [CONTENT_MEDIA_FORMAT.FEATURES.STREAMING],
    [CONTENT_MEDIA_FORMAT.VIDEO.DASH]: [CONTENT_MEDIA_FORMAT.FEATURES.STREAMING],

    // Audio Features
    [CONTENT_MEDIA_FORMAT.AUDIO.MP3]: [CONTENT_MEDIA_FORMAT.FEATURES.LOSSY],
    [CONTENT_MEDIA_FORMAT.AUDIO.FLAC]: [CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS],
    [CONTENT_MEDIA_FORMAT.AUDIO.OGG]: [
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSY,
      CONTENT_MEDIA_FORMAT.FEATURES.LOSSLESS,
    ],
  };

  const features = featureMap[format] || [];
  return features.includes(feature);
}

export function contentMediaFormatIsImageFormat(format: string): format is ContentMediaImageFormat {
  return Object.values(CONTENT_MEDIA_FORMAT.IMAGE).includes(format as ContentMediaImageFormat);
}

export function contentMediaFormatIsVideoFormat(format: string): format is ContentMediaVideoFormat {
  return Object.values(CONTENT_MEDIA_FORMAT.VIDEO).includes(format as ContentMediaVideoFormat);
}

export function contentMediaFormatIsAudioFormat(format: string): format is ContentMediaAudioFormat {
  return Object.values(CONTENT_MEDIA_FORMAT.AUDIO).includes(format as ContentMediaAudioFormat);
}

export function contentMediaFormatIsDocumentFormat(
  format: string
): format is ContentMediaDocumentFormat {
  return Object.values(CONTENT_MEDIA_FORMAT.DOCUMENT).includes(
    format as ContentMediaDocumentFormat
  );
}

export function contentMediaFormatIsArchiveFormat(
  format: string
): format is ContentMediaArchiveFormat {
  return Object.values(CONTENT_MEDIA_FORMAT.ARCHIVE).includes(format as ContentMediaArchiveFormat);
}
