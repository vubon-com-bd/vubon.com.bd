import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_WARRANTY } from '@vubon/shared-constants/src/business/vendor/vendor-warranty.constants';

const vendorWarrantyTypeKeys = Object.keys(VENDOR_WARRANTY.TYPES) as [string, ...string[]];

export const VendorWarrantySchema = BaseSchema.extend({
  warrantyId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorWarrantyTypeKeys),
  periodDays: z.number().int().min(0),
  coverage: z.array(z.string()),
  exclusions: z.array(z.string()),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
