/**
 * Media Size Constants
 * Size specifications for media files and dimensions
 */

export const CONTENT_MEDIA_SIZE = {
  // Size Categories
  CATEGORIES: {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XLARGE: 'xlarge',
    XXLARGE: 'xxlarge',
    ORIGINAL: 'original',
  } as const,

  // Dimensions (in pixels)
  DIMENSIONS: {
    TINY: { width: 50, height: 50 },
    SMALL: { width: 150, height: 150 },
    MEDIUM: { width: 300, height: 300 },
    LARGE: { width: 600, height: 600 },
    XLARGE: { width: 1200, height: 1200 },
    XXLARGE: { width: 2000, height: 2000 },
    ORIGINAL: { width: 0, height: 0 },
  } as const,

  // Image Sizes
  IMAGE_SIZES: {
    THUMBNAIL: { width: 150, height: 150 },
    SMALL: { width: 300, height: 300 },
    MEDIUM: { width: 600, height: 600 },
    LARGE: { width: 1200, height: 1200 },
    FULL: { width: 1920, height: 1080 },
    ORIGINAL: { width: 0, height: 0 },
  } as const,

  // Video Sizes
  VIDEO_SIZES: {
    SD: { width: 640, height: 480 },
    HD: { width: 1280, height: 720 },
    FHD: { width: 1920, height: 1080 },
    QHD: { width: 2560, height: 1440 },
    UHD: { width: 3840, height: 2160 },
    ORIGINAL: { width: 0, height: 0 },
  } as const,

  // File Size Limits
  FILE_LIMITS: {
    // Images
    IMAGE_TINY: 50 * 1024, // 50KB
    IMAGE_SMALL: 200 * 1024, // 200KB
    IMAGE_MEDIUM: 500 * 1024, // 500KB
    IMAGE_LARGE: 2 * 1024 * 1024, // 2MB
    IMAGE_XLARGE: 5 * 1024 * 1024, // 5MB
    IMAGE_XXLARGE: 10 * 1024 * 1024, // 10MB

    // Videos
    VIDEO_SD: 50 * 1024 * 1024, // 50MB
    VIDEO_HD: 100 * 1024 * 1024, // 100MB
    VIDEO_FHD: 200 * 1024 * 1024, // 200MB
    VIDEO_QHD: 400 * 1024 * 1024, // 400MB
    VIDEO_UHD: 800 * 1024 * 1024, // 800MB

    // Audio
    AUDIO_LOW: 5 * 1024 * 1024, // 5MB
    AUDIO_MEDIUM: 10 * 1024 * 1024, // 10MB
    AUDIO_HIGH: 20 * 1024 * 1024, // 20MB
    AUDIO_LOSSLESS: 50 * 1024 * 1024, // 50MB

    // Documents
    DOCUMENT_SMALL: 1 * 1024 * 1024, // 1MB
    DOCUMENT_MEDIUM: 5 * 1024 * 1024, // 5MB
    DOCUMENT_LARGE: 10 * 1024 * 1024, // 10MB
    DOCUMENT_XLARGE: 25 * 1024 * 1024, // 25MB
  } as const,

  // Width Limits
  WIDTH_LIMITS: {
    TINY: 50,
    SMALL: 150,
    MEDIUM: 300,
    LARGE: 600,
    XLARGE: 1200,
    XXLARGE: 2000,
    MAX: 4096,
  } as const,

  // Height Limits
  HEIGHT_LIMITS: {
    TINY: 50,
    SMALL: 150,
    MEDIUM: 300,
    LARGE: 600,
    XLARGE: 1200,
    XXLARGE: 2000,
    MAX: 4096,
  } as const,

  // Aspect Ratios
  ASPECT_RATIOS: {
    SQUARE: 'square',
    LANDSCAPE: 'landscape',
    PORTRAIT: 'portrait',
    GOLDEN: 'golden',
    STANDARD: 'standard',
    WIDE: 'wide',
    ULTRAWIDE: 'ultrawide',
  } as const,

  // Aspect Ratio Values
  ASPECT_RATIO_VALUES: {
    SQUARE: { width: 1, height: 1 },
    LANDSCAPE: { width: 16, height: 9 },
    PORTRAIT: { width: 9, height: 16 },
    GOLDEN: { width: 1.618, height: 1 },
    STANDARD: { width: 4, height: 3 },
    WIDE: { width: 16, height: 10 },
    ULTRAWIDE: { width: 21, height: 9 },
  } as const,

  // Aspect Ratio Labels
  ASPECT_RATIO_LABELS: {
    SQUARE: '1:1 (Square)',
    LANDSCAPE: '16:9 (Landscape)',
    PORTRAIT: '9:16 (Portrait)',
    GOLDEN: '1.618:1 (Golden)',
    STANDARD: '4:3 (Standard)',
    WIDE: '16:10 (Wide)',
    ULTRAWIDE: '21:9 (Ultrawide)',
  } as const,

  // Megapixel Categories
  MEGAPIXELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
    ULTRA: 'ultra',
  } as const,
} as const;

