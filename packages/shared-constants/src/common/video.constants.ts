/**
 * Video Constants
 * @module shared-constants/common/video.constants
 */

export const VIDEO = {
  // Video formats
  FORMATS: {
    MP4: 'mp4',
    WEBM: 'webm',
    OGV: 'ogv',
    MOV: 'mov',
    AVI: 'avi',
    MKV: 'mkv',
    FLV: 'flv',
    WMV: 'wmv',
    M4V: 'm4v',
  } as const,

  // Video codecs
  CODECS: {
    H264: 'h264',
    H265: 'h265',
    VP8: 'vp8',
    VP9: 'vp9',
    AV1: 'av1',
    MPEG4: 'mpeg4',
    THEORA: 'theora',
  } as const,

  // Video resolutions
  RESOLUTIONS: {
    SD: { width: 640, height: 480, label: 'SD' },
    HD: { width: 1280, height: 720, label: 'HD' },
    FULL_HD: { width: 1920, height: 1080, label: 'Full HD' },
    QHD: { width: 2560, height: 1440, label: 'QHD' },
    UHD_4K: { width: 3840, height: 2160, label: '4K UHD' },
    UHD_8K: { width: 7680, height: 4320, label: '8K UHD' },
  } as const,

  // Video aspect ratios
  ASPECT_RATIOS: {
    SQUARE: { width: 1, height: 1, label: '1:1' },
    STANDARD: { width: 4, height: 3, label: '4:3' },
    WIDESCREEN: { width: 16, height: 9, label: '16:9' },
    CINEMA: { width: 21, height: 9, label: '21:9' },
    MOBILE: { width: 9, height: 16, label: '9:16' },
  } as const,

  // Video bitrates (Mbps)
  BITRATES: {
    LOW: 0.5,
    MEDIUM: 1.5,
    HIGH: 4,
    VERY_HIGH: 8,
    ULTRA: 20,
  } as const,

  // Video framerates (fps)
  FRAMERATES: {
    FILM: 24,
    TV: 30,
    TV_EU: 25,
    HIGH: 60,
    VERY_HIGH: 120,
  } as const,

  // Video quality levels
  QUALITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
    ULTRA: 'ultra',
  } as const,

  // Video settings
  SETTINGS: {
    MAX_DURATION: 600, // 10 minutes
    MIN_DURATION: 1,
    MAX_FILE_SIZE_MB: 100,
    ALLOWED_EXTENSIONS: ['mp4', 'webm', 'ogv', 'mov', 'avi', 'mkv', 'flv', 'wmv', 'm4v'],
    ALLOWED_MIME_TYPES: [
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-matroska',
      'video/x-flv',
      'video/x-ms-wmv',
      'video/mp4v-es',
    ],
    DEFAULT_RESOLUTION: 'HD',
    DEFAULT_BITRATE: 1.5,
    DEFAULT_FRAMERATE: 30,
    DEFAULT_ASPECT_RATIO: '16:9',
    DEFAULT_QUALITY: 'high',
  },

  // Video processing
  PROCESSING: {
    GENERATE_THUMBNAILS: true,
    GENERATE_PREVIEW: true,
    TRANSCODE: true,
    OPTIMIZE: true,
    WATERMARK: false,
    RESIZE: false,
  },

  // Thumbnail generation
  THUMBNAIL: {
    COUNT: 5,
    INTERVAL: 5, // seconds
    RESOLUTION: { width: 640, height: 360 },
    FORMAT: 'jpg',
    QUALITY: 80,
  },

  // Default values
  DEFAULT: {
    FORMAT: 'mp4',
    CODEC: 'h264',
    RESOLUTION: 'HD',
    BITRATE: 1.5,
    FRAMERATE: 30,
    ASPECT_RATIO: '16:9',
    QUALITY: 'high',
  },
} as const;

export type VideoFormat = (typeof VIDEO.FORMATS)[keyof typeof VIDEO.FORMATS];
export type VideoCodec = (typeof VIDEO.CODECS)[keyof typeof VIDEO.CODECS];
export type VideoResolution = keyof typeof VIDEO.RESOLUTIONS;
export type VideoAspectRatio = keyof typeof VIDEO.ASPECT_RATIOS;
export type VideoBitrate = (typeof VIDEO.BITRATES)[keyof typeof VIDEO.BITRATES];
export type VideoFramerate = (typeof VIDEO.FRAMERATES)[keyof typeof VIDEO.FRAMERATES];
export type VideoQuality = (typeof VIDEO.QUALITY)[keyof typeof VIDEO.QUALITY];
