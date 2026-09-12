import { BaseEntity } from '../../common/base.types';
import { NOTIFICATION_RULE } from '@vubon/shared-constants/src/platform/notification/notification-rule.constants';
import { Notification } from './notification.types';

export interface PlatformRuleCondition {
  field: string;
  operator:
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'contains'
    | 'starts_with'
    | 'ends_with'
    | 'in'
    | 'not_in';
  value: unknown;
}

export interface PlatformRuleAction {
  type: string;
  value: unknown;
}

export interface PlatformNotificationRule extends BaseEntity {
  ruleId: string;
  notificationId: string;
  notification: Notification;
  type: keyof typeof NOTIFICATION_RULE.TYPES | string;
  condition: keyof typeof NOTIFICATION_RULE.RULE_CONDITIONS | string;
  action: keyof typeof NOTIFICATION_RULE.RULE_ACTIONS | string;
  conditions: PlatformRuleCondition[];
  actions: PlatformRuleAction[];
  isActive: boolean;
  order: number;
  metadata: Record<string, unknown>;
}
