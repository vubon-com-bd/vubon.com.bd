/**
 * Update Address Request Schema
 * @module shared-schemas/user/requests
 */

import { z } from 'zod';
import { AddressSchema } from '../common/geo/address.schema';
import { AddressTypeSchema } from './user-address.schema';

export const UpdateAddressRequestSchema = AddressSchema.partial()
  .extend({
    type: AddressTypeSchema.optional(),
    isDefault: z.boolean().optional(),
    isDefaultShipping: z.boolean().optional(),
    isDefaultBilling: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateAddressRequestSchemaType = z.infer<typeof UpdateAddressRequestSchema>;
