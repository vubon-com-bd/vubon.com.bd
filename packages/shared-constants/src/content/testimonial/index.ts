/**
 * Testimonial Constants Index
 * Export all testimonial constants and types for easy importing
 */

// Testimonial Constants
export {
  CONTENT_TESTIMONIAL,
  contentTestimonialGetTypeLabel,
  contentTestimonialGetStatusLabel,
  contentTestimonialGetRatingLabel,
  contentTestimonialGetFormatLabel,
  contentTestimonialGetSourceLabel,
  contentTestimonialGetVisibilityLabel,
  contentTestimonialGetDisplayLabel,
  contentTestimonialIsPublished,
  contentTestimonialIsEditable,
  contentTestimonialIsApproved,
  contentTestimonialGetDefaultStatus,
  contentTestimonialGetDefaultRating,
  contentTestimonialGetDefaultFormat,
  contentTestimonialGetDefaultSource,
  contentTestimonialGetDefaultVisibility,
  contentTestimonialGetDefaultDisplay,
  contentTestimonialGetMaxContentLength,
  contentTestimonialGetMaxNameLength,
  contentTestimonialGetMaxTitleLength,
  contentTestimonialIsValidType,
  contentTestimonialIsValidStatus,
  contentTestimonialIsValidRating,
  contentTestimonialIsValidFormat,
  contentTestimonialIsValidSource,
} from './testimonial.constants';

export type {
  ContentTestimonialType,
  ContentTestimonialStatus,
  ContentTestimonialRating,
  ContentTestimonialFormat,
  ContentTestimonialSource,
  ContentTestimonialVisibility,
  ContentTestimonialDisplay,
} from './testimonial.constants';

// Testimonial Status Constants
export {
  CONTENT_TESTIMONIAL_STATUS,
  contentTestimonialStatusGetLabel,
  contentTestimonialStatusGetCategory,
  contentTestimonialStatusGetColor,
  contentTestimonialStatusGetPriority,
  contentTestimonialStatusIsPublished,
  contentTestimonialStatusIsEditable,
  contentTestimonialStatusIsApproved,
  contentTestimonialStatusIsArchived,
  contentTestimonialStatusCanTransitionTo,
  contentTestimonialStatusGetAvailableTransitions,
  contentTestimonialStatusGetSequence,
  contentTestimonialStatusGetStateLabel,
  contentTestimonialStatusGetActionLabel,
  contentTestimonialStatusIsValid,
  contentTestimonialStatusIsValidState,
} from './testimonial-status.constants';

export type {
  ContentTestimonialStatusType,
  ContentTestimonialStatusCategory,
  ContentTestimonialStatusColor,
  ContentTestimonialStatusPriority,
  ContentTestimonialState,
  ContentTestimonialAction,
} from './testimonial-status.constants';

// Testimonial Type Constants
export {
  CONTENT_TESTIMONIAL_TYPE,
  contentTestimonialTypeGetCategoryLabel,
  contentTestimonialTypeGetSubTypeLabel,
  contentTestimonialTypeGetSentimentLabel,
  contentTestimonialTypeGetAuthenticityLabel,
  contentTestimonialTypeGetImpactLabel,
  contentTestimonialTypeGetLanguageLabel,
  contentTestimonialTypeIsValidCategory,
  contentTestimonialTypeIsValidSentiment,
} from './testimonial-type.constants';

export type {
  ContentTestimonialTypeCategory,
  ContentTestimonialTypeSubType,
  ContentTestimonialTypeSentiment,
  ContentTestimonialTypeAuthenticity,
  ContentTestimonialTypeImpact,
  ContentTestimonialTypeLanguage,
} from './testimonial-type.constants';
