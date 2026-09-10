import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { EMAIL } from '@vubon/shared-constants/src/platform/notification/email.constants';

const emailStatusKeys = Object.keys(EMAIL.STATUS) as [string, ...string[]];
const emailTypeKeys = Object.keys(EMAIL.TYPES) as [string, ...string[]];

export const SupportEmailSchema = BaseSchema.extend({
  emailId: z.string().uuid(),
  ticketId: z.string().uuid().optional(),
  from: z.string().email(),
  to: z.array(z.string().email()),
  cc: z.array(z.string().email()),
  bcc: z.array(z.string().email()),
  subject: z.string().min(1).max(200),
  body: z.string().min(1).max(10000),
  status: z.enum(emailStatusKeys),
  type: z.enum(emailTypeKeys),
  sentBy: z.string().uuid(),
  sentByUser: UserSchema,
  attachments: z.array(z.string().url()),
  sentAt: z.date(),
  deliveredAt: z.date().optional(),
  readAt: z.date().optional(),
  repliedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
