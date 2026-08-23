/**
 * Video Constants
 * Configuration for videos, media, and streaming content
 */

export const CONTENT_VIDEO = {
  // Video Types
  TYPES: {
    TUTORIAL: 'tutorial',
    DEMONSTRATION: 'demonstration',
    PRESENTATION: 'presentation',
    INTERVIEW: 'interview',
    REVIEW: 'review',
    UNBOXING: 'unboxing',
    COMPARISON: 'comparison',
    HOW_TO: 'how_to',
    DOCUMENTARY: 'documentary',
    SHORT_FILM: 'short_film',
    ANIMATION: 'animation',
    EXPLAINER: 'explainer',
    TESTIMONIAL: 'testimonial',
    EVENT: 'event',
    WEBINAR: 'webinar',
    PROMOTIONAL: 'promotional',
    EDUCATIONAL: 'educational',
    CUSTOM: 'custom',
  } as const,

  // Video Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    SCHEDULED: 'scheduled',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    ARCHIVED: 'archived',
    DEPRECATED: 'deprecated',
    DELETED: 'deleted',
    PROCESSING: 'processing',
    UPLOADING: 'uploading',
    TRANSCODING: 'transcoding',
    READY: 'ready',
    FAILED: 'failed',
  } as const,

  // Video Formats
  FORMATS: {
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
    CUSTOM: 'custom',
  } as const,

  // Video Resolutions
  RESOLUTIONS: {
    SD: 'sd',
    HD: 'hd',
    FHD: 'fhd',
    QHD: 'qhd',
    UHD: 'uhd',
    FOUR_K: '4k',
    EIGHT_K: '8k',
  } as const,

  // Video Quality
  QUALITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    PREMIUM: 'premium',
    ORIGINAL: 'original',
  } as const,

  // Video Aspect Ratios
  ASPECT_RATIOS: {
    SQUARE: '1:1',
    LANDSCAPE: '16:9',
    PORTRAIT: '9:16',
    STANDARD: '4:3',
    WIDE: '16:10',
    CINEMATIC: '2.39:1',
    CUSTOM: 'custom',
  } as const,

  // Video Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    PASSWORD_PROTECTED: 'password_protected',
    MEMBERS_ONLY: 'members_only',
    SUBSCRIBERS_ONLY: 'subscribers_only',
    PREMIUM_ONLY: 'premium_only',
    TEAM_ONLY: 'team_only',
  } as const,

  // Video Sort Options
  SORT_OPTIONS: {
    TITLE_ASC: 'title_asc',
    TITLE_DESC: 'title_desc',
    DATE_ASC: 'date_asc',
    DATE_DESC: 'date_desc',
    VIEWS: 'views',
    LIKES: 'likes',
    COMMENTS: 'comments',
    SHARES: 'shares',
    POPULAR: 'popular',
    CUSTOM: 'custom',
  } as const,

  // Video Defaults
  DEFAULTS: {
    STATUS: 'draft',
    FORMAT: 'mp4',
    RESOLUTION: 'hd',
    QUALITY: 'medium',
    ASPECT_RATIO: '16:9',
    VISIBILITY: 'public',
    SORT: 'date_desc',
    MAX_DURATION: 3600, // 1 hour
    MIN_DURATION: 10, // 10 seconds
    THUMBNAIL: 'auto',
  } as const,

  // Video Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 5000,
    MAX_DURATION_SECONDS: 36000, // 10 hours
    MIN_DURATION_SECONDS: 5,
    MAX_FILE_SIZE_GB: 10,
    MAX_RESOLUTION: '8k',
    MAX_FRAME_RATE: 60,
    MAX_BITRATE_MBPS: 50,
  } as const,

  // Video Dimensions
  DIMENSIONS: {
    SD: { width: 640, height: 480 },
    HD: { width: 1280, height: 720 },
    FHD: { width: 1920, height: 1080 },
    QHD: { width: 2560, height: 1440 },
    UHD: { width: 3840, height: 2160 },
    FOUR_K: { width: 4096, height: 2160 },
    EIGHT_K: { width: 7680, height: 4320 },
  } as const,

  // Video Frame Rates
  FRAME_RATES: {
    FILM_24: 24,
    PAL_25: 25,
    NTSC_30: 30,
    HD_60: 60,
    HIGH_120: 120,
    ULTRA_240: 240,
  } as const,
} as const;

