/**
 * Notification Rule Constants Index
 * Export all notification rule constants and types for easy importing
 */

// Notification Rule Constants
export {
  NOTIFICATIONRULE,
  notificationruleGetTypeLabel,
  notificationruleGetCategoryLabel,
  notificationruleGetOperatorLabel,
  notificationruleGetConditionLabel,
  notificationruleGetEffectLabel,
  notificationruleGetErrorLabel,
  notificationruleIsInclusion,
  notificationruleIsExclusion,
  notificationruleIsFilter,
  notificationruleIsPriority,
  notificationruleGetDefaultPriority,
  notificationruleGetMaxRulesPerNotification,
} from './notification-rule.constants';

export type {
  NotificationRuleType,
  NotificationRuleCategory,
  NotificationRuleOperator,
  NotificationRuleCondition,
  NotificationRulePriority,
  NotificationRuleEffect,
  NotificationRuleDefault,
  NotificationRuleLimit,
  NotificationRuleError,
} from './notification-rule.constants';

// Notification Rule Type Constants
export {
  NOTIFICATIONRULE_TYPE,
  notificationruleGetCategoryLabel as notificationRuleTypeGetCategoryLabel,
  notificationruleGetSubTypeLabel,
  notificationruleGetComplexityLabel,
  notificationruleGetScopeLabel,
  notificationruleGetEvaluationOrderLabel,
  notificationruleIsUserCategory,
  notificationruleIsContentCategory,
  notificationruleIsChannelCategory,
  notificationruleIsTimeCategory,
} from './notification-rule-type.constants';

export type {
  NotificationRuleCategoryType,
  NotificationRuleSubType,
  NotificationRuleComplexity,
  NotificationRuleScope,
  NotificationRuleEvaluationOrder,
} from './notification-rule-type.constants';

// Notification Rule Status Constants
export {
  NOTIFICATIONRULE_STATUS,
  notificationruleGetStatusLabel,
  notificationruleGetStatusColor,
  notificationruleGetStatusCategory,
  notificationruleIsActive,
  notificationruleIsPending,
  notificationruleIsFailed,
  notificationruleIsEditable,
  notificationruleCanTransition,
} from './notification-rule-status.constants';

export type {
  NotificationRuleStatusType,
  NotificationRuleStatusColor,
  NotificationRuleStatusCategory,
  NotificationRuleStatusOrder,
  NotificationRuleStatusTransition,
} from './notification-rule-status.constants';