// Size Categories
export type ContentMediaSizeCategory =
  (typeof CONTENT_MEDIA_SIZE.CATEGORIES)[keyof typeof CONTENT_MEDIA_SIZE.CATEGORIES];

// Dimensions
export type ContentMediaSizeDimension =
  (typeof CONTENT_MEDIA_SIZE.DIMENSIONS)[keyof typeof CONTENT_MEDIA_SIZE.DIMENSIONS];

// Image Sizes
export type ContentMediaImageSize =
  (typeof CONTENT_MEDIA_SIZE.IMAGE_SIZES)[keyof typeof CONTENT_MEDIA_SIZE.IMAGE_SIZES];

// Video Sizes
export type ContentMediaVideoSize =
  (typeof CONTENT_MEDIA_SIZE.VIDEO_SIZES)[keyof typeof CONTENT_MEDIA_SIZE.VIDEO_SIZES];

// Aspect Ratios
export type ContentMediaAspectRatio =
  (typeof CONTENT_MEDIA_SIZE.ASPECT_RATIOS)[keyof typeof CONTENT_MEDIA_SIZE.ASPECT_RATIOS];

// Aspect Ratio Values
export type ContentMediaAspectRatioValue =
  (typeof CONTENT_MEDIA_SIZE.ASPECT_RATIO_VALUES)[keyof typeof CONTENT_MEDIA_SIZE.ASPECT_RATIO_VALUES];

// Megapixel Categories
export type ContentMediaMegapixel =
  (typeof CONTENT_MEDIA_SIZE.MEGAPIXELS)[keyof typeof CONTENT_MEDIA_SIZE.MEGAPIXELS];

// Utility Functions
export function contentMediaSizeGetCategoryLabel(category: ContentMediaSizeCategory): string {
  const labels: Record<ContentMediaSizeCategory, string> = {
    [CONTENT_MEDIA_SIZE.CATEGORIES.TINY]: 'Tiny',
    [CONTENT_MEDIA_SIZE.CATEGORIES.SMALL]: 'Small',
    [CONTENT_MEDIA_SIZE.CATEGORIES.MEDIUM]: 'Medium',
    [CONTENT_MEDIA_SIZE.CATEGORIES.LARGE]: 'Large',
    [CONTENT_MEDIA_SIZE.CATEGORIES.XLARGE]: 'X-Large',
    [CONTENT_MEDIA_SIZE.CATEGORIES.XXLARGE]: 'XX-Large',
    [CONTENT_MEDIA_SIZE.CATEGORIES.ORIGINAL]: 'Original',
  };
  return labels[category] || 'Unknown Category';
}

export function contentMediaSizeGetDimension(
  category: ContentMediaSizeCategory
): ContentMediaSizeDimension {
  const dimMap: Record<ContentMediaSizeCategory, ContentMediaSizeDimension> = {
    [CONTENT_MEDIA_SIZE.CATEGORIES.TINY]: CONTENT_MEDIA_SIZE.DIMENSIONS.TINY,
    [CONTENT_MEDIA_SIZE.CATEGORIES.SMALL]: CONTENT_MEDIA_SIZE.DIMENSIONS.SMALL,
    [CONTENT_MEDIA_SIZE.CATEGORIES.MEDIUM]: CONTENT_MEDIA_SIZE.DIMENSIONS.MEDIUM,
    [CONTENT_MEDIA_SIZE.CATEGORIES.LARGE]: CONTENT_MEDIA_SIZE.DIMENSIONS.LARGE,
    [CONTENT_MEDIA_SIZE.CATEGORIES.XLARGE]: CONTENT_MEDIA_SIZE.DIMENSIONS.XLARGE,
    [CONTENT_MEDIA_SIZE.CATEGORIES.XXLARGE]: CONTENT_MEDIA_SIZE.DIMENSIONS.XXLARGE,
    [CONTENT_MEDIA_SIZE.CATEGORIES.ORIGINAL]: CONTENT_MEDIA_SIZE.DIMENSIONS.ORIGINAL,
  };
  return dimMap[category] || CONTENT_MEDIA_SIZE.DIMENSIONS.MEDIUM;
}

