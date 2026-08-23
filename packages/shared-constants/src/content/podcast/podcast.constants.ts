/**
 * Podcast Constants
 * Configuration for podcasts, episodes, and audio content
 */

export const CONTENT_PODCAST = {
  // Podcast Types
  TYPES: {
    INTERVIEW: 'interview',
    SOLO: 'solo',
    PANEL: 'panel',
    STORYTELLING: 'storytelling',
    EDUCATIONAL: 'educational',
    NEWS: 'news',
    COMEDY: 'comedy',
    BUSINESS: 'business',
    TECHNOLOGY: 'technology',
    HEALTH: 'health',
    LIFESTYLE: 'lifestyle',
    TRUE_CRIME: 'true_crime',
    HISTORY: 'history',
    SCIENCE: 'science',
    FICTION: 'fiction',
    CUSTOM: 'custom',
  } as const,

  // Podcast Statuses
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
    READY: 'ready',
    FAILED: 'failed',
  } as const,

  // Podcast Formats
  FORMATS: {
    MP3: 'mp3',
    AAC: 'aac',
    OGG: 'ogg',
    WAV: 'wav',
    FLAC: 'flac',
    M4A: 'm4a',
    WMA: 'wma',
    CUSTOM: 'custom',
  } as const,

  // Podcast Audio Quality
  AUDIO_QUALITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    PREMIUM: 'premium',
    ORIGINAL: 'original',
  } as const,

  // Podcast Bitrates
  BITRATES: {
    LOW: 64,
    MEDIUM: 128,
    HIGH: 192,
    PREMIUM: 256,
    ULTRA: 320,
  } as const,

  // Podcast Sample Rates
  SAMPLE_RATES: {
    LOW: 22050,
    MEDIUM: 44100,
    HIGH: 48000,
    PREMIUM: 96000,
    ULTRA: 192000,
  } as const,

  // Podcast Visibility
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

  // Podcast Sort Options
  SORT_OPTIONS: {
    TITLE_ASC: 'title_asc',
    TITLE_DESC: 'title_desc',
    DATE_ASC: 'date_asc',
    DATE_DESC: 'date_desc',
    VIEWS: 'views',
    LIKES: 'likes',
    DOWNLOADS: 'downloads',
    POPULAR: 'popular',
    CUSTOM: 'custom',
  } as const,

  // Podcast Defaults
  DEFAULTS: {
    STATUS: 'draft',
    FORMAT: 'mp3',
    AUDIO_QUALITY: 'medium',
    BITRATE: 128,
    SAMPLE_RATE: 44100,
    VISIBILITY: 'public',
    SORT: 'date_desc',
    MAX_DURATION: 7200, // 2 hours
    MIN_DURATION: 300, // 5 minutes
  } as const,

  // Podcast Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 5000,
    MAX_DURATION_SECONDS: 14400, // 4 hours
    MIN_DURATION_SECONDS: 60, // 1 minute
    MAX_FILE_SIZE_MB: 500,
    MAX_EPISODES_PER_SEASON: 50,
    MAX_SEASONS: 10,
  } as const,

  // Podcast Episodes
  EPISODE_TYPES: {
    FULL: 'full',
    TRAILER: 'trailer',
    BONUS: 'bonus',
    CLIP: 'clip',
    RECAP: 'recap',
    PREVIEW: 'preview',
    CUSTOM: 'custom',
  } as const,

  // Podcast Content Ratings
  CONTENT_RATINGS: {
    CLEAN: 'clean',
    EXPLICIT: 'explicit',
    MATURE: 'mature',
    UNRATED: 'unrated',
  } as const,
} as const;

// Podcast Types
export type ContentPodcastType = (typeof CONTENT_PODCAST.TYPES)[keyof typeof CONTENT_PODCAST.TYPES];

// Podcast Statuses
export type ContentPodcastStatus =
  (typeof CONTENT_PODCAST.STATUSES)[keyof typeof CONTENT_PODCAST.STATUSES];

// Podcast Formats
export type ContentPodcastFormat =
  (typeof CONTENT_PODCAST.FORMATS)[keyof typeof CONTENT_PODCAST.FORMATS];

// Podcast Audio Quality
export type ContentPodcastAudioQuality =
  (typeof CONTENT_PODCAST.AUDIO_QUALITY)[keyof typeof CONTENT_PODCAST.AUDIO_QUALITY];

