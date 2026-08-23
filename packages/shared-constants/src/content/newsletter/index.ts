/**
 * Newsletter Constants Index
 * Export all newsletter constants and types for easy importing
 */

// Newsletter Constants
export {
  CONTENT_NEWSLETTER,
  contentNewsletterGetTypeLabel,
  contentNewsletterGetStatusLabel,
  contentNewsletterGetFormatLabel,
  contentNewsletterGetTemplateLabel,
  contentNewsletterGetFrequencyLabel,
  contentNewsletterGetSendingDayLabel,
  contentNewsletterGetAnalyticLabel,
  contentNewsletterGetBounceTypeLabel,
  contentNewsletterIsPublished,
  contentNewsletterIsEditable,
  contentNewsletterIsSending,
  contentNewsletterGetDefaultStatus,
  contentNewsletterGetDefaultFormat,
  contentNewsletterGetDefaultTemplate,
  contentNewsletterGetDefaultFrequency,
  contentNewsletterGetDefaultSendingDay,
  contentNewsletterGetDefaultTimezone,
  contentNewsletterGetMaxSubjectLength,
  contentNewsletterGetMaxPreviewLength,
  contentNewsletterGetMaxContentLength,
  contentNewsletterGetMaxRecipients,
  contentNewsletterIsValidType,
  contentNewsletterIsValidStatus,
  contentNewsletterIsValidFormat,
  contentNewsletterIsValidFrequency,
} from './newsletter.constants';

export type {
  ContentNewsletterType,
  ContentNewsletterStatus,
  ContentNewsletterFormat,
  ContentNewsletterTemplate,
  ContentNewsletterFrequency,
  ContentNewsletterSendingDay,
  ContentNewsletterTimezone,
  ContentNewsletterAnalytic,
  ContentNewsletterBounceType,
} from './newsletter.constants';

// Newsletter Status Constants
export {
  CONTENT_NEWSLETTER_STATUS,
  contentNewsletterStatusGetLabel,
  contentNewsletterStatusGetCategory,
  contentNewsletterStatusGetColor,
  contentNewsletterStatusGetPriority,
  contentNewsletterStatusIsPublished,
  contentNewsletterStatusIsEditable,
  contentNewsletterStatusIsSending,
  contentNewsletterStatusIsArchived,
  contentNewsletterStatusCanTransitionTo,
  contentNewsletterStatusGetAvailableTransitions,
  contentNewsletterStatusGetSequence,
  contentNewsletterStatusGetStateLabel,
  contentNewsletterStatusGetActionLabel,
  contentNewsletterStatusIsValid,
  contentNewsletterStatusIsValidState,
} from './newsletter-status.constants';

export type {
  ContentNewsletterStatusType,
  ContentNewsletterStatusCategory,
  ContentNewsletterStatusColor,
  ContentNewsletterStatusPriority,
  ContentNewsletterState,
  ContentNewsletterAction,
} from './newsletter-status.constants';

// Newsletter Subscription Constants
export {
  CONTENT_NEWSLETTER_SUBSCRIPTION,
  contentNewsletterSubscriptionGetTypeLabel,
  contentNewsletterSubscriptionGetStatusLabel,
  contentNewsletterSubscriptionGetSourceLabel,
  contentNewsletterSubscriptionGetPreferenceLabel,
  contentNewsletterSubscriptionGetChannelLabel,
  contentNewsletterSubscriptionIsActive,
  contentNewsletterSubscriptionIsUnsubscribed,
  contentNewsletterSubscriptionGetDefaultType,
  contentNewsletterSubscriptionGetDefaultStatus,
  contentNewsletterSubscriptionGetDefaultSource,
  contentNewsletterSubscriptionGetDefaultChannel,
  contentNewsletterSubscriptionIsValidType,
  contentNewsletterSubscriptionIsValidStatus,
  contentNewsletterSubscriptionIsValidSource,
} from './newsletter-subscription.constants';

export type {
  ContentNewsletterSubscriptionType,
  ContentNewsletterSubscriptionStatus,
  ContentNewsletterSubscriptionSource,
  ContentNewsletterSubscriptionPreference,
  ContentNewsletterSubscriptionChannel,
} from './newsletter-subscription.constants';

// Newsletter Subscription Status Constants
export {
  CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS,
  contentNewsletterSubscriptionStatusGetLabel,
  contentNewsletterSubscriptionStatusGetCategory,
  contentNewsletterSubscriptionStatusGetColor,
  contentNewsletterSubscriptionStatusGetPriority,
  contentNewsletterSubscriptionStatusIsActive,
  contentNewsletterSubscriptionStatusIsTerminated,
  contentNewsletterSubscriptionStatusCanTransitionTo,
  contentNewsletterSubscriptionStatusGetAvailableTransitions,
  contentNewsletterSubscriptionStatusGetStateLabel,
  contentNewsletterSubscriptionStatusGetActionLabel,
  contentNewsletterSubscriptionStatusIsValid,
  contentNewsletterSubscriptionStatusIsValidState,
} from './newsletter-subscription-status.constants';

export type {
  ContentNewsletterSubscriptionStatusType,
  ContentNewsletterSubscriptionStatusCategory,
  ContentNewsletterSubscriptionStatusColor,
  ContentNewsletterSubscriptionStatusPriority,
  ContentNewsletterSubscriptionState,
  ContentNewsletterSubscriptionAction,
} from './newsletter-subscription-status.constants';