// Video Types
export type ContentVideoType = (typeof CONTENT_VIDEO.TYPES)[keyof typeof CONTENT_VIDEO.TYPES];

// Video Statuses
export type ContentVideoStatus =
  (typeof CONTENT_VIDEO.STATUSES)[keyof typeof CONTENT_VIDEO.STATUSES];

// Video Formats
export type ContentVideoFormat = (typeof CONTENT_VIDEO.FORMATS)[keyof typeof CONTENT_VIDEO.FORMATS];

// Video Resolutions
export type ContentVideoResolution =
  (typeof CONTENT_VIDEO.RESOLUTIONS)[keyof typeof CONTENT_VIDEO.RESOLUTIONS];

// Video Quality
export type ContentVideoQuality =
  (typeof CONTENT_VIDEO.QUALITY)[keyof typeof CONTENT_VIDEO.QUALITY];

// Video Aspect Ratios
export type ContentVideoAspectRatio =
  (typeof CONTENT_VIDEO.ASPECT_RATIOS)[keyof typeof CONTENT_VIDEO.ASPECT_RATIOS];

// Video Visibility
export type ContentVideoVisibility =
  (typeof CONTENT_VIDEO.VISIBILITY)[keyof typeof CONTENT_VIDEO.VISIBILITY];

// Video Sort Options
export type ContentVideoSortOption =
  (typeof CONTENT_VIDEO.SORT_OPTIONS)[keyof typeof CONTENT_VIDEO.SORT_OPTIONS];

// Video Dimensions
export type ContentVideoDimension =
  (typeof CONTENT_VIDEO.DIMENSIONS)[keyof typeof CONTENT_VIDEO.DIMENSIONS];

// Video Frame Rates
export type ContentVideoFrameRate =
  (typeof CONTENT_VIDEO.FRAME_RATES)[keyof typeof CONTENT_VIDEO.FRAME_RATES];

// Utility Functions
export function contentVideoGetTypeLabel(type: ContentVideoType): string {
  const labels: Record<ContentVideoType, string> = {
    [CONTENT_VIDEO.TYPES.TUTORIAL]: 'Tutorial Video',
    [CONTENT_VIDEO.TYPES.DEMONSTRATION]: 'Demonstration Video',
    [CONTENT_VIDEO.TYPES.PRESENTATION]: 'Presentation Video',
    [CONTENT_VIDEO.TYPES.INTERVIEW]: 'Interview Video',
    [CONTENT_VIDEO.TYPES.REVIEW]: 'Review Video',
    [CONTENT_VIDEO.TYPES.UNBOXING]: 'Unboxing Video',
    [CONTENT_VIDEO.TYPES.COMPARISON]: 'Comparison Video',
    [CONTENT_VIDEO.TYPES.HOW_TO]: 'How-To Video',
    [CONTENT_VIDEO.TYPES.DOCUMENTARY]: 'Documentary Video',
    [CONTENT_VIDEO.TYPES.SHORT_FILM]: 'Short Film',
    [CONTENT_VIDEO.TYPES.ANIMATION]: 'Animation Video',
    [CONTENT_VIDEO.TYPES.EXPLAINER]: 'Explainer Video',
    [CONTENT_VIDEO.TYPES.TESTIMONIAL]: 'Testimonial Video',
    [CONTENT_VIDEO.TYPES.EVENT]: 'Event Video',
    [CONTENT_VIDEO.TYPES.WEBINAR]: 'Webinar Video',
    [CONTENT_VIDEO.TYPES.PROMOTIONAL]: 'Promotional Video',
    [CONTENT_VIDEO.TYPES.EDUCATIONAL]: 'Educational Video',
    [CONTENT_VIDEO.TYPES.CUSTOM]: 'Custom Video',
  };
  return labels[type] || 'Unknown Video Type';
}

