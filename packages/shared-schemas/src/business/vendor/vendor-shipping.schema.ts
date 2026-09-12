import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { SHIPPING_METHODS } from '@vubon/shared-constants/src/common/shipping-methods.constants';
import { VENDOR_SHIPPING } from '@vubon/shared-constants/src/business/vendor/vendor-shipping.constants';
import { VendorAddressSchema } from './vendor-address.schema';

const vendorShippingTypeKeys = Object.keys(VENDOR_SHIPPING.TYPES) as [string, ...string[]];
const shippingMethodKeys = Object.keys(SHIPPING_METHODS) as [string, ...string[]];

export const VendorShippingSchema = BaseSchema.extend({
  shippingId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorShippingTypeKeys),
  method: z.enum(shippingMethodKeys),
  cost: MoneySchema,
  freeShippingThreshold: MoneySchema.optional(),
  estimatedDays: z.number().int().min(1),
  zones: z.array(z.string()),
  weightLimit: z.number().min(0).optional(),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  address: VendorAddressSchema,
  metadata: z.record(z.unknown()).optional(),
});
