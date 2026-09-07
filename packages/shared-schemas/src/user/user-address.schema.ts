import { z } from 'zod';
import { AddressSchema } from '../common/address.schema';
import { USER_ADDRESS } from '@vubon/shared-constants';

export const UserAddressSchema = AddressSchema.extend({
  addressId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(Object.keys(USER_ADDRESS) as [string, ...string[]]),
  isDefault: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
