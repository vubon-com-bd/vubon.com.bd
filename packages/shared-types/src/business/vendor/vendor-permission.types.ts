/**
 * Vendor Permission Types
 * ভেন্ডর পারমিশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { VENDOR_PERMISSIONS } from '@vubon/shared-constants';

export interface VendorPermission extends BaseEntity {
  vendorId: string;
  permission: (typeof VENDOR_PERMISSIONS)[keyof typeof VENDOR_PERMISSIONS];
  isGranted: boolean;
  grantedAt: Date;
  grantedBy: string;
  expiresAt?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorPermissionCreateInput {
  vendorId: string;
  permission: (typeof VENDOR_PERMISSIONS)[keyof typeof VENDOR_PERMISSIONS];
  grantedBy: string;
  expiresAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorPermissionUpdateInput {
  isGranted?: boolean;
  expiresAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorPermissionResponse {
  vendorPermission: VendorPermission;
}
