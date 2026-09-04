/**
 * Vendor Approval Types
 * ভেন্ডর অনুমোদন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorApproval extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  status: 'pending' | 'approved' | 'rejected' | 'on_hold' | 'needs_revision';
  submittedAt: Date;
  reviewedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
  comments?: string;
  revisionNotes?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorApprovalCreateInput {
  vendorId: string;
  submittedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorApprovalUpdateInput {
  status?: 'pending' | 'approved' | 'rejected' | 'on_hold' | 'needs_revision';
  reviewedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
  comments?: string;
  revisionNotes?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorApprovalResponse {
  vendorApproval: VendorApproval;
}
