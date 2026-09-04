/**
 * Vendor Return Policy Types
 * ভেন্ডর রিটার্ন পলিসি সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_RETURN_POLICY } from '@vubon/shared-constants';

export interface VendorReturnPolicy extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  type: (typeof VENDOR_RETURN_POLICY.TYPES)[keyof typeof VENDOR_RETURN_POLICY.TYPES];
  returnWindow: number;
  replacementWindow?: number;
  restockingFee: number;
  isActive: boolean;
  acceptedReasons: string[];
  conditions?: string;
  conditionsBangla?: string;
  instructions?: string;
  instructionsBangla?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorReturnPolicyCreateInput {
  vendorId: string;
  type: (typeof VENDOR_RETURN_POLICY.TYPES)[keyof typeof VENDOR_RETURN_POLICY.TYPES];
  returnWindow: number;
  replacementWindow?: number;
  restockingFee?: number;
  acceptedReasons?: string[];
  conditions?: string;
  conditionsBangla?: string;
  instructions?: string;
  instructionsBangla?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorReturnPolicyUpdateInput {
  type?: (typeof VENDOR_RETURN_POLICY.TYPES)[keyof typeof VENDOR_RETURN_POLICY.TYPES];
  returnWindow?: number;
  replacementWindow?: number;
  restockingFee?: number;
  isActive?: boolean;
  acceptedReasons?: string[];
  conditions?: string;
  conditionsBangla?: string;
  instructions?: string;
  instructionsBangla?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorReturnPolicyResponse {
  vendorReturnPolicy: VendorReturnPolicy;
}
