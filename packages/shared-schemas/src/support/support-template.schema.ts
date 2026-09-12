import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { SUPPORT_TEMPLATE } from '@vubon/shared-constants/src/support/support-template.constants';

const supportTemplateStatusKeys = Object.keys(SUPPORT_TEMPLATE.STATUS) as [string, ...string[]];
const supportTemplateTypeKeys = Object.keys(SUPPORT_TEMPLATE.TYPES) as [string, ...string[]];
const supportTemplateFormatKeys = Object.keys(SUPPORT_TEMPLATE.TEMPLATE_FORMATS) as [
  string,
  ...string[],
];

export const SupportTemplateSchema = BaseSchema.extend({
  templateId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(supportTemplateStatusKeys),
  type: z.enum(supportTemplateTypeKeys),
  format: z.enum(supportTemplateFormatKeys),
  subject: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
  variables: z.array(z.string()),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
