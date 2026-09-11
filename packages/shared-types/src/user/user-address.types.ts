import { BaseEntity } from '../common/base.types';
import { Address, AddressData } from '../common/address.types';
import { USER_ADDRESS } from '@vubon/shared-constants/src/user/user-address.constants';

/**
 * User address type value
 */
export type UserAddressType = (typeof USER_ADDRESS)[keyof typeof USER_ADDRESS];

/**
 * User address interface
 * Note: `address` stored as plain data for serialization.
 * Use `Address` value object in domain logic separately.
 */
export interface UserAddress extends BaseEntity {
  addressId: string;
  userId: string;
  address: AddressData;
  type: UserAddressType;
  isDefault: boolean;
  isVerified: boolean;
  metadata: Record<string, unknown>;
}

/**
 * Helper to get Address value object
 */
export const toAddressVO = (data: AddressData): Address => new Address(data);
