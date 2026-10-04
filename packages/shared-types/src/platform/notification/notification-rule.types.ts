/**
 * Notification Rule Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_RULE_TYPE,
  NOTIFICATION_RULE_CONDITION,
  NOTIFICATION_RULE_ACTION,
  NOTIFICATION_RULE_STATUS,
} from '@vubon/shared-constants/platform';

export type NotificationRuleTypeValue =
  (typeof NOTIFICATION_RULE_TYPE)[keyof typeof NOTIFICATION_RULE_TYPE];

export type NotificationRuleConditionValue =
  (typeof NOTIFICATION_RULE_CONDITION)[keyof typeof NOTIFICATION_RULE_CONDITION];

export type NotificationRuleActionValue =
  (typeof NOTIFICATION_RULE_ACTION)[keyof typeof NOTIFICATION_RULE_ACTION];

export type NotificationRuleStatusValue =
  (typeof NOTIFICATION_RULE_STATUS)[keyof typeof NOTIFICATION_RULE_STATUS];

export interface NotificationRule {
  readonly id: string;
  readonly name: string;
  readonly type: NotificationRuleTypeValue;
  readonly status: NotificationRuleStatusValue;
  readonly priority: number;
  readonly conditions: readonly RuleCondition[];
  readonly actions: readonly RuleAction[];
  readonly isActive: boolean;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface RuleCondition {
  readonly field: string;
  readonly operator: NotificationRuleConditionValue;
  readonly value: unknown;
}

export interface RuleAction {
  readonly action: NotificationRuleActionValue;
  readonly params?: Readonly<Record<string, unknown>>;
}
