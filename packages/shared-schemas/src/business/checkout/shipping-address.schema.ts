import { z } from 'zod';
import { AddressSchema } from '../../common/address.schema';
import { SHIPPING_ADDRESS } from '@vubon/shared-constants/src/business/checkout/shipping-address.constants';

const shippingAddressTypeKeys = Object.keys(SHIPPING_ADDRESS.TYPES) as [string, ...string[]];

export const ShippingAddressSchema = AddressSchema.extend({
  addressId: z.string().uuid(),
  checkoutId: z.string().uuid(),
  type: z.enum(shippingAddressTypeKeys),
  isVerified: z.boolean().default(false),
  deliveryInstructions: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
