/**
 * Vendor Business Types
 * ভেন্ডর ব্যবসা সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorBusiness extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  businessName: string;
  businessNameBangla?: string;
  businessType: string;
  businessRegistrationNumber?: string;
  taxId?: string;
  vatNumber?: string;
  tradeLicense?: string;
  businessLicense?: string;
  establishmentYear?: number;
  employeeCount?: number;
  annualRevenue?: number;
  description?: string;
  descriptionBangla?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmail?: string;
  businessWebsite?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorBusinessCreateInput {
  vendorId: string;
  businessName: string;
  businessNameBangla?: string;
  businessType: string;
  businessRegistrationNumber?: string;
  taxId?: string;
  vatNumber?: string;
  tradeLicense?: string;
  businessLicense?: string;
  establishmentYear?: number;
  employeeCount?: number;
  annualRevenue?: number;
  description?: string;
  descriptionBangla?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmail?: string;
  businessWebsite?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorBusinessUpdateInput {
  businessName?: string;
  businessNameBangla?: string;
  businessType?: string;
  businessRegistrationNumber?: string;
  taxId?: string;
  vatNumber?: string;
  tradeLicense?: string;
  businessLicense?: string;
  establishmentYear?: number;
  employeeCount?: number;
  annualRevenue?: number;
  description?: string;
  descriptionBangla?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmail?: string;
  businessWebsite?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorBusinessResponse {
  vendorBusiness: VendorBusiness;
}
