/**
 * Support Rule Types
 * @module shared-types/support
 */

import type {
  SUPPORT_RULE_TYPE,
  SUPPORT_RULE_CONDITION,
  SUPPORT_RULE_ACTION,
  SUPPORT_RULE_STATUS,
} from '@vubon/shared-constants/support';
import type { BaseEntity } from '../common/base';

export type SupportRuleTypeValue = (typeof SUPPORT_RULE_TYPE)[keyof typeof SUPPORT_RULE_TYPE];

export type SupportRuleConditionValue =
  (typeof SUPPORT_RULE_CONDITION)[keyof typeof SUPPORT_RULE_CONDITION];

export type SupportRuleActionValue = (typeof SUPPORT_RULE_ACTION)[keyof typeof SUPPORT_RULE_ACTION];

export type SupportRuleStatusValue = (typeof SUPPORT_RULE_STATUS)[keyof typeof SUPPORT_RULE_STATUS];

export interface SupportRule extends BaseEntity<string> {
  readonly name: string;
  readonly description?: string;
  readonly type: SupportRuleTypeValue;
  readonly status: SupportRuleStatusValue;
  readonly priority: number;
  readonly conditions: readonly SupportRuleCondition[];
  readonly actions: readonly SupportRuleAction[];
  readonly stopOnMatch: boolean;
  readonly isActive: boolean;
  readonly createdBy: string;
}

export interface SupportRuleCondition {
  readonly field: string;
  readonly operator: SupportRuleConditionValue;
  readonly value: unknown;
}

export interface SupportRuleAction {
  readonly action: SupportRuleActionValue;
  readonly params?: Readonly<Record<string, unknown>>;
}
