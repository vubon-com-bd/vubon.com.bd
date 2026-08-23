/**
 * Video Constants Index
 * Export all video constants and types for easy importing
 */

// Video Constants
export {
  CONTENT_VIDEO,
  contentVideoGetTypeLabel,
  contentVideoGetStatusLabel,
  contentVideoGetFormatLabel,
  contentVideoGetResolutionLabel,
  contentVideoGetQualityLabel,
  contentVideoGetAspectRatioLabel,
  contentVideoGetVisibilityLabel,
  contentVideoGetSortOptionLabel,
  contentVideoGetDimension,
  contentVideoIsPublished,
  contentVideoIsEditable,
  contentVideoIsApproved,
  contentVideoIsProcessing,
  contentVideoGetDefaultStatus,
  contentVideoGetDefaultFormat,
  contentVideoGetDefaultResolution,
  contentVideoGetDefaultVisibility,
  contentVideoGetDefaultSort,
  contentVideoGetMaxTitleLength,
  contentVideoGetMaxDescriptionLength,
  contentVideoGetMaxDurationSeconds,
  contentVideoGetMinDurationSeconds,
  contentVideoGetMaxFileSizeGB,
  contentVideoIsValidType,
  contentVideoIsValidStatus,
  contentVideoIsValidFormat,
  contentVideoIsValidResolution,
  contentVideoIsValidAspectRatio,
} from './video.constants';

export type {
  ContentVideoType,
  ContentVideoStatus,
  ContentVideoFormat,
  ContentVideoResolution,
  ContentVideoQuality,
  ContentVideoAspectRatio,
  ContentVideoVisibility,
  ContentVideoSortOption,
  ContentVideoDimension,
  ContentVideoFrameRate,
} from './video.constants';

// Video Status Constants
export {
  CONTENT_VIDEO_STATUS,
  contentVideoStatusGetLabel,
  contentVideoStatusGetCategory,
  contentVideoStatusGetColor,
  contentVideoStatusGetPriority,
  contentVideoStatusIsPublished,
  contentVideoStatusIsEditable,
  contentVideoStatusIsProcessing,
  contentVideoStatusIsArchived,
  contentVideoStatusCanTransitionTo,
  contentVideoStatusGetAvailableTransitions,
  contentVideoStatusGetSequence,
  contentVideoStatusGetStateLabel,
  contentVideoStatusGetActionLabel,
  contentVideoStatusIsValid,
  contentVideoStatusIsValidState,
} from './video-status.constants';

export type {
  ContentVideoStatusType,
  ContentVideoStatusCategory,
  ContentVideoStatusColor,
  ContentVideoStatusPriority,
  ContentVideoState,
  ContentVideoAction,
} from './video-status.constants';

// Video Type Constants
export {
  CONTENT_VIDEO_TYPE,
  contentVideoTypeGetCategoryLabel,
  contentVideoTypeGetSubTypeLabel,
  contentVideoTypeGetScopeLabel,
  contentVideoTypeGetAudienceLabel,
  contentVideoTypeGetComplexityLabel,
  contentVideoTypeGetQualityLabel,
  contentVideoTypeGetLanguageLabel,
  contentVideoTypeIsValidCategory,
  contentVideoTypeIsValidScope,
  contentVideoTypeIsValidAudience,
} from './video-type.constants';

export type {
  ContentVideoTypeCategory,
  ContentVideoTypeSubType,
  ContentVideoTypeScope,
  ContentVideoTypeAudience,
  ContentVideoTypeComplexity,
  ContentVideoTypeQuality,
  ContentVideoTypeLanguage,
} from './video-type.constants';
