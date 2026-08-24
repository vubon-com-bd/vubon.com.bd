/**
 * Support Email Constants Index
 * Export all support email constants and types for easy importing
 */

// Support Email Constants
export {
  SUPPORT_EMAIL,
  supportEmailGetTypeLabel,
  supportEmailGetStatusLabel,
  supportEmailGetPriorityLabel,
  supportEmailGetCategoryLabel,
  supportEmailGetFormatLabel,
  supportEmailIsSent,
  supportEmailIsFailed,
} from './support-email.constants';

export type {
  SupportEmailType,
  SupportEmailStatus,
  SupportEmailPriority,
  SupportEmailCategory,
  SupportEmailFormat,
} from './support-email.constants';

// Support Email Type Constants
export {
  SUPPORT_EMAIL_TYPE,
  supportEmailTypeGetCategoryLabel,
  supportEmailTypeGetScopeLabel,
  supportEmailTypeGetChannelLabel,
  supportEmailTypeGetTemplateLabel,
  supportEmailTypeGetPriorityLabel,
} from './support-email-type.constants';

export type {
  SupportEmailTypeCategory,
  SupportEmailTypeScope,
  SupportEmailTypeChannel,
  SupportEmailTypeTemplate,
  SupportEmailTypePriority,
} from './support-email-type.constants';

// Support Email Status Constants
export {
  SUPPORT_EMAIL_STATUS,
  supportEmailStatusGetLabel,
  supportEmailStatusIsSent,
  supportEmailStatusIsFailed,
  supportEmailStatusIsPending,
  supportEmailStatusGetCategory,
  supportEmailStatusCanTransition,
} from './support-email-status.constants';

export type {
  SupportEmailStatusType,
  SupportEmailStatusCategory,
  SupportEmailStatusColor,
  SupportEmailStatusIcon,
  SupportEmailStatusTransition,
} from './support-email-status.constants';
