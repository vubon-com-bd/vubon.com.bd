import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { NOTIFICATION_RULE } from '@vubon/shared-constants/src/platform/notification/notification-rule.constants';

const notificationRuleTypeKeys = Object.keys(NOTIFICATION_RULE.TYPES) as [string, ...string[]];
const notificationRuleConditionKeys = Object.keys(NOTIFICATION_RULE.RULE_CONDITIONS) as [
  string,
  ...string[],
];
const notificationRuleActionKeys = Object.keys(NOTIFICATION_RULE.RULE_ACTIONS) as [
  string,
  ...string[],
];

export const NotificationRuleSchema = BaseSchema.extend({
  ruleId: z.string().uuid(),
  notificationId: z.string().uuid(),
  type: z.enum(notificationRuleTypeKeys),
  condition: z.enum(notificationRuleConditionKeys),
  action: z.enum(notificationRuleActionKeys),
  conditions: z.array(
    z.object({
      field: z.string(),
      operator: z.enum([
        'eq',
        'ne',
        'gt',
        'gte',
        'lt',
        'lte',
        'contains',
        'starts_with',
        'ends_with',
        'in',
        'not_in',
      ]),
      value: z.unknown(),
    })
  ),
  actions: z.array(
    z.object({
      type: z.string(),
      value: z.unknown(),
    })
  ),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0),
  metadata: z.record(z.unknown()).optional(),
});
