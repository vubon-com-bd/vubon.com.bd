/**
 * Webinar Constants
 * Configuration for webinars, online events, and virtual presentations
 */

export const CONTENT_WEBINAR = {
  // Webinar Types
  TYPES: {
    PRESENTATION: 'presentation',
    WORKSHOP: 'workshop',
    TRAINING: 'training',
    DEMONSTRATION: 'demonstration',
    PANEL: 'panel',
    INTERVIEW: 'interview',
    Q_AND_A: 'q_and_a',
    ROUNDTABLE: 'roundtable',
    PRODUCT_LAUNCH: 'product_launch',
    KEYNOTE: 'keynote',
    TUTORIAL: 'tutorial',
    CUSTOM: 'custom',
  } as const,

  // Webinar Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SCHEDULED: 'scheduled',
    UPCOMING: 'upcoming',
    LIVE: 'live',
    ONGOING: 'ongoing',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    POSTPONED: 'postponed',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  } as const,

  // Webinar Formats
  FORMATS: {
    VIDEO: 'video',
    AUDIO: 'audio',
    SLIDES: 'slides',
    INTERACTIVE: 'interactive',
    HYBRID: 'hybrid',
    CUSTOM: 'custom',
  } as const,

  // Webinar Platforms
  PLATFORMS: {
    ZOOM: 'zoom',
    TEAMS: 'teams',
    GOOGLE_MEET: 'google_meet',
    WEBEX: 'webex',
    GOTOMEETING: 'gotomeeting',
    BLUEJEANS: 'bluejeans',
    CUSTOM: 'custom',
  } as const,

  // Webinar Recording Status
  RECORDING_STATUS: {
    NONE: 'none',
    SCHEDULED: 'scheduled',
    RECORDING: 'recording',
    PROCESSING: 'processing',
    READY: 'ready',
    FAILED: 'failed',
  } as const,

  // Webinar Visibility
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

  // Webinar Sort Options
  SORT_OPTIONS: {
    TITLE_ASC: 'title_asc',
    TITLE_DESC: 'title_desc',
    DATE_ASC: 'date_asc',
    DATE_DESC: 'date_desc',
    REGISTRANTS: 'registrants',
    ATTENDEES: 'attendees',
    RATING: 'rating',
    POPULAR: 'popular',
    CUSTOM: 'custom',
  } as const,

  // Webinar Defaults
  DEFAULTS: {
    STATUS: 'draft',
    FORMAT: 'video',
    PLATFORM: 'zoom',
    VISIBILITY: 'public',
    SORT: 'date_desc',
    DURATION: 60, // minutes
    MAX_ATTENDEES: 100,
    RECORDING: true,
    Q_AND_A: true,
    CHAT: true,
  } as const,

  // Webinar Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 5000,
    MAX_DURATION_MINUTES: 480, // 8 hours
    MIN_DURATION_MINUTES: 15,
    MAX_ATTENDEES: 10000,
    MIN_ATTENDEES: 1,
    MAX_SPEAKERS: 10,
    MAX_QUESTIONS: 1000,
    MAX_POLLS: 20,
  } as const,

  // Webinar Audience
  AUDIENCE: {
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    CUSTOMERS: 'customers',
    PROSPECTS: 'prospects',
    PARTNERS: 'partners',
    PUBLIC: 'public',
    CUSTOM: 'custom',
  } as const,
} as const;

// Webinar Types
export type ContentWebinarType = (typeof CONTENT_WEBINAR.TYPES)[keyof typeof CONTENT_WEBINAR.TYPES];

// Webinar Statuses
export type ContentWebinarStatus =
  (typeof CONTENT_WEBINAR.STATUSES)[keyof typeof CONTENT_WEBINAR.STATUSES];

// Webinar Formats
export type ContentWebinarFormat =
  (typeof CONTENT_WEBINAR.FORMATS)[keyof typeof CONTENT_WEBINAR.FORMATS];

// Webinar Platforms
export type ContentWebinarPlatform =
  (typeof CONTENT_WEBINAR.PLATFORMS)[keyof typeof CONTENT_WEBINAR.PLATFORMS];

// Webinar Recording Status
export type ContentWebinarRecordingStatus =
  (typeof CONTENT_WEBINAR.RECORDING_STATUS)[keyof typeof CONTENT_WEBINAR.RECORDING_STATUS];

