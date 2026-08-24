/**
 * Support Feedback Constants Index
 * Export all feedback constants and types for easy importing
 */

// Feedback Constants
export {
  SUPPORT_FEEDBACK,
  supportFeedbackGetTypeLabel,
  supportFeedbackGetStatusLabel,
  supportFeedbackGetPriorityLabel,
  supportFeedbackGetChannelLabel,
  supportFeedbackIsResolved,
  supportFeedbackIsPending,
  supportFeedbackIsPositive,
  supportFeedbackIsNegative,
} from './feedback.constants';

export type {
  SupportFeedbackType,
  SupportFeedbackStatus,
  SupportFeedbackPriority,
  SupportFeedbackChannel,
} from './feedback.constants';

// Feedback Type Constants
export {
  SUPPORT_FEEDBACK_TYPE,
  supportFeedbackTypeGetLabel,
  supportFeedbackTypeGetIcon,
  supportFeedbackTypeGetColor,
  supportFeedbackTypeGetPriority,
  supportFeedbackTypeGetCategory,
} from './feedback-type.constants';

export type {
  SupportFeedbackTypeType,
  SupportFeedbackTypeCategory,
  SupportFeedbackTypeIcon,
  SupportFeedbackTypeColor,
} from './feedback-type.constants';

// Feedback Status Constants
export {
  SUPPORT_FEEDBACK_STATUS,
  supportFeedbackStatusGetLabel,
  supportFeedbackStatusIsResolved,
  supportFeedbackStatusIsPending,
  supportFeedbackStatusIsActive,
  supportFeedbackStatusGetCategory,
  supportFeedbackStatusCanTransition,
} from './feedback-status.constants';

export type {
  SupportFeedbackStatusType,
  SupportFeedbackStatusCategory,
  SupportFeedbackStatusColor,
  SupportFeedbackStatusIcon,
  SupportFeedbackStatusTransition,
} from './feedback-status.constants';
