import { BaseEntity } from '../common/base.types';
import { SUPPORT_RULE } from '@vubon/shared-constants/src/support/support-rule.constants';
import { TicketPriority } from './ticket-priority.types';

export interface SupportRuleCondition {
  type: keyof typeof SUPPORT_RULE.RULE_CONDITIONS | string;
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'starts_with' | 'ends_with';
  value: unknown;
}

export interface SupportRuleAction {
  type: keyof typeof SUPPORT_RULE.RULE_ACTIONS | string;
  value: unknown;
}

export interface SupportRule extends BaseEntity {
  ruleId: string;
  name: string;
  description?: string;
  type: keyof typeof SUPPORT_RULE.TYPES | string;
  priority: TicketPriority;
  conditions: SupportRuleCondition[];
  actions: SupportRuleAction[];
  isActive: boolean;
  order: number;
  metadata: Record<string, unknown>;
}
