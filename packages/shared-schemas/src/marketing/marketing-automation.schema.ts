/**
 * Marketing Automation Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/marketing-automation.constants থেকে।
 */

import { z } from 'zod';
import {
  MARKETING_AUTOMATION_TYPE,
  MARKETING_AUTOMATION_TRIGGER,
  MARKETING_AUTOMATION_ACTION,
  MARKETING_AUTOMATION_STATUS,
} from '@vubon/shared-constants/marketing';

export const MarketingAutomationTypeSchema = z.enum(
  Object.values(MARKETING_AUTOMATION_TYPE) as [string, ...string[]]
);

export const MarketingAutomationTriggerSchema = z.enum(
  Object.values(MARKETING_AUTOMATION_TRIGGER) as [string, ...string[]]
);

export const MarketingAutomationActionSchema = z.enum(
  Object.values(MARKETING_AUTOMATION_ACTION) as [string, ...string[]]
);

export const MarketingAutomationStatusSchema = z.enum(
  Object.values(MARKETING_AUTOMATION_STATUS) as [string, ...string[]]
);

export const AutomationTriggerSchema = z.object({
  type: MarketingAutomationTriggerSchema,
  conditions: z.record(z.string(), z.unknown()).optional(),
});

export const AutomationStepSchema = z.object({
  id: z.string().min(1).max(50),
  order: z.number().int().nonnegative(),
  action: MarketingAutomationActionSchema,
  params: z.record(z.string(), z.unknown()),
  delayMinutes: z.number().int().nonnegative().max(525600).optional(),
  conditions: z.record(z.string(), z.unknown()).optional(),
});

export const MarketingAutomationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  description: z.string().max(1000).optional(),
  type: MarketingAutomationTypeSchema,
  status: MarketingAutomationStatusSchema,
  trigger: AutomationTriggerSchema,
  steps: z.array(AutomationStepSchema).min(1).max(50),
  isActive: z.boolean(),
  executionCount: z.number().int().nonnegative(),
  successCount: z.number().int().nonnegative(),
  failureCount: z.number().int().nonnegative(),
  createdBy: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const AutomationExecutionSchema = z.object({
  id: z.string().min(1),
  automationId: z.string().min(1),
  userId: z.string().optional(),
  status: z.enum(['success', 'failed', 'partial']),
  stepsExecuted: z.number().int().nonnegative(),
  error: z.string().max(1000).optional(),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
});

export type MarketingAutomationTypeSchemaType = z.infer<typeof MarketingAutomationTypeSchema>;
export type MarketingAutomationTriggerSchemaType = z.infer<typeof MarketingAutomationTriggerSchema>;
export type MarketingAutomationActionSchemaType = z.infer<typeof MarketingAutomationActionSchema>;
export type MarketingAutomationSchemaType = z.infer<typeof MarketingAutomationSchema>;
export type AutomationExecutionSchemaType = z.infer<typeof AutomationExecutionSchema>;
