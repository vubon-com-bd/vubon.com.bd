import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { VENDOR_STATUS } from '@vubon/shared-constants/src/business/vendor/vendor-status.constants';

const vendorStatusKeys = Object.keys(VENDOR_STATUS) as [string, ...string[]];

export const VendorStatusSchema = StatusSchema.extend({
  status: z.enum(vendorStatusKeys),
  category: z.literal('vendor'),
  isPending: z.boolean().default(false),
  isActive: z.boolean().default(false),
  isSuspended: z.boolean().default(false),
  isBanned: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
});

export const VendorStatusEnumSchema = z.enum(vendorStatusKeys);
