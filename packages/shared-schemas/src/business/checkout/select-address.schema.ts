/**
 * Select Address Request Schema
 * @module shared-schemas/business/checkout/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { AddressSchema } from '../../common/geo/address.schema';

export const SelectAddressRequestSchema = z
  .object({
    checkoutId: UuidSchema,
    shippingAddressId: UuidSchema.optional(),
    shippingAddress: AddressSchema.optional(),
    billingAddressId: UuidSchema.optional(),
    billingAddress: AddressSchema.optional(),
    useShippingAsBilling: z.boolean().optional().default(true),
  })
  .strict()
  .refine((data) => data.shippingAddressId !== undefined || data.shippingAddress !== undefined, {
    message: 'Either shippingAddressId or shippingAddress must be provided',
  });

export type SelectAddressRequestSchemaType = z.infer<typeof SelectAddressRequestSchema>;