export function contentVideoGetStatusLabel(status: ContentVideoStatus): string {
  const labels: Record<ContentVideoStatus, string> = {
    [CONTENT_VIDEO.STATUSES.DRAFT]: 'Draft',
    [CONTENT_VIDEO.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_VIDEO.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_VIDEO.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_VIDEO.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_VIDEO.STATUSES.APPROVED]: 'Approved',
    [CONTENT_VIDEO.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_VIDEO.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_VIDEO.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_VIDEO.STATUSES.PRIVATE]: 'Private',
    [CONTENT_VIDEO.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_VIDEO.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_VIDEO.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_VIDEO.STATUSES.DELETED]: 'Deleted',
    [CONTENT_VIDEO.STATUSES.PROCESSING]: 'Processing',
    [CONTENT_VIDEO.STATUSES.UPLOADING]: 'Uploading',
    [CONTENT_VIDEO.STATUSES.TRANSCODING]: 'Transcoding',
    [CONTENT_VIDEO.STATUSES.READY]: 'Ready',
    [CONTENT_VIDEO.STATUSES.FAILED]: 'Failed',
  };
  return labels[status] || 'Unknown Status';
}

export function contentVideoGetFormatLabel(format: ContentVideoFormat): string {
  const labels: Record<ContentVideoFormat, string> = {
    [CONTENT_VIDEO.FORMATS.MP4]: 'MP4',
    [CONTENT_VIDEO.FORMATS.WEBM]: 'WebM',
    [CONTENT_VIDEO.FORMATS.AVI]: 'AVI',
    [CONTENT_VIDEO.FORMATS.MOV]: 'MOV',
    [CONTENT_VIDEO.FORMATS.MKV]: 'MKV',
    [CONTENT_VIDEO.FORMATS.FLV]: 'FLV',
    [CONTENT_VIDEO.FORMATS.WMV]: 'WMV',
    [CONTENT_VIDEO.FORMATS.MPEG]: 'MPEG',
    [CONTENT_VIDEO.FORMATS.HLS]: 'HLS',
    [CONTENT_VIDEO.FORMATS.DASH]: 'DASH',
    [CONTENT_VIDEO.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentVideoGetResolutionLabel(resolution: ContentVideoResolution): string {
  const labels: Record<ContentVideoResolution, string> = {
    [CONTENT_VIDEO.RESOLUTIONS.SD]: 'Standard Definition (SD)',
    [CONTENT_VIDEO.RESOLUTIONS.HD]: 'High Definition (HD)',
    [CONTENT_VIDEO.RESOLUTIONS.FHD]: 'Full HD (FHD)',
    [CONTENT_VIDEO.RESOLUTIONS.QHD]: 'Quad HD (QHD)',
    [CONTENT_VIDEO.RESOLUTIONS.UHD]: 'Ultra HD (UHD)',
    [CONTENT_VIDEO.RESOLUTIONS.FOUR_K]: '4K Resolution',
    [CONTENT_VIDEO.RESOLUTIONS.EIGHT_K]: '8K Resolution',
  };
  return labels[resolution] || 'Unknown Resolution';
}

export function contentVideoGetQualityLabel(quality: ContentVideoQuality): string {
  const labels: Record<ContentVideoQuality, string> = {
    [CONTENT_VIDEO.QUALITY.LOW]: 'Low Quality',
    [CONTENT_VIDEO.QUALITY.MEDIUM]: 'Medium Quality',
    [CONTENT_VIDEO.QUALITY.HIGH]: 'High Quality',
    [CONTENT_VIDEO.QUALITY.PREMIUM]: 'Premium Quality',
    [CONTENT_VIDEO.QUALITY.ORIGINAL]: 'Original Quality',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentVideoGetAspectRatioLabel(aspectRatio: ContentVideoAspectRatio): string {
  const labels: Record<ContentVideoAspectRatio, string> = {
    [CONTENT_VIDEO.ASPECT_RATIOS.SQUARE]: '1:1 (Square)',
    [CONTENT_VIDEO.ASPECT_RATIOS.LANDSCAPE]: '16:9 (Landscape)',
    [CONTENT_VIDEO.ASPECT_RATIOS.PORTRAIT]: '9:16 (Portrait)',
    [CONTENT_VIDEO.ASPECT_RATIOS.STANDARD]: '4:3 (Standard)',
    [CONTENT_VIDEO.ASPECT_RATIOS.WIDE]: '16:10 (Wide)',
    [CONTENT_VIDEO.ASPECT_RATIOS.CINEMATIC]: '2.39:1 (Cinematic)',
    [CONTENT_VIDEO.ASPECT_RATIOS.CUSTOM]: 'Custom Aspect Ratio',
  };
  return labels[aspectRatio] || 'Unknown Aspect Ratio';
}

export function contentVideoGetVisibilityLabel(visibility: ContentVideoVisibility): string {
  const labels: Record<ContentVideoVisibility, string> = {
    [CONTENT_VIDEO.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_VIDEO.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_VIDEO.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_VIDEO.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_VIDEO.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_VIDEO.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_VIDEO.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_VIDEO.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentVideoGetSortOptionLabel(sort: ContentVideoSortOption): string {
  const labels: Record<ContentVideoSortOption, string> = {
    [CONTENT_VIDEO.SORT_OPTIONS.TITLE_ASC]: 'Title A-Z',
    [CONTENT_VIDEO.SORT_OPTIONS.TITLE_DESC]: 'Title Z-A',
    [CONTENT_VIDEO.SORT_OPTIONS.DATE_ASC]: 'Oldest First',
    [CONTENT_VIDEO.SORT_OPTIONS.DATE_DESC]: 'Newest First',
    [CONTENT_VIDEO.SORT_OPTIONS.VIEWS]: 'Most Viewed',
    [CONTENT_VIDEO.SORT_OPTIONS.LIKES]: 'Most Liked',
    [CONTENT_VIDEO.SORT_OPTIONS.COMMENTS]: 'Most Commented',
    [CONTENT_VIDEO.SORT_OPTIONS.SHARES]: 'Most Shared',
    [CONTENT_VIDEO.SORT_OPTIONS.POPULAR]: 'Most Popular',
    [CONTENT_VIDEO.SORT_OPTIONS.CUSTOM]: 'Custom Sort',
  };
  return labels[sort] || 'Unknown Sort Option';
}

export function contentVideoGetDimension(
  resolution: ContentVideoResolution
): ContentVideoDimension {
  const dimMap: Record<ContentVideoResolution, ContentVideoDimension> = {
    [CONTENT_VIDEO.RESOLUTIONS.SD]: CONTENT_VIDEO.DIMENSIONS.SD,
    [CONTENT_VIDEO.RESOLUTIONS.HD]: CONTENT_VIDEO.DIMENSIONS.HD,
    [CONTENT_VIDEO.RESOLUTIONS.FHD]: CONTENT_VIDEO.DIMENSIONS.FHD,
    [CONTENT_VIDEO.RESOLUTIONS.QHD]: CONTENT_VIDEO.DIMENSIONS.QHD,
    [CONTENT_VIDEO.RESOLUTIONS.UHD]: CONTENT_VIDEO.DIMENSIONS.UHD,
    [CONTENT_VIDEO.RESOLUTIONS.FOUR_K]: CONTENT_VIDEO.DIMENSIONS.FOUR_K,
    [CONTENT_VIDEO.RESOLUTIONS.EIGHT_K]: CONTENT_VIDEO.DIMENSIONS.EIGHT_K,
  };
  return dimMap[resolution] || CONTENT_VIDEO.DIMENSIONS.HD;
}

export function contentVideoIsPublished(status: ContentVideoStatus): boolean {
  const publishedStatuses: ContentVideoStatus[] = [
    CONTENT_VIDEO.STATUSES.PUBLISHED,
    CONTENT_VIDEO.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentVideoIsEditable(status: ContentVideoStatus): boolean {
  const editableStatuses: ContentVideoStatus[] = [
    CONTENT_VIDEO.STATUSES.DRAFT,
    CONTENT_VIDEO.STATUSES.PENDING_REVIEW,
    CONTENT_VIDEO.STATUSES.IN_REVIEW,
    CONTENT_VIDEO.STATUSES.REVIEWED,
    CONTENT_VIDEO.STATUSES.PENDING_APPROVAL,
    CONTENT_VIDEO.STATUSES.REJECTED,
    CONTENT_VIDEO.STATUSES.PRIVATE,
    CONTENT_VIDEO.STATUSES.UNLISTED,
    CONTENT_VIDEO.STATUSES.PROCESSING,
    CONTENT_VIDEO.STATUSES.READY,
  ];
  return editableStatuses.includes(status);
}

export function contentVideoIsApproved(status: ContentVideoStatus): boolean {
  const approvedStatuses: ContentVideoStatus[] = [
    CONTENT_VIDEO.STATUSES.APPROVED,
    CONTENT_VIDEO.STATUSES.PUBLISHED,
    CONTENT_VIDEO.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentVideoIsProcessing(status: ContentVideoStatus): boolean {
  const processingStatuses: ContentVideoStatus[] = [
    CONTENT_VIDEO.STATUSES.UPLOADING,
    CONTENT_VIDEO.STATUSES.PROCESSING,
    CONTENT_VIDEO.STATUSES.TRANSCODING,
  ];
  return processingStatuses.includes(status);
}

export function contentVideoGetDefaultStatus(): ContentVideoStatus {
  return CONTENT_VIDEO.DEFAULTS.STATUS as ContentVideoStatus;
}

export function contentVideoGetDefaultFormat(): ContentVideoFormat {
  return CONTENT_VIDEO.DEFAULTS.FORMAT as ContentVideoFormat;
}

export function contentVideoGetDefaultResolution(): ContentVideoResolution {
  return CONTENT_VIDEO.DEFAULTS.RESOLUTION as ContentVideoResolution;
}

export function contentVideoGetDefaultVisibility(): ContentVideoVisibility {
  return CONTENT_VIDEO.DEFAULTS.VISIBILITY as ContentVideoVisibility;
}

export function contentVideoGetDefaultSort(): ContentVideoSortOption {
  return CONTENT_VIDEO.DEFAULTS.SORT as ContentVideoSortOption;
}

export function contentVideoGetMaxTitleLength(): number {
  return CONTENT_VIDEO.LIMITS.MAX_TITLE_LENGTH;
}

export function contentVideoGetMaxDescriptionLength(): number {
  return CONTENT_VIDEO.LIMITS.MAX_DESCRIPTION_LENGTH;
}

export function contentVideoGetMaxDurationSeconds(): number {
  return CONTENT_VIDEO.LIMITS.MAX_DURATION_SECONDS;
}

export function contentVideoGetMinDurationSeconds(): number {
  return CONTENT_VIDEO.LIMITS.MIN_DURATION_SECONDS;
}

export function contentVideoGetMaxFileSizeGB(): number {
  return CONTENT_VIDEO.LIMITS.MAX_FILE_SIZE_GB;
}

export function contentVideoIsValidType(type: string): type is ContentVideoType {
  return Object.values(CONTENT_VIDEO.TYPES).includes(type as ContentVideoType);
}

export function contentVideoIsValidStatus(status: string): status is ContentVideoStatus {
  return Object.values(CONTENT_VIDEO.STATUSES).includes(status as ContentVideoStatus);
}

export function contentVideoIsValidFormat(format: string): format is ContentVideoFormat {
  return Object.values(CONTENT_VIDEO.FORMATS).includes(format as ContentVideoFormat);
}

export function contentVideoIsValidResolution(
  resolution: string
): resolution is ContentVideoResolution {
  return Object.values(CONTENT_VIDEO.RESOLUTIONS).includes(resolution as ContentVideoResolution);
}

export function contentVideoIsValidAspectRatio(
  aspectRatio: string
): aspectRatio is ContentVideoAspectRatio {
  return Object.values(CONTENT_VIDEO.ASPECT_RATIOS).includes(
    aspectRatio as ContentVideoAspectRatio
  );
}