export function contentMediaSizeGetImageSize(size: string): ContentMediaImageSize {
  const sizeMap: Record<string, ContentMediaImageSize> = {
    thumbnail: CONTENT_MEDIA_SIZE.IMAGE_SIZES.THUMBNAIL,
    small: CONTENT_MEDIA_SIZE.IMAGE_SIZES.SMALL,
    medium: CONTENT_MEDIA_SIZE.IMAGE_SIZES.MEDIUM,
    large: CONTENT_MEDIA_SIZE.IMAGE_SIZES.LARGE,
    full: CONTENT_MEDIA_SIZE.IMAGE_SIZES.FULL,
    original: CONTENT_MEDIA_SIZE.IMAGE_SIZES.ORIGINAL,
  };
  return sizeMap[size] || CONTENT_MEDIA_SIZE.IMAGE_SIZES.MEDIUM;
}

export function contentMediaSizeGetVideoSize(size: string): ContentMediaVideoSize {
  const sizeMap: Record<string, ContentMediaVideoSize> = {
    sd: CONTENT_MEDIA_SIZE.VIDEO_SIZES.SD,
    hd: CONTENT_MEDIA_SIZE.VIDEO_SIZES.HD,
    fhd: CONTENT_MEDIA_SIZE.VIDEO_SIZES.FHD,
    qhd: CONTENT_MEDIA_SIZE.VIDEO_SIZES.QHD,
    uhd: CONTENT_MEDIA_SIZE.VIDEO_SIZES.UHD,
    original: CONTENT_MEDIA_SIZE.VIDEO_SIZES.ORIGINAL,
  };
  return sizeMap[size] || CONTENT_MEDIA_SIZE.VIDEO_SIZES.HD;
}

export function contentMediaSizeGetFileLimit(type: string, size: string): number {
  const limitMap: Record<string, Record<string, number>> = {
    image: {
      tiny: CONTENT_MEDIA_SIZE.FILE_LIMITS.IMAGE_TINY,
      small: CONTENT_MEDIA_SIZE.FILE_LIMITS.IMAGE_SMALL,
      medium: CONTENT_MEDIA_SIZE.FILE_LIMITS.IMAGE_MEDIUM,
      large: CONTENT_MEDIA_SIZE.FILE_LIMITS.IMAGE_LARGE,
      xlarge: CONTENT_MEDIA_SIZE.FILE_LIMITS.IMAGE_XLARGE,
      xxlarge: CONTENT_MEDIA_SIZE.FILE_LIMITS.IMAGE_XXLARGE,
    },
    video: {
      sd: CONTENT_MEDIA_SIZE.FILE_LIMITS.VIDEO_SD,
      hd: CONTENT_MEDIA_SIZE.FILE_LIMITS.VIDEO_HD,
      fhd: CONTENT_MEDIA_SIZE.FILE_LIMITS.VIDEO_FHD,
      qhd: CONTENT_MEDIA_SIZE.FILE_LIMITS.VIDEO_QHD,
      uhd: CONTENT_MEDIA_SIZE.FILE_LIMITS.VIDEO_UHD,
    },
    audio: {
      low: CONTENT_MEDIA_SIZE.FILE_LIMITS.AUDIO_LOW,
      medium: CONTENT_MEDIA_SIZE.FILE_LIMITS.AUDIO_MEDIUM,
      high: CONTENT_MEDIA_SIZE.FILE_LIMITS.AUDIO_HIGH,
      lossless: CONTENT_MEDIA_SIZE.FILE_LIMITS.AUDIO_LOSSLESS,
    },
    document: {
      small: CONTENT_MEDIA_SIZE.FILE_LIMITS.DOCUMENT_SMALL,
      medium: CONTENT_MEDIA_SIZE.FILE_LIMITS.DOCUMENT_MEDIUM,
      large: CONTENT_MEDIA_SIZE.FILE_LIMITS.DOCUMENT_LARGE,
      xlarge: CONTENT_MEDIA_SIZE.FILE_LIMITS.DOCUMENT_XLARGE,
    },
  };

  return limitMap[type]?.[size] || 0;
}

