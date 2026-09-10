import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { SUPPORT_AUTOMATION } from '@vubon/shared-constants/src/support/support-automation.constants';
import { SupportRuleSchema } from './support-rule.schema';

const supportAutomationStatusKeys = Object.keys(SUPPORT_AUTOMATION.STATUS) as [string, ...string[]];
const supportAutomationTypeKeys = Object.keys(SUPPORT_AUTOMATION.TYPES) as [string, ...string[]];
const supportAutomationExecutionTimeKeys = Object.keys(SUPPORT_AUTOMATION.EXECUTION_TIMES) as [
  string,
  ...string[],
];

export const SupportAutomationSchema = BaseSchema.extend({
  automationId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(supportAutomationStatusKeys),
  type: z.enum(supportAutomationTypeKeys),
  rules: z.array(SupportRuleSchema),
  executionTime: z.enum(supportAutomationExecutionTimeKeys),
  isActive: z.boolean().default(true),
  isError: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
