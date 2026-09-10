import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { SUPPORT_RULE } from '@vubon/shared-constants/src/support/support-rule.constants';
import { TicketPrioritySchema } from './ticket-priority.schema';

const supportRuleTypeKeys = Object.keys(SUPPORT_RULE.TYPES) as [string, ...string[]];
const supportRuleConditionKeys = Object.keys(SUPPORT_RULE.RULE_CONDITIONS) as [string, ...string[]];
const supportRuleActionKeys = Object.keys(SUPPORT_RULE.RULE_ACTIONS) as [string, ...string[]];

export const SupportRuleSchema = BaseSchema.extend({
  ruleId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  type: z.enum(supportRuleTypeKeys),
  priority: TicketPrioritySchema,
  conditions: z.array(
    z.object({
      type: z.enum(supportRuleConditionKeys),
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
      ]),
      value: z.unknown(),
    })
  ),
  actions: z.array(
    z.object({
      type: z.enum(supportRuleActionKeys),
      value: z.unknown(),
    })
  ),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
  metadata: z.record(z.unknown()).optional(),
});
