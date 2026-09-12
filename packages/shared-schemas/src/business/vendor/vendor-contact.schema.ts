import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { EmailSchema } from '../../common/email.schema';
import { PhoneSchema } from '../../common/phone.schema';
import { VENDOR_CONTACT } from '@vubon/shared-constants/src/business/vendor/vendor-contact.constants';

const vendorContactTypeKeys = Object.keys(VENDOR_CONTACT.TYPES) as [string, ...string[]];

export const VendorContactSchema = BaseSchema.extend({
  contactId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorContactTypeKeys),
  name: z.string().min(1).max(255),
  email: EmailSchema.shape.email,
  phone: PhoneSchema.shape.phone,
  designation: z.string().min(1).max(100),
  department: z.string().min(1).max(100),
  isPrimary: z.boolean().default(false),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
