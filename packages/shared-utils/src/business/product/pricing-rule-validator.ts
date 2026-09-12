import { PRICING_RULE } from '@vubon/shared-constants/src/business/product/pricing-rule.constants';

export interface PricingRuleInput {
  name: string;
  discount: { value: number };
  priority: string;
}

export const validatePricingRule = (
  rule: Partial<PricingRuleInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!rule.name) errors.push('Rule name is required');
  if (!rule.discount) errors.push('Discount is required');
  if (rule.discount && (rule.discount.value < 0 || rule.discount.value > 100)) {
    errors.push('Discount value must be between 0 and 100');
  }
  if (rule.priority && !Object.keys(PRICING_RULE.PRIORITY_LEVELS).includes(rule.priority)) {
    errors.push('Invalid priority level');
  }
  return { isValid: errors.length === 0, errors };
};
