import { SUPPORT_RULE } from '@vubon/shared-constants/src/support/support-rule.constants';

export interface SupportRuleInput {
  name: string;
  type: string;
  conditions: unknown[];
  actions: unknown[];
}

export const validateSupportRule = (
  rule: Partial<SupportRuleInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!rule.name) errors.push('Rule name is required');
  if (rule.type && !Object.keys(SUPPORT_RULE.TYPES).includes(rule.type)) {
    errors.push('Invalid rule type');
  }
  if (!rule.conditions || rule.conditions.length === 0) {
    errors.push('At least one condition is required');
  }
  if (!rule.actions || rule.actions.length === 0) {
    errors.push('At least one action is required');
  }
  return { isValid: errors.length === 0, errors };
};
