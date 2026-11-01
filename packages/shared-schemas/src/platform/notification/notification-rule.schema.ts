/**
 * Notification Rule Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-rule.constants থেকে।
 */

import { z } from 'zod';
import {
  NOTIFICATION_RULE_TYPE,
  NOTIFICATION_RULE_CONDITION,
  NOTIFICATION_RULE_ACTION,
  NOTIFICATION_RULE_STATUS,
} from '@vubon/shared-constants/platform';

export const NotificationRuleTypeSchema = z.enum(
  Object.values(NOTIFICATION_RULE_TYPE) as [string, ...string[]]
);

export const NotificationRuleConditionSchema = z.enum(
  Object.values(NOTIFICATION_RULE_CONDITION) as [string, ...string[]]
);

export const NotificationRuleActionSchema = z.enum(
  Object.values(NOTIFICATION_RULE_ACTION) as [string, ...string[]]
);

export const NotificationRuleStatusSchema = z.enum(
  Object.values(NOTIFICATION_RULE_STATUS) as [string, ...string[]]
);

export const RuleConditionSchema = z.object({
  field: z.string().min(1).max(100),
  operator: NotificationRuleConditionSchema,
  value: z.unknown(),
});

export const RuleActionSchema = z.object({
  action: NotificationRuleActionSchema,
  params: z.record(z.string(), z.unknown()).optional(),
});

export const NotificationRuleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  type: NotificationRuleTypeSchema,
  status: NotificationRuleStatusSchema,
  priority: z.number().int().min(1).max(100),
  conditions: z.array(RuleConditionSchema).min(1).max(20),
  actions: z.array(RuleActionSchema).min(1).max(10),
  isActive: z.boolean(),
  createdBy: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type NotificationRuleTypeSchemaType = z.infer<typeof NotificationRuleTypeSchema>;
export type NotificationRuleConditionSchemaType = z.infer<typeof NotificationRuleConditionSchema>;
export type NotificationRuleActionSchemaType = z.infer<typeof NotificationRuleActionSchema>;
export type NotificationRuleStatusSchemaType = z.infer<typeof NotificationRuleStatusSchema>;
export type NotificationRuleSchemaType = z.infer<typeof NotificationRuleSchema>;
