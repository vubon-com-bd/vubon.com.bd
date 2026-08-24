/**
 * FAQ Constants Index
 * Export all FAQ constants and types for easy importing
 */

// FAQ Constants
export {
  SUPPORT_FAQ,
  supportFaqGetTypeLabel,
  supportFaqGetStatusLabel,
  supportFaqGetPriorityLabel,
  supportFaqIsPublished,
  supportFaqIsDraft,
  supportFaqGetFormatLabel,
} from './faq.constants';

export type {
  SupportFaqType,
  SupportFaqStatus,
  SupportFaqPriority,
  SupportFaqLanguage,
  SupportFaqFormat,
} from './faq.constants';

// FAQ Category Constants
export {
  SUPPORT_FAQ_CATEGORY,
  supportFaqCategoryGetLabel,
  supportFaqCategoryGetIcon,
  supportFaqCategoryGetColor,
  supportFaqCategoryGetPriority,
} from './faq-category.constants';

export type {
  SupportFaqCategoryType,
  SupportFaqCategoryIcon,
  SupportFaqCategoryColor,
} from './faq-category.constants';

// FAQ Status Constants
export {
  SUPPORT_FAQ_STATUS,
  supportFaqStatusGetLabel,
  supportFaqStatusIsPublished,
  supportFaqStatusIsDraft,
  supportFaqStatusGetCategory,
  supportFaqStatusCanTransition,
} from './faq-status.constants';

export type {
  SupportFaqStatusType,
  SupportFaqStatusCategory,
  SupportFaqStatusColor,
  SupportFaqStatusIcon,
  SupportFaqStatusTransition,
} from './faq-status.constants';
