import { BaseEntity } from '../../common/base.types';
import { DEAL_RULE } from '@vubon/shared-constants/src/business/flash-sales/deal-rule.constants';
import { Deal } from './deal.types';

export interface DealRuleCondition {
  field: string;
  operator: string;
  value: unknown;
}

export interface DealRuleAction {
  type: string;
  value: unknown;
}

export interface DealRule extends BaseEntity {
  ruleId: string;
  dealId: string;
  deal: Deal;
  type: keyof typeof DEAL_RULE.TYPES | string;
  conditionType: keyof typeof DEAL_RULE.RULE_TYPES | string;
  operator: keyof typeof DEAL_RULE.RULE_OPERATORS | string;
  priority: number;
  conditions: DealRuleCondition[];
  actions: DealRuleAction[];
  isActive: boolean;
  metadata: Record<string, unknown>;
}
