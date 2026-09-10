import { z } from 'zod';
import { AddressSchema } from '../../common/address.schema';
import { BILLING_ADDRESS } from '@vubon/shared-constants/src/business/checkout/billing-address.constants';

const billingAddressTypeKeys = Object.keys(BILLING_ADDRESS.TYPES) as [string, ...string[]];

export const BillingAddressSchema = AddressSchema.extend({
  addressId: z.string().uuid(),
  checkoutId: z.string().uuid(),
  type: z.enum(billingAddressTypeKeys),
  isSameAsShipping: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
