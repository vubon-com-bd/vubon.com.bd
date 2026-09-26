/**
 * User Address Schema
 * @module shared-schemas/user
 *
 * Values আসে shared-constants/user/user-address.constants থেকে।
 */

import { z } from 'zod';
import { USER_ADDRESS_TYPE, USER_ADDRESS } from '@vubon/shared-constants/user';
import { AddressSchema } from '../common/geo/address.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const AddressTypeSchema = z.enum(Object.values(USER_ADDRESS_TYPE) as [string, ...string[]]);

export const UserAddressSchema = AddressSchema.extend({
  id: UuidSchema,
  userId: UuidSchema,
  type: AddressTypeSchema,
  isDefault: z.boolean(),
  isDefaultShipping: z.boolean(),
  isDefaultBilling: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const UserAddressPublicSchema = UserAddressSchema.pick({
  id: true,
  type: true,
  line1: true,
  city: true,
  country: true,
  isDefault: true,
});

export const UserAddressInputSchema = AddressSchema.extend({
  type: AddressTypeSchema,
  isDefault: z.boolean().optional().default(false),
  isDefaultShipping: z.boolean().optional().default(false),
  isDefaultBilling: z.boolean().optional().default(false),
});

export const UserAddressMaxSchema = z.number().int().max(USER_ADDRESS.MAX_ADDRESSES);

export type AddressTypeSchemaType = z.infer<typeof AddressTypeSchema>;
export type UserAddressSchemaType = z.infer<typeof UserAddressSchema>;
export type UserAddressPublicSchemaType = z.infer<typeof UserAddressPublicSchema>;
export type UserAddressInputSchemaType = z.infer<typeof UserAddressInputSchema>;
