/**
 * Vendor Profile Types
 * ভেন্ডর প্রোফাইল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorProfile extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  fullName: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  nid?: string;
  birthRegistration?: string;
  passport?: string;
  drivingLicense?: string;
  taxId?: string;
  vatNumber?: string;
  tradeLicense?: string;
  businessLicense?: string;
  about?: string;
  aboutBangla?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  website?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorProfileCreateInput {
  vendorId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  nid?: string;
  birthRegistration?: string;
  passport?: string;
  drivingLicense?: string;
  taxId?: string;
  vatNumber?: string;
  tradeLicense?: string;
  businessLicense?: string;
  about?: string;
  aboutBangla?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  website?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorProfileUpdateInput {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  nid?: string;
  birthRegistration?: string;
  passport?: string;
  drivingLicense?: string;
  taxId?: string;
  vatNumber?: string;
  tradeLicense?: string;
  businessLicense?: string;
  about?: string;
  aboutBangla?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  website?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorProfileResponse {
  vendorProfile: VendorProfile;
}
