import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_SUSPENSION } from '@vubon/shared-constants/src/business/vendor/vendor-suspension.constants';

const vendorSuspensionStatusKeys = Object.keys(VENDOR_SUSPENSION.STATUS) as [string, ...string[]];
const vendorSuspensionReasonKeys = Object.keys(VENDOR_SUSPENSION.SUSPENSION_REASONS) as [
  string,
  ...string[],
];

export const VendorSuspensionSchema = BaseSchema.extend({
  suspensionId: z.string().uuid(),
  vendorId: z.string().uuid(),
  status: z.enum(vendorSuspensionStatusKeys),
  reason: z.enum(vendorSuspensionReasonKeys),
  description: z.string(),
  suspendedBy: z.string().uuid(),
  suspendedAt: z.date(),
  liftedAt: z.date().optional(),
  duration: z.number().int().min(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
