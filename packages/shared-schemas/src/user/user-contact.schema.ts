import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { EmailSchema } from '../common/email.schema';
import { PhoneSchema } from '../common/phone.schema';
import { USER_CONTACT } from '@vubon/shared-constants';

export const UserContactSchema = BaseSchema.extend({
  contactId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(Object.keys(USER_CONTACT) as [string, ...string[]]),
  email: EmailSchema.shape.email.optional(),
  phone: PhoneSchema.shape.phone.optional(),
  isPrimary: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
