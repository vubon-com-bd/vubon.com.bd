/**
 * FAQ Constants Index
 * Export all FAQ constants and types for easy importing
 */

// FAQ Constants
export {
  CONTENT_FAQ,
  contentFaqGetTypeLabel,
  contentFaqGetStatusLabel,
  contentFaqGetCategoryLabel,
  contentFaqGetFormatLabel,
  contentFaqGetVisibilityLabel,
  contentFaqGetHelpfulStatusLabel,
  contentFaqIsPublished,
  contentFaqIsEditable,
  contentFaqIsApproved,
  contentFaqGetDefaultStatus,
  contentFaqGetDefaultFormat,
  contentFaqGetDefaultVisibility,
  contentFaqGetDefaultCategory,
  contentFaqGetMaxQuestionLength,
  contentFaqGetMaxAnswerLength,
  contentFaqGetMinAnswerLength,
  contentFaqIsValidType,
  contentFaqIsValidStatus,
  contentFaqIsValidCategory,
  contentFaqIsValidFormat,
} from './faq.constants';

export type {
  ContentFAQType,
  ContentFAQStatus,
  ContentFAQCategory,
  ContentFAQFormat,
  ContentFAQVisibility,
  ContentFAQHelpfulStatus,
} from './faq.constants';

// FAQ Status Constants
export {
  CONTENT_FAQ_STATUS,
  contentFaqStatusGetLabel,
  contentFaqStatusGetCategory,
  contentFaqStatusGetColor,
  contentFaqStatusGetPriority,
  contentFaqStatusIsPublished,
  contentFaqStatusIsEditable,
  contentFaqStatusIsApproved,
  contentFaqStatusIsArchived,
  contentFaqStatusCanTransitionTo,
  contentFaqStatusGetAvailableTransitions,
  contentFaqStatusGetSequence,
  contentFaqStatusGetStateLabel,
  contentFaqStatusGetActionLabel,
  contentFaqStatusIsValid,
  contentFaqStatusIsValidState,
} from './faq-status.constants';

export type {
  ContentFAQStatusType,
  ContentFAQStatusCategory,
  ContentFAQStatusColor,
  ContentFAQStatusPriority,
  ContentFAQState,
  ContentFAQAction,
} from './faq-status.constants';

// FAQ Category Constants
export {
  CONTENT_FAQ_CATEGORY,
  contentFaqCategoryGetMainLabel,
  contentFaqCategoryGetSubLabel,
  contentFaqCategoryGetTypeLabel,
  contentFaqCategoryGetVisibilityLabel,
  contentFaqCategoryGetHierarchyLabel,
  contentFaqCategoryGetSortOptionLabel,
  contentFaqCategoryIsValidMain,
  contentFaqCategoryIsValidSub,
  contentFaqCategoryGetSubCategories,
} from './faq-category.constants';

export type {
  ContentFAQCategoryMain,
  ContentFAQCategorySub,
  ContentFAQCategoryType,
  ContentFAQCategoryVisibility,
  ContentFAQCategoryHierarchy,
  ContentFAQCategorySortOption,
} from './faq-category.constants';
