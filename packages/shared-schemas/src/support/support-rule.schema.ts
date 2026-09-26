/**
 * Support Rule Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/support-rule.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import {
  SUPPORT_RULE_TYPE,
  SUPPORT_RULE_CONDITION,
  SUPPORT_RULE_ACTION,
  SUPPORT_RULE_STATUS,
} from '@vubon/shared-constants/support';

export const SupportRuleTypeSchema = z.enum(
  Object.values(SUPPORT_RULE_TYPE) as [string, ...string[]]
);

export const SupportRuleConditionSchema = z.enum(
  Object.values(SUPPORT_RULE_CONDITION) as [string, ...string[]]
);

export const SupportRuleActionSchema = z.enum(
  Object.values(SUPPORT_RULE_ACTION) as [string, ...string[]]
);

export const SupportRuleStatusSchema = z.enum(
  Object.values(SUPPORT_RULE_STATUS) as [string, ...string[]]
);

export const SupportRuleConditionItemSchema = z.object({
  field: z.string().min(1).max(100),
  operator: SupportRuleConditionSchema,
  value: z.unknown(),
});

export const SupportRuleActionItemSchema = z.object({
  action: SupportRuleActionSchema,
  params: z.record(z.string(), z.unknown()).optional(),
});

export const SupportRuleSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  description: z.string().max(1000).optional(),
  type: SupportRuleTypeSchema,
  status: SupportRuleStatusSchema,
  priority: z.number().int().min(1).max(100),
  conditions: z.array(SupportRuleConditionItemSchema).min(1).max(20),
  actions: z.array(SupportRuleActionItemSchema).min(1).max(10),
  stopOnMatch: z.boolean(),
  isActive: z.boolean(),
  createdBy: z.string().min(1),
});

export type SupportRuleTypeSchemaType = z.infer<typeof SupportRuleTypeSchema>;
export type SupportRuleConditionSchemaType = z.infer<typeof SupportRuleConditionSchema>;
export type SupportRuleActionSchemaType = z.infer<typeof SupportRuleActionSchema>;
export type SupportRuleStatusSchemaType = z.infer<typeof SupportRuleStatusSchema>;
export type SupportRuleSchemaType = z.infer<typeof SupportRuleSchema>;
