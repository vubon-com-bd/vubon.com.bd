import { DIVISIONS } from '@vubon/shared-constants';

/**
 * Address
 * ঠিকানা টাইপ
 */
export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  division: (typeof DIVISIONS)[keyof typeof DIVISIONS];
  district: string;
  upazila?: string;
  union?: string;
  isDefault: boolean;
  addressType: 'shipping' | 'billing' | 'both';
  landmark?: string;
  latitude?: number;
  longitude?: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Address with Full Details
 * সম্পূর্ণ ঠিকানা টাইপ
 */
export interface AddressWithFullDetails extends Address {
  divisionName: string;
  divisionNameBangla: string;
  districtName: string;
  upazilaName?: string;
  unionName?: string;
  fullAddress: string;
  fullAddressBangla: string;
}

/**
 * Address Input
 * ঠিকানা ইনপুট টাইপ
 */
export interface AddressInput {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  division: (typeof DIVISIONS)[keyof typeof DIVISIONS];
  district: string;
  upazila?: string;
  union?: string;
  isDefault?: boolean;
  addressType?: 'shipping' | 'billing' | 'both';
  landmark?: string;
  latitude?: number;
  longitude?: number;
}
