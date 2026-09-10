import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { EmailTemplateSchema } from './email-template.schema';
import { EMAIL } from '@vubon/shared-constants/src/platform/notification/email.constants';

const emailStatusKeys = Object.keys(EMAIL.STATUS) as [string, ...string[]];
const emailTypeKeys = Object.keys(EMAIL.TYPES) as [string, ...string[]];
const emailProviderKeys = Object.keys(EMAIL.EMAIL_PROVIDERS) as [string, ...string[]];

export const NotificationEmailSchema = BaseSchema.extend({
  emailId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(emailStatusKeys),
  type: z.enum(emailTypeKeys),
  provider: z.enum(emailProviderKeys),
  from: z.string().email(),
  to: z.array(z.string().email()),
  cc: z.array(z.string().email()),
  bcc: z.array(z.string().email()),
  subject: z.string().min(1).max(100),
  body: z.string().min(1).max(100000),
  template: EmailTemplateSchema,
  templateId: z.string().uuid().optional(),
  attachments: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
      size: z.number().min(0),
      type: z.string(),
    })
  ),
  sentAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  openedAt: z.date().optional(),
  clickedAt: z.date().optional(),
  bouncedAt: z.date().optional(),
  spamAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type NotificationEmail = z.infer<typeof NotificationEmailSchema>;