// Podcast Visibility
export type ContentPodcastVisibility =
  (typeof CONTENT_PODCAST.VISIBILITY)[keyof typeof CONTENT_PODCAST.VISIBILITY];

// Podcast Sort Options
export type ContentPodcastSortOption =
  (typeof CONTENT_PODCAST.SORT_OPTIONS)[keyof typeof CONTENT_PODCAST.SORT_OPTIONS];

// Podcast Episode Types
export type ContentPodcastEpisodeType =
  (typeof CONTENT_PODCAST.EPISODE_TYPES)[keyof typeof CONTENT_PODCAST.EPISODE_TYPES];

// Podcast Content Ratings
export type ContentPodcastContentRating =
  (typeof CONTENT_PODCAST.CONTENT_RATINGS)[keyof typeof CONTENT_PODCAST.CONTENT_RATINGS];

// Utility Functions
export function contentPodcastGetTypeLabel(type: ContentPodcastType): string {
  const labels: Record<ContentPodcastType, string> = {
    [CONTENT_PODCAST.TYPES.INTERVIEW]: 'Interview Podcast',
    [CONTENT_PODCAST.TYPES.SOLO]: 'Solo Podcast',
    [CONTENT_PODCAST.TYPES.PANEL]: 'Panel Podcast',
    [CONTENT_PODCAST.TYPES.STORYTELLING]: 'Storytelling Podcast',
    [CONTENT_PODCAST.TYPES.EDUCATIONAL]: 'Educational Podcast',
    [CONTENT_PODCAST.TYPES.NEWS]: 'News Podcast',
    [CONTENT_PODCAST.TYPES.COMEDY]: 'Comedy Podcast',
    [CONTENT_PODCAST.TYPES.BUSINESS]: 'Business Podcast',
    [CONTENT_PODCAST.TYPES.TECHNOLOGY]: 'Technology Podcast',
    [CONTENT_PODCAST.TYPES.HEALTH]: 'Health Podcast',
    [CONTENT_PODCAST.TYPES.LIFESTYLE]: 'Lifestyle Podcast',
    [CONTENT_PODCAST.TYPES.TRUE_CRIME]: 'True Crime Podcast',
    [CONTENT_PODCAST.TYPES.HISTORY]: 'History Podcast',
    [CONTENT_PODCAST.TYPES.SCIENCE]: 'Science Podcast',
    [CONTENT_PODCAST.TYPES.FICTION]: 'Fiction Podcast',
    [CONTENT_PODCAST.TYPES.CUSTOM]: 'Custom Podcast',
  };
  return labels[type] || 'Unknown Podcast Type';
}

export function contentPodcastGetStatusLabel(status: ContentPodcastStatus): string {
  const labels: Record<ContentPodcastStatus, string> = {
    [CONTENT_PODCAST.STATUSES.DRAFT]: 'Draft',
    [CONTENT_PODCAST.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_PODCAST.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_PODCAST.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_PODCAST.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_PODCAST.STATUSES.APPROVED]: 'Approved',
    [CONTENT_PODCAST.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_PODCAST.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_PODCAST.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_PODCAST.STATUSES.PRIVATE]: 'Private',
    [CONTENT_PODCAST.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_PODCAST.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_PODCAST.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_PODCAST.STATUSES.DELETED]: 'Deleted',
    [CONTENT_PODCAST.STATUSES.PROCESSING]: 'Processing',
    [CONTENT_PODCAST.STATUSES.UPLOADING]: 'Uploading',
    [CONTENT_PODCAST.STATUSES.READY]: 'Ready',
    [CONTENT_PODCAST.STATUSES.FAILED]: 'Failed',
  };
  return labels[status] || 'Unknown Status';
}

