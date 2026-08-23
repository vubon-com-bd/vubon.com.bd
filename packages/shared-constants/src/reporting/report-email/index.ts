/**
 * Report Email Constants Index
 * Export all report email constants and types for easy importing
 */

// Report Email Constants
export {
  REPORT_EMAIL,
  reportEmailGetTypeLabel,
  reportEmailGetPriorityLabel,
  reportEmailGetFormatLabel,
  reportEmailGetDeliveryMethodLabel,
  reportEmailGetTemplateLabel,
  reportEmailGetRecipientTypeLabel,
  reportEmailGetTrackingLabel,
  reportEmailGetSecurityLabel,
  reportEmailGetAttachmentTypeLabel,
  reportEmailGetMaxRecipients,
  reportEmailGetMaxAttachments,
  reportEmailGetMaxAttachmentSize,
  reportEmailGetRetryAttempts,
  reportEmailGetRetryDelay,
  reportEmailGetTimeout,
  reportEmailIsValidType,
  reportEmailIsValidPriority,
  reportEmailIsValidFormat,
  reportEmailGetDefaultPriority,
  reportEmailGetDefaultFormat,
  reportEmailGetDefaultTemplate,
  reportEmailGenerateSubject,
} from './report-email.constants';

export type {
  ReportEmailType,
  ReportEmailPriority,
  ReportEmailFormat,
  ReportEmailDeliveryMethod,
  ReportEmailTemplate,
  ReportEmailHeader,
  ReportEmailAttachmentType,
  ReportEmailRecipientType,
  ReportEmailTracking,
  ReportEmailSecurity,
} from './report-email.constants';

// Report Email Type Constants
export {
  REPORT_EMAIL_TYPE,
  reportEmailTypeGetCategoryLabel,
  reportEmailTypeGetComplexityLabel,
  reportEmailTypeGetScopeLabel,
  reportEmailTypeGetFrequencyLabel,
  reportEmailTypeGetAudienceLabel,
  reportEmailTypeGetImportanceLabel,
  reportEmailTypeGetSensitivityLabel,
  reportEmailTypeGetValidationLabel,
  reportEmailTypeGetRetentionLabel,
  reportEmailTypeIsValidCategory,
  reportEmailTypeIsValidFrequency,
  reportEmailTypeIsValidAudience,
} from './report-email-type.constants';

export type {
  ReportEmailTypeCategory,
  ReportEmailTypeComplexity,
  ReportEmailTypeScope,
  ReportEmailTypeFrequency,
  ReportEmailTypeAudience,
  ReportEmailTypeImportance,
  ReportEmailTypeSensitivity,
  ReportEmailTypeValidation,
  ReportEmailTypeRetention,
} from './report-email-type.constants';

// Report Email Status Constants
export {
  REPORT_EMAIL_STATUS,
  reportEmailStatusGetLabel,
  reportEmailStatusGetCategory,
  reportEmailStatusGetColor,
  reportEmailStatusGetPriority,
  reportEmailStatusIsComplete,
  reportEmailStatusIsFailed,
  reportEmailStatusIsInProgress,
  reportEmailStatusCanTransitionTo,
  reportEmailStatusGetAvailableTransitions,
  reportEmailStatusGetProgress,
  reportEmailStatusGetErrorLabel,
  reportEmailStatusGetActionLabel,
  reportEmailStatusIsValid,
  reportEmailStatusIsValidErrorType,
  reportEmailStatusIsValidAction,
} from './report-email-status.constants';

export type {
  ReportEmailStatusType,
  ReportEmailStatusCategory,
  ReportEmailStatusColor,
  ReportEmailStatusPriority,
  ReportEmailDeliveryStatus,
  ReportEmailProgress,
  ReportEmailErrorType,
  ReportEmailAction,
} from './report-email-status.constants';
