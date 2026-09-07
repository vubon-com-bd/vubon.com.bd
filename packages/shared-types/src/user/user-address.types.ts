import { Address } from '../common/address.types';
import { USER_ADDRESS } from '@vubon/shared-constants';

export interface UserAddress {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  addressId: string;
  userId: string;
  address: Address;
  type: keyof typeof USER_ADDRESS;
  isDefault: boolean;
  isVerified: boolean;
  metadata: Record<string, unknown>;
}
