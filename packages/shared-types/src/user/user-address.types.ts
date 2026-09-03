/**
 * User Address Types
 * ইউজার ঠিকানা সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { USER_ADDRESS } from '@vubon/shared-constants';

export interface UserAddress extends BaseEntity {
  userId: string;
  type: (typeof USER_ADDRESS.TYPES)[keyof typeof USER_ADDRESS.TYPES];
  street: string;
  city: string;
  state: string;
  country: (typeof USER_ADDRESS.COUNTRIES)[keyof typeof USER_ADDRESS.COUNTRIES];
  postalCode: string;
  division: (typeof USER_ADDRESS.DIVISIONS)[keyof typeof USER_ADDRESS.DIVISIONS];
  district: string;
  upazila?: string;
  union?: string;
  isDefault: boolean;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  metadata?: Record<string, unknown>;
}

export interface UserAddressCreateInput {
  userId: string;
  type?: (typeof USER_ADDRESS.TYPES)[keyof typeof USER_ADDRESS.TYPES];
  street: string;
  city: string;
  state: string;
  country?: (typeof USER_ADDRESS.COUNTRIES)[keyof typeof USER_ADDRESS.COUNTRIES];
  postalCode: string;
  division: (typeof USER_ADDRESS.DIVISIONS)[keyof typeof USER_ADDRESS.DIVISIONS];
  district: string;
  upazila?: string;
  union?: string;
  isDefault?: boolean;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  metadata?: Record<string, unknown>;
}

// empty interface সরিয়ে type alias ব্যবহার
export type UserAddressUpdateInput = Partial<UserAddressCreateInput>;

export interface UserAddressWithFullDetails extends UserAddress {
  divisionName: string;
  divisionNameBangla: string;
  districtName: string;
  fullAddress: string;
}
