/**
 * E-Book Constants Index
 * Export all e-book constants and types for easy importing
 */

// E-Book Constants
export {
  CONTENT_E_BOOK,
  contentEBookGetTypeLabel,
  contentEBookGetStatusLabel,
  contentEBookGetFormatLabel,
  contentEBookGetGenreLabel,
  contentEBookGetLanguageLabel,
  contentEBookGetVisibilityLabel,
  contentEBookGetSortOptionLabel,
  contentEBookIsPublished,
  contentEBookIsEditable,
  contentEBookIsApproved,
  contentEBookGetDefaultStatus,
  contentEBookGetDefaultFormat,
  contentEBookGetDefaultVisibility,
  contentEBookGetDefaultSort,
  contentEBookGetMaxTitleLength,
  contentEBookGetMaxDescriptionLength,
  contentEBookGetMaxContentLength,
  contentEBookGetMaxPages,
  contentEBookGetMinPages,
  contentEBookGetMaxAuthors,
  contentEBookIsValidType,
  contentEBookIsValidStatus,
  contentEBookIsValidFormat,
  contentEBookIsValidGenre,
  contentEBookIsValidLanguage,
} from './e-book.constants';

export type {
  ContentEBookType,
  ContentEBookStatus,
  ContentEBookFormat,
  ContentEBookGenre,
  ContentEBookLanguage,
  ContentEBookVisibility,
  ContentEBookSortOption,
} from './e-book.constants';

// E-Book Status Constants
export {
  CONTENT_E_BOOK_STATUS,
  contentEBookStatusGetLabel,
  contentEBookStatusGetCategory,
  contentEBookStatusGetColor,
  contentEBookStatusGetPriority,
  contentEBookStatusIsPublished,
  contentEBookStatusIsEditable,
  contentEBookStatusIsApproved,
  contentEBookStatusIsArchived,
  contentEBookStatusCanTransitionTo,
  contentEBookStatusGetAvailableTransitions,
  contentEBookStatusGetSequence,
  contentEBookStatusGetStateLabel,
  contentEBookStatusGetActionLabel,
  contentEBookStatusIsValid,
  contentEBookStatusIsValidState,
} from './e-book-status.constants';

export type {
  ContentEBookStatusType,
  ContentEBookStatusCategory,
  ContentEBookStatusColor,
  ContentEBookStatusPriority,
  ContentEBookState,
  ContentEBookAction,
} from './e-book-status.constants';

// E-Book Type Constants
export {
  CONTENT_E_BOOK_TYPE,
  contentEBookTypeGetCategoryLabel,
  contentEBookTypeGetSubTypeLabel,
  contentEBookTypeGetScopeLabel,
  contentEBookTypeGetAudienceLabel,
  contentEBookTypeGetComplexityLabel,
  contentEBookTypeGetQualityLabel,
  contentEBookTypeGetRightsLabel,
  contentEBookTypeIsValidCategory,
  contentEBookTypeIsValidScope,
  contentEBookTypeIsValidAudience,
} from './e-book-type.constants';

export type {
  ContentEBookTypeCategory,
  ContentEBookTypeSubType,
  ContentEBookTypeScope,
  ContentEBookTypeAudience,
  ContentEBookTypeComplexity,
  ContentEBookTypeQuality,
  ContentEBookTypeRights,
} from './e-book-type.constants';
