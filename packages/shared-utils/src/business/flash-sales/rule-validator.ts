import { FLASH_SALE_RULE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-rule.constants';

export interface RuleInput {
  type: string;
  priority: string;
  conditions: unknown[];
}

export const validateRule = (rule: Partial<RuleInput>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!rule.type) errors.push('Rule type is required');
  if (rule.type && !Object.keys(FLASH_SALE_RULE.TYPES).includes(rule.type)) {
    errors.push('Invalid rule type');
  }
  if (rule.priority && !Object.keys(FLASH_SALE_RULE.RULE_PRIORITIES).includes(rule.priority)) {
    errors.push('Invalid rule priority');
  }
  if (!rule.conditions || rule.conditions.length === 0) {
    errors.push('At least one condition is required');
  }
  return { isValid: errors.length === 0, errors };
};
