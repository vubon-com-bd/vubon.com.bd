/**
 * Rule Config
 * রুল কনফিগারেশন
 */

export interface RuleConfig {
  enabled: boolean;
  maxRules: number;
  minPriority: number;
  maxPriority: number;
  allowedTypes: string[];
  allowedOperators: string[];
  allowedActions: string[];
  defaults: {
    priority: number;
    isActive: boolean;
  };
}

export const ruleConfig: RuleConfig = {
  enabled: true,
  maxRules: 10,
  minPriority: 1,
  maxPriority: 10,
  allowedTypes: ['discount', 'quantity', 'eligibility', 'timing', 'stacking'],
  allowedOperators: ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'like', 'between'],
  allowedActions: [
    'apply_discount',
    'apply_free_shipping',
    'apply_buy_get',
    'apply_bundle',
    'apply_voucher',
  ],
  defaults: {
    priority: 5,
    isActive: true,
  },
} as const;

export type RuleConfigType = typeof ruleConfig;
