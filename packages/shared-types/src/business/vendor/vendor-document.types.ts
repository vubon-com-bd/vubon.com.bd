/**
 * Vendor Document Types
 * ভেন্ডর ডকুমেন্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_DOCUMENT } from '@vubon/shared-constants';

export interface VendorDocument extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  type: (typeof VENDOR_DOCUMENT.TYPES)[keyof typeof VENDOR_DOCUMENT.TYPES];
  name: string;
  nameBangla?: string;
  description?: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  status: (typeof VENDOR_DOCUMENT.STATUS)[keyof typeof VENDOR_DOCUMENT.STATUS];
  approvedAt?: Date;
  rejectedAt?: Date;
  expiryDate?: Date;
  rejectionReason?: string;
  verifiedBy?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorDocumentCreateInput {
  vendorId: string;
  type: (typeof VENDOR_DOCUMENT.TYPES)[keyof typeof VENDOR_DOCUMENT.TYPES];
  name: string;
  nameBangla?: string;
  description?: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  expiryDate?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorDocumentUpdateInput {
  name?: string;
  nameBangla?: string;
  description?: string;
  status?: (typeof VENDOR_DOCUMENT.STATUS)[keyof typeof VENDOR_DOCUMENT.STATUS];
  approvedAt?: Date;
  rejectedAt?: Date;
  expiryDate?: Date;
  rejectionReason?: string;
  verifiedBy?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorDocumentResponse {
  vendorDocument: VendorDocument;
}
