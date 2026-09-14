/**
 * User Address Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-address.constants থেকে।
 * এবং shared-constants/common থেকে COUNTRY, DIVISION, DISTRICT।
 */

import type { USER_ADDRESS_TYPE } from '@vubon/shared-constants/user';
import type { UserId } from '../common/primitives';
import type { Address } from '../common/geo';

export type AddressTypeValue = (typeof USER_ADDRESS_TYPE)[keyof typeof USER_ADDRESS_TYPE];

export interface UserAddress extends Address {
  readonly id: string;
  readonly userId: UserId;
  readonly type: AddressTypeValue;
  readonly isDefault: boolean;
  readonly isDefaultShipping: boolean;
  readonly isDefaultBilling: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UserAddressInput extends Address {
  readonly type: AddressTypeValue;
  readonly isDefault?: boolean;
  readonly isDefaultShipping?: boolean;
  readonly isDefaultBilling?: boolean;
}

export interface UserAddressPublic {
  readonly id: string;
  readonly type: AddressTypeValue;
  readonly line1: string;
  readonly city: string;
  readonly country: string;
  readonly isDefault: boolean;
}
