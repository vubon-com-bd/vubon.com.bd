/**
 * Vendor Commission Types
 * ভেন্ডর কমিশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { COMMISSION } from '@vubon/shared-constants';

export interface VendorCommission extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  type: (typeof COMMISSION.TYPES)[keyof typeof COMMISSION.TYPES];
  rate: number;
  fixedAmount?: number;
  minAmount?: number;
  maxAmount?: number;
  categoryId?: string;
  productId?: string;
  isActive: boolean;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorCommissionCreateInput {
  vendorId: string;
  type: (typeof COMMISSION.TYPES)[keyof typeof COMMISSION.TYPES];
  rate: number;
  fixedAmount?: number;
  minAmount?: number;
  maxAmount?: number;
  categoryId?: string;
  productId?: string;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorCommissionUpdateInput {
  rate?: number;
  fixedAmount?: number;
  minAmount?: number;
  maxAmount?: number;
  isActive?: boolean;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorCommissionResponse {
  vendorCommission: VendorCommission;
}