export function contentPodcastGetFormatLabel(format: ContentPodcastFormat): string {
  const labels: Record<ContentPodcastFormat, string> = {
    [CONTENT_PODCAST.FORMATS.MP3]: 'MP3',
    [CONTENT_PODCAST.FORMATS.AAC]: 'AAC',
    [CONTENT_PODCAST.FORMATS.OGG]: 'OGG',
    [CONTENT_PODCAST.FORMATS.WAV]: 'WAV',
    [CONTENT_PODCAST.FORMATS.FLAC]: 'FLAC',
    [CONTENT_PODCAST.FORMATS.M4A]: 'M4A',
    [CONTENT_PODCAST.FORMATS.WMA]: 'WMA',
    [CONTENT_PODCAST.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentPodcastGetAudioQualityLabel(quality: ContentPodcastAudioQuality): string {
  const labels: Record<ContentPodcastAudioQuality, string> = {
    [CONTENT_PODCAST.AUDIO_QUALITY.LOW]: 'Low Quality',
    [CONTENT_PODCAST.AUDIO_QUALITY.MEDIUM]: 'Medium Quality',
    [CONTENT_PODCAST.AUDIO_QUALITY.HIGH]: 'High Quality',
    [CONTENT_PODCAST.AUDIO_QUALITY.PREMIUM]: 'Premium Quality',
    [CONTENT_PODCAST.AUDIO_QUALITY.ORIGINAL]: 'Original Quality',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentPodcastGetVisibilityLabel(visibility: ContentPodcastVisibility): string {
  const labels: Record<ContentPodcastVisibility, string> = {
    [CONTENT_PODCAST.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_PODCAST.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_PODCAST.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_PODCAST.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_PODCAST.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_PODCAST.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_PODCAST.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_PODCAST.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentPodcastGetSortOptionLabel(sort: ContentPodcastSortOption): string {
  const labels: Record<ContentPodcastSortOption, string> = {
    [CONTENT_PODCAST.SORT_OPTIONS.TITLE_ASC]: 'Title A-Z',
    [CONTENT_PODCAST.SORT_OPTIONS.TITLE_DESC]: 'Title Z-A',
    [CONTENT_PODCAST.SORT_OPTIONS.DATE_ASC]: 'Oldest First',
    [CONTENT_PODCAST.SORT_OPTIONS.DATE_DESC]: 'Newest First',
    [CONTENT_PODCAST.SORT_OPTIONS.VIEWS]: 'Most Viewed',
    [CONTENT_PODCAST.SORT_OPTIONS.LIKES]: 'Most Liked',
    [CONTENT_PODCAST.SORT_OPTIONS.DOWNLOADS]: 'Most Downloaded',
    [CONTENT_PODCAST.SORT_OPTIONS.POPULAR]: 'Most Popular',
    [CONTENT_PODCAST.SORT_OPTIONS.CUSTOM]: 'Custom Sort',
  };
  return labels[sort] || 'Unknown Sort Option';
}

export function contentPodcastGetEpisodeTypeLabel(episodeType: ContentPodcastEpisodeType): string {
  const labels: Record<ContentPodcastEpisodeType, string> = {
    [CONTENT_PODCAST.EPISODE_TYPES.FULL]: 'Full Episode',
    [CONTENT_PODCAST.EPISODE_TYPES.TRAILER]: 'Trailer',
    [CONTENT_PODCAST.EPISODE_TYPES.BONUS]: 'Bonus Episode',
    [CONTENT_PODCAST.EPISODE_TYPES.CLIP]: 'Clip',
    [CONTENT_PODCAST.EPISODE_TYPES.RECAP]: 'Recap',
    [CONTENT_PODCAST.EPISODE_TYPES.PREVIEW]: 'Preview',
    [CONTENT_PODCAST.EPISODE_TYPES.CUSTOM]: 'Custom Episode Type',
  };
  return labels[episodeType] || 'Unknown Episode Type';
}

export function contentPodcastGetContentRatingLabel(rating: ContentPodcastContentRating): string {
  const labels: Record<ContentPodcastContentRating, string> = {
    [CONTENT_PODCAST.CONTENT_RATINGS.CLEAN]: 'Clean',
    [CONTENT_PODCAST.CONTENT_RATINGS.EXPLICIT]: 'Explicit',
    [CONTENT_PODCAST.CONTENT_RATINGS.MATURE]: 'Mature',
    [CONTENT_PODCAST.CONTENT_RATINGS.UNRATED]: 'Unrated',
  };
  return labels[rating] || 'Unknown Rating';
}

export function contentPodcastIsPublished(status: ContentPodcastStatus): boolean {
  const publishedStatuses: ContentPodcastStatus[] = [
    CONTENT_PODCAST.STATUSES.PUBLISHED,
    CONTENT_PODCAST.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentPodcastIsEditable(status: ContentPodcastStatus): boolean {
  const editableStatuses: ContentPodcastStatus[] = [
    CONTENT_PODCAST.STATUSES.DRAFT,
    CONTENT_PODCAST.STATUSES.PENDING_REVIEW,
    CONTENT_PODCAST.STATUSES.IN_REVIEW,
    CONTENT_PODCAST.STATUSES.REVIEWED,
    CONTENT_PODCAST.STATUSES.PENDING_APPROVAL,
    CONTENT_PODCAST.STATUSES.REJECTED,
    CONTENT_PODCAST.STATUSES.PRIVATE,
    CONTENT_PODCAST.STATUSES.UNLISTED,
    CONTENT_PODCAST.STATUSES.PROCESSING,
    CONTENT_PODCAST.STATUSES.READY,
  ];
  return editableStatuses.includes(status);
}

export function contentPodcastIsApproved(status: ContentPodcastStatus): boolean {
  const approvedStatuses: ContentPodcastStatus[] = [
    CONTENT_PODCAST.STATUSES.APPROVED,
    CONTENT_PODCAST.STATUSES.PUBLISHED,
    CONTENT_PODCAST.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentPodcastIsProcessing(status: ContentPodcastStatus): boolean {
  const processingStatuses: ContentPodcastStatus[] = [
    CONTENT_PODCAST.STATUSES.UPLOADING,
    CONTENT_PODCAST.STATUSES.PROCESSING,
  ];
  return processingStatuses.includes(status);
}

export function contentPodcastGetDefaultStatus(): ContentPodcastStatus {
  return CONTENT_PODCAST.DEFAULTS.STATUS as ContentPodcastStatus;
}

export function contentPodcastGetDefaultFormat(): ContentPodcastFormat {
  return CONTENT_PODCAST.DEFAULTS.FORMAT as ContentPodcastFormat;
}

export function contentPodcastGetDefaultAudioQuality(): ContentPodcastAudioQuality {
  return CONTENT_PODCAST.DEFAULTS.AUDIO_QUALITY as ContentPodcastAudioQuality;
}

export function contentPodcastGetDefaultVisibility(): ContentPodcastVisibility {
  return CONTENT_PODCAST.DEFAULTS.VISIBILITY as ContentPodcastVisibility;
}

export function contentPodcastGetDefaultSort(): ContentPodcastSortOption {
  return CONTENT_PODCAST.DEFAULTS.SORT as ContentPodcastSortOption;
}

export function contentPodcastGetMaxTitleLength(): number {
  return CONTENT_PODCAST.LIMITS.MAX_TITLE_LENGTH;
}

export function contentPodcastGetMaxDescriptionLength(): number {
  return CONTENT_PODCAST.LIMITS.MAX_DESCRIPTION_LENGTH;
}

export function contentPodcastGetMaxDurationSeconds(): number {
  return CONTENT_PODCAST.LIMITS.MAX_DURATION_SECONDS;
}

export function contentPodcastGetMinDurationSeconds(): number {
  return CONTENT_PODCAST.LIMITS.MIN_DURATION_SECONDS;
}

export function contentPodcastGetMaxFileSizeMB(): number {
  return CONTENT_PODCAST.LIMITS.MAX_FILE_SIZE_MB;
}

export function contentPodcastIsValidType(type: string): type is ContentPodcastType {
  return Object.values(CONTENT_PODCAST.TYPES).includes(type as ContentPodcastType);
}

export function contentPodcastIsValidStatus(status: string): status is ContentPodcastStatus {
  return Object.values(CONTENT_PODCAST.STATUSES).includes(status as ContentPodcastStatus);
}

export function contentPodcastIsValidFormat(format: string): format is ContentPodcastFormat {
  return Object.values(CONTENT_PODCAST.FORMATS).includes(format as ContentPodcastFormat);
}

export function contentPodcastIsValidEpisodeType(
  episodeType: string
): episodeType is ContentPodcastEpisodeType {
  return Object.values(CONTENT_PODCAST.EPISODE_TYPES).includes(
    episodeType as ContentPodcastEpisodeType
  );
}

export function contentPodcastIsValidContentRating(
  rating: string
): rating is ContentPodcastContentRating {
  return Object.values(CONTENT_PODCAST.CONTENT_RATINGS).includes(
    rating as ContentPodcastContentRating
  );
}
