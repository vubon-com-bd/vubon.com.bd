/**
 * Vendor Support Types
 * ভেন্ডর সাপোর্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorSupport extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  supportEmail: string;
  supportPhone: string;
  supportHours: string;
  isActive: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  subCategory?: string;
  description: string;
  descriptionBangla?: string;
  status: 'pending' | 'processing' | 'resolved' | 'closed' | 'escalated';
  assignedTo?: string;
  resolvedAt?: Date;
  closedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorSupportCreateInput {
  vendorId: string;
  supportEmail: string;
  supportPhone: string;
  supportHours?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  subCategory?: string;
  description: string;
  descriptionBangla?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSupportUpdateInput {
  supportEmail?: string;
  supportPhone?: string;
  supportHours?: string;
  isActive?: boolean;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  category?: string;
  subCategory?: string;
  description?: string;
  descriptionBangla?: string;
  status?: 'pending' | 'processing' | 'resolved' | 'closed' | 'escalated';
  assignedTo?: string;
  resolvedAt?: Date;
  closedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSupportResponse {
  vendorSupport: VendorSupport;
}
