import { z } from 'zod';
import { AddressSchema } from '../../common/address.schema';
import { VENDOR_ADDRESS } from '@vubon/shared-constants/src/business/vendor/vendor-address.constants';

const vendorAddressTypeKeys = Object.keys(VENDOR_ADDRESS.TYPES) as [string, ...string[]];

export const VendorAddressSchema = AddressSchema.extend({
  addressId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorAddressTypeKeys),
  isDefault: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
