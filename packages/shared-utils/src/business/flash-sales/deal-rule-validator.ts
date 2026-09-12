import { DEAL_RULE } from '@vubon/shared-constants/src/business/flash-sales/deal-rule.constants';

export interface DealRuleInput {
  type: string;
  conditionType: string;
  priority: number;
}

export const validateDealRule = (
  rule: Partial<DealRuleInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!rule.type) errors.push('Rule type is required');
  if (rule.type && !Object.keys(DEAL_RULE.TYPES).includes(rule.type)) {
    errors.push('Invalid rule type');
  }
  if (rule.conditionType && !Object.keys(DEAL_RULE.RULE_TYPES).includes(rule.conditionType)) {
    errors.push('Invalid condition type');
  }
  if (rule.priority !== undefined && rule.priority < 1) {
    errors.push('Priority must be at least 1');
  }
  return { isValid: errors.length === 0, errors };
};
