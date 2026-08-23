/**
 * Flash Sale Rule Constants Index
 * Export all rule constants and types for easy importing
 */

// Flash Sale Rule Constants
export {
  FLASH_SALE_RULE,
  flashsalesRuleGetTypeLabel,
  flashsalesRuleGetCategoryLabel,
  flashsalesRuleGetPriorityLabel,
  flashsalesRuleGetOperatorLabel,
  flashsalesRuleGetConditionLabel,
  flashsalesRuleGetActionLabel,
  flashsalesRuleGetEffectLabel,
  flashsalesRuleIsValidType,
  flashsalesRuleIsValidPriority,
  flashsalesRuleIsValidOperator,
  flashsalesRuleIsValidAction,
  flashsalesRuleIsHighPriority,
  flashsalesRuleIsLowPriority,
  flashsalesRuleGetDefaultPriority,
  flashsalesRuleGetDefaultOperator,
  flashsalesRuleGetDefaultCondition,
  flashsalesRuleGetMaxRules,
  flashsalesRuleGetMaxConditions,
  flashsalesRuleGetMaxActions,
  flashsalesRuleGetMaxNesting,
} from './flash-sale-rule.constants';

export type {
  FlashSaleRuleType,
  FlashSaleRuleCategory,
  FlashSaleRulePriority,
  FlashSaleRuleOperator,
  FlashSaleRuleCondition,
  FlashSaleRuleAction,
  FlashSaleRuleEffect,
} from './flash-sale-rule.constants';

// Flash Sale Rule Type Constants
export {
  FLASH_SALE_RULE_TYPE,
  flashsalesRuleTypeGetCategoryLabel,
  flashsalesRuleTypeGetComplexityLabel,
  flashsalesRuleTypeGetScopeLabel,
  flashsalesRuleTypeGetFrequencyLabel,
  flashsalesRuleTypeGetTriggerLabel,
  flashsalesRuleTypeGetExecutionLabel,
  flashsalesRuleTypeGetValidationLabel,
  flashsalesRuleTypeIsValidCategory,
  flashsalesRuleTypeIsValidScope,
  flashsalesRuleTypeIsValidTrigger,
  flashsalesRuleTypeIsComplex,
  flashsalesRuleTypeIsSimple,
} from './flash-sale-rule-type.constants';

export type {
  FlashSaleRuleTypeCategory,
  FlashSaleRuleTypeComplexity,
  FlashSaleRuleTypeScope,
  FlashSaleRuleTypeFrequency,
  FlashSaleRuleTypeTrigger,
  FlashSaleRuleTypeExecution,
  FlashSaleRuleTypeValidation,
} from './flash-sale-rule-type.constants';

// Flash Sale Rule Status Constants
export {
  FLASH_SALE_RULE_STATUS,
  flashsalesRuleStatusGetLabel,
  flashsalesRuleStatusGetCategory,
  flashsalesRuleStatusGetColor,
  flashsalesRuleStatusGetPriority,
  flashsalesRuleStatusIsActive,
  flashsalesRuleStatusIsApproved,
  flashsalesRuleStatusIsArchived,
  flashsalesRuleStatusCanTransitionTo,
  flashsalesRuleStatusGetAvailableTransitions,
  flashsalesRuleStatusCanApprove,
  flashsalesRuleStatusCanReject,
  flashsalesRuleStatusCanActivate,
  flashsalesRuleStatusCanPause,
  flashsalesRuleStatusCanResume,
  flashsalesRuleStatusCanDeprecate,
  flashsalesRuleStatusCanDelete,
  flashsalesRuleStatusIsValid,
} from './flash-sale-rule-status.constants';

export type {
  FlashSaleRuleStatusType,
  FlashSaleRuleStatusCategory,
  FlashSaleRuleStatusColor,
  FlashSaleRuleStatusPriority,
} from './flash-sale-rule-status.constants';
