/**
 * White Paper Constants Index
 * Export all white paper constants and types for easy importing
 */

// White Paper Constants
export {
  CONTENT_WHITE_PAPER,
  contentWhitePaperGetTypeLabel,
  contentWhitePaperGetStatusLabel,
  contentWhitePaperGetFormatLabel,
  contentWhitePaperGetIndustryLabel,
  contentWhitePaperGetLevelLabel,
  contentWhitePaperGetVisibilityLabel,
  contentWhitePaperGetSortOptionLabel,
  contentWhitePaperIsPublished,
  contentWhitePaperIsEditable,
  contentWhitePaperIsApproved,
  contentWhitePaperGetDefaultStatus,
  contentWhitePaperGetDefaultFormat,
  contentWhitePaperGetDefaultLevel,
  contentWhitePaperGetDefaultVisibility,
  contentWhitePaperGetDefaultSort,
  contentWhitePaperGetMaxTitleLength,
  contentWhitePaperGetMaxDescriptionLength,
  contentWhitePaperGetMaxContentLength,
  contentWhitePaperGetMinContentLength,
  contentWhitePaperGetMaxAuthors,
  contentWhitePaperGetMaxReferences,
  contentWhitePaperIsValidType,
  contentWhitePaperIsValidStatus,
  contentWhitePaperIsValidFormat,
  contentWhitePaperIsValidIndustry,
  contentWhitePaperIsValidLevel,
} from './white-paper.constants';

export type {
  ContentWhitePaperType,
  ContentWhitePaperStatus,
  ContentWhitePaperFormat,
  ContentWhitePaperIndustry,
  ContentWhitePaperLevel,
  ContentWhitePaperVisibility,
  ContentWhitePaperSortOption,
} from './white-paper.constants';

// White Paper Status Constants
export {
  CONTENT_WHITE_PAPER_STATUS,
  contentWhitePaperStatusGetLabel,
  contentWhitePaperStatusGetCategory,
  contentWhitePaperStatusGetColor,
  contentWhitePaperStatusGetPriority,
  contentWhitePaperStatusIsPublished,
  contentWhitePaperStatusIsEditable,
  contentWhitePaperStatusIsApproved,
  contentWhitePaperStatusIsArchived,
  contentWhitePaperStatusCanTransitionTo,
  contentWhitePaperStatusGetAvailableTransitions,
  contentWhitePaperStatusGetSequence,
  contentWhitePaperStatusGetStateLabel,
  contentWhitePaperStatusGetActionLabel,
  contentWhitePaperStatusIsValid,
  contentWhitePaperStatusIsValidState,
} from './white-paper-status.constants';

export type {
  ContentWhitePaperStatusType,
  ContentWhitePaperStatusCategory,
  ContentWhitePaperStatusColor,
  ContentWhitePaperStatusPriority,
  ContentWhitePaperState,
  ContentWhitePaperAction,
} from './white-paper-status.constants';

// White Paper Type Constants
export {
  CONTENT_WHITE_PAPER_TYPE,
  contentWhitePaperTypeGetCategoryLabel,
  contentWhitePaperTypeGetSubTypeLabel,
  contentWhitePaperTypeGetScopeLabel,
  contentWhitePaperTypeGetAudienceLabel,
  contentWhitePaperTypeGetComplexityLabel,
  contentWhitePaperTypeGetQualityLabel,
  contentWhitePaperTypeGetLanguageLabel,
  contentWhitePaperTypeIsValidCategory,
  contentWhitePaperTypeIsValidScope,
  contentWhitePaperTypeIsValidAudience,
} from './white-paper-type.constants';

export type {
  ContentWhitePaperTypeCategory,
  ContentWhitePaperTypeSubType,
  ContentWhitePaperTypeScope,
  ContentWhitePaperTypeAudience,
  ContentWhitePaperTypeComplexity,
  ContentWhitePaperTypeQuality,
  ContentWhitePaperTypeLanguage,
} from './white-paper-type.constants';
