/**
 * Vendor Suspension Types
 * ভেন্ডর স্থগিত সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorSuspension extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  status: 'active' | 'suspended' | 'permanent' | 'pending' | 'appealed';
  reason: string;
  reasonBangla?: string;
  description?: string;
  suspendedAt: Date;
  suspendedBy: string;
  expiresAt?: Date;
  liftedAt?: Date;
  liftedBy?: string;
  appealStatus?: 'pending' | 'approved' | 'rejected';
  appealReason?: string;
  appealSubmittedAt?: Date;
  appealReviewedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorSuspensionCreateInput {
  vendorId: string;
  reason: string;
  reasonBangla?: string;
  description?: string;
  suspendedBy: string;
  expiresAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSuspensionUpdateInput {
  status?: 'active' | 'suspended' | 'permanent' | 'pending' | 'appealed';
  liftedAt?: Date;
  liftedBy?: string;
  appealStatus?: 'pending' | 'approved' | 'rejected';
  appealReason?: string;
  appealSubmittedAt?: Date;
  appealReviewedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSuspensionResponse {
  vendorSuspension: VendorSuspension;
}