export function contentMediaSizeGetAspectRatioLabel(ratio: ContentMediaAspectRatio): string {
  const labels: Record<ContentMediaAspectRatio, string> = {
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.SQUARE]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_LABELS.SQUARE,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.LANDSCAPE]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_LABELS.LANDSCAPE,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.PORTRAIT]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_LABELS.PORTRAIT,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.GOLDEN]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_LABELS.GOLDEN,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.STANDARD]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_LABELS.STANDARD,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.WIDE]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_LABELS.WIDE,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.ULTRAWIDE]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_LABELS.ULTRAWIDE,
  };
  return labels[ratio] || 'Unknown Aspect Ratio';
}

export function contentMediaSizeGetAspectRatioValue(
  ratio: ContentMediaAspectRatio
): ContentMediaAspectRatioValue {
  const valueMap: Record<ContentMediaAspectRatio, ContentMediaAspectRatioValue> = {
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.SQUARE]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_VALUES.SQUARE,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.LANDSCAPE]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_VALUES.LANDSCAPE,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.PORTRAIT]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_VALUES.PORTRAIT,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.GOLDEN]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_VALUES.GOLDEN,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.STANDARD]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_VALUES.STANDARD,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.WIDE]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_VALUES.WIDE,
    [CONTENT_MEDIA_SIZE.ASPECT_RATIOS.ULTRAWIDE]: CONTENT_MEDIA_SIZE.ASPECT_RATIO_VALUES.ULTRAWIDE,
  };
  return valueMap[ratio] || CONTENT_MEDIA_SIZE.ASPECT_RATIO_VALUES.STANDARD;
}

export function contentMediaSizeGetMegapixelLabel(megapixel: ContentMediaMegapixel): string {
  const labels: Record<ContentMediaMegapixel, string> = {
    [CONTENT_MEDIA_SIZE.MEGAPIXELS.LOW]: 'Low (< 5MP)',
    [CONTENT_MEDIA_SIZE.MEGAPIXELS.MEDIUM]: 'Medium (5-12MP)',
    [CONTENT_MEDIA_SIZE.MEGAPIXELS.HIGH]: 'High (12-24MP)',
    [CONTENT_MEDIA_SIZE.MEGAPIXELS.VERY_HIGH]: 'Very High (24-50MP)',
    [CONTENT_MEDIA_SIZE.MEGAPIXELS.ULTRA]: 'Ultra (> 50MP)',
  };
  return labels[megapixel] || 'Unknown Megapixel';
}

export function contentMediaSizeGetMegapixel(width: number, height: number): ContentMediaMegapixel {
  const mp = (width * height) / 1000000;
  if (mp < 5) return CONTENT_MEDIA_SIZE.MEGAPIXELS.LOW;
  if (mp < 12) return CONTENT_MEDIA_SIZE.MEGAPIXELS.MEDIUM;
  if (mp < 24) return CONTENT_MEDIA_SIZE.MEGAPIXELS.HIGH;
  if (mp < 50) return CONTENT_MEDIA_SIZE.MEGAPIXELS.VERY_HIGH;
  return CONTENT_MEDIA_SIZE.MEGAPIXELS.ULTRA;
}

export function contentMediaSizeIsValidCategory(
  category: string
): category is ContentMediaSizeCategory {
  return Object.values(CONTENT_MEDIA_SIZE.CATEGORIES).includes(
    category as ContentMediaSizeCategory
  );
}

export function contentMediaSizeGetMaxWidth(): number {
  return CONTENT_MEDIA_SIZE.WIDTH_LIMITS.MAX;
}

export function contentMediaSizeGetMaxHeight(): number {
  return CONTENT_MEDIA_SIZE.HEIGHT_LIMITS.MAX;
}
