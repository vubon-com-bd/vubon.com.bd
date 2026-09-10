import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { EMAIL_TEMPLATE } from '@vubon/shared-constants/src/platform/notification/email-template.constants';

const emailTemplateTypeKeys = Object.keys(EMAIL_TEMPLATE.TYPES) as [string, ...string[]];

export const EmailTemplateSchema = BaseSchema.extend({
  templateId: z.string().uuid(),
  type: z.enum(emailTemplateTypeKeys),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  subject: z.string().min(1).max(100),
  body: z.string().min(1).max(100000),
  variables: z.array(z.string()),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
