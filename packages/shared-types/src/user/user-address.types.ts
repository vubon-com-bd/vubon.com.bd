import { BaseEntity } from '../common/base.types';
import { Address } from '../common/address.types';
import { USER_ADDRESS } from '@vubon/shared-constants/src/user/user-address.constants';

/**
 * User address interface
 */
export interface UserAddress extends BaseEntity {
  addressId: string;
  userId: string;
  address: Address;
  type: keyof typeof USER_ADDRESS;
  isDefault: boolean;
  isVerified: boolean;
  metadata: Record<string, unknown>;
}
