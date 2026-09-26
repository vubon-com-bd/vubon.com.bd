/**
 * Support Automation Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/support-automation.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import {
  SUPPORT_AUTOMATION_TYPE,
  SUPPORT_AUTOMATION_TRIGGER,
  SUPPORT_AUTOMATION_STATUS,
} from '@vubon/shared-constants/support';

export const SupportAutomationTypeSchema = z.enum(
  Object.values(SUPPORT_AUTOMATION_TYPE) as [string, ...string[]]
);

export const SupportAutomationTriggerSchema = z.enum(
  Object.values(SUPPORT_AUTOMATION_TRIGGER) as [string, ...string[]]
);

export const SupportAutomationStatusSchema = z.enum(
  Object.values(SUPPORT_AUTOMATION_STATUS) as [string, ...string[]]
);

export const SupportAutomationTriggerConfigSchema = z.object({
  type: SupportAutomationTriggerSchema,
  conditions: z.record(z.string(), z.unknown()).optional(),
});

export const SupportAutomationStepSchema = z.object({
  id: z.string().min(1).max(50),
  order: z.number().int().nonnegative(),
  action: z.string().min(1).max(100),
  params: z.record(z.string(), z.unknown()),
  delayMinutes: z.number().int().nonnegative().max(10080).optional(),
});

export const SupportAutomationSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  description: z.string().max(1000).optional(),
  type: SupportAutomationTypeSchema,
  status: SupportAutomationStatusSchema,
  trigger: SupportAutomationTriggerConfigSchema,
  steps: z.array(SupportAutomationStepSchema).min(1).max(20),
  isActive: z.boolean(),
  executionCount: z.number().int().nonnegative(),
  successCount: z.number().int().nonnegative(),
  failureCount: z.number().int().nonnegative(),
  createdBy: z.string().min(1),
});

export const SupportAutomationExecutionSchema = z.object({
  id: z.string().min(1),
  automationId: z.string().min(1),
  ticketId: z.string().optional(),
  status: z.enum(['success', 'failed', 'partial']),
  stepsExecuted: z.number().int().nonnegative(),
  error: z.string().max(1000).optional(),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
});

export type SupportAutomationTypeSchemaType = z.infer<typeof SupportAutomationTypeSchema>;
export type SupportAutomationTriggerSchemaType = z.infer<typeof SupportAutomationTriggerSchema>;
export type SupportAutomationStatusSchemaType = z.infer<typeof SupportAutomationStatusSchema>;
export type SupportAutomationSchemaType = z.infer<typeof SupportAutomationSchema>;
export type SupportAutomationExecutionSchemaType = z.infer<typeof SupportAutomationExecutionSchema>;
