/**
 * Vendor Shipping Types
 * ভেন্ডর শিপিং সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_SHIPPING } from '@vubon/shared-constants';

export interface VendorShipping extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  type: (typeof VENDOR_SHIPPING.TYPES)[keyof typeof VENDOR_SHIPPING.TYPES];
  name: string;
  nameBangla?: string;
  carrier: string;
  carrierCode?: string;
  cost: number;
  freeShippingThreshold?: number;
  estimatedDays: number;
  isActive: boolean;
  zones: string[];
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorShippingCreateInput {
  vendorId: string;
  type: (typeof VENDOR_SHIPPING.TYPES)[keyof typeof VENDOR_SHIPPING.TYPES];
  name: string;
  nameBangla?: string;
  carrier: string;
  carrierCode?: string;
  cost: number;
  freeShippingThreshold?: number;
  estimatedDays: number;
  zones?: string[];
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorShippingUpdateInput {
  name?: string;
  nameBangla?: string;
  carrier?: string;
  carrierCode?: string;
  cost?: number;
  freeShippingThreshold?: number;
  estimatedDays?: number;
  isActive?: boolean;
  zones?: string[];
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorShippingResponse {
  vendorShipping: VendorShipping;
}