// Webinar Visibility
export type ContentWebinarVisibility =
  (typeof CONTENT_WEBINAR.VISIBILITY)[keyof typeof CONTENT_WEBINAR.VISIBILITY];

// Webinar Sort Options
export type ContentWebinarSortOption =
  (typeof CONTENT_WEBINAR.SORT_OPTIONS)[keyof typeof CONTENT_WEBINAR.SORT_OPTIONS];

// Webinar Audience
export type ContentWebinarAudience =
  (typeof CONTENT_WEBINAR.AUDIENCE)[keyof typeof CONTENT_WEBINAR.AUDIENCE];

// Utility Functions
export function contentWebinarGetTypeLabel(type: ContentWebinarType): string {
  const labels: Record<ContentWebinarType, string> = {
    [CONTENT_WEBINAR.TYPES.PRESENTATION]: 'Presentation',
    [CONTENT_WEBINAR.TYPES.WORKSHOP]: 'Workshop',
    [CONTENT_WEBINAR.TYPES.TRAINING]: 'Training',
    [CONTENT_WEBINAR.TYPES.DEMONSTRATION]: 'Demonstration',
    [CONTENT_WEBINAR.TYPES.PANEL]: 'Panel Discussion',
    [CONTENT_WEBINAR.TYPES.INTERVIEW]: 'Interview',
    [CONTENT_WEBINAR.TYPES.Q_AND_A]: 'Q&A Session',
    [CONTENT_WEBINAR.TYPES.ROUNDTABLE]: 'Roundtable',
    [CONTENT_WEBINAR.TYPES.PRODUCT_LAUNCH]: 'Product Launch',
    [CONTENT_WEBINAR.TYPES.KEYNOTE]: 'Keynote',
    [CONTENT_WEBINAR.TYPES.TUTORIAL]: 'Tutorial',
    [CONTENT_WEBINAR.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Webinar Type';
}

export function contentWebinarGetStatusLabel(status: ContentWebinarStatus): string {
  const labels: Record<ContentWebinarStatus, string> = {
    [CONTENT_WEBINAR.STATUSES.DRAFT]: 'Draft',
    [CONTENT_WEBINAR.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_WEBINAR.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_WEBINAR.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_WEBINAR.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_WEBINAR.STATUSES.APPROVED]: 'Approved',
    [CONTENT_WEBINAR.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_WEBINAR.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_WEBINAR.STATUSES.UPCOMING]: 'Upcoming',
    [CONTENT_WEBINAR.STATUSES.LIVE]: 'Live',
    [CONTENT_WEBINAR.STATUSES.ONGOING]: 'Ongoing',
    [CONTENT_WEBINAR.STATUSES.PAUSED]: 'Paused',
    [CONTENT_WEBINAR.STATUSES.COMPLETED]: 'Completed',
    [CONTENT_WEBINAR.STATUSES.CANCELLED]: 'Cancelled',
    [CONTENT_WEBINAR.STATUSES.POSTPONED]: 'Postponed',
    [CONTENT_WEBINAR.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_WEBINAR.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentWebinarGetFormatLabel(format: ContentWebinarFormat): string {
  const labels: Record<ContentWebinarFormat, string> = {
    [CONTENT_WEBINAR.FORMATS.VIDEO]: 'Video',
    [CONTENT_WEBINAR.FORMATS.AUDIO]: 'Audio',
    [CONTENT_WEBINAR.FORMATS.SLIDES]: 'Slides',
    [CONTENT_WEBINAR.FORMATS.INTERACTIVE]: 'Interactive',
    [CONTENT_WEBINAR.FORMATS.HYBRID]: 'Hybrid',
    [CONTENT_WEBINAR.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentWebinarGetPlatformLabel(platform: ContentWebinarPlatform): string {
  const labels: Record<ContentWebinarPlatform, string> = {
    [CONTENT_WEBINAR.PLATFORMS.ZOOM]: 'Zoom',
    [CONTENT_WEBINAR.PLATFORMS.TEAMS]: 'Microsoft Teams',
    [CONTENT_WEBINAR.PLATFORMS.GOOGLE_MEET]: 'Google Meet',
    [CONTENT_WEBINAR.PLATFORMS.WEBEX]: 'Webex',
    [CONTENT_WEBINAR.PLATFORMS.GOTOMEETING]: 'GoToMeeting',
    [CONTENT_WEBINAR.PLATFORMS.BLUEJEANS]: 'BlueJeans',
    [CONTENT_WEBINAR.PLATFORMS.CUSTOM]: 'Custom Platform',
  };
  return labels[platform] || 'Unknown Platform';
}

export function contentWebinarGetRecordingStatusLabel(
  status: ContentWebinarRecordingStatus
): string {
  const labels: Record<ContentWebinarRecordingStatus, string> = {
    [CONTENT_WEBINAR.RECORDING_STATUS.NONE]: 'No Recording',
    [CONTENT_WEBINAR.RECORDING_STATUS.SCHEDULED]: 'Scheduled',
    [CONTENT_WEBINAR.RECORDING_STATUS.RECORDING]: 'Recording',
    [CONTENT_WEBINAR.RECORDING_STATUS.PROCESSING]: 'Processing',
    [CONTENT_WEBINAR.RECORDING_STATUS.READY]: 'Ready',
    [CONTENT_WEBINAR.RECORDING_STATUS.FAILED]: 'Failed',
  };
  return labels[status] || 'Unknown Status';
}

export function contentWebinarGetVisibilityLabel(visibility: ContentWebinarVisibility): string {
  const labels: Record<ContentWebinarVisibility, string> = {
    [CONTENT_WEBINAR.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_WEBINAR.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_WEBINAR.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_WEBINAR.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_WEBINAR.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_WEBINAR.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_WEBINAR.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_WEBINAR.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentWebinarGetSortOptionLabel(sort: ContentWebinarSortOption): string {
  const labels: Record<ContentWebinarSortOption, string> = {
    [CONTENT_WEBINAR.SORT_OPTIONS.TITLE_ASC]: 'Title A-Z',
    [CONTENT_WEBINAR.SORT_OPTIONS.TITLE_DESC]: 'Title Z-A',
    [CONTENT_WEBINAR.SORT_OPTIONS.DATE_ASC]: 'Oldest First',
    [CONTENT_WEBINAR.SORT_OPTIONS.DATE_DESC]: 'Newest First',
    [CONTENT_WEBINAR.SORT_OPTIONS.REGISTRANTS]: 'Most Registrants',
    [CONTENT_WEBINAR.SORT_OPTIONS.ATTENDEES]: 'Most Attendees',
    [CONTENT_WEBINAR.SORT_OPTIONS.RATING]: 'Highest Rated',
    [CONTENT_WEBINAR.SORT_OPTIONS.POPULAR]: 'Most Popular',
    [CONTENT_WEBINAR.SORT_OPTIONS.CUSTOM]: 'Custom Sort',
  };
  return labels[sort] || 'Unknown Sort Option';
}

export function contentWebinarGetAudienceLabel(audience: ContentWebinarAudience): string {
  const labels: Record<ContentWebinarAudience, string> = {
    [CONTENT_WEBINAR.AUDIENCE.INTERNAL]: 'Internal',
    [CONTENT_WEBINAR.AUDIENCE.EXTERNAL]: 'External',
    [CONTENT_WEBINAR.AUDIENCE.CUSTOMERS]: 'Customers',
    [CONTENT_WEBINAR.AUDIENCE.PROSPECTS]: 'Prospects',
    [CONTENT_WEBINAR.AUDIENCE.PARTNERS]: 'Partners',
    [CONTENT_WEBINAR.AUDIENCE.PUBLIC]: 'Public',
    [CONTENT_WEBINAR.AUDIENCE.CUSTOM]: 'Custom Audience',
  };
  return labels[audience] || 'Unknown Audience';
}

export function contentWebinarIsPublished(status: ContentWebinarStatus): boolean {
  const publishedStatuses: ContentWebinarStatus[] = [
    CONTENT_WEBINAR.STATUSES.SCHEDULED,
    CONTENT_WEBINAR.STATUSES.UPCOMING,
    CONTENT_WEBINAR.STATUSES.LIVE,
    CONTENT_WEBINAR.STATUSES.ONGOING,
  ];
  return publishedStatuses.includes(status);
}

export function contentWebinarIsEditable(status: ContentWebinarStatus): boolean {
  const editableStatuses: ContentWebinarStatus[] = [
    CONTENT_WEBINAR.STATUSES.DRAFT,
    CONTENT_WEBINAR.STATUSES.PENDING_REVIEW,
    CONTENT_WEBINAR.STATUSES.IN_REVIEW,
    CONTENT_WEBINAR.STATUSES.REVIEWED,
    CONTENT_WEBINAR.STATUSES.PENDING_APPROVAL,
    CONTENT_WEBINAR.STATUSES.REJECTED,
    CONTENT_WEBINAR.STATUSES.SCHEDULED,
    CONTENT_WEBINAR.STATUSES.POSTPONED,
  ];
  return editableStatuses.includes(status);
}

export function contentWebinarIsLive(status: ContentWebinarStatus): boolean {
  const liveStatuses: ContentWebinarStatus[] = [
    CONTENT_WEBINAR.STATUSES.LIVE,
    CONTENT_WEBINAR.STATUSES.ONGOING,
  ];
  return liveStatuses.includes(status);
}

export function contentWebinarIsCompleted(status: ContentWebinarStatus): boolean {
  const completedStatuses: ContentWebinarStatus[] = [
    CONTENT_WEBINAR.STATUSES.COMPLETED,
    CONTENT_WEBINAR.STATUSES.CANCELLED,
    CONTENT_WEBINAR.STATUSES.ARCHIVED,
  ];
  return completedStatuses.includes(status);
}

export function contentWebinarGetDefaultStatus(): ContentWebinarStatus {
  return CONTENT_WEBINAR.DEFAULTS.STATUS as ContentWebinarStatus;
}

export function contentWebinarGetDefaultFormat(): ContentWebinarFormat {
  return CONTENT_WEBINAR.DEFAULTS.FORMAT as ContentWebinarFormat;
}

export function contentWebinarGetDefaultPlatform(): ContentWebinarPlatform {
  return CONTENT_WEBINAR.DEFAULTS.PLATFORM as ContentWebinarPlatform;
}

export function contentWebinarGetDefaultVisibility(): ContentWebinarVisibility {
  return CONTENT_WEBINAR.DEFAULTS.VISIBILITY as ContentWebinarVisibility;
}

export function contentWebinarGetDefaultSort(): ContentWebinarSortOption {
  return CONTENT_WEBINAR.DEFAULTS.SORT as ContentWebinarSortOption;
}

export function contentWebinarGetDefaultDuration(): number {
  return CONTENT_WEBINAR.DEFAULTS.DURATION;
}

export function contentWebinarGetDefaultMaxAttendees(): number {
  return CONTENT_WEBINAR.DEFAULTS.MAX_ATTENDEES;
}

export function contentWebinarGetMaxTitleLength(): number {
  return CONTENT_WEBINAR.LIMITS.MAX_TITLE_LENGTH;
}

export function contentWebinarGetMaxDescriptionLength(): number {
  return CONTENT_WEBINAR.LIMITS.MAX_DESCRIPTION_LENGTH;
}

export function contentWebinarGetMaxDurationMinutes(): number {
  return CONTENT_WEBINAR.LIMITS.MAX_DURATION_MINUTES;
}

export function contentWebinarGetMinDurationMinutes(): number {
  return CONTENT_WEBINAR.LIMITS.MIN_DURATION_MINUTES;
}

export function contentWebinarGetMaxAttendees(): number {
  return CONTENT_WEBINAR.LIMITS.MAX_ATTENDEES;
}

export function contentWebinarIsValidType(type: string): type is ContentWebinarType {
  return Object.values(CONTENT_WEBINAR.TYPES).includes(type as ContentWebinarType);
}

export function contentWebinarIsValidStatus(status: string): status is ContentWebinarStatus {
  return Object.values(CONTENT_WEBINAR.STATUSES).includes(status as ContentWebinarStatus);
}

export function contentWebinarIsValidFormat(format: string): format is ContentWebinarFormat {
  return Object.values(CONTENT_WEBINAR.FORMATS).includes(format as ContentWebinarFormat);
}

export function contentWebinarIsValidPlatform(
  platform: string
): platform is ContentWebinarPlatform {
  return Object.values(CONTENT_WEBINAR.PLATFORMS).includes(platform as ContentWebinarPlatform);
}
