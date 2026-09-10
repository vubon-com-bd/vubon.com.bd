import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_SUPPORT } from '@vubon/shared-constants/src/business/vendor/vendor-support.constants';

const vendorSupportTypeKeys = Object.keys(VENDOR_SUPPORT.TYPES) as [string, ...string[]];
const vendorSupportChannelKeys = Object.keys(VENDOR_SUPPORT.SUPPORT_CHANNELS) as [
  string,
  ...string[],
];
const vendorSupportPriorityKeys = Object.keys(VENDOR_SUPPORT.SUPPORT_PRIORITY) as [
  string,
  ...string[],
];

export const VendorSupportSchema = BaseSchema.extend({
  supportId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorSupportTypeKeys),
  channel: z.enum(vendorSupportChannelKeys),
  priority: z.enum(vendorSupportPriorityKeys),
  subject: z.string().min(1).max(200),
  description: z.string().min(10).max(5000),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
  assignedTo: z.string().uuid().optional(),
  resolvedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
