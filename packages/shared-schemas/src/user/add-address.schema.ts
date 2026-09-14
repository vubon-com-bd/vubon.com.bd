/**
 * Add Address Request Schema
 * @module shared-schemas/user/requests
 */

import { z } from 'zod';
import { AddressSchema } from '../common/geo/address.schema';
import { AddressTypeSchema } from './user-address.schema';

export const AddAddressRequestSchema = AddressSchema.extend({
  type: AddressTypeSchema,
  isDefault: z.boolean().optional().default(false),
  isDefaultShipping: z.boolean().optional().default(false),
  isDefaultBilling: z.boolean().optional().default(false),
}).strict();

export type AddAddressRequestSchemaType = z.infer<typeof AddAddressRequestSchema>;
