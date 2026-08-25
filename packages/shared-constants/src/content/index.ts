/**
 * Content Constants Index
 * Export all content constants and types for easy importing
 */

// Content Error Constants
export {
  CONTENT_ERROR,
  contentErrorGetMessage,
  contentErrorGetHTTPStatus,
  contentErrorGetSeverity,
  contentErrorGetCategory,
  contentErrorIsCritical,
  contentErrorIsRetryable,
  contentErrorIsValidationError,
  contentErrorIsPermissionError,
  contentErrorIsNotFound,
  contentErrorIsValidType,
} from './content-error.constants';

export type {
  ContentErrorType,
  ContentErrorSeverity,
  ContentErrorCategory,
  ContentErrorHTTPStatus,
} from './content-error.constants';

// Content Main Constants
export {
  CONTENT,
  contentGetTypeLabel,
  contentGetStatusLabel,
  contentGetCategoryLabel,
  contentGetTagLabel,
  contentGetFormatLabel,
  contentGetLanguageLabel,
  contentGetLicenseLabel,
  contentGetVisibilityLabel,
  contentIsPublished,
  contentIsEditable,
  contentIsValidType,
  contentIsValidStatus,
  contentIsValidCategory,
  contentIsValidTag,
  contentIsValidFormat,
  contentIsValidLanguage,
  contentIsValidLicense,
  contentGetDefaultLanguage,
  contentGetDefaultFormat,
  contentGetDefaultVisibility,
  contentGetDefaultStatus,
  contentGetMaxTags,
  contentGetMaxCategories,
  contentGetMaxWords,
  contentGetMinWords,
} from './content.constants';

export type {
  ContentType,
  ContentStatus,
  ContentCategory,
  ContentTag,
  ContentFormat,
  ContentLanguage,
  ContentLicense,
  ContentVisibility,
  ContentAccess,
} from './content.constants';

// Content Type Constants
export {
  CONTENT_TYPE,
  contentTypeGetCategoryLabel,
  contentTypeGetComplexityLabel,
  contentTypeGetPurposeLabel,
  contentTypeGetAudienceLabel,
  contentTypeGetToneLabel,
  contentTypeGetFormatLabel,
  contentTypeGetQualityLabel,
  contentTypeIsValidCategory,
  contentTypeIsValidPurpose,
} from './content-type.constants';

export type {
  ContentTypeCategory,
  ContentTypeComplexity,
  ContentTypePurpose,
  ContentTypeAudience,
  ContentTypeTone,
  ContentTypeFormat,
  ContentTypeQuality,
} from './content-type.constants';

// Content Status Constants
export {
  CONTENT_STATUS,
  contentStatusGetLabel,
  contentStatusGetCategory,
  contentStatusGetColor,
  contentStatusGetPriority,
  contentStatusIsPublished,
  contentStatusIsEditable,
  contentStatusIsArchived,
  contentStatusCanTransitionTo,
  contentStatusGetAvailableTransitions,
  contentStatusGetSequence,
  contentStatusGetStateLabel,
  contentStatusGetActionLabel,
  contentStatusIsValid,
  contentStatusIsValidState,
} from './content-status.constants';

export type {
  ContentStatusType,
  ContentStatusCategory,
  ContentStatusColor,
  ContentStatusPriority,
  ContentState,
  ContentAction,
} from './content-status.constants';

// Content Category Constants
export {
  CONTENT_CATEGORY,
  contentCategoryGetMainLabel,
  contentCategoryGetSubLabel,
  contentCategoryGetHierarchyLabel,
  contentCategoryGetTypeLabel,
  contentCategoryGetVisibilityLabel,
  contentCategoryIsValidMain,
  contentCategoryIsValidSub,
  contentCategoryGetSubCategories,
} from './content-category.constants';

export type {
  ContentMainCategory,
  ContentSubCategory,
  ContentCategoryHierarchy,
  ContentCategoryType,
  ContentCategoryVisibility,
} from './content-category.constants';

// Content Tag Constants
export {
  CONTENT_TAG,
  contentTagGetPopularLabel,
  contentTagGetTopicLabel,
  contentTagGetTypeLabel,
  contentTagGetAudienceLabel,
  contentTagGetColor,
  contentTagGetCategory,
  contentTagIsValidPopular,
  contentTagIsValidTopic,
  contentTagIsValidType,
  contentTagIsValidAudience,
} from './content-tag.constants';

export type {
  ContentPopularTag,
  ContentTopicTag,
  ContentTypeTag,
  ContentAudienceTag,
  ContentTagColor,
  ContentTagCategory,
} from './content-tag.constants';

// Content Format Constants
export {
  CONTENT_FORMAT,
  contentFormatGetLabel,
  contentFormatGetMimeType,
  contentFormatGetExtension,
  contentFormatGetCategory,
  contentFormatHasCapability,
  contentFormatIsValid,
} from './content-format.constants';

export type {
  ContentFormatType,
  ContentFormatMimeType,
  ContentFormatExtension,
  ContentFormatCategory,
  ContentFormatCapability,
} from './content-format.constants';

// Content Language Constants
export {
  CONTENT_LANGUAGE,
  contentLanguageGetName,
  contentLanguageGetNativeName,
  contentLanguageGetFamily,
  contentLanguageGetScript,
  contentLanguageIsRTL,
  contentLanguageGetFallback,
  contentLanguageIsValid,
  contentLanguageGetDefault,
  contentLanguageGetAllCodes,
  contentLanguageGetAllNames,
} from './content-language.constants';

export type {
  ContentLanguageCode,
  ContentLanguageName,
  ContentLanguageNativeName,
  ContentLanguageFamily,
  ContentLanguageScript,
  ContentLanguageStatus,
  ContentRTLanguage,
} from './content-language.constants';

// Content License Constants
export {
  CONTENT_LICENSE,
  contentLicenseGetLabel,
  contentLicenseGetCategory,
  contentLicenseGetVersion,
  contentLicenseGetURL,
  contentLicenseHasPermission,
  contentLicenseHasRestriction,
  contentLicenseIsCompatible,
  contentLicenseIsValid,
  contentLicenseIsOpenSource,
} from './content-license.constants';

export type {
  ContentLicenseType,
  ContentLicenseCategory,
  ContentLicensePermission,
  ContentLicenseRestriction,
  ContentLicenseCondition,
  ContentLicenseVersion,
  ContentLicenseURL,
} from './content-license.constants';

// announcement Constants
export * from './announcement';

// blog Constants
export * from './blog';

// case-study Constants
export * from './case-study';

// e-book Constants
export * from './e-book';

// faq Constants
export * from './faq';

// gallery Constants
export * from './gallery';

// guide Constants
export * from './guide';

// media Constants
export * from './media';

// newsletter Constants
export * from './newsletter';

// page Constants
export * from './page';

// podcast Constants
export * from './podcast';

// seo Constants
export * from './seo';

// testimonial Constants
export * from './testimonial';

// video Constants
export * from './video';

// webinar Constants
export * from './webinar';

// white-paper Constants
export * from './white-paper';
