import { z } from 'zod';
import { AddressSchema } from '../common/address.schema';
import { USER_ADDRESS } from '@vubon/shared-constants/src/user/user-address.constants';

const userAddressKeys = Object.keys(USER_ADDRESS) as [string, ...string[]];

export const UserAddressSchema = AddressSchema.extend({
  addressId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(userAddressKeys),
  isDefault: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
