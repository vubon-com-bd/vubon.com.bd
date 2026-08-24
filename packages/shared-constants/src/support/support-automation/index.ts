/**
 * Support Automation Constants Index
 * Export all support automation constants and types for easy importing
 */

// Support Automation Constants
export {
  SUPPORT_AUTOMATION,
  supportAutomationGetTypeLabel,
  supportAutomationGetStatusLabel,
  supportAutomationGetPriorityLabel,
  supportAutomationIsActive,
  supportAutomationIsDraft,
  supportAutomationIsError,
  supportAutomationGetCategoryLabel,
} from './support-automation.constants';

export type {
  SupportAutomationType,
  SupportAutomationStatus,
  SupportAutomationPriority,
  SupportAutomationCategory,
  SupportAutomationExecution,
  SupportAutomationComplexity,
} from './support-automation.constants';

// Support Automation Type Constants
export {
  SUPPORT_AUTOMATION_TYPE,
  supportAutomationTypeGetCategoryLabel,
  supportAutomationTypeGetScopeLabel,
  supportAutomationTypeGetFrequencyLabel,
  supportAutomationTypeGetModeLabel,
} from './support-automation-type.constants';

export type {
  SupportAutomationTypeCategory,
  SupportAutomationTypeScope,
  SupportAutomationTypeFrequency,
  SupportAutomationTypeMode,
  SupportAutomationTypeComplexityLevel,
  SupportAutomationTypeDependency,
} from './support-automation-type.constants';

// Support Automation Trigger Constants
export {
  SUPPORT_AUTOMATION_TRIGGER,
  supportAutomationTriggerGetTypeLabel,
  supportAutomationTriggerGetEventLabel,
  supportAutomationTriggerIsActive,
  supportAutomationTriggerGetPriorityLabel,
  supportAutomationTriggerGetTimingLabel,
} from './support-automation-trigger.constants';

export type {
  SupportAutomationTriggerType,
  SupportAutomationTriggerEvent,
  SupportAutomationTriggerCondition,
  SupportAutomationTriggerTiming,
  SupportAutomationTriggerPriority,
  SupportAutomationTriggerStatus,
} from './support-automation-trigger.constants';

// Support Automation Action Constants
export {
  SUPPORT_AUTOMATION_ACTION,
  supportAutomationActionGetTypeLabel,
  supportAutomationActionGetTicketActionLabel,
  supportAutomationActionGetNotificationActionLabel,
  supportAutomationActionIsCompleted,
  supportAutomationActionIsFailed,
  supportAutomationActionIsPending,
} from './support-automation-action.constants';

export type {
  SupportAutomationActionType,
  SupportAutomationTicketAction,
  SupportAutomationNotificationAction,
  SupportAutomationActionTiming,
  SupportAutomationActionStatus,
  SupportAutomationActionPriority,
  SupportAutomationActionExecution,
} from './support-automation-action.constants';
