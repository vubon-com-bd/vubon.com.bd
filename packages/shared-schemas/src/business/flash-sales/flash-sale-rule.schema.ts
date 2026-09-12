import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { FLASH_SALE_RULE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-rule.constants';

const ruleTypeKeys = Object.keys(FLASH_SALE_RULE.TYPES) as [string, ...string[]];
const ruleOperatorKeys = Object.keys(FLASH_SALE_RULE.RULE_OPERATORS) as [string, ...string[]];
const rulePriorityKeys = Object.keys(FLASH_SALE_RULE.RULE_PRIORITIES) as [string, ...string[]];

export const FlashSaleRuleSchema = BaseSchema.extend({
  ruleId: z.string().uuid(),
  flashSaleId: z.string().uuid(),
  type: z.enum(ruleTypeKeys),
  operator: z.enum(ruleOperatorKeys),
  priority: z.enum(rulePriorityKeys),
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
