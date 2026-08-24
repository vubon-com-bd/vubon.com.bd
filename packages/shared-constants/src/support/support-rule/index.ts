/**
 * Support Rule Constants Index
 * Export all support rule constants and types for easy importing
 */

// Support Rule Constants
export {
  SUPPORT_RULE,
  supportRuleGetTypeLabel,
  supportRuleGetStatusLabel,
  supportRuleGetPriorityLabel,
  supportRuleGetConditionLabel,
  supportRuleIsActive,
  supportRuleIsDraft,
  supportRuleGetActionLabel,
} from './support-rule.constants';

export type {
  SupportRuleType,
  SupportRuleStatus,
  SupportRulePriority,
  SupportRuleCondition,
  SupportRuleLogic,
  SupportRuleAction,
  SupportRuleEvaluation,
} from './support-rule.constants';

// Support Rule Type Constants
export {
  SUPPORT_RULE_TYPE,
  supportRuleTypeGetCategoryLabel,
  supportRuleTypeGetScopeLabel,
  supportRuleTypeGetTriggerLabel,
  supportRuleTypeGetComplexityLabel,
} from './support-rule-type.constants';

export type {
  SupportRuleCategory,
  SupportRuleScope,
  SupportRuleTrigger,
  SupportRuleComplexity,
  SupportRulePerformance,
} from './support-rule-type.constants';
