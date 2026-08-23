/**
 * Webinar Constants Index
 * Export all webinar constants and types for easy importing
 */

// Webinar Constants
export {
  CONTENT_WEBINAR,
  contentWebinarGetTypeLabel,
  contentWebinarGetStatusLabel,
  contentWebinarGetFormatLabel,
  contentWebinarGetPlatformLabel,
  contentWebinarGetRecordingStatusLabel,
  contentWebinarGetVisibilityLabel,
  contentWebinarGetSortOptionLabel,
  contentWebinarGetAudienceLabel,
  contentWebinarIsPublished,
  contentWebinarIsEditable,
  contentWebinarIsLive,
  contentWebinarIsCompleted,
  contentWebinarGetDefaultStatus,
  contentWebinarGetDefaultFormat,
  contentWebinarGetDefaultPlatform,
  contentWebinarGetDefaultVisibility,
  contentWebinarGetDefaultSort,
  contentWebinarGetDefaultDuration,
  contentWebinarGetDefaultMaxAttendees,
  contentWebinarGetMaxTitleLength,
  contentWebinarGetMaxDescriptionLength,
  contentWebinarGetMaxDurationMinutes,
  contentWebinarGetMinDurationMinutes,
  contentWebinarGetMaxAttendees,
  contentWebinarIsValidType,
  contentWebinarIsValidStatus,
  contentWebinarIsValidFormat,
  contentWebinarIsValidPlatform,
} from './webinar.constants';

export type {
  ContentWebinarType,
  ContentWebinarStatus,
  ContentWebinarFormat,
  ContentWebinarPlatform,
  ContentWebinarRecordingStatus,
  ContentWebinarVisibility,
  ContentWebinarSortOption,
  ContentWebinarAudience,
} from './webinar.constants';

// Webinar Status Constants
export {
  CONTENT_WEBINAR_STATUS,
  contentWebinarStatusGetLabel,
  contentWebinarStatusGetCategory,
  contentWebinarStatusGetColor,
  contentWebinarStatusGetPriority,
  contentWebinarStatusIsPublished,
  contentWebinarStatusIsEditable,
  contentWebinarStatusIsLive,
  contentWebinarStatusIsCompleted,
  contentWebinarStatusCanTransitionTo,
  contentWebinarStatusGetAvailableTransitions,
  contentWebinarStatusGetSequence,
  contentWebinarStatusGetStateLabel,
  contentWebinarStatusGetActionLabel,
  contentWebinarStatusIsValid,
  contentWebinarStatusIsValidState,
} from './webinar-status.constants';

export type {
  ContentWebinarStatusType,
  ContentWebinarStatusCategory,
  ContentWebinarStatusColor,
  ContentWebinarStatusPriority,
  ContentWebinarState,
  ContentWebinarAction,
} from './webinar-status.constants';

// Webinar Type Constants
export {
  CONTENT_WEBINAR_TYPE,
  contentWebinarTypeGetCategoryLabel,
  contentWebinarTypeGetSubTypeLabel,
  contentWebinarTypeGetScopeLabel,
  contentWebinarTypeGetComplexityLabel,
  contentWebinarTypeGetProductionQualityLabel,
  contentWebinarTypeGetLanguageLabel,
  contentWebinarTypeGetInteractivityLabel,
  contentWebinarTypeIsValidCategory,
  contentWebinarTypeIsValidScope,
} from './webinar-type.constants';

export type {
  ContentWebinarTypeCategory,
  ContentWebinarTypeSubType,
  ContentWebinarTypeScope,
  ContentWebinarTypeComplexity,
  ContentWebinarTypeProductionQuality,
  ContentWebinarTypeLanguage,
  ContentWebinarTypeInteractivity,
} from './webinar-type.constants';
