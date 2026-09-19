/**
 * Address Response Schema
 * @module shared-schemas/user/responses
 */

import { z } from 'zod';
import { UserAddressSchema, UserAddressPublicSchema } from './user-address.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const AddressResponseSchema = z.object({
  success: z.literal(true),
  address: UserAddressSchema,
});

export const AddressListResponseSchema = z.object({
  success: z.literal(true),
  addresses: z.array(UserAddressPublicSchema).max(20),
  total: z.number().int().nonnegative(),
});

export const AddressDeleteResponseSchema = z.object({
  success: z.literal(true),
  addressId: UuidSchema,
  deletedAt: z.string().datetime(),
});

export const AddressSetDefaultResponseSchema = z.object({
  success: z.literal(true),
  addressId: UuidSchema,
  isDefault: z.literal(true),
  updatedAt: z.string().datetime(),
});

export type AddressResponseSchemaType = z.infer<typeof AddressResponseSchema>;
export type AddressListResponseSchemaType = z.infer<typeof AddressListResponseSchema>;
export type AddressDeleteResponseSchemaType = z.infer<typeof AddressDeleteResponseSchema>;
export type AddressSetDefaultResponseSchemaType = z.infer<typeof AddressSetDefaultResponseSchema>;
