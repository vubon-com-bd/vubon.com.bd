/**
 * Marketing Automation Constants Index
 * Export all marketing automation constants and types for easy importing
 */

// Marketing Automation Constants
export {
  MARKETINGAUTOMATION,
  marketingautomationGetTypeLabel,
  marketingautomationGetCategoryLabel,
  marketingautomationGetStatusLabel,
  marketingautomationGetPriorityLabel,
  marketingautomationGetFrequencyLabel,
  marketingautomationGetExecutionModeLabel,
  marketingautomationGetErrorLabel,
  marketingautomationIsActive,
  marketingautomationIsEditable,
  marketingautomationIsCompleted,
  marketingautomationCanTransition,
} from './marketing-automation.constants';

export type {
  MarketingAutomationType,
  MarketingAutomationCategory,
  MarketingAutomationStatus,
  MarketingAutomationPriority,
  MarketingAutomationFrequency,
  MarketingAutomationExecutionMode,
  MarketingAutomationDefault,
  MarketingAutomationLimit,
  MarketingAutomationError,
} from './marketing-automation.constants';

// Marketing Automation Type Constants
export {
  MARKETINGAUTOMATION_TYPE,
  marketingautomationGetCategoryLabel as marketingAutomationTypeGetCategoryLabel,
  marketingautomationGetSubTypeLabel,
  marketingautomationGetComplexityLabel,
  marketingautomationGetScopeLabel,
  marketingautomationGetIntegrationLabel,
  marketingautomationIsMarketingCategory,
  marketingautomationIsSalesCategory,
  marketingautomationIsServiceCategory,
  marketingautomationIsOperationalCategory,
} from './marketing-automation-type.constants';

export type {
  MarketingAutomationCategoryType,
  MarketingAutomationSubType,
  MarketingAutomationComplexity,
  MarketingAutomationScope,
  MarketingAutomationIntegration,
} from './marketing-automation-type.constants';

// Marketing Automation Trigger Constants
export {
  MARKETINGAUTOMATION_TRIGGER,
  marketingautomationGetTriggerTypeLabel,
  marketingautomationGetEventLabel,
  marketingautomationGetTimeTypeLabel,
  marketingautomationGetConditionTypeLabel,
  marketingautomationGetTriggerStatusLabel,
  marketingautomationIsEventTrigger,
  marketingautomationIsTimeTrigger,
  marketingautomationIsConditionTrigger,
  marketingautomationIsScheduleTrigger,
} from './marketing-automation-trigger.constants';

export type {
  MarketingAutomationTriggerType,
  MarketingAutomationEvent,
  MarketingAutomationTimeType,
  MarketingAutomationConditionType,
  MarketingAutomationTriggerStatus,
  MarketingAutomationTriggerDefault,
} from './marketing-automation-trigger.constants';

// Marketing Automation Action Constants
export {
  MARKETINGAUTOMATION_ACTION,
  marketingautomationGetActionTypeLabel,
  marketingautomationGetActionCategoryLabel,
  marketingautomationGetActionStatusLabel,
  marketingautomationGetExecutionOrderLabel,
  marketingautomationGetDelayLabel,
  marketingautomationIsCommunicationAction,
  marketingautomationIsDataAction,
  marketingautomationIsTaskAction,
  marketingautomationIsMarketingAction,
  marketingautomationIsSalesAction,
  marketingautomationIsIntegrationAction,
  marketingautomationGetDefaultRetryAttempts,
  marketingautomationGetDefaultTimeout,
} from './marketing-automation-action.constants';

export type {
  MarketingAutomationActionType,
  MarketingAutomationActionCategory,
  MarketingAutomationActionStatus,
  MarketingAutomationActionExecutionOrder,
  MarketingAutomationActionDelay,
  MarketingAutomationActionDefault,
} from './marketing-automation-action.constants';
