/**
 * Vendor Address Types
 * ভেন্ডর ঠিকানা সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorAddress extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  addressType: 'business' | 'warehouse' | 'return' | 'billing' | 'shipping' | 'pickup';
  street: string;
  streetBangla?: string;
  city: string;
  cityBangla?: string;
  state: string;
  stateBangla?: string;
  country: string;
  zipCode: string;
  division: string;
  divisionBangla?: string;
  district: string;
  districtBangla?: string;
  upazila?: string;
  union?: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorAddressCreateInput {
  vendorId: string;
  addressType: 'business' | 'warehouse' | 'return' | 'billing' | 'shipping' | 'pickup';
  street: string;
  streetBangla?: string;
  city: string;
  cityBangla?: string;
  state: string;
  stateBangla?: string;
  country: string;
  zipCode: string;
  division: string;
  divisionBangla?: string;
  district: string;
  districtBangla?: string;
  upazila?: string;
  union?: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorAddressUpdateInput extends Partial<VendorAddressCreateInput> {
  isDefault?: boolean;
}

export interface VendorAddressResponse {
  vendorAddress: VendorAddress;
}
