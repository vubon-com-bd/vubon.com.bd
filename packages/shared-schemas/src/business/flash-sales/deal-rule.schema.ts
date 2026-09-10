import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { DEAL_RULE } from '@vubon/shared-constants/src/business/flash-sales/deal-rule.constants';

const ruleTypeKeys = Object.keys(DEAL_RULE.TYPES) as [string, ...string[]];
const ruleConditionKeys = Object.keys(DEAL_RULE.RULE_TYPES) as [string, ...string[]];
const ruleOperatorKeys = Object.keys(DEAL_RULE.RULE_OPERATORS) as [string, ...string[]];

export const DealRuleSchema = BaseSchema.extend({
  ruleId: z.string().uuid(),
  dealId: z.string().uuid(),
  type: z.enum(ruleTypeKeys),
  conditionType: z.enum(ruleConditionKeys),
  operator: z.enum(ruleOperatorKeys),
  priority: z.number().int().min(1),
  conditions: z.array(
    z.object({
      field: z.string(),
      operator: z.string(),
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
  metadata: z.record(z.unknown()).optional(),
});
