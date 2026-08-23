/**
 * Case Study Constants Index
 * Export all case study constants and types for easy importing
 */

// Case Study Constants
export {
  CONTENT_CASE_STUDY,
  contentCaseStudyGetTypeLabel,
  contentCaseStudyGetStatusLabel,
  contentCaseStudyGetFormatLabel,
  contentCaseStudyGetIndustryLabel,
  contentCaseStudyGetResultLabel,
  contentCaseStudyGetVisibilityLabel,
  contentCaseStudyGetSortOptionLabel,
  contentCaseStudyIsPublished,
  contentCaseStudyIsEditable,
  contentCaseStudyIsApproved,
  contentCaseStudyGetDefaultStatus,
  contentCaseStudyGetDefaultFormat,
  contentCaseStudyGetDefaultVisibility,
  contentCaseStudyGetDefaultSort,
  contentCaseStudyGetMaxTitleLength,
  contentCaseStudyGetMaxDescriptionLength,
  contentCaseStudyGetMaxContentLength,
  contentCaseStudyGetMinContentLength,
  contentCaseStudyGetMaxImages,
  contentCaseStudyIsValidType,
  contentCaseStudyIsValidStatus,
  contentCaseStudyIsValidFormat,
  contentCaseStudyIsValidIndustry,
  contentCaseStudyIsValidResult,
} from './case-study.constants';

export type {
  ContentCaseStudyType,
  ContentCaseStudyStatus,
  ContentCaseStudyFormat,
  ContentCaseStudyIndustry,
  ContentCaseStudyResult,
  ContentCaseStudyVisibility,
  ContentCaseStudySortOption,
} from './case-study.constants';

// Case Study Status Constants
export {
  CONTENT_CASE_STUDY_STATUS,
  contentCaseStudyStatusGetLabel,
  contentCaseStudyStatusGetCategory,
  contentCaseStudyStatusGetColor,
  contentCaseStudyStatusGetPriority,
  contentCaseStudyStatusIsPublished,
  contentCaseStudyStatusIsEditable,
  contentCaseStudyStatusIsApproved,
  contentCaseStudyStatusIsArchived,
  contentCaseStudyStatusCanTransitionTo,
  contentCaseStudyStatusGetAvailableTransitions,
  contentCaseStudyStatusGetSequence,
  contentCaseStudyStatusGetStateLabel,
  contentCaseStudyStatusGetActionLabel,
  contentCaseStudyStatusIsValid,
  contentCaseStudyStatusIsValidState,
} from './case-study-status.constants';

export type {
  ContentCaseStudyStatusType,
  ContentCaseStudyStatusCategory,
  ContentCaseStudyStatusColor,
  ContentCaseStudyStatusPriority,
  ContentCaseStudyState,
  ContentCaseStudyAction,
} from './case-study-status.constants';

// Case Study Type Constants
export {
  CONTENT_CASE_STUDY_TYPE,
  contentCaseStudyTypeGetCategoryLabel,
  contentCaseStudyTypeGetSubTypeLabel,
  contentCaseStudyTypeGetScopeLabel,
  contentCaseStudyTypeGetAudienceLabel,
  contentCaseStudyTypeGetComplexityLabel,
  contentCaseStudyTypeGetQualityLabel,
  contentCaseStudyTypeGetLanguageLabel,
  contentCaseStudyTypeIsValidCategory,
  contentCaseStudyTypeIsValidScope,
  contentCaseStudyTypeIsValidAudience,
} from './case-study-type.constants';

export type {
  ContentCaseStudyTypeCategory,
  ContentCaseStudyTypeSubType,
  ContentCaseStudyTypeScope,
  ContentCaseStudyTypeAudience,
  ContentCaseStudyTypeComplexity,
  ContentCaseStudyTypeQuality,
  ContentCaseStudyTypeLanguage,
} from './case-study-type.constants';
