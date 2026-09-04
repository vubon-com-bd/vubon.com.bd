/**
 * Product Approval Types
 * প্রোডাক্ট অ্যাপ্রোভাল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { PRODUCT } from '@vubon/shared-constants';

// PRODUCT.APPROVAL থেকে টাইপ নেওয়া
export type ProductApprovalStatus = (typeof PRODUCT.APPROVAL)[keyof typeof PRODUCT.APPROVAL];

export interface ProductApproval extends BaseEntity {
  productId: string;
  status: ProductApprovalStatus;
  reviewerId: string;
  reviewer: User;
  comments?: string;
  reviewDate: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  revisionNotes?: string;
  submittedBy: string;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductApprovalCreateInput {
  productId: string;
  submittedBy: string;
}

export interface ProductApprovalUpdateInput {
  status: ProductApprovalStatus;
  comments?: string;
  rejectionReason?: string;
  revisionNotes?: string;
}

export interface ProductApprovalResponse {
  approval: ProductApproval;
}
