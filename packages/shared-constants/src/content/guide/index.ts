/**
 * Guide Constants Index
 * Export all guide constants and types for easy importing
 */

// Guide Constants
export {
  CONTENT_GUIDE,
  contentGuideGetTypeLabel,
  contentGuideGetStatusLabel,
  contentGuideGetFormatLabel,
  contentGuideGetLevelLabel,
  contentGuideGetVisibilityLabel,
  contentGuideGetSortOptionLabel,
  contentGuideIsPublished,
  contentGuideIsEditable,
  contentGuideIsApproved,
  contentGuideGetDefaultStatus,
  contentGuideGetDefaultFormat,
  contentGuideGetDefaultLevel,
  contentGuideGetDefaultVisibility,
  contentGuideGetDefaultSort,
  contentGuideGetMaxTitleLength,
  contentGuideGetMaxDescriptionLength,
  contentGuideGetMaxContentLength,
  contentGuideGetMaxSteps,
  contentGuideGetMinSteps,
  contentGuideIsValidType,
  contentGuideIsValidStatus,
  contentGuideIsValidFormat,
  contentGuideIsValidLevel,
} from './guide.constants';

export type {
  ContentGuideType,
  ContentGuideStatus,
  ContentGuideFormat,
  ContentGuideLevel,
  ContentGuideVisibility,
  ContentGuideSortOption,
} from './guide.constants';

// Guide Status Constants
export {
  CONTENT_GUIDE_STATUS,
  contentGuideStatusGetLabel,
  contentGuideStatusGetCategory,
  contentGuideStatusGetColor,
  contentGuideStatusGetPriority,
  contentGuideStatusIsPublished,
  contentGuideStatusIsEditable,
  contentGuideStatusIsApproved,
  contentGuideStatusIsArchived,
  contentGuideStatusCanTransitionTo,
  contentGuideStatusGetAvailableTransitions,
  contentGuideStatusGetSequence,
  contentGuideStatusGetStateLabel,
  contentGuideStatusGetActionLabel,
  contentGuideStatusIsValid,
  contentGuideStatusIsValidState,
} from './guide-status.constants';

export type {
  ContentGuideStatusType,
  ContentGuideStatusCategory,
  ContentGuideStatusColor,
  ContentGuideStatusPriority,
  ContentGuideState,
  ContentGuideAction,
} from './guide-status.constants';

// Guide Type Constants
export {
  CONTENT_GUIDE_TYPE,
  contentGuideTypeGetCategoryLabel,
  contentGuideTypeGetPurposeLabel,
  contentGuideTypeGetAudienceLabel,
  contentGuideTypeGetComplexityLabel,
  contentGuideTypeGetInteractionLabel,
  contentGuideTypeGetQualityLabel,
  contentGuideTypeGetLanguageLabel,
  contentGuideTypeIsValidCategory,
  contentGuideTypeIsValidPurpose,
  contentGuideTypeIsValidAudience,
} from './guide-type.constants';

export type {
  ContentGuideTypeCategory,
  ContentGuideTypePurpose,
  ContentGuideTypeAudience,
  ContentGuideTypeComplexity,
  ContentGuideTypeInteraction,
  ContentGuideTypeQuality,
  ContentGuideTypeLanguage,
} from './guide-type.constants';
