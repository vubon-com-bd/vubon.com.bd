/**
 * Image Constants
 * @module shared-constants/common/image.constants
 */

export const IMAGE = {
  // Image formats
  FORMATS: {
    JPEG: 'jpeg',
    PNG: 'png',
    GIF: 'gif',
    WEBP: 'webp',
    SVG: 'svg',
    BMP: 'bmp',
    ICO: 'ico',
    TIFF: 'tiff',
    AVIF: 'avif',
  } as const,

  // Image extensions
  EXTENSIONS: {
    JPEG: ['jpg', 'jpeg'],
    PNG: ['png'],
    GIF: ['gif'],
    WEBP: ['webp'],
    SVG: ['svg'],
    BMP: ['bmp'],
    ICO: ['ico'],
    TIFF: ['tiff', 'tif'],
    AVIF: ['avif'],
  } as const,

  // MIME types
  MIME_TYPES: {
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    GIF: 'image/gif',
    WEBP: 'image/webp',
    SVG: 'image/svg+xml',
    BMP: 'image/bmp',
    ICO: 'image/x-icon',
    TIFF: 'image/tiff',
    AVIF: 'image/avif',
  } as const,

  // Image sizes
  SIZES: {
    THUMBNAIL: { width: 150, height: 150, label: 'Thumbnail' },
    SMALL: { width: 300, height: 300, label: 'Small' },
    MEDIUM: { width: 600, height: 600, label: 'Medium' },
    LARGE: { width: 1200, height: 1200, label: 'Large' },
    XLARGE: { width: 1920, height: 1920, label: 'X-Large' },
  } as const,

  // Image quality
  QUALITY: {
    LOW: 30,
    MEDIUM: 60,
    HIGH: 80,
    VERY_HIGH: 90,
    MAXIMUM: 100,
  } as const,

  // Image optimization
  OPTIMIZATION: {
    ENABLED: true,
    DEFAULT_QUALITY: 80,
    MAX_WIDTH: 1920,
    MAX_HEIGHT: 1920,
    MIN_WIDTH: 100,
    MIN_HEIGHT: 100,
    RESIZE_MODE: 'cover', // cover, contain, fill, inside, outside
  },

  // Image settings
  SETTINGS: {
    MAX_FILE_SIZE_MB: 5,
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff', 'avif'],
    ALLOWED_MIME_TYPES: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/bmp',
      'image/x-icon',
      'image/tiff',
      'image/avif',
    ],
    MAX_DIMENSION: 8000,
    MIN_DIMENSION: 50,
    ASPECT_RATIO_TOLERANCE: 0.01,
  },

  // Image processing
  PROCESSING: {
    RESIZE: true,
    CROP: true,
    ROTATE: true,
    FLIP: true,
    FILTER: true,
    WATERMARK: true,
    COMPRESS: true,
    OPTIMIZE: true,
    CONVERT: true,
  },

  // Image filters
  FILTERS: {
    GRAYSCALE: 'grayscale',
    SEPIA: 'sepia',
    BRIGHTNESS: 'brightness',
    CONTRAST: 'contrast',
    SATURATE: 'saturate',
    BLUR: 'blur',
    SHARPEN: 'sharpen',
  } as const,

  // Watermark settings
  WATERMARK: {
    POSITIONS: {
      TOP_LEFT: 'top-left',
      TOP_CENTER: 'top-center',
      TOP_RIGHT: 'top-right',
      MIDDLE_LEFT: 'middle-left',
      MIDDLE_CENTER: 'middle-center',
      MIDDLE_RIGHT: 'middle-right',
      BOTTOM_LEFT: 'bottom-left',
      BOTTOM_CENTER: 'bottom-center',
      BOTTOM_RIGHT: 'bottom-right',
    } as const,
    OPACITY: 0.5,
    SIZE: 20, // percentage of image size
    PADDING: 10,
    DEFAULT_POSITION: 'bottom-right',
  },

  // Default values
  DEFAULT: {
    FORMAT: 'jpeg',
    QUALITY: 80,
    SIZE: 'medium',
    RESIZE_MODE: 'cover',
  },
} as const;

export type ImageFormat = (typeof IMAGE.FORMATS)[keyof typeof IMAGE.FORMATS];
export type ImageSize = keyof typeof IMAGE.SIZES;
export type ImageQuality = (typeof IMAGE.QUALITY)[keyof typeof IMAGE.QUALITY];
export type ImageFilter = (typeof IMAGE.FILTERS)[keyof typeof IMAGE.FILTERS];
export type WatermarkPosition =
  (typeof IMAGE.WATERMARK.POSITIONS)[keyof typeof IMAGE.WATERMARK.POSITIONS];
