import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { SUPPORT_TEMPLATE } from '@vubon/shared-constants/src/support/support-template.constants';

const supportScriptStatusKeys = Object.keys(SUPPORT_TEMPLATE.STATUS) as [string, ...string[]];
const supportScriptTypeKeys = Object.keys(SUPPORT_TEMPLATE.TYPES) as [string, ...string[]];

export const SupportScriptSchema = BaseSchema.extend({
  scriptId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(supportScriptStatusKeys),
  type: z.enum(supportScriptTypeKeys),
  steps: z.array(
    z.object({
      stepId: z.string().uuid(),
      order: z.number().int().min(0),
      type: z.enum(['text', 'question', 'decision', 'action', 'end']),
      content: z.string(),
      options: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
            nextStep: z.string(),
          })
        )
        .optional(),
      nextStep: z.string().optional(),
    })
  ),
  variables: z.array(z.string()),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
